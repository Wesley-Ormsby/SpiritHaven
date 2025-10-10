import hljs from 'highlight.js/lib/core'
import {
  escapedCardNames,
  symbolScanRegex,
  allNamesRegex,
  escapedLargeComponentNames,
  escapedAllComponentNames,
  customSymbolScanRegex,
} from './utils/markdownRegex'

/*
Altered markdown with new rules for custom components

Language: Markdown
Requires: xml.js
Author: John Crepezzi <john.crepezzi@gmail.com>
Website: https://daringfireball.net/projects/markdown/
Category: common, markup
*/
function markdown(hljs: any) {
  const regex = hljs.regex
  const INLINE_HTML = {
    begin: /<\/?[A-Za-z_]/,
    end: '>',
    subLanguage: 'xml',
    relevance: 0,
  }
  const HORIZONTAL_RULE = {
    className: 'hr',
    match: '^[-\\*_]{3,}\\s*$',
  }
  const CODE = {
    className: 'code',
    variants: [
      // TODO: fix to allow these to work with sublanguage also
      { begin: '(`{3,})[^`](.|\\n)*?\\1`*[ ]*' },
      { begin: '(~{3,})[^~](.|\\n)*?\\1~*[ ]*' },
      // needed to allow markdown as a sublanguage to work
      {
        begin: '```',
        end: '```+[ ]*$',
      },
      {
        begin: '~~~',
        end: '~~~+[ ]*$',
      },
      { begin: '`.+?`' },
      {
        begin: '(?=^( {4}|\\t))',
        // use contains to gobble up multiple lines to allow the block to be whatever size
        // but only have a single open/close tag vs one per line
        contains: [
          {
            begin: '^( {4}|\\t)',
            end: '(\\n)$',
          },
        ],
        relevance: 0,
      },
    ],
  }
  const LIST = {
    className: 'bullet',
    begin: '^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)',
    end: '\\s+',
    excludeEnd: true,
  }
  const LINK_REFERENCE = {
    begin: /^\[[^\n]+\]:/,
    returnBegin: true,
    contains: [
      {
        className: 'link-symbol',
        begin: /\[/,
        end: /\]/,
        excludeBegin: true,
        excludeEnd: true,
      },
      {
        className: 'link',
        begin: /:\s*/,
        end: /$/,
        excludeBegin: true,
      },
    ],
  }
  const URL_SCHEME = /[A-Za-z][A-Za-z0-9+.-]*/
  const LINK = {
    variants: [
      // too much like nested array access in so many languages
      // to have any real relevance
      {
        begin: /\[.+?\]\[.*?\]/,
        relevance: 0,
      },
      // popular internet URLs
      {
        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
        relevance: 2,
      },
      {
        begin: regex.concat(/\[.+?\]\(/, URL_SCHEME, /:\/\/.*?\)/),
        relevance: 2,
      },
      // relative urls
      {
        begin: /\[.+?\]\([./?&#].*?\)/,
        relevance: 1,
      },
      // whatever else, lower relevance (might not be a link at all)
      {
        begin: /\[.*?\]\(.*?\)/,
        relevance: 0,
      },
    ],
    returnBegin: true,
    contains: [
      {
        // empty strings for alt or link text
        match: /\[(?=\])/,
      },
      {
        className: 'string',
        relevance: 0,
        begin: '\\[',
        end: '\\]',
        excludeBegin: true,
        returnEnd: true,
      },
      {
        className: 'link ',
        relevance: 0,
        begin: '\\]\\(',
        end: '\\)',
        excludeBegin: true,
        excludeEnd: true,
      },
      {
        className: 'link-symbol',
        relevance: 0,
        begin: '\\]\\[',
        end: '\\]',
        excludeBegin: true,
        excludeEnd: true,
      },
    ],
  }
  const BOLD = {
    className: 'strong',
    contains: [] as any[], // defined later
    variants: [
      {
        begin: /_{2}(?!\s)/,
        end: /_{2}/,
      },
      {
        begin: /\*{2}(?!\s)/,
        end: /\*{2}/,
      },
    ],
  }
  const ITALIC = {
    className: 'emphasis',
    contains: [] as any[], // defined later
    variants: [
      {
        begin: /\*(?![*\s])/,
        end: /\*/,
      },
      {
        begin: /_(?![_\s])/,
        end: /_/,
        relevance: 0,
      },
    ],
  }
  const STIKETHROUGH = {
    className: 'strike-through',
    contains: [] as any[], // defined later
    begin: /~~(?![*\s])/,
    end: /~~/,
  }

  // Custom rules
  const SYMBOL = {
    className: 'symbol',
    variants: [{ match: symbolScanRegex }, { match: customSymbolScanRegex }],
  }
  const HOVERLINK = {
    className: 'hoverlink',
    variants: [
      {
        begin: [new RegExp(`\\[\\[\\s*(${escapedAllComponentNames})`), /\s*\|/, /.*?/, /\]\]/],
        beginScope: {
          3: 'hoverlink-nickname',
        },
      },
      { begin: allNamesRegex, relevance: 1 },
    ],
  }
  const CENTERED_BLOCK_COMPONENT = {
    className: 'block-component',
    variants: [
      { match: new RegExp(`!\\[\\[\\s*(${escapedLargeComponentNames})\\s*\\]\\]`) },
      {
        match: new RegExp(
          `\\!\\[\\[\\s*(${escapedCardNames})\\s*(\\s*\\|\\s*(${escapedCardNames})){0,3}\\s*\\|?\\s*\\]\\]`,
        ),
      },
    ],
  }

  // 3 level deep nesting is not allowed because it would create confusion
  // in cases like `***testing***` because where we don't know if the last
  // `***` is starting a new bold/italic or finishing the last one
  const BOLD_WITHOUT_ITALIC = hljs.inherit(BOLD, { contains: [] })
  const ITALIC_WITHOUT_BOLD = hljs.inherit(ITALIC, { contains: [] })
  BOLD.contains.push(ITALIC_WITHOUT_BOLD)
  ITALIC.contains.push(BOLD_WITHOUT_ITALIC)

  let CONTAINABLE: any[] = [INLINE_HTML, SYMBOL, LINK, HOVERLINK, STIKETHROUGH]

  ;[BOLD, ITALIC, BOLD_WITHOUT_ITALIC, ITALIC_WITHOUT_BOLD, STIKETHROUGH].forEach((m) => {
    m.contains = m.contains.concat(CONTAINABLE)
  })

  CONTAINABLE = CONTAINABLE.concat(BOLD, ITALIC)

  const HEADER = {
    className: 'section',
    variants: [
      {
        begin: '^#{1,6}',
        end: '$',
        contains: CONTAINABLE,
      },
      {
        begin: '(?=^.+?\\n[=-]{2,}$)',
        contains: [
          { begin: '^[=-]*$' },
          {
            begin: '^',
            end: '\\n',
            contains: CONTAINABLE,
          },
        ],
      },
    ],
  }

  const BLOCKQUOTE = {
    className: 'quote',
    begin: '^>\\s+',
    contains: CONTAINABLE,
    end: '$',
  }

  const ENTITY = {
    //https://spec.commonmark.org/0.31.2/#entity-references
    scope: 'literal',
    match: /&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/,
  }

  return {
    name: 'Markdown',
    aliases: ['md', 'mkdown', 'mkd'],
    case_insensitive: true,
    contains: [
      HORIZONTAL_RULE,
      HEADER,
      INLINE_HTML,
      LIST,
      BOLD,
      ITALIC,
      STIKETHROUGH,
      BLOCKQUOTE,
      CODE,
      CENTERED_BLOCK_COMPONENT,
      LINK,
      LINK_REFERENCE,
      ENTITY,
      SYMBOL,
      HOVERLINK,
    ],
  }
}

// Then register the languages you need
hljs.registerLanguage('markdown', markdown)

export function highlight(rawInput: string): string {
  const output = hljs.highlight(rawInput, { language: 'markdown' }).value
  return output
}
