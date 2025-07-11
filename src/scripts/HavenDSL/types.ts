import {
  type Spirit,
  type SetName,
  type Status,
  type EventType,
  spirits,
  type Element,
} from '../types'

// Token Type
export type TT =
  | 'int'
  | 'string'
  | 'regex'
  | 'null'
  // Other syntax
  | 'not'
  | 'lpren'
  | 'rpren'
  | 'or'
  | 'op'
  | 'EOF'

export type Op = '=' | ':' | '<' | '>' | '<=' | '>='

export type Token =
  | {
      type: 'int'
      value: number
      lexeme: string
    }
  | {
      type: 'op'
      value: Op
      lexeme: string
    }
  | {
      type: 'regex'
      value: RegExp
      lexeme: string
    }
    | {
        type: 'null'
        value: null
        lexeme: string
      }
  | {
      type: Exclude<TT, 'int' | 'op'>
      value: string
      lexeme: string
    }

export type Query = {
  includeLargeComponents: boolean
  query: QueryNode
}

export const cardTypes = [
  'unique',
  'aspect',
  'blight',
  'event',
  'fear',
  'power',
  'major',
  'minor',
  ...spirits,
] as const
export type CardType = (typeof cardTypes)[number]

export type QueryNode = // All

    | {
        property: 'type'
        value: CardType
      }
    | {
        property: 'name' | 'eventname' | 'artist' | 'aspect'
        op: ':' | '='
        value: string
      }
    | {
        property: 'set'
        value: SetName
      }
    | {
        property: 'status'
        value: Status
      }
    // Other Shared
    | {
        property:
          | 'text'
          | `${EventType} event`
          | 'terror1'
          | 'terror2'
          | 'terror3'
          | 'thresholdtext'
          | 'thresholdcondition'
        value: string | RegExp
      }
    // Blight
    | {
        property: 'health'
        value: 'healthy' | 'blighted'
      }
    | {
        property: 'blight' | 'cost'
        value: number
        op: Op
      }
    // Events
    | {
        property: 'eventtype'
        value: EventType
      }
    // Powers
    | {
        property: 'elements' | 'thresholdelements'
        value: Partial<Record<Element, number>> | number
        op: ':' | '='
      }
    | {
        property: 'speed'
        value: 'slow' | 'fast'
      }
    | {
        property: 'range'
        value: number | null
        op: Op
      }
    | {
        property: 'from' |'target'
        value: string | RegExp | null
        op: ':' | '='
      }
    | {
        property: 'not'
        queries: QueryNode
      }
    | {
        property: 'or'
        left: QueryNode
        right: QueryNode
      }
    | AndNode

export type AndNode = {
  property: 'and'
  queries: QueryNode[]
}

export type QueryResult = {
  errors: string[]
  query: string[]
}
