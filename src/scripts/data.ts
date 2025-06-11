import type {
  Spirit,
  Element,
  SpiritData,
  PowerCard,
  FearCard,
  EventCard,
  BlightCard,
  AspectCard,
  Adversary,
  Scenario,
} from './types'

// Card plays 1-9?
// Energy 1-12, reclaim 1, elements + any
// Energy + elements/reclaim/any.../prepare element marker
// gain energy 1-12: looks like +x
// Range 0-5 + any, I need the arrow
//    Range can also have an icon like dahan (thunderspeeker) above it
//    It can also have COSTAL or INVADERS or YOURSELF or INLAND or encarna + INVADERS
//    It can also be a +1 range
//    It can also have a third icon (+ precess / + beasts) above the other two
//    It could alternativly be a move arrow
//    It could have 3 ors or +x/y (see vengence plauge guy)
//    It could have an ANY (move to any land): see breath of darkness down spine
// Keeper:
//    - It has an or in the range  (same as sharp fangs + trickster + Many Minds)
//    - It has a gain a power card with a cost
//    - It has a reclaim 1 with a 5 card plays
// Stone's unyeilding defience:
//    - it has some double elements like and element + reclaim 1
// WILDFIRE:
//   - Fire/Plant energy (https://spiritislandwiki.com/images/thumb/9/92/Fireplantenergy.png/120px-Fireplantenergy.png)
// Mist: Move 1 precesnse
// STARLIGHT: spots have +1 and remember Element star
// FINDER: has ignor range check: (https://spiritislandwiki.com/images/thumb/5/5a/Checkmark.png/36px-Checkmark.png)
//      Can also have a move + element and + 1 range on everything
//      Of energy + 1 range on evenrything
//  EMBER EYED BEHEMOTH: reclaim all with fire
//      Discard a card with fire
//  TOWERING ROOTS:
//      Replace presence with incarna (it has the x): maybe make an x over presense icon
// BREATH OF DARKNESS DOWN YOUR SPINE:
//    Add/Move Incarna to Land with Your Presence (Same as wandering voice keens delirium)
// RELENTLESS GAZE OF SUN:
//    it has 3 things ontop of a range
//    x2 energy spot
// WANDERING VOICE:
//    On element track, it has sun or mooon (https://spiritislandwiki.com/images/thumb/d/d1/Sunormoon.png/108px-Sunormoon.png)
// WOUNDED WATERS:
//     - has energy/cardplay on same track spance
//     - Has Energy of 4 plus a fire/PlaneTakeoff
// DANCES UP EARTHQUAKES
//    - has +/- above impending card
//    - has move presense in energy slot
//    - energy per turn + energy per empending
//    -
// You can also have a energy_fire_water (not just fire_or_water)
// We can get the fast/slow border on card plays and append white number:
// https://spiritislandwiki.com/index.php?title=Template:FullPowerCard
// https://spiritislandwiki.com/index.php?title=Template:FullSmallPowerCardApocrypha

// 4 elements: https://spiritislandwiki.com/index.php?title=Template:Growth

// This page: https://spiritislandwiki.com/index.php?title=Template:Targeting

// https://spiritislandwiki.com/index.php?title=Template:PresenceTIcons
export const SYMBOL_DATA: Record<string, string> = {
  // Elements
  sun: 'https://spiritislandwiki.com/images/thumb/2/23/Esun.png/52px-Esun.png',
  moon: 'https://spiritislandwiki.com/images/thumb/a/a6/Emoon.png/52px-Emoon.png',
  fire: 'https://spiritislandwiki.com/images/thumb/e/ef/Efire.png/52px-Efire.png',
  air: 'https://spiritislandwiki.com/images/thumb/9/96/Eair.png/52px-Eair.png',
  water: 'https://spiritislandwiki.com/images/thumb/b/b4/Ewater.png/52px-Ewater.png',
  earth: 'https://spiritislandwiki.com/images/thumb/6/6e/Eearth.png/52px-Eearth.png',
  plant: 'https://spiritislandwiki.com/images/thumb/f/f2/Eplant.png/52px-Eplant.png',
  animal: 'https://spiritislandwiki.com/images/thumb/c/c9/Eanimal.png/52px-Eanimal.png',
  any: 'https://spiritislandwiki.com/images/thumb/4/42/Anyelement.png/60px-Anyelement.png',
  element: 'https://spiritislandwiki.com/images/thumb/a/a5/Element.png/120px-Element.png',

  // Card Plays
  card_1: 'https://spiritislandwiki.com/images/thumb/3/3c/Cardplay1.png/60px-Cardplay1.png',
  card_2: 'https://spiritislandwiki.com/images/thumb/6/63/Cardplay2.png/60px-Cardplay2.png',
  card_3: 'https://spiritislandwiki.com/images/thumb/5/5b/Cardplay3.png/60px-Cardplay3.png',
  card_4: 'https://spiritislandwiki.com/images/thumb/f/f3/Cardplay4.png/60px-Cardplay4.png',
  card_5: 'https://spiritislandwiki.com/images/thumb/3/35/Cardplay5.png/60px-Cardplay5.png',
  card_6: 'https://spiritislandwiki.com/images/thumb/0/00/Cardplay6.png/60px-Cardplay6.png',

  // Lands
  mountain: 'https://spiritislandwiki.com/images/f/fb/Mountainland.png',
  jungle: 'https://spiritislandwiki.com/images/a/ae/Jungle.png',
  sands: 'https://spiritislandwiki.com/images/a/a6/Sands.svg',
  wetland: 'https://spiritislandwiki.com/images/1/12/Wetland.svg',

  mountain_jungle: 'https://spiritislandwiki.com/images/3/3e/MountainJungle.svg',
  mountaion_sands:
    'https://spiritislandwiki.com/images/thumb/e/ed/Mountainsand.png/50px-Mountainsand.png',
  mountain_wetland: 'https://spiritislandwiki.com/images/b/b8/Mountainwetland.png',
  jungle_sands: 'https://spiritislandwiki.com/images/7/7f/JungleSands.svg',
  jungle_wetland: 'https://spiritislandwiki.com/images/0/04/Junglewetland.png',
  sands_wetland: 'https://spiritislandwiki.com/images/0/03/SandsWetland.svg',

  mountain_presence: 'https://spiritislandwiki.com/images/2/25/MountainPresence.svg',
  jungle_presence: 'https://spiritislandwiki.com/images/9/99/JunglePresence.svg',
  sands_presence: 'https://spiritislandwiki.com/images/4/47/SandsPresence.svg',
  wetland_presence: 'https://spiritislandwiki.com/images/e/e2/WetlandPresence.svg',

  // Board Tokens & Similar
  town: 'https://spiritislandwiki.com/images/f/fe/Town.svg',
  city: 'https://spiritislandwiki.com/images/b/ba/City.svg',
  explorer: 'https://spiritislandwiki.com/images/0/00/Explorer.svg',
  dahan: 'https://spiritislandwiki.com/images/7/72/Dahan.svg',
  blight: 'https://spiritislandwiki.com/images/f/f6/Blight.svg',
  no_blight: 'https://spiritislandwiki.com/images/4/43/Noblighticon.png',
  presence: 'https://spiritislandwiki.com/images/6/61/Presence.svg',
  sacred_site: 'https://spiritislandwiki.com/images/5/51/SacredSite.svg',
  destroyed_presence:
    'https://spiritislandwiki.com/images/thumb/0/07/Destroyedpresence.png/50px-Destroyedpresence.png',
  incarna: 'https://spiritislandwiki.com/images/b/b4/Incarna.svg',
  empower: 'https://spiritislandwiki.com/images/thumb/8/8e/Empowericon.png/120px-Empowericon.png',

  strife: 'https://spiritislandwiki.com/images/c/ce/Strife.svg',
  wilds: 'https://spiritislandwiki.com/images/a/aa/Wilds.svg',
  beasts: 'https://spiritislandwiki.com/images/3/34/Beasts.svg',
  badlands: 'https://spiritislandwiki.com/images/7/7c/Badlands.svg',
  disease: 'https://spiritislandwiki.com/images/d/d8/Disease.svg',
  vitality: 'https://spiritislandwiki.com/images/4/48/Vitalityicon.png',

  // Game Mechanics
  fear: 'https://spiritislandwiki.com/images/9/98/Fear.svg',
  isolate: 'https://spiritislandwiki.com/images/thumb/9/9e/Isolateicon.png/50px-Isolateicon.png',
  defend: 'https://spiritislandwiki.com/images/f/f8/Defend.svg',
  fast: 'https://spiritislandwiki.com/images/6/61/FastColor.svg',
  slow: 'https://spiritislandwiki.com/images/7/71/SlowColor.svg',
  minor: 'https://spiritislandwiki.com/images/thumb/f/f6/Minorsymbol.png/30px-Minorsymbol.png',
  escalation: 'https://spiritislandwiki.com/images/8/83/Escalation.svg',
  terror_1: 'https://spiritislandwiki.com/images/d/dd/Terror1.svg',
  terror_2: 'https://spiritislandwiki.com/images/5/54/Terror2.svg',
  terror_3: 'https://spiritislandwiki.com/images/9/9e/Terror3.svg',

  // Growth + Presence Tracks
  reclaim_all: 'https://spiritislandwiki.com/images/e/e9/Reclaimall.png',
  reclaim_one: 'https://spiritislandwiki.com/images/7/71/Reclaimone.png',
  reclaim_half:
    'https://spiritislandwiki.com/images/thumb/c/cb/Reclaim_Half.png/120px-Reclaim_Half.png',
  push_1_dahan:
    'https://spiritislandwiki.com/images/thumb/f/f3/Pushdahanicon.png/120px-Pushdahanicon.png',
  gather_1_dahan:
    'https://spiritislandwiki.com/images/thumb/b/b5/Gather1Dahan.png/120px-Gather1Dahan.png',
  gain_card: 'https://spiritislandwiki.com/images/f/fb/Gaincardicon.png',

  // Spirit Specific:
  gather_into_ocean: 'https://spiritislandwiki.com/images/5/5e/Gathertoocean.png',
  push_from_ocean: 'https://spiritislandwiki.com/images/8/89/Pushfromocean.png',
  ocean: 'https://spiritislandwiki.com/images/8/89/Ocean.png',
  gain_1_per_fire:
    'https://spiritislandwiki.com/images/thumb/3/3b/Oneenergyfire.png/120px-Oneenergyfire.png',
  gain_energy_for_card_plays:
    'https://spiritislandwiki.com/images/thumb/e/eb/Energy_Gain_1_Per_Card_Play.png/120px-Energy_Gain_1_Per_Card_Play.png',
  gather_beasts:
    'https://spiritislandwiki.com/images/thumb/6/6f/Land_Gather_Beasts.png/120px-Land_Gather_Beasts.png',
  prepare_element:
    'https://spiritislandwiki.com/images/thumb/0/0d/Element_Marker_Gain_1.png/62px-Element_Marker_Gain_1.png',
  discard_markers_for_card_play:
    'https://spiritislandwiki.com/images/thumb/9/9b/Card_Play_Gain_1_Pay_2_Element_Markers.png/100px-Card_Play_Gain_1_Pay_2_Element_Markers.png',
  gain_2_time: 'https://spiritislandwiki.com/images/thumb/6/6e/Gain2time.png/120px-Gain2time.png',
  gain_1_time_twice:
    'https://spiritislandwiki.com/images/thumb/8/88/Gain1timex2.png/50px-Gain1timex2.png',
  gain_1_time_thrice:
    'https://spiritislandwiki.com/images/thumb/e/ef/Gain1timex3.png/50px-Gain1timex3.png',
  gain_card_from_pile:
    'https://spiritislandwiki.com/images/thumb/2/27/Daysthatneverweregrowthicon.png/100px-Daysthatneverweregrowthicon.png',
  gain_2_card_plays:
    'https://spiritislandwiki.com/images/thumb/9/92/2cardplays.png/50px-2cardplays.png',
  gain_1_card_play: 'https://spiritislandwiki.com/images/2/26/Plusonecardplay.png',
  '2_damage': 'https://spiritislandwiki.com/images/thumb/1/15/Damage_2.png/72px-Damage_2.png',
  discard_2_cards:
    'https://spiritislandwiki.com/images/thumb/1/12/Discard2Cards.png/160px-Discard2Cards.png',
  push_town_city:
    'https://spiritislandwiki.com/images/thumb/2/2a/Land_Push_Town-City.png/120px-Land_Push_Town-City.png',
  behemoth: 'https://spiritislandwiki.com/images/d/d6/EmberEyedBehemoth.svg',
  unempowered_behemoth: 'https://spiritislandwiki.com/images/8/8d/Ember-Eyed_Behemoth_Incarna.png',
  empowered_behemoth:
    'https://spiritislandwiki.com/images/a/a7/Ember-Eyed_Behemoth_Empowered_Incarna.png',
  towering_roots: 'https://spiritislandwiki.com/images/0/0c/ToweringRoots.svg',
  unempowered_towering_roots:
    'https://spiritislandwiki.com/images/f/f2/Towering_Roots_of_the_Jungle_Incarna.png',
  empowered_towering_roots:
    'https://spiritislandwiki.com/images/3/34/Towering_Roots_of_the_Jungle_Empowered_Incarna.png',
  breath_of_darkness: 'https://spiritislandwiki.com/images/3/30/BreathOfDarkness.svg',
  unempowered_breath_of_darkness:
    'https://spiritislandwiki.com/images/b/b1/Breath_of_Darkness_Down_Your_Spine_Incarna.png',
  empowered_breath_of_darkness:
    'https://spiritislandwiki.com/images/2/26/Breath_of_Darkness_Down_Your_Spine_Empowered_Incarna.png',
  endless_dark: 'https://spiritislandwiki.com/images/0/08/EndlessDark.svg',
  escape_all:
    'https://spiritislandwiki.com/images/thumb/2/20/DarknessEscapeAll.png/160px-DarknessEscapeAll.png',
  escape_1:
    'https://spiritislandwiki.com/images/thumb/8/8d/DarknessEscape2.png/160px-DarknessEscape2.png',
  escape_2:
    'https://spiritislandwiki.com/images/thumb/1/15/DarknessEscape1.png/160px-DarknessEscape1.png',
  wandering_voice: 'https://spiritislandwiki.com/images/d/d0/WanderingVoice.svg',
  unempowered_wandering_voice:
    'https://spiritislandwiki.com/images/f/fa/Wandering_Voice_Keens_Delirium_Incarna.png',
  empowered_wandering_voice:
    'https://spiritislandwiki.com/images/c/cd/Wandering_Voice_Keens_Delirium_Empowered_Incarna.png',
  push_wandering_voice:
    'https://spiritislandwiki.com/images/thumb/8/83/Push_Voice_Incarna.png/120px-Push_Voice_Incarna.png',
  gather_1_blight:
    'https://spiritislandwiki.com/images/thumb/7/73/Gatherblight.png/124px-Gatherblight.png',
  quake: 'https://spiritislandwiki.com/images/0/03/Quake.svg',
  gain_major_without_forgetting:
    'https://spiritislandwiki.com/images/thumb/f/fa/GainMajorWithoutForgetting.png/72px-GainMajorWithoutForgetting.png',
  impending_card:
    'https://spiritislandwiki.com/images/thumb/1/1e/Impendingcard.png/60px-Impendingcard.png',
  impending_energy_1:
    'https://spiritislandwiki.com/images/thumb/b/bf/Impendenergy1.png/58px-Impendenergy1.png',
  impending_energy_2:
    'https://spiritislandwiki.com/images/thumb/d/d0/Impendenergy2.png/88px-Impendenergy2.png',
  impending_energy:
    'https://spiritislandwiki.com/images/thumb/e/e3/Impendenergygain.png/52px-Impendenergygain.png',
  impending_cards:
    'https://spiritislandwiki.com/images/thumb/5/5c/Impendingcardplay.png/68px-Impendingcardplay.png',
  energy_plus_minus:
    'https://spiritislandwiki.com/images/thumb/6/6f/Energyplusminus1.png/60px-Energyplusminus1.png',
  card: 'https://spiritislandwiki.com/images/e/ea/PowerCard.svg',
  lair: 'https://spiritislandwiki.com/images/1/15/Lair.svg',
  unempowered_lair:
    'https://spiritislandwiki.com/images/e/ec/Lure_of_the_Deep_Wilderness_Incarna_%28Lair%29.png',
  locus: 'https://spiritislandwiki.com/images/4/47/Locus.svg',
  unempowered_locus:
    'https://spiritislandwiki.com/images/0/00/Serpent_Slumbering_Beneath_the_Island_Incarna_%28Locus%29.png',
  empowered_locus:
    'https://spiritislandwiki.com/images/b/b9/Serpent_Slumbering_Beneath_the_Island_Empowered_Incarna_%28Locus%29.png',
  warrior: 'https://spiritislandwiki.com/images/d/d3/Warrior.svg',
  unempowered_warrior:
    'https://spiritislandwiki.com/images/6/69/Thunderspeaker_Incarna_%28Warrior%29.png',
  deeps: 'https://spiritislandwiki.com/images/9/99/Deeps.svg',

  // Targeting
  check: 'https://spiritislandwiki.com/images/thumb/5/5a/Checkmark.png/36px-Checkmark.png',
  //no_range: 'https://spiritislandwiki.com/images/d/d4/NoRange.svg',
  spirit: 'https://spiritislandwiki.com/images/2/2f/Spirits.svg',

  // Random
  //or: 'https://spiritislandwiki.com/images/2/26/Or.svg',
}
export const ALL_SYMBOLS = Object.keys(SYMBOL_DATA)
export const INVERTABLE_SYMBOLS = [
  'town',
  'city',
  'explorer',
  'dahan',
  'blight',
  'presence',
  'sacred_site',
  'destroyed_presence',
  'strife',
  'wilds',
  'beasts',
  'badlands',
  'disease',
  'vitality',
  'fear',
  'isolate',
  'defend',
  'minor',
  'escalation',
  'reclaim_all',
  'reclaim_one',
  'reclaim_half',
  'quake',
  'deeps',
  '2_damage',
  'spirit',
]

export const elementLongForm: Record<Element, string> = {
  s: 'sun',
  m: 'moon',
  f: 'fire',
  a: 'air',
  w: 'water',
  e: 'earth',
  p: 'plant',
  n: 'animal',
}
export const BOARDS: Record<string, string> = {
  board_a:
    'https://spiritislandwiki.com/images/thumb/e/e2/Piece_core_board_a.png/900px-Piece_core_board_a.png',
  north_east:
    'https://spiritislandwiki.com/images/thumb/f/f9/Piece_core_board_north_east.png/900px-Piece_core_board_north_east.png',
  board_b:
    'https://spiritislandwiki.com/images/thumb/7/7a/Piece_core_board_b.png/900px-Piece_core_board_b.png',
  east: 'https://spiritislandwiki.com/images/thumb/5/58/Piece_core_board_east.png/900px-Piece_core_board_east.png',
  board_c:
    'https://spiritislandwiki.com/images/thumb/8/82/Piece_core_board_c.png/900px-Piece_core_board_c.png',
  north_west:
    'https://spiritislandwiki.com/images/thumb/8/8c/Piece_core_board_north_west.png/900px-Piece_core_board_north_west.png',
  board_d:
    'https://spiritislandwiki.com/images/thumb/3/3a/Piece_core_board_d.png/900px-Piece_core_board_d.png',
  west: 'https://spiritislandwiki.com/images/thumb/2/26/Piece_core_board_west.png/900px-Piece_core_board_west.png',
  board_e:
    'https://spiritislandwiki.com/images/thumb/e/e5/Piece_je_board_e.png/900px-Piece_je_board_e.png',
  south_east:
    'https://spiritislandwiki.com/images/thumb/c/cc/Piece_je_board_south_east.png/900px-Piece_je_board_south_east.png',
  board_f:
    'https://spiritislandwiki.com/images/thumb/0/0b/Piece_je_board_f.png/900px-Piece_je_board_f.png',
  south_west:
    'https://spiritislandwiki.com/images/thumb/6/64/Piece_je_board_south_west.png/900px-Piece_je_board_south_west.png',
  board_g: 'https://spiritislandwiki.com/images/d/d4/Piece_horizons_board_g.png',
  board_h: 'https://spiritislandwiki.com/images/4/4a/Piece_horizons_board_h.png',
}

export const SPIRITS: Record<Spirit, SpiritData> = {
  "lightning's swift strike": {
    img_small:
      'https://spiritislandwiki.com/images/thumb/c/c2/Lightning%27s_Swift_Strike.png/132px-Lightning%27s_Swift_Strike.png',
    img_large: 'https://spiritislandwiki.com/images/c/c2/Lightning%27s_Swift_Strike.png',
    image: "/Lightning's_Swift_Strike_SpiritBoard.png",
  },
  'river surges in sunlight': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/f/ff/River_Surges_in_Sunlight.png/263px-River_Surges_in_Sunlight.png',
    img_large: 'https://spiritislandwiki.com/images/f/ff/River_Surges_in_Sunlight.png',
    image: '/River_Surges_in_Sunlight_SpiritBoard.png',
  },
  'shadows flicker like flame': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/d/d2/Shadows_Flicker_Like_Flame.png/263px-Shadows_Flicker_Like_Flame.png',
    img_large: 'https://spiritislandwiki.com/images/d/d2/Shadows_Flicker_Like_Flame.png',
    image: '/Shadows_Flicker_Like_Flame_SpiritBoard.png',
  },
  'vital strength of the earth': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/c/c2/Vital_Strength_of_the_Earth.png/263px-Vital_Strength_of_the_Earth.png',
    img_large: 'https://spiritislandwiki.com/images/c/c2/Vital_Strength_of_the_Earth.png',
    image: '/Vital_Strength_of_the_Earth_SpiritBoard.png',
  },
  'a spread of rampant green': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/7/7f/A_Spread_of_Rampant_Green.png/263px-A_Spread_of_Rampant_Green.png',
    img_large: 'https://spiritislandwiki.com/images/7/7f/A_Spread_of_Rampant_Green.png',
    image: '/A_Spread_of_Rampant_Green_SpiritBoard.png',
  },

  thunderspeaker: {
    img_small:
      'https://spiritislandwiki.com/images/thumb/b/bd/Thunderspeaker.png/255px-Thunderspeaker.png',
    img_large: 'https://spiritislandwiki.com/images/b/bd/Thunderspeaker.png',
    image: '/Thunderspeaker_SpiritBoard.png',
  },

  'bringer of dreams and nightmares': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/a/aa/Bringer_of_Dreams_and_Nightmares.png/220px-Bringer_of_Dreams_and_Nightmares.png',
    img_large: 'https://spiritislandwiki.com/images/a/aa/Bringer_of_Dreams_and_Nightmares.png',
    image: '/Bringer_of_Dreams_and_Nightmares_SpiritBoard.png',
  },
  "ocean's hungry grasp": {
    img_small:
      'https://spiritislandwiki.com/images/thumb/d/d8/Ocean%27s_Hungry_Grasp.png/262px-Ocean%27s_Hungry_Grasp.png',
    img_large: 'https://spiritislandwiki.com/images/d/d8/Ocean%27s_Hungry_Grasp.png',
    image: "/Ocean's_Hungry_Grasp_SpiritBoard.png",
  },
  'keeper of the forbidden wilds': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/a/ae/Keeper_of_the_Forbidden_Wilds.png/263px-Keeper_of_the_Forbidden_Wilds.png',
    img_large: 'https://spiritislandwiki.com/images/a/ae/Keeper_of_the_Forbidden_Wilds.png',
    image: '/Keeper_of_the_Forbidden_Wilds_SpiritBoard.png',
  },
  'sharp fangs behind the leaves': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/a/a5/Sharp_Fangs_Behind_the_Leaves.png/263px-Sharp_Fangs_Behind_the_Leaves.png',
    img_large: 'https://spiritislandwiki.com/images/a/a5/Sharp_Fangs_Behind_the_Leaves.png',
    image: '/Sharp_Fangs_Behind_the_Leaves_SpiritBoard.png',
  },
  'heart of the wildfire': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/2/21/Heart_of_the_Wildfire.png/263px-Heart_of_the_Wildfire.png',
    img_large: 'https://spiritislandwiki.com/images/2/21/Heart_of_the_Wildfire.png',
    image: 'codex/public/Heart_Of_The_Wildfire.png',
  },

  'serpent slumbering beneath the island': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/1/1a/Serpent_Slumbering_Beneath_the_Island.png/263px-Serpent_Slumbering_Beneath_the_Island.png',
    img_large: 'https://spiritislandwiki.com/images/1/1a/Serpent_Slumbering_Beneath_the_Island.png',
    image: '/Snek_Slumbering_Beneath_the_Island_SpiritBoard.png',
  },
  'grinning trickster stirs up trouble': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/f/f0/Grinning_Trickster_Stirs_Up_Trouble.png/263px-Grinning_Trickster_Stirs_Up_Trouble.png',
    img_large: 'https://spiritislandwiki.com/images/f/f0/Grinning_Trickster_Stirs_Up_Trouble.png',
    image: '/Grinning_Trickster_Stirs_Up_Trouble_SpiritBoard.png',
  },
  'lure of the deep wilderness': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/2/25/Lure_of_the_Deep_Wilderness.png/263px-Lure_of_the_Deep_Wilderness.png',
    img_large: 'https://spiritislandwiki.com/images/2/25/Lure_of_the_Deep_Wilderness.png',
    image: '/LURE_OF_THE_DEEP_WILDERNESS_SpiritBoard.png',
  },

  'many minds move as one': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/a/a3/Many_Minds_Move_as_One.png/263px-Many_Minds_Move_as_One.png',
    img_large: 'https://spiritislandwiki.com/images/a/a3/Many_Minds_Move_as_One.png',
    image: 'codex/public/Many_Minds_Move_As_One.png',
  },
  'shifting memory of ages': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/0/0f/Shifting_Memory_of_Ages.png/263px-Shifting_Memory_of_Ages.png',
    img_large: 'https://spiritislandwiki.com/images/0/0f/Shifting_Memory_of_Ages.png',
    image: '/Shifting_Memory_of_Ages_SpiritBoard.png',
  },

  "stone's unyielding defiance": {
    img_small:
      'https://spiritislandwiki.com/images/thumb/b/bf/Stone%27s_Unyielding_Defiance.png/263px-Stone%27s_Unyielding_Defiance.png',
    img_large: 'https://spiritislandwiki.com/images/b/bf/Stone%27s_Unyielding_Defiance.png',
    image: "/Stone's_Unyielding_Defiance_SpiritBoard.png",
  },
  'volcano looming high': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/3/33/Volcano_Looming_High.png/263px-Volcano_Looming_High.png',
    img_large: 'https://spiritislandwiki.com/images/3/33/Volcano_Looming_High.png',
    image: '/Volcano_Looming_High_SpiritBoard.png',
  },
  'shroud of silent mist': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/4/4e/Shroud_of_Silent_Mist.png/263px-Shroud_of_Silent_Mist.png',
    img_large: 'https://spiritislandwiki.com/images/4/4e/Shroud_of_Silent_Mist.png',
    image: '/Shroud_of_Silent_Mist_SpiritBoard.png',
  },
  'vengeance as a burning plague': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/f/f2/Vengeance_as_a_Burning_Plague.png/263px-Vengeance_as_a_Burning_Plague.png',
    img_large: 'https://spiritislandwiki.com/images/f/f2/Vengeance_as_a_Burning_Plague.png',
    image: '/Vengeance_as_a_Burning_Plague_SpiritBoard.png',
  },
  'fractured days split the sky': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/8/81/Fractured_Days_Split_the_Sky.png/263px-Fractured_Days_Split_the_Sky.png',
    img_large: 'https://spiritislandwiki.com/images/8/81/Fractured_Days_Split_the_Sky.png',
    image: '/Fractured_Days_Split_the_Sky_SpiritBoard.png',
  },
  'starlight seeks its form': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/6/6b/Starlight_Seeks_Its_Form.png/263px-Starlight_Seeks_Its_Form.png',
    img_large: 'https://spiritislandwiki.com/images/6/6b/Starlight_Seeks_Its_Form.png',
    image: '/Starlight_Seeks_Its_Form_SpiritBoard.png',
  },
  'downpour drenches the world': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/7/74/Downpour_Drenches_the_World.png/263px-Downpour_Drenches_the_World.png',
    img_large: 'https://spiritislandwiki.com/images/7/74/Downpour_Drenches_the_World.png',
    image: '/Downpour_Drenches_the_World_SpiritBoard.png',
  },
  'finder of paths unseen': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/d/d9/Finder_of_Paths_Unseen.png/263px-Finder_of_Paths_Unseen.png',
    img_large: 'https://spiritislandwiki.com/images/d/d9/Finder_of_Paths_Unseen.png',
    image: '/Finder_of_Paths_Unseen_SpiritBoard.png',
  },
  'devouring teeth lurk underfoot': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/d/dc/Devouring_Teeth_Lurk_Underfoot.png/234px-Devouring_Teeth_Lurk_Underfoot.png',
    img_large: 'https://spiritislandwiki.com/images/d/dc/Devouring_Teeth_Lurk_Underfoot.png',
    image: '/Devouring_Teeth_Lurk_Underfoot_SpiritBoard.png',
  },

  'eyes watch from the trees': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/5/53/Eyes_Watch_from_the_Trees.png/234px-Eyes_Watch_from_the_Trees.png',
    img_large: 'https://spiritislandwiki.com/images/5/53/Eyes_Watch_from_the_Trees.png',
    image: '',
  },

  'fathomless mud of the swamp': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/f/f6/Fathomless_Mud_of_the_Swamp.png/234px-Fathomless_Mud_of_the_Swamp.png',
    img_large: 'https://spiritislandwiki.com/images/f/f6/Fathomless_Mud_of_the_Swamp.png',
    image: '/Eyes_Watch_from_the_Trees_SpiritBoard.png',
  },
  'rising heat of stone and sand': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/7/7f/Rising_Heat_of_Stone_and_Sand.png/272px-Rising_Heat_of_Stone_and_Sand.png',
    img_large: 'https://spiritislandwiki.com/images/7/7f/Rising_Heat_of_Stone_and_Sand.png',
    image: '/Rising_Heat_of_Stone_and_Sand_SpiritBoard.png',
  },
  'sun-bright whirlwind': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/7/7b/Sun-Bright_Whirlwind.png/272px-Sun-Bright_Whirlwind.png',
    img_large: 'https://spiritislandwiki.com/images/7/7b/Sun-Bright_Whirlwind.png',
    image: '',
  },
  'ember-eyed behemoth': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/4/4e/Ember-Eyed_Behemoth.png/263px-Ember-Eyed_Behemoth.png',
    img_large: 'https://spiritislandwiki.com/images/4/4e/Ember-Eyed_Behemoth.png',
    image: '/Sun-Bright_Whirlwind_SpiritBoard.png',
  },
  'hearth-vigil': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/c/c0/Hearth-Vigil.png/263px-Hearth-Vigil.png',
    img_large: 'https://spiritislandwiki.com/images/c/c0/Hearth-Vigil.png',
    image: '/Hearth_Vigil.png',
  },

  'towering roots of the jungle': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/7/74/Towering_Roots_of_the_Jungle.png/263px-Towering_Roots_of_the_Jungle.png',
    img_large: 'https://spiritislandwiki.com/images/7/74/Towering_Roots_of_the_Jungle.png',
    image: 'Towering_Roots_Of_The_Jungle.png',
  },
  'breath of darkness down your spine': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/0/03/Breath_of_Darkness_Down_Your_Spine.png/263px-Breath_of_Darkness_Down_Your_Spine.png',
    img_large: 'https://spiritislandwiki.com/images/0/03/Breath_of_Darkness_Down_Your_Spine.png',
    image: 'codex/public/Beath_Of_Darkness_Down_Your_Spin.png',
  },
  'relentless gaze of the sun': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/0/04/Relentless_Gaze_of_the_Sun.png/263px-Relentless_Gaze_of_the_Sun.png',
    img_large: 'https://spiritislandwiki.com/images/0/04/Relentless_Gaze_of_the_Sun.png',
    image: '/Relentless_Gaze_of_the_Sun_SpiritBoard.png',
  },
  'wandering voice keens delirium': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/a/a4/Wandering_Voice_Keens_Delirium.png/254px-Wandering_Voice_Keens_Delirium.png',
    img_large: 'https://spiritislandwiki.com/images/a/a4/Wandering_Voice_Keens_Delirium.png',
    image: '/Wandering_Voice_Keens_Delerium_SpiritBoard.png',
  },
  'wounded waters bleeding': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/2/24/Wounded_Waters_Bleeding.png/263px-Wounded_Waters_Bleeding.png',
    img_large: 'https://spiritislandwiki.com/images/2/24/Wounded_Waters_Bleeding.png',
    image: '/Wounded_Waters_Bleeding_SpiritBoard.png',
  },
  'dances up earthquakes': {
    img_small:
      'https://spiritislandwiki.com/images/thumb/4/4c/Dances_Up_Earthquakes.png/263px-Dances_Up_Earthquakes.png',
    img_large: 'https://spiritislandwiki.com/images/4/4c/Dances_Up_Earthquakes.png',
    image: '/Dances_Up_Earthquakes_SpiritBoard.png',
  },
}

export const SCENARIOS: Record<string, Scenario> = {
  bliz: {
    art: 'https://spiritislandwiki.com/images/1/10/Blitz.png',
  },
  "guard the isle's heart": {
    art: 'https://spiritislandwiki.com/images/d/d4/Guard_the_Isle%27s_Heart.png',
  },
  'rituals of terror': {
    art: 'https://spiritislandwiki.com/images/9/96/Rituals_of_Terror.png',
  },
  'dahan insurrection': {
    art: 'https://spiritislandwiki.com/images/5/53/Dahan_Insurrection.png',
  },
  'second wave': {
    art: 'https://spiritislandwiki.com/images/1/18/Second_Wave.png',
  },
  'powers long forgotten': {
    art: 'https://spiritislandwiki.com/images/a/a0/Powers_Long_Forgotten.png',
  },
  'ward the shores': {
    art: 'https://spiritislandwiki.com/images/3/3f/Ward_the_Shores.png',
  },
  'rituals of the destroying flame': {
    art: 'https://spiritislandwiki.com/images/2/2d/Rituals_of_the_Destroying_Flame.png',
  },
  'elemental invocation': {
    art: 'https://spiritislandwiki.com/images/4/46/Elemental_Invocation.png',
  },
  'despicable theft': {
    art: 'https://spiritislandwiki.com/images/f/f5/Despicable_Theft.png',
  },
  'the great river': {
    art: 'https://spiritislandwiki.com/images/8/8e/The_Great_River.png',
  },
  'a diversity of spirits': {
    art: 'https://spiritislandwiki.com/images/8/86/A_Diversity_of_Spirits.png',
  },
  'varied terrains': {
    art: 'https://spiritislandwiki.com/images/d/d1/Varied_Terrains.png',
  },
  'destiny unfolds': {
    art: 'https://spiritislandwiki.com/images/b/bc/Destiny_Unfolds.png',
  },
  'surges of colonization': {
    art: null,
  },
}

export const ADVESARIES: Record<string, Adversary> = {
  'brandenburg-prussia': {
    flag: 'https://spiritislandwiki.com/images/f/f8/Brandenburg-Prussia_WrinkledFlag.png',
    map: 'https://spiritislandwiki.com/images/2/24/Brandenburg-Prussia_Map.png',
    image: '/The_Kingdom_of_Brandenburg-Prussia_Adversary.png',
  },
  england: {
    flag: 'https://spiritislandwiki.com/images/2/2e/England_WrinkledFlag.png',
    map: 'https://spiritislandwiki.com/images/7/7a/England_Map.png',
    image: 'The_Kingdom_of_England_Adversary.png',
  },
  sweden: {
    flag: 'https://spiritislandwiki.com/images/4/4a/Sweden_WrinkledFlag.png',
    map: 'https://spiritislandwiki.com/images/5/51/Sweden_Map.png',
    image: 'The_Kingdom_of_Sweden_Adversary.png',
  },
  'france (plantation colony)': {
    flag: 'https://spiritislandwiki.com/images/b/bd/France_%28Plantation_Colony%29_WrinkledFlag.png',
    map: 'https://spiritislandwiki.com/images/8/81/France_%28Plantation_Colony%29_Map.png',
    image: 'The_Kingdom_of_France_(Plantation_Colony)_Adversary.png',
  },
  'habsburg monarchy (livestock colony)': {
    flag: 'https://spiritislandwiki.com/images/7/71/Habsburg_Monarchy_%28Livestock_Colony%29_WrinkledFlag.png',
    map: null,
    image: '/The_Habsburg_Monarchy_(Livestock_Colony)_Adversary.png',
  },
  russia: {
    flag: 'https://spiritislandwiki.com/images/e/e9/Russia_WrinkledFlag.png',
    map: null,
    image: '/The_Tsardom_of_Russia_Adversary.png',
  },
  scotland: {
    flag: 'https://spiritislandwiki.com/images/9/9f/Scotland_WrinkledFlag.png',
    map: null,
    image: '/The_Kingdom_of_Scotland_Adversary.png',
  },
  'habsburg mining expedition': {
    flag: 'https://spiritislandwiki.com/images/thumb/1/13/Habsburg_Mining_Expedition_Flag.png/172px-Habsburg_Mining_Expedition_Flag.png',
    map: null,
    image: '/The_Habsburg_Monarchy_(Livestock_Colony)_Adversary.png',
  },
}

// NEEDS ADVESARIES AND SENARIOS
export const TAGS = [
  ...Object.keys(SPIRITS),
  ...Object.keys(ADVESARIES),
  ...Object.keys(SCENARIOS),
  'strategy guide',
  'news',
  'humor',
  'game analysis',
  'lore / narrative',
  'tier list',
  'custom spirit',
  'custom adversary',
  'custom scenario',
  // Mechanics
  'events',
  'minors',
  'majors',
  'boards',
  'thematic boards',
  'dahan',
  'invaders',
  'blight',
  'beasts',
  'wilds',
  'strife',
  'disease',
  'badlands',
  // Game Descriptions
  'Advanced',
  'basic',
  'solo',
  'multi-spirit',
]

export const ASPECTS: Record<string, AspectCard> = {
  pandemonium: {
    image: 'https://spiritislandwiki.com/images/7/73/Pandemonium_%28je%29.png',
    set: 'Jagged Earth',
    spirit: "lightning's swift strike",
  },
  'locus (2 of 2)': {
    image: 'https://spiritislandwiki.com/images/0/0c/Locus_1_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'serpent slumbering beneath the island',
  },
  resilience: {
    image: 'https://spiritislandwiki.com/images/7/71/Resilience_%28je%29.png',
    set: 'Jagged Earth',
    spirit: 'vital strength of the earth',
  },
  mentor: {
    image: 'https://spiritislandwiki.com/images/6/6c/Mentor_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'shifting memory of ages',
  },
  travel: {
    image: 'https://spiritislandwiki.com/images/4/41/Travel_%28ff%29.png',
    set: ['Promo Pack 2', 'Feather and Flame'],
    spirit: 'river surges in sunlight',
  },
  enticing: {
    image: 'https://spiritislandwiki.com/images/d/d9/Enticing_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'bringer of dreams and nightmares',
  },
  madness: {
    image: 'https://spiritislandwiki.com/images/3/3a/Madness_%28je%29.png',
    set: 'Jagged Earth',
    spirit: 'shadows flicker like flame',
  },
  violence: {
    image: 'https://spiritislandwiki.com/images/9/90/Violence_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'bringer of dreams and nightmares',
  },
  sunshine: {
    image: 'https://spiritislandwiki.com/images/0/02/Sunshine_%28je%29.png',
    set: 'Jagged Earth',
    spirit: 'river surges in sunlight',
  },
  transforming: {
    image: 'https://spiritislandwiki.com/images/b/bf/Transforming_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'heart of the wildfire',
  },
  nourishing: {
    image: 'https://spiritislandwiki.com/images/8/8f/Nourishing_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'vital strength of the earth',
  },
  'smite the land with fulmination': {
    image: 'https://spiritislandwiki.com/images/1/1c/Sparking_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: "lightning's swift strike",
  },
  foreboding: {
    image: 'https://spiritislandwiki.com/images/c/cf/Foreboding_%28ff%29.png',
    set: ['Promo Pack 2', 'Feather and Flame'],
    spirit: 'shadows flicker like flame',
  },
  lair: {
    image: 'https://spiritislandwiki.com/images/7/78/Lair_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'lure of the deep wilderness',
  },
  amorphous: {
    image: 'https://spiritislandwiki.com/images/6/64/Amorphous_%28ff%29.png',
    set: ['Promo Pack 2', 'Feather and Flame'],
    spirit: 'shadows flicker like flame',
  },
  warrior: {
    image: 'https://spiritislandwiki.com/images/6/69/Warrior_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'thunderspeaker',
  },
  haven: {
    image: 'https://spiritislandwiki.com/images/2/27/Haven_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'river surges in sunlight',
  },
  might: {
    image: 'https://spiritislandwiki.com/images/5/5b/Might_%28ff%29.png',
    set: ['Promo Pack 2', 'Feather and Flame'],
    spirit: 'vital strength of the earth',
  },
  tactician: {
    image: 'https://spiritislandwiki.com/images/d/d3/Tactician_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'thunderspeaker',
  },
  stranded: {
    image: 'https://spiritislandwiki.com/images/e/e8/Stranded_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'shroud of silent mist',
  },
  unconstrained: {
    image: 'https://spiritislandwiki.com/images/0/08/Unconstrained_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'sharp fangs behind the leaves',
  },
  'deeps (2 of 2)': {
    image: 'https://spiritislandwiki.com/images/b/bf/Deeps_1_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: "ocean's hungry grasp",
  },
  'spreading hostility': {
    image: 'https://spiritislandwiki.com/images/b/bf/Spreading_Hostility_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'keeper of the forbidden wilds',
  },
  intensify: {
    image: 'https://spiritislandwiki.com/images/1/16/Intensify_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'shifting memory of ages',
  },
  reach: {
    image: 'https://spiritislandwiki.com/images/b/ba/Reach_%28je%29.png',
    set: 'Jagged Earth',
    spirit: 'shadows flicker like flame',
  },
  'belligerent and aggressive crops': {
    image: 'https://spiritislandwiki.com/images/5/58/Tangles_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'a spread of rampant green',
  },
  wind: {
    image: 'https://spiritislandwiki.com/images/f/fc/Wind_%28je%29.png',
    set: 'Jagged Earth',
    spirit: "lightning's swift strike",
  },
  immense: {
    image: 'https://spiritislandwiki.com/images/6/6a/Immense_%28ff%29.png',
    set: ['Promo Pack 2', 'Feather and Flame'],
    spirit: "lightning's swift strike",
  },
  regrowth: {
    image: 'https://spiritislandwiki.com/images/9/90/Regrowth_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'a spread of rampant green',
  },
  'dark fire': {
    image: 'https://spiritislandwiki.com/images/0/06/Dark_Fire_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'shadows flicker like flame',
  },
  encircle: {
    image: 'https://spiritislandwiki.com/images/4/49/Encircle_%28ni%29.png',
    set: 'Nature Incarnate',
    spirit: 'sharp fangs behind the leaves',
  },
}

export const BLIGHT_CARDS: Record<string, BlightCard> = {
  'downward spiral': {
    image: 'https://spiritislandwiki.com/images/3/3b/Downward_Spiral_%28base%29.png',
    set: 'Spirit Island',
    blightPerPlayer: 5,
    status: 'active',
    isBlighted: true,
    text: 'At the start of each Invader Phase, each Spirit destroys 1 of their Presence.',
  },
  'disintegrating ecosystem': {
    image: 'https://spiritislandwiki.com/images/e/e7/Disintegrating_Ecosystem_%28bc%29.png',
    set: 'Branch and Claw',
    blightPerPlayer: 5,
    status: 'active',
    isBlighted: true,
    text: 'Immediately, on each board: Destroy 1 Beasts, then add 1 Blight to a land with Towns/Cities.',
  },
  'invaders find the land to their liking': {
    image:
      'https://spiritislandwiki.com/images/3/3b/Invaders_Find_the_Land_to_Their_Liking_%28je%29.png',
    set: 'Jagged Earth',
    blightPerPlayer: 2,
    status: 'active',
    isBlighted: false,
    text: 'Immediately: If the Terror Level is I / II / III, add 1 / 1.5 / 2 Fear Markers per player to the Fear pool. (Round down at Terror Level II.)',
  },
  'back against the wall': {
    image: 'https://spiritislandwiki.com/images/3/34/Back_Against_the_Wall_%28bc%29.png',
    set: 'Branch and Claw',
    blightPerPlayer: 2,
    status: 'active',
    isBlighted: true,
    text: 'Every Spirit Phase each Spirit gains +1 Energy and +1 Card Play.',
  },
  'thriving communities': {
    image: 'https://spiritislandwiki.com/images/b/b9/Thriving_Communities_%28je%29.png',
    set: 'Jagged Earth',
    blightPerPlayer: 4,
    status: 'active',
    isBlighted: true,
    text: 'Immediately, on each board: In 4 different lands with Explorer/Town, Replace 1 Town with 1 City or Replace 1 Explorer with 1 Town.',
  },
  'memory fades to dust': {
    image: 'https://spiritislandwiki.com/images/3/3c/Memory_Fades_to_Dust_%28base%29.png',
    set: 'Spirit Island',
    blightPerPlayer: 4,
    status: 'active',
    isBlighted: true,
    text: 'At the start of each Invader Phase each Spirit Forgets a Power or Destroys 1 of their Presence.',
  },
  'unnatural proliferation': {
    image: 'https://spiritislandwiki.com/images/e/e7/Unnatural_Proliferation_%28je%29.png',
    set: 'Jagged Earth',
    blightPerPlayer: 3,
    status: 'active',
    isBlighted: true,
    text: 'Immediately: Each Spirit adds 1 Presence to a land with their Presence. On Each Board: Add 1 Dahan to a land with Dahan, and 2 City to the land with the fewest Town/City (min. 1).',
  },
  'slow dissolution of will': {
    image: 'https://spiritislandwiki.com/images/8/8d/Slow_Dissolution_of_Will_%28ni%29.png',
    set: 'Nature Incarnate',
    blightPerPlayer: 3,
    status: 'active',
    isBlighted: true,
    text: 'Immediately: Each Spirit chooses one of Badlands, Beasts, or Wilds. (Put some of the chosen Tokens next to your Spirit Panel as a reminder.)Each Invader Phase: Each Spirit Replaces 1 Presence with their chosen type of Spirit Token. (The Presence goes to the Destroyed Presence supply.)',
  },
  'thriving crops': {
    image: 'https://spiritislandwiki.com/images/5/57/Thriving_Crops_%28ni%29.png',
    set: 'Nature Incarnate',
    blightPerPlayer: 2,
    status: 'active',
    isBlighted: false,
    text: 'Immediately: On Each Board, Build in 3 lands. (Build Actions in lands without Invaders normally Build 1 Town.)',
  },
  'shattered fragments of power': {
    image: 'https://spiritislandwiki.com/images/5/51/Shattered_Fragments_of_Power_%28ni%29.png',
    set: 'Nature Incarnate',
    blightPerPlayer: 2,
    status: 'active',
    isBlighted: true,
    text: 'Immediately: Draw 1 Major Power Card per Spirit plus 2 more. Each Spirit Takes 1 and gains 2 Energy. (Discard the 2 unselected cards.)',
  },
  'burn brightest before the end': {
    image: 'https://spiritislandwiki.com/images/0/09/Burn_Brightest_Before_the_End_%28ni%29.png',
    set: 'Nature Incarnate',
    blightPerPlayer: 2,
    status: 'active',
    isBlighted: true,
    text: 'Immediately: Each Spirit Adds 1 Presence to one of their lands or removes 1 Presence from one of their Presence Tracks. (Presence removed from the Presence Tracks goes to the Destroyed Presence supply.)',
  },
  'all things weaken': {
    image: 'https://spiritislandwiki.com/images/7/7e/All_Things_Weaken_%28je%29.png',
    set: 'Jagged Earth',
    blightPerPlayer: 3,
    status: 'active',
    isBlighted: true,
    text: 'Ongoing, starting next turn: Invaders and Dahan have -1 Health (min. 1). The land takes Blight on 1 less Damage (normally 1). When you add Blight, it Destroys all Presence/Beasts in that land and 1 Presence (total) in an adjacent land.',
  },
  'erosion of will': {
    image: 'https://spiritislandwiki.com/images/c/cb/Erosion_of_Will_%28bc%29.png',
    set: 'Branch and Claw',
    blightPerPlayer: 3,
    status: 'active',
    isBlighted: true,
    text: 'Immediately, 2 Fear per player. Each Spirit Destroys 1 of their Presence and loses 1 Energy.',
  },
  'aid from lesser spirits': {
    image: 'https://spiritislandwiki.com/images/a/a9/Aid_from_Lesser_Spirits_%28bc%29.png',
    set: 'Branch and Claw',
    blightPerPlayer: 2,
    status: 'active',
    isBlighted: true,
    text: 'Immediately, draw 1 Minor Power Card per player plus 1 more. Give 1 to each Spirit. They may be used every turn as if played, but cost no Card Plays/Energy. Place unselected cards into the Minor Powers discard pile.',
  },
  'a pall upon the land': {
    image: 'https://spiritislandwiki.com/images/e/ec/A_Pall_Upon_the_Land_%28bc%29.png',
    set: 'Branch and Claw',
    blightPerPlayer: 3,
    status: 'active',
    isBlighted: true,
    text: 'Immediately, on each board: Destroy 1 Presence and remove 1 Town.',
  },
  'blight corrodes the spirit': {
    image: 'https://spiritislandwiki.com/images/3/35/Blight_Corrodes_the_Spirit_%28ni%29.png',
    set: 'Nature Incarnate',
    blightPerPlayer: 4,
    status: 'active',
    isBlighted: true,
    text: 'Each Invader Phase: On Each Board, Destroy 1 Presence in a land with Blight.',
  },
  'attenuated essence': {
    image: 'https://spiritislandwiki.com/images/2/2e/Attenuated_Essence_%28ni%29.png',
    set: 'Nature Incarnate',
    blightPerPlayer: 4,
    status: 'active',
    isBlighted: true,
    text: 'Each Invader Phase: Each Spirit with at least 5 Presence on the island Destroys 1 Presence.',
  },
  'power corrodes the spirit': {
    image: 'https://spiritislandwiki.com/images/3/36/Power_Corrodes_the_Spirit_%28je%29.png',
    set: 'Jagged Earth',
    blightPerPlayer: 4,
    status: 'active',
    isBlighted: true,
    text: 'Each Invader Phase: Each Spirit Destroys 1 of their Presence if they have 3 or more Power Cards in play, or have a Power Card in play costing 4 or more (printed) Energy.',
  },
  'untended land crumbles': {
    image: 'https://spiritislandwiki.com/images/c/c2/Untended_Land_Crumbles_%28je%29.png',
    set: 'Jagged Earth',
    blightPerPlayer: 4,
    status: 'active',
    isBlighted: true,
    text: 'At the start of each Invader Phase, On Each Board: Add 1 Blight to a land adjacent to Blight. Spirits may prevent this on any/all boards; each board to be protected requires jointly paying 3 Energy or Destroying 1 Presence from that board.',
  },
  'tipping point': {
    image: 'https://spiritislandwiki.com/images/d/d2/Tipping_Point_%28bc%29.png',
    set: 'Branch and Claw',
    blightPerPlayer: 5,
    status: 'retired',
    isBlighted: true,
    text: 'Immediately, destroy 3 Presence from each Spirit.',
  },
  'intensifying exploitation': {
    image: 'https://spiritislandwiki.com/images/b/b6/Intensifying_Exploitation_%28ni%29.png',
    set: 'Nature Incarnate',
    blightPerPlayer: 5,
    status: 'active',
    isBlighted: true,
    text: 'Ongoing, starting next turn: During Ravage Actions, Invaders deal +2 Damage (per land).',
  },
  'promising farmlands': {
    image: 'https://spiritislandwiki.com/images/8/81/Promising_Farmlands_%28bc%29.png',
    set: 'Branch and Claw',
    blightPerPlayer: 4,
    status: 'active',
    isBlighted: true,
    text: 'Immediately, on each board: Add 1 Town and 1 City to an Inland land with no Towns/Cities.',
  },
  'strong earth shatters slowly': {
    image: 'https://spiritislandwiki.com/images/6/6a/Strong_Earth_Shatters_Slowly_%28je%29.png',
    set: 'Jagged Earth',
    blightPerPlayer: 2,
    status: 'active',
    isBlighted: false,
    text: 'Immediately: Each player adds 1 Blight (from this card) to a land adjacent to Blight.',
  },
  'the border of life and death': {
    image: 'https://spiritislandwiki.com/images/c/ca/The_Border_of_Life_and_Death_%28ni%29.png',
    set: 'Nature Incarnate',
    blightPerPlayer: 1,
    status: 'active',
    isBlighted: false,
    text: 'Now and Each Invader Phase (until this card is replaced): Each Spirit with at least 2 Presence on the island Destroys 1 Presence, and may discard a Power Card to gain 1 Energy.',
  },
}

export const EVENTS: Record<string, EventCard> = {
  'bureaucrats adjust funding': {
    image: 'https://spiritislandwiki.com/images/d/da/Bureaucrats_Adjust_Funding_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Terror Levels 1 & 2',
        name: 'Bureaucrats Adjust Funding',
        text: 'On Each Board with 9 or more Towns/Cities: Build Cards skip the highest-numbered matching land.On Each Board with 3 or fewer Towns/Cities: Build Cards cause 1 extra Build Action in the highest-numbered matching land. (This can Build in a land without Invaders.)',
      },
      {
        type: 'Terror Level 3',
        name: 'Ransack and Run',
        text: 'After the Ravage Step, On Each Board: In the land with the most Cities (minimum 1), Ravage, then Remove 1 City.',
      },
      {
        type: 'Beasts',
        name: 'Terrifying Beasts',
        text: '2 Fear per board with 2 or more Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Coordinated Defense',
        text: 'When Invaders Ravage, if the land has both Dahan and Presence, Defend 5.',
      },
    ],
  },
  overconfidence: {
    image: 'https://spiritislandwiki.com/images/f/fd/Overconfidence_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Terror Level 1',
        name: 'Overconfidence',
        text: "If you have any Earned Fear Cards, discard 2 of them now (so you don't get their text benefits).Otherwise, move 2 Earned Fear Markers per player to the top of the Fear pool.",
      },
      {
        type: 'Terror Levels 2 & 3',
        name: 'Terror Breeds Aggression',
        text: 'For every 2 Fear Cards currently in the Earned Fear Cards pile, Invaders do +1 Damage (per land) when Ravaging.',
      },
      {
        type: 'Beasts',
        name: 'Beasts Multiply',
        text: 'On Each Board: Add 1 Beasts to a land adjacent to Beasts, then Destroy 1 Dahan in a land with Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Coordinated Defense',
        text: 'When Invaders Ravage, if the land has both Dahan and Presence, Defend 5.',
      },
    ],
  },
  'investigation of dangers': {
    image: 'https://spiritislandwiki.com/images/a/a7/Investigation_of_Dangers_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Terror Level 1',
        name: 'Investigation of Dangers',
        text: 'On Each Board: Add 1 Explorer to a land without Invaders or Dahan.',
      },
      {
        type: 'Terror Levels 2 & 3',
        name: 'Destroy the Unnatural!',
        text: 'Invaders do +3 Damage (per land) when Ravaging in lands with Presence.',
      },
      {
        type: 'Beasts',
        name: 'Prey on the Unwary',
        text: 'Each Beasts destroys 1 Explorer. Add 1 Beasts on a board without one.',
      },
      {
        type: 'Dahan',
        name: 'Rouse the Spirits',
        text: 'Each Spirit with at least 3 Dahan among all its lands may use a Slow Power now (instead of later).',
      },
    ],
  },
  'distant exploration': {
    image: 'https://spiritislandwiki.com/images/e/e5/Distant_Exploration_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Terror Level 1',
        name: 'Distant Exploration',
        text: 'During the Explore step, Invaders Explore at +1 distance.(So a land 2 away from a Town/City/Ocean will be Explored into.)',
      },
      {
        type: 'Terror Levels 2 & 3',
        name: 'Fearful Mobs',
        text: 'When Ravaging, Invaders do +3 Damage (per land) in lands with 3 or more Invaders.',
      },
      {
        type: 'Disease',
        name: 'Grim Toll',
        text: 'On Each Board: Choose a land with Disease. In that land, do 2 Damage to Invaders and 2 Damage to Dahan.',
      },
      {
        type: 'Dahan',
        name: 'Fierce Mein',
        text: '1 Fear per land with Invaders where Dahan outnumber Towns/Cities.',
      },
    ],
  },
  'invaders surge inland': {
    image: 'https://spiritislandwiki.com/images/0/0f/Invaders_Surge_Inland_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Invaders Surge Inland',
        text: 'On a Coastal land on Each Board: Move 1 Town one or two lands Inland.',
      },
      {
        type: 'Blighted Island',
        name: 'Widening Destruction',
        text: 'On Each Board: Add 1 Blight to a land adjacent to a land with/adjacent to Towns/Cities.Spirits may prevent this on any/all boards by destroying 2 Presence from each board to be protected.',
      },
      {
        type: 'Disease',
        name: 'Grim Toll',
        text: 'On Each Board: Choose a land with Disease. In that land, do 2 Damage to Invaders and 2 Damage to Dahan.',
      },
      {
        type: 'Dahan',
        name: 'Canny Defense',
        text: 'During Ravage, in every land, Defend 1 per Dahan in the land.',
      },
    ],
  },
  'heavy farming': {
    image: 'https://spiritislandwiki.com/images/c/ce/Heavy_Farming_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Heavy Farming',
        text: 'During the next normal Ravage, each Town does +1 Damage. (If there is no Ravage this Phase, leave this card by the Ravage Space until one happens.)',
      },
      {
        type: 'Blighted Island',
        name: 'Overcrowded Cities',
        text: 'On Each Board with City: Add 1 Blight to a land with City.Spirits may prevent this on any/all boards by destroying 2 Presence from each board to be protected.',
      },
      {
        type: 'Beasts',
        name: 'Prey on the Unwary',
        text: 'Each Beasts destroys 1 Explorer. Add 1 Beasts on a board without one.',
      },
      {
        type: 'Dahan',
        name: 'Coming of Age',
        text: 'On Each Board: Add 1 Dahan to a Jungle or Wetland with Dahan.',
      },
    ],
  },
  'years of little rain': {
    image: 'https://spiritislandwiki.com/images/2/2d/Years_of_Little_Rain_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Group Choice',
        name: 'Years of Little Rain',
        text: 'A terrible drought parches the island. You may:LET THE PLANTS DIE AND THE LAND WITHER• For each board, discard the top Minor Power. If it lacks Water, add 1 Blight to a Sands.• Towns, Cities, and Dahan have -1 Health (minimum 1) until the end of the turn.ACT TO EASE THE DROUGHTCost: 4 Energy per player. Aided by Water.• Each Spirit may add 1 Presence to one of their lands with Dahan.',
      },
      {
        type: 'Beasts',
        name: 'Beasts Attack',
        text: 'Each Beasts deals 2 Damage. Remove any token that destroys any Towns/Cities.',
      },
      {
        type: 'Dahan',
        name: 'Canny Defense',
        text: 'During Ravage, in every land, Defend 1 per Dahan in the land.',
      },
    ],
  },
  'promising farmland': {
    image: 'https://spiritislandwiki.com/images/4/4c/Promising_Farmland_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Promising Farmland',
        text: 'When Exploring, once per board, place 1 Town instead of 1 Explorer.',
      },
      {
        type: 'Blighted Island',
        name: 'New Cash Crops Take Hold',
        text: 'Invaders immediately Ravage in 1 terrain type not showing under any Invader Action.Spirits may prevent this on any/all boards by destroying 2 Presence from each board to be protected.',
      },
      {
        type: 'Beasts',
        name: 'Beasts Provoked',
        text: 'On Each Board: Add 1 Beasts to a land without Blight that has Town.',
      },
      {
        type: 'Dahan',
        name: 'Canny Defense',
        text: 'During Ravage, in every land, Defend 1 per Dahan in the land.',
      },
    ],
  },
  'well-prepared explorers': {
    image: 'https://spiritislandwiki.com/images/3/31/Well-Prepared_Explorers_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Well-Prepared Explorers',
        text: 'For the rest of the turn, Explorers have +1 Health.',
      },
      {
        type: 'Blighted Island',
        name: 'Blight Spreads',
        text: 'On Each Board: Add 1 Blight to a land adjacent to a land with Blight.Spirits may prevent this on any/all boards by destroying 2 Presence from each board to be protected.',
      },
      {
        type: 'Beasts',
        name: 'Beasts Prowl',
        text: 'Each Beasts generates 1 Fear if Invaders are present, and moves to an adjacent land if not.',
      },
      {
        type: 'Dahan',
        name: 'Coming of Age',
        text: 'On Each Board: Add 1 Dahan to an Inland land with Dahan.',
      },
    ],
  },
  'cultural assimilation': {
    image: 'https://spiritislandwiki.com/images/4/44/Cultural_Assimilation_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Terror Levels 1 & 2',
        name: 'Cultural Assimilation',
        text: 'On Each Board: In a land with exactly 1 Dahan that has or is adjacent to a City, replace that Dahan with 1 Town.',
      },
      {
        type: 'Terror Level 3',
        name: 'Reprisal Against the Dahan',
        text: 'On Each Board: Choose a land with Dahan and Town/City. Invaders do 3 Damage to Dahan there, ignoring Defend Powers.',
      },
      {
        type: 'Beasts',
        name: 'Beasts Attack',
        text: 'Each Beasts deals 2 Damage. Remove any token that destroys Town/City.',
      },
      {
        type: 'Dahan',
        name: 'Reckless Offensive',
        text: 'On Each Board: Choose a land with at least 2 Dahan and at least 2 Town/City. Each Dahan destroys 1 Town/City. Add 1 Blight.',
      },
    ],
  },
  'missionaries arrive': {
    image: 'https://spiritislandwiki.com/images/3/37/Missionaries_Arrive_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Group Choice',
        name: 'Missionaries Arrive',
        text: 'They teach and spread lessons of a foreign god. You may:IGNORE THEIR CONTACT WITH THE DAHAN• For each board, discard the top Minor Power. If it has Sun, Push 1 Explorer from a land with Dahan. Otherwise, replace 1 Dahan with 1 Town.• After resolving this card, return it to the Event Deck under the top 2 cards.CURSE THE TONGUES OF THE FOREIGNERSCost: 4 Energy per player. Aided by Sun.• Each Spirit: Add 1 Disease to a land with City.• 2 Fear per player.• During the next normal Ravage, City do +3 Damage.',
      },
      {
        type: 'Beasts',
        name: 'Prey on the Unwary',
        text: 'Each Beasts destroys 1 Explorer. Add 1 Beasts to a board without one.',
      },
    ],
  },
  'cities rise': {
    image: 'https://spiritislandwiki.com/images/4/4b/Cities_Rise_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Cities Rise',
        text: 'On Each Board: In the land with the most Town, Replace 2 Towns with 2 Cities. (If there is only 1 Town, instead Replace it with 1 City.)',
      },
      {
        type: 'Blighted Island',
        name: 'Depleted Soil',
        text: 'In lands with Towns/Cities, it only takes 1 Damage to add Blight.',
      },
      {
        type: 'Beasts',
        name: 'Beasts Chase Off Homesteaders',
        text: 'On Each Board: Push up to 2 Explorers or 1 Town from a land with Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Careful Defense',
        text: 'When Invaders Ravage, if the land has Dahan, Defend 2.',
      },
    ],
  },
  'eager explorers': {
    image: 'https://spiritislandwiki.com/images/a/a5/Eager_Explorers_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Terror Level 1',
        name: 'Eager Explorers',
        text: 'On Each Board: After the first successful Build Action, add 1 Explorer to an adjacent land without Invaders.',
      },
      {
        type: 'Terror Levels 2 & 3',
        name: 'Xenophobia',
        text: 'When Ravaging in lands with Dahan, each individual Invader does -1 Damage to the land and +1 Damage to Dahan.',
      },
      {
        type: 'Beasts',
        name: 'Beasts Chase Off Homesteaders',
        text: 'On Each Board: Push up to 2 Explorers or 1 Town from a land with Beasts.',
      },
      {
        type: 'Dahan',
        name: 'At Their Gates Demanding Redress',
        text: '2 Fear per land with Dahan and City.',
      },
    ],
  },
  'population rises': {
    image: 'https://spiritislandwiki.com/images/3/37/Population_Rises_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Population Rises',
        text: 'On Each Board: Add 1 Town to a land with Explorers/Towns.',
      },
      {
        type: 'Blighted Island',
        name: 'Power Fades',
        text: 'Each Spirit chooses independently to:Destroy 2 of their PresenceForget 2 of their PowersTake 1 Blight from the Blight Card and remove it from the game.',
      },
      {
        type: 'Disease',
        name: 'Sandfever Outbreak',
        text: 'On Each Board: Add 1 Disease to the Sands or Mountains with the most Towns/Cities (minimum 1).',
      },
      {
        type: 'Dahan',
        name: 'Offerings of Pattern and Dance',
        text: 'Each Spirit with at least 2 Dahan among all its lands gains 1 Energy.',
      },
    ],
  },
  'wave of reconnaissance': {
    image: 'https://spiritislandwiki.com/images/3/3a/Wave_of_Reconnaissance_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Stage 1',
        name: 'Wave of Reconnaissance',
        text: 'When Exploring: Add 1 additional Explorer to each land Explored.',
      },
      {
        type: 'Stages 2 & 3',
        name: 'Urbanization',
        text: 'In each land with at least 2 Towns, replace half the Towns (rounding up) with Cities.',
      },
      {
        type: 'Disease and Strife',
        name: 'Stricken',
        text: 'Invaders do not Ravage in lands with Disease/Strife.',
      },
      {
        type: 'Dahan',
        name: 'Retreat',
        text: 'On Each Board: Push 2 Dahan from a land with Cities to a land without Cities.',
      },
    ],
  },
  'interesting discoveries': {
    image: 'https://spiritislandwiki.com/images/b/b7/Interesting_Discoveries_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Stage 1',
        name: 'Interesting Discoveries',
        text: 'On Each Board: Choose a Sacredsite. Gather 1 Explorer into its land, and add 1 additional Explorer.',
      },
      {
        type: 'Stages 2 & 3',
        name: 'Increasing Aggression',
        text: 'Invaders do +1 Damage (per land) when Ravaging.',
      },
      {
        type: 'Disease',
        name: 'Wheezelung Outbreak',
        text: 'On Each Board: Add 1 Disease to the Jungle/Wetland with the most Town/City (minimum 1).',
      },
      {
        type: 'Dahan',
        name: 'Tend the Land',
        text: 'On Each Board: Remove 1 Blight from a land with at least 2 Dahan.',
      },
    ],
  },
  'strange tales attract explorers': {
    image: 'https://spiritislandwiki.com/images/9/90/Strange_Tales_Attract_Explorers_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Stage 1',
        name: 'Strange Tales Attract Explorers',
        text: 'Now: 1 Fear per Spirit that has at least 1 Sacred Site. After advancing Invader Cards: Add 1 Explorer to each land with a Sacred Site.',
      },
      {
        type: 'Stages 2 & 3',
        name: 'Fortification',
        text: "After advancing Invader Cards: Invaders Build in one terrain not shown under any Invader Action. (If there's no such terrain, nothing happens.)",
      },
      {
        type: 'Beasts',
        name: 'Beasts Attack',
        text: 'Each Beasts deals 2 Damage. Remove any token that destroys any Towns/Cities.',
      },
      {
        type: 'Dahan',
        name: 'Coming of Age',
        text: 'On Each Board: Add 1 Dahan to a Mountain or Sands with Dahan.',
      },
    ],
  },
  'search for new lands': {
    image: 'https://spiritislandwiki.com/images/9/92/Search_for_New_Lands_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Search for New Lands',
        text: 'In Each land with at least 2 Explorers: Push 1 Explorer to an adjacent land without Invaders.',
      },
      {
        type: 'Blighted Island',
        name: 'Devastated Shores',
        text: 'On Each Board with Invaders: Add 1 Blight to a Coastal land.Spirits may prevent this on any/all boards by destroying 2 Presence from each board to be protected.',
      },
      {
        type: 'Beasts',
        name: 'Distant Hunt',
        text: 'On Each Board: Push 1 Beasts to an adjacent land with no Blight. It deals 1 Damage there.',
      },
      {
        type: 'Dahan',
        name: 'Canny Defense',
        text: 'During Ravage, in every land, Defend 1 per Dahan in the land.',
      },
    ],
  },
  'tight-knit communities': {
    image: 'https://spiritislandwiki.com/images/a/a6/Tight-Knit_Communities_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Tight-Knit Communities',
        text: 'For the rest of the turn, Towns/Cities have +1 Health.',
      },
      {
        type: 'Blighted Island',
        name: 'Blight Spreads',
        text: 'On Each Board: Add 1 Blight to a land adjacent to a land with Blight.Spirits may prevent this on any/all boards by destroying 2 Presence from each board to be protected.',
      },
      {
        type: 'Beasts',
        name: 'Prey on the Unwary',
        text: 'Each Beasts destroys 1 Explorer. Add 1 Beasts on a board without one.',
      },
      {
        type: 'Dahan',
        name: 'Coming of Age',
        text: 'On Each Board: Add 1 Dahan to a Coastal land with Dahan.',
      },
    ],
  },
  'farmers seek the dahan for aid': {
    image: 'https://spiritislandwiki.com/images/3/37/Farmers_Seek_the_Dahan_for_Aid_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Group Choice',
        name: 'Farmers Seek the Dahan for Aid',
        text: "The Dahan are uncertain whether to teach the Invaders farming techniques more in tune with the island's life. You recommend they:SPURN THE INVADERS• On Each Board: 2 Damage to Dahan in a land with Town/City.• On Each Board: Add 1 Blight to a land with at least 2 Town/City.• Town/City have -1 Health (min. 1) until the end of the turn.TEACH THE INVADERS• On Each Board: Add 1 Town to a land with Dahan.• The next normal Ravage becomes a Build. (This could be on a future turn.)",
      },
      {
        type: 'Disease',
        name: 'New Diseases',
        text: 'On half of the boards (rounding up), add 1 Disease to a land with both Dahan and Invaders. Do 2 Damage to Dahan there.',
      },
    ],
  },
  'coastal towns multiply': {
    image: 'https://spiritislandwiki.com/images/b/bf/Coastal_Towns_Multiply_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Coastal Towns Multiply',
        text: 'On Each Board: Add 1 Town to a Coastal land adjacent to a Coastal Town.',
      },
      {
        type: 'Blighted Island',
        name: 'Cooperation Among Towns',
        text: 'Invaders do +1 Damage (per land) when Ravaging in lands with Towns/Cities and no Strife.',
      },
      {
        type: 'Beasts',
        name: 'Explorers Blunder',
        text: 'On Each Board: Destroy 2 Explorers among lands with Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Coming of Age',
        text: 'On Each Board: Add 1 Dahan to a land with Dahan and no Blight/Disease.',
      },
    ],
  },
  'far-off wars touch the island': {
    image: 'https://spiritislandwiki.com/images/e/e0/Far-off_Wars_Touch_the_Island_%28ni%29.png',
    set: 'Nature Incarnate',
    status: 'active',
    sections: [
      {
        type: 'Group Choice',
        name: 'Far-off Wars Touch the Island',
        text: 'Invaders from a different, distant land launch an assault upon the island while the Invaders here rally together in a wave of nationalism. Defending the island with them might come at too high a price.',
      },
      {
        type: 'Badlands',
        name: 'Ecosystem Damage',
        text: 'On Each Board: Add 1 Badlands to a land with Blight.',
      },
      {
        type: 'Dahan',
        name: 'Return to Old Pillars',
        text: 'On Each Board: Gather 1 or 2 Dahan into a land with Dahan Setup symbols.',
      },
    ],
  },
  'invested aristocracy': {
    image: 'https://spiritislandwiki.com/images/4/4d/Invested_Aristocracy_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Stages 1 & 2',
        name: 'Invested Aristocracy',
        text: 'After the Ravage Step, On Each Board: If no Blight was added to this board, add 1 Town to the highest-numbered land with no Invaders.',
      },
      {
        type: 'Stage 3',
        name: 'Foreign Dignitaries Visit',
        text: 'If the island is Healthy, Ravages do +2 Damage (total) in the lowest-numbered matching land on each board.If the island is Blighted, add 1 Fear Card to the top of the Fear Deck.',
      },
      {
        type: 'Beasts',
        name: 'Prey on the Heedless',
        text: 'In each land with Beasts, 1 Damage per Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Coming of Age',
        text: 'On Each Board: Add 1 Dahan to a land with 2 or more Dahan.',
      },
    ],
  },
  'hard-working settlers': {
    image: 'https://spiritislandwiki.com/images/a/a2/Hard-Working_Settlers_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Group Choice',
        name: 'Hard-Working Settlers',
        text: 'The latest round of settlers are regrettably diligent, focused, and curious. You may:ACT CAUTIOUSLY IN THE BACKGROUNDOn Each Board:• Push up to 2 Dahan.• Add 1 Town to a land without Towns.• Immediately Ravage in the land with the most Invaders that matches a Ravage Card.CREATE UNNERVING DISTRACTIONS...at the cost of piquing their interest.• Ravage Cards skip up to one matching land on each board. (Players choose which.)• 1 Fear per player.• Remove the bottommost Stage II and Stage III Cards in the Invader Deck from the game.',
      },
      {
        type: 'Beasts',
        name: 'Beasts Prey on the Injured',
        text: 'This turn, Beasts also count as Badlands. On Each Board: Destroy a Damaged Invader in a land with Beasts.',
      },
    ],
  },
  'fortune-seekers': {
    image: 'https://spiritislandwiki.com/images/4/4c/Fortune-Seekers_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Fortune-Seekers',
        text: 'The next Explore Card matches all lands without Towns/Cities instead of the printed land type. Ignore any Escalation on it.',
      },
      {
        type: 'Blighted Island',
        name: "The Land's Bounty Exhausted",
        text: 'In lands without Presence, it only takes 1 Damage to add Blight.',
      },
      {
        type: 'Disease',
        name: 'Grim Toll',
        text: 'On Each Board: Choose a land with Disease. In that land, 2 Damage to Invaders and 2 Damage to Dahan.',
      },
      {
        type: 'Dahan',
        name: 'Tell the Old Stories',
        text: 'Each Spirit with at least 2 Dahan among its lands either Reclaims 1 Power Card or re-gains a Unique Power it previously Forgot.',
      },
    ],
  },
  'urban development': {
    image: 'https://spiritislandwiki.com/images/4/44/Urban_Development_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Urban Development',
        text: 'During the next normal Ravage, each City deals +2 Damage. (If there is no Ravage this Phase, leave this card by the Ravage Space until one happens.)',
      },
      {
        type: 'Blighted Island',
        name: 'Festering Pits of Blight',
        text: 'On Each Board with Invaders: Add 1 Blight to a land with at least 2 Blight, but do not cascade.',
      },
      {
        type: 'Disease',
        name: 'Lingering Plagues',
        text: 'On Each Board: Add 1 Disease. Ignore Disease during Builds this Invader Phase.',
      },
      {
        type: 'Dahan',
        name: 'Fierce Mein',
        text: '1 Fear per land with Invaders where Dahan outnumber Towns/Cities.',
      },
    ],
  },
  'smaller ports spring up': {
    image: 'https://spiritislandwiki.com/images/9/91/Smaller_Ports_Spring_Up_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Stages 1 & 2',
        name: 'Smaller Ports Spring Up',
        text: 'On Each Board with exactly 1 Coastal City: Add 1 Town to a Coastal land without Cities.',
      },
      {
        type: 'Stage 3',
        name: 'Extensive Building',
        text: 'On Each Board: Build in a land with Invaders not matching a Build Card.',
      },
      {
        type: 'Disease and Strife',
        name: 'Stricken',
        text: 'In lands with Disease/Strife, Invaders skip Ravage Actions.',
      },
      {
        type: 'Dahan',
        name: 'Settlers Encroach Too Far',
        text: 'On Each Board: Choose a land with Towns and Dahan. Push 1 Town per 2 Dahan there.',
      },
    ],
  },
  'new species spread': {
    image: 'https://spiritislandwiki.com/images/6/67/New_Species_Spread_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Group Choice',
        name: 'New Species Spread',
        text: 'New plants and animals brought by the Invaders Damage the local ecology. You may:LET THE INVASIVE SPECIES BLOOM• For each board, discard the top Minor Power. If it is Fast, add 1 Blight to a land with Town/City.• After resolving this card, return it to the Event Deck under the top 2 cards.TRANSMUTE THE WORST OF THE SPECIESCost: 4 Energy per player. Aided by Moon.• 1 Fear per player. On Each Board: Add 1 Beasts to a land with Town/City.',
      },
      {
        type: 'Disease',
        name: 'New Diseases',
        text: 'On half of the boards (rounding up), add 1 Disease to a land with both Dahan and Invaders. Do 2 Damage to Dahan there.',
      },
      {
        type: 'Dahan',
        name: 'Offerings of Pattern and Dance',
        text: 'Each Spirit with at least 2 Dahan among all its lands gains 1 Energy.',
      },
    ],
  },
  'civic engagement': {
    image: 'https://spiritislandwiki.com/images/7/7f/Civic_Engagement_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Civic Engagement',
        text: "On Each Board: Remove 1 Strife. If you can't, Invaders do +1 Damage (per land) when Ravaging in lands with Towns/Cities.",
      },
      {
        type: 'Blighted Island',
        name: "Life's Web Torn Asunder",
        text: 'On Each Board with 6 or more Blight: Add 1 Blight to a land adjacent to Blight.',
      },
      {
        type: 'Beasts',
        name: 'Casualties of Fang and Sting',
        text: 'On Each Board: Destroy 1 Explorer/Town in a land with Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Keep Far From the Lands of Plague',
        text: 'On Each Board: Push 3 Dahan from lands with Disease to lands without Disease.',
      },
    ],
  },
  "life's balance tilts": {
    image: 'https://spiritislandwiki.com/images/4/4b/Life%27s_Balance_Tilts_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Group Choice',
        name: "Life's Balance Tilts",
        text: 'The energies of life shift towards destruction, bringing wasting and disease to the animals of the island. Death is a part of life, but does this go too far? You may:LET DESTRUCTION HAVE ITS DAY• On Each Board: Remove 1 Beasts. Add 1 Disease.• For Each Board: Discard the top Minor Power. If it is Fast, add 1 Blight.• Invaders and Dahan have -1 Health (min. 1) this turn.FORTIFY THE RESILIENCE OF LIFECost: 4 Energy per player, aided by Animal.• On Each Board: Add 1 Beasts. Remove 1 Disease.• For Each Board: Discard the top Minor Power. If it is Slow, Remove 1 Blight.• Invaders and Dahan have +1 Health this turn.',
      },
      {
        type: 'Dahan',
        name: 'A Thousand Small Struggles',
        text: 'On Each Board with 4 or more Towns/Cities and 4 or fewer Dahan: Add 1 Blight to a land without Dahan.',
      },
    ],
  },
  'harvest bounty, harvest dust': {
    image: 'https://spiritislandwiki.com/images/d/da/Harvest_Bounty%2C_Harvest_Dust_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Stages 1 & 2',
        name: 'Harvest Bounty, Harvest Dust',
        text: 'If the island is Healthy, On Each Board: Choose a land with Towns/Cities. Ravage there.If the island is Blighted, On Each Board: Push 1 Town from a land with 2 or more Towns/Cities to a land without Towns/Cities.',
      },
      {
        type: 'Stage 3',
        name: 'Widespread Clearcutting',
        text: 'On Each Board: Choose a land with Towns/Cities. Add 1 Blight there, without cascading.Players may Destroy 2 Presence/Dahan in that land to prevent adding Blight.',
      },
      {
        type: 'Beasts',
        name: 'Explorers Blunder',
        text: 'On Each Board: Destroy 2 Explorers among lands with Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Coordinated Strikes',
        text: 'In each land with 3 or more Dahan, 2 Damage and Defend 2.',
      },
    ],
  },
  'slave rebellion': {
    image: 'https://spiritislandwiki.com/images/e/e1/Slave_Rebellion_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Adversary Event',
        name: 'Slave Rebellion',
        text: '(Adversary Event - include only if specified)Discard and redraw if not playing against Kingdom of France.',
      },
      {
        type: 'Stages 1 & 2',
        name: 'Small Uprising',
        text: 'On Each Board: Add Strife to 1 Town. After finishing the Event Card, draw another one, then return this card to the Event Deck as per Setup.',
      },
      {
        type: 'Stage 3',
        name: 'Rebellion',
        text: 'On Each Board: Destroy 1 Town. Add Strife to any 2 Towns/Cities. Then, every Invader takes 1 Damage per Strife it has. After finishing this Event Card, draw another one. This card is discarded.',
      },
      {
        type: 'Dahan',
        name: 'Aid the Uprising',
        text: 'Invaders with Strife take 1 Damage per Dahan present. Add 1 Dahan per Town/City this destroys.',
      },
    ],
  },
  "remnants of a spirit's heart": {
    image: 'https://spiritislandwiki.com/images/c/ce/Remnants_of_a_Spirit%27s_Heart_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Group Choice',
        name: "Remnants of a Spirit's Heart",
        text: 'A group of Dahan find a stony ridge with lingering blessings from an ancient mountain-Spirit. You may:LEAVE ITS STRENGTH WITH THE DAHAN• Dahan have +10 Health this turn.• In lands with Dahan, Invaders have +1 Health this turn.WITH PATIENT FOCUS CRAFT A GREAT WARDINGCost: 4 Energy per player, aided by Earth.• Defend from Spirits is 4 lower per land this turn (min. 0)• During one future Spirit Phase, players may jointly decide to grant Defend 4 to all lands that turn. (There is a Reminder Card for this.)',
      },
      {
        type: 'Beasts',
        name: 'Hunting Parties',
        text: 'For each land with Beasts and Cities: 1 Fear and Destroy 1 Beasts there.',
      },
      {
        type: 'Dahan',
        name: 'A Thousand Small Struggles',
        text: 'On Each Board with 4 or more Towns/Cities and 4 or fewer Dahan: Add 1 Blight to a land without Dahan.',
      },
    ],
  },
  'temporary truce': {
    image: 'https://spiritislandwiki.com/images/e/e8/Temporary_Truce_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Terror Level 1',
        name: 'Temporary Truce',
        text: 'In lands with Dahan: 1 Dahan and 1 Town/City do not participate in Ravages. (They neither take nor deal Damage.)',
      },
      {
        type: 'Terror Levels 2 & 3',
        name: 'Temporary Caution',
        text: 'During the Ravage Step, On Each Board: Skip 1 Ravage Action in a land where Dahan outnumber Towns/Cities.',
      },
      {
        type: 'Beasts',
        name: 'Prey on the Heedless',
        text: 'In each land with Beasts, 1 Damage per Beasts.',
      },
      {
        type: 'Dahan',
        name: "Speak of the Spirits' Anger",
        text: 'For each board, 1 Fear if any Dahan are in lands with Towns/Cities.',
      },
    ],
  },
  'numinous crisis': {
    image: 'https://spiritislandwiki.com/images/e/e3/Numinous_Crisis_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Group Choice',
        name: 'Numinous Crisis',
        text: "The spiritual energy of the island weakens as life's connections grow ever more tattered. You may:DRAW STRENGTH FROM IT WHILE YOU CAN• Remove 1 Blight per player from the Blight Card. Then, if the Blight Card has not flipped, keep Removing Blight until it flips. Gain 3 Energy per Blight Removed, divided as evenly as possible among all Spirits.POUR YOUR STRENGTH INTO THE ISLAND• Each Spirit either pays 3 Energy, Forgets 2 Power Cards, or returns 1 Presence to their Presence tracks.",
      },
      {
        type: 'Disease',
        name: 'Plagues Bring Fear and Death',
        text: '1 Fear per board with Disease. On Each Board: 2 Damage to Dahan in a land with Disease.',
      },
      {
        type: 'Dahan',
        name: 'Careful Defense',
        text: 'When Invaders Ravage, if the land has Dahan, Defend 2.',
      },
    ],
  },
  'sacred sites under threat': {
    image: 'https://spiritislandwiki.com/images/4/46/Sacred_Sites_Under_Threat_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Group Choice',
        name: 'Sacred Sites Under Threat',
        text: "Invaders have begun to find hidden places of natural power. You may:LET THE ISLAND'S STRENGTH REPULSE THEM• Each Sacred Site Pushes 1 Explorer/Town to an adjacent land.• Remove 1 Blight per player from the Blight Card, returning it to the box.GUARD THEM YOURSELF, FOR WELL OR ILLCost: 3 Energy per land where you do Damage. Aided by Fire.In each land with Sacred Site and Invaders:Either do 2 DamageDestroy 1 Presence from each Spirit.",
      },
      {
        type: 'Beasts',
        name: 'Beasts Prowl',
        text: 'Each Beasts generates 1 Fear if Invaders are Present, and moves to an adjacent land if not.',
      },
      {
        type: 'Dahan',
        name: 'Spirit Speakers Solve Riddles of Power',
        text: 'Each Spirit with at least 4 Dahan among its lands gains a Minor Power.',
      },
    ],
  },
  'relentless optimism': {
    image: 'https://spiritislandwiki.com/images/2/2e/Relentless_Optimism_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Terror Level 1',
        name: 'Relentless Optimism',
        text: "For the rest of this turn, don't generate Fear for Destroying Towns/Cities.",
      },
      {
        type: 'Terror Levels 2 & 3',
        name: 'Cultures Mix and Clash',
        text: 'On Each Board:If Dahan outnumber Towns/Cities by 2 or more, Replace 1 Town with 1 Dahan.If Towns/Cities outnumber Dahan by 2 or more, Replace 1 Dahan with 1 Town.',
      },
      {
        type: 'Disease',
        name: 'Foreign Diseases',
        text: 'On Each Board, in the land with the mnost combined Invaders + Dahan (min. 1 of each): Add 1 Disease. 2 Damage to Dahan.',
      },
      {
        type: 'Dahan',
        name: 'Offerings of Pattern and Dance',
        text: 'Each Spirit with at least 2 Dahan among all its lands gains 1 Energy.',
      },
    ],
  },
  'provincial seat': {
    image: 'https://spiritislandwiki.com/images/e/e7/Provincial_Seat_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Provincial Seat',
        text: 'On Each Board: Choose a land with at least 1 City. Build there.',
      },
      {
        type: 'Blighted Island',
        name: 'Lands Hollow of Promise',
        text: 'On Each Board: Add 1 Blight to a land without Presence.Spirits may prevent this on any/all boards by Destroying 2 Presence from each board to be protected.',
      },
      {
        type: 'Beasts',
        name: 'Beasts Chase Off Homesteaders',
        text: 'On Each Board: Push up to 2 Explorers or 1 Town from a land with Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Rally to the Defense of Distant Kin',
        text: 'On Each Board: Gather 1 Dahan into a land with Dahan. In that land, Defend 1 per Dahan.',
      },
    ],
  },
  'lesser spirits imperiled': {
    image: 'https://spiritislandwiki.com/images/f/f6/Lesser_Spirits_Imperiled_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Group Choice',
        name: 'Lesser Spirits Imperiled',
        text: "The Invaders' spread is threatening many of the island's smaller Spirits. You may:TEND TO YOUR OWN STRENGTH• Each Spirit gains 1 Energy.• Discard 1 Minor Power per player from the deck. For each with Plant, Remove 1 Blight from the Blight Card, returning it to the box. For each with Animal, Destroy 1 Dahan in a land with Blight.FORGE A WEB OF MUTUAL SUPPORTCost: 4 Energy per player, aided by Plant.• Each Spirit Destroys 1 of their Presence.• Each Spirit gains 1 permanent Element for the rest of the game. (Choose separately, now.)",
      },
      {
        type: 'Beasts',
        name: 'Quit the Farmed Lands',
        text: 'On Each Board: Push 1 Beasts to a land without Town/City. 1 Fear if Explorer are present there.',
      },
      {
        type: 'Dahan',
        name: 'Return to Old Pillars',
        text: 'On Each Board: Gather 1 or 2 Dahan into a land with Dahan Setup symbols.',
      },
    ],
  },
  'no bravery without numbers': {
    image: 'https://spiritislandwiki.com/images/e/e7/No_Bravery_Without_Numbers_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Stages 1 & 2',
        name: 'No Bravery Without Numbers',
        text: 'Invaders do not Ravage in lands unless there are more Invaders than the current Terror Level.',
      },
      {
        type: 'Stage 3',
        name: 'Courage of the Crowd',
        text: 'Invaders do not Ravage in lands unless there are more Invaders than the current Terror Level.Ravage actions do +2 Damage (per land).',
      },
      {
        type: 'Beasts',
        name: 'Prey on the Heedless',
        text: 'In each land with Beasts, 1 Damage per Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Leave the Hostile Land',
        text: 'In each land, Push 1 Dahan per Badlands/Disease to lands without Badlands/Disease.',
      },
    ],
  },
  'terror spikes upwards': {
    image: 'https://spiritislandwiki.com/images/3/34/Terror_Spikes_Upwards_%28ni%29.png',
    set: 'Nature Incarnate',
    status: 'active',
    sections: [
      {
        type: 'Terror Levels 1 & 2',
        name: 'Terror Spikes Upwards',
        text: "If you have any Earned Fear Cards, resolve the first one now as if the Terror Level were 1 higher (then discard it).Otherwise, 1 Fear per player. (Generated Fear can't cause Final Harvest.)",
      },
      {
        type: 'Terror Level 3',
        name: 'Final Harvest',
        text: 'Each City does +3 Damage during Ravage Actions.After each Ravage Action, Remove 1 Town/City from that land.',
      },
      {
        type: 'Badlands and Beasts',
        name: 'Secure Settled Territory',
        text: 'On Each Board: In a land with Badlands/Beasts and Towns/Cities: Destroy 1 Badlands/Beasts. 1 Damage to Dahan. 1 Damage.',
      },
      {
        type: 'Dahan',
        name: 'War Among the Dahan',
        text: 'On Each Board: In the land with the most Dahan (min. 2), Push half the Dahan (round down).',
      },
    ],
  },
  'seeking the interior': {
    image: 'https://spiritislandwiki.com/images/e/ee/Seeking_the_Interior_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Stage 1',
        name: 'Seeking the Interior',
        text: 'In each Coastal land, Push 1 Explorer one land Inland.',
      },
      {
        type: 'Stages 2 & 3',
        name: 'Local Diaspora',
        text: 'In the single land with the most Invaders, Push 1 Explorer/Town to each adjacent land.',
      },
      {
        type: 'Beasts',
        name: 'Beasts Prowl',
        text: 'Each Beasts generates 1 Fear if Invaders are present, and moves to an adjacent land if not.',
      },
      {
        type: 'Dahan',
        name: 'Forsake the Barren Land',
        text: 'On Each Board: Push 2 Dahan from a land with Blight to a land without Blight.',
      },
    ],
  },
  "war touches the island's shores": {
    image:
      'https://spiritislandwiki.com/images/6/6a/War_Touches_the_Island%27s_Shores_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'replaced',
    sections: [
      {
        type: 'Group Choice',
        name: "War Touches the Island's Shores",
        text: 'Invaders from a different faraway land assault the ones here, torching farms and bombarding Cities. You may:ALLOW THE ATTACKS• For each board, discard the top Major Power. Deal its Energy in Damage to Invaders and the land in the Coastal land with the most Towns/Cities (minimum 1). Defend reduces the Damage.HELP REPEL THE NEWCOMERSCost: 1 Energy per player.• Add a Fear Card to the top of the Fear Deck.',
      },
      {
        type: 'Beasts',
        name: 'Beasts Find New Homes',
        text: 'On Each Board: Push 1 Beasts to an adjacent land without Blight. 1 Fear if Invaders are present there.',
      },
      {
        type: 'Dahan',
        name: 'Reclaim Territory',
        text: 'Each player may Push 1 Dahan to an adjacent land, doing 1 Damage there.',
      },
    ],
  },
  'the frontier calls': {
    image: 'https://spiritislandwiki.com/images/e/e2/The_Frontier_Calls_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'The Frontier Calls',
        text: 'Explore Actions add +1 Explorer to lands without Towns/Cities.',
      },
      {
        type: 'Blighted Island',
        name: 'Self-Sacrifice Buys Time',
        text: 'Destroy 1 Presence from each Spirit.The next X Blight added to the island this turn come from the box instead of the Blight Card, where X is the number of Spirits. (Place this card on the Blight Card as reminder.)',
      },
      {
        type: 'Beasts',
        name: 'Lair in Untamed Lands',
        text: 'On Each Board: Add 1 Beasts to a land without Towns/Cities/Blight.',
      },
      {
        type: 'Dahan',
        name: 'Seek Out New Grounds',
        text: 'On Each Board: Gather 1 or 2 Dahan into a land without Dahan Setup symbols.',
      },
    ],
  },
  'wounded lands attract explorers': {
    image: 'https://spiritislandwiki.com/images/6/6d/Wounded_Lands_Attract_Explorers_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Wounded Lands Attract Explorers',
        text: 'On Each Board: Add 1 Explorer to a land with Blight.',
      },
      {
        type: 'Blighted Island',
        name: "The World's Vibrance Fades",
        text: 'Remove 1 Blight per player from the Blight Card, returning it to the box.Each Spirit may prevent 1 Blight from being Removed by Destroying 2 of their Presence.',
      },
      {
        type: 'Beasts',
        name: 'Beasts Chase Off Homesteaders',
        text: 'On Each Board: Push up to 2 Explorer or 1 Town from a land with Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Raiding and Retaliation',
        text: 'In each land with Town/City: 1 Damage per Dahan, then each surviving Town/City deals 1 Damage to Dahan. (Defend/Strife apply normally.)',
      },
    ],
  },
  'gradual corruption': {
    image: 'https://spiritislandwiki.com/images/b/be/Gradual_Corruption_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Gradual Corruption',
        text: 'On Each Board: Add 1 Blight to a land with Towns/Cities.Spirits may prevent this on any/all boards by paying X Energy per board to protect, where X is the number of cards in the Invader discard. (This may be 0.)',
      },
      {
        type: 'Blighted Island',
        name: 'Ravaged Wilderness',
        text: 'On Each Board: Remove 1 Beasts from a land with Blight. Remove 1 Wilds from a land with Blight.',
      },
      {
        type: 'Disease',
        name: 'Fatalities Rise',
        text: 'In each land with Disease, 1 Damage to each Invader and 1 Damage to each Dahan. Remove 1 Disease from each land where this Destroys any Towns/Cities.',
      },
      {
        type: 'Dahan',
        name: 'Blessings of Bounty and Health',
        text: 'Each Spirit may add 1 Dahan to one of its lands with Dahan.',
      },
    ],
  },
  'visions out of time': {
    image: 'https://spiritislandwiki.com/images/c/c3/Visions_Out_of_Time_%28ni%29.png',
    set: 'Nature Incarnate',
    status: 'active',
    sections: [
      {
        type: 'Individual Choice',
        name: 'Visions Out of Time',
        text: "A Spirit more loosely time-moored than most warns of catastrophe's subtle seeds. Each Spirit chooses:LET THE WARNING WAFT INTO DAYS PASTLose 1 Energy and replace your most expensive non-Unique Power Card in hand or discard pile (combined) with one of the same type: Reveal the top 4 cards of the deck, Take 1, put it where your card is, then put your card in that deck's discard.HEAD OFF THE PROBLEMS YOURSELFAdd 1 Omen token (Scenario Marker) to the land without Omens that has the most Invaders (min. 1). After the Ravage Step next turn, at each Omen: 2 Fear. Invaders Ravage. Remove 1 Omen.",
      },
      {
        type: 'Beasts',
        name: 'Prey on the Heedless',
        text: 'In each land with Beasts: 1 Damage per Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Strength from Trade',
        text: 'Lands with Dahan have Defend 2. In lands with Towns/Cities and no Dahan, Ravage Actions do +1 Damage.',
      },
    ],
  },
  'focused farming': {
    image: 'https://spiritislandwiki.com/images/7/72/Focused_Farming_%28ni%29.png',
    set: 'Nature Incarnate',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Focused Farming',
        text: 'On Each Board: Add 1 Explorer and 1 Town to a land with Towns/Blight.',
      },
      {
        type: 'Blighted Island',
        name: 'Essence Disperses',
        text: 'Each Spirit chooses independently to:Forget 1 Power Card.Lose 2 Energy (to min.0) and Destroy 1 Presence. In the land where you destroyed Presence, return 1 Blight to the box (if possible).',
      },
      {
        type: 'Beasts',
        name: 'Explorers Blunder',
        text: 'On Each Board: Destroy 2 Explorers among lands with Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Offerings of Story and Season',
        text: 'Each Spirit with at least 3 Dahan among its lands gains 1 Energy and may Reclaim 1 Card.',
      },
    ],
  },
  'an ominous dawn': {
    image: 'https://spiritislandwiki.com/images/1/13/An_Ominous_Dawn_%28ni%29.png',
    set: 'Nature Incarnate',
    status: 'active',
    sections: [
      {
        type: 'Terror Level 1',
        name: 'An Ominous Dawn',
        text: "1 Fear per Power Card in play that generates Fear. (In its instructions, not by destroying Towns/Cities. Count thresholds even if you don't have the Elements. Generated Fear can't cause Wavering Resolve.)",
      },
      {
        type: 'Terror Levels 2 & 3',
        name: 'Wavering Resolve',
        text: "Remove 1 Health worth of Invaders per Power Card in play that generates Fear. (In its instructions, not by destroying Towns/Cities. Count thresholds even if you don't have the Elements.)",
      },
      {
        type: 'Badlands and Beasts',
        name: 'Dangerous Lands',
        text: 'On Each Board: 1 Damage in a land with Badlands/Beasts. 1 Damage to Dahan in a land with Badlands/Beasts and Dahan.',
      },
      {
        type: 'Dahan',
        name: 'Waning Support',
        text: 'On Each Board with Towns/Cities...and 5 or fewer Dahan: Destroy 1 Presence....and 3 or fewer Dahan: Also Add 1 Blight to a land with Towns/Cities.',
      },
    ],
  },
  'putting down roots': {
    image: 'https://spiritislandwiki.com/images/e/eb/Putting_Down_Roots_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Putting Down Roots',
        text: 'On an Inland land on Each Board: Replace 1 Explorer with 1 Town.',
      },
      {
        type: 'Blighted Island',
        name: 'The Center Crumbles',
        text: 'On Each Board with Invaders: Add 1 Blight to an Inland land.Spirits may prevent this on any/all boards by destroying 3 Presence from each board to be protected.',
      },
      {
        type: 'Disease and Strife',
        name: 'Stricken',
        text: 'In lands with Disease/Strife, Invaders skip Ravage Actions.',
      },
      {
        type: 'Dahan',
        name: 'Drive Off the Interlopers',
        text: 'Each player may Push 1 Explorer/Town from a land with Dahan.',
      },
    ],
  },
  'mapmakers chart the wild': {
    image: 'https://spiritislandwiki.com/images/e/e8/Mapmakers_Chart_the_Wild_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Stages 1 & 2',
        name: 'Mapmakers Chart the Wild',
        text: 'Ignore Wilds during the Explore Step. On Each Board without Wilds: Explore Actions add +1 Explorer (in each land successfully Explored).',
      },
      {
        type: 'Stage 3',
        name: 'Increasing Aggression',
        text: 'Invaders do +1 Damage (per land) when Ravaging.',
      },
      {
        type: 'Beasts',
        name: 'Prey on the Heedless',
        text: 'In each land with Beasts, 1 Damage per Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Coming of Age',
        text: 'On Each Board: Add 1 Dahan to a land with Dahan and no Badlands/Beasts/Disease/Wilds.',
      },
    ],
  },
  'influx of settlers': {
    image: 'https://spiritislandwiki.com/images/6/67/Influx_of_Settlers_%28ni%29.png',
    set: 'Nature Incarnate',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Influx of Settlers',
        text: 'On the single board with the most Towns/Cities: Add 1 Town per player, split between as many different lands as possible. (This will usually be 1 Town per chosen land.)',
      },
      {
        type: 'Blighted Island',
        name: 'Lethargy and Degeneration',
        text: 'On Each Board: Skip the first Ravage Action (in one land). Add 1 Blight to a land with Towns/Cities.Spirits may prevent either/both effects on any/all boards (choose per board) by Destroying 2 Presence from each board to be protected.',
      },
      {
        type: 'Beasts',
        name: 'Sand Stalkers',
        text: 'On Each Board: Add 1 Beasts to the Sands with the most Invaders. 1 Fear if Invaders are present there.',
      },
      {
        type: 'Dahan',
        name: 'Network of Support and Trade',
        text: 'When Invaders Ravage, if the land has Dahan, Defend 1 + Defend 1 per adjacent Dahan.',
      },
    ],
  },
  'rising interest in the island': {
    image: 'https://spiritislandwiki.com/images/4/4f/Rising_Interest_in_the_Island_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'active',
    sections: [
      {
        type: 'Group Choice',
        name: 'Rising Interest in the Island',
        text: 'Your island is unlike any the Invaders have seen. Their leaders begin to take interest in tales of strangeness. You may:IGNORE THEIR CURIOSITY• Return the top card of the Invader Deck to the box. (Skip cards specifically placed during Setup.)• On Each Board: Add 1 Town to a land without one.WEAVE LIES IN THE MINDS OF THEIR OBSERVERSCost: 4 Energy per player. Aided by Air.• Return the top Fear Card to the box.• During the next normal Ravage, each Town/City deals +1 Damage.',
      },
      {
        type: 'Beasts',
        name: 'Beasts of the Jungle',
        text: 'On Each Board: Add 1 Beasts to a Jungle without Blight. 1 Fear if Invaders are Present.',
      },
      {
        type: 'Dahan',
        name: 'Traps and Snares',
        text: 'On Each Board: Add 1 Wilds to a land with Dahan.',
      },
    ],
  },
  'resourceful populace': {
    image: 'https://spiritislandwiki.com/images/d/d2/Resourceful_Populace_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Terror Level 1',
        name: 'Resourceful Populace',
        text: "For the rest of this turn, after an Action Destroys 1 or more Towns/Cities, add 1 Town to an adjacent land. (If there are no adjacent lands - e.g., due to Isolate - don't add anything.)",
      },
      {
        type: 'Terror Levels 2 & 3',
        name: 'Strip the Land Bare',
        text: 'Towns each do +1 Damage when Ravaging. After a Ravage Action adds Blight, Remove 1 Explorer and 1 Town from the Ravaged land.',
      },
      {
        type: 'Disease',
        name: 'Virulence Among Close-Packed Homes',
        text: 'On Each Board: Add 1 Disease to the Inland land with the most Towns/Cities (min. 1).',
      },
      {
        type: 'Dahan',
        name: 'Offerings of Story and Season',
        text: 'Each Spirit with at least 3 Dahan among all its lands gains 1 Energy and may Reclaim 1 Card.',
      },
    ],
  },
  'pull together in adversity': {
    image: 'https://spiritislandwiki.com/images/4/44/Pull_Together_in_Adversity_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Terror Levels 1 & 2',
        name: 'Pull Together in Adversity',
        text: 'For the rest of this turn, ignore 1 Strife on each Invader. (This includes not removing that Strife.)',
      },
      {
        type: 'Terror Level 3',
        name: 'Purge the Land with Salt and Fire',
        text: 'On Each Board in a land with 2 or more Towns: Add 1 Blight without cascading. Add 2 Badlands. Remove all Towns.',
      },
      {
        type: 'Beasts',
        name: 'Explorers Blunder',
        text: 'On Each Board: Destroy 2 Explorers among lands with Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Careful Defense',
        text: 'When Invaders Ravage, if the land has Dahan, Defend 2.',
      },
    ],
  },
  'thriving trade': {
    image: 'https://spiritislandwiki.com/images/2/29/Thriving_Trade_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Thriving Trade',
        text: 'On Each Board: Add 1 City to a Coastal land with City.',
      },
      {
        type: 'Blighted Island',
        name: 'Partitioned Wilderness',
        text: 'On Each Board: If there are 4 or more lands with Town, add 1 Blight to a land with or adjacent to Town.Spirits may prevent this on any/all boards by Destroying 3 Presence from each board to be protected.',
      },
      {
        type: 'Disease',
        name: 'Pestilence Arrives on Canvas Sails',
        text: 'On Each Board: Add 1 Disease to the Coastal land with the most Town/City (min. 1). In that land, 3 Damage to Dahan.',
      },
      {
        type: 'Dahan',
        name: 'Clever Cooperation',
        text: 'Each Spirit may Push 1 of their Presence from a land with Dahan. 2 Damage in the land Pushed to.',
      },
    ],
  },
  'accumulated devastation': {
    image: 'https://spiritislandwiki.com/images/2/28/Accumulated_Devastation_%28ni%29.png',
    set: 'Nature Incarnate',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Accumulated Devastation',
        text: 'On Each Board: During the first successful Ravage Action (in one land) this Invader Phase, increase the total Damage ravaging Invaders deal to each land (but not to Dahan) by the current Invader Stage. Do this for at most one Ravage Action per board (for one Ravage Action in one land).',
      },
      {
        type: 'Blighted Island',
        name: "The World's Vibrance Fades",
        text: 'Remove 1 Blight per player from the Blight Card, returning it to the box.Each Spirit may prevent 1 Blight from being removed by destroying 2 of their Presence.',
      },
      {
        type: 'Beasts',
        name: 'Territorial Beasts',
        text: 'On Each Board: Isolate a land with Beasts. 1 Fear if Invaders are present.',
      },
      {
        type: 'Dahan',
        name: 'Years of Health and Harmony',
        text: 'On Each Board with 5 or more Dahan: Add 1 Dahan to the land with the most Dahan.',
      },
    ],
  },
  'seek new farmland': {
    image: 'https://spiritislandwiki.com/images/6/63/Seek_New_Farmland_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Seek New Farmland',
        text: 'In each land with 2 or more Towns, Push 1 Town to a land without Towns.',
      },
      {
        type: 'Blighted Island',
        name: 'Voracious Consumption',
        text: 'On Each Board: After the Ravage Step, add 1 Blight to a land with a City and no Blight.Spirits may prevent this on any/all boards by Destroying 2 Presence from each board to be protected.',
      },
      {
        type: 'Disease',
        name: 'Plagues Bring Fear and Death',
        text: '1 Fear per board with Disease. On Each Board: 2 Damage to Dahan in a land with Disease.',
      },
      {
        type: 'Dahan',
        name: 'Engage on Their Own Terms',
        text: 'During Ravage, Dahan only do 1 Damage each, but deal Damage before Invaders.',
      },
    ],
  },
  'dahan trade with the invaders': {
    image: 'https://spiritislandwiki.com/images/4/46/Dahan_Trade_with_the_Invaders_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Group Choice',
        name: 'Dahan Trade with the Invaders',
        text: 'Some seek knowledge, others are interested in tools and trade goods, still others simply curious. All hope to avoid violence, and the Invaders seem amenable - at least for now. You may:IGNORE THEIR INTEREST• Dahan do not participate in Ravages this turn.DISPLAY YOUR WRATH AT THIS BETRAYALCost: 2 Energy per player, aided by Fire.• Each Spirit with Dahan in their lands Destroys 1 of them and generates 1 Fear.CHANGE AND HELP THEM LEARN FROM THE ENEMYCost: 6 Energy per player, aided by Air.• Dahan do not participate in Ravages this turn.• Each Spirit Forgets a Power Card.• From next turn on, each Dahan provides Defend 1 in its land. (There is a Reminder Card for this.)',
      },
      {
        type: 'Disease',
        name: 'Outbreaks Shift',
        text: 'On Each Board: Push 1 Disease to the adjacent land with the most Invaders (min. 1).',
      },
    ],
  },
  'a strange madness among the beasts': {
    image:
      'https://spiritislandwiki.com/images/0/0c/A_Strange_Madness_Among_the_Beasts_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'retired',
    sections: [
      {
        type: 'Group Choice',
        name: 'A Strange Madness Among the Beasts',
        text: 'They grow even wilder and more savage. You may:Let Them Rampage Unto Death• Each Beasts destroys 1 Dahan.• Remove 1 Beasts from each board.Guide the MadnessCost: 3 Energy per Beasts you decide to keep on the Island (min 3 Energy). Aided by Animal.• Remove any number of Beasts.• Each Spirit may Push 1 Beasts to an adjacent land.',
      },
      {
        type: 'Beasts',
        name: 'Savage Frenzy',
        text: 'Each Beasts destroys 1 Explorer and deals 2 Damage.',
      },
      {
        type: 'Dahan',
        name: 'Seek a Safer Home',
        text: 'On Each Board: Push 2 Dahan from a land with Beasts/Disease/Wilds to a land without any of these tokens.',
      },
    ],
  },
  'the struggles of growth': {
    image: 'https://spiritislandwiki.com/images/4/4d/The_Struggles_of_Growth_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'The Struggles of Growth',
        text: 'A painful crux-point. Each Spirit chooses:TRADE REACH FOR DEEPER NATUREDestroy 2 of your Presence. Gain a Power Card.LEAVE BEHIND THAT WHICH RESTRAINS YOUForget a Power Card. Gain 2 Energy. Move up to 2 of your Presence up to Range',
      },
      {
        type: 'Blighted Island',
        name: 'Blight Deepens',
        text: 'On Each Board: Add 1 Blight to a land with Blight, but do not cascade.Spirits may prevent this on any/all boards by Destroying 1 Presence from each board to be protected.',
      },
      {
        type: 'Disease',
        name: 'Irregular Outbreaks',
        text: 'Ignore Disease during Builds this Invader Phase. 1 Fear per board with Disease.',
      },
      {
        type: 'Dahan',
        name: 'Careful Defense',
        text: 'When Invaders Ravage, if the land has Dahan, Defend 2.',
      },
    ],
  },
  outpaced: {
    image: 'https://spiritislandwiki.com/images/c/c4/Outpaced_%28bc%29.png',
    set: 'Branch and Claw',
    status: 'retired',
    sections: [
      {
        type: 'Individual Choice',
        name: 'Outpaced',
        text: "Humanity has always been faster than you, but the Invaders' terrifying speed catches you off guard. Each Spirit chooses independently for each of their Slow Power Cards played this turn:STAY STEADY AND SLOW• Discard the Power Card.• Gain 1 Energy, plus the card's printed Energy cost.WORK TO MATCH THEIR PACE• Pay 3 Energydestroy 2 Presence.• You may choose to resolve the Power Card now. (Instead of during the Slow Phase.)",
      },
      {
        type: 'Disease',
        name: 'Lingering Plagues',
        text: 'On Each Board: Add 1 Disease. Ignore Disease during Builds this Invader Phase.',
      },
      {
        type: 'Dahan',
        name: 'Raids in Force',
        text: 'Each Spirit chooses a different land where Dahan outnumber Towns/Cities. Each Dahan there deals 1 Damage.',
      },
    ],
  },
  'sprawl contained by the wilds': {
    image: 'https://spiritislandwiki.com/images/b/b7/Sprawl_Contained_by_the_Wilds_%28je%29.png',
    set: 'Jagged Earth',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Sprawl Contained by the Wilds',
        text: 'On Each Board: Add 1 Wilds to a land without Invaders. Build in the land with the most Towns/Cities (min. 1).',
      },
      {
        type: 'Blighted Island',
        name: 'Dissolution Threatens',
        text: 'Spirits are losing awareness and control of pieces of themselves. Each Spirit chooses:ACCEPT THIS FRAGMENTATIONDestroy 2 Presence, adding 1 Wilds in place of each.FOCUS YOUR WILL TOWARDS WHOLENESSAdd 1 of your Destroyed Presence to one of your lands. Next turn, all your Powers are Slow and cannot be Fast.',
      },
      {
        type: 'Beasts',
        name: 'Explorers Blunder',
        text: 'On Each Board: Destroy 2 Explorers among lands with Beasts.',
      },
      {
        type: 'Dahan',
        name: 'Lay Ambushes',
        text: 'During Ravage, Dahan deal Damage at the same time as Invaders.',
      },
    ],
  },
  'ethereal conjunction': {
    image: 'https://spiritislandwiki.com/images/5/5d/Ethereal_Conjunction_%28ni%29.png',
    set: 'Nature Incarnate',
    status: 'active',
    sections: [
      {
        type: 'Individual Choice',
        name: 'Ethereal Conjunction',
        text: 'A confluence of spiritual forces gathers into an unformed maelstrom. Each Spirit chooses:ENDURE ITS FORCES AS BEST YOU CAN',
      },
      {
        type: 'Disease',
        name: 'Irregular Outbreaks',
        text: "Disease doesn't prevent Builds this Invader Phase. 1 Fear per board with Disease.",
      },
      {
        type: 'Dahan',
        name: 'Tend to the Living Earth',
        text: 'On Each Board with 5 or more Dahan: Remove 1 Blight in a land with Dahan.',
      },
    ],
  },
  'search for unclaimed land': {
    image: 'https://spiritislandwiki.com/images/d/d0/Search_for_Unclaimed_Land_%28ni%29.png',
    set: 'Nature Incarnate',
    status: 'active',
    sections: [
      {
        type: 'Healthy Island',
        name: 'Search for Unclaimed Land',
        text: 'On Each Board: Explore in the land with the fewest total Invaders/Dahan (no source required).',
      },
      {
        type: 'Blighted Island',
        name: 'Widespread Hunting',
        text: 'When Towns/Cities Ravage in a land:',
      },
      {
        type: 'Disease',
        name: 'Plagues in Populous Lands',
        text: 'On Each Board: Add 1 Disease to a land with 3 or more Invaders',
      },
      {
        type: 'Dahan',
        name: 'Spreading Conflict Prompts Caution',
        text: 'On Each Board: Push up to 3 Dahan from a land matching a Ravage card to a land not matching a Ravage card.',
      },
    ],
  },
}

export const FEAR_CARDS: Record<string, FearCard> = {
  'avoid the dahan': {
    image: 'https://spiritislandwiki.com/images/7/71/Avoid_the_Dahan_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1: 'Skip all Explore Actions in lands with at least 2 Dahan.',
    terrorLevel2:
      'Skip all Build Actions in lands where Dahan outnumber Towns/Cities (including lands with no Towns/Cities).',
    terrorLevel3: 'Skip Build Actions in lands with Dahan.',
    status: 'active',
  },
  'flee the pestilent land': {
    image: 'https://spiritislandwiki.com/images/9/9a/Flee_the_Pestilent_Land_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1: 'Each player removes 1 Explorer/Town from a land with Disease.',
    terrorLevel2:
      'Each player removes up to 3 Health of Invaders from a land with Disease or 1 Explorer from an Inland land.',
    terrorLevel3:
      'Each player removes up to 5 Health of Invaders from a land with Disease, or 1 Explorer/Town from an Inland land.',
    status: 'active',
  },
  'civil unrest': {
    image: 'https://spiritislandwiki.com/images/f/f5/Civil_Unrest_%28ni%29.png',
    set: 'Nature Incarnate',
    terrorLevel1:
      'On Each Board: Add 1 Strife to a Town/City in a land not matching a Ravage Card.',
    terrorLevel2:
      'On Each Board: Add 1 Strife to a Town/City in a land not matching a Ravage Card. Each Invader takes 1 Damage there per Strife it has.',
    terrorLevel3: 'On Each Board: Add 1 Strife. Each Invader takes 1 Damage per Strife it has.',
    status: 'active',
  },
  panic: {
    image: 'https://spiritislandwiki.com/images/e/e2/Panic_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1: 'Each player adds 1 Strife in a land with Beasts/Disease/Dahan.',
    terrorLevel2:
      'Each player adds 1 Strife in a land with Beasts/Disease/Dahan. For the rest of this turn, Invaders have -1 Health per Strife to a minimum of 1.',
    terrorLevel3:
      'Each player adds 1 Strife to an Invader. For the rest of this turn, Invaders have -1 Health per Strife to a minimum of 1.',
    status: 'active',
  },
  'fear of the unseen': {
    image: 'https://spiritislandwiki.com/images/c/c4/Fear_of_the_Unseen_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1: 'Each player removes 1 Explorer/Town from a land with a Sacred Site.',
    terrorLevel2: 'Each player removes 1 Explorer/Town from a land with Presence.',
    terrorLevel3:
      'Each player removes 1 Explorer/Town from a land with Presence, or 1 City from a land with a Sacred Site.',
    status: 'active',
  },
  'flee from dangerous lands': {
    image: 'https://spiritislandwiki.com/images/8/8c/Flee_from_Dangerous_Lands_%28je%29.png',
    set: 'Jagged Earth',
    terrorLevel1: 'On Each Board: Push 1 Explorer/Town from a land with Badlands/Wilds/Dahan.',
    terrorLevel2: 'On Each Board: Remove 1 Explorer/Town from a land with Badlands/Wilds/Dahan.',
    terrorLevel3:
      'On Each Board: Remove 1 Explorer/Town from any land, or Remove 1 City from a land with Badlands/Wilds/Dahan.',
    status: 'active',
  },
  'nerves fray': {
    image: 'https://spiritislandwiki.com/images/b/bc/Nerves_Fray_%28je%29.png',
    set: 'Jagged Earth',
    terrorLevel1: 'Each player adds 1 Strife in a land not matching a Ravage Card.',
    terrorLevel2: 'Each player adds 2 Strife in a single land not matching a Ravage Card.',
    terrorLevel3:
      'Each player adds 2 Strife in a single land not matching a Ravage Card. 1 Fear per player.',
    status: 'active',
  },
  'belief takes root': {
    image: 'https://spiritislandwiki.com/images/8/88/Belief_Takes_Root_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1: 'Defend 2 in all lands with Presence.',
    terrorLevel2:
      'Defend 2 in all lands with Presence. Each Spirit gains 1 Energy per Sacred Sitge they have in lands with Invaders.',
    terrorLevel3:
      'Each player chooses a different land and removes up to 2 Health worth of Invaders per Presence there.',
    status: 'active',
  },
  'emigration accelerates': {
    image: 'https://spiritislandwiki.com/images/2/2e/Emigration_Accelerates_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1: 'Each player removes 1 Explorer from a Coastal land.',
    terrorLevel2: 'Each player removes 1 Explorer/Town from a Coastal land.',
    terrorLevel3: 'Each player removes 1 Explorer/Town from any land.',
    status: 'active',
  },
  'depart the dangerous land': {
    image: 'https://spiritislandwiki.com/images/f/f7/Depart_the_Dangerous_Land_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1:
      'Each player removes 1 Explorer from a land with Beasts, Disease, or at least 2 Dahan.',
    terrorLevel2:
      'Each player removes 1 Explorer/Town from a land with Beasts, Disease, or at least 2 Dahan.',
    terrorLevel3:
      'Each player removes up to 4 Health worth of Invaders from a land with Beasts, Disease, or at least 2 Dahan.',
    status: 'active',
  },
  'retreat!': {
    image: 'https://spiritislandwiki.com/images/5/58/Retreat%21_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1: 'Each player may Push up to 2 Explorers from an Inland land.',
    terrorLevel2: 'Each player may Push up to 3 Explorers/Towns from an Inland land.',
    terrorLevel3: 'Each player may Push any number of Explorers/Towns from one land.',
    status: 'active',
  },
  'tall tales of savagery': {
    image: 'https://spiritislandwiki.com/images/8/82/Tall_Tales_of_Savagery_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1: 'Each player Removes 1 Explorer from a land with Dahan.',
    terrorLevel2: 'Each player Removes 2 Explorers or 1 Town from a land with Dahan.',
    terrorLevel3:
      'In each land with Dahan, Remove 2 Explorers or 1 Town. If at least 2 Dahan are present, also Remove 1 City.',
    status: 'active',
  },
  'dahan threaten': {
    image: 'https://spiritislandwiki.com/images/6/6a/Dahan_Threaten_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1: 'Each player adds 1 Strife in a land with Dahan.',
    terrorLevel2:
      'Each player adds 1 Strife in a land with Dahan. For the rest of this turn, Invaders have -1 Health per Strife to a minimum of 1.',
    terrorLevel3:
      'Each player adds 1 Strife in a land with Dahan. In every land with Strife, 1 Damage per Dahan.',
    status: 'active',
  },
  'too many monsters': {
    image: 'https://spiritislandwiki.com/images/a/ac/Too_Many_Monsters_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1: 'Each player removes 1 Explorer/Town from a land with Beasts.',
    terrorLevel2:
      'Each player removes 1 Explorer and 1 Town from a land with Beasts, or 1 Explorer from a land adjacent to Beasts.',
    terrorLevel3:
      'Each player removes 2 Explorers and 2 Towns from a land with Beasts or 1 Explorer/Town from a land adjacent to Beasts.',
    status: 'active',
  },
  'dahan enheartened': {
    image: 'https://spiritislandwiki.com/images/1/19/Dahan_Enheartened_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1:
      'Each player may Push 1 Dahan from a land with Invaders or Gather 1 Dahan into a land with Invaders.',
    terrorLevel2:
      'Each player chooses a different land. In each: Gather up to 2 Dahan. 1 Damage if Dahan are present.',
    terrorLevel3:
      'Each player chooses a different land. In each: Gather up to 2 Dahan. 1 Damage per Dahan.',
    status: 'active',
  },
  demoralized: {
    image: 'https://spiritislandwiki.com/images/4/40/Demoralized_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1: 'Defend 1 in all lands.',
    terrorLevel2: 'Defend 2 in all lands.',
    terrorLevel3: 'Defend 3 in all lands.',
    status: 'active',
  },
  unrest: {
    image: 'https://spiritislandwiki.com/images/9/9e/Unrest_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1: 'Each player adds 1 Strife to a Town.',
    terrorLevel2:
      'Each player adds 1 Strife to a Town. For the rest of this turn, Invaders have -1 Health per Strife to a minimum of 1.',
    terrorLevel3:
      'Each player adds 1 Strife to an Invader. For the rest of this turn, Invaders have -1 Health per Strife to a minimum of 1.',
    status: 'active',
  },
  'dahan raid': {
    image: 'https://spiritislandwiki.com/images/5/58/Dahan_Raid_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1: 'Each player chooses a different land with Dahan. In each: 1 Damage.',
    terrorLevel2: 'Each player chooses a different land with Dahan. In each: 1 Damage per Dahan.',
    terrorLevel3: 'Each player chooses a different land with Dahan. In each: 2 Damage per Dahan.',
    status: 'active',
  },
  'supply chains abandoned': {
    image: 'https://spiritislandwiki.com/images/c/cf/Supply_Chains_Abandoned_%28ni%29.png',
    set: 'Nature Incarnate',
    terrorLevel1: 'On Each Board: Isolate one land.',
    terrorLevel2:
      'On Each Board: Isolate one land. If Towns/Cities are present, skip all Build Actions (in that land).',
    terrorLevel3:
      'On Each Board: Isolate two lands. In each of those lands, if Towns/Cities are present, skip all Build Actions (in that land).',
    status: 'active',
  },
  'beset by many troubles': {
    image: 'https://spiritislandwiki.com/images/9/97/Beset_by_Many_Troubles_%28je%29.png',
    set: 'Jagged Earth',
    terrorLevel1: 'In each land with Badlands/Beasts/Disease/Wilds/Strife, Defend 3.',
    terrorLevel2:
      'In each land with Badlands/Beasts/Disease/Wilds/Strife, or adjacent to 3 or more such tokens, Defend 5.',
    terrorLevel3:
      'Every Badlands/Beasts/Disease/Wilds/Strife grants Defend 3 in its land and adjacent lands.',
    status: 'active',
  },
  'seek safety': {
    image: 'https://spiritislandwiki.com/images/1/10/Seek_Safety_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1:
      'Each player may Push 1 Explorer into a land with more Towns/Cities than the land it came from.',
    terrorLevel2:
      'Each player may Gather 1 Explorer into a land with Towns/Cities, or Gather 1 Town into a land with Cities.',
    terrorLevel3:
      'Each player may remove up to 3 Health worth of Invaders from a land without Cities.',
    status: 'active',
  },
  'theological strife': {
    image: 'https://spiritislandwiki.com/images/1/19/Theological_Strife_%28je%29.png',
    set: 'Jagged Earth',
    terrorLevel1: 'Each player adds 1 Strife in a land with Presence.',
    terrorLevel2:
      'Each player adds 1 Strife in a land with Presence. Each Spirit gains 1 Energy per SacredSite they have in lands with Invaders.',
    terrorLevel3:
      'Each player adds 1 Strife in a land with Presence. Then, each Invader with Strife deals Damage to other Invaders in its land.',
    status: 'active',
  },
  'overseas trade seems safer': {
    image: 'https://spiritislandwiki.com/images/7/7f/Overseas_Trade_Seems_Safer_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1: 'Defend 3 in all Coastal lands.',
    terrorLevel2:
      'Defend 6 in all Coastal lands. Skip all Build Actions in Coastal lands that would Add a City.',
    terrorLevel3: 'Defend 9 in all Coastal lands. Skip all Build Actions in Coastal lands.',
    status: 'active',
  },
  'panicked by wild beasts': {
    image: 'https://spiritislandwiki.com/images/9/97/Panicked_by_Wild_Beasts_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1: 'Each player adds 1 Strife in a land with or adjacent to Beasts.',
    terrorLevel2:
      'Each player adds 1 Strife in a land with or adjacent to Beasts. Invaders skip their normal Explore and Build in lands with Beasts.',
    terrorLevel3:
      'Each player adds 1 Strife in a land with or adjacent to Beasts. Invaders skip all normal Actions in lands with Beasts.',
    status: 'active',
  },
  'seek company': {
    image: 'https://spiritislandwiki.com/images/a/a7/Seek_Company_%28ni%29.png',
    set: 'Nature Incarnate',
    terrorLevel1: 'On Each Board: Gather up to 1 Explorer into a land with 2 or more Invaders.',
    terrorLevel2:
      'On Each Board: Gather up to 3 Explorers/Towns from a single land into a land with 2 or more Invaders.',
    terrorLevel3:
      'On Each Board: Gather up to 4 Explorers/Towns (total) into lands with 2 or more Invaders.',
    status: 'active',
  },
  scapegoats: {
    image: 'https://spiritislandwiki.com/images/d/d6/Scapegoats_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1: 'In each land with Towns: Destroy 1 Explorer per Town.',
    terrorLevel2:
      'In each land with Towns/Cities: Destroy 1 Explorer per Town and 2 Explorers per City.',
    terrorLevel3: 'In each land with Towns/Cities: Destroy all Explorers. Destroy 1 Town per City.',
    status: 'active',
  },
  restlessness: {
    image: 'https://spiritislandwiki.com/images/2/23/Restlessness_%28ni%29.png',
    set: 'Nature Incarnate',
    terrorLevel1: 'Each player Pushes up to 1 Explorer/Town from a land not matching a Build card.',
    terrorLevel2: 'Each player Pushes up to 3 Explorer/Town from a land not matching a Build card.',
    terrorLevel3:
      'Each player Removes up to 3 Explorer/Town from a land not matching a Build card.',
    status: 'active',
  },
  discord: {
    image: 'https://spiritislandwiki.com/images/5/56/Discord_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1: 'Each player adds 1 Strife in a different land with at least 2 Invaders.',
    terrorLevel2:
      'Each player adds 1 Strife in a different land with at least 2 Invaders. Then, each Invader takes 1 Damage per Strife it has.',
    terrorLevel3:
      'Each player adds 1 Strife in a different land with at least 2 Invaders. Then, each Invader with Strife deals Damage to other Invaders in its land.',
    status: 'active',
  },
  'spreading timidity': {
    image: 'https://spiritislandwiki.com/images/c/c1/Spreading_Timidity_%28ff%29.png',
    set: ['Promo Pack 2', 'Feather and Flame'],
    terrorLevel1: 'Each player chooses a land to Isolate.',
    terrorLevel2: 'Each player chooses a different land to Isolate. Also, Defend 2 in those lands.',
    terrorLevel3: 'Each player chooses a different land to Isolate. Also, Defend 4 in those lands.',
    status: 'active',
  },
  'explorers are reluctant': {
    image: 'https://spiritislandwiki.com/images/8/8e/Explorers_are_Reluctant_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1:
      'During the next normal Explore, skip the lowest-numbered land matching the Invader Card on each board.',
    terrorLevel2:
      'Skip the next normal Explore. During the next invader Phase, draw an additional Explore card.',
    terrorLevel3:
      'Skip the next normal Explore, but still reveal a card. (Perform the Stage II Escalation if relevant.) Cards shift left as usual.',
    status: 'active',
  },
  quarantine: {
    image: 'https://spiritislandwiki.com/images/d/d8/Quarantine_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1: 'Explore does not affect Coastal lands.',
    terrorLevel2:
      'Explore does not affect Coastal lands. Lands with Disease are not a source of Invaders when Exploring.',
    terrorLevel3:
      'Explore does not affect Coastal lands. Invaders do not act in lands with Disease.',
    status: 'active',
  },
  depopulation: {
    image: 'https://spiritislandwiki.com/images/0/04/Depopulation_%28ff%29.png',
    set: ['Promo Pack 2', 'Feather and Flame'],
    terrorLevel1: 'On Each Board: Replace 1 Town with 1 Explorer.',
    terrorLevel2: 'On Each Board: Remove 1 Town.',
    terrorLevel3: 'On Each Board: Remove 1 Town, or Replace 1 City with 1 Town.',
    status: 'active',
  },
  'distracted by local troubles': {
    image: 'https://spiritislandwiki.com/images/3/34/Distracted_by_Local_Troubles_%28ni%29.png',
    set: 'Nature Incarnate',
    terrorLevel1: 'On Each Board, in a land matching a Ravage Card: 1 Damage.',
    terrorLevel2:
      'On Each Board, in a land matching a Ravage Card: 1 Damage each to up to 2 Invaders. Invaders each do -1 Damage per Damage they have taken.',
    terrorLevel3:
      "On Each Board, in a land matching a Ravage Card: 2 Damage (per land)'.. Invaders each do -1 Damage per Damage they have taken.",
    status: 'active',
  },
  'sense of dread': {
    image: 'https://spiritislandwiki.com/images/8/84/Sense_of_Dread_%28je%29.png',
    set: 'Jagged Earth',
    terrorLevel1: 'On Each Board: Remove 1 Explorer from a land matching a Ravage card.',
    terrorLevel2: 'On Each Board: Remove 1 Explorer/Town from a land matching a Ravage card.',
    terrorLevel3: 'On Each Board: Remove 1 Invader from a land matching a Ravage card.',
    status: 'active',
  },
  'communities in disarray': {
    image: 'https://spiritislandwiki.com/images/9/9d/Communities_in_Disarray_%28ff%29.png',
    set: ['Promo Pack 2', 'Feather and Flame'],
    terrorLevel1:
      'Cities each deal -1 Damage during Ravage. Invaders do not heal Damage at the end of this turn.',
    terrorLevel2:
      'Towns/Cities each deal -1 Damage during Ravage. Invaders do not heal Damage at the end of this turn.',
    terrorLevel3:
      'Towns/Cities each deal -2 Damage during Ravage. Invaders do not heal Damage at the end of this turn.',
    status: 'active',
  },
  'dahan reclaim fishing grounds': {
    image: 'https://spiritislandwiki.com/images/b/b3/Dahan_Reclaim_Fishing_Grounds_%28je%29.png',
    set: 'Jagged Earth',
    terrorLevel1:
      'Each player chooses a different Coastal land with Dahan. In each: 1 Damage per Dahan.',
    terrorLevel2:
      'Each player chooses a different Coastal land. In each: Gather up to 1 Dahan. 1 Damage per Dahan.',
    terrorLevel3:
      'Each player chooses a different Coastal land. In each: Gather up to 1 Dahan. 2 Damage per Dahan.',
    status: 'active',
  },
  'dahan on their guard': {
    image: 'https://spiritislandwiki.com/images/b/b8/Dahan_on_their_Guard_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1: 'Lands with Dahan have Defend 1 per Dahan.',
    terrorLevel2: 'Lands with Dahan have Defend 1 + Defend 1 per Dahan.',
    terrorLevel3: 'Lands with Dahan have Defend 2 per Dahan.',
    status: 'active',
  },
  'trade suffers': {
    image: 'https://spiritislandwiki.com/images/3/3f/Trade_Suffers_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1: 'Skip all Build Actions in lands with Cities.',
    terrorLevel2: 'Each player may Downgrade 1 Town in a Coastal land.',
    terrorLevel3: 'Each player may Downgrade 1 Town/City in a Coastal land.',
    status: 'active',
  },
  'mimic the dahan': {
    image: 'https://spiritislandwiki.com/images/d/da/Mimic_the_Dahan_%28ff%29.png',
    set: ['Promo Pack 2', 'Feather and Flame'],
    terrorLevel1: 'Each player Removes 1 Explorer/Town from a land with 2 or more Dahan.',
    terrorLevel2:
      'Each player Replaces 1 Explorer/Town with 1 Dahan in a land with 2 or more Dahan.',
    terrorLevel3:
      'Each player Replaces 1 Explorer/Town with 1 Dahan in a land with Dahan, or adjacent to 3 or more Dahan.',
    status: 'active',
  },
  unsettled: {
    image: 'https://spiritislandwiki.com/images/c/cc/Unsettled_%28ni%29.png',
    set: 'Nature Incarnate',
    terrorLevel1:
      'On Each Board: Choose a land with Beasts/Strife/Dahan. Downgrade 1 Town/City there.',
    terrorLevel2:
      'On Each Board: Choose a land with Beasts/Strife/Dahan. Downgrade 1 Town/City there or skip the next Build Action there (this turn).',
    terrorLevel3:
      'On Each Board: Choose a land with Beasts/Strife/Dahan. Remove 1 Invader there or skip the next Build Action there (this turn).',
    status: 'active',
  },
  'dahan gain the edge': {
    image: 'https://spiritislandwiki.com/images/9/92/Dahan_Gain_the_Edge_%28ni%29.png',
    set: 'Nature Incarnate',
    terrorLevel1: 'Each player chooses a different land with Dahan. In Each: Defend 2.',
    terrorLevel2:
      'Each player chooses a different land with Dahan. In Each: 1 Damage and Defend 3.',
    terrorLevel3:
      'Each player chooses a different land with Dahan. In Each: 2 Damage and Defend 4.',
    status: 'active',
  },
  'plan for departure': {
    image: 'https://spiritislandwiki.com/images/a/ad/Plan_for_Departure_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1: 'Each player may Gather 1 Town into a Coastal land.',
    terrorLevel2:
      'Each player may Gather 1 Explorer/Town into a Coastal land. Defend 2 in all Coastal lands.',
    terrorLevel3:
      'Each player may Gather 2 Explorers/Towns into a Coastal land. Defend 4 in all Coastal lands.',
    status: 'active',
  },
  'immigration slows': {
    image: 'https://spiritislandwiki.com/images/2/27/Immigration_Slows_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1:
      'During the next normal Build, skip the lowest-numbered land matching the Invader Card on each board.',
    terrorLevel2:
      'Skip the next normal Build. The Build Card remains in place instead of shifting left.',
    terrorLevel3: 'Skip the next normal Build. The Build Card shifts left as usual.',
    status: 'active',
  },
  'tread carefully': {
    image: 'https://spiritislandwiki.com/images/1/12/Tread_Carefully_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1:
      'Each player may choose a land with Dahan or adjacent to at least 5 Dahan. Invaders do not Ravage there this turn.',
    terrorLevel2:
      'Each player may choose a land with Dahan or adjacent to at least 3 Dahan. Invaders do not Ravage there this turn.',
    terrorLevel3:
      'Each player may choose a land with Dahan or adjacent to Dahan. Invaders do not Ravage there this turn.',
    status: 'active',
  },
  'daunted by the dahan': {
    image: 'https://spiritislandwiki.com/images/6/6b/Daunted_by_the_Dahan_%28ni%29.png',
    set: 'Nature Incarnate',
    terrorLevel1:
      '1 Fear per board with both Invaders and Dahan. Invaders do -6 Damage to Dahan (per land) during Ravage.',
    terrorLevel2:
      '1 Fear per board with both Invaders and Dahan. Lands with Dahan have Defend 3. Invaders do -6 Damage to Dahan (per land) during Ravage.',
    terrorLevel3:
      '1 Fear per board with both Invaders and Dahan. Lands with Dahan have Defend 3. Invaders do -6 Damage to Dahan (per land) during Ravage. Isolate all lands with Dahan.',
    status: 'active',
  },
  'dahan attack': {
    image: 'https://spiritislandwiki.com/images/6/6d/Dahan_Attack_%28bc%29.png',
    set: 'Branch and Claw',
    terrorLevel1: 'Each player removes 1 Explorer from a land with Dahan.',
    terrorLevel2: 'Each player chooses a different land with Dahan. 1 Damager per Dahan there.',
    terrorLevel3:
      'Each player chooses a different land with Towns/Cities. Gather 1 Dahan into that land. Then, 2 Damage per Dahan there.',
    status: 'active',
  },
  'wary of the interior': {
    image: 'https://spiritislandwiki.com/images/d/d4/Wary_of_the_Interior_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1: 'Each player Removes 1 Explorer from an Inland land.',
    terrorLevel2: 'Each player Removes 1 Explorer/Town from an Inland land.',
    terrorLevel3: 'Each player Removes 1 Explorer/Town from any land.',
    status: 'active',
  },
  isolation: {
    image: 'https://spiritislandwiki.com/images/1/17/Isolation_%28hosi%29.png',
    set: ['Spirit Island', 'Horizons of Spirit Island'],
    terrorLevel1: 'Each player Removes 1 Explorer/Town from a land where it is the only Invader.',
    terrorLevel2: 'Each player Removes 1 Explorer/Town from a land with 2 or fewer Invaders.',
    terrorLevel3: 'Each player Removes an Invader from a land with 2 or fewer Invaders.',
    status: 'active',
  },
  'angry mobs': {
    image: 'https://spiritislandwiki.com/images/f/fb/Angry_Mobs_%28ff%29.png',
    set: ['Promo Pack 2', 'Feather and Flame'],
    terrorLevel1: 'Each player may replace 1 Town with 2 Explorer. 1 Fear per player who does.',
    terrorLevel2: 'In each land with 2 or more Explorers, destroy 1 Explorer/Town per 2 Explorer.',
    terrorLevel3: 'In each land with 2 or more Explorers, destroy 1 Invader per 2 Explorer.',
    status: 'active',
  },
  'struggles over farmland': {
    image: 'https://spiritislandwiki.com/images/f/fd/Struggles_over_Farmland_%28ni%29.png',
    set: 'Nature Incarnate',
    terrorLevel1: 'Each player Adds 1 Strife in a land with Blight.',
    terrorLevel2: 'Each player adds 1 Strife to a Town or Adds 1 Strife in a land with Blight.',
    terrorLevel3:
      'Each player Adds 1 Strife. In each land with Blight, 1 Invader with Strife does Damage to other Invaders.',
    status: 'active',
  },
}

export const POWERS: Record<string, PowerCard> = {
  "call of the dahan ways": {
    "image": "https://spiritislandwiki.com/images/4/49/Call_of_the_Dahan_Ways_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with Dahan",
    "effect": "Replace 1 Explorer with 1 Dahan.",
    "threshhold": {
      "elements": {
        "m": 2
      },
      "ability": "You may instead Replace 1 Town with 1 Dahan."
    },
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/d/d0/Call_of_the_Dahan_Ways.png"
  },
  "spur on with words of fire": {
    "image": "https://spiritislandwiki.com/images/a/ad/Spur_on_with_Words_of_Fire_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "If you target a Spirit other than yourself, they gain +1 Energy. Target Spirit may immediately play another Power Card by paying its cost. (If it is Slow, it does not resolve until later.) ",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/2/2f/Spur_on_With_Words_of_Fire.png"
  },
  "fire and flood": {
    "image": "https://spiritislandwiki.com/images/8/84/Fire_and_Flood_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 7,
    "elements": [
      "s",
      "f",
      "w"
    ],
    "speed": "slow",
    "range": [
      1,
      2
    ],
    "target": "Any Two Lands",
    "effect": "4 Damage in each target land. (Range must be measured from the same Sacred Site.) ",
    "threshhold": {
      "elements": {
        "f": 3
      },
      "ability": "+4 Damage in either target land. 3 — 3 Water: +4 Damage in either target land."
    },
    "artist": "Jason Behnke",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/a/ac/Fire_and_Flood.png"
  },
  "call to isolation": {
    "image": "https://spiritislandwiki.com/images/7/79/Call_to_Isolation_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Land with Dahan",
    "effect": "Push 1 Explorer/Town per Dahan. Push 1 Dahan.",
    "threshhold": null,
    "artist": "Graham Stermberg",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/0/09/Call_to_Isolation.png"
  },
  "rouse the trees and stones": {
    "image": "https://spiritislandwiki.com/images/5/52/Rouse_the_Trees_and_Stones_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "f",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with no Blight",
    "effect": "2 Damage. Push 1 Explorer.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/e/ec/Rouse_the_Trees_and_Stones.png"
  },
  "call to tend": {
    "image": "https://spiritislandwiki.com/images/3/36/Call_to_Tend_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "w",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with Dahan",
    "effect": "Remove 1 Blight. Push up to 3 Dahan.",
    "threshhold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/8/81/Call_to_Tend.png"
  },
  "drought": {
    "image": "https://spiritislandwiki.com/images/b/bb/Drought_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Destroy 3 Towns . 1 Damage to each Town / City . Add 1 Blight .",
    "threshhold": {
      "elements": {
        "s": 3
      },
      "ability": "Destroy 1 City."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/8/89/Drought.png"
  },
  "dark and tangled woods": {
    "image": "https://spiritislandwiki.com/images/b/bd/Dark_and_Tangled_Woods_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "2 Fear. If target land is a Mountain or Jungle, Defend 3.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/b/bb/Dark_and_Tangled_Woods.png"
  },
  "delusions of danger": {
    "image": "https://spiritislandwiki.com/images/b/ba/Delusions_of_Danger_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Push 1 Explorer. 2 Fear.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/f/f6/Delusions_of_Danger.png"
  },
  "sap the strength of multitudes": {
    "image": "https://spiritislandwiki.com/images/1/1c/Sap_the_Strength_of_Multitudes_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "w",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "Defend 5.",
    "threshhold": {
      "elements": {
        "a": 1
      },
      "ability": "Increase this Power's Range to 1."
    },
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/c/c2/Sap_the_Strength_of_Multitudes.png"
  },
  "call to migrate": {
    "image": "https://spiritislandwiki.com/images/9/9d/Call_to_Migrate_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "f",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Gather up to 3 Dahan. Push up to 3 Dahan.",
    "threshhold": null,
    "artist": "Graham Stermberg",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/d/da/Call_to_Migrate.png"
  },
  "land of haunts and embers": {
    "image": "https://spiritislandwiki.com/images/9/96/Land_of_Haunts_and_Embers_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "m",
      "f",
      "a"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Any Land",
    "effect": "2 Fear. Push up to 2 Explorers/Towns. If Blight is present, 2 Fear and Push up to 2 Explorers/Towns. Add 1 Blight.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/1/1c/Land_of_Haunts_and_Embers.png"
  },
  "blazing renewal": {
    "image": "https://spiritislandwiki.com/images/d/d8/Blazing_Renewal_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 5,
    "elements": [
      "f",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "In a single land within 2 Range of your Presence: target Spirit Adds 2 of their Destroyed Presence. If any Presence was Added, 2 Damage to each Town/City.",
    "threshhold": {
      "elements": {
        "f": 3,
        "e": 3,
        "p": 2
      },
      "ability": "If any Presence was Added, 4 Damage."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/2/2b/Blazing_Renewal.png"
  },
  "gift of power": {
    "image": "https://spiritislandwiki.com/images/0/0b/Gift_of_Power_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "m",
      "w",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit gains a Minor Power Card.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/5/5d/Gift_of_Power.png"
  },
  "paralyzing fright": {
    "image": "https://spiritislandwiki.com/images/3/35/Paralyzing_Fright_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "4 Fear. Skip all Invader Actions. (Do not Ravage, Build, or Explore in target land.) ",
    "threshhold": {
      "elements": {
        "a": 2,
        "e": 3
      },
      "ability": "4 Fear."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/a/ab/Paralyzing_Fright.png"
  },
  "entwined power": {
    "image": "https://spiritislandwiki.com/images/7/73/Entwined_Power_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 2,
    "elements": [
      "m",
      "w",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "You and target Spirit may use each other's Presence to target Powers (only) . Target Spirit gains a Power Card. You gain one of the Power Cards they did not keep.",
    "threshhold": {
      "elements": {
        "w": 2,
        "p": 4
      },
      "ability": "You and target Spirit each gain 3 Energy and may gift the other 1 Power Card from hand."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/4/47/Entwined_Power.png"
  },
  "quicken the earth's struggles": {
    "image": "https://spiritislandwiki.com/images/4/49/Quicken_the_Earth%27s_Struggles_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "1 Damage to each Town/City. Defend 10.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/5/59/Quicken_the_Earth%27s_Struggles.png"
  },
  "call on midnight's dream": {
    "image": "https://spiritislandwiki.com/images/c/c3/Call_on_Midnight%27s_Dream_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "If target land has Dahan, gain a Major Power. If you Forget this Power, gain Energy equal to Dahan and you may play the Major Power immediately, paying its cost. If Invaders are present, 2 Fear.",
    "threshhold": null,
    "artist": "Shane Tyree",
    "status": "active",
    "from": null,
    "unique": "bringer of dreams and nightmares",
    "art": "https://spiritislandwiki.com/images/9/99/Call_on_Midnight%27s_Dream.png"
  },
  "encompassing ward": {
    "image": "https://spiritislandwiki.com/images/c/cc/Encompassing_Ward_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit provides Defend 2 in each of its lands.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/a/a9/Encompassing_Ward.png"
  },
  "grasping tide": {
    "image": "https://spiritislandwiki.com/images/a/ac/Grasping_Tide_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "w"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Coastal Land",
    "effect": "2 Fear. Defend 4.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "ocean's hungry grasp",
    "art": "https://spiritislandwiki.com/images/b/b4/Grasping_Tide.png"
  },
  "lure of the unknown": {
    "image": "https://spiritislandwiki.com/images/6/65/Lure_of_the_Unknown_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "m",
      "f",
      "a",
      "p"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Land with No Invaders",
    "effect": "Gather 1 Explorer/Town.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/8/87/Lure_of_the_Unknown.png"
  },
  "call to bloodshed": {
    "image": "https://spiritislandwiki.com/images/7/78/Call_to_Bloodshed_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with Dahan",
    "effect": "1 Damage per Dahan. Gather up to 3 Dahan.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/3/37/Call_to_Bloodshed.png"
  },
  "nature's resilience": {
    "image": "https://spiritislandwiki.com/images/d/d4/Nature%27s_Resilience_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "e",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Defend 6.",
    "threshhold": {
      "elements": {
        "w": 2
      },
      "ability": "You may instead Remove 1 Blight."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/3/3e/Nature%27s_Resilience.png"
  },
  "vengeance of the dead": {
    "image": "https://spiritislandwiki.com/images/b/bc/Vengeance_of_the_Dead_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "m",
      "f",
      "n"
    ],
    "speed": "fast",
    "range": 3,
    "target": "Any Land",
    "effect": "3 Fear. After Towns/Cities/Dahan are Destroyed in target land, 1 Damage per Town/City/Dahan Destroyed. (This cannot trigger itself.) ",
    "threshhold": {
      "elements": {
        "n": 3
      },
      "ability": "Damage from this Power may be dealt in adjacent lands."
    },
    "artist": "Kat Birmelin",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/7/74/Vengeance_of_the_Dead.png"
  },
  "enticing splendor": {
    "image": "https://spiritislandwiki.com/images/2/24/Enticing_Splendor_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "a",
      "p"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Land with no Blight",
    "effect": "Gather 1 Explorer/Town. Gather up to 2 Dahan.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/3/3f/Enticing_Splendor.png"
  },
  "winds of rust and atrophy": {
    "image": "https://spiritislandwiki.com/images/3/3d/Winds_of_Rust_and_Atrophy_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "a",
      "w",
      "n"
    ],
    "speed": "fast",
    "range": 3,
    "target": "Any Land",
    "effect": "1 Fear and Defend 6. Downgrade 1 Town/City.",
    "threshhold": {
      "elements": {
        "a": 3,
        "w": 3,
        "n": 2
      },
      "ability": "Repeat this Power."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/9/99/Winds_of_Rust_and_Atrophy.png"
  },
  "entrancing apparitions": {
    "image": "https://spiritislandwiki.com/images/6/6f/Entrancing_Apparitions_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Defend 2. If no Invaders are present, Gather up to 2 Explorers.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/b/b3/Entrancing_Apparitions.png"
  },
  "pull beneath the hungry earth": {
    "image": "https://spiritislandwiki.com/images/4/4e/Pull_Beneath_the_Hungry_Earth_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "If your Presence is present, 1 Fear and 1 Damage. If target land is a Sands or Wetland, 1 Damage.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/c/c0/Pull_Beneath_the_Hungry_Earth.png"
  },
  "visions of fiery doom": {
    "image": "https://spiritislandwiki.com/images/f/fb/Visions_of_Fiery_Doom_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "f"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "1 Fear. Push 1 Explorer/Town.",
    "threshhold": {
      "elements": {
        "f": 2
      },
      "ability": "+1 Fear."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/b/b1/Visions_of_Fiery_Doom.png"
  },
  "harbingers of the lightning": {
    "image": "https://spiritislandwiki.com/images/0/0b/Harbingers_of_the_Lightning_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "f",
      "a"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Push up to 2 Dahan. 1 Fear if you pushed any Dahan into a land with Towns/Cities.",
    "threshhold": null,
    "artist": "Rocky Hammer",
    "status": "active",
    "from": null,
    "unique": "lightning's swift strike",
    "art": "https://spiritislandwiki.com/images/c/c0/Harbingers_of_the_Lightning.png"
  },
  "lightning's boon": {
    "image": "https://spiritislandwiki.com/images/7/7d/Lightning%27s_Boon_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "a"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit may use up to 2 Slow Powers as if they were Fast Powers this turn.",
    "threshhold": null,
    "artist": "Rocky Hammer",
    "status": "active",
    "from": null,
    "unique": "lightning's swift strike",
    "art": "https://spiritislandwiki.com/images/5/5c/Lightning%27s_Boon.png"
  },
  "crops wither and fade": {
    "image": "https://spiritislandwiki.com/images/9/9a/Crops_Wither_and_Fade_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "p"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "2 Fear. Replace 1 Town with 1 Explorer. Replace 1 City with 1 Town.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "shadows flicker like flame",
    "art": "https://spiritislandwiki.com/images/8/80/Crops_Wither_and_Fade.png"
  },
  "powerstorm": {
    "image": "https://spiritislandwiki.com/images/6/63/Powerstorm_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit gains 3 Energy. Once this turn, target Spirit may Repeat a Power Card by paying its cost again.",
    "threshhold": {
      "elements": {
        "s": 2,
        "f": 2,
        "a": 3
      },
      "ability": "Target may Repeat up to 2 other Power Cards by paying their costs."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/c/cd/Powerstorm.png"
  },
  "vigor of the breaking dawn": {
    "image": "https://spiritislandwiki.com/images/e/e9/Vigor_of_the_Breaking_Dawn_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "s",
      "n"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Land with Dahan",
    "effect": "2 Damage per Dahan.",
    "threshhold": {
      "elements": {
        "s": 3,
        "n": 2
      },
      "ability": "You may Push up to 2 Dahan. In lands you Pushed Dahan to, 2 Damage per Dahan present."
    },
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/a/a8/Vigor_of_the_Breaking_Dawn.png"
  },
  "accelerated rot": {
    "image": "https://spiritislandwiki.com/images/b/b7/Accelerated_Rot_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Jungle or Wetland",
    "effect": "2 Fear. 4 Damage.",
    "threshhold": {
      "elements": {
        "s": 3,
        "w": 2,
        "p": 3
      },
      "ability": "5 Damage. Remove 1 Blight."
    },
    "artist": "Graham Stermberg",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/b/be/Accelerated_Rot.png"
  },
  "devouring ants": {
    "image": "https://spiritislandwiki.com/images/8/80/Devouring_Ants_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Fear. 1 Damage. Destroy 1 Dahan. If target land is a Jungle or Sands, +1 Damage.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/6/69/Devouring_Ants.png"
  },
  "drift down into slumber": {
    "image": "https://spiritislandwiki.com/images/5/57/Drift_Down_into_Slumber_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "a",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Any Land",
    "effect": "Defend 1. If target land is a Jungle or Sands, instead Defend 4.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/a/a4/Drift_Down_Into_Slumber.png"
  },
  "the trees and stones speak of war": {
    "image": "https://spiritislandwiki.com/images/8/81/The_Trees_and_Stones_Speak_of_War_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 2,
    "elements": [
      "s",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Land with Dahan",
    "effect": "For each Dahan, 1 Damage and Defend 2.",
    "threshhold": {
      "elements": {
        "s": 2,
        "e": 2,
        "p": 2
      },
      "ability": "You may Push up to 2 Dahan, moving Defend 2 with each of them."
    },
    "artist": "Graham Stermberg",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/4/4a/The_Trees_and_Stones_Speak_of_War.png"
  },
  "purifying flame": {
    "image": "https://spiritislandwiki.com/images/5/57/Purifying_Flame_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "a",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Damage per Blight. If target land is a Mountain or Sands, you may instead Remove 1 Blight.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/b/b2/Purifying_Flame.png"
  },
  "reaching grasp": {
    "image": "https://spiritislandwiki.com/images/d/d2/Reaching_Grasp_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "a",
      "w"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit gets +2 Range with all their Powers.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/6/6e/Reaching_Grasp.png"
  },
  "steam vents": {
    "image": "https://spiritislandwiki.com/images/2/2f/Steam_Vents_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "f",
      "a",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "Destroy 1 Explorer.",
    "threshhold": {
      "elements": {
        "e": 3
      },
      "ability": "You may instead Destroy 1 Town."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/e/e9/Steam_Vents.png"
  },
  "call to trade": {
    "image": "https://spiritislandwiki.com/images/b/bc/Call_to_Trade_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "a",
      "w",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Land with Dahan",
    "effect": "You may Gather 1 Dahan. If the Terror Level is 2 or lower, Gather 1 Town and the first Ravage in target land this turn becomes a Build there instead.",
    "threshhold": null,
    "artist": "Kat Birmelin",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/e/ec/Call_to_Trade.png"
  },
  "savage mawbeasts": {
    "image": "https://spiritislandwiki.com/images/6/6a/Savage_Mawbeasts_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "If target land is a Jungle or Wetland, 1 Fear and 1 Damage.",
    "threshhold": {
      "elements": {
        "n": 3
      },
      "ability": "1 Damage."
    },
    "artist": "Cari Corene",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/8/89/Savage_Mawbeasts.png"
  },
  "voice of thunder": {
    "image": "https://spiritislandwiki.com/images/f/f2/Voice_of_Thunder_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "a"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Push up to 4 Dahan. If Invaders are present, 2 Fear.",
    "threshhold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "unique": "thunderspeaker",
    "art": "https://spiritislandwiki.com/images/b/b9/Voice_of_Thunder.png"
  },
  "wash away": {
    "image": "https://spiritislandwiki.com/images/d/d8/Wash_Away_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Push up to 3 Explorers/Towns.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "river surges in sunlight",
    "art": "https://spiritislandwiki.com/images/3/38/Wash_Away.png"
  },
  "a year of perfect stillness": {
    "image": "https://spiritislandwiki.com/images/2/2d/A_Year_of_Perfect_Stillness_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "s",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Invaders skip all Actions in target land this turn.",
    "threshhold": null,
    "artist": "Sydni Kruger",
    "status": "active",
    "from": null,
    "unique": "vital strength of the earth",
    "art": "https://spiritislandwiki.com/images/1/19/A_Year_of_Perfect_Stillness.png"
  },
  "fire in the sky": {
    "image": "https://spiritislandwiki.com/images/5/50/Fire_in_the_Sky_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "2 Fear. Add 1 Strife.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/a/ae/Fire_in_the_Sky.png"
  },
  "call to ferocity": {
    "image": "https://spiritislandwiki.com/images/0/04/Call_to_Ferocity_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with 1 or more Invaders",
    "effect": "Gather up to 3 Dahan. If target land has Dahan, 1 Fear and Push 1 Explorer and 1 Town.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/5/52/Call_to_Ferocity.png"
  },
  "voracious growth": {
    "image": "https://spiritislandwiki.com/images/7/7c/Voracious_Growth_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Jungle or Wetland",
    "effect": "2 Damage. Remove 1 Blight.",
    "threshhold": null,
    "artist": "Cari Corene",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/5/52/Voracious_Growth.png"
  },
  "shape the self anew": {
    "image": "https://spiritislandwiki.com/images/2/24/Shape_the_Self_Anew_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m"
    ],
    "speed": "slow",
    "range": null,
    "target": "Yourself",
    "effect": "Gain a Minor Power. You may Forget this Power Card to gain 3 Energy.",
    "threshhold": {
      "elements": {
        "m": 4
      },
      "ability": "You may gain a Major Power instead of a Minor Power."
    },
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "starlight seeks its form",
    "art": "https://spiritislandwiki.com/images/3/34/Shape_the_Self_Anew.png"
  },
  "dissolving vapors": {
    "image": "https://spiritislandwiki.com/images/4/40/Dissolving_Vapors_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "1 Fear. 1 Damage to each Invader. 1 Damage to each Dahan.",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "shroud of silent mist",
    "art": "https://spiritislandwiki.com/images/d/d0/Dissolving_Vapors.png"
  },
  "dread apparitions": {
    "image": "https://spiritislandwiki.com/images/1/11/Dread_Apparitions_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Land with 1 or more Invaders",
    "effect": "When Powers generate Fear in target land, Defend 1 per Fear. 1 Fear. (Fear from To Dream a Thousand Deaths counts. Fear from Destroying Towns/Cities does not.) ",
    "threshhold": null,
    "artist": "Shane Tyree",
    "status": "active",
    "from": null,
    "unique": "bringer of dreams and nightmares",
    "art": "https://spiritislandwiki.com/images/c/c6/Dread_Apparitions.png"
  },
  "talons of lightning": {
    "image": "https://spiritislandwiki.com/images/a/aa/Talons_of_Lightning_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 6,
    "elements": [
      "f",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Mountain or Wetland",
    "effect": "3 Fear. 5 Damage.",
    "threshhold": {
      "elements": {
        "f": 3,
        "a": 3
      },
      "ability": "Destroy 1 Town in each adjacent land. Increase this Power's Range to 3."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/e/ed/Talons_of_Lightning.png"
  },
  "gift of proliferation": {
    "image": "https://spiritislandwiki.com/images/8/80/Gift_of_Proliferation_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit adds 1 Presence up to 1 Range from their Presence.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "a spread of rampant green",
    "art": "https://spiritislandwiki.com/images/1/13/Gift_of_Proliferation.png"
  },
  "raging storm": {
    "image": "https://spiritislandwiki.com/images/c/c8/Raging_Storm_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "f",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Damage to each Invader.",
    "threshhold": null,
    "artist": "Rocky Hammer",
    "status": "active",
    "from": null,
    "unique": "lightning's swift strike",
    "art": "https://spiritislandwiki.com/images/7/77/Raging_Storm.png"
  },
  "fiery vengeance": {
    "image": "https://spiritislandwiki.com/images/3/3e/Fiery_Vengeance_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "f"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": " Cost to Use: Target Spirit Removes 1 of their Destroyed Presence from the game. 1 Fear and 1 Damage in one of target Spirit's lands. (This is your Power, so Blight counts as Badlands, even if target is another Spirit.) ",
    "threshhold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "vengeance as a burning plague",
    "art": "https://spiritislandwiki.com/images/a/aa/Fiery_Vengeance.png"
  },
  "exaltation of molten stone": {
    "image": "https://spiritislandwiki.com/images/d/d2/Exaltation_of_Molten_Stone_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "e"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "Split 1 Energy per Fire you have between yourself and target Spirit, as evenly as possible. (Gained from the supply.) Target Spirit gains +1 Range with their Powers that originate from a Mountain.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "volcano looming high",
    "art": "https://spiritislandwiki.com/images/3/39/Exaltation_of_Molten_Stone.png"
  },
  "gnawing rootbiters": {
    "image": "https://spiritislandwiki.com/images/5/5e/Gnawing_Rootbiters_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Push up to 2 Towns.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/a/aa/Gnawing_Rootbiters.png"
  },
  "jagged shards push from the earth": {
    "image": "https://spiritislandwiki.com/images/7/7d/Jagged_Shards_Push_from_the_Earth_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Add 1 Badlands. Push up to 2 Dahan.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "stone's unyielding defiance",
    "art": "https://spiritislandwiki.com/images/4/4f/Jagged_Shards_Push_From_the_Earth.png"
  },
  "impersonate authority": {
    "image": "https://spiritislandwiki.com/images/3/3b/Impersonate_Authority_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Add 1 Strife.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "grinning trickster stirs up trouble",
    "art": "https://spiritislandwiki.com/images/2/20/Impersonate_Authority.png"
  },
  "boon of swarming bedevilment": {
    "image": "https://spiritislandwiki.com/images/e/e3/Boon_of_Swarming_Bedevilment_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "a",
      "w",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "For the rest of this turn, each of target Spirit's Presence grants Defend 1 in its land. Target Spirit may Push up to 1 of their Presence.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "many minds move as one",
    "art": "https://spiritislandwiki.com/images/e/e8/Boon_of_Swarming_Bedevilment.png"
  },
  "indomitable claim": {
    "image": "https://spiritislandwiki.com/images/c/ce/Indomitable_Claim_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Add 1 Presence in target land even if you normally could not due to land type. Defend 20.",
    "threshhold": {
      "elements": {
        "s": 2,
        "e": 3
      },
      "ability": "3 Fear if Invaders are present. Skip all Invader Actions. (Do not Ravage, Build, or Explore in target land.) "
    },
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/3/32/Indomitable_Claim.png"
  },
  "song of sanctity": {
    "image": "https://spiritislandwiki.com/images/a/ab/Song_of_Sanctity_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Mountain or Jungle",
    "effect": "If Explorer(s) are present, Push all Explorers. Otherwise, Remove 1 Blight.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/4/4c/Song_of_Sanctity.png"
  },
  "swallow the land-dwellers": {
    "image": "https://spiritislandwiki.com/images/7/7b/Swallow_the_Land-Dwellers_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Coastal Land",
    "effect": "Drown 1 Explorer, 1 Town, and 1 Dahan.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "ocean's hungry grasp",
    "art": "https://spiritislandwiki.com/images/2/2a/Swallow_the_Land-Dwellers.png"
  },
  "gift of constancy": {
    "image": "https://spiritislandwiki.com/images/e/e6/Gift_of_Constancy_%28base%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "e"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit gains 2 Energy. At end of turn, target Spirit may Reclaim 1 Power Card instead of discarding it. If you target another Spirit, you may also Reclaim 1 Power Card instead of discarding it.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/1/14/Gift_of_Constancy.png"
  },
  "aid from the spirit-speakers": {
    "image": "https://spiritislandwiki.com/images/c/cf/Aid_from_the_Spirit-Speakers_%28ff%29.png",
    "set": [
      "Promo Pack 2",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "f",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "For each Dahan, you may move 1 Invader/Dahan/Presence/Beasts to a land within 2 Range that has Dahan.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "finder of paths unseen",
    "art": "https://spiritislandwiki.com/images/b/b9/Aid_From_the_Spirit-Speakers.png"
  },
  "ferocious rampage": {
    "image": "https://spiritislandwiki.com/images/e/e8/Ferocious_Rampage_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "1 Fear. 3 Damage to Explorer/Town only. (+1 Damage to Explorers/Towns from your \"Territorial Aggression\" Special Rule.) ",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "devouring teeth lurk underfoot",
    "art": "https://spiritislandwiki.com/images/9/92/Ferocious_Rampage.png"
  },
  "fetid breath spreads infection": {
    "image": "https://spiritislandwiki.com/images/d/d8/Fetid_Breath_Spreads_Infection_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "a",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with 1 or more Invaders",
    "effect": "1 Fear. Add 1 Disease.",
    "threshhold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "vengeance as a burning plague",
    "art": "https://spiritislandwiki.com/images/2/2f/Fetid_Breath_Spreads_Infection.png"
  },
  "softly beckon ever inward": {
    "image": "https://spiritislandwiki.com/images/9/99/Softly_Beckon_Ever_Inward_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "a"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Inland Land",
    "effect": "Gather up to 2 Explorers. Gather up to 2 Towns. Gather up to 2 Beasts. Gather up to 2 Dahan.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "lure of the deep wilderness",
    "art": "https://spiritislandwiki.com/images/9/9e/Softly_Beckon_Ever_Inward.png"
  },
  "exaltation of the incandescent sky": {
    "image": "https://spiritislandwiki.com/images/9/99/Exaltation_of_the_Incandescent_Sky_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "major",
    "cost": 7,
    "elements": [
      "s",
      "f",
      "a",
      "w"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit may play 1 Power Card by paying its cost, make up to 2 of their Powers Fast this turn, and do 3 Damage in one of their lands. You may do likewise.",
    "threshhold": {
      "elements": {
        "s": 3,
        "f": 3,
        "a": 4,
        "w": 2
      },
      "ability": "In any 4 lands on the island, Skip 1 Invader Action. 5 Fear (total) ."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "art": null
  },
  "the fog closes in": {
    "image": "https://spiritislandwiki.com/images/d/d8/The_Fog_Closes_In_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "For each adjacent land with your Presence, 1 Damage to a different Invader. Push 2 Dahan.",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "shroud of silent mist",
    "art": "https://spiritislandwiki.com/images/1/1a/The_Fog_Closes_In.png"
  },
  "gift of living energy": {
    "image": "https://spiritislandwiki.com/images/8/85/Gift_of_Living_Energy_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "f",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit gains 1 Energy. If you have at least 2 Sacred Sites, target Spirit gains 1 Energy. If you target another Spirit, they gain 1 Energy.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/1/1a/Gift_of_Living_Energy.png"
  },
  "terrifying nightmares": {
    "image": "https://spiritislandwiki.com/images/f/f7/Terrifying_Nightmares_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "m",
      "a"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Any Land",
    "effect": "2 Fear. Push up to 4 Explorers/Towns.",
    "threshhold": {
      "elements": {
        "m": 4
      },
      "ability": "4 Fear."
    },
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/0/00/Terrifying_Nightmares.png"
  },
  "trees radiate celestial brilliance": {
    "image": "https://spiritislandwiki.com/images/6/65/Trees_Radiate_Celestial_Brilliance_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "s",
      "m",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Jungle and/or a land with no Blight",
    "effect": "3 Fear. Defend 6. This turn, Invaders in target land skip the next Build Action.",
    "threshhold": {
      "elements": {
        "s": 3,
        "m": 2,
        "p": 2
      },
      "ability": "1 Damage per Sun you have."
    },
    "artist": "Shawn Daley",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/c/c1/Trees_Radiate_Celestial_Brilliance.png"
  },
  "guide the way on feathered wings": {
    "image": "https://spiritislandwiki.com/images/f/f0/Guide_the_Way_on_Feathered_Wings_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Move 1 Beasts up to two lands. As it moves, up to 2 Dahan may move with it, for part or all of the way. (The Beasts/Dahan may move to an adjacent land and then back.) ",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "many minds move as one",
    "art": "https://spiritislandwiki.com/images/5/5a/Guide_the_Way_on_Feathered_Wings.png"
  },
  "stubborn solidity": {
    "image": "https://spiritislandwiki.com/images/2/2d/Stubborn_Solidity_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Defend 1 per Dahan. Dahan in target land cannot be changed. (When they would be Damaged, Destroyed, Removed, Replaced, or moved, instead don't.) ",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "stone's unyielding defiance",
    "art": "https://spiritislandwiki.com/images/7/73/Stubborn_Solidity.png"
  },
  "tsunami": {
    "image": "https://spiritislandwiki.com/images/2/22/Tsunami_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 6,
    "elements": [
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Coastal Land",
    "effect": "2 Fear. 8 Damage. Destroy 2 Dahan.",
    "threshhold": {
      "elements": {
        "w": 3,
        "e": 2
      },
      "ability": "In each other Coastal land on the same board: 1 Fear, 4 Damage, and Destroy 1 Dahan."
    },
    "artist": "Jason Behnke",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/c/c4/Tsunami.png"
  },
  "unbearable deluge": {
    "image": "https://spiritislandwiki.com/images/a/a2/Unbearable_Deluge_%28ff%29.png",
    "set": [
      "Promo Pack 2",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "a",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "1 Fear. Push 2 Dahan. Defend 3. If target land is a Wetland, Isolate it.",
    "threshhold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "downpour drenches the world",
    "art": "https://spiritislandwiki.com/images/6/6f/Unbearable_Deluge.png"
  },
  "eerie noises and moving trees": {
    "image": "https://spiritislandwiki.com/images/8/8a/Eerie_Noises_and_Moving_Trees_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "a",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "2 Fear. Push up to 2 Explorer/Town.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "eyes watch from the trees",
    "art": "https://spiritislandwiki.com/images/e/e9/Eerie_Noises_and_Moving_Trees.png"
  },
  "traveler's boon": {
    "image": "https://spiritislandwiki.com/images/d/df/Traveler%27s_Boon_%28ff%29.png",
    "set": [
      "Promo Pack 2",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target spirit moves up to 3 of their Presence to one of your lands. They may move up to 1 Invader, 1 Dahan and 1 Beasts along with their Presence. (Total, not for each Presence.) ",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "finder of paths unseen",
    "art": "https://spiritislandwiki.com/images/5/5c/Traveler%27s_Boon.png"
  },
  "scarred and stony land": {
    "image": "https://spiritislandwiki.com/images/b/ba/Scarred_and_Stony_Land_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with Blight",
    "effect": "2 Damage. Add 1 Badlands. Remove 1 Blight in target land from the game. (It goes to the box, not the Blight Card.) ",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "Sacred Site",
    "unique": "stone's unyielding defiance",
    "art": "https://spiritislandwiki.com/images/1/1d/Scarred_and_Stony_Land.png"
  },
  "offer passage between worlds": {
    "image": "https://spiritislandwiki.com/images/0/00/Offer_Passage_Between_Worlds_%28ff%29.png",
    "set": [
      "Promo Pack 2",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Move up to 4 Dahan between target land and one of your lands. The next time Dahan would be Destroyed in target land, Destroy 2 fewer Dahan.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "finder of paths unseen",
    "art": "https://spiritislandwiki.com/images/b/bb/Offer_Passage_Between_Worlds.png"
  },
  "paths tied by nature": {
    "image": "https://spiritislandwiki.com/images/b/b9/Paths_Tied_by_Nature_%28ff%29.png",
    "set": [
      "Promo Pack 2",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "a",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Move up to 2 Invaders/Dahan/Presence/Beasts to a land within 2 Range that has the same terrain.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "finder of paths unseen",
    "art": "https://spiritislandwiki.com/images/9/98/Paths_Tied_by_Nature.png"
  },
  "boon of reimagining": {
    "image": "https://spiritislandwiki.com/images/d/d6/Boon_of_Reimagining_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit may Forget a Power Card from hand or discard to draw 6 Minor Power Cards and gain 2 of them. If you target another Spirit, they gain 1 Energy.",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "starlight seeks its form",
    "art": "https://spiritislandwiki.com/images/6/61/Boon_of_Reimagining.png"
  },
  "tempest of leaves and branches": {
    "image": "https://spiritislandwiki.com/images/0/05/Tempest_of_Leaves_and_Branches_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "a",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Choose up to 5 different Invaders (in target land). 1 Damage to each of them.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": "Sacred Site",
    "unique": "sun-bright whirlwind",
    "art": "https://spiritislandwiki.com/images/7/7b/Tempest_of_Leaves_and_Branches.png"
  },
  "pursue with scratches, pecks, and stings": {
    "image": "https://spiritislandwiki.com/images/7/7e/Pursue_with_Scratches%2C_Pecks%2C_and_Stings_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "f",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Land with 1 or more Beasts tokens",
    "effect": "1 Fear. For each Beasts past the first, Push 1 Explorer/Town.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "many minds move as one",
    "art": "https://spiritislandwiki.com/images/b/b7/Pursue_With_Scratches%2C_Pecks%2C_and_Stings.png"
  },
  "gift of abundance": {
    "image": "https://spiritislandwiki.com/images/0/04/Gift_of_Abundance_%28ff%29.png",
    "set": [
      "Promo Pack 2",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "a",
      "w",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit either gains 2 Energy, or may Repeat one Power Card this turn by paying its cost. Either you or target Spirit may add 1 Destroyed Presence to a Wetland where you have Presence.",
    "threshhold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "downpour drenches the world",
    "art": "https://spiritislandwiki.com/images/7/70/Gift_of_Abundance.png"
  },
  "rain of ash": {
    "image": "https://spiritislandwiki.com/images/8/83/Rain_of_Ash_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "a",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "2 Fear if Invaders are present. Push 2 Dahan and 2 Explorers/Towns to land(s) without your Presence.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "volcano looming high",
    "art": "https://spiritislandwiki.com/images/4/4b/Rain_of_Ash.png"
  },
  "intractable thickets and thorns": {
    "image": "https://spiritislandwiki.com/images/9/92/Intractable_Thickets_and_Thorns_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "w",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Fear. Defend 5.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "fathomless mud of the swamp",
    "art": "https://spiritislandwiki.com/images/8/86/Intractable_Thickets_and_Thorns.png"
  },
  "the wounded wild turns on its assailants": {
    "image": "https://spiritislandwiki.com/images/2/26/The_Wounded_Wild_Turns_on_its_Assailants_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "f",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with Blight",
    "effect": "Add 2 Badlands. Gather up to 2 Beasts. 1 Damage per Blight/Beasts/Wilds.",
    "threshhold": {
      "elements": {
        "f": 2,
        "p": 3,
        "n": 2
      },
      "ability": "2 Fear per Invader Destroyed by the Power (max. 8 Fear)."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/4/4a/The_Wounded_Wild_Turns_on_Its_Assailants.png"
  },
  "mysterious abductions": {
    "image": "https://spiritislandwiki.com/images/6/66/Mysterious_Abductions_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "p"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "1 Fear. 1 Damage.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "eyes watch from the trees",
    "art": "https://spiritislandwiki.com/images/c/ce/Mysterious_Abductions.png"
  },
  "ever-multiplying swarm": {
    "image": "https://spiritislandwiki.com/images/5/51/Ever-Multiplying_Swarm_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "Add 2 Beasts.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "many minds move as one",
    "art": "https://spiritislandwiki.com/images/3/35/Ever-Multiplying_Swarm.png"
  },
  "solidify echoes of majesty past": {
    "image": "https://spiritislandwiki.com/images/5/53/Solidify_Echoes_of_Majesty_Past_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "m",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Choose one of target Spirit's lands. In that land and each adjacent land, Defend 3. They Add 1 Destroyed Presence to each adjacent land. Skip up to 1 Invader Action at each added Destroyed Presence.",
    "threshhold": {
      "elements": {
        "s": 2,
        "m": 2,
        "e": 2
      },
      "ability": "Target Spirit either Reclaims1 Power Card or re-gains 1 Unique Power they previously forgot. They may play it by paying its cost."
    },
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "art": null
  },
  "roiling bog and snagging thorn": {
    "image": "https://spiritislandwiki.com/images/7/73/Roiling_Bog_and_Snagging_Thorn_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "m",
      "f",
      "w",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Fear. Isolate. Defend 2. 1 Dahan does not participate in Ravage. (Check when ravaging; it does not take Damage and does not counterattack.) ",
    "threshhold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": "Sacred Site",
    "art": null
  },
  "emerge from the dread night wind": {
    "image": "https://spiritislandwiki.com/images/5/56/Emerge_from_the_Dread_Night_Wind_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Land",
    "effect": "Add/Move your Incarna to target land. 1 Fear. If exactly 1 Invader is present, Abduct it. Otherwise, Push up to 2 Explorers/Towns to different lands.",
    "threshhold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "breath of darkness down your spine",
    "art": null
  },
  "gift of the sunlit air": {
    "image": "https://spiritislandwiki.com/images/0/02/Gift_of_the_Sunlit_Air_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit gets RangePlus1 with all their Powers. If you target another Spirit, they gain 1 Energy.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "sun-bright whirlwind",
    "art": "https://spiritislandwiki.com/images/e/e1/Gift_of_the_Sunlit_Air.png"
  },
  "sweltering exhaustion": {
    "image": "https://spiritislandwiki.com/images/4/4a/Sweltering_Exhaustion_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "a"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Any Land",
    "effect": "1 Fear. Skip up to 1 Ravage/Build Action.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": "Sacred Site",
    "unique": "rising heat of stone and sand",
    "art": "https://spiritislandwiki.com/images/f/fe/Sweltering_Exhaustion.png"
  },
  "mark territory with scars and teeth": {
    "image": "https://spiritislandwiki.com/images/3/3c/Mark_Territory_with_Scars_and_Teeth_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "Defend 9. 2 Fear if Invaders are present. Push 2 Dahan.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "devouring teeth lurk underfoot",
    "art": "https://spiritislandwiki.com/images/3/30/Mark_Territory_with_Scars_and_Teeth.png"
  },
  "unearth a beast of wrathful stone": {
    "image": "https://spiritislandwiki.com/images/a/a6/Unearth_a_Beast_of_Wrathful_Stone_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "major",
    "cost": 5,
    "elements": [
      "m",
      "f",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Land with 1 or more Invaders",
    "effect": "After the next Invader Phase (on any turn) with no Ravage/Build Actions in target land: 3 Fear. 12 Damage. Add 1 Beasts. You may Push that Beasts. 1 Fear and 2 Damage in its land.",
    "threshhold": {
      "elements": {
        "m": 2,
        "e": 3,
        "n": 3
      },
      "ability": "Mark it (Marked Beasts). Marked Beasts can't leave the island. Each Slow Phase: You may Push Marked Beasts. 1 Fear and 2 Damage at Marked Beasts."
    },
    "artist": "David Markiwsky",
    "status": "active",
    "from": "Sacred Site",
    "art": null
  },
  "radiating tremors": {
    "image": "https://spiritislandwiki.com/images/7/7a/Radiating_Tremors_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "2 Damage. You may Push any number of Quake, dividing them as evenly as possible between adjacent lands.",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "dances up earthquakes",
    "art": null
  },
  "plague ships sail to distant ports": {
    "image": "https://spiritislandwiki.com/images/e/ea/Plague_Ships_Sail_to_Distant_Ports_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "f",
      "a",
      "w",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Coastal City",
    "effect": "1 Fear. Add 4 Disease among Coastal lands (on any boards) other than target land.",
    "threshhold": {
      "elements": {
        "f": 2,
        "w": 2,
        "n": 2
      },
      "ability": "Instead: 1 Fear. 3 Damage. Spirits may jointly spend 3 Energy per player (aided by removing Disease from the island for 3 Energy each) to remove the top card of the Fear Deck from the game. Add 1 Disease."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "art": null
  },
  "belligerent and aggressive crops": {
    "image": "https://spiritislandwiki.com/images/5/58/Tangles_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "p"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Land with 1 or more Towns and/or Cities",
    "effect": "Add 1 Wilds . 1 Damage, to Towns / Cities only. If there are any adjacent Wilds : 1 Fear . 1 Damage, to Towns / Cities only.",
    "threshhold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": "Sacred Site",
    "unique": "a spread of rampant green",
    "art": null
  },
  "inspire the release of stolen lands": {
    "image": "https://spiritislandwiki.com/images/5/53/Inspire_the_Release_of_Stolen_Lands_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "w",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Land with no Blight",
    "effect": "Gather up to 3 Dahan. Remove up to 3 Health worth of Invaders per Dahan.",
    "threshhold": {
      "elements": {
        "s": 3,
        "w": 3,
        "n": 2
      },
      "ability": "This Power can target lands with Blight. If Dahan are present, Remove 1 Blight from target land, then Remove 1 Explorer, 1 Town, and 1 City from a land within 1 Range (of target land) ."
    },
    "artist": "Agnieszka Dabrowiecka",
    "status": "active",
    "from": null,
    "art": null
  },
  "a circuitous and wending journey": {
    "image": "https://spiritislandwiki.com/images/1/1a/A_Circuitous_and_Wending_Journey_%28ff%29.png",
    "set": [
      "Promo Pack 2",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "Push up to half (round up) of Invaders from target land. Do likewise (separately) for Dahan, Presence, and Beasts.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "finder of paths unseen",
    "art": "https://spiritislandwiki.com/images/2/28/A_Circuitous_and_Wending_Journey.png"
  },
  "rumbling earthquakes": {
    "image": "https://spiritislandwiki.com/images/4/48/Rumbling_Earthquakes_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "major",
    "cost": 6,
    "elements": [
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "This Power ignores Health bonuses. 3 Fear. 6 Damage, to Towns/Cities only. 6 Damage among adjacent lands, to Towns/Cities only.",
    "threshhold": {
      "elements": {
        "e": 4
      },
      "ability": "6 Damage among target/adjacent lands, to Towns/Cities only."
    },
    "artist": "Emily Hancock",
    "status": "active",
    "from": "Sacred Site",
    "art": null
  },
  "rumblings portend a greater quake": {
    "image": "https://spiritislandwiki.com/images/1/1e/Rumblings_Portend_a_Greater_Quake_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "If you have at least as many Impending Cards as Power Cards in play, 1 Fear and Add 1 Quake. Push up to 3 Dahan.",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "dances up earthquakes",
    "art": null
  },
  "inspire a winding dance": {
    "image": "https://spiritislandwiki.com/images/d/d1/Inspire_a_Winding_Dance_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "w",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with 1 or more Invaders",
    "effect": "Push up to 1 Explorer / Town. Gather up to 1 Dahan.",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "dances up earthquakes",
    "art": null
  },
  "exaltation of grasping roots": {
    "image": "https://spiritislandwiki.com/images/7/7b/Exaltation_of_Grasping_Roots_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "f",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit may Add 1 Wilds in one of their lands. You may do likewise.",
    "threshhold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "ember-eyed behemoth",
    "art": null
  },
  "coordinated raid": {
    "image": "https://spiritislandwiki.com/images/f/fc/Coordinated_Raid_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Land",
    "effect": "1 Damage. If Dahan are Present, 1 Damage.",
    "threshhold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": null,
    "unique": "hearth-vigil",
    "art": null
  },
  "exaltation of echoed steps": {
    "image": "https://spiritislandwiki.com/images/d/d7/Exaltation_of_Echoed_Steps_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "w",
      "e"
    ],
    "speed": "slow",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit may Push 1 Presence, Bringing up to 1 Explorer/Town/Dahan. You may do likewise.",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "dances up earthquakes",
    "art": null
  },
  "resounding footfalls sow dismay": {
    "image": "https://spiritislandwiki.com/images/c/c5/Resounding_Footfalls_Sow_Dismay_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "f",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "1 Fear. Add 1 Quake. Skip all Ravage Actions.",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "dances up earthquakes",
    "art": null
  },
  "smite the land with fulmination": {
    "image": "https://spiritislandwiki.com/images/1/1c/Sparking_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Damage. Add 1 Badlands .",
    "threshhold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "lightning's swift strike",
    "art": null
  },
  "unbearable gaze": {
    "image": "https://spiritislandwiki.com/images/c/cb/Unbearable_Gaze_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "f"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Fear. Push 2 Explorers/Towns from origin or target land (or 1 Explorer/Town from each).",
    "threshhold": null,
    "artist": "Agnieszka Dabrowiecka",
    "status": "active",
    "from": "Sacred Site",
    "unique": "relentless gaze of the sun",
    "art": null
  },
  "gift of seismic energy": {
    "image": "https://spiritislandwiki.com/images/9/97/Gift_of_Seismic_Energy_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "s",
      "f",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "If you target yourself, gain 3 energy. Otherwise, target spirit gains 1 Energy per Power Card you have in play (max.6). (Don't count Impendingcard.)",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "dances up earthquakes",
    "art": null
  },
  "surrounded by the dahan": {
    "image": "https://spiritislandwiki.com/images/2/23/Surrounded_by_the_Dahan_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Land with Dahan",
    "effect": "2 Fear if Invaders are present. 1 Fear if Dahan outnumber Towns/Cities. Isolate target land.",
    "threshhold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": null,
    "unique": "hearth-vigil",
    "art": null
  },
  "boon of corrupted blood": {
    "image": "https://spiritislandwiki.com/images/7/7e/Boon_of_Corrupted_Blood_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "1 Damage in one of target Spirit's lands. If you target another Spirit, in that land also: Destory 1 of their Presence. 1 Damage. Gather 1 Beasts.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "wounded waters bleeding",
    "art": null
  },
  "boon of resilient power": {
    "image": "https://spiritislandwiki.com/images/c/c8/Boon_of_Resilient_Power_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit may Add 1 Destroyed Presence to one of your lands. If you target yourself, gain a Major Power. Otherwise, target Spirit gains a Power Card.",
    "threshhold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": null,
    "unique": "towering roots of the jungle",
    "art": null
  },
  "call to vigilance": {
    "image": "https://spiritislandwiki.com/images/6/60/Call_to_Vigilance_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Land",
    "effect": "2 Fear if Invaders are present. For each Dahan in origin land, Push up to 1 Explorer/Town.",
    "threshhold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": null,
    "unique": "hearth-vigil",
    "art": null
  },
  "wrack with pain and grief": {
    "image": "https://spiritislandwiki.com/images/f/f1/Wrack_with_Pain_and_Grief_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "w",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": null,
    "target": "Land with 1 or more Invaders",
    "effect": "2 Fear. Push 1 Explorer and 1 Town.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "wounded waters bleeding",
    "art": null
  },
  "terrifying rampage": {
    "image": "https://spiritislandwiki.com/images/e/e5/Terrifying_Rampage_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Fear. 2 Invaders don't participate in Ravage. (Choose when ravaging; they don't do Damage or take counterattack Damage.) Push 3 Dahan.",
    "threshhold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "ember-eyed behemoth",
    "art": null
  },
  "foul vapors and fetid muck": {
    "image": "https://spiritislandwiki.com/images/9/91/Foul_Vapors_and_Fetid_Muck_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "f",
      "a",
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Land with 1 or more Invaders",
    "effect": "1 Fear. Push up to 2 Explorer.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "Sacred Site",
    "unique": "fathomless mud of the swamp",
    "art": "https://spiritislandwiki.com/images/6/60/Foul_Vapors_and_Fetid_Muck.png"
  },
  "growth through sacrifice": {
    "image": "https://spiritislandwiki.com/images/9/97/Growth_Through_Sacrifice_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "m",
      "f",
      "w",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Destroy 1 of your Presence. Target Spirit chooses to either: Remove 1 Blight from one of their lands. Add 1 Presence to one of their lands.",
    "threshhold": {
      "elements": {
        "s": 2
      },
      "ability": "They may do both, in the same land."
    },
    "artist": "Lucas Durham",
    "status": "replaced",
    "from": null,
    "art": "https://spiritislandwiki.com/images/c/c1/Growth_Through_Sacrifice.png"
  },
  "swallowed by the endless dark": {
    "image": "https://spiritislandwiki.com/images/7/77/Swallowed_by_the_Endless_Dark_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Land with 1 or more Invaders",
    "effect": "2 Fear. Abduct 1 Explorer.",
    "threshhold": {
      "elements": {
        "m": 3,
        "a": 3
      },
      "ability": "Abduct 1 Invader."
    },
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "breath of darkness down your spine",
    "art": null
  },
  "terror of the hunted": {
    "image": "https://spiritislandwiki.com/images/9/91/Terror_of_the_Hunted_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "If Beasts are present, 1 Fear and Add 1 Strife. Add 1 Strife per Terror Level. If target land is the Endless Dark, Add 1 Strife. (Strife only escapes with the Invader it's attached to.)",
    "threshhold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "breath of darkness down your spine",
    "art": null
  },
  "blooming of the rocks and trees": {
    "image": "https://spiritislandwiki.com/images/f/fa/Blooming_of_the_Rocks_and_Trees_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "a",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "If no Blight is Present, Add 1 Vitality. If no Invaders are Present, Add 1 Strife.",
    "threshhold": {
      "elements": {
        "p": 3
      },
      "ability": "You may do both."
    },
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": "Sacred Site",
    "unique": "towering roots of the jungle",
    "art": null
  },
  "turmoil's touch": {
    "image": "https://spiritislandwiki.com/images/2/23/Turmoil%27s_Touch_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "m",
      "a",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit may either pay 1 Energy or discard a Power Card (from hand) to Take a Minor Power into their discard. You may do likewise.",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "wandering voice keens delirium",
    "art": null
  },
  "favors of story and season": {
    "image": "https://spiritislandwiki.com/images/5/5f/Favors_of_Story_and_Season_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "e",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit may Gather up to 3 Dahan into one of their lands. If they have at least 3 Dahan among their lands, they gain 1 Energy and may Reclaim 1 Power Card instead of discarding it at end of turn.",
    "threshhold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": null,
    "unique": "hearth-vigil",
    "art": null
  },
  "twist perceptions": {
    "image": "https://spiritislandwiki.com/images/9/9d/Twist_Perceptions_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with 1 or more Invaders",
    "effect": "Add 1 Strife. You may Push the Invader you added Strife to. (If you add Strife to Explorers/Towns, you can push that Invader first with Senseless Roaming before pushing it with this Power.)",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "wandering voice keens delirium",
    "art": null
  },
  "the land thrashes in furious pain": {
    "image": "https://spiritislandwiki.com/images/e/eb/The_Land_Thrashes_in_Furious_Pain_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "m",
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Land with Dahan",
    "effect": "2 Damage per Blight. For each Blight in adjacent lands, 1 Damage (in target land) .",
    "threshhold": {
      "elements": {
        "m": 3,
        "e": 3
      },
      "ability": "Repeat this Power in an adjacent land (ignoring Range and Target restrictions) ."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/f/ff/The_Land_Thrashes_in_Furious_Pain.png"
  },
  "the jungle hungers": {
    "image": "https://spiritislandwiki.com/images/e/e1/The_Jungle_Hungers_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "m",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Destroy all Explorers and all Towns. Destroy all Dahan.",
    "threshhold": {
      "elements": {
        "m": 2,
        "p": 3
      },
      "ability": "Destroy 1 City. Do not Destroy any Dahan."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Jungle",
    "art": "https://spiritislandwiki.com/images/9/9b/The_Jungle_Hungers.png"
  },
  "radiant and hallowed grove": {
    "image": "https://spiritislandwiki.com/images/b/bb/Radiant_and_Hallowed_Grove_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "m",
      "f",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "Land with",
    "effect": "2 Fear if Invaders are present or adjacent. In both target and one adjacent land, you may Remove an Invader with Health less than or equal to the Terror Level. (Damage doesn't reduce Health.)",
    "threshhold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": null,
    "unique": "towering roots of the jungle",
    "art": null
  },
  "fields choked with growth": {
    "image": "https://spiritislandwiki.com/images/3/39/Fields_Choked_with_Growth_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Push 1 Town. Push 3 Dahan.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "a spread of rampant green",
    "art": "https://spiritislandwiki.com/images/f/f6/Fields_Choked_With_Growth.png"
  },
  "exaltation of tangled growth": {
    "image": "https://spiritislandwiki.com/images/9/97/Exaltation_of_Tangled_Growth_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "w",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit may pay 1 Energy to gain a Power Card. You may pay 2 Energy to gain a Power Card.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "fathomless mud of the swamp",
    "art": "https://spiritislandwiki.com/images/8/87/Exaltation_of_Tangled_Growth.png"
  },
  "river's bounty": {
    "image": "https://spiritislandwiki.com/images/2/27/River%27s_Bounty_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "Gather up to 2 Dahan. If there are now at least 2 Dahan, add 1 Dahan and gain 1 Energy.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "river surges in sunlight",
    "art": "https://spiritislandwiki.com/images/4/4f/River%27s_Bounty.png"
  },
  "portents of disaster": {
    "image": "https://spiritislandwiki.com/images/e/e5/Portents_of_Disaster_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "m",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Land with 1 or more Invaders",
    "effect": "2 Fear. The next time an Invader is Destroyed in target land this turn, 1 Fear.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/b/b0/Portents_of_Disaster.png"
  },
  "smothering infestation": {
    "image": "https://spiritislandwiki.com/images/a/a8/Smothering_Infestation_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "Add 1 Disease. If target land is a Jungle or Wetland, 2 Fear and 3 Damage.",
    "threshhold": {
      "elements": {
        "w": 2,
        "p": 2
      },
      "ability": "1 Damage to each Invader."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/7/79/Smothering_Infestation.png"
  },
  "shadows of the burning forest": {
    "image": "https://spiritislandwiki.com/images/f/f8/Shadows_of_the_Burning_Forest_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "m",
      "f",
      "p"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Land with 1 or more Invaders",
    "effect": "2 Fear. If target land is a Mountain or Jungle, Push 1 Explorer and 1 Town.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/d/d3/Shadows_of_the_Burning_Forest.png"
  },
  "regrow from roots": {
    "image": "https://spiritislandwiki.com/images/f/f4/Regrow_from_Roots_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "w",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Jungle or Wetland",
    "effect": "If there are 2 Blight or fewer in target land, Remove 1 Blight.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "keeper of the forbidden wilds",
    "art": "https://spiritislandwiki.com/images/d/d1/Regrow_From_Roots.png"
  },
  "bloodwrack plague": {
    "image": "https://spiritislandwiki.com/images/7/73/Bloodwrack_Plague_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "w",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Add 2 Disease. For each Disease in target land, Defend 1 in target and all adjacent lands.",
    "threshhold": {
      "elements": {
        "e": 2,
        "n": 4
      },
      "ability": "2 Fear. For each Disease in target land, do 1 Damage in target or an adjacent land."
    },
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/d/db/Bloodwrack_Plague.png"
  },
  "cleansing floods": {
    "image": "https://spiritislandwiki.com/images/1/12/Cleansing_Floods_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 5,
    "elements": [
      "s",
      "w"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "4 Damage. Remove 1 Blight.",
    "threshhold": {
      "elements": {
        "w": 4
      },
      "ability": "10 Damage."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "Wetland",
    "art": "https://spiritislandwiki.com/images/a/ae/Cleansing_Floods.png"
  },
  "bargain of coursing paths": {
    "image": "https://spiritislandwiki.com/images/a/aa/Bargain_of_Coursing_Paths_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "major",
    "cost": 2,
    "elements": [
      "m",
      "a",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Land with 2 or more Dahan",
    "effect": " Bargain: 1 Presence now and -1 Energy/turn. Now: Mark both target land and another land with 2 or more Dahan. Ongoing: After pieces are added or moved into the marked lands: choose any land, then Move those pieces directly to that land.",
    "threshhold": {
      "elements": {
        "a": 3,
        "w": 2,
        "e": 2
      },
      "ability": "The Presence comes from your Presence tracks."
    },
    "artist": "Agnieszka Dabrowiecka",
    "status": "active",
    "from": null,
    "art": null
  },
  "overgrow in a night": {
    "image": "https://spiritislandwiki.com/images/7/76/Overgrow_in_a_Night_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Add 1 Presence. If target land has your Presence and Invaders, 3 Fear.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "a spread of rampant green",
    "art": "https://spiritislandwiki.com/images/d/d9/Overgrow_in_a_Night.png"
  },
  "here there be monsters": {
    "image": "https://spiritislandwiki.com/images/3/39/Here_There_Be_Monsters_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Inland Land",
    "effect": "You may Push 1 Explorer/Town/Dahan. 2 Fear. If target land has any Beasts, 1 Fear.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/d/df/Here_There_Be_Monsters.png"
  },
  "death falls gently from open blossoms": {
    "image": "https://spiritislandwiki.com/images/e/e3/Death_Falls_Gently_from_Open_Blossoms_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "m",
      "a",
      "p"
    ],
    "speed": "slow",
    "range": 3,
    "target": "Jungle or Sands",
    "effect": "4 Damage. If any Invaders remain, add 1 Disease.",
    "threshhold": {
      "elements": {
        "a": 3,
        "p": 3
      },
      "ability": "3 Fear. Add 1 Disease to 2 adjacent lands with Invaders."
    },
    "artist": "Graham Stermberg",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/b/ba/Death_Falls_Gently_From_Open_Blossoms.png"
  },
  "grant hatred a ravenous form": {
    "image": "https://spiritislandwiki.com/images/3/31/Grant_Hatred_a_Ravenous_Form_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "m",
      "f"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "For each Strife/Blight in target land, 1 Fear and 2 Damage. If this Destroys all invaders in target land, add 1 Beasts.",
    "threshhold": {
      "elements": {
        "m": 4,
        "f": 2
      },
      "ability": "Add 1 Strife in up to 3 adjacent lands."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/3/38/Grant_Hatred_a_Ravenous_Form.png"
  },
  "tigers hunting": {
    "image": "https://spiritislandwiki.com/images/d/d9/Tigers_Hunting_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 2,
    "elements": [
      "s",
      "m",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Land with no Blight",
    "effect": "2 Fear. Add 1 Beasts. Gather up to 1 Beasts. 1 Damage per Beasts. Push up to 2 Beasts.",
    "threshhold": {
      "elements": {
        "s": 2,
        "m": 2,
        "n": 3
      },
      "ability": "1 Damage in an adjacent land without Blight, and +1 Damage per Beasts there."
    },
    "artist": "Cari Corene",
    "status": "active",
    "from": "Jungle",
    "art": "https://spiritislandwiki.com/images/8/84/Tigers_Hunting.png"
  },
  "flow like water, reach like air": {
    "image": "https://spiritislandwiki.com/images/b/bd/Flow_like_Water%2C_Reach_like_Air_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 2,
    "elements": [
      "a",
      "w"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit gets +2 Range with all Powers. Target Spirit may Push 1 of their Presence to an adjacent land, bringing up to 2 Explorers, 2 Towns and 2 Dahan along with it.",
    "threshhold": {
      "elements": {
        "a": 2,
        "w": 2
      },
      "ability": "The moved Presence may also bring along up to 2 Cities and up to 2 Blight."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/3/35/Flow_Like_Water%2C_Reach_Like_Air.png"
  },
  "draw to the water's edge": {
    "image": "https://spiritislandwiki.com/images/1/10/Draw_to_the_Water%27s_Edge_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "w",
      "p"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "Gather up to 2 Towns from a single land.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "wounded waters bleeding",
    "art": null
  },
  "fleshrot fever": {
    "image": "https://spiritislandwiki.com/images/f/f5/Fleshrot_Fever_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "f",
      "a",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Jungle or Sands",
    "effect": "1 Fear. Add 1 Disease.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/c/c6/Fleshrot_Fever.png"
  },
  "mists of oblivion": {
    "image": "https://spiritislandwiki.com/images/7/7e/Mists_of_Oblivion_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 3,
    "target": "Any Land",
    "effect": "1 Fear per Town/City this Power Destroys (max. 4 Fear). 1 Damage to each Invader.",
    "threshhold": {
      "elements": {
        "m": 2,
        "a": 3,
        "w": 2
      },
      "ability": "3 Damage."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/7/76/Mists_of_Oblivion.png"
  },
  "favors called due": {
    "image": "https://spiritislandwiki.com/images/a/af/Favors_Called_Due_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Gather up to 4 Dahan. If Invaders are present and Dahan now outnumber them, 3 Fear.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "shadows flicker like flame",
    "art": "https://spiritislandwiki.com/images/a/ae/Favors_Called_Due.png"
  },
  "cycles of time and tide": {
    "image": "https://spiritislandwiki.com/images/e/e5/Cycles_of_Time_and_Tide_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "w"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Coastal Land",
    "effect": "If there are Dahan, add 1 Dahan. If there are no Dahan, Remove 1 Blight.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/b/bf/Cycles_of_Time_and_Tide.png"
  },
  "too near the jungle": {
    "image": "https://spiritislandwiki.com/images/8/82/Too_Near_the_Jungle_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Fear. Destroy 1 Explorer.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "Jungle",
    "unique": "sharp fangs behind the leaves",
    "art": "https://spiritislandwiki.com/images/d/d1/Too_Near_the_Jungle.png"
  },
  "draw of the fruitful earth": {
    "image": "https://spiritislandwiki.com/images/9/9f/Draw_of_the_Fruitful_Earth_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "e",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Gather up to 2 Explorers . Gather up to 2 Dahan .",
    "threshhold": null,
    "artist": "Sydni Kruger",
    "status": "active",
    "from": null,
    "unique": "vital strength of the earth",
    "art": "https://spiritislandwiki.com/images/6/60/Draw_of_the_Fruitful_Earth.png"
  },
  "shatter homesteads": {
    "image": "https://spiritislandwiki.com/images/5/5d/Shatter_Homesteads_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "a"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "1 Fear. Destroy 1 Town.",
    "threshhold": null,
    "artist": "Rocky Hammer",
    "status": "active",
    "from": "Sacred Site",
    "unique": "lightning's swift strike",
    "art": "https://spiritislandwiki.com/images/e/e2/Shatter_Homesteads.png"
  },
  "guard the healing land": {
    "image": "https://spiritislandwiki.com/images/5/53/Guard_the_Healing_Land_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "w",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Remove 1 Blight. Defend 4.",
    "threshhold": null,
    "artist": "Sydni Kruger",
    "status": "active",
    "from": "Sacred Site",
    "unique": "vital strength of the earth",
    "art": "https://spiritislandwiki.com/images/b/b3/Guard_the_Healing_Land.png"
  },
  "savage transformation": {
    "image": "https://spiritislandwiki.com/images/e/e4/Savage_Transformation_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 2,
    "elements": [
      "m",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "2 Fear. Replace 1 Explorer with 1 Beasts.",
    "threshhold": {
      "elements": {
        "m": 2,
        "n": 3
      },
      "ability": "Replace 1 additional Explorer with 1 Beasts in either target or adjacent land."
    },
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/5/5f/Savage_Transformation.png"
  },
  "twilight fog brings madness": {
    "image": "https://spiritislandwiki.com/images/0/06/Twilight_Fog_Brings_Madness_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "m",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Add 1 Strife. Push 1 Dahan. Each remaining Dahan takes 1 Damage.",
    "threshhold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/a/ad/Twilight_Fog_Brings_Madness.png"
  },
  "elemental aegis": {
    "image": "https://spiritislandwiki.com/images/d/d9/Elemental_Aegis_%28ff%29.png",
    "set": [
      "Promo Pack 1",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "Defend 2 in target land and all adjacent lands. For every Presence on your \"Deep Slumber\" track, Defend 1 in target land and all adjacent lands.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "serpent slumbering beneath the island",
    "art": "https://spiritislandwiki.com/images/f/f3/Elemental_Aegis.png"
  },
  "poisoned dew": {
    "image": "https://spiritislandwiki.com/images/f/f1/Poisoned_Dew_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "f",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Destroy 1 Explorer. If target land is a Jungle or a Wetland, Destroy all Explorer.",
    "threshhold": null,
    "artist": "Cari Corene",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/b/b7/Poisoned_Dew.png"
  },
  "predatory nightmares": {
    "image": "https://spiritislandwiki.com/images/8/8e/Predatory_Nightmares_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "f",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with 1 or more Invaders",
    "effect": "2 Damage. Push up to 2 Dahan. (When your Powers would Destroy Invaders, instead they generate Fear and/or Push those Invaders.) ",
    "threshhold": null,
    "artist": "Shane Tyree",
    "status": "active",
    "from": "Sacred Site",
    "unique": "bringer of dreams and nightmares",
    "art": "https://spiritislandwiki.com/images/f/fa/Predatory_Nightmares.png"
  },
  "sacrosanct wilderness": {
    "image": "https://spiritislandwiki.com/images/e/eb/Sacrosanct_Wilderness_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Land with no Blight",
    "effect": "Push 2 Dahan. 2 Damage per Wilds in target land. Add 1 Wilds.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "keeper of the forbidden wilds",
    "art": "https://spiritislandwiki.com/images/b/b0/Sacrosanct_Wilderness.png"
  },
  "unlock the gates of deepest power": {
    "image": "https://spiritislandwiki.com/images/0/0d/Unlock_the_Gates_of_Deepest_Power_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "m",
      "f",
      "a",
      "w",
      "e",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit gains a Major Power by drawing 2 and keeping 1, without having to Forget another Power Card.",
    "threshhold": {
      "elements": {
        "s": 2,
        "m": 2,
        "f": 2,
        "a": 2,
        "w": 2,
        "e": 2,
        "p": 2,
        "n": 2
      },
      "ability": "Target Spirit may now play the Major Power they keep by paying half its cost (round up) OR by Forgetting it at the end of turn. It gains all elemental thresholds."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/a/ad/Unlock_the_Gates_of_Deepest_Power.png"
  },
  "volcanic eruption": {
    "image": "https://spiritislandwiki.com/images/5/59/Volcanic_Eruption_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 8,
    "elements": [
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "6 Fear. 20 Damage. Destroy all Dahan and Beasts. Add 1 Blight.",
    "threshhold": {
      "elements": {
        "f": 4,
        "e": 3
      },
      "ability": "Destroy all Invaders. Add 1 Wilds. In each adjacent land: 10 Damage. Destroy all Dahan and Beasts. If there are no Blight, add 1 Blight."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "Mountain",
    "art": "https://spiritislandwiki.com/images/4/4d/Volcanic_Eruption.png"
  },
  "call to guard": {
    "image": "https://spiritislandwiki.com/images/c/ca/Call_to_Guard_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Gather up to 1 Dahan. Then, if Dahan are present, either: Defend 1 per Dahan. After Invaders are added or moved to target land, 1 Damage to each added or moved Invader.",
    "threshhold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/0/0b/Call_to_Guard.png"
  },
  "strangling firevine": {
    "image": "https://spiritislandwiki.com/images/6/6f/Strangling_Firevine_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "f",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Destroy all Explorers. Add 1 Wilds. Add 1 Wilds in the originating Sands. 1 Damage per Wilds in/adjacent to target land.",
    "threshhold": {
      "elements": {
        "f": 2,
        "p": 3
      },
      "ability": "+1 Damage per Wilds in / adjacent to target land."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "Sands",
    "art": "https://spiritislandwiki.com/images/a/ad/Strangling_Firevine.png"
  },
  "uncanny melting": {
    "image": "https://spiritislandwiki.com/images/e/ed/Uncanny_Melting_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "w"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "If Invaders are present, 1 Fear. If target land is a Sands or Wetland, Remove 1 Blight.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/a/ab/Uncanny_Melting.png"
  },
  "veil the night's hunt": {
    "image": "https://spiritislandwiki.com/images/2/26/Veil_the_Night%27s_Hunt_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Land with Dahan",
    "effect": "For each Dahan present, choose a different Invader. 1 Damage to each of those Invaders. Push up to 3 Dahan.",
    "threshhold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/1/18/Veil_the_Night%27s_Hunt.png"
  },
  "pent-up calamity": {
    "image": "https://spiritislandwiki.com/images/d/dc/Pent-Up_Calamity_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "m",
      "f",
      "e",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Any Land",
    "effect": "Add 1 Disease and 1 Strife. Remove any number of Beasts/Disease/Strife/Wilds. For each token Removed, 1 Fear and 3 Damage.",
    "threshhold": {
      "elements": {
        "m": 2,
        "f": 3
      },
      "ability": "If you have Removed tokens, return up to 2 of them. Otherwise, add 2 Strife."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/2/27/Pent-Up_Calamity.png"
  },
  "guardian serpents": {
    "image": "https://spiritislandwiki.com/images/d/dc/Guardian_Serpents_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Add 1 Beasts in one of target Spirit's lands. If target Spirit has a Sacred Site in that land: Defend 4 there.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/b/b2/Guardian_Serpents.png"
  },
  "peace of the nighttime sky": {
    "image": "https://spiritislandwiki.com/images/8/85/Peace_of_the_Nighttime_Sky_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "If the Terror Level is 1, Invaders do not Ravage in target land this turn. You may Repeat this Power. If you do, Forget this Power Card and Gain 1 Moon.",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": "Sacred Site",
    "unique": "starlight seeks its form",
    "art": "https://spiritislandwiki.com/images/8/8e/Peace_of_the_Nighttime_Sky.png"
  },
  "razor-sharp undergrowth": {
    "image": "https://spiritislandwiki.com/images/9/96/Razor-Sharp_Undergrowth_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "p"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Land with no Blight",
    "effect": "Destroy 1 Explorer and 1 Dahan. Add 1 Wilds. Defend 2.",
    "threshhold": null,
    "artist": "Cari Corene",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/0/01/Razor-Sharp_Undergrowth.png"
  },
  "gift of the primordial deeps": {
    "image": "https://spiritislandwiki.com/images/6/60/Gift_of_the_Primordial_Deeps_%28ff%29.png",
    "set": [
      "Promo Pack 1",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "e"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit gains a Minor Power. Target Spirit chooses to either: Play it immediately by paying its cost. Gain 1Moon and 1Earth.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "serpent slumbering beneath the island",
    "art": "https://spiritislandwiki.com/images/9/90/Gift_of_the_Primordial_Deeps.png"
  },
  "terrifying chase": {
    "image": "https://spiritislandwiki.com/images/d/d4/Terrifying_Chase_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "Push 2 Explorers/Towns/Dahan. Push another 2 Explorers/Towns/Dahan per Beasts in target land. If you Pushed any Invaders, 2 Fear.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "sharp fangs behind the leaves",
    "art": "https://spiritislandwiki.com/images/2/2d/Terrifying_Chase.png"
  },
  "threatening flames": {
    "image": "https://spiritislandwiki.com/images/d/d0/Threatening_Flames_%28ff%29.png",
    "set": [
      "Promo Pack 1",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "f",
      "p"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Land with 1 or more Blight and 1 or more Invaders",
    "effect": "2 Fear. Push 1 Explorer/Town per Terror Level from target land to adjacent lands without your Presence. If there are no such adjacent lands, +2 Fear.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "heart of the wildfire",
    "art": "https://spiritislandwiki.com/images/8/88/Threatening_Flames.png"
  },
  "swarming wasps": {
    "image": "https://spiritislandwiki.com/images/6/65/Swarming_Wasps_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "f",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Land with no Blight",
    "effect": "Add 1 Beasts. If target land has Beasts, Push up to 2 Explorers.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/7/7f/Swarming_Wasps.png"
  },
  "rituals of destruction": {
    "image": "https://spiritislandwiki.com/images/e/e1/Rituals_of_Destruction_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "s",
      "m",
      "f",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with Dahan",
    "effect": "2 Damage. If target land has at least 3 Dahan, +3 Damage and 2 Fear.",
    "threshhold": null,
    "artist": "Sydni Kruger",
    "status": "active",
    "from": "Sacred Site",
    "unique": "vital strength of the earth",
    "art": "https://spiritislandwiki.com/images/f/fa/Rituals_of_Destruction.png"
  },
  "tidal boon": {
    "image": "https://spiritislandwiki.com/images/9/9f/Tidal_Boon_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "w",
      "e"
    ],
    "speed": "slow",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit gains 2 Energy and may Push 1 Town and up to 2 Dahan from one of their lands. If Dahan are pushed to your Ocean, you may move them to any Coastal land instead of Drowning them.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "ocean's hungry grasp",
    "art": "https://spiritislandwiki.com/images/1/1e/Tidal_Boon.png"
  },
  "inflame the fires of life": {
    "image": "https://spiritislandwiki.com/images/e/e0/Inflame_the_Fires_of_Life_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Add 1 Disease. 1 Fear. Add 1 Strife.",
    "threshhold": {
      "elements": {
        "n": 3
      },
      "ability": "You may do both."
    },
    "artist": "Kat Birmelin",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/5/51/Inflame_the_Fires_of_Life.png"
  },
  "pillar of living flame": {
    "image": "https://spiritislandwiki.com/images/5/55/Pillar_of_Living_Flame_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 5,
    "elements": [
      "f"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "3 Fear. 5 Damage. If target land is a Jungle or Wetland, add 1 Blight.",
    "threshhold": {
      "elements": {
        "f": 4
      },
      "ability": "2 Fear and 5 Damage."
    },
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/6/6b/Pillar_of_Living_Flame.png"
  },
  "dry wood explodes in smoldering splinters": {
    "image": "https://spiritislandwiki.com/images/e/ee/Dry_Wood_Explodes_in_Smoldering_Splinters_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "f",
      "a",
      "p"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Not a Wetland",
    "effect": "You may spend 1 Energy to make this Power Fast. 2 Fear. 1 Damage.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/e/ef/Dry_Wood_Explodes_in_Smoldering_Splinters.png"
  },
  "teeth gleam from darkness": {
    "image": "https://spiritislandwiki.com/images/b/b8/Teeth_Gleam_from_Darkness_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with no Blight",
    "effect": "1 Fear. Add 1 Beasts. If target land has both Beasts and Invaders: 3 Fear.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "Jungle",
    "unique": "sharp fangs behind the leaves",
    "art": "https://spiritislandwiki.com/images/8/82/Teeth_Gleam_From_Darkness.png"
  },
  "renewing rain": {
    "image": "https://spiritislandwiki.com/images/c/ce/Renewing_Rain_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "w",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "If target land is a Jungle or Sands, Remove 1 Blight.",
    "threshhold": {
      "elements": {
        "p": 3
      },
      "ability": "Add 1 Wilds."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/2/28/Renewing_Rain.png"
  },
  "teeming rivers": {
    "image": "https://spiritislandwiki.com/images/8/8b/Teeming_Rivers_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "w",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Mountain or Wetland",
    "effect": "If target land has no Blight, add 1 Beasts. If target land has exactly 1 Blight, Remove it.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/9/98/Teeming_Rivers.png"
  },
  "flame's fury": {
    "image": "https://spiritislandwiki.com/images/7/7c/Flame%27s_Fury_%28ff%29.png",
    "set": [
      "Promo Pack 1",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "f",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit gains 1 Energy. Target Spirit does +1 Damage with each Damage dealing Power they use this turn. (Powers which Damage multiple lands or each Invader only get 1 extra Damage total. Repeated Powers keep the +1 boost. Destroy effects don't get any bonus.) ",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "heart of the wildfire",
    "art": "https://spiritislandwiki.com/images/d/d9/Flame%27s_Fury.png"
  },
  "dreams of the dahan": {
    "image": "https://spiritislandwiki.com/images/a/a6/Dreams_of_the_Dahan_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Any Land",
    "effect": "Gather up to 2 Dahan . If target land has Towns / Cities , 1 Fear for each Dahan , to a maximum of 3 Fear .",
    "threshhold": null,
    "artist": "Shane Tyree",
    "status": "active",
    "from": null,
    "unique": "bringer of dreams and nightmares",
    "art": "https://spiritislandwiki.com/images/8/80/Dreams_of_the_Dahan.png"
  },
  "manifest incarnation": {
    "image": "https://spiritislandwiki.com/images/f/f6/Manifest_Incarnation_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 6,
    "elements": [
      "s",
      "m",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Land with at least 1 City",
    "effect": "6 Fear. +1 Fear for each Town/City and for each of your Presence in target land. Remove 1 City, 1 Town and 1 Explorer. Then Invaders in target land Ravage.",
    "threshhold": {
      "elements": {
        "s": 3,
        "m": 3
      },
      "ability": "+3 Fear. Invaders do -6 Damage on their Ravage."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/c/cd/Manifest_Incarnation.png"
  },
  "elusive ambushes": {
    "image": "https://spiritislandwiki.com/images/7/72/Elusive_Ambushes_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "w"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Land with Dahan",
    "effect": "1 Damage. Defend 4.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/5/56/Elusive_Ambushes.png"
  },
  "animated wrackroot": {
    "image": "https://spiritislandwiki.com/images/a/a7/Animated_Wrackroot_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "m",
      "f",
      "p"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "1 Fear. Destroy 1 Explorer. Add 1 Wilds.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/3/37/Animated_Wrackroot.png"
  },
  "tormenting rotflies": {
    "image": "https://spiritislandwiki.com/images/c/cf/Tormenting_Rotflies_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "a",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Sands or Wetland",
    "effect": "Add 1 Disease. If target land has Invaders, 2 Fear. If Disease is present, +1 Fear. If Blight is present, +1 Fear.",
    "threshhold": null,
    "artist": "Kat Birmelin",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/9/94/Tormenting_Rotflies.png"
  },
  "disorienting landscape": {
    "image": "https://spiritislandwiki.com/images/d/d8/Disorienting_Landscape_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "p"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Any Land",
    "effect": "Push 1 Explorer . If target land is a Mountain or Jungle, add 1 Wilds .",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/8/81/Disorienting_Landscape.png"
  },
  "rain of blood": {
    "image": "https://spiritislandwiki.com/images/4/46/Rain_of_Blood_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "a",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with 1 or more Invaders",
    "effect": "2 Fear. If target land has at least 2 Towns/Cities, 1 Fear.",
    "threshhold": null,
    "artist": "Kat Birmelin",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/a/a6/Rain_of_Blood.png"
  },
  "like calls to like": {
    "image": "https://spiritislandwiki.com/images/9/92/Like_Calls_to_Like_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "If target land has Explorer, Gather up to 1 Explorer. Do likewise for Town, Dahan, Blight, and Beasts.",
    "threshhold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/4/4d/Like_Calls_to_Like.png"
  },
  "boon of growing power": {
    "image": "https://spiritislandwiki.com/images/8/89/Boon_of_Growing_Power_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit gains a Power Card. If you target another Spirit, they also gain 1 Energy.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "keeper of the forbidden wilds",
    "art": "https://spiritislandwiki.com/images/9/90/Boon_of_Growing_Power.png"
  },
  "gold's allure": {
    "image": "https://spiritislandwiki.com/images/c/c0/Gold%27s_Allure_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "f",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Mountain",
    "effect": "Gather 1 Explorer and 1 Town. Add 1 Strife.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/3/33/Gold%27s_Allure.png"
  },
  "poisoned land": {
    "image": "https://spiritislandwiki.com/images/b/ba/Poisoned_Land_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "e",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Fear. 7 Damage. Add 1 Blight. Destroy all Dahan.",
    "threshhold": {
      "elements": {
        "e": 3,
        "p": 2,
        "n": 2
      },
      "ability": "For each Blight (including the one just added) , 1 Fear and 4 Damage."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/a/aa/Poisoned_Land.png"
  },
  "pact of the joined hunt": {
    "image": "https://spiritislandwiki.com/images/e/e4/Pact_of_the_Joined_Hunt_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit Gathers 1 Dahan into one of their lands. 1 Damage in that land per Dahan present.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/d/d5/Pact_of_the_Joined_Hunt.png"
  },
  "prey on the builders": {
    "image": "https://spiritislandwiki.com/images/8/83/Prey_on_the_Builders_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "You may Gather 1 Beasts. If target land has Beasts, Invaders do not Build there this turn.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "sharp fangs behind the leaves",
    "art": "https://spiritislandwiki.com/images/f/f2/Prey_on_the_Builders.png"
  },
  "promises of protection": {
    "image": "https://spiritislandwiki.com/images/3/3f/Promises_of_Protection_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Any Land",
    "effect": "Gather up to 2 Dahan. Dahan have +2 Health while in target land.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/8/85/Promises_of_Protection.png"
  },
  "dissolve the bonds of kinship": {
    "image": "https://spiritislandwiki.com/images/6/64/Dissolve_the_Bonds_of_Kinship_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "f",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Replace 1 City with 2 Explorers. Replace 1 Town with 1 Explorer. Replace 1 Dahan with 1 Explorer. Push all Explorers from target land to as many different lands as possible.",
    "threshhold": {
      "elements": {
        "f": 2,
        "w": 2,
        "n": 3
      },
      "ability": "Before Pushing, Explorers and Towns/Cities do Damage to each other."
    },
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/5/57/Dissolve_the_Bonds_of_Kinship.png"
  },
  "swallowed by the wilderness": {
    "image": "https://spiritislandwiki.com/images/2/2d/Swallowed_by_the_Wilderness_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "a",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Inland Land",
    "effect": "2 Fear. 1 Damage per Beasts/Disease/Wilds/Badlands. (Count max. 5 tokens.)",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "lure of the deep wilderness",
    "art": "https://spiritislandwiki.com/images/0/03/Swallowed_by_the_Wilderness.png"
  },
  "sky stretches to shore": {
    "image": "https://spiritislandwiki.com/images/4/44/Sky_Stretches_to_Shore_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "a",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "This turn, target Spirit may use 1 Slow Power as if it were Fast, or vice versa. Target Spirit gains +3 Range for measuring Range to Coastal lands.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/e/ed/Sky_Stretches_to_Shore.png"
  },
  "confounding mists": {
    "image": "https://spiritislandwiki.com/images/a/a4/Confounding_Mists_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "a",
      "w"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Defend 4. Each Invader added to target land this turn may be immediately Pushed to any adjacent land.",
    "threshhold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/2/28/Confounding_Mists.png"
  },
  "cast down into the briny deep": {
    "image": "https://spiritislandwiki.com/images/5/5b/Cast_Down_Into_the_Briny_Deep_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 9,
    "elements": [
      "s",
      "m",
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Coastal Land",
    "effect": "6 Fear. Destroy all Invaders.",
    "threshhold": {
      "elements": {
        "s": 2,
        "m": 2,
        "w": 4,
        "e": 4
      },
      "ability": "Destroy the board containing target land and everything on that board. All Destroyed Blight is Removed from the game instead of being returned to the Blight Card."
    },
    "artist": "Jason Behnke",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/c/cb/Cast_Down_Into_the_Briny_Deep.png"
  },
  "unrelenting growth": {
    "image": "https://spiritislandwiki.com/images/4/4a/Unrelenting_Growth_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "f",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit adds 2 Presence and 1 Wilds to a land at Range 1 of their Presence.",
    "threshhold": {
      "elements": {
        "s": 3,
        "p": 3
      },
      "ability": "In that land, add 1 additional Wilds and Remove 1 Blight. Target Spirit gains a Power Card."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/7/71/Unrelenting_Growth.png"
  },
  "prowling panthers": {
    "image": "https://spiritislandwiki.com/images/8/87/Prowling_Panthers_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Mountain or Jungle",
    "effect": "1 Fear. Add 1 Beasts. If target land has Beasts, Destroy 1 Explorer/Town.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/d/d5/Prowling_Panthers.png"
  },
  "carapaced land": {
    "image": "https://spiritislandwiki.com/images/e/e0/Carapaced_Land_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "e",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "If targeting a land with Beasts, this Power has +1 Range. Defend 3.",
    "threshhold": {
      "elements": {
        "e": 2
      },
      "ability": "Defend +3."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/e/e8/Carapaced_Land.png"
  },
  "sudden ambush": {
    "image": "https://spiritislandwiki.com/images/8/89/Sudden_Ambush_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "You may Gather 1 Dahan. Each Dahan Destroys 1 Explorer.",
    "threshhold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "unique": "thunderspeaker",
    "art": "https://spiritislandwiki.com/images/e/e9/Sudden_Ambush.png"
  },
  "stem the flow of fresh water": {
    "image": "https://spiritislandwiki.com/images/2/29/Stem_the_Flow_of_Fresh_Water_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Damage to 1 Town/City. If target land is a Mountain or Sands, instead, 1 Damage to each Town/City.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "Sacred Site",
    "unique": "a spread of rampant green",
    "art": "https://spiritislandwiki.com/images/b/bd/Stem_the_Flow_of_Fresh_Water.png"
  },
  "melt earth into quicksand": {
    "image": "https://spiritislandwiki.com/images/2/24/Melt_Earth_Into_Quicksand_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "m",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Sands or Wetland",
    "effect": "1 Fear. 2 Damage. Isolate target land. After Invaders/Dahan are Moved into target land, Destroy them.",
    "threshhold": {
      "elements": {
        "m": 2,
        "w": 4,
        "e": 2
      },
      "ability": "+4 Damage. Add 1 Badlands. Add 1 Wilds."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/e/e1/Melt_Earth_Into_Quicksand.png"
  },
  "thickets erupt with every touch of breeze": {
    "image": "https://spiritislandwiki.com/images/d/da/Thickets_Erupt_with_Every_Touch_of_Breeze_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "a",
      "p"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Inland Land",
    "effect": "2 Damage. Then either: Add 3 Wilds. Remove 1 Blight.",
    "threshhold": {
      "elements": {
        "p": 3
      },
      "ability": "1 Fear. +2 Damage."
    },
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/8/84/Thickets_Erupt_With_Every_Touch_of_Breeze.png"
  },
  "sweep into the sea": {
    "image": "https://spiritislandwiki.com/images/f/f3/Sweep_into_the_Sea_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "Push all Explorers and Towns one land towards the nearest Ocean. If target land is Coastal, Destroy all Explorers and Towns.",
    "threshhold": {
      "elements": {
        "s": 3,
        "w": 2
      },
      "ability": "Repeat on an adjacent land."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/0/00/Sweep_Into_the_Sea.png"
  },
  "territorial strife": {
    "image": "https://spiritislandwiki.com/images/4/43/Territorial_Strife_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with at least 1 City",
    "effect": "3 Damage to Explorers/Towns. Add 1 Strife.",
    "threshhold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/a/a4/Territorial_Strife.png"
  },
  "renewing boon": {
    "image": "https://spiritislandwiki.com/images/3/37/Renewing_Boon_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "Another Spirit",
    "effect": "Choose a land where you and target Spirit both have Presence. In that land: Remove 1 Blight, and target Spirit may add 1 of their Destroyed Presence.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/9/93/Renewing_Boon.png"
  },
  "skies herald the season of return": {
    "image": "https://spiritislandwiki.com/images/b/b2/Skies_Herald_the_Season_of_Return_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "A Spirit with Presence on target board may add 1 of their Destroyed Presence. Gather up to 2 Dahan. Push 1 Blight.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/b/bf/Skies_Herald_the_Season_of_Return.png"
  },
  "scour the land": {
    "image": "https://spiritislandwiki.com/images/1/10/Scour_the_Land_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "a",
      "e"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "Destroy 3 Towns and all Explorers. Add 1 Blight.",
    "threshhold": {
      "elements": {
        "a": 3
      },
      "ability": "This Power may be Fast."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/d/dc/Scour_the_Land.png"
  },
  "spill bitterness into the earth": {
    "image": "https://spiritislandwiki.com/images/5/53/Spill_Bitterness_Into_the_Earth_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 5,
    "elements": [
      "f",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "6 Damage. Add 2 Badlands/Strife and 1 Blight. In up to 3 adjacent lands with Blight, add 1 Badlands/Strife.",
    "threshhold": {
      "elements": {
        "f": 3,
        "w": 3
      },
      "ability": "In up to 3 adjacent lands, 1 Damage to each Invader."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/0/08/Spill_Bitterness_Into_the_Earth.png"
  },
  "gift of flowing power": {
    "image": "https://spiritislandwiki.com/images/2/22/Gift_of_Flowing_Power_%28ff%29.png",
    "set": [
      "Promo Pack 1",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "w"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit gains 1 Energy. Target Spirit chooses to either: Play another Power Card by paying its cost. Gain 1Fire and 1Water.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "serpent slumbering beneath the island",
    "art": "https://spiritislandwiki.com/images/9/92/Gift_of_Flowing_Power.png"
  },
  "flow downriver, blow downwind": {
    "image": "https://spiritislandwiki.com/images/8/89/Flow_Downriver%2C_Blow_Downwind_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "a",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "Push up to 1 Blight/Explorer/Town.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/7/78/Flow_Downriver%2C_Blow_Downwind.png"
  },
  "dream of the untouched land": {
    "image": "https://spiritislandwiki.com/images/d/d2/Dream_of_the_Untouched_Land_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 6,
    "elements": [
      "m",
      "w",
      "e",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Remove up to 3 Blight and up to 3 Health worth of Invaders.",
    "threshhold": {
      "elements": {
        "m": 3,
        "w": 2,
        "e": 3,
        "p": 2
      },
      "ability": " (Max. 1x/game) Add a random new Island Board next to target board. Ignore its Setup icons; add 2 Beasts, 2 Wilds, 2 Badlands and up to 2 Presence (from any Spirits) anywhere on it. From now on, Build cards and \"Each board / Each land\" Adversary Actions skip 1 Board."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/1/19/Dream_of_the_Untouched_Land.png"
  },
  "rites of the land's rejection": {
    "image": "https://spiritislandwiki.com/images/d/d8/Rites_of_the_Land%27s_Rejection_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "e"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Land with Dahan",
    "effect": "Invaders do not Build in target land this turn. 1 Fear per Town/City or 1 Fear per Dahan, whichever is less. Push up to 3 Dahan.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/f/f6/Rites_of_the_Land%27s_Rejection.png"
  },
  "flash floods": {
    "image": "https://spiritislandwiki.com/images/8/89/Flash_Floods_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "w"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Damage. If target land is Coastal, +1 Damage.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "river surges in sunlight",
    "art": "https://spiritislandwiki.com/images/2/20/Flash_Floods.png"
  },
  "study the invaders' fears": {
    "image": "https://spiritislandwiki.com/images/3/39/Study_the_Invaders%27_Fears_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Land with 1 or more Towns and/or Cities",
    "effect": "2 Fear. Turn the top card of the Fear Deck face-up.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "shifting memory of ages",
    "art": "https://spiritislandwiki.com/images/9/96/Study_the_Invaders%27_Fears.png"
  },
  "instruments of their own ruin": {
    "image": "https://spiritislandwiki.com/images/9/98/Instruments_of_Their_Own_Ruin_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "f",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Add 1 Strife. Each Invader with Strife deals Damage to other Invaders in target land.",
    "threshhold": {
      "elements": {
        "s": 4,
        "f": 2,
        "n": 2
      },
      "ability": "Instead, if Invaders Ravage in target land, they Damage Invaders in adjacent lands instead of Dahan and the land. Dahan in target land do not fight back."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/a/aa/Instruments_of_Their_Own_Ruin.png"
  },
  "thriving chokefungus": {
    "image": "https://spiritislandwiki.com/images/d/d6/Thriving_Chokefungus_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Jungle or Wetland",
    "effect": "Add 1 Disease and 1 Badlands.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/b/be/Thriving_Chokefungus.png"
  },
  "weave together the fabric of place": {
    "image": "https://spiritislandwiki.com/images/c/c2/Weave_Together_the_Fabric_of_Place_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "m",
      "a",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Target land and a land adjacent to it become a single land for this turn. (It has the terrain and land # of both lands. When this effect expires, divide pieces as you wish; all of them are considered moved.)",
    "threshhold": {
      "elements": {
        "a": 4
      },
      "ability": "Isolate the joined land. If it has Invaders, 2 Fear, and Remove up to 2 Invaders."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/1/1b/Weave_Together_the_Fabric_of_Place.png"
  },
  "birds cry warning": {
    "image": "https://spiritislandwiki.com/images/6/67/Birds_Cry_Warning_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 3,
    "target": "Land with Dahan",
    "effect": "The next time Dahan would be Destroyed in target land, Destroy 2 fewer Dahan. Push up to 3 Dahan.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/3/38/Birds_Cry_Warning.png"
  },
  "blur the arc of years": {
    "image": "https://spiritislandwiki.com/images/c/c1/Blur_the_Arc_of_Years_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "If no Dahan/Invaders are present: Remove 1 Blight. If invaders are present: they Build, then Ravage. If Dahan are present: Add 1 Dahan. Push up to 2 Dahan. You may repeat this Power (once) on the same land by spending 1 Time.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "fractured days split the sky",
    "art": "https://spiritislandwiki.com/images/b/bf/Blur_the_Arc_of_Years.png"
  },
  "forests of living obsidian": {
    "image": "https://spiritislandwiki.com/images/a/a0/Forests_of_Living_Obsidian_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "f",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "Add 1 Badlands. Push all Dahan. 1 Damage to each Invader. If the origin land is your Sacred Site, +1 Damage to each Invader.",
    "threshhold": {
      "elements": {
        "s": 2,
        "f": 3,
        "e": 3
      },
      "ability": "Repeat this Power."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/6/6f/Forests_of_Living_Obsidian.png"
  },
  "absorb essence": {
    "image": "https://spiritislandwiki.com/images/a/a5/Absorb_Essence_%28ff%29.png",
    "set": [
      "Promo Pack 1",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "f",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "Gain 3 Energy. Move 1 of target Spirit's Presence from the board to your \"Deep Slumber\" track. Absorbed Presence cannot be returned to play. Target Spirit gains 1 Any (Element) and 1 Energy.",
    "threshhold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "serpent slumbering beneath the island",
    "art": "https://spiritislandwiki.com/images/7/77/Absorb_Essence.png"
  },
  "walls of rock and thorn": {
    "image": "https://spiritislandwiki.com/images/1/10/Walls_of_Rock_and_Thorn_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Mountain or Jungle",
    "effect": "2 Damage. Defend 8. Add 1 Wilds. Isolate target land.",
    "threshhold": {
      "elements": {
        "e": 2,
        "p": 2
      },
      "ability": "+2 Damage. +2 Defend. Add 1 Badlands."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/5/54/Walls_of_Rock_and_Thorn.png"
  },
  "dark skies loose a stinging rain": {
    "image": "https://spiritislandwiki.com/images/f/ff/Dark_Skies_Loose_a_Stinging_Rain_%28ff%29.png",
    "set": [
      "Promo Pack 2",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Isolate target land. Push up to 1 Explorer and up to 2 Dahan.",
    "threshhold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": "Wetland",
    "unique": "downpour drenches the world",
    "art": "https://spiritislandwiki.com/images/b/b2/Dark_Skies_Loose_a_Stinging_Rain.png"
  },
  "storm-swath": {
    "image": "https://spiritislandwiki.com/images/4/40/Storm-Swath_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "f",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "2 Fear. In both origin land and target land: 1 Damage to each Invader.",
    "threshhold": {
      "elements": {
        "f": 2,
        "a": 3,
        "w": 2
      },
      "ability": "+1 Fear. This Power has +1 Range. In a land adjacent to both origin and target, 1 Damage to each Invader. In lands where you did Damage, Destroy 1 Town."
    },
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/3/3d/Storm-Swath.png"
  },
  "a dreadful tide of scurrying flesh": {
    "image": "https://spiritislandwiki.com/images/c/c1/A_Dreadful_Tide_of_Scurrying_Flesh_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "w",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "Land with 2 or more Beasts tokens",
    "effect": "Remove up to half (round down) of Beasts in target land. For each Beasts Removed, 2 Fear and skip one Invader Action.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "Sacred Site",
    "unique": "many minds move as one",
    "art": "https://spiritislandwiki.com/images/5/57/A_Dreadful_Tide_of_Scurrying_Flesh.png"
  },
  "flocking red-talons": {
    "image": "https://spiritislandwiki.com/images/9/94/Flocking_Red-Talons_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "a",
      "w",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 3,
    "target": "Any Land",
    "effect": "Add 1 Beasts. Move up to 2 Beasts within 3 Range to target land. For each Beasts present, choose a different Invader. 1 Damage to each of those Invaders. Push 1 Explorer/Town per Beasts.",
    "threshhold": {
      "elements": {
        "a": 2,
        "p": 2,
        "n": 3
      },
      "ability": "Repeat this Power on a different land within 3 Range (of target land) ."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": "Wetland",
    "art": null
  },
  "boon of watchful guarding": {
    "image": "https://spiritislandwiki.com/images/6/69/Boon_of_Watchful_Guarding_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "e",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "In one of Target Spirit's lands, Defend 4. Target Spirit may pay 1 Energy to instead Defend 8. (This Power Defends a single land, letting you use your Special Rule, \"Dahan Trust the Watchers.\") ",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "eyes watch from the trees",
    "art": "https://spiritislandwiki.com/images/0/08/Boon_of_Watchful_Guarding.png"
  },
  "focus the land's anguish": {
    "image": "https://spiritislandwiki.com/images/2/2b/Focus_the_Land%27s_Anguish_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 5,
    "elements": [
      "s"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "If this Power Destroys any Towns/Cities, 5 Fear. Gather up to 5 Blight. 1 Damage per Blight.",
    "threshhold": {
      "elements": {
        "s": 3
      },
      "ability": "+1 Damage per Blight."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/d/dd/Focus_the_Land%27s_Anguish.png"
  },
  "stinging sandstorm": {
    "image": "https://spiritislandwiki.com/images/c/ca/Stinging_Sandstorm_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "a",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Gather up to 1 of your Presence. 1 Fear and 1 Damage. (If this Power makes a Sacred Site, your Special Rule applies immediately, giving Invaders there -1 Health and possibly Destroying Damaged Invaders.) ",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "rising heat of stone and sand",
    "art": "https://spiritislandwiki.com/images/e/e3/Stinging_Sandstorm.png"
  },
  "asphyxiating smoke": {
    "image": "https://spiritislandwiki.com/images/3/3c/Asphyxiating_Smoke_%28ff%29.png",
    "set": [
      "Promo Pack 1",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "a",
      "p"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "1 Fear. Destroy 1 Town. Push 1 Dahan.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "Sacred Site",
    "unique": "heart of the wildfire",
    "art": "https://spiritislandwiki.com/images/4/4c/Asphyxiating_Smoke.png"
  },
  "call of the deeps": {
    "image": "https://spiritislandwiki.com/images/2/23/Call_of_the_Deeps_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Coastal Land",
    "effect": "Gather 1 Explorer. If target land is the Ocean, you may Gather another Explorer.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "ocean's hungry grasp",
    "art": "https://spiritislandwiki.com/images/5/54/Call_of_the_Deeps.png"
  },
  "favor of the sun and star-lit dark": {
    "image": "https://spiritislandwiki.com/images/0/00/Favor_of_the_Sun_and_Star-lit_Dark_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Defend 4. Push up to 1 Blight.",
    "threshhold": {
      "elements": {
        "s": 2
      },
      "ability": "1 Fear."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/5/5e/Favor_of_the_Sun_and_Star-Lit_Dark.png"
  },
  "pyroclastic bombardment": {
    "image": "https://spiritislandwiki.com/images/b/b3/Pyroclastic_Bombardment_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "f",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Any Land",
    "effect": "1 Damage to each Town/City/Dahan. 1 Damage. 1 Damage to Dahan.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "Sacred Site",
    "unique": "volcano looming high",
    "art": "https://spiritislandwiki.com/images/a/ad/Pyroclastic_Bombardment.png"
  },
  "unleash a torrent of the self's own essence": {
    "image": "https://spiritislandwiki.com/images/3/37/Unleash_a_Torrent_of_the_Self%27s_Own_Essence_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 2,
    "elements": [
      "s",
      "m",
      "f",
      "w"
    ],
    "speed": "fast",
    "range": null,
    "target": "Yourself",
    "effect": "Gain 4 Energy. You may forget a Power card to gain 4 more Energy. Pay X Energy (min. 1) to deal X Damage in a land at 0 Range.",
    "threshhold": {
      "elements": {
        "s": 2,
        "f": 3
      },
      "ability": "You may do both."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/7/74/Unleash_a_Torrent_of_the_Self%27s_Own_Essence.png"
  },
  "scatter to the winds": {
    "image": "https://spiritislandwiki.com/images/2/2c/Scatter_to_the_Winds_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "Choose up to 5 Explorers/Towns/Dahan. Push them to as many different lands as possible.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "sun-bright whirlwind",
    "art": "https://spiritislandwiki.com/images/8/81/Scatter_to_the_Winds.png"
  },
  "twisted flowers murmur ultimatums": {
    "image": "https://spiritislandwiki.com/images/e/e2/Twisted_Flowers_Murmur_Ultimatums_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 5,
    "elements": [
      "s",
      "m",
      "a",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with 1 or more Invaders",
    "effect": "4 Fear. Add 1 Strife. If the Terror Level is 2 or higher, Remove 2 Invaders.",
    "threshhold": {
      "elements": {
        "m": 3,
        "a": 2,
        "p": 3
      },
      "ability": "+3 Fear, before the Terror Level check. 3 Damage."
    },
    "artist": "Kat Birmelin",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/0/04/Twisted_Flowers_Murmur_Ultimatums.png"
  },
  "strong and constant currents": {
    "image": "https://spiritislandwiki.com/images/e/e2/Strong_and_Constant_Currents_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Coastal Land",
    "effect": "Push 1 Explorer/Town to an adjacent Coastal land. Move up to 2 Dahan between target land and one other Coastal land.",
    "threshhold": {
      "elements": {
        "w": 2
      },
      "ability": "You may do both."
    },
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/7/77/Strong_and_Constant_Currents.png"
  },
  "infested aquifers": {
    "image": "https://spiritislandwiki.com/images/0/0e/Infested_Aquifers_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "w",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "If target land has any Disease, 1 Damage to each Invader. If target land is a Mountain or Wetland, 1 Fear and add 1 Disease.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/9/9f/Infested_Aquifers.png"
  },
  "sea monsters": {
    "image": "https://spiritislandwiki.com/images/4/4a/Sea_Monsters_%28je%29.png",
    "set": [
      "Branch and Claw",
      "Jagged Earth"
    ],
    "cardType": "major",
    "cost": 5,
    "elements": [
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Coastal Land and/or a Wetland",
    "effect": "Add 1 Beasts. If Invaders are present, 2 Fear per Beasts (max. 8 Fear). 3 Damage per Beasts. 1 Damage per Blight.",
    "threshhold": {
      "elements": {
        "w": 3,
        "n": 3
      },
      "ability": "Repeat this Power."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/1/19/Sea_Monsters.png"
  },
  "boon of vigor": {
    "image": "https://spiritislandwiki.com/images/8/87/Boon_of_Vigor_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "w",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "If you target yourself, gain 1 Energy. If you target another Spirit, they gain 1 Energy per Power Card they played this turn.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "river surges in sunlight",
    "art": "https://spiritislandwiki.com/images/e/e7/Boon_of_Vigor.png"
  },
  "infestation of venomous spiders": {
    "image": "https://spiritislandwiki.com/images/9/9e/Infestation_of_Venomous_Spiders_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "a",
      "e",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Land with 1 or more Invaders",
    "effect": "Add 1 Beasts. Gather up to 1 Beasts. For each Beasts, 1 Fear (max. 4) and Invaders skip one Action in target land.",
    "threshhold": {
      "elements": {
        "a": 2,
        "e": 2,
        "n": 3
      },
      "ability": "After this Power causes Invaders to skip an Action, 4 Damage."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/7/73/Infestation_of_Venomous_Spiders.png"
  },
  "blood draws predators": {
    "image": "https://spiritislandwiki.com/images/3/35/Blood_Draws_Predators_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "w",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "After the next time Invaders are Destroyed in target land: Add 1 Beasts, then 1 Damage per Beasts (count max. 3 Beasts).",
    "threshhold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/0/0f/Blood_Draws_Predators.png"
  },
  "gift of twinned days": {
    "image": "https://spiritislandwiki.com/images/f/f2/Gift_of_Twinned_Days_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "m"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "Once this turn, target Spirit may Repeat the lowest-cost Power Card they have in play by paying it's cost again. You may do likewise.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/5/5e/Gift_of_Twinned_Days.png"
  },
  "elemental teachings": {
    "image": "https://spiritislandwiki.com/images/2/2c/Elemental_Teachings_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Prepare 1 Element Marker. Discard up to 3 Element Markers. Target Spirit gains those Elements. (They can be any combination of Elements - the same or different.) ",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "shifting memory of ages",
    "art": "https://spiritislandwiki.com/images/7/7a/Elemental_Teachings.png"
  },
  "settle into hunting-grounds": {
    "image": "https://spiritislandwiki.com/images/2/23/Settle_Into_Hunting-Grounds_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "m",
      "f",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "Yourself",
    "effect": "Your Presence may count as Badlands and Beasts. (Decide per Presence, per Action.) Your Presence cannot move.",
    "threshhold": {
      "elements": {
        "p": 2,
        "n": 3
      },
      "ability": "2 Fear and 2 Damage in one of your lands."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/4/4d/Settle_Into_Hunting-Grounds.png"
  },
  "absorb corruption": {
    "image": "https://spiritislandwiki.com/images/1/1e/Absorb_Corruption_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "Gather 1 Blight. Pay 1 Energy to Remove 1 Blight.",
    "threshhold": {
      "elements": {
        "p": 2
      },
      "ability": "You may do both."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/7/7b/Absorb_Corruption.png"
  },
  "sunset's fire flows across the land": {
    "image": "https://spiritislandwiki.com/images/4/4a/Sunset%27s_Fire_Flows_Across_the_Land_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "f",
      "w"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Fear. 1 Damage. You may pay 1 Energy to deal 1 Damage in an adjacent land.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/2/2d/Sunset%27s_Fire_Flows_Across_the_Land.png"
  },
  "scream disease into the wind": {
    "image": "https://spiritislandwiki.com/images/0/04/Scream_Disease_Into_the_Wind_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "a",
      "w",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit gets +1 Range with all their Powers. Once this turn, after target Spirit uses a Power targeting a land, they may add 1 Disease to that land. (Hand them a Disease token as a reminder.) ",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/0/02/Scream_Disease_Into_the_Wind.png"
  },
  "unquenchable flames": {
    "image": "https://spiritislandwiki.com/images/1/18/Unquenchable_Flames_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "1 Fear. 1 Damage to Towns/Cities. Invaders do not heal Damage at end of turn.",
    "threshhold": {
      "elements": {
        "f": 2
      },
      "ability": "Add 1 Badlands."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/3/30/Unquenchable_Flames.png"
  },
  "fragments of yesteryear": {
    "image": "https://spiritislandwiki.com/images/1/1a/Fragments_of_Yesteryear_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "major",
    "cost": 7,
    "elements": [
      "s",
      "m"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "Remove all pieces, then Add the pieces matching target land's Setup symbols.",
    "threshhold": {
      "elements": {
        "s": 3
      },
      "ability": "This power may be Fast. 3 — 3 Moon: Don't Remove Dahan, any Spirit's Presence, or Spirit Tokens. Don't add Invaders/Blight."
    },
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "art": null
  },
  "sucking ooze": {
    "image": "https://spiritislandwiki.com/images/e/e1/Sucking_Ooze_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "m",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Sands or Wetland",
    "effect": "2 Fear if Invaders are present. Isolate target land.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/7/76/Sucking_Ooze.png"
  },
  "weep for what is lost": {
    "image": "https://spiritislandwiki.com/images/5/54/Weep_for_What_is_Lost_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "f",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with Blight",
    "effect": "1 Fear per type of Invader present. Push up to 1 Explorer/Town per Blight.",
    "threshhold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/9/96/Weep_for_What_is_Lost.png"
  },
  "desiccating winds": {
    "image": "https://spiritislandwiki.com/images/6/6f/Desiccating_Winds_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "f",
      "a",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Mountain or Sands",
    "effect": "If target land has Badlands, 1 Damage. Add 1 Badlands.",
    "threshhold": null,
    "artist": "Shawn Daley",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/a/ab/Desiccating_Winds.png"
  },
  "mesmerized tranquility": {
    "image": "https://spiritislandwiki.com/images/f/fe/Mesmerized_Tranquility_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "w",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "Isolate target land. Each Invader does -1 Damage.",
    "threshhold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/2/23/Mesmerized_Tranquility.png"
  },
  "terror turns to madness": {
    "image": "https://spiritislandwiki.com/images/9/9a/Terror_Turns_to_Madness_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Land with 1 or more Invaders",
    "effect": "If the Terror Level is... Terror Level 1: 3 Fear. Terror Level 2: 2 Fear or add 1 Strife. Terror Level 3: Add 1 Strife.",
    "threshhold": null,
    "artist": "Shawn Daley",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/f/fd/Terror_Turns_to_Madness.png"
  },
  "unnerving pall": {
    "image": "https://spiritislandwiki.com/images/2/22/Unnerving_Pall_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Land with 1 or more Invaders",
    "effect": "1 Fear. Up to 3 Damaged Invaders do not participate in Ravage. 1 Fear. Defend 1 per Presence you have in target land (when this Power is used) .",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "shroud of silent mist",
    "art": "https://spiritislandwiki.com/images/f/f2/Unnerving_Pall.png"
  },
  "plaguebearers": {
    "image": "https://spiritislandwiki.com/images/5/5b/Plaguebearers_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Land with 1 or more Disease tokens",
    "effect": "1 Fear if Invaders are present. For each Disease, Push 2 Explorer/Town/Dahan. 1 Disease may move with each Pushed piece.",
    "threshhold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "vengeance as a burning plague",
    "art": "https://spiritislandwiki.com/images/6/69/Plaguebearers.png"
  },
  "transform to a murderous darkness": {
    "image": "https://spiritislandwiki.com/images/6/66/Transform_to_a_Murderous_Darkness_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 6,
    "elements": [
      "m",
      "f",
      "a",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit may choose one of their Sacred Site. In that land: Replace all their Presence with Badlands; the replaced Presence leaves the game. Push any number of those Badlands. 3 Fear. 3 Damage per Presence Replaced.",
    "threshhold": {
      "elements": {
        "m": 3,
        "f": 2,
        "a": 2
      },
      "ability": "1 Damage in an adjacent land. 1 Damage in an adjacent land."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/f/f6/Transform_to_a_Murderous_Darkness.png"
  },
  "strike low with sudden fevers": {
    "image": "https://spiritislandwiki.com/images/3/3f/Strike_Low_with_Sudden_Fevers_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "a",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Land with 1 or more Disease tokens",
    "effect": "1 Fear. Invaders skip Ravage Actions.",
    "threshhold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "vengeance as a burning plague",
    "art": "https://spiritislandwiki.com/images/f/f8/Strike_Low_With_Sudden_Fevers.png"
  },
  "transformative sacrifice": {
    "image": "https://spiritislandwiki.com/images/1/18/Transformative_Sacrifice_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "m",
      "f",
      "w",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit may Remove up to 3 Presence (from anywhere on the island). Then for each removed Presence, they Take a Minor Power and play it (for free) .",
    "threshhold": {
      "elements": {
        "m": 2,
        "f": 3,
        "p": 2
      },
      "ability": "Before taking cards, they may also Remove 1 Presence from their Presence track to Take a Minor Power and play it."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "art": null
  },
  "insatiable hunger of the swarm": {
    "image": "https://spiritislandwiki.com/images/c/ce/Insatiable_Hunger_of_the_Swarm_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "a",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Any Land",
    "effect": "Add 1 Blight. Add 2 Beasts. Gather up to 2 Beasts. Each Beasts deals 1 Fear, 2 Damage to Invaders and 2 Damage to Dahan. Destroy 1 Beasts.",
    "threshhold": {
      "elements": {
        "a": 2,
        "n": 4
      },
      "ability": "Repeat this Power on an adjacent land."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/0/08/Insatiable_Hunger_of_the_Swarm.png"
  },
  "pyroclastic flow": {
    "image": "https://spiritislandwiki.com/images/f/f2/Pyroclastic_Flow_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "f",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "2 Damage. Destroy all Explorers. If target land is a Jungle or Wetland, add 1 Blight.",
    "threshhold": {
      "elements": {
        "f": 2,
        "a": 3,
        "e": 2
      },
      "ability": "+4 Damage. Add 1 Wilds."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Mountain",
    "art": "https://spiritislandwiki.com/images/4/48/Pyroclastic_Flow.png"
  },
  "dire metamorphosis": {
    "image": "https://spiritislandwiki.com/images/4/49/Dire_Metamorphosis_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Fear. 1 Damage. 1 Damage to Dahan . Add 1 Badlands , 1 Beasts , 1 Disease , 1 Strife , 1 Wilds , and 1 Blight .",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/f/f9/Dire_Metamorphosis.png"
  },
  "flash-fires": {
    "image": "https://spiritislandwiki.com/images/f/f7/Flash-Fires_%28ff%29.png",
    "set": [
      "Promo Pack 1",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "a"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Fear. 1 Damage.",
    "threshhold": {
      "elements": {
        "a": 2
      },
      "ability": "This Power is Fast."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "heart of the wildfire",
    "art": "https://spiritislandwiki.com/images/4/4e/Flash-Fires.png"
  },
  "irresistible call": {
    "image": "https://spiritislandwiki.com/images/4/44/Irresistible_Call_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 6,
    "elements": [
      "s",
      "a",
      "p"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Inland Land",
    "effect": "Gather 5 Towns, 5 Dahan, 5 Beasts, and 15 Explorers.",
    "threshhold": {
      "elements": {
        "s": 2,
        "a": 3,
        "p": 2
      },
      "ability": "Invaders skip all Actions in target land. Isolate target land."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/5/53/Irresistible_Call.png"
  },
  "open shifting waterways": {
    "image": "https://spiritislandwiki.com/images/3/31/Open_Shifting_Waterways_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Gather up to 2 Dahan. If Dahan and Invaders are present, 1 Fear and 1 Damage.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "fathomless mud of the swamp",
    "art": "https://spiritislandwiki.com/images/1/17/Open_Shifting_Waterways.png"
  },
  "towering wrath": {
    "image": "https://spiritislandwiki.com/images/d/d6/Towering_Wrath_%28bc%29.png",
    "set": "Branch and Claw",
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "s",
      "f",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "2 Fear. For each of your Sacred Site in/adjacent to target land, 2 Damage. Destroy all Dahan.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "unique": "keeper of the forbidden wilds",
    "art": "https://spiritislandwiki.com/images/f/f4/Towering_Wrath.png"
  },
  "perils of the deepest island": {
    "image": "https://spiritislandwiki.com/images/a/a3/Perils_of_the_Deepest_Island_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Inland Land",
    "effect": "1 Fear. Add 1 Badlands. Add 1 Beasts within 1 Range. Push up to 2 Dahan.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "lure of the deep wilderness",
    "art": "https://spiritislandwiki.com/images/0/0e/Perils_of_the_Deepest_Island.png"
  },
  "voice of command": {
    "image": "https://spiritislandwiki.com/images/0/0e/Voice_of_Command_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "s",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Land with Dahan",
    "effect": "1 Damage per Dahan/Explorer, to Towns/Cities only. Defend 2. During Ravage Actions, Explorers fight alongside Dahan. (Deal/take Damage at the same time, and to/from the same sources.) ",
    "threshhold": {
      "elements": {
        "s": 3,
        "a": 2
      },
      "ability": "First, Gather up to 2 Explorers/Towns/Dahan."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/4/44/Voice_of_Command.png"
  },
  "pour time sideways": {
    "image": "https://spiritislandwiki.com/images/c/c6/Pour_Time_Sideways_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "fast",
    "range": null,
    "target": "Yourself",
    "effect": "Cost to Use: 3 Time. Move 1 of your Presence to a different land with your Presence. On the board moved from: During the Invader Phase, Resolve Invader and \"Each board/Each land...\" Actions one fewer time. On the board moved to: During the Invader Phase, Resolve Invader and \"Each board/Each Land...\" Actions one more time.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "fractured days split the sky",
    "art": "https://spiritislandwiki.com/images/5/51/Pour_Time_Sideways.png"
  },
  "ravaged undergrowth slithers back to life": {
    "image": "https://spiritislandwiki.com/images/7/78/Ravaged_Undergrowth_Slithers_Back_to_Life_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "w",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with Blight",
    "effect": "Replace 1 Blight with 1 Wilds. 1 Fear. 3 Damage. Push that Wilds.",
    "threshhold": {
      "elements": {
        "w": 3,
        "p": 2
      },
      "ability": "Add 1 Wilds. You may Push it. In each land with Wilds within 1 Range (of target land) : Push 1 Explorer and 1 Town to lands without Wilds."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": "Sacred Site",
    "art": null
  },
  "concealing shadows": {
    "image": "https://spiritislandwiki.com/images/d/de/Concealing_Shadows_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "1 Fear. Dahan take no Damage from Ravaging Invaders this turn.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "shadows flicker like flame",
    "art": "https://spiritislandwiki.com/images/2/24/Concealing_Shadows.png"
  },
  "sleep and never waken": {
    "image": "https://spiritislandwiki.com/images/0/04/Sleep_and_Never_Waken_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "m",
      "a",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Any Land",
    "effect": "Invaders skip all Actions in target land. 1 Fear per 2 Explorers this Power Removes. Remove up to 2 Explorers.",
    "threshhold": {
      "elements": {
        "m": 3,
        "a": 2,
        "n": 2
      },
      "ability": "Remove up to 6 Explorers from among your lands."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sands",
    "art": "https://spiritislandwiki.com/images/8/83/Sleep_and_Never_Waken.png"
  },
  "incite the mob": {
    "image": "https://spiritislandwiki.com/images/1/1c/Incite_the_Mob_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Land with 1 or more Invaders",
    "effect": "1 Invader with Strife deals Damage to other Invaders (not to each Invader). 1 Fear per Invader this Power Destroyed.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "grinning trickster stirs up trouble",
    "art": "https://spiritislandwiki.com/images/0/0f/Incite_the_Mob.png"
  },
  "hazards spread across the island": {
    "image": "https://spiritislandwiki.com/images/f/f8/Hazards_Spread_Across_the_Island_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "f",
      "a",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Any Land",
    "effect": "Choose a type of token from Badlands/Beasts/Disease/Strife/Wilds that exists in an adjacent land; choosing Disease costs 1 Energy. Add 1 of that type of token to target land.",
    "threshhold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/a/af/Hazards_Spread_Across_the_Island.png"
  },
  "mantle of dread": {
    "image": "https://spiritislandwiki.com/images/3/35/Mantle_of_Dread_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "a"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Spirit",
    "effect": "2 Fear. Target Spirit may Push 1 Explorer and 1 Town from a land where it has Presence.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "shadows flicker like flame",
    "art": "https://spiritislandwiki.com/images/a/a4/Mantle_of_Dread.png"
  },
  "treacherous waterways": {
    "image": "https://spiritislandwiki.com/images/8/84/Treacherous_Waterways_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "f",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Mountain or Wetland",
    "effect": "Add 1 Wilds. Push 1 Explorer.",
    "threshhold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/b/b2/Treacherous_Waterways.png"
  },
  "gift of furious might": {
    "image": "https://spiritislandwiki.com/images/a/a3/Gift_of_Furious_Might_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit may deal +3 Damage this turn with one of its Damage-dealing Powers. (This adds +3 Damage total, even for a Power that Damages multiple Invaders or each Invader.) ",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "devouring teeth lurk underfoot",
    "art": "https://spiritislandwiki.com/images/3/32/Gift_of_Furious_Might.png"
  },
  "manifestation of power and glory": {
    "image": "https://spiritislandwiki.com/images/4/43/Manifestation_of_Power_and_Glory_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Land with Dahan",
    "effect": "1 Fear. Each Dahan deals Damage equal to the number of your Presence in target land.",
    "threshhold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "unique": "thunderspeaker",
    "art": "https://spiritislandwiki.com/images/2/2a/Manifestation_of_Power_and_Glory.png"
  },
  "foundations sink into mud": {
    "image": "https://spiritislandwiki.com/images/a/a6/Foundations_Sink_into_Mud_%28ff%29.png",
    "set": [
      "Promo Pack 2",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "2 Damage to Town. If target land is a Wetland, you may instead deal 1 Damage to each Town/City.",
    "threshhold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "downpour drenches the world",
    "art": "https://spiritislandwiki.com/images/2/26/Foundations_Sink_Into_Mud.png"
  },
  "words of warning": {
    "image": "https://spiritislandwiki.com/images/5/59/Words_of_Warning_%28base%29.png",
    "set": "Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Land with Dahan",
    "effect": "Defend 3. During Ravage, Dahan in target land deal Damage simultaneously with Invaders.",
    "threshhold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "unique": "thunderspeaker",
    "art": "https://spiritislandwiki.com/images/6/61/Words_of_Warning.png"
  },
  "blazing intimidation": {
    "image": "https://spiritislandwiki.com/images/d/df/Blazing_Intimidation_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Fear. Push 2 Explorers/Towns to a land without your Incarna.",
    "threshhold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "ember-eyed behemoth",
    "art": null
  },
  "blinding glare": {
    "image": "https://spiritislandwiki.com/images/5/55/Blinding_Glare_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "a"
    ],
    "speed": "fast",
    "range": null,
    "target": "No Range",
    "effect": "2 Fear. Skip up to one Ravage Action.",
    "threshhold": {
      "elements": {
        "s": 5
      },
      "ability": "Instead, 3 Fear. Skip up to one Invader Action."
    },
    "artist": "Agnieszka Dabrowiecka",
    "status": "active",
    "from": null,
    "unique": "relentless gaze of the sun",
    "art": null
  },
  "gift of the untamed wild": {
    "image": "https://spiritislandwiki.com/images/a/a6/Gift_of_the_Untamed_Wild_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "f",
      "a",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit chooses to either: Add 1 Wilds to one of their lands. Replace 1 of their Presence with 1 Disease.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "lure of the deep wilderness",
    "art": "https://spiritislandwiki.com/images/f/f3/Gift_of_the_Untamed_Wild.png"
  },
  "flowing and silent forms dart by": {
    "image": "https://spiritislandwiki.com/images/d/d0/Flowing_and_Silent_Forms_Dart_By_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "2 Fear if Invaders are present. When Presence in target land would be Destroyed, its owner may, if possible, instead Push that Presence. You may Gather 1 Presence/Sacred Site of another Spirit (with their permission).",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "shroud of silent mist",
    "art": "https://spiritislandwiki.com/images/a/a2/Flowing_and_Silent_Forms_Dart_By.png"
  },
  "set them on an ever-twisting trail": {
    "image": "https://spiritislandwiki.com/images/e/ea/Set_Them_on_an_Ever-Twisting_Trail_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "a",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Gather or Push 1 Explorer. Isolate target land.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/5/5f/Set_Them_on_an_Ever-Twisting_Trail.png"
  },
  "frightful keening": {
    "image": "https://spiritislandwiki.com/images/5/5e/Frightful_Keening_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "slow",
    "range": null,
    "target": "Land with",
    "effect": "Push your Incarna. If this pushes your Incarna into a land with Invaders, 2 Fear there (before adding Strife).",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "wandering voice keens delirium",
    "art": null
  },
  "ways of shore and heartland": {
    "image": "https://spiritislandwiki.com/images/e/eb/Ways_of_Shore_and_Heartland_%28ff%29.png",
    "set": [
      "Promo Pack 2",
      "Feather and Flame"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "a",
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "Push up to 2 Invaders/Dahan/Presence/Beasts to a land that is also Coastal/Inland (whichever the target land is.)",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "finder of paths unseen",
    "art": "https://spiritislandwiki.com/images/3/39/Ways_of_Shore_and_Heartland.png"
  },
  "wrap in wings of sunlight": {
    "image": "https://spiritislandwiki.com/images/9/9c/Wrap_in_Wings_of_Sunlight_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Any Land",
    "effect": "Move up to 5 Dahan to any land (including back into target land) . If you moved at least 1 Dahan, Defend 5 in that land.",
    "threshhold": {
      "elements": {
        "s": 2,
        "a": 2,
        "n": 2
      },
      "ability": "First, Gather up to 3 Dahan."
    },
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/6/62/Wrap_in_Wings_of_Sunlight.png"
  },
  "absolute stasis": {
    "image": "https://spiritislandwiki.com/images/1/1b/Absolute_Stasis_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Land",
    "effect": " Cost to Use: 1 Time. Until the end of the Slow phase, target land and everything in it cease to exist for all purposes except checking victory/defeat. (You cannot target into, out of, or through where the land was.) This cannot target an Ocean even if Oceans are in play.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": "Sacred Site",
    "unique": "fractured days split the sky",
    "art": "https://spiritislandwiki.com/images/0/0b/Absolute_Stasis.png"
  },
  "share secrets of survival": {
    "image": "https://spiritislandwiki.com/images/d/d4/Share_Secrets_of_Survival_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Each time Dahan would be Destroyed in target land, Destroy 2 fewer Dahan. Gather up to 2 Dahan.",
    "threshhold": {
      "elements": {
        "a": 3
      },
      "ability": "You may do both."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "unique": "shifting memory of ages",
    "art": "https://spiritislandwiki.com/images/e/e9/Share_Secrets_of_Survival.png"
  },
  "unexpected tigers": {
    "image": "https://spiritislandwiki.com/images/2/23/Unexpected_Tigers_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Fear if Invaders are present. If you can gather 1 Beasts, do so, then push 1 Explorer. Otherwise, add 1 Beasts.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "grinning trickster stirs up trouble",
    "art": "https://spiritislandwiki.com/images/e/e9/Unexpected_Tigers.png"
  },
  "haunted by primal memories": {
    "image": "https://spiritislandwiki.com/images/e/e1/Haunted_by_Primal_Memories_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 2,
    "target": "Land with 1 or more Invaders",
    "effect": "1 Fear. Defend 3. If Beasts are present, +2 Fear.",
    "threshhold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/0/05/Haunted_by_Primal_Memories.png"
  },
  "call on herders for aid": {
    "image": "https://spiritislandwiki.com/images/f/f6/Call_on_Herders_for_Aid_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "Gather up to 2 Dahan. For each Dahan present, Push up to 1 Explorer/Town/Dahan.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "rising heat of stone and sand",
    "art": "https://spiritislandwiki.com/images/c/ce/Call_on_Herders_for_Aid.png"
  },
  "surging lahar": {
    "image": "https://spiritislandwiki.com/images/3/35/Surging_Lahar_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "2 Damage. If your Presence is present, Add 1 Badlands.",
    "threshhold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": "Sacred Site",
    "unique": "ember-eyed behemoth",
    "art": null
  },
  "sear anger into the wild lands": {
    "image": "https://spiritislandwiki.com/images/6/63/Sear_Anger_Into_the_Wild_Lands_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "f",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Add 1 Badlands. If Wilds and Invaders are present, 1 Fear and 1 Damage.",
    "threshhold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/4/49/Sear_Anger_Into_the_Wild_Lands.png"
  },
  "herd towards the lurking maw": {
    "image": "https://spiritislandwiki.com/images/f/f5/Herd_Towards_the_Lurking_Maw_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "w",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "1 Fear. Gather up to 1 Explorer/Town.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "devouring teeth lurk underfoot",
    "art": "https://spiritislandwiki.com/images/e/e1/Herd_Towards_the_Lurking_Maw.png"
  },
  "overenthusiastic arson": {
    "image": "https://spiritislandwiki.com/images/d/d7/Overenthusiastic_Arson_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Destroy 1 Town. Discard the top card of the Minor Power Deck. If it provides Fire: 1 Fear, 2 Damage, and add 1 Blight.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "grinning trickster stirs up trouble",
    "art": "https://spiritislandwiki.com/images/5/5b/Overenthusiastic_Arson.png"
  },
  "the past returns again": {
    "image": "https://spiritislandwiki.com/images/9/9d/The_Past_Returns_Again_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "m"
    ],
    "speed": "fast",
    "range": null,
    "target": "No Range",
    "effect": " Cost to Use: N Time, and Spirits jointly pay N Energy (where N = # of players). Swap the top card of the Invader Deck with a card in the Invader discard that is within 1 Invader Stage of it. (The discarded card stays face-down. The card going into the deck turns face-down. You can't swap cards that don't exist.) ",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "fractured days split the sky",
    "art": "https://spiritislandwiki.com/images/2/20/The_Past_Returns_Again.png"
  },
  "plows shatter on rocky ground": {
    "image": "https://spiritislandwiki.com/images/b/b6/Plows_Shatter_on_Rocky_Ground_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "1 Damage to each Town/City. Push up to 1 Town. Destroy 1 Town.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "stone's unyielding defiance",
    "art": "https://spiritislandwiki.com/images/4/4e/Plows_Shatter_on_Rocky_Ground.png"
  },
  "whispered guidance through the night": {
    "image": "https://spiritislandwiki.com/images/3/34/Whispered_Guidance_Through_the_Night_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Gather up to 3 Dahan. If Invaders and Dahan are present, 1 Fear.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "Jungle",
    "unique": "eyes watch from the trees",
    "art": "https://spiritislandwiki.com/images/c/ce/Whispered_Guidance_Through_the_Night.png"
  },
  "bargains of power and protection": {
    "image": "https://spiritislandwiki.com/images/8/85/Bargains_of_Power_and_Protection_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 2,
    "elements": [
      "s",
      "w",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Land with Dahan",
    "effect": "Remove 1 of your Presence on the island from the game, setting it on the Reminder Card. From now on: each Dahan within 1 Range of your Presence provides Defend 1 in its land, and you gain 1 less Energy each turn. (This effect stacks if used multiple times.)",
    "threshhold": {
      "elements": {
        "s": 3,
        "w": 2,
        "e": 2
      },
      "ability": "The Presence instead comes from your Presence track."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/7/74/Bargains_of_Power_and_Protection.png"
  },
  "gather the scattered light of stars": {
    "image": "https://spiritislandwiki.com/images/f/f0/Gather_the_Scattered_Light_of_Stars_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m"
    ],
    "speed": "slow",
    "range": null,
    "target": "Yourself",
    "effect": "At end of turn after discarding: Reclaim up to 2 cards to your hand. You may then Forget a Unique Power Card to Reclaim up to 3 additional cards.",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "starlight seeks its form",
    "art": "https://spiritislandwiki.com/images/0/0e/Gather_the_Scattered_Light_of_Stars.png"
  },
  "boon of ancient memories": {
    "image": "https://spiritislandwiki.com/images/2/2f/Boon_of_Ancient_Memories_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "w",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Spirit",
    "effect": "If you target yourself, gain a Minor Power. Otherwise: Target Spirit gains a Power Card. If it's a Major Power, they may pay 2 Energy instead of Forgetting a Power Card.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "shifting memory of ages",
    "art": "https://spiritislandwiki.com/images/b/bc/Boon_of_Ancient_Memories.png"
  },
  "the shore seethes with hatred": {
    "image": "https://spiritislandwiki.com/images/a/a2/The_Shore_Seethes_with_Hatred_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "f",
      "w",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Coastal Land",
    "effect": "1 Fear. Add 1 Badlands and 1 Wilds.",
    "threshhold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/2/23/The_Shore_Seethes_With_Hatred.png"
  },
  "angry bears": {
    "image": "https://spiritislandwiki.com/images/9/9d/Angry_Bears_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "s",
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "2 Fear. 2 Damage. If no Beasts are present, add 1 Beasts. Otherwise, +2 Damage, and Push up to 1 Beasts.",
    "threshhold": {
      "elements": {
        "f": 2,
        "n": 3
      },
      "ability": "1 Fear and Destroy 1 Explorer/Town in an adjacent land with Beasts."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/e/e2/Angry_Bears.png"
  },
  "vanish softly away, forgotten by all": {
    "image": "https://spiritislandwiki.com/images/2/23/Vanish_Softly_Away%2C_Forgotten_by_All_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 3,
    "elements": [
      "m",
      "a"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "Remove 1 Invader and 1 Explorer/Town. Remove all Damaged Invaders. Adversary or Scenario rules that prevent or alter Removal do not affect this Power.",
    "threshhold": {
      "elements": {
        "m": 3,
        "a": 3
      },
      "ability": "In any 2 lands with 4 or more Invaders: Remove 1 Invader."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/c/c1/Vanish_Softly_Away%2C_Forgotten_by_All.png"
  },
  "bombard with boulders and stinging seeds": {
    "image": "https://spiritislandwiki.com/images/3/3b/Bombard_with_Boulders_and_Stinging_Seeds_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "major",
    "cost": 2,
    "elements": [
      "a",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "1 Fear. 2 Damage. Add 1 Badlands.",
    "threshhold": {
      "elements": {
        "a": 2,
        "e": 2,
        "p": 3
      },
      "ability": "1 Fear. 2 Damage. Add 1 Wilds."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": "Mountain or Jungle",
    "art": null
  },
  "gift of searing heat": {
    "image": "https://spiritislandwiki.com/images/d/db/Gift_of_Searing_Heat_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "fast",
    "range": null,
    "target": "Another Spirit",
    "effect": "Target Spirit gains 2 Energy Target Spirit may pay 1 Energy to do 1 Damage in one of their lands.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "rising heat of stone and sand",
    "art": "https://spiritislandwiki.com/images/b/b3/Gift_of_Searing_Heat.png"
  },
  "wither bodies, scar stones": {
    "image": "https://spiritislandwiki.com/images/5/57/Wither_Bodies%2C_Scar_Stones_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "e"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Land",
    "effect": "1 Damage. Add 1 Badlands.",
    "threshhold": null,
    "artist": "Agnieszka Dabrowiecka",
    "status": "active",
    "from": null,
    "unique": "relentless gaze of the sun",
    "art": null
  },
  "lava flows": {
    "image": "https://spiritislandwiki.com/images/2/29/Lava_Flows_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "Add 1 Badlands and 1 Wilds. 1 Damage.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "volcano looming high",
    "art": "https://spiritislandwiki.com/images/3/38/Lava_Flows.png"
  },
  "exhale confusion and delirium": {
    "image": "https://spiritislandwiki.com/images/1/15/Exhale_Confusion_and_Delirium_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "m",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Land with Strife",
    "effect": "2 Fear. Invaders with Strife don't participate in Ravage. (Check when Ravaging; they don't do Damage or take counterattack Damage.) ",
    "threshhold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "wandering voice keens delirium",
    "art": null
  },
  "blood water and bloodlust": {
    "image": "https://spiritislandwiki.com/images/6/61/Blood_Water_and_Bloodlust_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": null,
    "target": "Any Land",
    "effect": "Add 1 Beast and 1 Disease.",
    "threshhold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "wounded waters bleeding",
    "art": null
  },
  "utter a curse of dread and bone": {
    "image": "https://spiritislandwiki.com/images/2/22/Utter_a_Curse_of_Dread_and_Bone_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "major",
    "cost": 4,
    "elements": [
      "m",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "Any Land",
    "effect": "For each Blight in/adjacent to target land, add 1 Badlands, 1 Disease, or 1 Strife. (Max. +3 of each.) Then: 2 Fear. 1 Damage.",
    "threshhold": {
      "elements": {
        "m": 3,
        "n": 2
      },
      "ability": "For each type of token you added, add 1 more within 1 Range. 1 Damage in an adjacent land."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/7/7f/Utter_a_Curse_of_Dread_and_Bone.png"
  },
  "entwine the fates of all": {
    "image": "https://spiritislandwiki.com/images/9/9a/Entwine_the_Fates_of_All_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "w",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "In one of target Spirit's lands, Defend 2 per Presence (from all Spirits).",
    "threshhold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": null,
    "unique": "towering roots of the jungle",
    "art": null
  },
  "infinite vitality": {
    "image": "https://spiritislandwiki.com/images/6/64/Infinite_Vitality_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "e",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Dahan have +4 Health (while in target land) . Blight cannot be Added. (When it would be added to target land, instead leave it on the Blight space.) ",
    "threshhold": {
      "elements": {
        "e": 4
      },
      "ability": "Dahan cannot be Damaged or Destroyed (in target land) . Remove 1 Blight from target or adjacent land."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "Sacred Site",
    "art": "https://spiritislandwiki.com/images/a/ad/Infinite_Vitality.png"
  },
  "bats scout for raids by darkness": {
    "image": "https://spiritislandwiki.com/images/8/89/Bats_Scout_for_Raids_by_Darkness_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "For each Dahan , 1 Damage to Towns / Cities . 1 Fear . Gather up to 2 Dahan .",
    "threshhold": null,
    "artist": "Shawn Daley",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/9/9a/Bats_Scout_for_Raids_by_Darkness.png"
  },
  "reach from the infinite darkness": {
    "image": "https://spiritislandwiki.com/images/3/31/Reach_from_the_Infinite_Darkness_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "Yourself",
    "effect": "Abduct up to 2 Presence (of any Spirits, with their permission) from any lands on the island, ignoring land type restrictions on moving Presence. Each Spirit's Presence in the Endless Dark grants them +1 Range with all their Powers (this turn).",
    "threshhold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "breath of darkness down your spine",
    "art": null
  },
  "entrap the forces of corruption": {
    "image": "https://spiritislandwiki.com/images/6/6c/Entrap_the_Forces_of_Corruption_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "e",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "Any Land",
    "effect": "Gather up to 1 Blight. Isolate target land. When Blight is added to target land, it doesn't cascade.",
    "threshhold": null,
    "artist": "Shawn Daley",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/6/63/Entrap_the_Forces_of_Corruption.png"
  },
  "focus the sun's rays": {
    "image": "https://spiritislandwiki.com/images/b/b9/Focus_the_Sun%27s_Rays_%28ni%29.png",
    "set": "Nature Incarnate",
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "slow",
    "range": 2,
    "target": "Any Land",
    "effect": "1 Damage. 2 Damage to Dahan. Move up to 3 Presence directly to target land (from anywhere on the island) . You may Bring 1 Badlands (total) with those Presence.",
    "threshhold": null,
    "artist": "Agnieszka Dabrowiecka",
    "status": "active",
    "from": "Sacred Site",
    "unique": "relentless gaze of the sun",
    "art": null
  },
  "domesticated animals go berserk": {
    "image": "https://spiritislandwiki.com/images/b/b4/Domesticated_Animals_Go_Berserk_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "Land with 1 or more Towns and/or Cities",
    "effect": "1 Fear. Defend 5.",
    "threshhold": {
      "elements": {
        "m": 3
      },
      "ability": "Add 1 Beasts."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/5/5e/Domesticated_Animals_Go_Berserk.png"
  },
  "gift of wind-sped steps": {
    "image": "https://spiritislandwiki.com/images/d/d8/Gift_of_Wind-Sped_Steps_%28hosi%29.png",
    "set": "Horizons of Spirit Island",
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Once this turn, Target Spirit may choose 1 of their Slow Powers with a \"Push\" or \"Gather\" instruction and make that Power Fast (for this turn) . If you target another Spirit, they gain 1 Energy.",
    "threshhold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "sun-bright whirlwind",
    "art": "https://spiritislandwiki.com/images/4/49/Gift_of_Wind-Sped_Steps.png"
  },
  "elemental boon": {
    "image": "https://spiritislandwiki.com/images/f/f2/Elemental_Boon_%28hosi%29.png",
    "set": [
      "Spirit Island",
      "Horizons of Spirit Island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit gains 3 different Elements of their choice. If you target another Spirit, you also gain the chosen Elements.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/5/5c/Elemental_Boon.png"
  },
  "gift of nature's connection": {
    "image": "https://spiritislandwiki.com/images/f/f5/Gift_of_Nature%27s_Connection_%28je%29.png",
    "set": "Jagged Earth",
    "cardType": "minor",
    "cost": 0,
    "elements": [],
    "speed": "fast",
    "range": null,
    "target": "Any Spirit",
    "effect": "Target Spirit gains either 2 Energy or 2 of a single Element (their choice) . If you target another Spirit, you gain an Element of your choice.",
    "threshhold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/2/2a/Gift_of_Nature%27s_Connection.png"
  },
  "draw towards a consuming void": {
    "image": "https://spiritislandwiki.com/images/f/f4/Draw_Towards_a_Consuming_Void_%28ni%29.png",
    "set": [
      "Jagged Earth",
      "Nature Incarnate"
    ],
    "cardType": "major",
    "cost": 8,
    "elements": [],
    "speed": "slow",
    "range": 0,
    "target": "Any Land",
    "effect": "Gather 1 Explorer, 1 Town, 1 City, 1 Dahan, 1 Beasts, and 1 Presence (from any Spirit) from each adjacent land. 4 Fear. 15 Damage. 5 Damage to Dahan. Destroy 1 Presence from each Spirit. Destroy 2 Beasts.",
    "threshhold": {
      "elements": {},
      "specialCondition": "If you have no other Power Cards in play",
      "ability": "Any number of times: Forget a Minor Power, a Major Power, and a Unique Power to perform the above effects again."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://spiritislandwiki.com/images/0/0a/Draw_Towards_a_Consuming_Void.png"
  }
}

export const CARD_ARTS: Record<string, string> = {}
for (let dict of [BLIGHT_CARDS, EVENTS, FEAR_CARDS, POWERS, ASPECTS]) {
  for (var card of Object.keys(dict)) {
    CARD_ARTS[card] = dict[card].image
  }
}
export const LARGE_COMPONENTS_ARTS: Record<string, string> = {...BOARDS}
for(let spirit of Object.keys(SPIRITS)) {
  LARGE_COMPONENTS_ARTS[spirit] = SPIRITS[spirit as Spirit].image
}
for(let ad of Object.keys(ADVESARIES)) {
  LARGE_COMPONENTS_ARTS[ad] = ADVESARIES[ad].image
}
/*NO SCENARIOS YET*/
