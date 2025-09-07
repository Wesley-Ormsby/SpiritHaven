import { ALL_SYMBOLS, CARD_ARTS, LARGE_COMPONENTS_ARTS } from "../data"
function escapeRegex(str: string): string {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&')
}

const cardNames = Object.keys(CARD_ARTS)
const largeComponentNames = Object.keys(LARGE_COMPONENTS_ARTS)
const allComponentNames = [...cardNames, ...largeComponentNames]

const escapedSymbols = ALL_SYMBOLS.map(escapeRegex).join('|')
export const escapedAllComponentNames = allComponentNames.map(escapeRegex).join('|')

export const escapedCardNames = cardNames.map(escapeRegex).join('|')
export const escapedLargeComponentNames = largeComponentNames.map(escapeRegex).join('|')

export const symbolScanRegex = new RegExp(`\\{\\{\\s*(${escapedSymbols})\\s*\\}\\}`)
export const symbolScanStartsWith = RegExp('^' + symbolScanRegex.source, 'i')
export const allNamesRegex = new RegExp(`(\\[\\[\\s*(${escapedAllComponentNames})\\s*(\\:.+\\s*)?\\]\\])`)

const cardRegex = `(\\[\\[\\s*(${escapedAllComponentNames})\\s*(\\|.+?\\s*)?\\]\\])`
export const hoverlinkRegex = RegExp(cardRegex, 'i')
export const startsWithHoverlinkRegex = RegExp('^' + cardRegex, 'i')
export const startsWithName = new RegExp(`^(${escapedCardNames}|${escapedAllComponentNames})`, 'i')
