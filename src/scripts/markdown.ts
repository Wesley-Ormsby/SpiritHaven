import markdownit from 'markdown-it'
import {
  ALL_SYMBOLS,
  CARD_ARTS,
  INVERTABLE_SYMBOLS,
  LARGE_COMPONENTS_ARTS,
  SYMBOL_DATA,
} from './data'

const symbolNamesWithOr = ALL_SYMBOLS.map((symbol: string) =>
  symbol.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'),
).join('|')
const symbolRegex = `(\\{\\{\\s*(${symbolNamesWithOr})\\s*\\}\\})`
const symbolScanRegex = RegExp(symbolRegex, 'i')
const symbolScanStartsWith = RegExp('^' + symbolRegex, 'i')

const cardNamesWithOr = Object.keys(CARD_ARTS)
  .concat(Object.keys(LARGE_COMPONENTS_ARTS))
  .map((symbol: string) => symbol.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'))
  .join('|')
const cardRegex = `(\\[\\[\\s*(${cardNamesWithOr})\\s*(\\|.+\\s*)?\\]\\])`
const cardScanRegex = RegExp(cardRegex, 'i')
const cardScanStartsWtih = RegExp('^' + cardRegex, 'i')

function inlineReplace(md: any) {
  const arrayReplaceAt = md.utils.arrayReplaceAt
  function splitTextToken(text: any, Token: any) {
    const nodes = []
    let textNode = new Token('text', '', 0)
    textNode.content = ''
    while (text.length >= 1) {
      let symbolMatch = text.match(symbolScanStartsWith)
      let cardMatch = text.match(cardScanStartsWtih)
      if (symbolMatch != null || cardMatch != null) {
        if (textNode.content.length >= 1) {
          nodes.push(textNode)
          textNode = new Token('text', '', 0)
          textNode.content = ''
        }
        if (symbolMatch != null) {
          let symbolName = symbolMatch[0].replace(/^\{\{\s*|\s*\}\}$/g, '')
          let symbolToken = new Token('symbol', '', 0)
          symbolToken.content = symbolMatch[0]
          symbolToken.markup = symbolName.toLowerCase()
          nodes.push(symbolToken)
          text = text.slice(symbolMatch[0].length)
        } else {
          console.log(cardMatch[0])
          const strip = cardMatch[0].replace(/^\[\[\s*|\s*\]\]$/g, '')
          let name = strip
          let nickName: null | string = null
          if (strip.includes('|')) {
            const split = strip.split(/\|(.*)/)
            name = split[0].trim()
            nickName = split[1].trim()
            if (nickName == '') {
              nickName = null
            }
          }
          let cardToken = new Token('inline_component', '', 0)
          cardToken.componentType = 'card'
          cardToken.content = cardMatch[0]
          cardToken.markup = name
          cardToken.nickName = nickName
          if (LARGE_COMPONENTS_ARTS[name.toLowerCase()]) {
            cardToken.componentType = 'component'
          }
          nodes.push(cardToken)
          text = text.slice(cardMatch[0].length)
        }
      } else {
        textNode.content += text.charAt(0)
        text = text.slice(1)
      }
    }
    if (textNode.content.length >= 1) {
      nodes.push(textNode)
    }
    return nodes
  }
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
          (symbolScanRegex.test(token.content) || cardScanRegex.test(token.content))
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
        let cardMatch = text.match(new RegExp(`^(${cardNamesWithOr})`, 'i'))
        if (cardMatch != null) {
          if (cardNames.length >= 3 || isLargeComponent) {
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
    return `<img src="${url}" alt="${name}" class="${isLarge ? 'large': ''}">`
  }
}

function inline_plugin(md: any) {
  // Set rule for inline cards + symbols
  md.renderer.rules.symbol = function (token: any, idx: any) {
    let name = token[idx].markup
    return `<img class="symbol ${INVERTABLE_SYMBOLS.includes(name) ? 'invert' : ''}" alt="${name}" src="${SYMBOL_DATA[name]}"></img>`
  }
  md.renderer.rules.inline_component = function (token: any, idx: any) {
    const inlineComponentType = token[idx].componentType
    const componentName = token[idx].markup
    const lowerCaseName = token[idx].markup.toLowerCase()
    const nickName = token[idx].nickName
      return `
      <span class="inline-component" ${inlineComponentType}="${lowerCaseName}">
      ${htmlEscape(nickName == null ? componentName : nickName)}
      </span>`
  }
  md.core.ruler.after('linkify', 'inline_symbol', inlineReplace(md))
}

let md = markdownit().use(inline_plugin).use(centeredBlockDisplay)

// Open links in new tab
var defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  tokens[idx].attrSet('target', '_blank');
  return defaultRender(tokens, idx, options, env, self);
};

export function renderMarkdown(rawMarkdown: string) {
  return md.render(rawMarkdown)
}

function htmlEscape(input: string) {
  return input.replace(/&/gm, '&amp').replace(/</gm, '&lt;')
}
