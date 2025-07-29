import markdownit from 'markdown-it'
import {
  CARD_ARTS,
  INVERTABLE_SYMBOLS,
  LARGE_COMPONENTS_ARTS,
  SYMBOL_DATA,
} from './data'
import type { HeaderData } from './types'
import {
  symbolScanRegex,
  symbolScanStartsWith,
  hoverlinkRegex,
  startsWithHoverlinkRegex,
  startsWithName,
} from './utils/markdownRegex'

function createToken(type: string, content: string, Token: any, props: Record<string, any> = {}) {
  const token = new Token(type, '', 0)
  token.content = content
  Object.assign(token, props)
  return token
}

// This function splits the text nodes into text nodes + inline component nodes (the symbol and hoverlink)
function splitTextToken(text: any, Token: any) {
  const nodes = []
  let textNodeContent = ''
  while (text.length >= 1) {
    const symbolMatch = text.match(symbolScanStartsWith)
    const cardMatch = text.match(startsWithHoverlinkRegex)
    if (symbolMatch != null || cardMatch != null) {
      if (textNodeContent.length >= 1) {
        nodes.push(createToken('text', textNodeContent, Token))
        textNodeContent = ''
      }
      if (symbolMatch != null) {
        // Symbol
        const symbolName = symbolMatch[0].replace(/^\{\{\s*|\s*\}\}$/g, '').toLowerCase() // Extract anme
        nodes.push(
          createToken('symbol', symbolMatch[0], Token, { markup: symbolName.toLowerCase() }),
        )
        text = text.slice(symbolMatch[0].length)
      } else {
        // Hoverlink
        const strip = cardMatch[0].replace(/^\[\[\s*|\s*\]\]$/g, '')
        const [name, rawNick = ''] = strip.split(/\|(.*)/)
        const nickName = rawNick.trim() || null
        const componentType = LARGE_COMPONENTS_ARTS[name.toLowerCase()] ? 'component' : 'card'
        const token = createToken('hoverlink', cardMatch[0],Token,{markup:name,nickName,componentType})
        nodes.push(token)
        text = text.slice(cardMatch[0].length)
      }
    } else {
      // Text
      textNodeContent += text.charAt(0)
      text = text.slice(1)
    }
  }
  // Add ending text
  if (textNodeContent.length >= 1) {
    nodes.push(createToken('text',textNodeContent,Token))
  }
  return nodes
}

// This function loops through all text, finds inline components (the symbols and hoverlinks) in text nodes,
// and extract them to the ast
function inlineReplace(md: any) {
  const arrayReplaceAt = md.utils.arrayReplaceAt

  // This is the main function that is returned,
  // it loops through and edits the AST into the end content
  return (state: any) => {
    const blockTokens = state.tokens
    for (let j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== 'inline') {
        continue
      }
      let tokens = blockTokens[j].children
      // We scan from the end, to keep position when new tags added.
      // Use reversed logic in links start/end match
      for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i]
        if (
          token.type === 'text' &&
          (symbolScanRegex.test(token.content) || hoverlinkRegex.test(token.content))
        ) {
          // replace current node
          blockTokens[j].children = tokens = arrayReplaceAt(
            tokens,
            i,
            splitTextToken(token.content, state.Token),
          )
        }
      }
    }
  }
}
function centeredBlockDisplay(md: any) {
  md.block.ruler.before(
    'paragraph',
    'centered_block_display',
    (state: any, startLine: any, endLine: any, silent: any) => {
      const startPos = state.bMarks[startLine] + state.tShift[startLine]
      const maxPos = state.eMarks[startLine]

      // Check for the opening ![[
      const startLineText = state.src.slice(startPos, maxPos).trim()
      if (!startLineText.startsWith('![[')) return false

      if (silent) return true

      let content = ''
      let nextLine = startLine + 1
      let closingFound = false
      let remainingContent = ''

      // Check if block ends on the same line
      const sameLineClosingIndex = startLineText.indexOf(']]', 3) // Look for ]] after ![[
      if (sameLineClosingIndex !== -1) {
        // Capture content before ]]
        content = startLineText.slice(3, sameLineClosingIndex).trim()
        remainingContent = startLineText.slice(sameLineClosingIndex + 2).trim()
        closingFound = true

        // Inject remaining content as a new line
        if (remainingContent) {
          const insertPos =
            state.bMarks[startLine] + state.tShift[startLine] + sameLineClosingIndex + 2
          state.src =
            state.src.slice(0, insertPos) + '\n' + remainingContent + '\n' + state.src.slice(maxPos)

          // Adjust state markers
          state.bMarks.splice(startLine + 1, 0, insertPos + 1)
          state.eMarks.splice(startLine + 1, 0, insertPos + 1 + remainingContent.length)
          state.tShift.splice(startLine + 1, 0, 0)

          state.lineMax++
        }

        // Move to the next line after processing
        state.line = startLine + 1
      } else {
        // Multi-line block handling
        content = startLineText.slice(3) // Remove the leading ![[
        while (nextLine < endLine) {
          const lineStart = state.bMarks[nextLine] + state.tShift[nextLine]
          const lineEnd = state.eMarks[nextLine]
          const lineText = state.src.slice(lineStart, lineEnd).trim()

          const closingIndex = lineText.indexOf(']]')

          if (closingIndex !== -1) {
            content += ' ' + lineText.slice(0, closingIndex)
            remainingContent = lineText.slice(closingIndex + 2).trim()
            closingFound = true

            // Inject trailing content as a new line
            if (remainingContent) {
              const insertPos = lineStart + closingIndex + 2
              state.src =
                state.src.slice(0, insertPos) +
                '\n' +
                remainingContent +
                '\n' +
                state.src.slice(lineEnd)

              // Adjust line markers
              state.bMarks.splice(nextLine + 1, 0, insertPos + 1)
              state.eMarks.splice(nextLine + 1, 0, insertPos + 1 + remainingContent.length)
              state.tShift.splice(nextLine + 1, 0, 0)

              state.lineMax++
            }

            break
          }
          content += ' ' + lineText
          nextLine++
        }

        if (!closingFound) return false
        // Move to the next line after the block
        state.line = nextLine + 1
      }

      // Test if the inner components of the block has the right syntax
      const cardNames = []
      let text = content.trim()
      let isLargeComponent = false
      for (;;) {
        const cardMatch = text.match(startsWithName)
        if (cardMatch != null) {
          if (cardNames.length >= 4 || isLargeComponent) {
            return false
          } else if (LARGE_COMPONENTS_ARTS[cardMatch[0].toLowerCase()]) {
            if (cardNames.length >= 1) {
              return false
            }
            isLargeComponent = true
          }
          cardNames.push(cardMatch[0])
          text = text.slice(cardMatch[0].length).trimStart()
          if (text.startsWith('|')) {
            text = text.slice(1).trimStart()
          } else if (text == '') {
            break
          } else {
            return false
          }
        } else {
          return false
        }
      }
      // Create the block tokens
      const openToken = state.push('centered_block_display_open', 'div', 1)
      openToken.block = true

      cardNames.forEach((cardName: string) => {
        const innerToken = state.push('centered_block_display_component', 'div', 1)
        innerToken.content = cardName
        innerToken.block = true
      })

      const closeToken = state.push('centered_block_display_close', 'div', -1)
      closeToken.block = true

      state.line = nextLine + 1
      return true
    },
  )

  // Rendering rules
  md.renderer.rules['centered_block_display_open'] = () => `<div class="centered-block">\n`
  md.renderer.rules['centered_block_display_close'] = () => `</div>\n`

  md.renderer.rules['centered_block_display_component'] = (tokens: any, idx: any) => {
    const name = tokens[idx].content.toLowerCase()
    const url = CARD_ARTS[name] || LARGE_COMPONENTS_ARTS[name]
    const isLarge = LARGE_COMPONENTS_ARTS[name] != undefined
    return `<img src="${url}" alt="${name}" class="${isLarge ? 'large' : ''}">`
  }
}

function inline_plugin(md: any) {
  // Set rule for hoverlinks + symbols
  md.renderer.rules.symbol = function (token: any, idx: any) {
    let name = token[idx].markup
    return `<img class="symbol ${INVERTABLE_SYMBOLS.includes(name) ? 'invert' : ''}" alt="${name}" src="${SYMBOL_DATA[name]}"></img>`
  }
  md.renderer.rules.hoverlink = function (token: any, idx: any) {
    const inlineComponentType = token[idx].componentType
    const componentName = token[idx].markup
    const lowercaseName = token[idx].markup.toLowerCase()
    const nickName = token[idx].nickName
    return `
      <span class="hoverlink" ${inlineComponentType}="${lowercaseName}">
      ${htmlEscape(nickName == null ? componentName : nickName)}
      </span>`
  }
  md.core.ruler.after('linkify', 'inline_customs', inlineReplace(md))
}

let md = markdownit().use(inline_plugin).use(centeredBlockDisplay)

// Open links in new tab
var defaultLinkRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  tokens[idx].attrSet('target', '_blank')
  return defaultLinkRender(tokens, idx, options, env, self)
}
// Track headers for table of contents
var defaultHeadingRender =
  md.renderer.rules.heading_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }
md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
  let level = Number(tokens[idx].tag.match(/\d/)?.[0])
  tokens[idx].attrSet('id', `header${id}`)
  headerStack.push({
    level,
    id,
  })
  id += 1
  return defaultHeadingRender(tokens, idx, options, env, self)
}
// Make the table of contents
function makeTableOfContents(): HeaderData[] {
  const ast: HeaderData[] = []
  while (headerStack.length) {
    let node = parseHeader()
    if (node) {
      ast.push(node)
    }
  }
  return ast
}
function parseHeader(): HeaderData | null {
  const header = headerStack.shift() as Header
  const level = header.level
  const id = header.id
  if (level > 3) {
    return null
  } else {
    let children: HeaderData[] = []
    while (headerStack.length && headerStack[0].level > level) {
      let node = parseHeader()
      if (node) {
        children.push(node)
      }
    }
    return { id, children }
  }
}

type Header = { level: number; id: number }
let id: number
let headerStack: Header[] = []
export function renderMarkdown(rawMarkdown: string) {
  id = 0
  headerStack = []
  let render = md.render(rawMarkdown)
  let tableOfContents = makeTableOfContents()
  return { render, tableOfContents }
}

function htmlEscape(input: string) {
  return input.replace(/&/gm, '&amp').replace(/</gm, '&lt;')
}
