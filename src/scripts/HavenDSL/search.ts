import { ASPECTS, BLIGHT_CARDS, EVENTS, FEAR_CARDS, LARGE_COMPONENTS_ARTS, POWERS } from '../data'
import type { Card, CardSearchOrders, Element } from '../types'
import { Parser } from './parser'
import { Scanner } from './scanner'
import { type CardType, type Op, type QueryNode, type QueryResult } from './types'
const aspectPowers: Record<string, string> = {
  'smite the land with fulmination': "lightning's swift strike",
  'belligerent and aggressive crops': 'a spread of rampant green',
}
export function searchCards(
  raw: string,
  allowLargeComponents: boolean = false,
  order: CardSearchOrders = 'Type',
): QueryResult {
  // Scan
  const scanner = new Scanner(raw)
  const scannerResult = scanner.scan()
  if (scannerResult.errors.length > 0) {
    return { errors: scannerResult.errors, query: [] }
  }

  // Parse
  const parser = new Parser(scannerResult.tokens)
  const parserResult = parser.parse()
  if (parserResult.error || parserResult.ast == null) {
    return { errors: [parserResult.error], query: [] }
  }
  // Filter
  const filter = filterCards(parserResult.ast, allowLargeComponents, order)
  return { errors: [], query: filter }
}

const allCards: Partial<Record<CardType, any>> = {
  power: POWERS,
  event: EVENTS,
  fear: FEAR_CARDS,
  blight: BLIGHT_CARDS,
  aspect: ASPECTS,
}

function filterCards(
  ast: QueryNode,
  allowLargeComponents: boolean,
  order: CardSearchOrders,
): string[] {
  const cards: string[] = []
  for (var cardType in allCards) {
    const ct = cardType as CardType
    const cardsOfType = Object.keys(allCards[ct])
    if (ct == 'power') {
      if (order == 'Cost') {
        cardsOfType.sort((a, b) => POWERS[a].cost - POWERS[b].cost)
      } else if (order == 'Speed') {
        cardsOfType.sort((a, b) => POWERS[a].speed.localeCompare(POWERS[b].speed))
      } else if (order == 'Range') {
        cardsOfType.sort((a, b) => {
          let aR = POWERS[a].range
          let bR = POWERS[b].range
          let aRange = Array.isArray(aR) ? Math.max(...aR) + 1 : aR != null ? aR + 1 : 0
          let bRange = Array.isArray(bR) ? Math.max(...bR) + 1 : bR != null ? bR + 1 : 0
          return aRange - bRange
        })
      } else if (order == 'Artist') {
        cardsOfType.sort((a, b) => POWERS[a].artist.localeCompare(POWERS[b].artist))
      }
    }
    cards.push(
      ...cardsOfType.filter((card) => {
        return filterCard(allCards[ct][card], card, ct, ast)
      }),
    )
  }
  if (allowLargeComponents) {
    cards.push(
      ...Object.keys(LARGE_COMPONENTS_ARTS).filter((name) => {
        return filterNonCard(name, ast)
      }),
    )
  }
  let filteredSet = [...new Set(cards)]
  if (order == 'Name') {
    return filteredSet.sort((a, b) => a.localeCompare(b))
  }
  return filteredSet
}

function filterCard(card: Card, cardName: string, type: CardType, node: QueryNode): boolean {
  if (node.property == 'type') {
    // Special case with aspect powers
    // These powers are all minor/aspect/power/spirit types
    if (cardName in aspectPowers) {
      if (['aspect', 'power', 'minor', aspectPowers[cardName]].includes(node.value)) {
        return true
      }
    }
    // blight, event, fear, power, aspects
    if (type == node.value) {
      return true
    }
    if (node.value == 'major' && 'cardType' in card && card.cardType == 'major') {
      return true
    }
    if (node.value == 'unique' && 'unique' in card) {
      return true
    }
    if (node.value == 'minor' && 'cardType' in card && card.cardType == 'minor') {
      return true
    }
    // Spirit uniques
    if ('unique' in card && card.unique == node.value) {
      return true
    }
    return false
  }

  if (node.property == 'name') {
    return compareRegexStrProperties(node.value, cardName, node.op)
  }

  if (node.property == 'eventname') {
    if ('sections' in card) {
      for (var section of card.sections) {
        if (compareRegexStrProperties(node.value, section.name.toLowerCase(), node.op)) {
          return true
        }
      }
    }
    return false
  }

  if (node.property == 'artist') {
    if ('artist' in card) {
      return compareRegexStrProperties(node.value, card.artist.toLowerCase(), node.op)
    }
    return false
  }

  if (node.property == 'set') {
    return card.set.includes(node.value)
  }

  if (node.property == 'status') {
    if ('status' in card) {
      return card.status == node.value
    } else if (node.value == 'active') {
      // all aspects are active
      return true
    }
    return false
  }

  if (node.property == 'aspect') {
    if ('aspect' in card) {
      return compareRegexStrProperties(node.value, card.aspect, node.op)
    }
    return false
  }

  if (node.property == 'health') {
    return 'islandHealth' in card && card.islandHealth == node.value
  }

  if (node.property == 'blight') {
    return 'blightPerPlayer' in card && compareNumber(node.value, card.blightPerPlayer, node.op)
  }

  if (node.property == 'cost') {
    return 'cost' in card && compareNumber(node.value, card.cost, node.op)
  }

  if (node.property == 'eventtype') {
    if ('sections' in card) {
      for (var section of card.sections) {
        if (node.value == section.type) {
          return true
        }
      }
    }
    return false
  }

  if (node.property == 'elements') {
    if ('elements' in card) {
      if (typeof node.value == 'number') {
        return compareNumber(node.value, card.elements.length, node.op)
      }
      for (let element of ['s', 'm', 'f', 'a', 'w', 'e', 'p', 'n'] as Element[]) {
        if (element in node.value) {
          let count = node.value[element]
          if (count != undefined && count > 1) {
            return false
          }
          if (count == 1 && !card.elements.includes(element)) {
            return false
          }
        } else if (node.op == '=' && card.elements.includes(element)) {
          return false
        }
      }
      return true
    }
    return false
  }

  if (node.property == 'thresholdelements') {
    if ('threshold' in card && card.threshold != null) {
      if (typeof node.value == 'number') {
        return compareNumber(
          node.value,
          Object.values(card.threshold.elements).reduce((a, b) => a + b, 0),
          node.op,
        )
      }
      for (let element of ['s', 'm', 'f', 'a', 'w', 'e', 'p', 'n'] as Element[]) {
        let nodeElementCount = node.value[element] || 0
        let cardElementCount = card.threshold.elements[element] || 0
        if (node.op == '=') {
          if (nodeElementCount != cardElementCount) {
            return false
          }
        } else {
          if (cardElementCount < nodeElementCount) {
            return false
          }
        }
      }
      return true
    }
    return false
  }

  if (node.property == 'speed') {
    return 'speed' in card && card.speed.includes(node.value)
  }

  if (node.property == 'range') {
    if ('range' in card) {
      if (node.value == null || card.range == null) {
        return card.range == node.value
      }
      if (Array.isArray(card.range)) {
        for (var range of card.range) {
          if (compareNumber(node.value, range, node.op)) {
            return true
          }
        }
        return false
      }
      return compareNumber(node.value, card.range, node.op)
    }
    return false
  }

  if (node.property == 'from') {
    if ('from' in card) {
      if (node.value == null || card.from == null) {
        return card.from == node.value
      }
      return compareRegexStrProperties(node.value, card.from, node.op)
    }
    return false
  }
  if (node.property == 'target') {
    if ('target' in card) {
      if (node.value == null || card.target == null) {
        return card.target == node.value
      }
      return compareRegexStrProperties(node.value, card.target, node.op)
    }
    return false
  }

  if (node.property == 'not') {
    return !filterCard(card, cardName, type, node.queries)
  }

  if (node.property == 'or') {
    return (
      filterCard(card, cardName, type, node.left) || filterCard(card, cardName, type, node.right)
    )
  }

  if (node.property == 'and') {
    for (var subNode of node.queries) {
      if (!filterCard(card, cardName, type, subNode)) {
        return false
      }
    }
    return true
  }

  // These are all string/regex properties
  if (node.property == 'text') {
    // fear card
    if ('terrorLevel1' in card) {
      return (
        compareRegexStrProperties(node.value, card.terrorLevel1.toLowerCase(), ':') ||
        compareRegexStrProperties(node.value, card.terrorLevel2.toLowerCase(), ':') ||
        compareRegexStrProperties(node.value, card.terrorLevel3.toLowerCase(), ':')
      )
    }
    // event card
    if ('sections' in card) {
      for (let section of card.sections) {
        if (compareRegexStrProperties(node.value, section.text.toLowerCase(), ':')) {
          return true
        }
      }
      return false
    }
    // if there is a threshold
    if (
      'threshold' in card &&
      card.threshold != null &&
      compareRegexStrProperties(node.value, card.threshold.ability.toLowerCase(), ':')
    ) {
      return true
    }
    // other cards
    return 'text' in card && compareRegexStrProperties(node.value, card.text.toLowerCase(), ':')
  }
  if (node.property == 'terror1') {
    return (
      'terrorLevel1' in card &&
      compareRegexStrProperties(node.value, card.terrorLevel1.toLowerCase(), ':')
    )
  }
  if (node.property == 'terror2') {
    return (
      'terrorLevel2' in card &&
      compareRegexStrProperties(node.value, card.terrorLevel2.toLowerCase(), ':')
    )
  }
  if (node.property == 'terror3') {
    return (
      'terrorLevel3' in card &&
      compareRegexStrProperties(node.value, card.terrorLevel3.toLowerCase(), ':')
    )
  }
  if (node.property == 'thresholdtext') {
    return (
      'threshold' in card &&
      card.threshold != null &&
      compareRegexStrProperties(node.value, card.threshold.ability.toLowerCase(), ':')
    )
  }
  if (node.property == 'thresholdcondition') {
    return (
      'threshold' in card &&
      card.threshold != null &&
      card.threshold.condition != null &&
      compareRegexStrProperties(node.value, card.threshold.condition.toLowerCase(), ':')
    )
  }

  // This is an event text
  if ('sections' in card) {
    let event = node.property.replace(' event', '')
    for (var section of card.sections) {
      if (event == section.type) {
        return compareRegexStrProperties(
          node.value as string | RegExp,
          section.text.toLowerCase(),
          ':',
        )
      }
    }
  }
  return false
}

function compareRegexStrProperties(
  propertyValue: string | RegExp,
  cardValue: string,
  op: ':' | '=',
) {
  if (typeof propertyValue == 'string') {
    if (op == ':' && cardValue.includes(propertyValue)) {
      return true
    }
    if (op == '=' && cardValue == propertyValue) {
      return true
    }
    return false
  }
  return propertyValue.test(cardValue)
}

function compareNumber(propertyValue: number, cardValue: number, op: Op) {
  switch (op) {
    case '=':
    case ':':
      return propertyValue == cardValue
    case '<':
      return cardValue < propertyValue
    case '>':
      return cardValue > propertyValue
    case '<=':
      return cardValue <= propertyValue
    case '>=':
      return cardValue >= propertyValue
  }
}

function filterNonCard(name: string, node: QueryNode): boolean {
  if (node.property == 'name') {
    return compareRegexStrProperties(node.value, name, node.op)
  }

  if (node.property == 'or') {
    let left = filterNonCard(name, node.left)
    if (!left) {
      return filterNonCard(name, node.right)
    }
    return true
  }

  if (node.property == 'and') {
    for (var subNode of node.queries) {
      if (!filterNonCard(name, subNode)) {
        return false
      }
    }
    return true
  }
  return false
}
