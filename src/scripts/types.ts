// Fundemental Types
export const spirits = [
  "lightning's swift strike",
  'river surges in sunlight',
  'shadows flicker like flame',
  'vital strength of the earth',
  'a spread of rampant green',
  'thunderspeaker',
  'bringer of dreams and nightmares',
  "ocean's hungry grasp",
  'keeper of the forbidden wilds',
  'sharp fangs behind the leaves',
  'heart of the wildfire',
  'serpent slumbering beneath the island',
  'grinning trickster stirs up trouble',
  'lure of the deep wilderness',
  'many minds move as one',
  'shifting memory of ages',
  "stone's unyielding defiance",
  'volcano looming high',
  'shroud of silent mist',
  'vengeance as a burning plague',
  'fractured days split the sky',
  'starlight seeks its form',
  'downpour drenches the world',
  'finder of paths unseen',
  'devouring teeth lurk underfoot',
  'eyes watch from the trees',
  'fathomless mud of the swamp',
  'rising heat of stone and sand',
  'sun-bright whirlwind',
  'ember-eyed behemoth',
  'hearth-vigil',
  'towering roots of the jungle',
  'breath of darkness down your spine',
  'relentless gaze of the sun',
  'wandering voice keens delirium',
  'wounded waters bleeding',
  'dances up earthquakes',
] as const
export type Spirit = (typeof spirits)[number]

export type Display = 'light' | 'dark' | 'system'

export type Element = 's' | 'm' | 'f' | 'a' | 'w' | 'e' | 'p' | 'n'

// Databse-Related Types
export type Access = 'private' | 'public' | 'unlisted'

export interface UserData {
  id: string
  theme: Element
  display: Display
  spirit: Spirit
  username: string
  description: string
}

export interface ArticleData {
  id: string
  user: string
  img: null | string
  title: string
  description: string
  tags: string[]
  content: string
  access: Access
  published: string
  updated: string
  likes: number
}

// Game Asset Types
export const setNames = [
  'spirit island',
  'horizons of spirit island',
  'branch and claw',
  'jagged earth',
  'nature incarnate',
  'feather and flame',
  'promo pack 2',
  'promo pack 1',
] as const
export type SetName = (typeof setNames)[number]

type Environment = 'jungle' | 'wetland' | 'mountain' | 'sands'

export const status = ['active', 'retired', 'replaced'] as const
export type Status = (typeof status)[number]

type From = 'sacred site' | Environment | `${Environment} or ${Environment}` | 'dahan' | 'blight' 

type Target =
  | 'any land'
  | 'any spirit'
  | 'dahan'
  | 'no blight'
  | Environment
  | `${Environment} or ${Environment}`
  | 'blight'
  | 'invaders'
  | 'coastal'
  | 'inland'
  | 'no invaders'
  | 'another spirit'
  | 'yourself'
  | 'city'
  | 'coastal city'
  | 'coastal or wetland'
  | 'any two lands'
  | 'not wetland'
  | 'disease'
  | 'beast'
  | 'beasts'
  | 'jungle or no blight'
  | 'town or city'
  | 'strife'
  | 'dahans'
  | 'blight and invaders'
  | `${Spirit}'s incarna`

type Threshold = {
  elements: Partial<Record<Element, number>>
  ability: string
  condition?: string
}

export const eventTypes = [
  'terror 1',
  'terror 1 & 2',
  'terror 2 & 3',
  'terror 3',
  'stage 1',
  'stages 1 & 2',
  'stages 2 & 3',
  'stage 3',
  'healthy island',
  'blighted island',
  'group choice',
  'individual choice',
  'adversary event',
  'beasts',
  'dahan',
  'disease',
  'badlands',
  'disease and strife',
  'badlands and beasts',
] as const
export type EventType = (typeof eventTypes)[number]

export type EventSection = {
  type: EventType
  name: string
  text: string
}

export type PowerCard = {
  caseName: string
  image: string
  set: SetName[]
  cardType: string
  unique?: Spirit
  cost: number
  elements: Element[]
  speed: 'slow' | 'fast'
  range: null | number | number[]
  target: null | Target
  from: null | From
  text: string
  threshold: null | Threshold
  artist: string
  status: Status
  art: string | null
}

export type BlightCard = {
  image: string
  set: SetName[]
  islandHealth: 'blighted' | 'healthy'
  text: string
  blightPerPlayer: number
  status: Status
  caseName: string
}

export type FearCard = {
  image: string
  set: SetName[]
  terrorLevel1: string
  terrorLevel2: string
  terrorLevel3: string
  status: Status
  caseName: string
}

export type EventCard = {
  image: string
  set: SetName[]
  sections: EventSection[]
  status: Status
  caseName: string
}

export type AspectCard = {
  image: string
  set: SetName | SetName[]
  aspect: Spirit
  caseName: string
}

export type Card = PowerCard | FearCard | EventCard | BlightCard | AspectCard

export type Adversary = {
  flag: string
  map: string | null
  image: string
  caseName: string
}
export type Scenario = {
  art: string | null
  caseName: string
}

export interface SpiritData {
  img_small: string
  img_large: string
  image: string
  caseName: string
}

// Miscellaneous Types

export type HeaderData = { id: number; children: HeaderData[] }

export const cardSearchOrders = [
  'Type',
  'Name',
  'Cost',
  'Speed',
  'Range',
  'Artist',
] as const
export type CardSearchOrders = (typeof cardSearchOrders)[number]

export type Direction = 'Ascending' | 'Descending'