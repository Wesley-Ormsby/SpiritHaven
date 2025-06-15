//export type Element = 'sun' | 'moon' | 'fire' | 'air' | 'water' | 'earth' | 'plant' | 'animal'
export type Spirit =
  | "lightning's swift strike"
  | 'river surges in sunlight'
  | 'shadows flicker like flame'
  | 'vital strength of the earth'
  | 'a spread of rampant green'
  | 'thunderspeaker'
  | 'bringer of dreams and nightmares'
  | "ocean's hungry grasp"
  | 'keeper of the forbidden wilds'
  | 'sharp fangs behind the leaves'
  | 'heart of the wildfire'
  | 'serpent slumbering beneath the island'
  | 'grinning trickster stirs up trouble'
  | 'lure of the deep wilderness'
  | 'many minds move as one'
  | 'shifting memory of ages'
  | "stone's unyielding defiance"
  | 'volcano looming high'
  | 'shroud of silent mist'
  | 'vengeance as a burning plague'
  | 'fractured days split the sky'
  | 'starlight seeks its form'
  | 'downpour drenches the world'
  | 'finder of paths unseen'
  | 'devouring teeth lurk underfoot'
  | 'eyes watch from the trees'
  | 'fathomless mud of the swamp'
  | 'rising heat of stone and sand'
  | 'sun-bright whirlwind'
  | 'ember-eyed behemoth'
  | 'hearth-vigil'
  | 'towering roots of the jungle'
  | 'breath of darkness down your spine'
  | 'relentless gaze of the sun'
  | 'wandering voice keens delirium'
  | 'wounded waters bleeding'
  | 'dances up earthquakes'
export interface SpiritData {
  img_small: string
  img_large: string
  image: string
  caseName: string
}
export type Access = 'private' | 'public' | 'unlisted'

export type Display = 'light' | 'dark' | 'system'
export interface UserData {
  id: string
  theme: Element
  display: Display
  spirit: Spirit
  username: string
  description: string
}

export interface ArticleData {
  id:string,
  user: string
  img: null | string
  title: string
  description: string
  tags: string[]
  content: string
  access: Access
  published: string
  updated: string
}

type SetName = "Spirit Island" | "Horizons of Spirit Island" | "Branch and Claw" | "Jagged Earth" | "Nature Incarnate" | "Feather and Flame" | "Promo Pack 2" | "Promo Pack 1"// can loose autocomplete this
export type Element = "s" | "m" | "f" | "a" | "w" | "e" | "p" | "n" 
type Environment = "jungle" | "wetland" | "mountain" | "sands"
type Status = "active" | "retired" | "replaced"


type From = "sacred site" | Environment | `${Environment} or ${Environment}` | "dahan" | "blight" // can loose autocomplete this
type Target = "any land" | "any spirit" | "dahan" | "no blight" | Environment | `${Environment} or ${Environment}` | "blight" | "invaders" | "coastal" | "inland" | "no invaders" | "another spirit" | "yourself" | "city" | "coastal city" | "coastal or wetland" | "any two lands" | "not wetland" | "disease" | "beast" | "beasts" | "jungle or no blight" | "town or city" | "strife" | "dahans" | "blight and invaders" | `${Spirit}'s incarna`
type Threshhold = {
    elements: Partial<Record<Element, number>>,
    ability: string,
    condition?: string
}
export type PowerCard = {
    caseName: string;
    image: string,
    set: SetName[],
    cardType: string,
    unique?: Spirit,
    cost: number,
    elements: Element[],
    speed: "slow" | "fast",
    range: null | number | number[],
    target: null | Target,
    from: null | From,
    effect: string,
    threshhold: null | Threshhold,
    artist: string,
    status: Status,
    art: string | null
}

export type BlightCard = {
  image: string,
  set: SetName[],
  islandHealth: "blighted" | "healthy",
  text: string,
  blightPerPlayer: number,
  status: Status
  caseName:string
}

export type FearCard = {
  image: string,
  set: SetName[],
  terrorLevel1: string,
  terrorLevel2: string,
  terrorLevel3: string,
  status: Status
  caseName: string
}

export type EventType = "Terror Level 1" | "Terror Levels 1 & 2" | "Terror Levels 2 & 3" | "Terror Level 3"
| "Stage 1" | "Stages 1 & 2" | "Stages 2 & 3" | "Stage 3"
| "Healthy Island" | "Blighted Island"
| "Group Choice" | "Individual Choice" | "Adversary Event"
| "Beasts" | "Dahan" | "Disease" | "Badlands" | "Disease and Strife" | "Badlands and Beasts"

export type EventSection = {
  type: EventType,
  name: string,
  text: string
}

export type EventCard = {
  image: string,
  set: SetName[],
  sections: EventSection[],
  status: Status
  caseName: string
}

export type AspectCard = {
  image: string,
  set: SetName | SetName[],
  spirit: Spirit
  caseName: string
}

export type Adversary = {
  flag: string,
  map: string | null
  image: string
  caseName: string
}
export type Scenario = {
  art: string | null
  caseName: string
}