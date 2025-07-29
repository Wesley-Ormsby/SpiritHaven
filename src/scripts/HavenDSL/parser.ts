import { eventTypes, setNames, status, type Element } from '../types'
import { cardTypes, type AndNode, type QueryNode, type Token } from './types'

export class Parser {
  private tokens: Token[]
  private error: string

  constructor(tokens: Token[]) {
    this.tokens = tokens
    this.error = ''
  }

  parse() {
    let group = this.parseGroup()
    if (!group) {
      return { ast: group, error: this.error }
    }
    if (!this.atEnd()) {
      this.error = `Unexpected token: \`${this.peek().lexeme}\``
      return { ast: group, error: this.error }
    }
    return { ast: this.flattenGroup(group), error: this.error }
  }

  private parseProperty(group: QueryNode[]): boolean {
    let token = this.peek()

    // Parse property
    if (token.type == 'string') {
      this.shift()
      const rawProperty = token.value
      let standardizedProperty = token.value.toLowerCase()
      if (standardizedProperty in propertyMap) {
        standardizedProperty = propertyMap[standardizedProperty]
      }
      if (standardizedProperty in propertyRules) {
        return this.parsePropertyRule(
          group,
          rawProperty,
          standardizedProperty,
          propertyRules[standardizedProperty],
        )
      } else {
        // Parse name property
        group.push({
          property: 'name',
          op: ':',
          value: standardizedProperty,
        })
        if (this.peek().type == 'op') {
          this.error = `Unexpected token \`${this.peek().lexeme}\` and/or invalid property name \`${rawProperty}\``
          return false
        }
        return true
      }
    }

    // Parse not
    if (token.type == 'not') {
      this.shift()
      let newGroup: QueryNode[] = []
      let nextProp = this.parseProperty(newGroup)
      if (this.error) {
        return false
      }
      if (!nextProp) {
        this.error = `Expected clause after \`-\` operator`
        return false
      }
      group.push({ property: 'not', queries: newGroup[0] })
      return true
    }

    // Parse or
    if (token.type == 'or') {
      this.shift()
      let right = this.parseGroup()
      if (!right) {
        return false
      }
      if ((right as AndNode).queries.length == 0) {
        this.error = `Expected right clause(s) for \`or\` operator`
      }
      let left: QueryNode = this.flattenGroup({ property: 'and', queries: group })
      right = this.flattenGroup(right)
      const orNode = { property: 'or', left, right } as QueryNode
      group.splice(0, group.length, orNode)
      return true
    }

    // Parse groups
    if (token.type == 'lparen') {
      this.shift()
      let newGroup = this.parseGroup()
      if (!newGroup) {
        return false
      }
      if ((newGroup as AndNode).queries.length == 0) {
        this.error = `Expected a clause inside parentheses; group cannot be empty`
      }
      if (this.peek().type != 'rparen') {
        this.error = `Expected \`)\` to end parenthesized group`
        return false
      }
      this.shift() // remove `)`
      group.push(this.flattenGroup(newGroup))
      return true
    }

    // Otherwise, not a property
    return false
  }

  private parsePropertyRule(
    group: QueryNode[],
    rawProperty: string,
    standardizedProperty: string,
    rule: RuleDef,
  ): boolean {
    const showStandardizedProperty = rawProperty.toLowerCase() != standardizedProperty ? `(${standardizedProperty}) ` : ""
    // Validate operator
    const operator = this.shift()
    if (
      rule.type == 'int' ||
      (Array.isArray(rule.type) && (rule.type as string[]).includes('int'))
    ) {
      if (operator.type != 'op') {
        this.error = `Expected operator for \`${rawProperty}\` ${showStandardizedProperty}property`
        return false
      }
    } else if ('op' in rule) {
      if (operator.type != 'op' || (operator.value != ':' && operator.value != '=')) {
        this.error = `Expected \`:\` or \`=\` operator for \`${rawProperty}\` ${showStandardizedProperty}property`
        return false
      }
    } else {
      if (operator.type != 'op' || operator.value != ':') {
        this.error = `Expected \`:\` operator for \`${rawProperty}\` ${showStandardizedProperty}property`
        return false
      }
    }
    // Validate value type
    const value = this.shift()
    const valueType = value.type
    if (Array.isArray(rule.type) && (rule.type as string[]).includes('element')) {
      if (value.type == 'int') {
        group.push({ property:standardizedProperty, value: value.value, op: operator.value } as QueryNode)
        return true
      } else if (value.type == 'string') {
        if (operator.value != ':' && operator.value != '=') {
          this.error = `Expected int value for \`${rawProperty}\` (element) property with \`${operator.value}\` operator`
          return false
        }
        if (!/^(?:\d*[smfawepn])*$/i.test(value.value)) {
          this.error = `Expected valid element pattern in word or string value for \`${rawProperty}\` ${showStandardizedProperty}property`
          return false
        }
        const counts: Partial<Record<Element, number>> = {}
        const matches = [...value.value.matchAll(/(\d*)([smfawepn])/gi)]

        for (const [, digits, element] of matches) {
          const el = element.toLowerCase() as Element
          const num = digits ? parseInt(digits, 10) : 1
          counts[el] = (counts[el] ?? 0) + num
        }
        group.push({ property:standardizedProperty, value: counts, op: operator.value } as QueryNode)
        return true
      } else {
        if (operator.value != '=' && operator.value != ':') {
          this.error = `Expected integer for \`${rawProperty}\` ${showStandardizedProperty}property with \`${operator.value}\` operator`
          return false
        }
        this.error = `Expected element pattern value or integer for \`${rawProperty}\` ${showStandardizedProperty}property`
        return false
      }
    } else if (rule.type == 'enum') {
      if (value.type != 'string') {
        this.error = `Expected word or string value for \`${rawProperty}\` ${showStandardizedProperty}property`
        return false
      }
      let propertyVal = value.value.toLowerCase()
      if (rule.enumMap && propertyVal in rule.enumMap) {
        propertyVal = rule.enumMap[propertyVal]
      }
      if (rule.value.includes(propertyVal)) {
        group.push({ property:standardizedProperty, value: propertyVal } as QueryNode)
        return true
      } else {
        this.error = `Invalid value for \`${rawProperty}\` ${showStandardizedProperty}property`
        return false
      }
    } else if (Array.isArray(rule.type)) {
      if (!(rule.type as string[]).includes(valueType)) {
        this.error = `Expected value of type ${rule.type.map((type) => `\`${type}\``).join(' or ')} for \`${rawProperty}\` property`
        return false
      }
    } else if (rule.type != valueType) {
      this.error = `Expected value of type \`${rule.type}\` for \`${rawProperty}\` ${showStandardizedProperty}property`
      return false
    }
    // Once we validate the type, if it uses an 'int' operator but not an 'int' value, there is an error
    if (
      Array.isArray(rule.type) &&
      (rule.type as string[]).includes('int') &&
      valueType != 'int' &&
      operator.value != ':'
    ) {
      this.error = `Expected \`:\` operator for \`${rawProperty}\` ${showStandardizedProperty}property with \`${value.type}\` value`
      return false
    }
    let nodeValue = typeof value.value == 'string' ? value.value.toLowerCase() : value.value
    group.push(
      'op' in rule
        ? ({
            property: standardizedProperty,
            value: nodeValue,
            op: operator.value,
          } as QueryNode)
        : ({
            property: standardizedProperty,
            value: nodeValue,
          } as QueryNode),
    )
    return true
  }

  private parseGroup(): QueryNode | null {
    let group: QueryNode[] = []
    while (true) {
      let node = this.parseProperty(group)
      if (!node) {
        if (this.error) {
          return null
        } else {
          break
        }
      }
    }

    return { property: 'and', queries: group }
  }

  private atEnd() {
    return this.tokens.length == 1
  }

  private peek() {
    return this.tokens[0]
  }

  private shift() {
    return this.tokens.shift() as Token
  }

  private flattenGroup(node: QueryNode): QueryNode {
    if (node.property == 'and' && node.queries.length === 1) {
      return node.queries[0]
    }
    return node
  }
}

type RuleDef =
  | { type: 'regex' | 'string' | 'int' }
  | { type: 'int'; op: true }
  | { type: 'enum'; value: readonly string[]; enumMap?: Record<string, string> }
  | { type: ['string', 'regex']; op?: true }
  | { type: ['element', 'int']; op: true }
  | { type: ['int', 'null']; op: true }
  | { type: ['string', 'regex', 'null']; op: true }

const propertyMap: Record<string, string> = {
  s: 'set',
  en: 'eventname',
  n: 'name',
  h: 'health',
  b: 'blight',
  c: 'cost',
  et: 'eventtype',
  e: 'elements',
  te: 'thresholdelements',
  tt: 'thresholdtext',
  tc: 'thresholdcondition',
  r: 'range',
  f: 'from',
  a: 'artist',
  t1: 'terror1',
  t2: 'terror2',
  t3: 'terror3',
}
const propertyRules: Record<string, RuleDef> = {
  type: {
    type: 'enum',
    value: cardTypes,
    enumMap: {
      u: 'unique',
      a: 'aspect',
      b: 'blight',
      e: 'event',
      f: 'fear',
      p: 'power',
    },
  },
  name: {
    type: ['string', 'regex'],
    op: true,
  },
  eventname: {
    type: ['string', 'regex'],
    op: true,
  },
  artist: {
    type: ['string', 'regex'],
    op: true,
  },
  aspect: {
    type: ['string', 'regex'],
    op: true,
  },
  set: {
    type: 'enum',
    value: setNames,
    enumMap: {
      si: 'spirit island',
      h: 'horizons of spirit island',
      bc: 'branch and claw',
      je: 'jagged earth',
      ni: 'nature incarnate',
      ff: 'feather and flame',
      pp1: 'promo pack 2',
      pp2: 'promo pack 1',
    },
  },
  status: {
    type: 'enum',
    value: status,
  },
  ...[
    'text',
    'terror1',
    'terror2',
    'terror3',
    'thresholdtext',
    'thresholdcondition',
    ...eventTypes.map((e) => e + ' event'),
  ].reduce((acc: Record<string, RuleDef>, key) => {
    acc[key] = { type: ['string', 'regex'] }
    return acc
  }, {}),
  health: {
    type: 'enum',
    value: ['healthy', 'blighted'],
    enumMap: {
      h: 'healthy',
      b: 'blighted',
    },
  },
  blight: {
    type: 'int',
    op: true,
  },
  cost: {
    type: 'int',
    op: true,
  },
  eventtype: {
    type: 'enum',
    value: eventTypes,
    enumMap: {
      t1: 'terror 1',
      t12: 'terror 1 & 2',
      t23: 'terror 2 & 3',
      t3: 'terror 3',
      s1: 'stage 1',
      s12: 'stages 1 & 2',
      s23: 'stages 2 & 3',
      s3: 'stage 3',
      h: 'healthy island',
      b: 'blighted island',
      gc: 'group choice',
      ic: 'individual choice',
      ae: 'adversary event',
    },
  },
  elements: {
    type: ['element', 'int'],
    op: true,
  },
  thresholdelements: {
    type: ['element', 'int'],
    op: true,
  },
  speed: {
    type: 'enum',
    value: ['slow', 'fast'],
    enumMap: {
      s: 'slow',
      f: 'fast',
    },
  },
  range: {
    type: ['int', 'null'],
    op: true,
  },
  from: {
    type: ['string', 'regex', 'null'],
    op: true,
  },
  target: {
    type: ['string', 'regex', 'null'],
    op: true,
  },
}
