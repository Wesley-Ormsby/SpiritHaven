const elementReg = '(sun|moon|fire|air|water|earth|plant|animal|any|star)'
export const elementSymbols = [
  'sun',
  'moon',
  'fire',
  'air',
  'water',
  'earth',
  'plant',
  'animal',
  'any',
  'star',
] as const
export type ElementSymbol = (typeof elementSymbols)[number]
interface CustomSymbolData {
  regex: string
  values: SymbolToken[]
}
type SymbolToken =
  | {
      type: 'constant'
      value: string
    }
  | {
      type: 'number'
      label: string
      default: number
      min: number
      max: number
      key: string
    }
  | {
      type: 'element'
      label: string
      default: ElementSymbol
      key: string
    }

export const CUSTOM_SYMBOLS: Record<string, CustomSymbolData> = {
  'Card Plays': {
    regex: 'plays_\\d',
    values: [
      {
        type: 'constant',
        value: 'plays',
      },
      {
        type: 'number',
        label: 'Card Plays (0-9)',
        default: 5,
        min: 0,
        max: 9,
        key: 'plays',
      },
    ],
  },
  'Energy Card Plays': {
    regex: 'energy_\\d_plays_\\d',
    values: [
      {
        type: 'constant',
        value: 'energy',
      },
      {
        type: 'number',
        label: 'Energy (0-9)',
        default: 0,
        min: 0,
        max: 9,
        key: 'energy',
      },
      {
        type: 'constant',
        value: 'plays',
      },
      {
        type: 'number',
        label: 'Card Plays (0-9)',
        default: 1,
        min: 0,
        max: 9,
        key: 'plays',
      },
    ],
  },
  'Energy Element': {
    regex: `energy_${elementReg}`,
    values: [
      {
        type: 'constant',
        value: 'energy',
      },
      {
        type: 'element',
        label: 'Select an Element',
        default: 'air',
        key: 'element',
      },
    ],
  },
  'Energy Double Element': {
    regex: `energy_${elementReg}_${elementReg}`,
    values: [
      {
        type: 'constant',
        value: 'energy',
      },
      {
        type: 'element',
        label: 'Top Element',
        default: 'fire',
        key: 'top',
      },
      {
        type: 'element',
        label: 'Bottom Element',
        default: 'plant',
        key: 'bottom',
      },
    ],
  },
  Energy: {
    regex: `energy_\\d+`,
    values: [
      {
        type: 'constant',
        value: 'energy',
      },
      {
        type: 'number',
        label: 'Energy Amount (0-12)',
        default: 3,
        min: 0,
        max: 12,
        key: 'energy',
      },
    ],
  },
  'Gain Energy': {
    regex: `gain_energy_\\d+`,
    values: [
      {
        type: 'constant',
        value: 'gain',
      },
      {
        type: 'constant',
        value: 'energy',
      },
      {
        type: 'number',
        label: 'Energy Amount (0-9)',
        default: 7,
        min: 0,
        max: 9,
        key: 'energy',
      },
    ],
  },
  'Pay Energy': {
    regex: `pay_energy_\\d+`,
    values: [
      {
        type: 'constant',
        value: 'pay',
      },
      {
        type: 'constant',
        value: 'energy',
      },
      {
        type: 'number',
        label: 'Energy Amount (0-9)',
        default: 3,
        min: 0,
        max: 9,
        key: 'energy',
      },
    ],
  },
}

export function makeSymbolDataFromRegex(symbol: string, symbolName?: string): CustomSymbol {
  let name = symbolName
  if (name == undefined) {
    for (let key of Object.keys(CUSTOM_SYMBOLS)) {
      if (symbol.match(new RegExp("^" + CUSTOM_SYMBOLS[key].regex + "$"))) {
        name = key
      }
    }
  }
  if (name == undefined) {
    return { type: 'Card Plays', plays: 0 } // This should never be returned
  }
  const split = symbol.split('_')
  const data: Record<string, any> = { type: name }
  for (let [i, token] of CUSTOM_SYMBOLS[name].values.entries()) {
    if (token.type == 'element') {
      data[token.key] = split[i]
    } else if (token.type == 'number') {
      data[token.key] = Number(split[i])
    }
  }
  return data as CustomSymbol
}

// Note, `name` must be in the custom symbols record
export function makeDefaultSymbolData(name: string) {
  const data: Record<string, any> = { type: name }
  for (let token of CUSTOM_SYMBOLS[name].values) {
    if (token.type != 'constant') {
      data[token.key] = token.default
    }
  }
  return data as CustomSymbol
}

export type CustomSymbol =
  | {
      type: 'Card Plays'
      plays: number
    }
  | {
      type: 'Energy Element'
      element: ElementSymbol
    }
    | {
      type: 'Energy Double Element'
      top: ElementSymbol
      bottom: ElementSymbol
    }
  | {
      type: 'Energy'
      energy: number
    }
  | {
      type: 'Gain Energy'
      energy: number
    }
  | {
      type: 'Pay Energy'
      energy: number
    }
    | {
      type: 'Energy Card Plays'
      energy: number
      plays: number
    }
