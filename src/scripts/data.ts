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
  "sun": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739413/symbols/sun.png",
  "moon": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739495/symbols/moon.png",
  "fire": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739496/symbols/fire.png",
  "air": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739496/symbols/air.png",
  "water": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739497/symbols/water.png",
  "earth": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739497/symbols/earth.png",
  "plant": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739498/symbols/plant.png",
  "animal": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739498/symbols/animal.png",
  "any": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739499/symbols/any.png",
  "element": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739500/symbols/element.png",
  "card_1": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739501/symbols/card_1.png",
  "card_2": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739501/symbols/card_2.png",
  "card_3": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739502/symbols/card_3.png",
  "card_4": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739502/symbols/card_4.png",
  "card_5": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739503/symbols/card_5.png",
  "card_6": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739504/symbols/card_6.png",
  "mountain": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739505/symbols/mountain.png",
  "jungle": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739505/symbols/jungle.png",
  "sands": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739506/symbols/sands.svg",
  "wetland": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739507/symbols/wetland.svg",
  "mountain_jungle": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739509/symbols/mountain_jungle.svg",
  "mountaion_sands": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739510/symbols/mountaion_sands.png",
  "mountain_wetland": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739511/symbols/mountain_wetland.png",
  "jungle_sands": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739512/symbols/jungle_sands.svg",
  "jungle_wetland": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739513/symbols/jungle_wetland.png",
  "sands_wetland": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739514/symbols/sands_wetland.svg",
  "mountain_presence": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739516/symbols/mountain_presence.svg",
  "jungle_presence": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739519/symbols/jungle_presence.svg",
  "sands_presence": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739520/symbols/sands_presence.svg",
  "wetland_presence": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739523/symbols/wetland_presence.svg",
  "town": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739525/symbols/town.svg",
  "city": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739526/symbols/city.svg",
  "explorer": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739528/symbols/explorer.svg",
  "dahan": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739529/symbols/dahan.svg",
  "blight": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739531/symbols/blight.svg",
  "no_blight": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739534/symbols/no_blight.png",
  "presence": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739537/symbols/presence.svg",
  "sacred_site": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739540/symbols/sacred_site.svg",
  "destroyed_presence": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739541/symbols/destroyed_presence.png",
  "incarna": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739542/symbols/incarna.svg",
  "empower": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739543/symbols/empower.png",
  "strife": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739544/symbols/strife.svg",
  "wilds": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739546/symbols/wilds.svg",
  "beasts": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739547/symbols/beasts.svg",
  "badlands": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739550/symbols/badlands.svg",
  "disease": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739552/symbols/disease.svg",
  "vitality": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739553/symbols/vitality.png",
  "fear": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739554/symbols/fear.svg",
  "isolate": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739555/symbols/isolate.png",
  "defend": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739556/symbols/defend.svg",
  "fast": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739557/symbols/fast.svg",
  "slow": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739559/symbols/slow.svg",
  "minor": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739561/symbols/minor.png",
  "escalation": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739562/symbols/escalation.svg",
  "terror_1": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739564/symbols/terror_1.svg",
  "terror_2": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739566/symbols/terror_2.svg",
  "terror_3": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739568/symbols/terror_3.svg",
  "reclaim_all": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739569/symbols/reclaim_all.png",
  "reclaim_one": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739570/symbols/reclaim_one.png",
  "reclaim_half": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739571/symbols/reclaim_half.png",
  "push_1_dahan": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739572/symbols/push_1_dahan.png",
  "gather_1_dahan": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739572/symbols/gather_1_dahan.png",
  "gain_card": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739573/symbols/gain_card.png",
  "gather_into_ocean": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739574/symbols/gather_into_ocean.png",
  "push_from_ocean": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739575/symbols/push_from_ocean.png",
  "ocean": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739575/symbols/ocean.png",
  "gain_1_per_fire": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739576/symbols/gain_1_per_fire.png",
  "gain_energy_for_card_plays": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739577/symbols/gain_energy_for_card_plays.png",
  "gather_beasts": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739578/symbols/gather_beasts.png",
  "prepare_element": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739578/symbols/prepare_element.png",
  "discard_markers_for_card_play": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739579/symbols/discard_markers_for_card_play.png",
  "gain_2_time": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739579/symbols/gain_2_time.png",
  "gain_1_time_twice": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739580/symbols/gain_1_time_twice.png",
  "gain_1_time_thrice": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739581/symbols/gain_1_time_thrice.png",
  "gain_card_from_pile": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739581/symbols/gain_card_from_pile.png",
  "gain_2_card_plays": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739582/symbols/gain_2_card_plays.png",
  "gain_1_card_play": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739582/symbols/gain_1_card_play.png",
  "2_damage": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739583/symbols/2_damage.png",
  "discard_2_cards": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739584/symbols/discard_2_cards.png",
  "push_town_city": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739584/symbols/push_town_city.png",
  "behemoth": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739585/symbols/behemoth.svg",
  "unempowered_behemoth": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739587/symbols/unempowered_behemoth.png",
  "empowered_behemoth": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739588/symbols/empowered_behemoth.png",
  "towering_roots": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739589/symbols/towering_roots.svg",
  "unempowered_towering_roots": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739591/symbols/unempowered_towering_roots.png",
  "empowered_towering_roots": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739592/symbols/empowered_towering_roots.png",
  "breath_of_darkness": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739592/symbols/breath_of_darkness.svg",
  "unempowered_breath_of_darkness": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739596/symbols/unempowered_breath_of_darkness.png",
  "empowered_breath_of_darkness": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739597/symbols/empowered_breath_of_darkness.png",
  "endless_dark": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739598/symbols/endless_dark.svg",
  "escape_all": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739600/symbols/escape_all.png",
  "escape_1": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739602/symbols/escape_1.png",
  "escape_2": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739602/symbols/escape_2.png",
  "wandering_voice": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739604/symbols/wandering_voice.svg",
  "unempowered_wandering_voice": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739607/symbols/unempowered_wandering_voice.png",
  "empowered_wandering_voice": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739608/symbols/empowered_wandering_voice.png",
  "push_wandering_voice": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739609/symbols/push_wandering_voice.png",
  "gather_1_blight": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739610/symbols/gather_1_blight.png",
  "quake": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739610/symbols/quake.svg",
  "gain_major_without_forgetting": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739612/symbols/gain_major_without_forgetting.png",
  "impending_card": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739613/symbols/impending_card.png",
  "impending_energy_1": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739613/symbols/impending_energy_1.png",
  "impending_energy_2": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739614/symbols/impending_energy_2.png",
  "impending_energy": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739615/symbols/impending_energy.png",
  "impending_cards": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739616/symbols/impending_cards.png",
  "energy_plus_minus": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739617/symbols/energy_plus_minus.png",
  "card": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739617/symbols/card.svg",
  "lair": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739620/symbols/lair.svg",
  "unempowered_lair": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739621/symbols/unempowered_lair.png",
  "locus": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739622/symbols/locus.svg",
  "unempowered_locus": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739624/symbols/unempowered_locus.png",
  "empowered_locus": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739624/symbols/empowered_locus.png",
  "warrior": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739625/symbols/warrior.svg",
  "unempowered_warrior": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739627/symbols/unempowered_warrior.png",
  "deeps": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739628/symbols/deeps.svg",
  "check": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739630/symbols/check.png",
  "spirit": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756739630/symbols/spirit.svg"
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
  board_a: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756731411/board_a_iolewd.png',
  north_east: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756731417/north_east_b3ftz0.png',
  board_b: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756731412/board_b_higzm3.png',
  east: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756731416/east_uw4ubs.png',
  board_c: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756731412/board_c_bcs21z.png',
  north_west: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756731418/north_west_hvvigs.png',
  board_d: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756731413/board_d_kn1vl1.png',
  west: '',
  board_e: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756731413/board_e_syban4.png',
  south_east: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756731419/south_east_t3sms4.png',
  board_f: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756731414/board_f_matalr.png',
  south_west: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756731419/south_west_vybsw2.png',
  board_g: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756731415/board_g_o0jff7.png',
  board_h: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756731415/board_h_oxzfra.png',
}

export const SPIRITS: Record<string, SpiritData> = {
	"a spread of rampant green": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732658/a_spread_of_rampant_green_iol0kg.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733033/a_spread_of_rampant_green_c0devu.png",
		"image": "/A_Spread_of_Rampant_Green_SpiritBoard.png",
		"caseName": "A Spread of Rampant Green"
	},
	"breath of darkness down your spine": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732659/breath_of_darkness_down_your_spine_hqqhud.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733034/breath_of_darkness_down_your_spine_wwdh0m.png",
		"image": "/Beath_Of_Darkness_Down_Your_Spin.png",
		"caseName": "Breath of Darkness Down Your Spine"
	},
	"bringer of dreams and nightmares": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732659/bringer_of_dreams_and_nightmares_hkz3pt.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733035/bringer_of_dreams_and_nightmares_e0648d.png",
		"image": "/Bringer_of_Dreams_and_Nightmares_SpiritBoard.png",
		"caseName": "Bringer of Dreams and Nightmares"
	},
	"dances up earthquakes": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732660/dances_up_earthquakes_znkxxg.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733036/dances_up_earthquakes_omk2r1.png",
		"image": "/Dances_Up_Earthquakes_SpiritBoard.png",
		"caseName": "Dances Up Earthquakes"
	},
	"devouring teeth lurk underfoot": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732661/devouring_teeth_lurk_underfoot_aw77ok.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733037/devouring_teeth_lurk_underfoot_deqi3g.png",
		"image": "/Devouring_Teeth_Lurk_Underfoot_SpiritBoard.png",
		"caseName": "Devouring Teeth Lurk Underfoot"
	},
	"downpour drenches the world": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732662/downpour_drenches_the_world_ww8uwk.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733038/downpour_drenches_the_world_rna9om.png",
		"image": "/Downpour_Drenches_the_World_SpiritBoard.png",
		"caseName": "Downpour Drenches the World"
	},
	"ember-eyed behemoth": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732663/ember-eyed_behemoth_n1mojn.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733039/ember-eyed_behemoth_tsgwga.png",
		"image": "/Ember-Eyed_Behemoth_SpiritBoard.png",
		"caseName": "Ember-Eyed Behemoth"
	},
	"eyes watch from the trees": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732664/eyes_watch_from_the_trees_yji4mc.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733040/eyes_watch_from_the_trees_umaxim.png",
		"image": "",
		"caseName": "Eyes Watch from the Trees"
	},
	"fathomless mud of the swamp": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732665/fathomless_mud_of_the_swamp_uxajua.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733041/fathomless_mud_of_the_swamp_catphz.png",
		"image": "/Eyes_Watch_from_the_Trees_SpiritBoard.png",
		"caseName": "Fathomless Mud of the Swamp"
	},
	"finder of paths unseen": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732666/finder_of_paths_unseen_paylpu.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733042/finder_of_paths_unseen_ldu1qm.png",
		"image": "/Finder_of_Paths_Unseen_SpiritBoard.png",
		"caseName": "Finder of Paths Unseen"
	},
	"fractured days split the sky": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732667/fractured_days_split_the_sky_fnsx8e.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733044/fractured_days_split_the_sky_ppbtph.png",
		"image": "/Fractured_Days_Split_the_Sky_SpiritBoard.png",
		"caseName": "Fractured Days Split the Sky"
	},
	"grinning trickster stirs up trouble": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732667/grinning_trickster_stirs_up_trouble_ukt7wy.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733045/grinning_trickster_stirs_up_trouble_glnm3t.png",
		"image": "/Grinning_Trickster_Stirs_Up_Trouble_SpiritBoard.png",
		"caseName": "Grinning Trickster Stirs Up Trouble"
	},
	"heart of the wildfire": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732668/heart_of_the_wildfire_qcm0hr.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733046/heart_of_the_wildfire_i6xkpb.png",
		"image": "codex/public/Heart_Of_The_Wildfire.png",
		"caseName": "Heart of the Wildfire"
	},
	"hearth-vigil": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732670/hearth-vigil_tyokh0.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733047/hearth-vigil_ndv9qu.png",
		"image": "/Hearth_Vigil.png",
		"caseName": "Hearth-Vigil"
	},
	"keeper of the forbidden wilds": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732671/keeper_of_the_forbidden_wilds_nayi7n.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733049/keeper_of_the_forbidden_wilds_snamzf.png",
		"image": "/Keeper_of_the_Forbidden_Wilds_SpiritBoard.png",
		"caseName": "Keeper of the Forbidden Wilds"
	},
	"lightning's swift strike": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732672/lightning_s_swift_strike_htq7ah.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733051/lightning_s_swift_strike_uocgcr.png",
		"image": "/Lightning's_Swift_Strike_SpiritBoard.png",
		"caseName": "Lightning's Swift Strike"
	},
	"lure of the deep wilderness": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732673/lure_of_the_deep_wilderness_w9x095.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733051/lure_of_the_deep_wilderness_f60zjk.png",
		"image": "/LURE_OF_THE_DEEP_WILDERNESS_SpiritBoard.png",
		"caseName": "Lure of the Deep Wilderness"
	},
	"many minds move as one": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732674/many_minds_move_as_one_yxc9g3.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733052/many_minds_move_as_one_b4vjme.png",
		"image": "codex/public/Many_Minds_Move_As_One.png",
		"caseName": "Many Minds Move as One"
	},
	"ocean's hungry grasp": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732675/ocean_s_hungry_grasp_mbecsu.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733054/ocean_s_hungry_grasp_e1kihi.png",
		"image": "/Ocean's_Hungry_Grasp_SpiritBoard.png",
		"caseName": "Ocean's Hungry Grasp"
	},
	"relentless gaze of the sun": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732676/relentless_gaze_of_the_sun_tgwqre.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733055/relentless_gaze_of_the_sun_tnf0m1.png",
		"image": "/Relentless_Gaze_of_the_Sun_SpiritBoard.png",
		"caseName": "Relentless Gaze of the Sun"
	},
	"rising heat of stone and sand": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732677/rising_heat_of_stone_and_sand_docada.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733056/rising_heat_of_stone_and_sand_pg31eb.png",
		"image": "/Rising_Heat_of_Stone_and_Sand_SpiritBoard.png",
		"caseName": "Rising Heat of Stone and Sand"
	},
	"river surges in sunlight": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732678/river_surges_in_sunlight_tdyzth.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733058/river_surges_in_sunlight_u1sbpe.png",
		"image": "/River_Surges_in_Sunlight_SpiritBoard.png",
		"caseName": "River Surges in Sunlight"
	},
	"serpent slumbering beneath the island": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732680/serpent_slumbering_beneath_the_island_cm2kli.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733059/serpent_slumbering_beneath_the_island_ijrfez.png",
		"image": "/Snek_Slumbering_Beneath_the_Island_SpiritBoard.png",
		"caseName": "Serpent Slumbering Beneath the Island"
	},
	"shadows flicker like flame": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732680/shadows_flicker_like_flame_rdsign.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733061/shadows_flicker_like_flame_eicaqx.png",
		"image": "/Shadows_Flicker_Like_Flame_SpiritBoard.png",
		"caseName": "Shadows Flicker Like Flame"
	},
	"sharp fangs behind the leaves": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732682/sharp_fangs_behind_the_leaves_ddishw.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733062/sharp_fangs_behind_the_leaves_yjwofu.png",
		"image": "/Sharp_Fangs_Behind_the_Leaves_SpiritBoard.png",
		"caseName": "Sharp Fangs Behind the Leaves"
	},
	"shifting memory of ages": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732683/shifting_memory_of_ages_wfxkez.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733064/shifting_memory_of_ages_qsajbu.png",
		"image": "/Shifting_Memory_of_Ages_SpiritBoard.png",
		"caseName": "Shifting Memory of Ages"
	},
	"shroud of silent mist": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732685/shroud_of_silent_mist_l0meuk.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733065/shroud_of_silent_mist_tqcvzm.png",
		"image": "/Shroud_of_Silent_Mist_SpiritBoard.png",
		"caseName": "Shroud of Silent Mist"
	},
	"starlight seeks its form": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732685/starlight_seeks_its_form_rlf6ps.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733067/starlight_seeks_its_form_uf1v8p.png",
		"image": "/Starlight_Seeks_Its_Form_SpiritBoard.png",
		"caseName": "Starlight Seeks Its Form"
	},
	"stone's unyielding defiance": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732687/stone_s_unyielding_defiance_njmhub.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733068/stone_s_unyielding_defiance_stgs43.png",
		"image": "/Stone's_Unyielding_Defiance_SpiritBoard.png",
		"caseName": "Stone's Unyielding Defiance"
	},
	"sun-bright whirlwind": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732688/sun-bright_whirlwind_qz1j37.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733070/sun-bright_whirlwind_boroui.png",
		"image": "/Sun-Bright_Whirlwind_SpiritBoard.png",
		"caseName": "Sun-Bright Whirlwind"
	},
	"thunderspeaker": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732690/thunderspeaker_cucmdp.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733071/thunderspeaker_lks2bj.png",
		"image": "/Thunderspeaker_SpiritBoard.png",
		"caseName": "Thunderspeaker"
	},
	"towering roots of the jungle": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732691/towering_roots_of_the_jungle_xtstge.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733073/towering_roots_of_the_jungle_nhkigd.png",
		"image": "Towering_Roots_Of_The_Jungle.png",
		"caseName": "Towering Roots of the Jungle"
	},
	"vengeance as a burning plague": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732692/vengeance_as_a_burning_plague_bzeqyj.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733074/vengeance_as_a_burning_plague_oszmiw.png",
		"image": "/Vengeance_as_a_Burning_Plague_SpiritBoard.png",
		"caseName": "Vengeance as a Burning Plague"
	},
	"vital strength of the earth": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732694/vital_strength_of_the_earth_y6s6xy.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733076/vital_strength_of_the_earth_y8zppx.png",
		"image": "/Vital_Strength_of_the_Earth_SpiritBoard.png",
		"caseName": "Vital Strength of the Earth"
	},
	"volcano looming high": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732695/volcano_looming_high_hsehca.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733077/volcano_looming_high_ugynuj.png",
		"image": "/Volcano_Looming_High_SpiritBoard.png",
		"caseName": "Volcano Looming High"
	},
	"wandering voice keens delirium": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732697/wandering_voice_keens_delirium_ezmz5u.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733079/wandering_voice_keens_delirium_egdave.png",
		"image": "/Wandering_Voice_Keens_Delerium_SpiritBoard.png",
		"caseName": "Wandering Voice Keens Delirium"
	},
	"wounded waters bleeding": {
		"img_small": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756732697/wounded_waters_bleeding_g91g4r.png",
		"img_large": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756733081/wounded_waters_bleeding_da1gp1.png",
		"image": "/Wounded_Waters_Bleeding_SpiritBoard.png",
		"caseName": "Wounded Waters Bleeding"
	}
}

export const SCENARIOS: Record<string, Scenario> = {
  "blitz": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737765/scenarios/blitz.png",
    "caseName": "Blitz"
  },
  "guard the isle's heart": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737766/scenarios/guard_the_isle%27s_heart.png",
    "caseName": "Guard the Isle's Heart"
  },
  "rituals of terror": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737767/scenarios/rituals_of_terror.png",
    "caseName": "Rituals of Terror"
  },
  "dahan insurrection": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737768/scenarios/dahan_insurrection.png",
    "caseName": "Dahan Insurrection"
  },
  "second wave": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737769/scenarios/second_wave.png",
    "caseName": "Second Wave"
  },
  "powers long forgotten": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737772/scenarios/powers_long_forgotten.png",
    "caseName": "Powers Long Forgotten"
  },
  "ward the shores": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737773/scenarios/ward_the_shores.png",
    "caseName": "Ward the Shores"
  },
  "rituals of the destroying flame": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737774/scenarios/rituals_of_the_destroying_flame.png",
    "caseName": "Rituals of the Destroying Flame"
  },
  "elemental invocation": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737775/scenarios/elemental_invocation.png",
    "caseName": "Elemental Invocation"
  },
  "despicable theft": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737776/scenarios/despicable_theft.png",
    "caseName": "Despicable Theft"
  },
  "the great river": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737777/scenarios/the_great_river.png",
    "caseName": "The Great River"
  },
  "a diversity of spirits": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737777/scenarios/a_diversity_of_spirits.png",
    "caseName": "A Diversity of Spirits"
  },
  "varied terrains": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737778/scenarios/varied_terrains.png",
    "caseName": "Varied Terrains"
  },
  "destiny unfolds": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737780/scenarios/destiny_unfolds.png",
    "caseName": "Destiny Unfolds"
  },
  "surges of colonization": {
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1757254868/Surges_of_Colonization_j2qrmf.png",
    "caseName": "Surges of Colonization"
  }
}

export const ADVESARIES: Record<string, Adversary> = {
  "brandenburg-prussia": {
    "flag": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737991/scenarios/brandenburg-prussia.png",
    "map": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738342/advesaries/brandenburg-prussia.png",
    "image": "/The_Kingdom_of_Brandenburg-Prussia_Adversary.png",
    "caseName": "Brandenburg-Prussia"
  },
  "england": {
    "flag": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737992/scenarios/england.png",
    "map": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738343/advesaries/england.png",
    "image": "The_Kingdom_of_England_Adversary.png",
    "caseName": "England"
  },
  "sweden": {
    "flag": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737992/scenarios/sweden.png",
    "map": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738345/advesaries/sweden.png",
    "image": "The_Kingdom_of_Sweden_Adversary.png",
    "caseName": "Sweden"
  },
  "france (plantation colony)": {
    "flag": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737993/scenarios/france_%28plantation_colony%29.png",
    "map": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738347/advesaries/france_%28plantation_colony%29.png",
    "image": "The_Kingdom_of_France_(Plantation_Colony)_Adversary.png",
    "caseName": "France"
  },
  "habsburg monarchy (livestock colony)": {
    "flag": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737994/scenarios/habsburg_monarchy_%28livestock_colony%29.png",
    "map": null,
    "image": "/The_Habsburg_Monarchy_(Livestock_Colony)_Adversary.png",
    "caseName": "Habsburg Monarchy (Livestock Colony)"
  },
  "russia": {
    "flag": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737994/scenarios/russia.png",
    "map": null,
    "image": "/The_Tsardom_of_Russia_Adversary.png",
    "caseName": "Russia"
  },
  "scotland": {
    "flag": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737995/scenarios/scotland.png",
    "map": null,
    "image": "/The_Kingdom_of_Scotland_Adversary.png",
    "caseName": "Scotland"
  },
  "habsburg mining expedition": {
    "flag": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756737995/scenarios/habsburg_mining_expedition.png",
    "map": null,
    "image": "/Habsburg_Mining_Expedition_Adversary.png",
    "caseName": "Habsburg Mining Expedition"
  }
}

export const CATEGORIZED_TAGS: Record<string,string[]> = {
  'Spirits': [...Object.keys(SPIRITS),'aspect'],
  'Advesaries': Object.keys(ADVESARIES).flatMap(ad=>[0,1,2,3,4,5,6].map(x=>`${ad} ${x}`)),
  'Scenarios': Object.keys(SCENARIOS),
  'Others': [
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
  'fear',
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
  'solo',
  'multi-spirit',
  ]
}
export const TAGS = Object.values(CATEGORIZED_TAGS).flat()

export const ASPECTS: Record<string, AspectCard> = {
  "pandemonium": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729994/pandemonium_xgttqe.png",
    "set": [
      "jagged earth"
    ],
    "aspect": "lightning's swift strike",
    "caseName": "Pandemonium"
  },
  "sunshine": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729996/sunshine_b35sdv.png",
    "set": [
      "jagged earth"
    ],
    "aspect": "river surges in sunlight",
    "caseName": "Sunshine"
  },
  "locus (1 of 2)": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729993/locus_1_of_2_nckfa0.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "serpent slumbering beneath the island",
    "caseName": "Locus (1 of 2)"
  },
  "locus (2 of 2)": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729993/locus_2_of_2_xrh9ci.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "serpent slumbering beneath the island",
    "caseName": "Locus (2 of 2)"
  },
  "travel": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729997/travel_rxdbxy.png",
    "set": [
      "promo pack 2",
      "feather and flame"
    ],
    "aspect": "river surges in sunlight",
    "caseName": "Travel"
  },
  "immense": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729992/immense_d6o7tm.png",
    "set": [
      "promo pack 2",
      "feather and flame"
    ],
    "aspect": "lightning's swift strike",
    "caseName": "Immense"
  },
  "spreading hostility": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729996/spreading_hostility_knw5i1.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "keeper of the forbidden wilds",
    "caseName": "Spreading Hostility"
  },
  "tactician": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729996/tactician_i2wyna.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "thunderspeaker",
    "caseName": "Tactician"
  },
  "wind": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729997/wind_lyovkp.png",
    "set": [
      "jagged earth"
    ],
    "aspect": "lightning's swift strike",
    "caseName": "Wind"
  },
  "resilience": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729995/resilience_kfnwpi.png",
    "set": [
      "jagged earth"
    ],
    "aspect": "vital strength of the earth",
    "caseName": "Resilience"
  },
  "enticing": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729991/enticing_gi930o.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "bringer of dreams and nightmares",
    "caseName": "Enticing"
  },
  "tangles": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729996/tangles_ncmc2u.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "a spread of rampant green",
    "caseName": "Tangles"
  },
  "belligerent and aggressive crops": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729991/belligerent_and_aggressive_crops_dqlqew.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "a spread of rampant green",
    "caseName": "Belligerent and Aggressive Crops"
  },
  "encircle": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729991/encircle_ucabmh.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "sharp fangs behind the leaves",
    "caseName": "Encircle"
  },
  "stranded": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729996/stranded_fmt8qf.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "shroud of silent mist",
    "caseName": "Stranded"
  },
  "madness": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729994/madness_gm7l7v.png",
    "set": [
      "jagged earth"
    ],
    "aspect": "shadows flicker like flame",
    "caseName": "Madness"
  },
  "lair": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729993/lair_swz5ol.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "lure of the deep wilderness",
    "caseName": "Lair"
  },
  "nourishing": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729994/nourishing_xmukwt.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "vital strength of the earth",
    "caseName": "Nourishing"
  },
  "violence": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729997/violence_m6temw.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "bringer of dreams and nightmares",
    "caseName": "Violence"
  },
  "haven": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729992/haven_rhs9x8.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "river surges in sunlight",
    "caseName": "Haven"
  },
  "transforming": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729996/transforming_ebeo0d.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "heart of the wildfire",
    "caseName": "Transforming"
  },
  "regrowth": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729995/regrowth_eovc0r.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "a spread of rampant green",
    "caseName": "Regrowth"
  },
  "foreboding": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729995/regrowth_eovc0r.png",
    "set": [
      "promo pack 2",
      "feather and flame"
    ],
    "aspect": "shadows flicker like flame",
    "caseName": "Foreboding"
  },
  "reach": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729995/reach_nwqmau.png",
    "set": [
      "jagged earth"
    ],
    "aspect": "shadows flicker like flame",
    "caseName": "Reach"
  },
  "mentor": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729994/mentor_dvxfj4.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "shifting memory of ages",
    "caseName": "Mentor"
  },
  "amorphous": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729992/amorphous_js0uez.png",
    "set": [
      "promo pack 2",
      "feather and flame"
    ],
    "aspect": "shadows flicker like flame",
    "caseName": "Amorphous"
  },
  "dark fire": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729992/dark_fire_kkpv7o.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "shadows flicker like flame",
    "caseName": "Dark Fire"
  },
  "sparking": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729995/sparking_oogqqk.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "lightning's swift strike",
    "caseName": "Sparking"
  },
  "smite the land with fulmination": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729995/smite_the_land_with_fulmination_swtur9.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "lightning's swift strike",
    "caseName": "Smite the Land with Fulmination"
  },
  "deeps (1 of 2)": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729992/deeps_1_of_2_afsoi9.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "ocean's hungry grasp",
    "caseName": "Deeps (1 of 2)"
  },
  "deeps (2 of 2)": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729992/deeps_2_of_2_vg13yn.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "ocean's hungry grasp",
    "caseName": "Deeps (2 of 2)"
  },
  "might": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729995/might_hvvkpy.png",
    "set": [
      "promo pack 2",
      "feather and flame"
    ],
    "aspect": "vital strength of the earth",
    "caseName": "Might"
  },
  "unconstrained": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729997/unconstrained_kfwagy.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "sharp fangs behind the leaves",
    "caseName": "Unconstrained"
  },
  "warrior": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729997/warrior_le5ep6.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "thunderspeaker",
    "caseName": "Warrior"
  },
  "intensify": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756729994/intensify_dhhft0.png",
    "set": [
      "nature incarnate"
    ],
    "aspect": "shifting memory of ages",
    "caseName": "Intensify"
  }
}

export const BLIGHT_CARDS: Record<string, BlightCard> = {
  "downward spiral": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738435/blight/downward_spiral.png",
    "set": [
      "spirit island"
    ],
    "islandHealth": "blighted",
    "text": "At the start of each Invader Phase, each Spirit destroys 1 of their Presence.",
    "blightPerPlayer": 5,
    "status": "active",
    "caseName": "Downward Spiral"
  },
  "disintegrating ecosystem": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738436/blight/disintegrating_ecosystem.png",
    "set": [
      "branch and claw"
    ],
    "islandHealth": "blighted",
    "text": "Immediately, on each board: Destroy 1 Beasts, then add 1 Blight to a land with Towns/Cities.",
    "blightPerPlayer": 5,
    "status": "active",
    "caseName": "Disintegrating Ecosystem"
  },
  "a pall upon the land": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738438/blight/a_pall_upon_the_land.png",
    "set": [
      "branch and claw"
    ],
    "islandHealth": "blighted",
    "text": "Immediately, on each board: Destroy 1 Presence and remove 1 Town.",
    "blightPerPlayer": 3,
    "status": "active",
    "caseName": "A Pall Upon the Land"
  },
  "slow dissolution of will": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738439/blight/slow_dissolution_of_will.png",
    "set": [
      "nature incarnate"
    ],
    "islandHealth": "blighted",
    "text": "Immediately: Each Spirit chooses one of Badlands, Beasts, or Wilds. (Put some of the chosen Tokens next to your Spirit Panel as a reminder.) Each Invader Phase: Each Spirit Replaces 1 Presence with their chosen type of Spirit Token. (The Presence goes to the Destroyed Presence supply.)",
    "blightPerPlayer": 3,
    "status": "active",
    "caseName": "Slow Dissolution of Will"
  },
  "memory fades to dust": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738440/blight/memory_fades_to_dust.png",
    "set": [
      "spirit island"
    ],
    "islandHealth": "blighted",
    "text": "At the start of each Invader Phase each Spirit Forgets a Power or Destroys 1 of their Presence.",
    "blightPerPlayer": 4,
    "status": "active",
    "caseName": "Memory Fades to Dust"
  },
  "invaders find the land to their liking": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738441/blight/invaders_find_the_land_to_their_liking.png",
    "set": [
      "jagged earth"
    ],
    "islandHealth": "healthy",
    "text": "Immediately: If the Terror Level is I / II / III, add 1 / 1.5 / 2 Fear Markers per player to the Fear pool. (Round down at Terror Level II.)",
    "blightPerPlayer": 2,
    "status": "active",
    "caseName": "Invaders Find the Land to Their Liking"
  },
  "blight corrodes the spirit": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738442/blight/blight_corrodes_the_spirit.png",
    "set": [
      "nature incarnate"
    ],
    "islandHealth": "blighted",
    "text": "Each Invader Phase: On Each Board, Destroy 1 Presence in a land with Blight.",
    "blightPerPlayer": 4,
    "status": "active",
    "caseName": "Blight Corrodes the Spirit"
  },
  "intensifying exploitation": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738444/blight/intensifying_exploitation.png",
    "set": [
      "nature incarnate"
    ],
    "islandHealth": "blighted",
    "text": "Ongoing, starting next turn: During Ravage Actions, Invaders deal +2 Damage (per land).",
    "blightPerPlayer": 5,
    "status": "active",
    "caseName": "Intensifying Exploitation"
  },
  "strong earth shatters slowly": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738444/blight/strong_earth_shatters_slowly.png",
    "set": [
      "jagged earth"
    ],
    "islandHealth": "healthy",
    "text": "Immediately: Each player adds 1 Blight (from this card) to a land adjacent to Blight.",
    "blightPerPlayer": 2,
    "status": "active",
    "caseName": "Strong Earth Shatters Slowly"
  },
  "shattered fragments of power": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738445/blight/shattered_fragments_of_power.png",
    "set": [
      "nature incarnate"
    ],
    "islandHealth": "blighted",
    "text": "Immediately: Draw 1 Major Power Card per Spirit plus 2 more. Each Spirit Takes 1 and gains 2 Energy. (Discard the 2 unselected cards.)",
    "blightPerPlayer": 2,
    "status": "active",
    "caseName": "Shattered Fragments of Power"
  },
  "erosion of will": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738447/blight/erosion_of_will.png",
    "set": [
      "branch and claw"
    ],
    "islandHealth": "blighted",
    "text": "Immediately, 2 Fear per player. Each Spirit Destroys 1 of their Presence and loses 1 Energy.",
    "blightPerPlayer": 3,
    "status": "active",
    "caseName": "Erosion of Will"
  },
  "the border of life and death": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738448/blight/the_border_of_life_and_death.png",
    "set": [
      "nature incarnate"
    ],
    "islandHealth": "healthy",
    "text": "Now and Each Invader Phase (until this card is replaced): Each Spirit with at least 2 Presence on the island Destroys 1 Presence, and may discard a Power Card to gain 1 Energy.",
    "blightPerPlayer": 1,
    "status": "active",
    "caseName": "The Border of Life and Death"
  },
  "tipping point": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738449/blight/tipping_point.png",
    "set": [
      "branch and claw"
    ],
    "islandHealth": "blighted",
    "text": "Immediately, destroy 3 Presence from each Spirit.",
    "blightPerPlayer": 5,
    "status": "retired",
    "caseName": "Tipping Point"
  },
  "unnatural proliferation": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738450/blight/unnatural_proliferation.png",
    "set": [
      "jagged earth"
    ],
    "islandHealth": "blighted",
    "text": "Immediately: Each Spirit adds 1 Presence to a land with their Presence. On Each Board: Add 1 Dahan to a land with Dahan, and 2 City to the land with the fewest Town/City (min. 1).",
    "blightPerPlayer": 3,
    "status": "active",
    "caseName": "Unnatural Proliferation"
  },
  "all things weaken": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738451/blight/all_things_weaken.png",
    "set": [
      "jagged earth"
    ],
    "islandHealth": "blighted",
    "text": "Ongoing, starting next turn: Invaders and Dahan have -1 Health (min. 1). The land takes Blight on 1 less Damage (normally 1). When you add Blight, it Destroys all Presence/Beasts in that land and 1 Presence (total) in an adjacent land.",
    "blightPerPlayer": 3,
    "status": "active",
    "caseName": "All Things Weaken"
  },
  "promising farmlands": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738452/blight/promising_farmlands.png",
    "set": [
      "branch and claw"
    ],
    "islandHealth": "blighted",
    "text": "Immediately, on each board: Add 1 Town and 1 City to an Inland land with no Towns/Cities.",
    "blightPerPlayer": 4,
    "status": "active",
    "caseName": "Promising Farmlands"
  },
  "attenuated essence": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738453/blight/attenuated_essence.png",
    "set": [
      "nature incarnate"
    ],
    "islandHealth": "blighted",
    "text": "Each Invader Phase: Each Spirit with at least 5 Presence on the island Destroys 1 Presence.",
    "blightPerPlayer": 4,
    "status": "active",
    "caseName": "Attenuated Essence"
  },
  "back against the wall": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738457/blight/back_against_the_wall.png",
    "set": [
      "branch and claw"
    ],
    "islandHealth": "blighted",
    "text": "Every Spirit Phase each Spirit gains +1 Energy and +1 Card Play.",
    "blightPerPlayer": 2,
    "status": "active",
    "caseName": "Back Against the Wall"
  },
  "aid from lesser spirits": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738459/blight/aid_from_lesser_spirits.png",
    "set": [
      "branch and claw"
    ],
    "islandHealth": "blighted",
    "text": "Immediately, draw 1 Minor Power Card per player plus 1 more. Give 1 to each Spirit. They may be used every turn as if played, but cost no Card Plays/Energy. Place unselected cards into the Minor Powers discard pile.",
    "blightPerPlayer": 2,
    "status": "active",
    "caseName": "Aid from Lesser Spirits"
  },
  "thriving communities": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738460/blight/thriving_communities.png",
    "set": [
      "jagged earth"
    ],
    "islandHealth": "blighted",
    "text": "Immediately, on each board: In 4 different lands with Explorer/Town, Replace 1 Town with 1 City or Replace 1 Explorer with 1 Town.",
    "blightPerPlayer": 4,
    "status": "active",
    "caseName": "Thriving Communities"
  },
  "power corrodes the spirit": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738461/blight/power_corrodes_the_spirit.png",
    "set": [
      "jagged earth"
    ],
    "islandHealth": "blighted",
    "text": "Each Invader Phase: Each Spirit Destroys 1 of their Presence if they have 3 or more Power Cards in play, or have a Power Card in play costing 4 or more (printed) Energy.",
    "blightPerPlayer": 4,
    "status": "active",
    "caseName": "Power Corrodes the Spirit"
  },
  "untended land crumbles": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738462/blight/untended_land_crumbles.png",
    "set": [
      "jagged earth"
    ],
    "islandHealth": "blighted",
    "text": "At the start of each Invader Phase, On Each Board: Add 1 Blight to a land adjacent to Blight. Spirits may prevent this on any/all boards; each board to be protected requires jointly paying 3 Energy or Destroying 1 Presence from that board.",
    "blightPerPlayer": 4,
    "status": "active",
    "caseName": "Untended Land Crumbles"
  },
  "thriving crops": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738463/blight/thriving_crops.png",
    "set": [
      "nature incarnate"
    ],
    "islandHealth": "healthy",
    "text": "Immediately: On Each Board, Build in 3 lands. (Build Actions in lands without Invaders normally Build 1 Town.)",
    "blightPerPlayer": 2,
    "status": "active",
    "caseName": "Thriving Crops"
  },
  "burn brightest before the end": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738464/blight/burn_brightest_before_the_end.png",
    "set": [
      "nature incarnate"
    ],
    "islandHealth": "blighted",
    "text": "Immediately: Each Spirit Adds 1 Presence to one of their lands or removes 1 Presence from one of their Presence Tracks. (Presence removed from the Presence Tracks goes to the Destroyed Presence supply.)",
    "blightPerPlayer": 2,
    "status": "active",
    "caseName": "Burn Brightest Before the End"
  }
}

export const EVENTS: Record<string, EventCard> = {
  "cultural assimilation": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738591/events/cultural_assimilation.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "terror 1 & 2",
        "name": "Cultural Assimilation",
        "text": "On Each Board: In a land with exactly 1 Dahan that has or is adjacent to a City, replace that Dahan with 1 Town."
      },
      {
        "type": "terror 3",
        "name": "Reprisal Against the Dahan",
        "text": "On Each Board: Choose a land with Dahan and Town/City. Invaders do 3 Damage to Dahan there, ignoring Defend Powers."
      },
      {
        "type": "beasts",
        "name": "Beasts Attack",
        "text": "Each Beasts deals 2 Damage. Remove any token that destroys Town/City."
      },
      {
        "type": "dahan",
        "name": "Reckless Offensive",
        "text": "On Each Board: Choose a land with at least 2 Dahan and at least 2 Town/City. Each Dahan destroys 1 Town/City. Add 1 Blight."
      }
    ],
    "status": "active",
    "caseName": "Cultural Assimilation"
  },
  "bureaucrats adjust funding": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738592/events/bureaucrats_adjust_funding.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "terror 1 & 2",
        "name": "Bureaucrats Adjust Funding",
        "text": "On Each Board with 9 or more Towns/Cities: Build Cards skip the highest-numbered matching land. On Each Board with 3 or fewer Towns/Cities: Build Cards cause 1 extra Build Action in the highest-numbered matching land. (This can Build in a land without Invaders.)"
      },
      {
        "type": "terror 3",
        "name": "Ransack and Run",
        "text": "After the Ravage Step, On Each Board: In the land with the most Cities (minimum 1), Ravage, then Remove 1 City."
      },
      {
        "type": "beasts",
        "name": "Terrifying Beasts",
        "text": "2 Fear per board with 2 or more Beasts."
      },
      {
        "type": "dahan",
        "name": "Coordinated Defense",
        "text": "When Invaders Ravage, if the land has both Dahan and Presence, Defend 5."
      }
    ],
    "status": "active",
    "caseName": "Bureaucrats Adjust Funding"
  },
  "interesting discoveries": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738593/events/interesting_discoveries.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "stage 1",
        "name": "Interesting Discoveries",
        "text": "On Each Board: Choose a Sacredsite. Gather 1 Explorer into its land, and add 1 additional Explorer."
      },
      {
        "type": "stages 2 & 3",
        "name": "Increasing Aggression",
        "text": "Invaders do +1 Damage (per land) when Ravaging."
      },
      {
        "type": "disease",
        "name": "Wheezelung Outbreak",
        "text": "On Each Board: Add 1 Disease to the Jungle/Wetland with the most Town/City (minimum 1)."
      },
      {
        "type": "dahan",
        "name": "Tend the Land",
        "text": "On Each Board: Remove 1 Blight from a land with at least 2 Dahan."
      }
    ],
    "status": "active",
    "caseName": "Interesting Discoveries"
  },
  "distant exploration": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738594/events/distant_exploration.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "terror 1",
        "name": "Distant Exploration",
        "text": "During the Explore step, Invaders Explore at +1 distance. (So a land 2 away from a Town/City/Ocean will be Explored into.)"
      },
      {
        "type": "terror 2 & 3",
        "name": "Fearful Mobs",
        "text": "When Ravaging, Invaders do +3 Damage (per land) in lands with 3 or more Invaders."
      },
      {
        "type": "disease",
        "name": "Grim Toll",
        "text": "On Each Board: Choose a land with Disease. In that land, do 2 Damage to Invaders and 2 Damage to Dahan."
      },
      {
        "type": "dahan",
        "name": "Fierce Mein",
        "text": "1 Fear per land with Invaders where Dahan outnumber Towns/Cities."
      }
    ],
    "status": "active",
    "caseName": "Distant Exploration"
  },
  "heavy farming": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738595/events/heavy_farming.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Heavy Farming",
        "text": "During the next normal Ravage, each Town does +1 Damage. (If there is no Ravage this Phase, leave this card by the Ravage Space until one happens.)"
      },
      {
        "type": "blighted island",
        "name": "Overcrowded Cities",
        "text": "On Each Board with City: Add 1 Blight to a land with City. Spirits may prevent this on any/all boards by destroying 2 Presence from each board to be protected."
      },
      {
        "type": "beasts",
        "name": "Prey on the Unwary",
        "text": "Each Beasts destroys 1 Explorer. Add 1 Beasts on a board without one."
      },
      {
        "type": "dahan",
        "name": "Coming of Age",
        "text": "On Each Board: Add 1 Dahan to a Jungle or Wetland with Dahan."
      }
    ],
    "status": "active",
    "caseName": "Heavy Farming"
  },
  "putting down roots": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738596/events/putting_down_roots.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Putting Down Roots",
        "text": "On an Inland land on Each Board: Replace 1 Explorer with 1 Town."
      },
      {
        "type": "blighted island",
        "name": "The Center Crumbles",
        "text": "On Each Board with Invaders: Add 1 Blight to an Inland land. Spirits may prevent this on any/all boards by destroying 3 Presence from each board to be protected."
      },
      {
        "type": "disease and strife",
        "name": "Stricken",
        "text": "In lands with Disease/Strife, Invaders skip Ravage Actions."
      },
      {
        "type": "dahan",
        "name": "Drive Off the Interlopers",
        "text": "Each player may Push 1 Explorer/Town from a land with Dahan."
      }
    ],
    "status": "active",
    "caseName": "Putting Down Roots"
  },
  "rising interest in the island": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738597/events/rising_interest_in_the_island.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "Rising Interest in the Island",
        "text": "Your island is unlike any the Invaders have seen. Their leaders begin to take interest in tales of strangeness. You may: IGNORE THEIR CURIOSITY • Return the top card of the Invader Deck to the box. (Skip cards specifically placed during Setup.) • On Each Board: Add 1 Town to a land without one. WEAVE LIES IN THE MINDS OF THEIR OBSERVERS Cost: 4 Energy per player. Aided by Air. • Return the top Fear Card to the box. • During the next normal Ravage, each Town/City deals +1 Damage."
      },
      {
        "type": "beasts",
        "name": "Beasts of the Jungle",
        "text": "On Each Board: Add 1 Beasts to a Jungle without Blight. 1 Fear if Invaders are Present."
      },
      {
        "type": "dahan",
        "name": "Traps and Snares",
        "text": "On Each Board: Add 1 Wilds to a land with Dahan."
      }
    ],
    "status": "active",
    "caseName": "Rising Interest in the Island"
  },
  "missionaries arrive": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738598/events/missionaries_arrive.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "Missionaries Arrive",
        "text": "They teach and spread lessons of a foreign god. You may: IGNORE THEIR CONTACT WITH THE DAHAN • For each board, discard the top Minor Power. If it has Sun, Push 1 Explorer from a land with Dahan. Otherwise, replace 1 Dahan with 1 Town. • After resolving this card, return it to the Event Deck under the top 2 cards. CURSE THE TONGUES OF THE FOREIGNERS Cost: 4 Energy per player. Aided by Sun. • Each Spirit: Add 1 Disease to a land with City. • 2 Fear per player. • During the next normal Ravage, City do +3 Damage."
      },
      {
        "type": "beasts",
        "name": "Prey on the Unwary",
        "text": "Each Beasts destroys 1 Explorer. Add 1 Beasts to a board without one."
      }
    ],
    "status": "active",
    "caseName": "Missionaries Arrive"
  },
  "invaders surge inland": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738599/events/invaders_surge_inland.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Invaders Surge Inland",
        "text": "On a Coastal land on Each Board: Move 1 Town one or two lands Inland."
      },
      {
        "type": "blighted island",
        "name": "Widening Destruction",
        "text": "On Each Board: Add 1 Blight to a land adjacent to a land with/adjacent to Towns/Cities. Spirits may prevent this on any/all boards by destroying 2 Presence from each board to be protected."
      },
      {
        "type": "disease",
        "name": "Grim Toll",
        "text": "On Each Board: Choose a land with Disease. In that land, do 2 Damage to Invaders and 2 Damage to Dahan."
      },
      {
        "type": "dahan",
        "name": "Canny Defense",
        "text": "During Ravage, in every land, Defend 1 per Dahan in the land."
      }
    ],
    "status": "active",
    "caseName": "Invaders Surge Inland"
  },
  "population rises": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738601/events/population_rises.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Population Rises",
        "text": "On Each Board: Add 1 Town to a land with Explorers/Towns."
      },
      {
        "type": "blighted island",
        "name": "Power Fades",
        "text": "Each Spirit chooses independently to: Destroy 2 of their Presence -or- Forget 2 of their Powers -or- Take 1 Blight from the Blight Card and remove it from the game."
      },
      {
        "type": "disease",
        "name": "Sandfever Outbreak",
        "text": "On Each Board: Add 1 Disease to the Sands or Mountains with the most Towns/Cities (minimum 1)."
      },
      {
        "type": "dahan",
        "name": "Offerings of Pattern and Dance",
        "text": "Each Spirit with at least 2 Dahan among all its lands gains 1 Energy."
      }
    ],
    "status": "active",
    "caseName": "Population Rises"
  },
  "new species spread": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738602/events/new_species_spread.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "New Species Spread",
        "text": "New plants and animals brought by the Invaders Damage the local ecology. You may: LET THE INVASIVE SPECIES BLOOM • For each board, discard the top Minor Power. If it is Fast, add 1 Blight to a land with Town/City. • After resolving this card, return it to the Event Deck under the top 2 cards. TRANSMUTE THE WORST OF THE SPECIES Cost: 4 Energy per player. Aided by Moon. • 1 Fear per player. On Each Board: Add 1 Beasts to a land with Town/City."
      },
      {
        "type": "disease",
        "name": "New Diseases",
        "text": "On half of the boards (rounding up), add 1 Disease to a land with both Dahan and Invaders. Do 2 Damage to Dahan there."
      },
      {
        "type": "dahan",
        "name": "Offerings of Pattern and Dance",
        "text": "Each Spirit with at least 2 Dahan among all its lands gains 1 Energy."
      }
    ],
    "status": "active",
    "caseName": "New Species Spread"
  },
  "investigation of dangers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738603/events/investigation_of_dangers.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "terror 1",
        "name": "Investigation of Dangers",
        "text": "On Each Board: Add 1 Explorer to a land without Invaders or Dahan."
      },
      {
        "type": "terror 2 & 3",
        "name": "Destroy the Unnatural!",
        "text": "Invaders do +3 Damage (per land) when Ravaging in lands with Presence."
      },
      {
        "type": "beasts",
        "name": "Prey on the Unwary",
        "text": "Each Beasts destroys 1 Explorer. Add 1 Beasts on a board without one."
      },
      {
        "type": "dahan",
        "name": "Rouse the Spirits",
        "text": "Each Spirit with at least 3 Dahan among all its lands may use a Slow Power now (instead of later)."
      }
    ],
    "status": "active",
    "caseName": "Investigation of Dangers"
  },
  "seeking the interior": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738605/events/seeking_the_interior.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "stage 1",
        "name": "Seeking the Interior",
        "text": "In each Coastal land, Push 1 Explorer one land Inland."
      },
      {
        "type": "stages 2 & 3",
        "name": "Local Diaspora",
        "text": "In the single land with the most Invaders, Push 1 Explorer/Town to each adjacent land."
      },
      {
        "type": "beasts",
        "name": "Beasts Prowl",
        "text": "Each Beasts generates 1 Fear if Invaders are present, and moves to an adjacent land if not."
      },
      {
        "type": "dahan",
        "name": "Forsake the Barren Land",
        "text": "On Each Board: Push 2 Dahan from a land with Blight to a land without Blight."
      }
    ],
    "status": "active",
    "caseName": "Seeking the Interior"
  },
  "promising farmland": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738606/events/promising_farmland.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Promising Farmland",
        "text": "When Exploring, once per board, place 1 Town instead of 1 Explorer."
      },
      {
        "type": "blighted island",
        "name": "New Cash Crops Take Hold",
        "text": "Invaders immediately Ravage in 1 terrain type not showing under any Invader Action. Spirits may prevent this on any/all boards by destroying 2 Presence from each board to be protected."
      },
      {
        "type": "beasts",
        "name": "Beasts Provoked",
        "text": "On Each Board: Add 1 Beasts to a land without Blight that has Town."
      },
      {
        "type": "dahan",
        "name": "Canny Defense",
        "text": "During Ravage, in every land, Defend 1 per Dahan in the land."
      }
    ],
    "status": "active",
    "caseName": "Promising Farmland"
  },
  "sacred sites under threat": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738606/events/sacred_sites_under_threat.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "Sacred Sites Under Threat",
        "text": "Invaders have begun to find hidden places of natural power. You may: LET THE ISLAND'S STRENGTH REPULSE THEM • Each Sacred Site Pushes 1 Explorer/Town to an adjacent land. • Remove 1 Blight per player from the Blight Card, returning it to the box. GUARD THEM YOURSELF, FOR WELL OR ILL Cost: 3 Energy per land where you do Damage. Aided by Fire. In each land with Sacred Site and Invaders: Either do 2 Damage -or- Destroy 1 Presence from each Spirit."
      },
      {
        "type": "beasts",
        "name": "Beasts Prowl",
        "text": "Each Beasts generates 1 Fear if Invaders are Present, and moves to an adjacent land if not."
      },
      {
        "type": "dahan",
        "name": "Spirit Speakers Solve Riddles of Power",
        "text": "Each Spirit with at least 4 Dahan among its lands gains a Minor Power."
      }
    ],
    "status": "active",
    "caseName": "Sacred Sites Under Threat"
  },
  "farmers seek the dahan for aid": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738608/events/farmers_seek_the_dahan_for_aid.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "Farmers Seek the Dahan for Aid",
        "text": "The Dahan are uncertain whether to teach the Invaders farming techniques more in tune with the island's life. You recommend they: SPURN THE INVADERS • On Each Board: 2 Damage to Dahan in a land with Town/City. • On Each Board: Add 1 Blight to a land with at least 2 Town/City. • Town/City have -1 Health (min. 1) until the end of the turn. TEACH THE INVADERS • On Each Board: Add 1 Town to a land with Dahan. • The next normal Ravage becomes a Build. (This could be on a future turn.)"
      },
      {
        "type": "disease",
        "name": "New Diseases",
        "text": "On half of the boards (rounding up), add 1 Disease to a land with both Dahan and Invaders. Do 2 Damage to Dahan there."
      }
    ],
    "status": "active",
    "caseName": "Farmers Seek the Dahan for Aid"
  },
  "tight-knit communities": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738608/events/tight-knit_communities.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Tight-Knit Communities",
        "text": "For the rest of the turn, Towns/Cities have +1 Health."
      },
      {
        "type": "blighted island",
        "name": "Blight Spreads",
        "text": "On Each Board: Add 1 Blight to a land adjacent to a land with Blight. Spirits may prevent this on any/all boards by destroying 2 Presence from each board to be protected."
      },
      {
        "type": "beasts",
        "name": "Prey on the Unwary",
        "text": "Each Beasts destroys 1 Explorer. Add 1 Beasts on a board without one."
      },
      {
        "type": "dahan",
        "name": "Coming of Age",
        "text": "On Each Board: Add 1 Dahan to a Coastal land with Dahan."
      }
    ],
    "status": "active",
    "caseName": "Tight-Knit Communities"
  },
  "urban development": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738610/events/urban_development.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Urban Development",
        "text": "During the next normal Ravage, each City deals +2 Damage. (If there is no Ravage this Phase, leave this card by the Ravage Space until one happens.)"
      },
      {
        "type": "blighted island",
        "name": "Festering Pits of Blight",
        "text": "On Each Board with Invaders: Add 1 Blight to a land with at least 2 Blight, but do not cascade."
      },
      {
        "type": "disease",
        "name": "Lingering Plagues",
        "text": "On Each Board: Add 1 Disease. Ignore Disease during Builds this Invader Phase."
      },
      {
        "type": "dahan",
        "name": "Fierce Mein",
        "text": "1 Fear per land with Invaders where Dahan outnumber Towns/Cities."
      }
    ],
    "status": "active",
    "caseName": "Urban Development"
  },
  "years of little rain": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738611/events/years_of_little_rain.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "Years of Little Rain",
        "text": "A terrible drought parches the island. You may: LET THE PLANTS DIE AND THE LAND WITHER • For each board, discard the top Minor Power. If it lacks Water, add 1 Blight to a Sands. • Towns, Cities, and Dahan have -1 Health (minimum 1) until the end of the turn. ACT TO EASE THE DROUGHT Cost: 4 Energy per player. Aided by Water. • Each Spirit may add 1 Presence to one of their lands with Dahan."
      },
      {
        "type": "beasts",
        "name": "Beasts Attack",
        "text": "Each Beasts deals 2 Damage. Remove any token that destroys any Towns/Cities."
      },
      {
        "type": "dahan",
        "name": "Canny Defense",
        "text": "During Ravage, in every land, Defend 1 per Dahan in the land."
      }
    ],
    "status": "active",
    "caseName": "Years of Little Rain"
  },
  "civic engagement": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738612/events/civic_engagement.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Civic Engagement",
        "text": "On Each Board: Remove 1 Strife. If you can't, Invaders do +1 Damage (per land) when Ravaging in lands with Towns/Cities."
      },
      {
        "type": "blighted island",
        "name": "Life's Web Torn Asunder",
        "text": "On Each Board with 6 or more Blight: Add 1 Blight to a land adjacent to Blight."
      },
      {
        "type": "beasts",
        "name": "Casualties of Fang and Sting",
        "text": "On Each Board: Destroy 1 Explorer/Town in a land with Beasts."
      },
      {
        "type": "dahan",
        "name": "Keep Far From the Lands of Plague",
        "text": "On Each Board: Push 3 Dahan from lands with Disease to lands without Disease."
      }
    ],
    "status": "active",
    "caseName": "Civic Engagement"
  },
  "cities rise": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738613/events/cities_rise.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Cities Rise",
        "text": "On Each Board: In the land with the most Town, Replace 2 Towns with 2 Cities. (If there is only 1 Town, instead Replace it with 1 City.)"
      },
      {
        "type": "blighted island",
        "name": "Depleted Soil",
        "text": "In lands with Towns/Cities, it only takes 1 Damage to add Blight."
      },
      {
        "type": "beasts",
        "name": "Beasts Chase Off Homesteaders",
        "text": "On Each Board: Push up to 2 Explorers or 1 Town from a land with Beasts."
      },
      {
        "type": "dahan",
        "name": "Careful Defense",
        "text": "When Invaders Ravage, if the land has Dahan, Defend 2."
      }
    ],
    "status": "active",
    "caseName": "Cities Rise"
  },
  "coastal towns multiply": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738614/events/coastal_towns_multiply.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Coastal Towns Multiply",
        "text": "On Each Board: Add 1 Town to a Coastal land adjacent to a Coastal Town."
      },
      {
        "type": "blighted island",
        "name": "Cooperation Among Towns",
        "text": "Invaders do +1 Damage (per land) when Ravaging in lands with Towns/Cities and no Strife."
      },
      {
        "type": "beasts",
        "name": "Explorers Blunder",
        "text": "On Each Board: Destroy 2 Explorers among lands with Beasts."
      },
      {
        "type": "dahan",
        "name": "Coming of Age",
        "text": "On Each Board: Add 1 Dahan to a land with Dahan and no Blight/Disease."
      }
    ],
    "status": "active",
    "caseName": "Coastal Towns Multiply"
  },
  "pull together in adversity": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738615/events/pull_together_in_adversity.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "terror 1 & 2",
        "name": "Pull Together in Adversity",
        "text": "For the rest of this turn, ignore 1 Strife on each Invader. (This includes not removing that Strife.)"
      },
      {
        "type": "terror 3",
        "name": "Purge the Land with Salt and Fire",
        "text": "On Each Board in a land with 2 or more Towns: Add 1 Blight without cascading. Add 2 Badlands. Remove all Towns."
      },
      {
        "type": "beasts",
        "name": "Explorers Blunder",
        "text": "On Each Board: Destroy 2 Explorers among lands with Beasts."
      },
      {
        "type": "dahan",
        "name": "Careful Defense",
        "text": "When Invaders Ravage, if the land has Dahan, Defend 2."
      }
    ],
    "status": "active",
    "caseName": "Pull Together in Adversity"
  },
  "seek new farmland": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738616/events/seek_new_farmland.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Seek New Farmland",
        "text": "In each land with 2 or more Towns, Push 1 Town to a land without Towns."
      },
      {
        "type": "blighted island",
        "name": "Voracious Consumption",
        "text": "On Each Board: After the Ravage Step, add 1 Blight to a land with a City and no Blight. Spirits may prevent this on any/all boards by Destroying 2 Presence from each board to be protected."
      },
      {
        "type": "disease",
        "name": "Plagues Bring Fear and Death",
        "text": "1 Fear per board with Disease. On Each Board: 2 Damage to Dahan in a land with Disease."
      },
      {
        "type": "dahan",
        "name": "Engage on Their Own Terms",
        "text": "During Ravage, Dahan only do 1 Damage each, but deal Damage before Invaders."
      }
    ],
    "status": "active",
    "caseName": "Seek New Farmland"
  },
  "wave of reconnaissance": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738617/events/wave_of_reconnaissance.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "stage 1",
        "name": "Wave of Reconnaissance",
        "text": "When Exploring: Add 1 additional Explorer to each land Explored."
      },
      {
        "type": "stages 2 & 3",
        "name": "Urbanization",
        "text": "In each land with at least 2 Towns, replace half the Towns (rounding up) with Cities."
      },
      {
        "type": "disease and strife",
        "name": "Stricken",
        "text": "Invaders do not Ravage in lands with Disease/Strife."
      },
      {
        "type": "dahan",
        "name": "Retreat",
        "text": "On Each Board: Push 2 Dahan from a land with Cities to a land without Cities."
      }
    ],
    "status": "active",
    "caseName": "Wave of Reconnaissance"
  },
  "hard-working settlers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738619/events/hard-working_settlers.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "Hard-Working Settlers",
        "text": "The latest round of settlers are regrettably diligent, focused, and curious. You may: ACT CAUTIOUSLY IN THE BACKGROUND On Each Board: • Push up to 2 Dahan. • Add 1 Town to a land without Towns. • Immediately Ravage in the land with the most Invaders that matches a Ravage Card. CREATE UNNERVING DISTRACTIONS ...at the cost of piquing their interest. • Ravage Cards skip up to one matching land on each board. (Players choose which.) • 1 Fear per player. • Remove the bottommost Stage II and Stage III Cards in the Invader Deck from the game."
      },
      {
        "type": "beasts",
        "name": "Beasts Prey on the Injured",
        "text": "This turn, Beasts also count as Badlands. On Each Board: Destroy a Damaged Invader in a land with Beasts."
      }
    ],
    "status": "active",
    "caseName": "Hard-Working Settlers"
  },
  "overconfidence": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738622/events/overconfidence.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "terror 1",
        "name": "Overconfidence",
        "text": "If you have any Earned Fear Cards, discard 2 of them now (so you don't get their text benefits). Otherwise, move 2 Earned Fear Markers per player to the top of the Fear pool."
      },
      {
        "type": "terror 2 & 3",
        "name": "Terror Breeds Aggression",
        "text": "For every 2 Fear Cards currently in the Earned Fear Cards pile, Invaders do +1 Damage (per land) when Ravaging."
      },
      {
        "type": "beasts",
        "name": "Beasts Multiply",
        "text": "On Each Board: Add 1 Beasts to a land adjacent to Beasts, then Destroy 1 Dahan in a land with Beasts."
      },
      {
        "type": "dahan",
        "name": "Coordinated Defense",
        "text": "When Invaders Ravage, if the land has both Dahan and Presence, Defend 5."
      }
    ],
    "status": "active",
    "caseName": "Overconfidence"
  },
  "strange tales attract explorers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738623/events/strange_tales_attract_explorers.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "stage 1",
        "name": "Strange Tales Attract Explorers",
        "text": "Now: 1 Fear per Spirit that has at least 1 Sacred Site. After advancing Invader Cards: Add 1 Explorer to each land with a Sacred Site."
      },
      {
        "type": "stages 2 & 3",
        "name": "Fortification",
        "text": "After advancing Invader Cards: Invaders Build in one terrain not shown under any Invader Action. (If there's no such terrain, nothing happens.)"
      },
      {
        "type": "beasts",
        "name": "Beasts Attack",
        "text": "Each Beasts deals 2 Damage. Remove any token that destroys any Towns/Cities."
      },
      {
        "type": "dahan",
        "name": "Coming of Age",
        "text": "On Each Board: Add 1 Dahan to a Mountain or Sands with Dahan."
      }
    ],
    "status": "active",
    "caseName": "Strange Tales Attract Explorers"
  },
  "slave rebellion": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738624/events/slave_rebellion.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "adversary event",
        "name": "Slave Rebellion",
        "text": "(Adversary Event - include only if specified) Discard and redraw if not playing against Kingdom of France."
      },
      {
        "type": "stages 1 & 2",
        "name": "Small Uprising",
        "text": "On Each Board: Add Strife to 1 Town. After finishing the Event Card, draw another one, then return this card to the Event Deck as per Setup."
      },
      {
        "type": "stage 3",
        "name": "Rebellion",
        "text": "On Each Board: Destroy 1 Town. Add Strife to any 2 Towns/Cities. Then, every Invader takes 1 Damage per Strife it has. After finishing this Event Card, draw another one. This card is discarded."
      },
      {
        "type": "dahan",
        "name": "Aid the Uprising",
        "text": "Invaders with Strife take 1 Damage per Dahan present. Add 1 Dahan per Town/City this destroys."
      }
    ],
    "status": "active",
    "caseName": "Slave Rebellion"
  },
  "dahan trade with the invaders": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738625/events/dahan_trade_with_the_invaders.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "Dahan Trade with the Invaders",
        "text": "Some seek knowledge, others are interested in tools and trade goods, still others simply curious. All hope to avoid violence, and the Invaders seem amenable - at least for now. You may: IGNORE THEIR INTEREST • Dahan do not participate in Ravages this turn. DISPLAY YOUR WRATH AT THIS BETRAYAL Cost: 2 Energy per player, aided by Fire. • Each Spirit with Dahan in their lands Destroys 1 of them and generates 1 Fear. CHANGE AND HELP THEM LEARN FROM THE ENEMY Cost: 6 Energy per player, aided by Air. • Dahan do not participate in Ravages this turn. • Each Spirit Forgets a Power Card. • From next turn on, each Dahan provides Defend 1 in its land. (There is a Reminder Card for this.)"
      },
      {
        "type": "disease",
        "name": "Outbreaks Shift",
        "text": "On Each Board: Push 1 Disease to the adjacent land with the most Invaders (min. 1)."
      }
    ],
    "status": "active",
    "caseName": "Dahan Trade with the Invaders"
  },
  "fortune-seekers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738626/events/fortune-seekers.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Fortune-Seekers",
        "text": "The next Explore Card matches all lands without Towns/Cities instead of the printed land type. Ignore any Escalation on it."
      },
      {
        "type": "blighted island",
        "name": "The Land's Bounty Exhausted",
        "text": "In lands without Presence, it only takes 1 Damage to add Blight."
      },
      {
        "type": "disease",
        "name": "Grim Toll",
        "text": "On Each Board: Choose a land with Disease. In that land, 2 Damage to Invaders and 2 Damage to Dahan."
      },
      {
        "type": "dahan",
        "name": "Tell the Old Stories",
        "text": "Each Spirit with at least 2 Dahan among its lands either Reclaims 1 Power Card or re-gains a Unique Power it previously Forgot."
      }
    ],
    "status": "active",
    "caseName": "Fortune-Seekers"
  },
  "wounded lands attract explorers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738627/events/wounded_lands_attract_explorers.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Wounded Lands Attract Explorers",
        "text": "On Each Board: Add 1 Explorer to a land with Blight."
      },
      {
        "type": "blighted island",
        "name": "The World's Vibrance Fades",
        "text": "Remove 1 Blight per player from the Blight Card, returning it to the box. Each Spirit may prevent 1 Blight from being Removed by Destroying 2 of their Presence."
      },
      {
        "type": "beasts",
        "name": "Beasts Chase Off Homesteaders",
        "text": "On Each Board: Push up to 2 Explorer or 1 Town from a land with Beasts."
      },
      {
        "type": "dahan",
        "name": "Raiding and Retaliation",
        "text": "In each land with Town/City: 1 Damage per Dahan, then each surviving Town/City deals 1 Damage to Dahan. (Defend/Strife apply normally.)"
      }
    ],
    "status": "active",
    "caseName": "Wounded Lands Attract Explorers"
  },
  "numinous crisis": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738628/events/numinous_crisis.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "Numinous Crisis",
        "text": "The spiritual energy of the island weakens as life's connections grow ever more tattered. You may: DRAW STRENGTH FROM IT WHILE YOU CAN • Remove 1 Blight per player from the Blight Card. Then, if the Blight Card has not flipped, keep Removing Blight until it flips. Gain 3 Energy per Blight Removed, divided as evenly as possible among all Spirits. POUR YOUR STRENGTH INTO THE ISLAND • Each Spirit either pays 3 Energy, Forgets 2 Power Cards, or returns 1 Presence to their Presence tracks."
      },
      {
        "type": "disease",
        "name": "Plagues Bring Fear and Death",
        "text": "1 Fear per board with Disease. On Each Board: 2 Damage to Dahan in a land with Disease."
      },
      {
        "type": "dahan",
        "name": "Careful Defense",
        "text": "When Invaders Ravage, if the land has Dahan, Defend 2."
      }
    ],
    "status": "active",
    "caseName": "Numinous Crisis"
  },
  "outpaced": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738629/events/outpaced.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "individual choice",
        "name": "Outpaced",
        "text": "Humanity has always been faster than you, but the Invaders' terrifying speed catches you off guard. Each Spirit chooses independently for each of their Slow Power Cards played this turn: STAY STEADY AND SLOW • Discard the Power Card. • Gain 1 Energy, plus the card's printed Energy cost. WORK TO MATCH THEIR PACE • Pay 3 Energy -or- destroy 2 Presence. • You may choose to resolve the Power Card now. (Instead of during the Slow Phase.)"
      },
      {
        "type": "disease",
        "name": "Lingering Plagues",
        "text": "On Each Board: Add 1 Disease. Ignore Disease during Builds this Invader Phase."
      },
      {
        "type": "dahan",
        "name": "Raids in Force",
        "text": "Each Spirit chooses a different land where Dahan outnumber Towns/Cities. Each Dahan there deals 1 Damage."
      }
    ],
    "status": "retired",
    "caseName": "Outpaced"
  },
  "thriving trade": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738630/events/thriving_trade.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Thriving Trade",
        "text": "On Each Board: Add 1 City to a Coastal land with City."
      },
      {
        "type": "blighted island",
        "name": "Partitioned Wilderness",
        "text": "On Each Board: If there are 4 or more lands with Town, add 1 Blight to a land with or adjacent to Town. Spirits may prevent this on any/all boards by Destroying 3 Presence from each board to be protected."
      },
      {
        "type": "disease",
        "name": "Pestilence Arrives on Canvas Sails",
        "text": "On Each Board: Add 1 Disease to the Coastal land with the most Town/City (min. 1). In that land, 3 Damage to Dahan."
      },
      {
        "type": "dahan",
        "name": "Clever Cooperation",
        "text": "Each Spirit may Push 1 of their Presence from a land with Dahan. 2 Damage in the land Pushed to."
      }
    ],
    "status": "active",
    "caseName": "Thriving Trade"
  },
  "gradual corruption": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738632/events/gradual_corruption.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Gradual Corruption",
        "text": "On Each Board: Add 1 Blight to a land with Towns/Cities. Spirits may prevent this on any/all boards by paying X Energy per board to protect, where X is the number of cards in the Invader discard. (This may be 0.)"
      },
      {
        "type": "blighted island",
        "name": "Ravaged Wilderness",
        "text": "On Each Board: Remove 1 Beasts from a land with Blight. Remove 1 Wilds from a land with Blight."
      },
      {
        "type": "disease",
        "name": "Fatalities Rise",
        "text": "In each land with Disease, 1 Damage to each Invader and 1 Damage to each Dahan. Remove 1 Disease from each land where this Destroys any Towns/Cities."
      },
      {
        "type": "dahan",
        "name": "Blessings of Bounty and Health",
        "text": "Each Spirit may add 1 Dahan to one of its lands with Dahan."
      }
    ],
    "status": "active",
    "caseName": "Gradual Corruption"
  },
  "eager explorers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738633/events/eager_explorers.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "terror 1",
        "name": "Eager Explorers",
        "text": "On Each Board: After the first successful Build Action, add 1 Explorer to an adjacent land without Invaders."
      },
      {
        "type": "terror 2 & 3",
        "name": "Xenophobia",
        "text": "When Ravaging in lands with Dahan, each individual Invader does -1 Damage to the land and +1 Damage to Dahan."
      },
      {
        "type": "beasts",
        "name": "Beasts Chase Off Homesteaders",
        "text": "On Each Board: Push up to 2 Explorers or 1 Town from a land with Beasts."
      },
      {
        "type": "dahan",
        "name": "At Their Gates Demanding Redress",
        "text": "2 Fear per land with Dahan and City."
      }
    ],
    "status": "active",
    "caseName": "Eager Explorers"
  },
  "sprawl contained by the wilds": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738634/events/sprawl_contained_by_the_wilds.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Sprawl Contained by the Wilds",
        "text": "On Each Board: Add 1 Wilds to a land without Invaders. Build in the land with the most Towns/Cities (min. 1)."
      },
      {
        "type": "blighted island",
        "name": "Dissolution Threatens",
        "text": "Spirits are losing awareness and control of pieces of themselves. Each Spirit chooses: ACCEPT THIS FRAGMENTATION Destroy 2 Presence, adding 1 Wilds in place of each. FOCUS YOUR WILL TOWARDS WHOLENESS Add 1 of your Destroyed Presence to one of your lands. Next turn, all your Powers are Slow and cannot be Fast."
      },
      {
        "type": "beasts",
        "name": "Explorers Blunder",
        "text": "On Each Board: Destroy 2 Explorers among lands with Beasts."
      },
      {
        "type": "dahan",
        "name": "Lay Ambushes",
        "text": "During Ravage, Dahan deal Damage at the same time as Invaders."
      }
    ],
    "status": "active",
    "caseName": "Sprawl Contained by the Wilds"
  },
  "accumulated devastation": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738637/events/accumulated_devastation.png",
    "set": [
      "nature incarnate"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Accumulated Devastation",
        "text": "On Each Board: During the first successful Ravage Action (in one land) this Invader Phase, increase the total Damage ravaging Invaders deal to each land (but not to Dahan) by the current Invader Stage. Do this for at most one Ravage Action per board (for one Ravage Action in one land)."
      },
      {
        "type": "blighted island",
        "name": "The World's Vibrance Fades",
        "text": "Remove 1 Blight per player from the Blight Card, returning it to the box. Each Spirit may prevent 1 Blight from being removed by destroying 2 of their Presence."
      },
      {
        "type": "beasts",
        "name": "Territorial Beasts",
        "text": "On Each Board: Isolate a land with Beasts. 1 Fear if Invaders are present."
      },
      {
        "type": "dahan",
        "name": "Years of Health and Harmony",
        "text": "On Each Board with 5 or more Dahan: Add 1 Dahan to the land with the most Dahan."
      }
    ],
    "status": "active",
    "caseName": "Accumulated Devastation"
  },
  "resourceful populace": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738638/events/resourceful_populace.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "terror 1",
        "name": "Resourceful Populace",
        "text": "For the rest of this turn, after an Action Destroys 1 or more Towns/Cities, add 1 Town to an adjacent land. (If there are no adjacent lands - e.g., due to Isolate - don't add anything.)"
      },
      {
        "type": "terror 2 & 3",
        "name": "Strip the Land Bare",
        "text": "Towns each do +1 Damage when Ravaging. After a Ravage Action adds Blight, Remove 1 Explorer and 1 Town from the Ravaged land."
      },
      {
        "type": "disease",
        "name": "Virulence Among Close-Packed Homes",
        "text": "On Each Board: Add 1 Disease to the Inland land with the most Towns/Cities (min. 1)."
      },
      {
        "type": "dahan",
        "name": "Offerings of Story and Season",
        "text": "Each Spirit with at least 3 Dahan among all its lands gains 1 Energy and may Reclaim 1 Card."
      }
    ],
    "status": "active",
    "caseName": "Resourceful Populace"
  },
  "life's balance tilts": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738639/events/life%27s_balance_tilts.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "Life's Balance Tilts",
        "text": "The energies of life shift towards destruction, bringing wasting and disease to the animals of the island. Death is a part of life, but does this go too far? You may: LET DESTRUCTION HAVE ITS DAY • On Each Board: Remove 1 Beasts. Add 1 Disease. • For Each Board: Discard the top Minor Power. If it is Fast, add 1 Blight. • Invaders and Dahan have -1 Health (min. 1) this turn. FORTIFY THE RESILIENCE OF LIFE Cost: 4 Energy per player, aided by Animal. • On Each Board: Add 1 Beasts. Remove 1 Disease. • For Each Board: Discard the top Minor Power. If it is Slow, Remove 1 Blight. • Invaders and Dahan have +1 Health this turn."
      },
      {
        "type": "dahan",
        "name": "A Thousand Small Struggles",
        "text": "On Each Board with 4 or more Towns/Cities and 4 or fewer Dahan: Add 1 Blight to a land without Dahan."
      }
    ],
    "status": "active",
    "caseName": "Life's Balance Tilts"
  },
  "ethereal conjunction": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738640/events/ethereal_conjunction.png",
    "set": [
      "nature incarnate"
    ],
    "sections": [
      {
        "type": "individual choice",
        "name": "Ethereal Conjunction",
        "text": "A confluence of spiritual forces gathers into an unformed maelstrom. Each Spirit chooses: ENDURE ITS FORCES AS BEST YOU CAN "
      },
      {
        "type": "disease",
        "name": "Irregular Outbreaks",
        "text": "Disease doesn't prevent Builds this Invader Phase. 1 Fear per board with Disease."
      },
      {
        "type": "dahan",
        "name": "Tend to the Living Earth",
        "text": "On Each Board with 5 or more Dahan: Remove 1 Blight in a land with Dahan."
      }
    ],
    "status": "active",
    "caseName": "Ethereal Conjunction"
  },
  "far-off wars touch the island": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738642/events/far-off_wars_touch_the_island.png",
    "set": [
      "nature incarnate"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "Far-off Wars Touch the Island",
        "text": "Invaders from a different, distant land launch an assault upon the island while the Invaders here rally together in a wave of nationalism. Defending the island with them might come at too high a price. "
      },
      {
        "type": "badlands",
        "name": "Ecosystem Damage",
        "text": "On Each Board: Add 1 Badlands to a land with Blight."
      },
      {
        "type": "dahan",
        "name": "Return to Old Pillars",
        "text": "On Each Board: Gather 1 or 2 Dahan into a land with Dahan Setup symbols."
      }
    ],
    "status": "active",
    "caseName": "Far-off Wars Touch the Island"
  },
  "the frontier calls": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738643/events/the_frontier_calls.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "The Frontier Calls",
        "text": "Explore Actions add +1 Explorer to lands without Towns/Cities."
      },
      {
        "type": "blighted island",
        "name": "Self-Sacrifice Buys Time",
        "text": "Destroy 1 Presence from each Spirit. The next X Blight added to the island this turn come from the box instead of the Blight Card, where X is the number of Spirits. (Place this card on the Blight Card as reminder.)"
      },
      {
        "type": "beasts",
        "name": "Lair in Untamed Lands",
        "text": "On Each Board: Add 1 Beasts to a land without Towns/Cities/Blight."
      },
      {
        "type": "dahan",
        "name": "Seek Out New Grounds",
        "text": "On Each Board: Gather 1 or 2 Dahan into a land without Dahan Setup symbols."
      }
    ],
    "status": "active",
    "caseName": "The Frontier Calls"
  },
  "an ominous dawn": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738645/events/an_ominous_dawn.png",
    "set": [
      "nature incarnate"
    ],
    "sections": [
      {
        "type": "terror 1",
        "name": "An Ominous Dawn",
        "text": "1 Fear per Power Card in play that generates Fear. (In its instructions, not by destroying Towns/Cities. Count thresholds even if you don't have the Elements. Generated Fear can't cause Wavering Resolve.)"
      },
      {
        "type": "terror 2 & 3",
        "name": "Wavering Resolve",
        "text": "Remove 1 Health worth of Invaders per Power Card in play that generates Fear. (In its instructions, not by destroying Towns/Cities. Count thresholds even if you don't have the Elements.)"
      },
      {
        "type": "badlands and beasts",
        "name": "Dangerous Lands",
        "text": "On Each Board: 1 Damage in a land with Badlands/Beasts. 1 Damage to Dahan in a land with Badlands/Beasts and Dahan."
      },
      {
        "type": "dahan",
        "name": "Waning Support",
        "text": "On Each Board with Towns/Cities ...and 5 or fewer Dahan: Destroy 1 Presence. ...and 3 or fewer Dahan: Also Add 1 Blight to a land with Towns/Cities."
      }
    ],
    "status": "active",
    "caseName": "An Ominous Dawn"
  },
  "a strange madness among the beasts": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738648/events/a_strange_madness_among_the_beasts.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "A Strange Madness Among the Beasts",
        "text": "They grow even wilder and more savage. You may: Let Them Rampage Unto Death • Each Beasts destroys 1 Dahan. • Remove 1 Beasts from each board. Guide the Madness Cost: 3 Energy per Beasts you decide to keep on the Island (min 3 Energy). Aided by Animal. • Remove any number of Beasts. • Each Spirit may Push 1 Beasts to an adjacent land."
      },
      {
        "type": "beasts",
        "name": "Savage Frenzy",
        "text": "Each Beasts destroys 1 Explorer and deals 2 Damage."
      },
      {
        "type": "dahan",
        "name": "Seek a Safer Home",
        "text": "On Each Board: Push 2 Dahan from a land with Beasts/Disease/Wilds to a land without any of these tokens."
      }
    ],
    "status": "retired",
    "caseName": "A Strange Madness Among the Beasts"
  },
  "visions out of time": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738649/events/visions_out_of_time.png",
    "set": [
      "nature incarnate"
    ],
    "sections": [
      {
        "type": "individual choice",
        "name": "Visions Out of Time",
        "text": "A Spirit more loosely time-moored than most warns of catastrophe's subtle seeds. Each Spirit chooses: LET THE WARNING WAFT INTO DAYS PAST Lose 1 Energy and replace your most expensive non-Unique Power Card in hand or discard pile (combined) with one of the same type: Reveal the top 4 cards of the deck, Take 1, put it where your card is, then put your card in that deck's discard. HEAD OFF THE PROBLEMS YOURSELF Add 1 Omen token (Scenario Marker) to the land without Omens that has the most Invaders (min. 1). After the Ravage Step next turn, at each Omen: 2 Fear. Invaders Ravage. Remove 1 Omen."
      },
      {
        "type": "beasts",
        "name": "Prey on the Heedless",
        "text": "In each land with Beasts: 1 Damage per Beasts."
      },
      {
        "type": "dahan",
        "name": "Strength from Trade",
        "text": "Lands with Dahan have Defend 2. In lands with Towns/Cities and no Dahan, Ravage Actions do +1 Damage."
      }
    ],
    "status": "active",
    "caseName": "Visions Out of Time"
  },
  "war touches the island's shores": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738650/events/war_touches_the_island%27s_shores.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "War Touches the Island's Shores",
        "text": "Invaders from a different faraway land assault the ones here, torching farms and bombarding Cities. You may: ALLOW THE ATTACKS • For each board, discard the top Major Power. Deal its Energy in Damage to Invaders and the land in the Coastal land with the most Towns/Cities (minimum 1). Defend reduces the Damage. HELP REPEL THE NEWCOMERS Cost: 1 Energy per player. • Add a Fear Card to the top of the Fear Deck."
      },
      {
        "type": "beasts",
        "name": "Beasts Find New Homes",
        "text": "On Each Board: Push 1 Beasts to an adjacent land without Blight. 1 Fear if Invaders are present there."
      },
      {
        "type": "dahan",
        "name": "Reclaim Territory",
        "text": "Each player may Push 1 Dahan to an adjacent land, doing 1 Damage there."
      }
    ],
    "status": "replaced",
    "caseName": "War Touches the Island's Shores"
  },
  "harvest bounty, harvest dust": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738651/events/harvest_bounty%2C_harvest_dust.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "stages 1 & 2",
        "name": "Harvest Bounty, Harvest Dust",
        "text": "If the island is Healthy, On Each Board: Choose a land with Towns/Cities. Ravage there. If the island is Blighted, On Each Board: Push 1 Town from a land with 2 or more Towns/Cities to a land without Towns/Cities."
      },
      {
        "type": "stage 3",
        "name": "Widespread Clearcutting",
        "text": "On Each Board: Choose a land with Towns/Cities. Add 1 Blight there, without cascading. Players may Destroy 2 Presence/Dahan in that land to prevent adding Blight."
      },
      {
        "type": "beasts",
        "name": "Explorers Blunder",
        "text": "On Each Board: Destroy 2 Explorers among lands with Beasts."
      },
      {
        "type": "dahan",
        "name": "Coordinated Strikes",
        "text": "In each land with 3 or more Dahan, 2 Damage and Defend 2."
      }
    ],
    "status": "active",
    "caseName": "Harvest Bounty, Harvest Dust"
  },
  "focused farming": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738652/events/focused_farming.png",
    "set": [
      "nature incarnate"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Focused Farming",
        "text": "On Each Board: Add 1 Explorer and 1 Town to a land with Towns/Blight."
      },
      {
        "type": "blighted island",
        "name": "Essence Disperses",
        "text": "Each Spirit chooses independently to: Forget 1 Power Card. -or- Lose 2 Energy (to min.0) and Destroy 1 Presence. In the land where you destroyed Presence, return 1 Blight to the box (if possible)."
      },
      {
        "type": "beasts",
        "name": "Explorers Blunder",
        "text": "On Each Board: Destroy 2 Explorers among lands with Beasts."
      },
      {
        "type": "dahan",
        "name": "Offerings of Story and Season",
        "text": "Each Spirit with at least 3 Dahan among its lands gains 1 Energy and may Reclaim 1 Card."
      }
    ],
    "status": "active",
    "caseName": "Focused Farming"
  },
  "influx of settlers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738653/events/influx_of_settlers.png",
    "set": [
      "nature incarnate"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Influx of Settlers",
        "text": "On the single board with the most Towns/Cities: Add 1 Town per player, split between as many different lands as possible. (This will usually be 1 Town per chosen land.)"
      },
      {
        "type": "blighted island",
        "name": "Lethargy and Degeneration",
        "text": "On Each Board: Skip the first Ravage Action (in one land). Add 1 Blight to a land with Towns/Cities. Spirits may prevent either/both effects on any/all boards (choose per board) by Destroying 2 Presence from each board to be protected."
      },
      {
        "type": "beasts",
        "name": "Sand Stalkers",
        "text": "On Each Board: Add 1 Beasts to the Sands with the most Invaders. 1 Fear if Invaders are present there."
      },
      {
        "type": "dahan",
        "name": "Network of Support and Trade",
        "text": "When Invaders Ravage, if the land has Dahan, Defend 1 + Defend 1 per adjacent Dahan."
      }
    ],
    "status": "active",
    "caseName": "Influx of Settlers"
  },
  "lesser spirits imperiled": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738654/events/lesser_spirits_imperiled.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "Lesser Spirits Imperiled",
        "text": "The Invaders' spread is threatening many of the island's smaller Spirits. You may: TEND TO YOUR OWN STRENGTH • Each Spirit gains 1 Energy. • Discard 1 Minor Power per player from the deck. For each with Plant, Remove 1 Blight from the Blight Card, returning it to the box. For each with Animal, Destroy 1 Dahan in a land with Blight. FORGE A WEB OF MUTUAL SUPPORT Cost: 4 Energy per player, aided by Plant. • Each Spirit Destroys 1 of their Presence. • Each Spirit gains 1 permanent Element for the rest of the game. (Choose separately, now.)"
      },
      {
        "type": "beasts",
        "name": "Quit the Farmed Lands",
        "text": "On Each Board: Push 1 Beasts to a land without Town/City. 1 Fear if Explorer are present there."
      },
      {
        "type": "dahan",
        "name": "Return to Old Pillars",
        "text": "On Each Board: Gather 1 or 2 Dahan into a land with Dahan Setup symbols."
      }
    ],
    "status": "active",
    "caseName": "Lesser Spirits Imperiled"
  },
  "no bravery without numbers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738655/events/no_bravery_without_numbers.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "stages 1 & 2",
        "name": "No Bravery Without Numbers",
        "text": "Invaders do not Ravage in lands unless there are more Invaders than the current Terror Level."
      },
      {
        "type": "stage 3",
        "name": "Courage of the Crowd",
        "text": "Invaders do not Ravage in lands unless there are more Invaders than the current Terror Level. Ravage actions do +2 Damage (per land)."
      },
      {
        "type": "beasts",
        "name": "Prey on the Heedless",
        "text": "In each land with Beasts, 1 Damage per Beasts."
      },
      {
        "type": "dahan",
        "name": "Leave the Hostile Land",
        "text": "In each land, Push 1 Dahan per Badlands/Disease to lands without Badlands/Disease."
      }
    ],
    "status": "active",
    "caseName": "No Bravery Without Numbers"
  },
  "smaller ports spring up": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738656/events/smaller_ports_spring_up.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "stages 1 & 2",
        "name": "Smaller Ports Spring Up",
        "text": "On Each Board with exactly 1 Coastal City: Add 1 Town to a Coastal land without Cities."
      },
      {
        "type": "stage 3",
        "name": "Extensive Building",
        "text": "On Each Board: Build in a land with Invaders not matching a Build Card."
      },
      {
        "type": "disease and strife",
        "name": "Stricken",
        "text": "In lands with Disease/Strife, Invaders skip Ravage Actions."
      },
      {
        "type": "dahan",
        "name": "Settlers Encroach Too Far",
        "text": "On Each Board: Choose a land with Towns and Dahan. Push 1 Town per 2 Dahan there."
      }
    ],
    "status": "active",
    "caseName": "Smaller Ports Spring Up"
  },
  "search for unclaimed land": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738657/events/search_for_unclaimed_land.png",
    "set": [
      "nature incarnate"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Search for Unclaimed Land",
        "text": "On Each Board: Explore in the land with the fewest total Invaders/Dahan (no source required)."
      },
      {
        "type": "blighted island",
        "name": "Widespread Hunting",
        "text": "When Towns/Cities Ravage in a land:"
      },
      {
        "type": "disease",
        "name": "Plagues in Populous Lands",
        "text": "On Each Board: Add 1 Disease to a land with 3 or more Invaders"
      },
      {
        "type": "dahan",
        "name": "Spreading Conflict Prompts Caution",
        "text": "On Each Board: Push up to 3 Dahan from a land matching a Ravage card to a land not matching a Ravage card."
      }
    ],
    "status": "active",
    "caseName": "Search for Unclaimed Land"
  },
  "mapmakers chart the wild": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738658/events/mapmakers_chart_the_wild.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "stages 1 & 2",
        "name": "Mapmakers Chart the Wild",
        "text": "Ignore Wilds during the Explore Step. On Each Board without Wilds: Explore Actions add +1 Explorer (in each land successfully Explored)."
      },
      {
        "type": "stage 3",
        "name": "Increasing Aggression",
        "text": "Invaders do +1 Damage (per land) when Ravaging."
      },
      {
        "type": "beasts",
        "name": "Prey on the Heedless",
        "text": "In each land with Beasts, 1 Damage per Beasts."
      },
      {
        "type": "dahan",
        "name": "Coming of Age",
        "text": "On Each Board: Add 1 Dahan to a land with Dahan and no Badlands/Beasts/Disease/Wilds."
      }
    ],
    "status": "active",
    "caseName": "Mapmakers Chart the Wild"
  },
  "relentless optimism": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738659/events/relentless_optimism.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "terror 1",
        "name": "Relentless Optimism",
        "text": "For the rest of this turn, don't generate Fear for Destroying Towns/Cities."
      },
      {
        "type": "terror 2 & 3",
        "name": "Cultures Mix and Clash",
        "text": "On Each Board: If Dahan outnumber Towns/Cities by 2 or more, Replace 1 Town with 1 Dahan. If Towns/Cities outnumber Dahan by 2 or more, Replace 1 Dahan with 1 Town."
      },
      {
        "type": "disease",
        "name": "Foreign Diseases",
        "text": "On Each Board, in the land with the mnost combined Invaders + Dahan (min. 1 of each): Add 1 Disease. 2 Damage to Dahan."
      },
      {
        "type": "dahan",
        "name": "Offerings of Pattern and Dance",
        "text": "Each Spirit with at least 2 Dahan among all its lands gains 1 Energy."
      }
    ],
    "status": "active",
    "caseName": "Relentless Optimism"
  },
  "terror spikes upwards": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738660/events/terror_spikes_upwards.png",
    "set": [
      "nature incarnate"
    ],
    "sections": [
      {
        "type": "terror 1 & 2",
        "name": "Terror Spikes Upwards",
        "text": "If you have any Earned Fear Cards, resolve the first one now as if the Terror Level were 1 higher (then discard it). Otherwise, 1 Fear per player. (Generated Fear can't cause Final Harvest.)"
      },
      {
        "type": "terror 3",
        "name": "Final Harvest",
        "text": "Each City does +3 Damage during Ravage Actions. After each Ravage Action, Remove 1 Town/City from that land."
      },
      {
        "type": "badlands and beasts",
        "name": "Secure Settled Territory",
        "text": "On Each Board: In a land with Badlands/Beasts and Towns/Cities: Destroy 1 Badlands/Beasts. 1 Damage to Dahan. 1 Damage."
      },
      {
        "type": "dahan",
        "name": "War Among the Dahan",
        "text": "On Each Board: In the land with the most Dahan (min. 2), Push half the Dahan (round down)."
      }
    ],
    "status": "active",
    "caseName": "Terror Spikes Upwards"
  },
  "the struggles of growth": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738661/events/the_struggles_of_growth.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "The Struggles of Growth",
        "text": "A painful crux-point. Each Spirit chooses: TRADE REACH FOR DEEPER NATURE Destroy 2 of your Presence. Gain a Power Card. LEAVE BEHIND THAT WHICH RESTRAINS YOU Forget a Power Card. Gain 2 Energy. Move up to 2 of your Presence up to Range"
      },
      {
        "type": "blighted island",
        "name": "Blight Deepens",
        "text": "On Each Board: Add 1 Blight to a land with Blight, but do not cascade. Spirits may prevent this on any/all boards by Destroying 1 Presence from each board to be protected."
      },
      {
        "type": "disease",
        "name": "Irregular Outbreaks",
        "text": "Ignore Disease during Builds this Invader Phase. 1 Fear per board with Disease."
      },
      {
        "type": "dahan",
        "name": "Careful Defense",
        "text": "When Invaders Ravage, if the land has Dahan, Defend 2."
      }
    ],
    "status": "active",
    "caseName": "The Struggles of Growth"
  },
  "provincial seat": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738662/events/provincial_seat.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Provincial Seat",
        "text": "On Each Board: Choose a land with at least 1 City. Build there."
      },
      {
        "type": "blighted island",
        "name": "Lands Hollow of Promise",
        "text": "On Each Board: Add 1 Blight to a land without Presence. Spirits may prevent this on any/all boards by Destroying 2 Presence from each board to be protected."
      },
      {
        "type": "beasts",
        "name": "Beasts Chase Off Homesteaders",
        "text": "On Each Board: Push up to 2 Explorers or 1 Town from a land with Beasts."
      },
      {
        "type": "dahan",
        "name": "Rally to the Defense of Distant Kin",
        "text": "On Each Board: Gather 1 Dahan into a land with Dahan. In that land, Defend 1 per Dahan."
      }
    ],
    "status": "active",
    "caseName": "Provincial Seat"
  },
  "temporary truce": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738663/events/temporary_truce.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "terror 1",
        "name": "Temporary Truce",
        "text": "In lands with Dahan: 1 Dahan and 1 Town/City do not participate in Ravages. (They neither take nor deal Damage.)"
      },
      {
        "type": "terror 2 & 3",
        "name": "Temporary Caution",
        "text": "During the Ravage Step, On Each Board: Skip 1 Ravage Action in a land where Dahan outnumber Towns/Cities."
      },
      {
        "type": "beasts",
        "name": "Prey on the Heedless",
        "text": "In each land with Beasts, 1 Damage per Beasts."
      },
      {
        "type": "dahan",
        "name": "Speak of the Spirits' Anger",
        "text": "For each board, 1 Fear if any Dahan are in lands with Towns/Cities."
      }
    ],
    "status": "active",
    "caseName": "Temporary Truce"
  },
  "well-prepared explorers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738664/events/well-prepared_explorers.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Well-Prepared Explorers",
        "text": "For the rest of the turn, Explorers have +1 Health."
      },
      {
        "type": "blighted island",
        "name": "Blight Spreads",
        "text": "On Each Board: Add 1 Blight to a land adjacent to a land with Blight. Spirits may prevent this on any/all boards by destroying 2 Presence from each board to be protected."
      },
      {
        "type": "beasts",
        "name": "Beasts Prowl",
        "text": "Each Beasts generates 1 Fear if Invaders are present, and moves to an adjacent land if not."
      },
      {
        "type": "dahan",
        "name": "Coming of Age",
        "text": "On Each Board: Add 1 Dahan to an Inland land with Dahan."
      }
    ],
    "status": "active",
    "caseName": "Well-Prepared Explorers"
  },
  "search for new lands": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738666/events/search_for_new_lands.png",
    "set": [
      "branch and claw"
    ],
    "sections": [
      {
        "type": "healthy island",
        "name": "Search for New Lands",
        "text": "In Each land with at least 2 Explorers: Push 1 Explorer to an adjacent land without Invaders."
      },
      {
        "type": "blighted island",
        "name": "Devastated Shores",
        "text": "On Each Board with Invaders: Add 1 Blight to a Coastal land. Spirits may prevent this on any/all boards by destroying 2 Presence from each board to be protected."
      },
      {
        "type": "beasts",
        "name": "Distant Hunt",
        "text": "On Each Board: Push 1 Beasts to an adjacent land with no Blight. It deals 1 Damage there."
      },
      {
        "type": "dahan",
        "name": "Canny Defense",
        "text": "During Ravage, in every land, Defend 1 per Dahan in the land."
      }
    ],
    "status": "active",
    "caseName": "Search for New Lands"
  },
  "remnants of a spirit's heart": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738667/events/remnants_of_a_spirit%27s_heart.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "group choice",
        "name": "Remnants of a Spirit's Heart",
        "text": "A group of Dahan find a stony ridge with lingering blessings from an ancient mountain-Spirit. You may: LEAVE ITS STRENGTH WITH THE DAHAN • Dahan have +10 Health this turn. • In lands with Dahan, Invaders have +1 Health this turn. WITH PATIENT FOCUS CRAFT A GREAT WARDING Cost: 4 Energy per player, aided by Earth. • Defend from Spirits is 4 lower per land this turn (min. 0) • During one future Spirit Phase, players may jointly decide to grant Defend 4 to all lands that turn. (There is a Reminder Card for this.)"
      },
      {
        "type": "beasts",
        "name": "Hunting Parties",
        "text": "For each land with Beasts and Cities: 1 Fear and Destroy 1 Beasts there."
      },
      {
        "type": "dahan",
        "name": "A Thousand Small Struggles",
        "text": "On Each Board with 4 or more Towns/Cities and 4 or fewer Dahan: Add 1 Blight to a land without Dahan."
      }
    ],
    "status": "active",
    "caseName": "Remnants of a Spirit's Heart"
  },
  "invested aristocracy": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738668/events/invested_aristocracy.png",
    "set": [
      "jagged earth"
    ],
    "sections": [
      {
        "type": "stages 1 & 2",
        "name": "Invested Aristocracy",
        "text": "After the Ravage Step, On Each Board: If no Blight was added to this board, add 1 Town to the highest-numbered land with no Invaders."
      },
      {
        "type": "stage 3",
        "name": "Foreign Dignitaries Visit",
        "text": "If the island is Healthy, Ravages do +2 Damage (total) in the lowest-numbered matching land on each board. If the island is Blighted, add 1 Fear Card to the top of the Fear Deck."
      },
      {
        "type": "beasts",
        "name": "Prey on the Heedless",
        "text": "In each land with Beasts, 1 Damage per Beasts."
      },
      {
        "type": "dahan",
        "name": "Coming of Age",
        "text": "On Each Board: Add 1 Dahan to a land with 2 or more Dahan."
      }
    ],
    "status": "active",
    "caseName": "Invested Aristocracy"
  }
}

export const FEAR_CARDS: Record<string, FearCard> = {
  "avoid the dahan": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738727/fear/avoid_the_dahan.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Skip all Explore Actions in lands with at least 2 Dahan.",
    "terrorLevel2": "Skip all Build Actions in lands where Dahan outnumber Towns/Cities (including lands with no Towns/Cities).",
    "terrorLevel3": "Skip Build Actions in lands with Dahan.",
    "status": "active",
    "caseName": "Avoid the Dahan"
  },
  "dahan raid": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738728/fear/dahan_raid.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Each player chooses a different land with Dahan. In each: 1 Damage.",
    "terrorLevel2": "Each player chooses a different land with Dahan. In each: 1 Damage per Dahan.",
    "terrorLevel3": "Each player chooses a different land with Dahan. In each: 2 Damage per Dahan.",
    "status": "active",
    "caseName": "Dahan Raid"
  },
  "belief takes root": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738729/fear/belief_takes_root.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Defend 2 in all lands with Presence.",
    "terrorLevel2": "Defend 2 in all lands with Presence. Each Spirit gains 1 Energy per Sacred Sitge they have in lands with Invaders.",
    "terrorLevel3": "Each player chooses a different land and removes up to 2 Health worth of Invaders per Presence there.",
    "status": "active",
    "caseName": "Belief Takes Root"
  },
  "fear of the unseen": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738730/fear/fear_of_the_unseen.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Each player removes 1 Explorer/Town from a land with a Sacred Site.",
    "terrorLevel2": "Each player removes 1 Explorer/Town from a land with Presence.",
    "terrorLevel3": "Each player removes 1 Explorer/Town from a land with Presence, or 1 City from a land with a Sacred Site.",
    "status": "active",
    "caseName": "Fear of the Unseen"
  },
  "dahan enheartened": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738731/fear/dahan_enheartened.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Each player may Push 1 Dahan from a land with Invaders or Gather 1 Dahan into a land with Invaders.",
    "terrorLevel2": "Each player chooses a different land. In each: Gather up to 2 Dahan. 1 Damage if Dahan are present.",
    "terrorLevel3": "Each player chooses a different land. In each: Gather up to 2 Dahan. 1 Damage per Dahan.",
    "status": "active",
    "caseName": "Dahan Enheartened"
  },
  "dahan on their guard": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738732/fear/dahan_on_their_guard.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Lands with Dahan have Defend 1 per Dahan.",
    "terrorLevel2": "Lands with Dahan have Defend 1 + Defend 1 per Dahan.",
    "terrorLevel3": "Lands with Dahan have Defend 2 per Dahan.",
    "status": "active",
    "caseName": "Dahan on their Guard"
  },
  "retreat!": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738733/fear/retreat%21.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Each player may Push up to 2 Explorers from an Inland land.",
    "terrorLevel2": "Each player may Push up to 3 Explorers/Towns from an Inland land.",
    "terrorLevel3": "Each player may Push any number of Explorers/Towns from one land.",
    "status": "active",
    "caseName": "Retreat!"
  },
  "overseas trade seems safer": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738734/fear/overseas_trade_seems_safer.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Defend 3 in all Coastal lands.",
    "terrorLevel2": "Defend 6 in all Coastal lands. Skip all Build Actions in Coastal lands that would Add a City.",
    "terrorLevel3": "Defend 9 in all Coastal lands. Skip all Build Actions in Coastal lands.",
    "status": "active",
    "caseName": "Overseas Trade Seems Safer"
  },
  "emigration accelerates": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738735/fear/emigration_accelerates.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Each player removes 1 Explorer from a Coastal land.",
    "terrorLevel2": "Each player removes 1 Explorer/Town from a Coastal land.",
    "terrorLevel3": "Each player removes 1 Explorer/Town from any land.",
    "status": "active",
    "caseName": "Emigration Accelerates"
  },
  "trade suffers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738736/fear/trade_suffers.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Skip all Build Actions in lands with Cities.",
    "terrorLevel2": "Each player may Downgrade 1 Town in a Coastal land.",
    "terrorLevel3": "Each player may Downgrade 1 Town/City in a Coastal land.",
    "status": "active",
    "caseName": "Trade Suffers"
  },
  "demoralized": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738737/fear/demoralized.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "Defend 1 in all lands.",
    "terrorLevel2": "Defend 2 in all lands.",
    "terrorLevel3": "Defend 3 in all lands.",
    "status": "active",
    "caseName": "Demoralized"
  },
  "unrest": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738738/fear/unrest.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "Each player adds 1 Strife to a Town.",
    "terrorLevel2": "Each player adds 1 Strife to a Town. For the rest of this turn, Invaders have -1 Health per Strife to a minimum of 1.",
    "terrorLevel3": "Each player adds 1 Strife to an Invader. For the rest of this turn, Invaders have -1 Health per Strife to a minimum of 1.",
    "status": "active",
    "caseName": "Unrest"
  },
  "immigration slows": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738739/fear/immigration_slows.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "During the next normal Build, skip the lowest-numbered land matching the Invader Card on each board.",
    "terrorLevel2": "Skip the next normal Build. The Build Card remains in place instead of shifting left.",
    "terrorLevel3": "Skip the next normal Build. The Build Card shifts left as usual.",
    "status": "active",
    "caseName": "Immigration Slows"
  },
  "panic": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738740/fear/panic.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "Each player adds 1 Strife in a land with Beasts/Disease/Dahan.",
    "terrorLevel2": "Each player adds 1 Strife in a land with Beasts/Disease/Dahan. For the rest of this turn, Invaders have -1 Health per Strife to a minimum of 1.",
    "terrorLevel3": "Each player adds 1 Strife to an Invader. For the rest of this turn, Invaders have -1 Health per Strife to a minimum of 1.",
    "status": "active",
    "caseName": "Panic"
  },
  "depart the dangerous land": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738741/fear/depart_the_dangerous_land.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "Each player removes 1 Explorer from a land with Beasts, Disease, or at least 2 Dahan.",
    "terrorLevel2": "Each player removes 1 Explorer/Town from a land with Beasts, Disease, or at least 2 Dahan.",
    "terrorLevel3": "Each player removes up to 4 Health worth of Invaders from a land with Beasts, Disease, or at least 2 Dahan.",
    "status": "active",
    "caseName": "Depart the Dangerous Land"
  },
  "quarantine": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738742/fear/quarantine.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "Explore does not affect Coastal lands.",
    "terrorLevel2": "Explore does not affect Coastal lands. Lands with Disease are not a source of Invaders when Exploring.",
    "terrorLevel3": "Explore does not affect Coastal lands. Invaders do not act in lands with Disease.",
    "status": "active",
    "caseName": "Quarantine"
  },
  "scapegoats": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738743/fear/scapegoats.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "In each land with Towns: Destroy 1 Explorer per Town.",
    "terrorLevel2": "In each land with Towns/Cities: Destroy 1 Explorer per Town and 2 Explorers per City.",
    "terrorLevel3": "In each land with Towns/Cities: Destroy all Explorers. Destroy 1 Town per City.",
    "status": "active",
    "caseName": "Scapegoats"
  },
  "flee the pestilent land": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738744/fear/flee_the_pestilent_land.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "Each player removes 1 Explorer/Town from a land with Disease.",
    "terrorLevel2": "Each player removes up to 3 Health of Invaders from a land with Disease or 1 Explorer from an Inland land.",
    "terrorLevel3": "Each player removes up to 5 Health of Invaders from a land with Disease, or 1 Explorer/Town from an Inland land.",
    "status": "active",
    "caseName": "Flee the Pestilent Land"
  },
  "restlessness": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738745/fear/restlessness.png",
    "set": [
      "nature incarnate"
    ],
    "terrorLevel1": "Each player Pushes up to 1 Explorer/Town from a land not matching a Build card.",
    "terrorLevel2": "Each player Pushes up to 3 Explorer/Town from a land not matching a Build card.",
    "terrorLevel3": "Each player Removes up to 3 Explorer/Town from a land not matching a Build card.",
    "status": "active",
    "caseName": "Restlessness"
  },
  "dahan attack": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738746/fear/dahan_attack.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "Each player removes 1 Explorer from a land with Dahan.",
    "terrorLevel2": "Each player chooses a different land with Dahan. 1 Damager per Dahan there.",
    "terrorLevel3": "Each player chooses a different land with Towns/Cities. Gather 1 Dahan into that land. Then, 2 Damage per Dahan there.",
    "status": "active",
    "caseName": "Dahan Attack"
  },
  "plan for departure": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738747/fear/plan_for_departure.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "Each player may Gather 1 Town into a Coastal land.",
    "terrorLevel2": "Each player may Gather 1 Explorer/Town into a Coastal land. Defend 2 in all Coastal lands.",
    "terrorLevel3": "Each player may Gather 2 Explorers/Towns into a Coastal land. Defend 4 in all Coastal lands.",
    "status": "active",
    "caseName": "Plan for Departure"
  },
  "spreading timidity": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738748/fear/spreading_timidity.png",
    "set": [
      "promo pack 2",
      "feather and flame"
    ],
    "terrorLevel1": "Each player chooses a land to Isolate.",
    "terrorLevel2": "Each player chooses a different land to Isolate. Also, Defend 2 in those lands.",
    "terrorLevel3": "Each player chooses a different land to Isolate. Also, Defend 4 in those lands.",
    "status": "active",
    "caseName": "Spreading Timidity"
  },
  "isolation": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738749/fear/isolation.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Each player Removes 1 Explorer/Town from a land where it is the only Invader.",
    "terrorLevel2": "Each player Removes 1 Explorer/Town from a land with 2 or fewer Invaders.",
    "terrorLevel3": "Each player Removes an Invader from a land with 2 or fewer Invaders.",
    "status": "active",
    "caseName": "Isolation"
  },
  "too many monsters": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738750/fear/too_many_monsters.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "Each player removes 1 Explorer/Town from a land with Beasts.",
    "terrorLevel2": "Each player removes 1 Explorer and 1 Town from a land with Beasts, or 1 Explorer from a land adjacent to Beasts.",
    "terrorLevel3": "Each player removes 2 Explorers and 2 Towns from a land with Beasts or 1 Explorer/Town from a land adjacent to Beasts.",
    "status": "active",
    "caseName": "Too Many Monsters"
  },
  "communities in disarray": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738751/fear/communities_in_disarray.png",
    "set": [
      "promo pack 2",
      "feather and flame"
    ],
    "terrorLevel1": "Cities each deal -1 Damage during Ravage. Invaders do not heal Damage at the end of this turn.",
    "terrorLevel2": "Towns/Cities each deal -1 Damage during Ravage. Invaders do not heal Damage at the end of this turn.",
    "terrorLevel3": "Towns/Cities each deal -2 Damage during Ravage. Invaders do not heal Damage at the end of this turn.",
    "status": "active",
    "caseName": "Communities in Disarray"
  },
  "discord": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738752/fear/discord.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "Each player adds 1 Strife in a different land with at least 2 Invaders.",
    "terrorLevel2": "Each player adds 1 Strife in a different land with at least 2 Invaders. Then, each Invader takes 1 Damage per Strife it has.",
    "terrorLevel3": "Each player adds 1 Strife in a different land with at least 2 Invaders. Then, each Invader with Strife deals Damage to other Invaders in its land.",
    "status": "active",
    "caseName": "Discord"
  },
  "wary of the interior": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738753/fear/wary_of_the_interior.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Each player Removes 1 Explorer from an Inland land.",
    "terrorLevel2": "Each player Removes 1 Explorer/Town from an Inland land.",
    "terrorLevel3": "Each player Removes 1 Explorer/Town from any land.",
    "status": "active",
    "caseName": "Wary of the Interior"
  },
  "explorers are reluctant": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738755/fear/explorers_are_reluctant.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "During the next normal Explore, skip the lowest-numbered land matching the Invader Card on each board.",
    "terrorLevel2": "Skip the next normal Explore. During the next invader Phase, draw an additional Explore card.",
    "terrorLevel3": "Skip the next normal Explore, but still reveal a card. (Perform the Stage II Escalation if relevant.) Cards shift left as usual.",
    "status": "active",
    "caseName": "Explorers are Reluctant"
  },
  "seek safety": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738757/fear/seek_safety.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Each player may Push 1 Explorer into a land with more Towns/Cities than the land it came from.",
    "terrorLevel2": "Each player may Gather 1 Explorer into a land with Towns/Cities, or Gather 1 Town into a land with Cities.",
    "terrorLevel3": "Each player may remove up to 3 Health worth of Invaders from a land without Cities.",
    "status": "active",
    "caseName": "Seek Safety"
  },
  "beset by many troubles": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738758/fear/beset_by_many_troubles.png",
    "set": [
      "jagged earth"
    ],
    "terrorLevel1": "In each land with Badlands/Beasts/Disease/Wilds/Strife, Defend 3.",
    "terrorLevel2": "In each land with Badlands/Beasts/Disease/Wilds/Strife, or adjacent to 3 or more such tokens, Defend 5.",
    "terrorLevel3": "Every Badlands/Beasts/Disease/Wilds/Strife grants Defend 3 in its land and adjacent lands.",
    "status": "active",
    "caseName": "Beset by Many Troubles"
  },
  "daunted by the dahan": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738759/fear/daunted_by_the_dahan.png",
    "set": [
      "nature incarnate"
    ],
    "terrorLevel1": "1 Fear per board with both Invaders and Dahan. Invaders do -6 Damage to Dahan (per land) during Ravage.",
    "terrorLevel2": "1 Fear per board with both Invaders and Dahan. Lands with Dahan have Defend 3. Invaders do -6 Damage to Dahan (per land) during Ravage.",
    "terrorLevel3": "1 Fear per board with both Invaders and Dahan. Lands with Dahan have Defend 3. Invaders do -6 Damage to Dahan (per land) during Ravage. Isolate all lands with Dahan.",
    "status": "active",
    "caseName": "Daunted by the Dahan"
  },
  "panicked by wild beasts": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738761/fear/panicked_by_wild_beasts.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "Each player adds 1 Strife in a land with or adjacent to Beasts.",
    "terrorLevel2": "Each player adds 1 Strife in a land with or adjacent to Beasts. Invaders skip their normal Explore and Build in lands with Beasts.",
    "terrorLevel3": "Each player adds 1 Strife in a land with or adjacent to Beasts. Invaders skip all normal Actions in lands with Beasts.",
    "status": "active",
    "caseName": "Panicked by Wild Beasts"
  },
  "nerves fray": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738761/fear/nerves_fray.png",
    "set": [
      "jagged earth"
    ],
    "terrorLevel1": "Each player adds 1 Strife in a land not matching a Ravage Card.",
    "terrorLevel2": "Each player adds 2 Strife in a single land not matching a Ravage Card.",
    "terrorLevel3": "Each player adds 2 Strife in a single land not matching a Ravage Card. 1 Fear per player.",
    "status": "active",
    "caseName": "Nerves Fray"
  },
  "dahan reclaim fishing grounds": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738762/fear/dahan_reclaim_fishing_grounds.png",
    "set": [
      "jagged earth"
    ],
    "terrorLevel1": "Each player chooses a different Coastal land with Dahan. In each: 1 Damage per Dahan.",
    "terrorLevel2": "Each player chooses a different Coastal land. In each: Gather up to 1 Dahan. 1 Damage per Dahan.",
    "terrorLevel3": "Each player chooses a different Coastal land. In each: Gather up to 1 Dahan. 2 Damage per Dahan.",
    "status": "active",
    "caseName": "Dahan Reclaim Fishing Grounds"
  },
  "sense of dread": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738764/fear/sense_of_dread.png",
    "set": [
      "jagged earth"
    ],
    "terrorLevel1": "On Each Board: Remove 1 Explorer from a land matching a Ravage card.",
    "terrorLevel2": "On Each Board: Remove 1 Explorer/Town from a land matching a Ravage card.",
    "terrorLevel3": "On Each Board: Remove 1 Invader from a land matching a Ravage card.",
    "status": "active",
    "caseName": "Sense of Dread"
  },
  "unsettled": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738765/fear/unsettled.png",
    "set": [
      "nature incarnate"
    ],
    "terrorLevel1": "On Each Board: Choose a land with Beasts/Strife/Dahan. Downgrade 1 Town/City there.",
    "terrorLevel2": "On Each Board: Choose a land with Beasts/Strife/Dahan. Downgrade 1 Town/City there or skip the next Build Action there (this turn).",
    "terrorLevel3": "On Each Board: Choose a land with Beasts/Strife/Dahan. Remove 1 Invader there or skip the next Build Action there (this turn).",
    "status": "active",
    "caseName": "Unsettled"
  },
  "civil unrest": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738766/fear/civil_unrest.png",
    "set": [
      "nature incarnate"
    ],
    "terrorLevel1": "On Each Board: Add 1 Strife to a Town/City in a land not matching a Ravage Card.",
    "terrorLevel2": "On Each Board: Add 1 Strife to a Town/City in a land not matching a Ravage Card. Each Invader takes 1 Damage there per Strife it has.",
    "terrorLevel3": "On Each Board: Add 1 Strife. Each Invader takes 1 Damage per Strife it has.",
    "status": "active",
    "caseName": "Civil Unrest"
  },
  "mimic the dahan": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738767/fear/mimic_the_dahan.png",
    "set": [
      "promo pack 2",
      "feather and flame"
    ],
    "terrorLevel1": "Each player Removes 1 Explorer/Town from a land with 2 or more Dahan.",
    "terrorLevel2": "Each player Replaces 1 Explorer/Town with 1 Dahan in a land with 2 or more Dahan.",
    "terrorLevel3": "Each player Replaces 1 Explorer/Town with 1 Dahan in a land with Dahan, or adjacent to 3 or more Dahan.",
    "status": "active",
    "caseName": "Mimic the Dahan"
  },
  "struggles over farmland": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738768/fear/struggles_over_farmland.png",
    "set": [
      "nature incarnate"
    ],
    "terrorLevel1": "Each player Adds 1 Strife in a land with Blight.",
    "terrorLevel2": "Each player adds 1 Strife to a Town or Adds 1 Strife in a land with Blight.",
    "terrorLevel3": "Each player Adds 1 Strife. In each land with Blight, 1 Invader with Strife does Damage to other Invaders.",
    "status": "active",
    "caseName": "Struggles over Farmland"
  },
  "tall tales of savagery": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738769/fear/tall_tales_of_savagery.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "terrorLevel1": "Each player Removes 1 Explorer from a land with Dahan.",
    "terrorLevel2": "Each player Removes 2 Explorers or 1 Town from a land with Dahan.",
    "terrorLevel3": "In each land with Dahan, Remove 2 Explorers or 1 Town. If at least 2 Dahan are present, also Remove 1 City.",
    "status": "active",
    "caseName": "Tall Tales of Savagery"
  },
  "seek company": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738770/fear/seek_company.png",
    "set": [
      "nature incarnate"
    ],
    "terrorLevel1": "On Each Board: Gather up to 1 Explorer into a land with 2 or more Invaders.",
    "terrorLevel2": "On Each Board: Gather up to 3 Explorers/Towns from a single land into a land with 2 or more Invaders.",
    "terrorLevel3": "On Each Board: Gather up to 4 Explorers/Towns (total) into lands with 2 or more Invaders.",
    "status": "active",
    "caseName": "Seek Company"
  },
  "theological strife": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738771/fear/theological_strife.png",
    "set": [
      "jagged earth"
    ],
    "terrorLevel1": "Each player adds 1 Strife in a land with Presence.",
    "terrorLevel2": "Each player adds 1 Strife in a land with Presence. Each Spirit gains 1 Energy per SacredSite they have in lands with Invaders.",
    "terrorLevel3": "Each player adds 1 Strife in a land with Presence. Then, each Invader with Strife deals Damage to other Invaders in its land.",
    "status": "active",
    "caseName": "Theological Strife"
  },
  "flee from dangerous lands": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738772/fear/flee_from_dangerous_lands.png",
    "set": [
      "jagged earth"
    ],
    "terrorLevel1": "On Each Board: Push 1 Explorer/Town from a land with Badlands/Wilds/Dahan.",
    "terrorLevel2": "On Each Board: Remove 1 Explorer/Town from a land with Badlands/Wilds/Dahan.",
    "terrorLevel3": "On Each Board: Remove 1 Explorer/Town from any land, or Remove 1 City from a land with Badlands/Wilds/Dahan.",
    "status": "active",
    "caseName": "Flee from Dangerous Lands"
  },
  "dahan threaten": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738773/fear/dahan_threaten.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "Each player adds 1 Strife in a land with Dahan.",
    "terrorLevel2": "Each player adds 1 Strife in a land with Dahan. For the rest of this turn, Invaders have -1 Health per Strife to a minimum of 1.",
    "terrorLevel3": "Each player adds 1 Strife in a land with Dahan. In every land with Strife, 1 Damage per Dahan.",
    "status": "active",
    "caseName": "Dahan Threaten"
  },
  "angry mobs": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738774/fear/angry_mobs.png",
    "set": [
      "promo pack 2",
      "feather and flame"
    ],
    "terrorLevel1": "Each player may replace 1 Town with 2 Explorer. 1 Fear per player who does.",
    "terrorLevel2": "In each land with 2 or more Explorers, destroy 1 Explorer/Town per 2 Explorer.",
    "terrorLevel3": "In each land with 2 or more Explorers, destroy 1 Invader per 2 Explorer.",
    "status": "active",
    "caseName": "Angry Mobs"
  },
  "tread carefully": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738775/fear/tread_carefully.png",
    "set": [
      "branch and claw"
    ],
    "terrorLevel1": "Each player may choose a land with Dahan or adjacent to at least 5 Dahan. Invaders do not Ravage there this turn.",
    "terrorLevel2": "Each player may choose a land with Dahan or adjacent to at least 3 Dahan. Invaders do not Ravage there this turn.",
    "terrorLevel3": "Each player may choose a land with Dahan or adjacent to Dahan. Invaders do not Ravage there this turn.",
    "status": "active",
    "caseName": "Tread Carefully"
  },
  "supply chains abandoned": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738776/fear/supply_chains_abandoned.png",
    "set": [
      "nature incarnate"
    ],
    "terrorLevel1": "On Each Board: Isolate one land.",
    "terrorLevel2": "On Each Board: Isolate one land. If Towns/Cities are present, skip all Build Actions (in that land).",
    "terrorLevel3": "On Each Board: Isolate two lands. In each of those lands, if Towns/Cities are present, skip all Build Actions (in that land).",
    "status": "active",
    "caseName": "Supply Chains Abandoned"
  },
  "distracted by local troubles": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738777/fear/distracted_by_local_troubles.png",
    "set": [
      "nature incarnate"
    ],
    "terrorLevel1": "On Each Board, in a land matching a Ravage Card: 1 Damage.",
    "terrorLevel2": "On Each Board, in a land matching a Ravage Card: 1 Damage each to up to 2 Invaders. Invaders each do -1 Damage per Damage they have taken.",
    "terrorLevel3": "On Each Board, in a land matching a Ravage Card: 2 Damage (per land)'.. Invaders each do -1 Damage per Damage they have taken.",
    "status": "active",
    "caseName": "Distracted by Local Troubles"
  },
  "depopulation": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738778/fear/depopulation.png",
    "set": [
      "promo pack 2",
      "feather and flame"
    ],
    "terrorLevel1": "On Each Board: Replace 1 Town with 1 Explorer.",
    "terrorLevel2": "On Each Board: Remove 1 Town.",
    "terrorLevel3": "On Each Board: Remove 1 Town, or Replace 1 City with 1 Town.",
    "status": "active",
    "caseName": "Depopulation"
  },
  "dahan gain the edge": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756738779/fear/dahan_gain_the_edge.png",
    "set": [
      "nature incarnate"
    ],
    "terrorLevel1": "Each player chooses a different land with Dahan. In Each: Defend 2.",
    "terrorLevel2": "Each player chooses a different land with Dahan. In Each: 1 Damage and Defend 3.",
    "terrorLevel3": "Each player chooses a different land with Dahan. In Each: 2 Damage and Defend 4.",
    "status": "active",
    "caseName": "Dahan Gain the Edge"
  }
}

export const POWERS: Record<string, PowerCard> = {
  "call of the dahan ways": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753347/powers_cards/call_of_the_dahan_ways.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "dahan",
    "text": "Replace 1 Explorer with 1 Dahan.",
    "threshold": {
      "elements": {
        "m": 2
      },
      "ability": "You may instead Replace 1 Town with 1 Dahan."
    },
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "caseName": "Call of the Dahan Ways",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740011/powers/call_of_the_dahan_ways.png"
  },
  "drought": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753350/powers_cards/drought.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "Destroy 3 Towns. 1 Damage to each Town/City. Add 1 Blight.",
    "threshold": {
      "elements": {
        "s": 3
      },
      "ability": "Destroy 1 City."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Drought",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740012/powers/drought.png"
  },
  "delusions of danger": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753352/powers_cards/delusions_of_danger.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "Push 1 Explorer. -or- 2 Fear.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Delusions of Danger",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740013/powers/delusions_of_danger.png"
  },
  "call to bloodshed": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753353/powers_cards/call_to_bloodshed.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "dahan",
    "text": "1 Damage per Dahan. -or- Gather up to 3 Dahan.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "caseName": "Call to Bloodshed",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740014/powers/call_to_bloodshed.png"
  },
  "devouring ants": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753354/powers_cards/devouring_ants.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "1 Fear. 1 Damage. Destroy 1 Dahan. If target land is a Jungle or Sands, +1 Damage.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "sacred site",
    "caseName": "Devouring Ants",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740015/powers/devouring_ants.png"
  },
  "call to migrate": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753355/powers_cards/call_to_migrate.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "Gather up to 3 Dahan. Push up to 3 Dahan.",
    "threshold": null,
    "artist": "Graham Stermberg",
    "status": "active",
    "from": null,
    "caseName": "Call to Migrate",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740016/powers/call_to_migrate.png"
  },
  "call to ferocity": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753356/powers_cards/call_to_ferocity.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "invaders",
    "text": "Gather up to 3 Dahan. -or- If target land has Dahan, 1 Fear and Push 1 Explorer and 1 Town.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Call to Ferocity",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740019/powers/call_to_ferocity.png"
  },
  "encompassing ward": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753357/powers_cards/encompassing_ward.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any spirit",
    "text": "Target Spirit provides Defend 2 in each of its lands.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "caseName": "Encompassing Ward",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740020/powers/encompassing_ward.png"
  },
  "drift down into slumber": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753358/powers_cards/drift_down_into_slumber.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "Defend 1. If target land is a Jungle or Sands, instead Defend 4.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "caseName": "Drift Down into Slumber",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740021/powers/drift_down_into_slumber.png"
  },
  "dark and tangled woods": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753359/powers_cards/dark_and_tangled_woods.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "2 Fear. If target land is a Mountain or Jungle, Defend 3.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Dark and Tangled Woods",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740022/powers/dark_and_tangled_woods.png"
  },
  "enticing splendor": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753360/powers_cards/enticing_splendor.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "no blight",
    "text": "Gather 1 Explorer/Town. -or- Gather up to 2 Dahan.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Enticing Splendor",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740023/powers/enticing_splendor.png"
  },
  "gift of power": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753361/powers_cards/gift_of_power.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any spirit",
    "text": "Target Spirit gains a Minor Power Card.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Gift of Power",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740024/powers/gift_of_power.png"
  },
  "absorb corruption": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753363/powers_cards/absorb_corruption.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "Gather 1 Blight. -or- Pay 1 Energy to Remove 1 Blight.",
    "threshold": {
      "elements": {
        "p": 2
      },
      "ability": "You may do both."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Absorb Corruption",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740025/powers/absorb_corruption.png"
  },
  "land of haunts and embers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753363/powers_cards/land_of_haunts_and_embers.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "2 Fear. Push up to 2 Explorers/Towns. If Blight is present, 2 Fear and Push up to 2 Explorers/Towns. Add 1 Blight.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "caseName": "Land of Haunts and Embers",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740026/powers/land_of_haunts_and_embers.png"
  },
  "quicken the earth's struggles": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753364/powers_cards/quicken_the_earth%27s_struggles.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "1 Damage to each Town/City. -or- Defend 10.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": "sacred site",
    "caseName": "Quicken the Earth's Struggles",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740028/powers/quicken_the_earth%27s_struggles.png"
  },
  "purifying flame": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753365/powers_cards/purifying_flame.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "1 Damage per Blight. If target land is a Mountain or Sands, you may instead Remove 1 Blight.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "sacred site",
    "caseName": "Purifying Flame",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740030/powers/purifying_flame.png"
  },
  "pull beneath the hungry earth": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753366/powers_cards/pull_beneath_the_hungry_earth.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "If your Presence is present, 1 Fear and 1 Damage. If target land is a Sands or Wetland, 1 Damage.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Pull Beneath the Hungry Earth",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740031/powers/pull_beneath_the_hungry_earth.png"
  },
  "nature's resilience": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753367/powers_cards/nature%27s_resilience.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "Defend 6.",
    "threshold": {
      "elements": {
        "w": 2
      },
      "ability": "You may instead Remove 1 Blight."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "caseName": "Nature's Resilience",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740032/powers/nature%27s_resilience.png"
  },
  "reaching grasp": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753368/powers_cards/reaching_grasp.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any spirit",
    "text": "Target Spirit gets +2 Range with all their Powers.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Reaching Grasp",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740032/powers/reaching_grasp.png"
  },
  "rituals of destruction": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753369/powers_cards/rituals_of_destruction.png",
    "set": [
      "spirit island"
    ],
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
    "target": "dahan",
    "text": "2 Damage. If target land has at least 3 Dahan, +3 Damage and 2 Fear.",
    "threshold": null,
    "artist": "Sydni Kruger",
    "status": "active",
    "from": "sacred site",
    "unique": "vital strength of the earth",
    "caseName": "Rituals of Destruction",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740033/powers/rituals_of_destruction.png"
  },
  "gift of constancy": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753370/powers_cards/gift_of_constancy.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "e"
    ],
    "speed": "fast",
    "range": null,
    "target": "any spirit",
    "text": "Target Spirit gains 2 Energy. At end of turn, target Spirit may Reclaim 1 Power Card instead of discarding it. If you target another Spirit, you may also Reclaim 1 Power Card instead of discarding it.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Gift of Constancy",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740035/powers/gift_of_constancy.png"
  },
  "crops wither and fade": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753372/powers_cards/crops_wither_and_fade.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "p"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "2 Fear. Replace 1 Town with 1 Explorer. -or- Replace 1 City with 1 Town.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "shadows flicker like flame",
    "caseName": "Crops Wither and Fade",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740035/powers/crops_wither_and_fade.png"
  },
  "tidal boon": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753372/powers_cards/tidal_boon.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "w",
      "e"
    ],
    "speed": "slow",
    "range": null,
    "target": "another spirit",
    "text": "Target Spirit gains 2 Energy and may Push 1 Town and up to 2 Dahan from one of their lands. If Dahan are pushed to your Ocean, you may move them to any Coastal land instead of Drowning them.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "ocean's hungry grasp",
    "caseName": "Tidal Boon",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740036/powers/tidal_boon.png"
  },
  "rain of blood": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753373/powers_cards/rain_of_blood.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "invaders",
    "text": "2 Fear. If target land has at least 2 Towns/Cities, 1 Fear.",
    "threshold": null,
    "artist": "Kat Birmelin",
    "status": "active",
    "from": "sacred site",
    "caseName": "Rain of Blood",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740037/powers/rain_of_blood.png"
  },
  "guard the healing land": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753374/powers_cards/guard_the_healing_land.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "w",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Remove 1 Blight. Defend 4.",
    "threshold": null,
    "artist": "Sydni Kruger",
    "status": "active",
    "from": "sacred site",
    "unique": "vital strength of the earth",
    "caseName": "Guard the Healing Land",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740038/powers/guard_the_healing_land.png"
  },
  "call to isolation": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753375/powers_cards/call_to_isolation.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "dahan",
    "text": "Push 1 Explorer/Town per Dahan. -or- Push 1 Dahan.",
    "threshold": null,
    "artist": "Graham Stermberg",
    "status": "active",
    "from": null,
    "caseName": "Call to Isolation",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740039/powers/call_to_isolation.png"
  },
  "gnawing rootbiters": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753376/powers_cards/gnawing_rootbiters.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Push up to 2 Towns.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Gnawing Rootbiters",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740041/powers/gnawing_rootbiters.png"
  },
  "shadows of the burning forest": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753377/powers_cards/shadows_of_the_burning_forest.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "invaders",
    "text": "2 Fear. If target land is a Mountain or Jungle, Push 1 Explorer and 1 Town.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Shadows of the Burning Forest",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740043/powers/shadows_of_the_burning_forest.png"
  },
  "call to tend": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753378/powers_cards/call_to_tend.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "dahan",
    "text": "Remove 1 Blight. -or- Push up to 3 Dahan.",
    "threshold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "caseName": "Call to Tend",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740044/powers/call_to_tend.png"
  },
  "wash away": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753379/powers_cards/wash_away.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Push up to 3 Explorers/Towns.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "river surges in sunlight",
    "caseName": "Wash Away",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740045/powers/wash_away.png"
  },
  "sap the strength of multitudes": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753380/powers_cards/sap_the_strength_of_multitudes.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "w",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "any land",
    "text": "Defend 5.",
    "threshold": {
      "elements": {
        "a": 1
      },
      "ability": "Increase this Power's Range to 1."
    },
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "caseName": "Sap the Strength of Multitudes",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740045/powers/sap_the_strength_of_multitudes.png"
  },
  "words of warning": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753381/powers_cards/words_of_warning.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "dahan",
    "text": "Defend 3. During Ravage, Dahan in target land deal Damage simultaneously with Invaders.",
    "threshold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "unique": "thunderspeaker",
    "caseName": "Words of Warning",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740047/powers/words_of_warning.png"
  },
  "draw of the fruitful earth": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753382/powers_cards/draw_of_the_fruitful_earth.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "e",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Gather up to 2 Explorers. Gather up to 2 Dahan.",
    "threshold": null,
    "artist": "Sydni Kruger",
    "status": "active",
    "from": null,
    "unique": "vital strength of the earth",
    "caseName": "Draw of the Fruitful Earth",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740047/powers/draw_of_the_fruitful_earth.png"
  },
  "boon of vigor": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753383/powers_cards/boon_of_vigor.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "w",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "any spirit",
    "text": "If you target yourself, gain 1 Energy. If you target another Spirit, they gain 1 Energy per Power Card they played this turn.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "river surges in sunlight",
    "caseName": "Boon of Vigor",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740048/powers/boon_of_vigor.png"
  },
  "lure of the unknown": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753384/powers_cards/lure_of_the_unknown.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "no invaders",
    "text": "Gather 1 Explorer/Town.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "caseName": "Lure of the Unknown",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740049/powers/lure_of_the_unknown.png"
  },
  "savage mawbeasts": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753384/powers_cards/savage_mawbeasts.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "If target land is a Jungle or Wetland, 1 Fear and 1 Damage.",
    "threshold": {
      "elements": {
        "n": 3
      },
      "ability": "1 Damage."
    },
    "artist": "Cari Corene",
    "status": "active",
    "from": "sacred site",
    "caseName": "Savage Mawbeasts",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740051/powers/savage_mawbeasts.png"
  },
  "manifestation of power and glory": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753386/powers_cards/manifestation_of_power_and_glory.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "slow",
    "range": 0,
    "target": "dahan",
    "text": "1 Fear. Each Dahan deals Damage equal to the number of your Presence in target land.",
    "threshold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "unique": "thunderspeaker",
    "caseName": "Manifestation of Power and Glory",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740053/powers/manifestation_of_power_and_glory.png"
  },
  "tsunami": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753388/powers_cards/tsunami.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "major",
    "cost": 6,
    "elements": [
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 2,
    "target": "coastal",
    "text": "2 Fear. 8 Damage. Destroy 2 Dahan.",
    "threshold": {
      "elements": {
        "w": 3,
        "e": 2
      },
      "ability": "In each other Coastal land on the same board: 1 Fear, 4 Damage, and Destroy 1 Dahan."
    },
    "artist": "Jason Behnke",
    "status": "active",
    "from": "sacred site",
    "caseName": "Tsunami",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740054/powers/tsunami.png"
  },
  "concealing shadows": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753390/powers_cards/concealing_shadows.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a"
    ],
    "speed": "fast",
    "range": 0,
    "target": "any land",
    "text": "1 Fear. Dahan take no Damage from Ravaging Invaders this turn.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "shadows flicker like flame",
    "caseName": "Concealing Shadows",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740055/powers/concealing_shadows.png"
  },
  "paralyzing fright": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753392/powers_cards/paralyzing_fright.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "4 Fear. Skip all Invader Actions. (Do not Ravage, Build, or Explore in target land.)",
    "threshold": {
      "elements": {
        "a": 2,
        "e": 3
      },
      "ability": "4 Fear."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "caseName": "Paralyzing Fright",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740056/powers/paralyzing_fright.png"
  },
  "mantle of dread": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753393/powers_cards/mantle_of_dread.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "a"
    ],
    "speed": "slow",
    "range": null,
    "target": "any spirit",
    "text": "2 Fear. Target Spirit may Push 1 Explorer and 1 Town from a land where it has Presence.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "shadows flicker like flame",
    "caseName": "Mantle of Dread",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740056/powers/mantle_of_dread.png"
  },
  "portents of disaster": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753394/powers_cards/portents_of_disaster.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "m",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "invaders",
    "text": "2 Fear. The next time an Invader is Destroyed in target land this turn, 1 Fear.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "sacred site",
    "caseName": "Portents of Disaster",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740057/powers/portents_of_disaster.png"
  },
  "blazing renewal": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753396/powers_cards/blazing_renewal.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any spirit",
    "text": "In a single land within 2 Range of your Presence: target Spirit Adds 2 of their Destroyed Presence. If any Presence was Added, 2 Damage to each Town/City.",
    "threshold": {
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
    "caseName": "Blazing Renewal",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740058/powers/blazing_renewal.png"
  },
  "rouse the trees and stones": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753398/powers_cards/rouse_the_trees_and_stones.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "no blight",
    "text": "2 Damage. Push 1 Explorer.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "sacred site",
    "caseName": "Rouse the Trees and Stones",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740060/powers/rouse_the_trees_and_stones.png"
  },
  "a year of perfect stillness": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753400/powers_cards/a_year_of_perfect_stillness.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "s",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Invaders skip all Actions in target land this turn.",
    "threshold": null,
    "artist": "Sydni Kruger",
    "status": "active",
    "from": null,
    "unique": "vital strength of the earth",
    "caseName": "A Year of Perfect Stillness",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740061/powers/a_year_of_perfect_stillness.png"
  },
  "dissolve the bonds of kinship": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753401/powers_cards/dissolve_the_bonds_of_kinship.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "Replace 1 City with 2 Explorers. Replace 1 Town with 1 Explorer. Replace 1 Dahan with 1 Explorer. Push all Explorers from target land to as many different lands as possible.",
    "threshold": {
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
    "caseName": "Dissolve the Bonds of Kinship",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740064/powers/dissolve_the_bonds_of_kinship.png"
  },
  "veil the night's hunt": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753402/powers_cards/veil_the_night%27s_hunt.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "dahan",
    "text": "For each Dahan present, choose a different Invader. 1 Damage to each of those Invaders. -or- Push up to 3 Dahan.",
    "threshold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "caseName": "Veil the Night's Hunt",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740065/powers/veil_the_night%27s_hunt.png"
  },
  "animated wrackroot": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753403/powers_cards/animated_wrackroot.png",
    "set": [
      "branch and claw"
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
    "target": "any land",
    "text": "1 Fear. Destroy 1 Explorer. -or- Add 1 Wilds.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Animated Wrackroot",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740065/powers/animated_wrackroot.png"
  },
  "infinite vitality": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753405/powers_cards/infinite_vitality.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "Dahan have +4 Health (while in target land). Blight cannot be Added. (When it would be added to target land, instead leave it on the Blight space.)",
    "threshold": {
      "elements": {
        "e": 4
      },
      "ability": "Dahan cannot be Damaged or Destroyed (in target land). Remove 1 Blight from target or adjacent land."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "caseName": "Infinite Vitality",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740066/powers/infinite_vitality.png"
  },
  "disorienting landscape": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753406/powers_cards/disorienting_landscape.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "p"
    ],
    "speed": "fast",
    "range": 2,
    "target": "any land",
    "text": "Push 1 Explorer. If target land is a Mountain or Jungle, add 1 Wilds.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "sacred site",
    "caseName": "Disorienting Landscape",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740067/powers/disorienting_landscape.png"
  },
  "cleansing floods": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753406/powers_cards/cleansing_floods.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "major",
    "cost": 5,
    "elements": [
      "s",
      "w"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "4 Damage. Remove 1 Blight.",
    "threshold": {
      "elements": {
        "w": 4
      },
      "ability": "10 Damage."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "wetland",
    "caseName": "Cleansing Floods",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740068/powers/cleansing_floods.png"
  },
  "indomitable claim": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753407/powers_cards/indomitable_claim.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Add 1 Presence in target land even if you normally could not due to land type. Defend 20.",
    "threshold": {
      "elements": {
        "s": 2,
        "e": 3
      },
      "ability": "3 Fear if Invaders are present. Skip all Invader Actions. (Do not Ravage, Build, or Explore in target land.)"
    },
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "caseName": "Indomitable Claim",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740069/powers/indomitable_claim.png"
  },
  "call to trade": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753408/powers_cards/call_to_trade.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "dahan",
    "text": "You may Gather 1 Dahan. If the Terror Level is 2 or lower, Gather 1 Town and the first Ravage in target land this turn becomes a Build there instead.",
    "threshold": null,
    "artist": "Kat Birmelin",
    "status": "active",
    "from": null,
    "caseName": "Call to Trade",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740070/powers/call_to_trade.png"
  },
  "river's bounty": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753409/powers_cards/river%27s_bounty.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "Gather up to 2 Dahan. If there are now at least 2 Dahan, add 1 Dahan and gain 1 Energy.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "river surges in sunlight",
    "caseName": "River's Bounty",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740074/powers/river%27s_bounty.png"
  },
  "gold's allure": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753411/powers_cards/gold%27s_allure.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "f",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "mountain",
    "text": "Gather 1 Explorer and 1 Town. Add 1 Strife.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "caseName": "Gold's Allure",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740075/powers/gold%27s_allure.png"
  },
  "pillar of living flame": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753411/powers_cards/pillar_of_living_flame.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "major",
    "cost": 5,
    "elements": [
      "f"
    ],
    "speed": "slow",
    "range": 2,
    "target": "any land",
    "text": "3 Fear. 5 Damage. If target land is a Jungle or Wetland, add 1 Blight.",
    "threshold": {
      "elements": {
        "f": 4
      },
      "ability": "2 Fear and 5 Damage."
    },
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "sacred site",
    "caseName": "Pillar of Living Flame",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740076/powers/pillar_of_living_flame.png"
  },
  "uncanny melting": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753412/powers_cards/uncanny_melting.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "If Invaders are present, 1 Fear. If target land is a Sands or Wetland, Remove 1 Blight.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "caseName": "Uncanny Melting",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740077/powers/uncanny_melting.png"
  },
  "fleshrot fever": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753413/powers_cards/fleshrot_fever.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "jungle or sands",
    "text": "1 Fear. Add 1 Disease.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Fleshrot Fever",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740078/powers/fleshrot_fever.png"
  },
  "the trees and stones speak of war": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753414/powers_cards/the_trees_and_stones_speak_of_war.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "dahan",
    "text": "For each Dahan, 1 Damage and Defend 2.",
    "threshold": {
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
    "caseName": "The Trees and Stones Speak of War",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740079/powers/the_trees_and_stones_speak_of_war.png"
  },
  "poisoned land": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753415/powers_cards/poisoned_land.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "1 Fear. 7 Damage. Add 1 Blight. Destroy all Dahan.",
    "threshold": {
      "elements": {
        "e": 3,
        "p": 2,
        "n": 2
      },
      "ability": "For each Blight (including the one just added), 1 Fear and 4 Damage."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Poisoned Land",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740080/powers/poisoned_land.png"
  },
  "elusive ambushes": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753417/powers_cards/elusive_ambushes.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "w"
    ],
    "speed": "fast",
    "range": 1,
    "target": "dahan",
    "text": "1 Damage. -or- Defend 4.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Elusive Ambushes",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740084/powers/elusive_ambushes.png"
  },
  "song of sanctity": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753417/powers_cards/song_of_sanctity.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "mountain or jungle",
    "text": "If Explorer(s) are present, Push all Explorers. Otherwise, Remove 1 Blight.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Song of Sanctity",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740085/powers/song_of_sanctity.png"
  },
  "here there be monsters": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753418/powers_cards/here_there_be_monsters.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "inland",
    "text": "You may Push 1 Explorer/Town/Dahan. 2 Fear. If target land has any Beasts, 1 Fear.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Here There Be Monsters",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740086/powers/here_there_be_monsters.png"
  },
  "fire in the sky": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753420/powers_cards/fire_in_the_sky.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "2 Fear. Add 1 Strife.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "sacred site",
    "caseName": "Fire in the Sky",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740087/powers/fire_in_the_sky.png"
  },
  "steam vents": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753420/powers_cards/steam_vents.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "Destroy 1 Explorer.",
    "threshold": {
      "elements": {
        "e": 3
      },
      "ability": "You may instead Destroy 1 Town."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Steam Vents",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740087/powers/steam_vents.png"
  },
  "inflame the fires of life": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753421/powers_cards/inflame_the_fires_of_life.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "any land",
    "text": "Add 1 Disease. -or- 1 Fear. Add 1 Strife.",
    "threshold": {
      "elements": {
        "n": 3
      },
      "ability": "You may do both."
    },
    "artist": "Kat Birmelin",
    "status": "active",
    "from": "sacred site",
    "caseName": "Inflame the Fires of Life",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740088/powers/inflame_the_fires_of_life.png"
  },
  "swallow the land-dwellers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753422/powers_cards/swallow_the_land-dwellers.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 0,
    "target": "coastal",
    "text": "Drown 1 Explorer, 1 Town, and 1 Dahan.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "ocean's hungry grasp",
    "caseName": "Swallow the Land-Dwellers",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740089/powers/swallow_the_land-dwellers.png"
  },
  "powerstorm": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753423/powers_cards/powerstorm.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any spirit",
    "text": "Target Spirit gains 3 Energy. Once this turn, target Spirit may Repeat a Power Card by paying its cost again.",
    "threshold": {
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
    "caseName": "Powerstorm",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740090/powers/powerstorm.png"
  },
  "stem the flow of fresh water": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753424/powers_cards/stem_the_flow_of_fresh_water.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "1 Damage to 1 Town/City. If target land is a Mountain or Sands, instead, 1 Damage to each Town/City.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "sacred site",
    "unique": "a spread of rampant green",
    "caseName": "Stem the Flow of Fresh Water",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740091/powers/stem_the_flow_of_fresh_water.png"
  },
  "accelerated rot": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753425/powers_cards/accelerated_rot.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "jungle or wetland",
    "text": "2 Fear. 4 Damage.",
    "threshold": {
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
    "caseName": "Accelerated Rot",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740095/powers/accelerated_rot.png"
  },
  "the land thrashes in furious pain": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753426/powers_cards/the_land_thrashes_in_furious_pain.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "dahan",
    "text": "2 Damage per Blight. For each Blight in adjacent lands, 1 Damage (in target land).",
    "threshold": {
      "elements": {
        "m": 3,
        "e": 3
      },
      "ability": "Repeat this Power in an adjacent land (ignoring Range and Target restrictions)."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "The Land Thrashes in Furious Pain",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740096/powers/the_land_thrashes_in_furious_pain.png"
  },
  "confounding mists": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753427/powers_cards/confounding_mists.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "a",
      "w"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Defend 4. -or- Each Invader added to target land this turn may be immediately Pushed to any adjacent land.",
    "threshold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "caseName": "Confounding Mists",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740097/powers/confounding_mists.png"
  },
  "voracious growth": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753428/powers_cards/voracious_growth.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "jungle or wetland",
    "text": "2 Damage. -or- Remove 1 Blight.",
    "threshold": null,
    "artist": "Cari Corene",
    "status": "active",
    "from": "sacred site",
    "caseName": "Voracious Growth",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740097/powers/voracious_growth.png"
  },
  "grant hatred a ravenous form": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753428/powers_cards/grant_hatred_a_ravenous_form.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "m",
      "f"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "For each Strife/Blight in target land, 1 Fear and 2 Damage. If this Destroys all invaders in target land, add 1 Beasts.",
    "threshold": {
      "elements": {
        "m": 4,
        "f": 2
      },
      "ability": "Add 1 Strife in up to 3 adjacent lands."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Grant Hatred a Ravenous Form",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740098/powers/grant_hatred_a_ravenous_form.png"
  },
  "cycles of time and tide": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753430/powers_cards/cycles_of_time_and_tide.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "w"
    ],
    "speed": "fast",
    "range": 1,
    "target": "coastal",
    "text": "If there are Dahan, add 1 Dahan. If there are no Dahan, Remove 1 Blight.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Cycles of Time and Tide",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740099/powers/cycles_of_time_and_tide.png"
  },
  "entwined power": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753431/powers_cards/entwined_power.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "another spirit",
    "text": "You and target Spirit may use each other's Presence to target Powers (only). Target Spirit gains a Power Card. You gain one of the Power Cards they did not keep.",
    "threshold": {
      "elements": {
        "w": 2,
        "p": 4
      },
      "ability": "You and target Spirit each gain 3 Energy and may gift the other 1 Power Card from hand."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Entwined Power",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740100/powers/entwined_power.png"
  },
  "razor-sharp undergrowth": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753432/powers_cards/razor-sharp_undergrowth.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "p"
    ],
    "speed": "fast",
    "range": 0,
    "target": "no blight",
    "text": "Destroy 1 Explorer and 1 Dahan. Add 1 Wilds. Defend 2.",
    "threshold": null,
    "artist": "Cari Corene",
    "status": "active",
    "from": null,
    "caseName": "Razor-Sharp Undergrowth",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740101/powers/razor-sharp_undergrowth.png"
  },
  "visions of fiery doom": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753433/powers_cards/visions_of_fiery_doom.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "f"
    ],
    "speed": "fast",
    "range": 0,
    "target": "any land",
    "text": "1 Fear. Push 1 Explorer/Town.",
    "threshold": {
      "elements": {
        "f": 2
      },
      "ability": "+1 Fear."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "caseName": "Visions of Fiery Doom",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740103/powers/visions_of_fiery_doom.png"
  },
  "call on midnight's dream": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753434/powers_cards/call_on_midnight%27s_dream.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "any land",
    "text": "If target land has Dahan, gain a Major Power. If you Forget this Power, gain Energy equal to Dahan and you may play the Major Power immediately, paying its cost. -or- If Invaders are present, 2 Fear.",
    "threshold": null,
    "artist": "Shane Tyree",
    "status": "active",
    "from": null,
    "unique": "bringer of dreams and nightmares",
    "caseName": "Call on Midnight's Dream",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740105/powers/call_on_midnight%27s_dream.png"
  },
  "vigor of the breaking dawn": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753435/powers_cards/vigor_of_the_breaking_dawn.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "s",
      "n"
    ],
    "speed": "fast",
    "range": 2,
    "target": "dahan",
    "text": "2 Damage per Dahan.",
    "threshold": {
      "elements": {
        "s": 3,
        "n": 2
      },
      "ability": "You may Push up to 2 Dahan. In lands you Pushed Dahan to, 2 Damage per Dahan present."
    },
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "caseName": "Vigor of the Breaking Dawn",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740106/powers/vigor_of_the_breaking_dawn.png"
  },
  "fields choked with growth": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753436/powers_cards/fields_choked_with_growth.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Push 1 Town. -or- Push 3 Dahan.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "a spread of rampant green",
    "caseName": "Fields Choked with Growth",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740107/powers/fields_choked_with_growth.png"
  },
  "gift of proliferation": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753437/powers_cards/gift_of_proliferation.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "p"
    ],
    "speed": "fast",
    "range": null,
    "target": "another spirit",
    "text": "Target Spirit adds 1 Presence up to 1 Range from their Presence.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "a spread of rampant green",
    "caseName": "Gift of Proliferation",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740108/powers/gift_of_proliferation.png"
  },
  "terrifying nightmares": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753438/powers_cards/terrifying_nightmares.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "m",
      "a"
    ],
    "speed": "fast",
    "range": 2,
    "target": "any land",
    "text": "2 Fear. Push up to 4 Explorers/Towns.",
    "threshold": {
      "elements": {
        "m": 4
      },
      "ability": "4 Fear."
    },
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "caseName": "Terrifying Nightmares",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740109/powers/terrifying_nightmares.png"
  },
  "the jungle hungers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753438/powers_cards/the_jungle_hungers.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "m",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Destroy all Explorers and all Towns. Destroy all Dahan.",
    "threshold": {
      "elements": {
        "m": 2,
        "p": 3
      },
      "ability": "Destroy 1 City. Do not Destroy any Dahan."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "jungle",
    "caseName": "The Jungle Hungers",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740110/powers/the_jungle_hungers.png"
  },
  "tormenting rotflies": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753439/powers_cards/tormenting_rotflies.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "a",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 2,
    "target": "sands or wetland",
    "text": "Add 1 Disease. -or- If target land has Invaders, 2 Fear. If Disease is present, +1 Fear. If Blight is present, +1 Fear.",
    "threshold": null,
    "artist": "Kat Birmelin",
    "status": "active",
    "from": null,
    "caseName": "Tormenting Rotflies",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740111/powers/tormenting_rotflies.png"
  },
  "harbingers of the lightning": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753440/powers_cards/harbingers_of_the_lightning.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "f",
      "a"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Push up to 2 Dahan. 1 Fear if you pushed any Dahan into a land with Towns/Cities.",
    "threshold": null,
    "artist": "Rocky Hammer",
    "status": "active",
    "from": null,
    "unique": "lightning's swift strike",
    "caseName": "Harbingers of the Lightning",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740113/powers/harbingers_of_the_lightning.png"
  },
  "lightning's boon": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753441/powers_cards/lightning%27s_boon.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "a"
    ],
    "speed": "fast",
    "range": null,
    "target": "any spirit",
    "text": "Target Spirit may use up to 2 Slow Powers as if they were Fast Powers this turn.",
    "threshold": null,
    "artist": "Rocky Hammer",
    "status": "active",
    "from": null,
    "unique": "lightning's swift strike",
    "caseName": "Lightning's Boon",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740115/powers/lightning%27s_boon.png"
  },
  "overgrow in a night": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753442/powers_cards/overgrow_in_a_night.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Add 1 Presence. -or- If target land has your Presence and Invaders, 3 Fear.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "a spread of rampant green",
    "caseName": "Overgrow in a Night",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740117/powers/overgrow_in_a_night.png"
  },
  "smothering infestation": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753443/powers_cards/smothering_infestation.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "Add 1 Disease. If target land is a Jungle or Wetland, 2 Fear and 3 Damage.",
    "threshold": {
      "elements": {
        "w": 2,
        "p": 2
      },
      "ability": "1 Damage to each Invader."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Smothering Infestation",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740118/powers/smothering_infestation.png"
  },
  "dreams of the dahan": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753444/powers_cards/dreams_of_the_dahan.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a"
    ],
    "speed": "fast",
    "range": 2,
    "target": "any land",
    "text": "Gather up to 2 Dahan. -or- If target land has Towns/Cities, 1 Fear for each Dahan, to a maximum of 3 Fear.",
    "threshold": null,
    "artist": "Shane Tyree",
    "status": "active",
    "from": null,
    "unique": "bringer of dreams and nightmares",
    "caseName": "Dreams of the Dahan",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740119/powers/dreams_of_the_dahan.png"
  },
  "bombard with boulders and stinging seeds": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753445/powers_cards/bombard_with_boulders_and_stinging_seeds.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "major",
    "cost": 2,
    "elements": [
      "a",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 2,
    "target": "any land",
    "text": "1 Fear. 2 Damage. Add 1 Badlands.",
    "threshold": {
      "elements": {
        "a": 2,
        "e": 2,
        "p": 3
      },
      "ability": "1 Fear. 2 Damage. Add 1 Wilds."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": "mountain or jungle",
    "caseName": "Bombard with Boulders and Stinging Seeds",
    "art": null
  },
  "scour the land": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753447/powers_cards/scour_the_land.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "a",
      "e"
    ],
    "speed": "slow",
    "range": 2,
    "target": "any land",
    "text": "Destroy 3 Towns and all Explorers. Add 1 Blight.",
    "threshold": {
      "elements": {
        "a": 3
      },
      "ability": "This Power may be Fast."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "caseName": "Scour the Land",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740120/powers/scour_the_land.png"
  },
  "talons of lightning": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753448/powers_cards/talons_of_lightning.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "major",
    "cost": 6,
    "elements": [
      "f",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "mountain or wetland",
    "text": "3 Fear. 5 Damage.",
    "threshold": {
      "elements": {
        "f": 3,
        "a": 3
      },
      "ability": "Destroy 1 Town in each adjacent land. Increase this Power's Range to 3."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Talons of Lightning",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740121/powers/talons_of_lightning.png"
  },
  "shatter homesteads": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753448/powers_cards/shatter_homesteads.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "a"
    ],
    "speed": "slow",
    "range": 2,
    "target": "any land",
    "text": "1 Fear. Destroy 1 Town.",
    "threshold": null,
    "artist": "Rocky Hammer",
    "status": "active",
    "from": "sacred site",
    "unique": "lightning's swift strike",
    "caseName": "Shatter Homesteads",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740121/powers/shatter_homesteads.png"
  },
  "mists of oblivion": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753450/powers_cards/mists_of_oblivion.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "1 Fear per Town/City this Power Destroys (max. 4 Fear). 1 Damage to each Invader.",
    "threshold": {
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
    "caseName": "Mists of Oblivion",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740123/powers/mists_of_oblivion.png"
  },
  "renewing rain": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753451/powers_cards/renewing_rain.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "w",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "If target land is a Jungle or Sands, Remove 1 Blight.",
    "threshold": {
      "elements": {
        "p": 3
      },
      "ability": "Add 1 Wilds."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "sacred site",
    "caseName": "Renewing Rain",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740125/powers/renewing_rain.png"
  },
  "guardian serpents": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753452/powers_cards/guardian_serpents.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "any spirit",
    "text": "Add 1 Beasts in one of target Spirit's lands. If target Spirit has a Sacred Site in that land: Defend 4 there.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Guardian Serpents",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740126/powers/guardian_serpents.png"
  },
  "winds of rust and atrophy": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753453/powers_cards/winds_of_rust_and_atrophy.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "1 Fear and Defend 6. Downgrade 1 Town/City.",
    "threshold": {
      "elements": {
        "a": 3,
        "w": 3,
        "n": 2
      },
      "ability": "Repeat this Power."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "caseName": "Winds of Rust and Atrophy",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740127/powers/winds_of_rust_and_atrophy.png"
  },
  "infested aquifers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753454/powers_cards/infested_aquifers.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "any land",
    "text": "If target land has any Disease, 1 Damage to each Invader. -or- If target land is a Mountain or Wetland, 1 Fear and add 1 Disease.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Infested Aquifers",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740128/powers/infested_aquifers.png"
  },
  "poisoned dew": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753458/powers_cards/poisoned_dew.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "f",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Destroy 1 Explorer. If target land is a Jungle or a Wetland, Destroy all Explorer.",
    "threshold": null,
    "artist": "Cari Corene",
    "status": "active",
    "from": null,
    "caseName": "Poisoned Dew",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740129/powers/poisoned_dew.png"
  },
  "cast down into the briny deep": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753459/powers_cards/cast_down_into_the_briny_deep.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "coastal",
    "text": "6 Fear. Destroy all Invaders.",
    "threshold": {
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
    "from": "sacred site",
    "caseName": "Cast Down Into the Briny Deep",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740130/powers/cast_down_into_the_briny_deep.png"
  },
  "swarming wasps": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753461/powers_cards/swarming_wasps.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "f",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "no blight",
    "text": "Add 1 Beasts. -or- If target land has Beasts, Push up to 2 Explorers.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Swarming Wasps",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740131/powers/swarming_wasps.png"
  },
  "raging storm": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753462/powers_cards/raging_storm.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "f",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "1 Damage to each Invader.",
    "threshold": null,
    "artist": "Rocky Hammer",
    "status": "active",
    "from": null,
    "unique": "lightning's swift strike",
    "caseName": "Raging Storm",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740132/powers/raging_storm.png"
  },
  "bloodwrack plague": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753463/powers_cards/bloodwrack_plague.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "w",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Add 2 Disease. For each Disease in target land, Defend 1 in target and all adjacent lands.",
    "threshold": {
      "elements": {
        "e": 2,
        "n": 4
      },
      "ability": "2 Fear. For each Disease in target land, do 1 Damage in target or an adjacent land."
    },
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "sacred site",
    "caseName": "Bloodwrack Plague",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740133/powers/bloodwrack_plague.png"
  },
  "pact of the joined hunt": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753464/powers_cards/pact_of_the_joined_hunt.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": null,
    "target": "any spirit",
    "text": "Target Spirit Gathers 1 Dahan into one of their lands. 1 Damage in that land per Dahan present.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "caseName": "Pact of the Joined Hunt",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740135/powers/pact_of_the_joined_hunt.png"
  },
  "bargain of coursing paths": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753465/powers_cards/bargain_of_coursing_paths.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "dahans",
    "text": "Bargain: 1 Presence now and -1 Energy/turn. Now: Mark both target land and another land with 2 or more Dahan. Ongoing: After pieces are added or moved into the marked lands: choose any land, then Move those pieces directly to that land.",
    "threshold": {
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
    "caseName": "Bargain of Coursing Paths",
    "art": null
  },
  "exaltation of the incandescent sky": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753466/powers_cards/exaltation_of_the_incandescent_sky.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "another spirit",
    "text": "Target Spirit may play 1 Power Card by paying its cost, make up to 2 of their Powers Fast this turn, and do 3 Damage in one of their lands. You may do likewise.",
    "threshold": {
      "elements": {
        "s": 3,
        "f": 3,
        "a": 4,
        "w": 2
      },
      "ability": "In any 4 lands on the island, Skip 1 Invader Action. 5 Fear (total)."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "caseName": "Exaltation of the Incandescent Sky",
    "art": null
  },
  "sweep into the sea": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753467/powers_cards/sweep_into_the_sea.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 2,
    "target": "any land",
    "text": "Push all Explorers and Towns one land towards the nearest Ocean. -or- If target land is Coastal, Destroy all Explorers and Towns.",
    "threshold": {
      "elements": {
        "s": 3,
        "w": 2
      },
      "ability": "Repeat on an adjacent land."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Sweep into the Sea",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740137/powers/sweep_into_the_sea.png"
  },
  "sea monsters": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753468/powers_cards/sea_monsters.png",
    "set": [
      "branch and claw",
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 5,
    "elements": [
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "coastal or wetland",
    "text": "Add 1 Beasts. If Invaders are present, 2 Fear per Beasts (max. 8 Fear). 3 Damage per Beasts. 1 Damage per Blight.",
    "threshold": {
      "elements": {
        "w": 3,
        "n": 3
      },
      "ability": "Repeat this Power."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Sea Monsters",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740138/powers/sea_monsters.png"
  },
  "fire and flood": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753469/powers_cards/fire_and_flood.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "any two lands",
    "text": "4 Damage in each target land. (Range must be measured from the same Sacred Site.)",
    "threshold": {
      "elements": {
        "f": 3
      },
      "ability": "+4 Damage in either target land. 3 — 3 Water: +4 Damage in either target land."
    },
    "artist": "Jason Behnke",
    "status": "active",
    "from": "sacred site",
    "caseName": "Fire and Flood",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740139/powers/fire_and_flood.png"
  },
  "volcanic eruption": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753470/powers_cards/volcanic_eruption.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "major",
    "cost": 8,
    "elements": [
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "6 Fear. 20 Damage. Destroy all Dahan and Beasts. Add 1 Blight.",
    "threshold": {
      "elements": {
        "f": 4,
        "e": 3
      },
      "ability": "Destroy all Invaders. Add 1 Wilds. In each adjacent land: 10 Damage. Destroy all Dahan and Beasts. If there are no Blight, add 1 Blight."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "mountain",
    "caseName": "Volcanic Eruption",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740140/powers/volcanic_eruption.png"
  },
  "absorb essence": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753471/powers_cards/absorb_essence.png",
    "set": [
      "promo pack 1",
      "feather and flame"
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
    "target": "another spirit",
    "text": "Gain 3 Energy. Move 1 of target Spirit's Presence from the board to your \"Deep Slumber\" track. Absorbed Presence cannot be returned to play. Target Spirit gains 1 Any (Element) and 1 Energy.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "serpent slumbering beneath the island",
    "caseName": "Absorb Essence",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740141/powers/absorb_essence.png"
  },
  "unrelenting growth": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753472/powers_cards/unrelenting_growth.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "any spirit",
    "text": "Target Spirit adds 2 Presence and 1 Wilds to a land at Range 1 of their Presence.",
    "threshold": {
      "elements": {
        "s": 3,
        "p": 3
      },
      "ability": "In that land, add 1 additional Wilds and Remove 1 Blight. Target Spirit gains a Power Card."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Unrelenting Growth",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740142/powers/unrelenting_growth.png"
  },
  "promises of protection": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753472/powers_cards/promises_of_protection.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 2,
    "target": "any land",
    "text": "Gather up to 2 Dahan. Dahan have +2 Health while in target land.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": "sacred site",
    "caseName": "Promises of Protection",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740143/powers/promises_of_protection.png"
  },
  "tigers hunting": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753474/powers_cards/tigers_hunting.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "major",
    "cost": 2,
    "elements": [
      "s",
      "m",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "no blight",
    "text": "2 Fear. Add 1 Beasts. Gather up to 1 Beasts. 1 Damage per Beasts. Push up to 2 Beasts.",
    "threshold": {
      "elements": {
        "s": 2,
        "m": 2,
        "n": 3
      },
      "ability": "1 Damage in an adjacent land without Blight, and +1 Damage per Beasts there."
    },
    "artist": "Cari Corene",
    "status": "active",
    "from": "jungle",
    "caseName": "Tigers Hunting",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740144/powers/tigers_hunting.png"
  },
  "wrap in wings of sunlight": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753475/powers_cards/wrap_in_wings_of_sunlight.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "Move up to 5 Dahan to any land (including back into target land). If you moved at least 1 Dahan, Defend 5 in that land.",
    "threshold": {
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
    "caseName": "Wrap in Wings of Sunlight",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740145/powers/wrap_in_wings_of_sunlight.png"
  },
  "insatiable hunger of the swarm": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753476/powers_cards/insatiable_hunger_of_the_swarm.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "a",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 2,
    "target": "any land",
    "text": "Add 1 Blight. Add 2 Beasts. Gather up to 2 Beasts. Each Beasts deals 1 Fear, 2 Damage to Invaders and 2 Damage to Dahan. Destroy 1 Beasts.",
    "threshold": {
      "elements": {
        "a": 2,
        "n": 4
      },
      "ability": "Repeat this Power on an adjacent land."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": "sacred site",
    "caseName": "Insatiable Hunger of the Swarm",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740147/powers/insatiable_hunger_of_the_swarm.png"
  },
  "prowling panthers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753477/powers_cards/prowling_panthers.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "mountain or jungle",
    "text": "1 Fear. Add 1 Beasts. -or- If target land has Beasts, Destroy 1 Explorer/Town.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Prowling Panthers",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740149/powers/prowling_panthers.png"
  },
  "strangling firevine": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753478/powers_cards/strangling_firevine.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "f",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Destroy all Explorers. Add 1 Wilds. Add 1 Wilds in the originating Sands. 1 Damage per Wilds in/adjacent to target land.",
    "threshold": {
      "elements": {
        "f": 2,
        "p": 3
      },
      "ability": "+1 Damage per Wilds in / adjacent to target land."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "sands",
    "caseName": "Strangling Firevine",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740150/powers/strangling_firevine.png"
  },
  "weep for what is lost": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753479/powers_cards/weep_for_what_is_lost.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "f",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "blight",
    "text": "1 Fear per type of Invader present. Push up to 1 Explorer/Town per Blight.",
    "threshold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "caseName": "Weep for What is Lost",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740151/powers/weep_for_what_is_lost.png"
  },
  "elemental aegis": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753480/powers_cards/elemental_aegis.png",
    "set": [
      "promo pack 1",
      "feather and flame"
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
    "target": "any land",
    "text": "Defend 2 in target land and all adjacent lands. For every Presence on your \"Deep Slumber\" track, Defend 1 in target land and all adjacent lands.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "serpent slumbering beneath the island",
    "caseName": "Elemental Aegis",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740152/powers/elemental_aegis.png"
  },
  "flocking red-talons": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753481/powers_cards/flocking_red-talons.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "any land",
    "text": "Add 1 Beasts. Move up to 2 Beasts within 3 Range to target land. For each Beasts present, choose a different Invader. 1 Damage to each of those Invaders. Push 1 Explorer/Town per Beasts.",
    "threshold": {
      "elements": {
        "a": 2,
        "p": 2,
        "n": 3
      },
      "ability": "Repeat this Power on a different land within 3 Range (of target land)."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": "wetland",
    "caseName": "Flocking Red-Talons",
    "art": null
  },
  "manifest incarnation": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753483/powers_cards/manifest_incarnation.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "city",
    "text": "6 Fear. +1 Fear for each Town/City and for each of your Presence in target land. Remove 1 City, 1 Town and 1 Explorer. Then Invaders in target land Ravage.",
    "threshold": {
      "elements": {
        "s": 3,
        "m": 3
      },
      "ability": "+3 Fear. Invaders do -6 Damage on their Ravage."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Manifest Incarnation",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740153/powers/manifest_incarnation.png"
  },
  "towering wrath": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753484/powers_cards/towering_wrath.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "s",
      "f",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "2 Fear. For each of your Sacred Site in/adjacent to target land, 2 Damage. Destroy all Dahan.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "unique": "keeper of the forbidden wilds",
    "caseName": "Towering Wrath",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740154/powers/towering_wrath.png"
  },
  "sucking ooze": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753485/powers_cards/sucking_ooze.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "m",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "sands or wetland",
    "text": "2 Fear if Invaders are present. Isolate target land.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Sucking Ooze",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740155/powers/sucking_ooze.png"
  },
  "forests of living obsidian": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753486/powers_cards/forests_of_living_obsidian.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "any land",
    "text": "Add 1 Badlands. Push all Dahan. 1 Damage to each Invader. If the origin land is your Sacred Site, +1 Damage to each Invader.",
    "threshold": {
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
    "caseName": "Forests of Living Obsidian",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740156/powers/forests_of_living_obsidian.png"
  },
  "flame's fury": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753487/powers_cards/flame%27s_fury.png",
    "set": [
      "promo pack 1",
      "feather and flame"
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
    "target": "any spirit",
    "text": "Target Spirit gains 1 Energy. Target Spirit does +1 Damage with each Damage dealing Power they use this turn. (Powers which Damage multiple lands or each Invader only get 1 extra Damage total. Repeated Powers keep the +1 boost. Destroy effects don't get any bonus.)",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "heart of the wildfire",
    "caseName": "Flame's Fury",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740156/powers/flame%27s_fury.png"
  },
  "gift of flowing power": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753488/powers_cards/gift_of_flowing_power.png",
    "set": [
      "promo pack 1",
      "feather and flame"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "w"
    ],
    "speed": "fast",
    "range": null,
    "target": "another spirit",
    "text": "Target Spirit gains 1 Energy. Target Spirit chooses to either: Play another Power Card by paying its cost. -or- Gain 1Fire and 1Water.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "serpent slumbering beneath the island",
    "caseName": "Gift of Flowing Power",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740157/powers/gift_of_flowing_power.png"
  },
  "rites of the land's rejection": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753489/powers_cards/rites_of_the_land%27s_rejection.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "e"
    ],
    "speed": "fast",
    "range": 2,
    "target": "dahan",
    "text": "Invaders do not Build in target land this turn. 1 Fear per Town/City or 1 Fear per Dahan, whichever is less. -or- Push up to 3 Dahan.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "caseName": "Rites of the Land's Rejection",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740158/powers/rites_of_the_land%27s_rejection.png"
  },
  "renewing boon": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753490/powers_cards/renewing_boon.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "another spirit",
    "text": "Choose a land where you and target Spirit both have Presence. In that land: Remove 1 Blight, and target Spirit may add 1 of their Destroyed Presence.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Renewing Boon",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740159/powers/renewing_boon.png"
  },
  "grasping tide": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753491/powers_cards/grasping_tide.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "w"
    ],
    "speed": "fast",
    "range": 1,
    "target": "coastal",
    "text": "2 Fear. Defend 4.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "ocean's hungry grasp",
    "caseName": "Grasping Tide",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740160/powers/grasping_tide.png"
  },
  "asphyxiating smoke": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753492/powers_cards/asphyxiating_smoke.png",
    "set": [
      "promo pack 1",
      "feather and flame"
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
    "target": "any land",
    "text": "1 Fear. Destroy 1 Town. Push 1 Dahan.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "sacred site",
    "unique": "heart of the wildfire",
    "caseName": "Asphyxiating Smoke",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740161/powers/asphyxiating_smoke.png"
  },
  "predatory nightmares": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753493/powers_cards/predatory_nightmares.png",
    "set": [
      "spirit island"
    ],
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
    "target": "invaders",
    "text": "2 Damage. Push up to 2 Dahan. (When your Powers would Destroy Invaders, instead they generate Fear and/or Push those Invaders.)",
    "threshold": null,
    "artist": "Shane Tyree",
    "status": "active",
    "from": "sacred site",
    "unique": "bringer of dreams and nightmares",
    "caseName": "Predatory Nightmares",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740162/powers/predatory_nightmares.png"
  },
  "strong and constant currents": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753494/powers_cards/strong_and_constant_currents.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 0,
    "target": "coastal",
    "text": "Push 1 Explorer/Town to an adjacent Coastal land. -or- Move up to 2 Dahan between target land and one other Coastal land.",
    "threshold": {
      "elements": {
        "w": 2
      },
      "ability": "You may do both."
    },
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "caseName": "Strong and Constant Currents",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740163/powers/strong_and_constant_currents.png"
  },
  "teeth gleam from darkness": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753494/powers_cards/teeth_gleam_from_darkness.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "no blight",
    "text": "1 Fear. Add 1 Beasts. -or- If target land has both Beasts and Invaders: 3 Fear.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "jungle",
    "unique": "sharp fangs behind the leaves",
    "caseName": "Teeth Gleam from Darkness",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740164/powers/teeth_gleam_from_darkness.png"
  },
  "pyroclastic flow": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753496/powers_cards/pyroclastic_flow.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "f",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "2 Damage. Destroy all Explorers. If target land is a Jungle or Wetland, add 1 Blight.",
    "threshold": {
      "elements": {
        "f": 2,
        "a": 3,
        "e": 2
      },
      "ability": "+4 Damage. Add 1 Wilds."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "mountain",
    "caseName": "Pyroclastic Flow",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740165/powers/pyroclastic_flow.png"
  },
  "hazards spread across the island": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753496/powers_cards/hazards_spread_across_the_island.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "any land",
    "text": "Choose a type of token from Badlands/Beasts/Disease/Strife/Wilds that exists in an adjacent land; choosing Disease costs 1 Energy. Add 1 of that type of token to target land.",
    "threshold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": "sacred site",
    "caseName": "Hazards Spread Across the Island",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740166/powers/hazards_spread_across_the_island.png"
  },
  "birds cry warning": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753497/powers_cards/birds_cry_warning.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 3,
    "target": "dahan",
    "text": "The next time Dahan would be Destroyed in target land, Destroy 2 fewer Dahan. -or- Push up to 3 Dahan.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Birds Cry Warning",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740166/powers/birds_cry_warning.png"
  },
  "like calls to like": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753498/powers_cards/like_calls_to_like.png",
    "set": [
      "jagged earth"
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
    "target": "any land",
    "text": "If target land has Explorer, Gather up to 1 Explorer. Do likewise for Town, Dahan, Blight, and Beasts.",
    "threshold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "caseName": "Like Calls to Like",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740167/powers/like_calls_to_like.png"
  },
  "flow downriver, blow downwind": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753499/powers_cards/flow_downriver%2C_blow_downwind.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "a",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 2,
    "target": "any land",
    "text": "Push up to 1 Blight/Explorer/Town.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "caseName": "Flow Downriver, Blow Downwind",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740168/powers/flow_downriver%2C_blow_downwind.png"
  },
  "sacrosanct wilderness": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753500/powers_cards/sacrosanct_wilderness.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "no blight",
    "text": "Push 2 Dahan. 2 Damage per Wilds in target land. -or- Add 1 Wilds.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "keeper of the forbidden wilds",
    "caseName": "Sacrosanct Wilderness",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740169/powers/sacrosanct_wilderness.png"
  },
  "death falls gently from open blossoms": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753502/powers_cards/death_falls_gently_from_open_blossoms.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "m",
      "a",
      "p"
    ],
    "speed": "slow",
    "range": 3,
    "target": "jungle or sands",
    "text": "4 Damage. If any Invaders remain, add 1 Disease.",
    "threshold": {
      "elements": {
        "a": 3,
        "p": 3
      },
      "ability": "3 Fear. Add 1 Disease to 2 adjacent lands with Invaders."
    },
    "artist": "Graham Stermberg",
    "status": "active",
    "from": null,
    "caseName": "Death Falls Gently from Open Blossoms",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740170/powers/death_falls_gently_from_open_blossoms.png"
  },
  "sear anger into the wild lands": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753503/powers_cards/sear_anger_into_the_wild_lands.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "f",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Add 1 Badlands. -or- If Wilds and Invaders are present, 1 Fear and 1 Damage.",
    "threshold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "caseName": "Sear Anger Into the Wild Lands",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740171/powers/sear_anger_into_the_wild_lands.png"
  },
  "favor of the sun and star-lit dark": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753504/powers_cards/favor_of_the_sun_and_star-lit_dark.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Defend 4. Push up to 1 Blight.",
    "threshold": {
      "elements": {
        "s": 2
      },
      "ability": "1 Fear."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": "sacred site",
    "caseName": "Favor of the Sun and Star-lit Dark",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740172/powers/favor_of_the_sun_and_star-lit_dark.png"
  },
  "flash-fires": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753505/powers_cards/flash-fires.png",
    "set": [
      "promo pack 1",
      "feather and flame"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "a"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "1 Fear. 1 Damage.",
    "threshold": {
      "elements": {
        "a": 2
      },
      "ability": "This Power is Fast."
    },
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "heart of the wildfire",
    "caseName": "Flash-Fires",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740173/powers/flash-fires.png"
  },
  "desiccating winds": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753506/powers_cards/desiccating_winds.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "f",
      "a",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "mountain or sands",
    "text": "If target land has Badlands, 1 Damage. Add 1 Badlands.",
    "threshold": null,
    "artist": "Shawn Daley",
    "status": "active",
    "from": "sacred site",
    "caseName": "Desiccating Winds",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740174/powers/desiccating_winds.png"
  },
  "blur the arc of years": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753507/powers_cards/blur_the_arc_of_years.png",
    "set": [
      "jagged earth"
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
    "target": "any land",
    "text": "If no Dahan/Invaders are present: Remove 1 Blight. If invaders are present: they Build, then Ravage. If Dahan are present: Add 1 Dahan. Push up to 2 Dahan. You may repeat this Power (once) on the same land by spending 1 Time.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "fractured days split the sky",
    "caseName": "Blur the Arc of Years",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740175/powers/blur_the_arc_of_years.png"
  },
  "terror turns to madness": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753508/powers_cards/terror_turns_to_madness.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 2,
    "target": "invaders",
    "text": "If the Terror Level is... Terror Level 1: 3 Fear. Terror Level 2: 2 Fear or add 1 Strife. Terror Level 3: Add 1 Strife.",
    "threshold": null,
    "artist": "Shawn Daley",
    "status": "active",
    "from": null,
    "caseName": "Terror Turns to Madness",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740176/powers/terror_turns_to_madness.png"
  },
  "dry wood explodes in smoldering splinters": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753509/powers_cards/dry_wood_explodes_in_smoldering_splinters.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "f",
      "a",
      "p"
    ],
    "speed": "slow",
    "range": 0,
    "target": "not wetland",
    "text": "You may spend 1 Energy to make this Power Fast. 2 Fear. 1 Damage.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "caseName": "Dry Wood Explodes in Smoldering Splinters",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740176/powers/dry_wood_explodes_in_smoldering_splinters.png"
  },
  "unlock the gates of deepest power": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753510/powers_cards/unlock_the_gates_of_deepest_power.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "any spirit",
    "text": "Target Spirit gains a Major Power by drawing 2 and keeping 1, without having to Forget another Power Card.",
    "threshold": {
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
    "caseName": "Unlock the Gates of Deepest Power",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740177/powers/unlock_the_gates_of_deepest_power.png"
  },
  "treacherous waterways": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753511/powers_cards/treacherous_waterways.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "f",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "mountain or wetland",
    "text": "Add 1 Wilds. -or- Push 1 Explorer.",
    "threshold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "caseName": "Treacherous Waterways",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740178/powers/treacherous_waterways.png"
  },
  "vengeance of the dead": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753512/powers_cards/vengeance_of_the_dead.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "3 Fear. After Towns/Cities/Dahan are Destroyed in target land, 1 Damage per Town/City/Dahan Destroyed. (This cannot trigger itself.)",
    "threshold": {
      "elements": {
        "n": 3
      },
      "ability": "Damage from this Power may be dealt in adjacent lands."
    },
    "artist": "Kat Birmelin",
    "status": "active",
    "from": null,
    "caseName": "Vengeance of the Dead",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740180/powers/vengeance_of_the_dead.png"
  },
  "bargains of power and protection": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753513/powers_cards/bargains_of_power_and_protection.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "dahan",
    "text": "Remove 1 of your Presence on the island from the game, setting it on the Reminder Card. From now on: each Dahan within 1 Range of your Presence provides Defend 1 in its land, and you gain 1 less Energy each turn. (This effect stacks if used multiple times.)",
    "threshold": {
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
    "caseName": "Bargains of Power and Protection",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740181/powers/bargains_of_power_and_protection.png"
  },
  "skies herald the season of return": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753515/powers_cards/skies_herald_the_season_of_return.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "any land",
    "text": "A Spirit with Presence on target board may add 1 of their Destroyed Presence. Gather up to 2 Dahan. Push 1 Blight.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Skies Herald the Season of Return",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740182/powers/skies_herald_the_season_of_return.png"
  },
  "mesmerized tranquility": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753519/powers_cards/mesmerized_tranquility.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "w",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "any land",
    "text": "Isolate target land. Each Invader does -1 Damage.",
    "threshold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "caseName": "Mesmerized Tranquility",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740183/powers/mesmerized_tranquility.png"
  },
  "irresistible call": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753519/powers_cards/irresistible_call.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 6,
    "elements": [
      "s",
      "a",
      "p"
    ],
    "speed": "fast",
    "range": 2,
    "target": "inland",
    "text": "Gather 5 Towns, 5 Dahan, 5 Beasts, and 15 Explorers.",
    "threshold": {
      "elements": {
        "s": 2,
        "a": 3,
        "p": 2
      },
      "ability": "Invaders skip all Actions in target land. Isolate target land."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": "sacred site",
    "caseName": "Irresistible Call",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740184/powers/irresistible_call.png"
  },
  "twisted flowers murmur ultimatums": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753520/powers_cards/twisted_flowers_murmur_ultimatums.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "invaders",
    "text": "4 Fear. Add 1 Strife. If the Terror Level is 2 or higher, Remove 2 Invaders.",
    "threshold": {
      "elements": {
        "m": 3,
        "a": 2,
        "p": 3
      },
      "ability": "+3 Fear, before the Terror Level check. 3 Damage."
    },
    "artist": "Kat Birmelin",
    "status": "active",
    "from": "sacred site",
    "caseName": "Twisted Flowers Murmur Ultimatums",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740184/powers/twisted_flowers_murmur_ultimatums.png"
  },
  "transform to a murderous darkness": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753521/powers_cards/transform_to_a_murderous_darkness.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "any spirit",
    "text": "Target Spirit may choose one of their Sacred Site. In that land: Replace all their Presence with Badlands; the replaced Presence leaves the game. Push any number of those Badlands. 3 Fear. 3 Damage per Presence Replaced.",
    "threshold": {
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
    "caseName": "Transform to a Murderous Darkness",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740185/powers/transform_to_a_murderous_darkness.png"
  },
  "terrifying chase": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753522/powers_cards/terrifying_chase.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "Push 2 Explorers/Towns/Dahan. Push another 2 Explorers/Towns/Dahan per Beasts in target land. If you Pushed any Invaders, 2 Fear.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "sharp fangs behind the leaves",
    "caseName": "Terrifying Chase",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740186/powers/terrifying_chase.png"
  },
  "entrap the forces of corruption": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753523/powers_cards/entrap_the_forces_of_corruption.png",
    "set": [
      "jagged earth"
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
    "target": "any land",
    "text": "Gather up to 1 Blight. Isolate target land. When Blight is added to target land, it doesn't cascade.",
    "threshold": null,
    "artist": "Shawn Daley",
    "status": "active",
    "from": null,
    "caseName": "Entrap the Forces of Corruption",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740187/powers/entrap_the_forces_of_corruption.png"
  },
  "flow like water, reach like air": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753524/powers_cards/flow_like_water%2C_reach_like_air.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "major",
    "cost": 2,
    "elements": [
      "a",
      "w"
    ],
    "speed": "fast",
    "range": null,
    "target": "any spirit",
    "text": "Target Spirit gets +2 Range with all Powers. Target Spirit may Push 1 of their Presence to an adjacent land, bringing up to 2 Explorers, 2 Towns and 2 Dahan along with it.",
    "threshold": {
      "elements": {
        "a": 2,
        "w": 2
      },
      "ability": "The moved Presence may also bring along up to 2 Cities and up to 2 Blight."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Flow like Water, Reach like Air",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740188/powers/flow_like_water%2C_reach_like_air.png"
  },
  "unleash a torrent of the self's own essence": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753525/powers_cards/unleash_a_torrent_of_the_self%27s_own_essence.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "yourself",
    "text": "Gain 4 Energy. You may forget a Power card to gain 4 more Energy. -or- Pay X Energy (min. 1) to deal X Damage in a land at 0 Range.",
    "threshold": {
      "elements": {
        "s": 2,
        "f": 3
      },
      "ability": "You may do both."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Unleash a Torrent of the Self's Own Essence",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740189/powers/unleash_a_torrent_of_the_self%27s_own_essence.png"
  },
  "walls of rock and thorn": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753527/powers_cards/walls_of_rock_and_thorn.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "s",
      "e",
      "p"
    ],
    "speed": "fast",
    "range": 2,
    "target": "mountain or jungle",
    "text": "2 Damage. Defend 8. Add 1 Wilds. Isolate target land.",
    "threshold": {
      "elements": {
        "e": 2,
        "p": 2
      },
      "ability": "+2 Damage. +2 Defend. Add 1 Badlands."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "caseName": "Walls of Rock and Thorn",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740190/powers/walls_of_rock_and_thorn.png"
  },
  "the past returns again": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753528/powers_cards/the_past_returns_again.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "m"
    ],
    "speed": "fast",
    "range": null,
    "target": null,
    "text": "Cost to Use: N Time, and Spirits jointly pay N Energy (where N = # of players). Swap the top card of the Invader Deck with a card in the Invader discard that is within 1 Invader Stage of it. (The discarded card stays face-down. The card going into the deck turns face-down. You can't swap cards that don't exist.)",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "fractured days split the sky",
    "caseName": "The Past Returns Again",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740191/powers/the_past_returns_again.png"
  },
  "pour time sideways": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753529/powers_cards/pour_time_sideways.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "fast",
    "range": null,
    "target": "yourself",
    "text": "Cost to Use: 3 Time. Move 1 of your Presence to a different land with your Presence. On the board moved from: During the Invader Phase, Resolve Invader and \"Each board/Each land...\" Actions one fewer time. On the board moved to: During the Invader Phase, Resolve Invader and \"Each board/Each Land...\" Actions one more time.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "fractured days split the sky",
    "caseName": "Pour Time Sideways",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740192/powers/pour_time_sideways.png"
  },
  "too near the jungle": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753530/powers_cards/too_near_the_jungle.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "1 Fear. Destroy 1 Explorer.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "jungle",
    "unique": "sharp fangs behind the leaves",
    "caseName": "Too Near the Jungle",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740193/powers/too_near_the_jungle.png"
  },
  "bats scout for raids by darkness": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753531/powers_cards/bats_scout_for_raids_by_darkness.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": 2,
    "target": "any land",
    "text": "For each Dahan, 1 Damage to Towns/Cities. -or- 1 Fear. Gather up to 2 Dahan.",
    "threshold": null,
    "artist": "Shawn Daley",
    "status": "active",
    "from": null,
    "caseName": "Bats Scout for Raids by Darkness",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740197/powers/bats_scout_for_raids_by_darkness.png"
  },
  "unquenchable flames": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753532/powers_cards/unquenchable_flames.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 2,
    "target": "any land",
    "text": "1 Fear. 1 Damage to Towns/Cities. Invaders do not heal Damage at end of turn.",
    "threshold": {
      "elements": {
        "f": 2
      },
      "ability": "Add 1 Badlands."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": "sacred site",
    "caseName": "Unquenchable Flames",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740198/powers/unquenchable_flames.png"
  },
  "dream of the untouched land": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753533/powers_cards/dream_of_the_untouched_land.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "any land",
    "text": "Remove up to 3 Blight and up to 3 Health worth of Invaders.",
    "threshold": {
      "elements": {
        "m": 3,
        "w": 2,
        "e": 3,
        "p": 2
      },
      "ability": "(Max. 1x/game) Add a random new Island Board next to target board. Ignore its Setup icons; add 2 Beasts, 2 Wilds, 2 Badlands and up to 2 Presence (from any Spirits) anywhere on it. From now on, Build cards and \"Each board / Each land\" Adversary Actions skip 1 Board."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "caseName": "Dream of the Untouched Land",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740199/powers/dream_of_the_untouched_land.png"
  },
  "gift of the primordial deeps": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753533/powers_cards/gift_of_the_primordial_deeps.png",
    "set": [
      "promo pack 1",
      "feather and flame"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "e"
    ],
    "speed": "fast",
    "range": null,
    "target": "another spirit",
    "text": "Target Spirit gains a Minor Power. Target Spirit chooses to either: Play it immediately by paying its cost. -or- Gain 1Moon and 1Earth.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": null,
    "unique": "serpent slumbering beneath the island",
    "caseName": "Gift of the Primordial Deeps",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740201/powers/gift_of_the_primordial_deeps.png"
  },
  "territorial strife": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753534/powers_cards/territorial_strife.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "city",
    "text": "3 Damage to Explorers/Towns. -or- Add 1 Strife.",
    "threshold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "caseName": "Territorial Strife",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740202/powers/territorial_strife.png"
  },
  "carapaced land": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753535/powers_cards/carapaced_land.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "e",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "any land",
    "text": "If targeting a land with Beasts, this Power has +1 Range. Defend 3.",
    "threshold": {
      "elements": {
        "e": 2
      },
      "ability": "Defend +3."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "caseName": "Carapaced Land",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740203/powers/carapaced_land.png"
  },
  "thriving chokefungus": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753537/powers_cards/thriving_chokefungus.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "w",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "jungle or wetland",
    "text": "Add 1 Disease and 1 Badlands.",
    "threshold": null,
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "sacred site",
    "caseName": "Thriving Chokefungus",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740204/powers/thriving_chokefungus.png"
  },
  "softly beckon ever inward": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753538/powers_cards/softly_beckon_ever_inward.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "a"
    ],
    "speed": "slow",
    "range": 0,
    "target": "inland",
    "text": "Gather up to 2 Explorers. Gather up to 2 Towns. Gather up to 2 Beasts. Gather up to 2 Dahan.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "lure of the deep wilderness",
    "caseName": "Softly Beckon Ever Inward",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740205/powers/softly_beckon_ever_inward.png"
  },
  "sleep and never waken": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753538/powers_cards/sleep_and_never_waken.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "any land",
    "text": "Invaders skip all Actions in target land. 1 Fear per 2 Explorers this Power Removes. Remove up to 2 Explorers.",
    "threshold": {
      "elements": {
        "m": 3,
        "a": 2,
        "n": 2
      },
      "ability": "Remove up to 6 Explorers from among your lands."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sands",
    "caseName": "Sleep and Never Waken",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740206/powers/sleep_and_never_waken.png"
  },
  "thickets erupt with every touch of breeze": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753539/powers_cards/thickets_erupt_with_every_touch_of_breeze.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "a",
      "p"
    ],
    "speed": "fast",
    "range": 2,
    "target": "inland",
    "text": "2 Damage. Then either: Add 3 Wilds. -or- Remove 1 Blight.",
    "threshold": {
      "elements": {
        "p": 3
      },
      "ability": "1 Fear. +2 Damage."
    },
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "sacred site",
    "caseName": "Thickets Erupt with Every Touch of Breeze",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740207/powers/thickets_erupt_with_every_touch_of_breeze.png"
  },
  "gift of the untamed wild": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753541/powers_cards/gift_of_the_untamed_wild.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "any spirit",
    "text": "Target Spirit chooses to either: Add 1 Wilds to one of their lands. -or- Replace 1 of their Presence with 1 Disease.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "lure of the deep wilderness",
    "caseName": "Gift of the Untamed Wild",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740208/powers/gift_of_the_untamed_wild.png"
  },
  "the shore seethes with hatred": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753542/powers_cards/the_shore_seethes_with_hatred.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "coastal",
    "text": "1 Fear. Add 1 Badlands and 1 Wilds.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "The Shore Seethes with Hatred",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740209/powers/the_shore_seethes_with_hatred.png"
  },
  "angry bears": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753543/powers_cards/angry_bears.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "s",
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "2 Fear. 2 Damage. If no Beasts are present, add 1 Beasts. Otherwise, +2 Damage, and Push up to 1 Beasts.",
    "threshold": {
      "elements": {
        "f": 2,
        "n": 3
      },
      "ability": "1 Fear and Destroy 1 Explorer/Town in an adjacent land with Beasts."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Angry Bears",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740210/powers/angry_bears.png"
  },
  "settle into hunting-grounds": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753544/powers_cards/settle_into_hunting-grounds.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "yourself",
    "text": "Your Presence may count as Badlands and Beasts. (Decide per Presence, per Action.) Your Presence cannot move.",
    "threshold": {
      "elements": {
        "p": 2,
        "n": 3
      },
      "ability": "2 Fear and 2 Damage in one of your lands."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Settle Into Hunting-Grounds",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740210/powers/settle_into_hunting-grounds.png"
  },
  "incite the mob": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753545/powers_cards/incite_the_mob.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "invaders",
    "text": "1 Invader with Strife deals Damage to other Invaders (not to each Invader). 1 Fear per Invader this Power Destroyed.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "grinning trickster stirs up trouble",
    "caseName": "Incite the Mob",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740211/powers/incite_the_mob.png"
  },
  "scream disease into the wind": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753546/powers_cards/scream_disease_into_the_wind.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "a",
      "w",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "another spirit",
    "text": "Target Spirit gets +1 Range with all their Powers. Once this turn, after target Spirit uses a Power targeting a land, they may add 1 Disease to that land. (Hand them a Disease token as a reminder.)",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Scream Disease Into the Wind",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740212/powers/scream_disease_into_the_wind.png"
  },
  "domesticated animals go berserk": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753547/powers_cards/domesticated_animals_go_berserk.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "town or city",
    "text": "1 Fear. Defend 5.",
    "threshold": {
      "elements": {
        "m": 3
      },
      "ability": "Add 1 Beasts."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Domesticated Animals Go Berserk",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740213/powers/domesticated_animals_go_berserk.png"
  },
  "sunset's fire flows across the land": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753548/powers_cards/sunset%27s_fire_flows_across_the_land.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "any land",
    "text": "1 Fear. 1 Damage. You may pay 1 Energy to deal 1 Damage in an adjacent land.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "sacred site",
    "caseName": "Sunset's Fire Flows Across the Land",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740214/powers/sunset%27s_fire_flows_across_the_land.png"
  },
  "set them on an ever-twisting trail": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753550/powers_cards/set_them_on_an_ever-twisting_trail.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "a",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Gather or Push 1 Explorer. Isolate target land.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "caseName": "Set Them on an Ever-Twisting Trail",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740215/powers/set_them_on_an_ever-twisting_trail.png"
  },
  "melt earth into quicksand": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753551/powers_cards/melt_earth_into_quicksand.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "m",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "sands or wetland",
    "text": "1 Fear. 2 Damage. Isolate target land. After Invaders/Dahan are Moved into target land, Destroy them.",
    "threshold": {
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
    "caseName": "Melt Earth Into Quicksand",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740216/powers/melt_earth_into_quicksand.png"
  },
  "dread apparitions": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753551/powers_cards/dread_apparitions.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "invaders",
    "text": "When Powers generate Fear in target land, Defend 1 per Fear. 1 Fear. (Fear from To Dream a Thousand Deaths counts. Fear from Destroying Towns/Cities does not.)",
    "threshold": null,
    "artist": "Shane Tyree",
    "status": "active",
    "from": null,
    "unique": "bringer of dreams and nightmares",
    "caseName": "Dread Apparitions",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740217/powers/dread_apparitions.png"
  },
  "vanish softly away, forgotten by all": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753552/powers_cards/vanish_softly_away%2C_forgotten_by_all.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "m",
      "a"
    ],
    "speed": "slow",
    "range": 2,
    "target": "any land",
    "text": "Remove 1 Invader and 1 Explorer/Town. -or- Remove all Damaged Invaders. Adversary or Scenario rules that prevent or alter Removal do not affect this Power.",
    "threshold": {
      "elements": {
        "m": 3,
        "a": 3
      },
      "ability": "In any 2 lands with 4 or more Invaders: Remove 1 Invader."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Vanish Softly Away, Forgotten by All",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740217/powers/vanish_softly_away%2C_forgotten_by_all.png"
  },
  "overenthusiastic arson": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753553/powers_cards/overenthusiastic_arson.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Destroy 1 Town. Discard the top card of the Minor Power Deck. If it provides Fire: 1 Fear, 2 Damage, and add 1 Blight.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "grinning trickster stirs up trouble",
    "caseName": "Overenthusiastic Arson",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740218/powers/overenthusiastic_arson.png"
  },
  "perils of the deepest island": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753554/powers_cards/perils_of_the_deepest_island.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "inland",
    "text": "1 Fear. Add 1 Badlands. Add 1 Beasts within 1 Range. Push up to 2 Dahan.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "lure of the deep wilderness",
    "caseName": "Perils of the Deepest Island",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740219/powers/perils_of_the_deepest_island.png"
  },
  "voice of command": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753555/powers_cards/voice_of_command.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "s",
      "a"
    ],
    "speed": "fast",
    "range": 1,
    "target": "dahan",
    "text": "1 Damage per Dahan/Explorer, to Towns/Cities only. Defend 2. During Ravage Actions, Explorers fight alongside Dahan. (Deal/take Damage at the same time, and to/from the same sources.)",
    "threshold": {
      "elements": {
        "s": 3,
        "a": 2
      },
      "ability": "First, Gather up to 2 Explorers/Towns/Dahan."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": "sacred site",
    "caseName": "Voice of Command",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740220/powers/voice_of_command.png"
  },
  "impersonate authority": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753556/powers_cards/impersonate_authority.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Add 1 Strife.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "grinning trickster stirs up trouble",
    "caseName": "Impersonate Authority",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740221/powers/impersonate_authority.png"
  },
  "elemental teachings": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753560/powers_cards/elemental_teachings.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": null,
    "target": "any spirit",
    "text": "Prepare 1 Element Marker. Discard up to 3 Element Markers. Target Spirit gains those Elements. (They can be any combination of Elements - the same or different.)",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "shifting memory of ages",
    "caseName": "Elemental Teachings",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740222/powers/elemental_teachings.png"
  },
  "pursue with scratches, pecks, and stings": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753562/powers_cards/pursue_with_scratches%2C_pecks%2C_and_stings.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "beast",
    "text": "1 Fear. For each Beasts past the first, Push 1 Explorer/Town.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "many minds move as one",
    "caseName": "Pursue with Scratches, Pecks, and Stings",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740223/powers/pursue_with_scratches%2C_pecks%2C_and_stings.png"
  },
  "dark skies loose a stinging rain": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753563/powers_cards/dark_skies_loose_a_stinging_rain.png",
    "set": [
      "promo pack 2",
      "feather and flame"
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
    "target": "any land",
    "text": "Isolate target land. Push up to 1 Explorer and up to 2 Dahan.",
    "threshold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": "wetland",
    "unique": "downpour drenches the world",
    "caseName": "Dark Skies Loose a Stinging Rain",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740224/powers/dark_skies_loose_a_stinging_rain.png"
  },
  "guide the way on feathered wings": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753564/powers_cards/guide_the_way_on_feathered_wings.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Move 1 Beasts up to two lands. As it moves, up to 2 Dahan may move with it, for part or all of the way. (The Beasts/Dahan may move to an adjacent land and then back.)",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "many minds move as one",
    "caseName": "Guide the Way on Feathered Wings",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740226/powers/guide_the_way_on_feathered_wings.png"
  },
  "the wounded wild turns on its assailants": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753566/powers_cards/the_wounded_wild_turns_on_its_assailants.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "f",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "blight",
    "text": "Add 2 Badlands. Gather up to 2 Beasts. 1 Damage per Blight/Beasts/Wilds.",
    "threshold": {
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
    "caseName": "The Wounded Wild Turns on its Assailants",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740226/powers/the_wounded_wild_turns_on_its_assailants.png"
  },
  "study the invaders' fears": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753567/powers_cards/study_the_invaders%27_fears.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "town or city",
    "text": "2 Fear. Turn the top card of the Fear Deck face-up.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "shifting memory of ages",
    "caseName": "Study the Invaders' Fears",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740227/powers/study_the_invaders%27_fears.png"
  },
  "call to guard": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753568/powers_cards/call_to_guard.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [
      "s",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Gather up to 1 Dahan. Then, if Dahan are present, either: Defend 1 per Dahan. -or- After Invaders are added or moved to target land, 1 Damage to each added or moved Invader.",
    "threshold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "caseName": "Call to Guard",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740228/powers/call_to_guard.png"
  },
  "boon of ancient memories": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753569/powers_cards/boon_of_ancient_memories.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "any spirit",
    "text": "If you target yourself, gain a Minor Power. Otherwise: Target Spirit gains a Power Card. If it's a Major Power, they may pay 2 Energy instead of Forgetting a Power Card.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "shifting memory of ages",
    "caseName": "Boon of Ancient Memories",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740229/powers/boon_of_ancient_memories.png"
  },
  "trees radiate celestial brilliance": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753570/powers_cards/trees_radiate_celestial_brilliance.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "s",
      "m",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "jungle or no blight",
    "text": "3 Fear. Defend 6. This turn, Invaders in target land skip the next Build Action.",
    "threshold": {
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
    "caseName": "Trees Radiate Celestial Brilliance",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740230/powers/trees_radiate_celestial_brilliance.png"
  },
  "unnerving pall": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753571/powers_cards/unnerving_pall.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "invaders",
    "text": "1 Fear. Up to 3 Damaged Invaders do not participate in Ravage. -or- 1 Fear. Defend 1 per Presence you have in target land (when this Power is used).",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "shroud of silent mist",
    "caseName": "Unnerving Pall",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740231/powers/unnerving_pall.png"
  },
  "utter a curse of dread and bone": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753572/powers_cards/utter_a_curse_of_dread_and_bone.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 4,
    "elements": [
      "m",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "For each Blight in/adjacent to target land, add 1 Badlands, 1 Disease, or 1 Strife. (Max. +3 of each.) Then: 2 Fear. 1 Damage.",
    "threshold": {
      "elements": {
        "m": 3,
        "n": 2
      },
      "ability": "For each type of token you added, add 1 more within 1 Range. 1 Damage in an adjacent land."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "caseName": "Utter a Curse of Dread and Bone",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740232/powers/utter_a_curse_of_dread_and_bone.png"
  },
  "gather the scattered light of stars": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753573/powers_cards/gather_the_scattered_light_of_stars.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m"
    ],
    "speed": "slow",
    "range": null,
    "target": "yourself",
    "text": "At end of turn after discarding: Reclaim up to 2 cards to your hand. You may then Forget a Unique Power Card to Reclaim up to 3 additional cards.",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "starlight seeks its form",
    "caseName": "Gather the Scattered Light of Stars",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740232/powers/gather_the_scattered_light_of_stars.png"
  },
  "storm-swath": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753575/powers_cards/storm-swath.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "f",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "2 Fear. In both origin land and target land: 1 Damage to each Invader.",
    "threshold": {
      "elements": {
        "f": 2,
        "a": 3,
        "w": 2
      },
      "ability": "+1 Fear. This Power has +1 Range. In a land adjacent to both origin and target, 1 Damage to each Invader. In lands where you did Damage, Destroy 1 Town."
    },
    "artist": "Jorge Ramos",
    "status": "active",
    "from": "sacred site",
    "caseName": "Storm-Swath",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740233/powers/storm-swath.png"
  },
  "boon of reimagining": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753578/powers_cards/boon_of_reimagining.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m"
    ],
    "speed": "slow",
    "range": null,
    "target": "any spirit",
    "text": "Target Spirit may Forget a Power Card from hand or discard to draw 6 Minor Power Cards and gain 2 of them. If you target another Spirit, they gain 1 Energy.",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "starlight seeks its form",
    "caseName": "Boon of Reimagining",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740234/powers/boon_of_reimagining.png"
  },
  "weave together the fabric of place": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753579/powers_cards/weave_together_the_fabric_of_place.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "any land",
    "text": "Target land and a land adjacent to it become a single land for this turn. (It has the terrain and land # of both lands. When this effect expires, divide pieces as you wish; all of them are considered moved.)",
    "threshold": {
      "elements": {
        "a": 4
      },
      "ability": "Isolate the joined land. If it has Invaders, 2 Fear, and Remove up to 2 Invaders."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "caseName": "Weave Together the Fabric of Place",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740235/powers/weave_together_the_fabric_of_place.png"
  },
  "shape the self anew": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753580/powers_cards/shape_the_self_anew.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m"
    ],
    "speed": "slow",
    "range": null,
    "target": "yourself",
    "text": "Gain a Minor Power. You may Forget this Power Card to gain 3 Energy.",
    "threshold": {
      "elements": {
        "m": 4
      },
      "ability": "You may gain a Major Power instead of a Minor Power."
    },
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "starlight seeks its form",
    "caseName": "Shape the Self Anew",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740236/powers/shape_the_self_anew.png"
  },
  "share secrets of survival": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753581/powers_cards/share_secrets_of_survival.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Each time Dahan would be Destroyed in target land, Destroy 2 fewer Dahan. -or- Gather up to 2 Dahan.",
    "threshold": {
      "elements": {
        "a": 3
      },
      "ability": "You may do both."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": "sacred site",
    "unique": "shifting memory of ages",
    "caseName": "Share Secrets of Survival",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740237/powers/share_secrets_of_survival.png"
  },
  "strike low with sudden fevers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753582/powers_cards/strike_low_with_sudden_fevers.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "disease",
    "text": "1 Fear. Invaders skip Ravage Actions.",
    "threshold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "vengeance as a burning plague",
    "caseName": "Strike Low with Sudden Fevers",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740238/powers/strike_low_with_sudden_fevers.png"
  },
  "a dreadful tide of scurrying flesh": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753583/powers_cards/a_dreadful_tide_of_scurrying_flesh.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "w",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "beasts",
    "text": "Remove up to half (round down) of Beasts in target land. For each Beasts Removed, 2 Fear and skip one Invader Action.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "sacred site",
    "unique": "many minds move as one",
    "caseName": "A Dreadful Tide of Scurrying Flesh",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740239/powers/a_dreadful_tide_of_scurrying_flesh.png"
  },
  "unexpected tigers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753583/powers_cards/unexpected_tigers.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "1 Fear if Invaders are present. If you can gather 1 Beasts, do so, then push 1 Explorer. Otherwise, add 1 Beasts.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "grinning trickster stirs up trouble",
    "caseName": "Unexpected Tigers",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740240/powers/unexpected_tigers.png"
  },
  "peace of the nighttime sky": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753584/powers_cards/peace_of_the_nighttime_sky.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "If the Terror Level is 1, Invaders do not Ravage in target land this turn. You may Repeat this Power. If you do, Forget this Power Card and Gain 1 Moon.",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": "sacred site",
    "unique": "starlight seeks its form",
    "caseName": "Peace of the Nighttime Sky",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740240/powers/peace_of_the_nighttime_sky.png"
  },
  "focus the land's anguish": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753586/powers_cards/focus_the_land%27s_anguish.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 5,
    "elements": [
      "s"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "If this Power Destroys any Towns/Cities, 5 Fear. Gather up to 5 Blight. 1 Damage per Blight.",
    "threshold": {
      "elements": {
        "s": 3
      },
      "ability": "+1 Damage per Blight."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Focus the Land's Anguish",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740241/powers/focus_the_land%27s_anguish.png"
  },
  "boon of swarming bedevilment": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753586/powers_cards/boon_of_swarming_bedevilment.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "a",
      "w",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "another spirit",
    "text": "For the rest of this turn, each of target Spirit's Presence grants Defend 1 in its land. Target Spirit may Push up to 1 of their Presence.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "many minds move as one",
    "caseName": "Boon of Swarming Bedevilment",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740242/powers/boon_of_swarming_bedevilment.png"
  },
  "spur on with words of fire": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753587/powers_cards/spur_on_with_words_of_fire.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "fast",
    "range": null,
    "target": "any spirit",
    "text": "If you target a Spirit other than yourself, they gain +1 Energy. Target Spirit may immediately play another Power Card by paying its cost. (If it is Slow, it does not resolve until later.)",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Spur on with Words of Fire",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740243/powers/spur_on_with_words_of_fire.png"
  },
  "aid from the spirit-speakers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753588/powers_cards/aid_from_the_spirit-speakers.png",
    "set": [
      "promo pack 2",
      "feather and flame"
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
    "target": "any land",
    "text": "For each Dahan, you may move 1 Invader/Dahan/Presence/Beasts to a land within 2 Range that has Dahan.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "finder of paths unseen",
    "caseName": "Aid from the Spirit-Speakers",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740244/powers/aid_from_the_spirit-speakers.png"
  },
  "swallowed by the wilderness": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753589/powers_cards/swallowed_by_the_wilderness.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "inland",
    "text": "2 Fear. 1 Damage per Beasts/Disease/Wilds/Badlands. (Count max. 5 tokens.)",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "lure of the deep wilderness",
    "caseName": "Swallowed by the Wilderness",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740245/powers/swallowed_by_the_wilderness.png"
  },
  "stubborn solidity": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753592/powers_cards/stubborn_solidity.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Defend 1 per Dahan. Dahan in target land cannot be changed. (When they would be Damaged, Destroyed, Removed, Replaced, or moved, instead don't.)",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "stone's unyielding defiance",
    "caseName": "Stubborn Solidity",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740246/powers/stubborn_solidity.png"
  },
  "paths tied by nature": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753593/powers_cards/paths_tied_by_nature.png",
    "set": [
      "promo pack 2",
      "feather and flame"
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
    "target": "any land",
    "text": "Move up to 2 Invaders/Dahan/Presence/Beasts to a land within 2 Range that has the same terrain.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "finder of paths unseen",
    "caseName": "Paths Tied by Nature",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740247/powers/paths_tied_by_nature.png"
  },
  "sky stretches to shore": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753594/powers_cards/sky_stretches_to_shore.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "any spirit",
    "text": "This turn, target Spirit may use 1 Slow Power as if it were Fast, or vice versa. Target Spirit gains +3 Range for measuring Range to Coastal lands.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Sky Stretches to Shore",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740248/powers/sky_stretches_to_shore.png"
  },
  "intractable thickets and thorns": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753595/powers_cards/intractable_thickets_and_thorns.png",
    "set": [
      "horizons of spirit island"
    ],
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
    "target": "any land",
    "text": "1 Fear. Defend 5.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "fathomless mud of the swamp",
    "caseName": "Intractable Thickets and Thorns",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740249/powers/intractable_thickets_and_thorns.png"
  },
  "rain of ash": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753596/powers_cards/rain_of_ash.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "a",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "2 Fear if Invaders are present. Push 2 Dahan and 2 Explorers/Towns to land(s) without your Presence.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "volcano looming high",
    "caseName": "Rain of Ash",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740250/powers/rain_of_ash.png"
  },
  "the fog closes in": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753597/powers_cards/the_fog_closes_in.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "For each adjacent land with your Presence, 1 Damage to a different Invader. Push 2 Dahan.",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "shroud of silent mist",
    "caseName": "The Fog Closes In",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740251/powers/the_fog_closes_in.png"
  },
  "flowing and silent forms dart by": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753598/powers_cards/flowing_and_silent_forms_dart_by.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "fast",
    "range": 0,
    "target": "any land",
    "text": "2 Fear if Invaders are present. When Presence in target land would be Destroyed, its owner may, if possible, instead Push that Presence. You may Gather 1 Presence/Sacred Site of another Spirit (with their permission).",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "shroud of silent mist",
    "caseName": "Flowing and Silent Forms Dart By",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740252/powers/flowing_and_silent_forms_dart_by.png"
  },
  "plows shatter on rocky ground": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753599/powers_cards/plows_shatter_on_rocky_ground.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "1 Damage to each Town/City. Push up to 1 Town. -or- Destroy 1 Town.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "stone's unyielding defiance",
    "caseName": "Plows Shatter on Rocky Ground",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740253/powers/plows_shatter_on_rocky_ground.png"
  },
  "instruments of their own ruin": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753600/powers_cards/instruments_of_their_own_ruin.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "any land",
    "text": "Add 1 Strife. Each Invader with Strife deals Damage to other Invaders in target land.",
    "threshold": {
      "elements": {
        "s": 4,
        "f": 2,
        "n": 2
      },
      "ability": "Instead, if Invaders Ravage in target land, they Damage Invaders in adjacent lands instead of Dahan and the land. Dahan in target land do not fight back."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": "sacred site",
    "caseName": "Instruments of Their Own Ruin",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740255/powers/instruments_of_their_own_ruin.png"
  },
  "gift of searing heat": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753601/powers_cards/gift_of_searing_heat.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "fast",
    "range": null,
    "target": "another spirit",
    "text": "Target Spirit gains 2 Energy -or- Target Spirit may pay 1 Energy to do 1 Damage in one of their lands.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "rising heat of stone and sand",
    "caseName": "Gift of Searing Heat",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740257/powers/gift_of_searing_heat.png"
  },
  "eerie noises and moving trees": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753602/powers_cards/eerie_noises_and_moving_trees.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "a",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "2 Fear. Push up to 2 Explorer/Town.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "eyes watch from the trees",
    "caseName": "Eerie Noises and Moving Trees",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740258/powers/eerie_noises_and_moving_trees.png"
  },
  "savage transformation": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753603/powers_cards/savage_transformation.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "major",
    "cost": 2,
    "elements": [
      "m",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "2 Fear. Replace 1 Explorer with 1 Beasts.",
    "threshold": {
      "elements": {
        "m": 2,
        "n": 3
      },
      "ability": "Replace 1 additional Explorer with 1 Beasts in either target or adjacent land."
    },
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "caseName": "Savage Transformation",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740259/powers/savage_transformation.png"
  },
  "teeming rivers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753604/powers_cards/teeming_rivers.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "mountain or wetland",
    "text": "If target land has no Blight, add 1 Beasts. If target land has exactly 1 Blight, Remove it.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": "sacred site",
    "caseName": "Teeming Rivers",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740260/powers/teeming_rivers.png"
  },
  "swallowed by the endless dark": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753605/powers_cards/swallowed_by_the_endless_dark.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "fast",
    "range": 0,
    "target": "invaders",
    "text": "2 Fear. Abduct 1 Explorer.",
    "threshold": {
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
    "caseName": "Swallowed by the Endless Dark",
    "art": null
  },
  "absolute stasis": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753606/powers_cards/absolute_stasis.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 2,
    "target": "any land",
    "text": "Cost to Use: 1 Time. Until the end of the Slow phase, target land and everything in it cease to exist for all purposes except checking victory/defeat. (You cannot target into, out of, or through where the land was.) This cannot target an Ocean even if Oceans are in play.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": "sacred site",
    "unique": "fractured days split the sky",
    "caseName": "Absolute Stasis",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740261/powers/absolute_stasis.png"
  },
  "plaguebearers": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753606/powers_cards/plaguebearers.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 2,
    "target": "disease",
    "text": "1 Fear if Invaders are present. For each Disease, Push 2 Explorer/Town/Dahan. 1 Disease may move with each Pushed piece.",
    "threshold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "vengeance as a burning plague",
    "caseName": "Plaguebearers",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740262/powers/plaguebearers.png"
  },
  "pent-up calamity": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753607/powers_cards/pent-up_calamity.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "any land",
    "text": "Add 1 Disease and 1 Strife. -or- Remove any number of Beasts/Disease/Strife/Wilds. For each token Removed, 1 Fear and 3 Damage.",
    "threshold": {
      "elements": {
        "m": 2,
        "f": 3
      },
      "ability": "If you have Removed tokens, return up to 2 of them. Otherwise, add 2 Strife."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Pent-Up Calamity",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740262/powers/pent-up_calamity.png"
  },
  "infestation of venomous spiders": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753608/powers_cards/infestation_of_venomous_spiders.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "invaders",
    "text": "Add 1 Beasts. Gather up to 1 Beasts. For each Beasts, 1 Fear (max. 4) and Invaders skip one Action in target land.",
    "threshold": {
      "elements": {
        "a": 2,
        "e": 2,
        "n": 3
      },
      "ability": "After this Power causes Invaders to skip an Action, 4 Damage."
    },
    "artist": "Lucas Durham",
    "status": "active",
    "from": "sacred site",
    "caseName": "Infestation of Venomous Spiders",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740263/powers/infestation_of_venomous_spiders.png"
  },
  "foundations sink into mud": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753609/powers_cards/foundations_sink_into_mud.png",
    "set": [
      "promo pack 2",
      "feather and flame"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "2 Damage to Town. If target land is a Wetland, you may instead deal 1 Damage to each Town/City.",
    "threshold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "downpour drenches the world",
    "caseName": "Foundations Sink into Mud",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740264/powers/foundations_sink_into_mud.png"
  },
  "frightful keening": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753610/powers_cards/frightful_keening.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "slow",
    "range": null,
    "target": "wandering voice keens delirium's incarna",
    "text": "Push your Incarna. If this pushes your Incarna into a land with Invaders, 2 Fear there (before adding Strife).",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "wandering voice keens delirium",
    "caseName": "Frightful Keening",
    "art": null
  },
  "dissolving vapors": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753611/powers_cards/dissolving_vapors.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "1 Fear. 1 Damage to each Invader. 1 Damage to each Dahan.",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "shroud of silent mist",
    "caseName": "Dissolving Vapors",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740268/powers/dissolving_vapors.png"
  },
  "gift of twinned days": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753612/powers_cards/gift_of_twinned_days.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "s",
      "m"
    ],
    "speed": "fast",
    "range": null,
    "target": "another spirit",
    "text": "Once this turn, target Spirit may Repeat the lowest-cost Power Card they have in play by paying it's cost again. You may do likewise.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "caseName": "Gift of Twinned Days",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740269/powers/gift_of_twinned_days.png"
  },
  "lava flows": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753613/powers_cards/lava_flows.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Add 1 Badlands and 1 Wilds. -or- 1 Damage.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "volcano looming high",
    "caseName": "Lava Flows",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740270/powers/lava_flows.png"
  },
  "rumbling earthquakes": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753614/powers_cards/rumbling_earthquakes.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "major",
    "cost": 6,
    "elements": [
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "This Power ignores Health bonuses. 3 Fear. 6 Damage, to Towns/Cities only. 6 Damage among adjacent lands, to Towns/Cities only.",
    "threshold": {
      "elements": {
        "e": 4
      },
      "ability": "6 Damage among target/adjacent lands, to Towns/Cities only."
    },
    "artist": "Emily Hancock",
    "status": "active",
    "from": "sacred site",
    "caseName": "Rumbling Earthquakes",
    "art": null
  },
  "foul vapors and fetid muck": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753615/powers_cards/foul_vapors_and_fetid_muck.png",
    "set": [
      "horizons of spirit island"
    ],
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
    "target": "invaders",
    "text": "1 Fear. Push up to 2 Explorer.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "sacred site",
    "unique": "fathomless mud of the swamp",
    "caseName": "Foul Vapors and Fetid Muck",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740270/powers/foul_vapors_and_fetid_muck.png"
  },
  "blinding glare": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753616/powers_cards/blinding_glare.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "a"
    ],
    "speed": "fast",
    "range": 0,
    "target": "invaders",
    "text": "2 Fear. -or- Skip up to one Ravage Action.",
    "threshold": {
      "elements": {
        "s": 5
      },
      "ability": "Instead, 3 Fear. -or- Skip up to one Invader Action."
    },
    "artist": "Agnieszka Dabrowiecka",
    "status": "active",
    "from": "sacred site",
    "unique": "relentless gaze of the sun",
    "caseName": "Blinding Glare",
    "art": null
  },
  "fetid breath spreads infection": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753617/powers_cards/fetid_breath_spreads_infection.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "a",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "invaders",
    "text": "1 Fear. Add 1 Disease.",
    "threshold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "vengeance as a burning plague",
    "caseName": "Fetid Breath Spreads Infection",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740271/powers/fetid_breath_spreads_infection.png"
  },
  "gift of furious might": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753618/powers_cards/gift_of_furious_might.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "another spirit",
    "text": "Target Spirit may deal +3 Damage this turn with one of its Damage-dealing Powers. (This adds +3 Damage total, even for a Power that Damages multiple Invaders or each Invader.)",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "devouring teeth lurk underfoot",
    "caseName": "Gift of Furious Might",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740272/powers/gift_of_furious_might.png"
  },
  "herd towards the lurking maw": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753619/powers_cards/herd_towards_the_lurking_maw.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "w",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "1 Fear. Gather up to 1 Explorer/Town.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "devouring teeth lurk underfoot",
    "caseName": "Herd Towards the Lurking Maw",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740273/powers/herd_towards_the_lurking_maw.png"
  },
  "unbearable gaze": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753620/powers_cards/unbearable_gaze.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "f"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "1 Fear. Push 2 Explorers/Towns from origin or target land (or 1 Explorer/Town from each).",
    "threshold": null,
    "artist": "Agnieszka Dabrowiecka",
    "status": "active",
    "from": "sacred site",
    "unique": "relentless gaze of the sun",
    "caseName": "Unbearable Gaze",
    "art": null
  },
  "blazing intimidation": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753621/powers_cards/blazing_intimidation.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "1 Fear. Push 2 Explorers/Towns to a land without your Incarna.",
    "threshold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "ember-eyed behemoth",
    "caseName": "Blazing Intimidation",
    "art": null
  },
  "rumblings portend a greater quake": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753622/powers_cards/rumblings_portend_a_greater_quake.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "any land",
    "text": "If you have at least as many Impending Cards as Power Cards in play, 1 Fear and Add 1 Quake. Push up to 3 Dahan.",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "dances up earthquakes",
    "caseName": "Rumblings Portend a Greater Quake",
    "art": null
  },
  "growth through sacrifice": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753623/powers_cards/growth_through_sacrifice.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "any spirit",
    "text": "Destroy 1 of your Presence. Target Spirit chooses to either: Remove 1 Blight from one of their lands. -or- Add 1 Presence to one of their lands.",
    "threshold": {
      "elements": {
        "s": 2
      },
      "ability": "They may do both, in the same land."
    },
    "artist": "Lucas Durham",
    "status": "replaced",
    "from": null,
    "caseName": "Growth Through Sacrifice",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740274/powers/growth_through_sacrifice.png"
  },
  "radiating tremors": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753624/powers_cards/radiating_tremors.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "2 Damage. You may Push any number of Quake, dividing them as evenly as possible between adjacent lands.",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "dances up earthquakes",
    "caseName": "Radiating Tremors",
    "art": null
  },
  "entwine the fates of all": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753625/powers_cards/entwine_the_fates_of_all.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "any spirit",
    "text": "In one of target Spirit's lands, Defend 2 per Presence (from all Spirits).",
    "threshold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": null,
    "unique": "towering roots of the jungle",
    "caseName": "Entwine the Fates of All",
    "art": null
  },
  "coordinated raid": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753626/powers_cards/coordinated_raid.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "1 Damage. If Dahan are Present, 1 Damage.",
    "threshold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": "dahan",
    "unique": "hearth-vigil",
    "caseName": "Coordinated Raid",
    "art": null
  },
  "focus the sun's rays": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753627/powers_cards/focus_the_sun%27s_rays.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "slow",
    "range": 2,
    "target": "any land",
    "text": "1 Damage. 2 Damage to Dahan. Move up to 3 Presence directly to target land (from anywhere on the island). You may Bring 1 Badlands (total) with those Presence.",
    "threshold": null,
    "artist": "Agnieszka Dabrowiecka",
    "status": "active",
    "from": "sacred site",
    "unique": "relentless gaze of the sun",
    "caseName": "Focus the Sun's Rays",
    "art": null
  },
  "inspire a winding dance": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753628/powers_cards/inspire_a_winding_dance.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "invaders",
    "text": "Push up to 1 Explorer / Town. Gather up to 1 Dahan.",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "dances up earthquakes",
    "caseName": "Inspire a Winding Dance",
    "art": null
  },
  "draw to the water's edge": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753629/powers_cards/draw_to_the_water%27s_edge.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "w",
      "p"
    ],
    "speed": "fast",
    "range": 0,
    "target": "any land",
    "text": "Gather up to 2 Towns from a single land.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "wounded waters bleeding",
    "caseName": "Draw to the Water's Edge",
    "art": null
  },
  "unbearable deluge": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753630/powers_cards/unbearable_deluge.png",
    "set": [
      "promo pack 2",
      "feather and flame"
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
    "target": "any land",
    "text": "1 Fear. Push 2 Dahan. Defend 3. If target land is a Wetland, Isolate it.",
    "threshold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "downpour drenches the world",
    "caseName": "Unbearable Deluge",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740275/powers/unbearable_deluge.png"
  },
  "solidify echoes of majesty past": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753631/powers_cards/solidify_echoes_of_majesty_past.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "any spirit",
    "text": "Choose one of target Spirit's lands. In that land and each adjacent land, Defend 3. They Add 1 Destroyed Presence to each adjacent land. Skip up to 1 Invader Action at each added Destroyed Presence.",
    "threshold": {
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
    "caseName": "Solidify Echoes of Majesty Past",
    "art": null
  },
  "wrack with pain and grief": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753632/powers_cards/wrack_with_pain_and_grief.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "w",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "invaders",
    "text": "2 Fear. Push 1 Explorer and 1 Town.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "blight",
    "unique": "wounded waters bleeding",
    "caseName": "Wrack with Pain and Grief",
    "art": null
  },
  "plague ships sail to distant ports": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753633/powers_cards/plague_ships_sail_to_distant_ports.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "coastal city",
    "text": "1 Fear. Add 4 Disease among Coastal lands (on any boards) other than target land.",
    "threshold": {
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
    "caseName": "Plague Ships Sail to Distant Ports",
    "art": null
  },
  "gift of living energy": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753634/powers_cards/gift_of_living_energy.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any spirit",
    "text": "Target Spirit gains 1 Energy. If you have at least 2 Sacred Sites, target Spirit gains 1 Energy. If you target another Spirit, they gain 1 Energy.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "caseName": "Gift of Living Energy",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740276/powers/gift_of_living_energy.png"
  },
  "ravaged undergrowth slithers back to life": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753637/powers_cards/ravaged_undergrowth_slithers_back_to_life.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "major",
    "cost": 3,
    "elements": [
      "w",
      "p",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "blight",
    "text": "Replace 1 Blight with 1 Wilds. 1 Fear. 3 Damage. Push that Wilds.",
    "threshold": {
      "elements": {
        "w": 3,
        "p": 2
      },
      "ability": "Add 1 Wilds. You may Push it. In each land with Wilds within 1 Range (of target land): Push 1 Explorer and 1 Town to lands without Wilds."
    },
    "artist": "Kat Guevara",
    "status": "active",
    "from": "sacred site",
    "caseName": "Ravaged Undergrowth Slithers Back to Life",
    "art": null
  },
  "boon of resilient power": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753639/powers_cards/boon_of_resilient_power.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "any spirit",
    "text": "Target Spirit may Add 1 Destroyed Presence to one of your lands. If you target yourself, gain a Major Power. Otherwise, target Spirit gains a Power Card.",
    "threshold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": null,
    "unique": "towering roots of the jungle",
    "caseName": "Boon of Resilient Power",
    "art": null
  },
  "flash floods": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753640/powers_cards/flash_floods.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "w"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "1 Damage. If target land is Coastal, +1 Damage.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "river surges in sunlight",
    "caseName": "Flash Floods",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740277/powers/flash_floods.png"
  },
  "exhale confusion and delirium": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753640/powers_cards/exhale_confusion_and_delirium.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "strife",
    "text": "2 Fear. Invaders with Strife don't participate in Ravage. (Check when Ravaging; they don't do Damage or take counterattack Damage.)",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "wandering voice keens delirium",
    "caseName": "Exhale Confusion and Delirium",
    "art": null
  },
  "roiling bog and snagging thorn": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753642/powers_cards/roiling_bog_and_snagging_thorn.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "any land",
    "text": "1 Fear. Isolate. Defend 2. 1 Dahan does not participate in Ravage. (Check when ravaging; it does not take Damage and does not counterattack.)",
    "threshold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": "sacred site",
    "caseName": "Roiling Bog and Snagging Thorn",
    "art": null
  },
  "whispered guidance through the night": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753643/powers_cards/whispered_guidance_through_the_night.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Gather up to 3 Dahan. If Invaders and Dahan are present, 1 Fear.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "jungle",
    "unique": "eyes watch from the trees",
    "caseName": "Whispered Guidance Through the Night",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740278/powers/whispered_guidance_through_the_night.png"
  },
  "boon of growing power": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753643/powers_cards/boon_of_growing_power.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "m",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "any spirit",
    "text": "Target Spirit gains a Power Card. If you target another Spirit, they also gain 1 Energy.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "keeper of the forbidden wilds",
    "caseName": "Boon of Growing Power",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740279/powers/boon_of_growing_power.png"
  },
  "wither bodies, scar stones": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753647/powers_cards/wither_bodies%2C_scar_stones.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 2,
    "target": "any land",
    "text": "1 Damage. -or- Add 1 Badlands.",
    "threshold": null,
    "artist": "Agnieszka Dabrowiecka",
    "status": "active",
    "from": "sacred site",
    "unique": "relentless gaze of the sun",
    "caseName": "Wither Bodies, Scar Stones",
    "art": null
  },
  "turmoil's touch": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753648/powers_cards/turmoil%27s_touch.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "another spirit",
    "text": "Target Spirit may either pay 1 Energy or discard a Power Card (from hand) to Take a Minor Power into their discard. You may do likewise.",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "wandering voice keens delirium",
    "caseName": "Turmoil's Touch",
    "art": null
  },
  "dire metamorphosis": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753649/powers_cards/dire_metamorphosis.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "any land",
    "text": "1 Fear. 1 Damage. 1 Damage to Dahan. Add 1 Badlands, 1 Beasts, 1 Disease, 1 Strife, 1 Wilds, and 1 Blight.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Dire Metamorphosis",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740280/powers/dire_metamorphosis.png"
  },
  "ferocious rampage": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753650/powers_cards/ferocious_rampage.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "1 Fear. 3 Damage to Explorer/Town only. (+1 Damage to Explorers/Towns from your \"Territorial Aggression\" Special Rule.)",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "devouring teeth lurk underfoot",
    "caseName": "Ferocious Rampage",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740281/powers/ferocious_rampage.png"
  },
  "spill bitterness into the earth": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753651/powers_cards/spill_bitterness_into_the_earth.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "major",
    "cost": 5,
    "elements": [
      "f",
      "w",
      "e"
    ],
    "speed": "fast",
    "range": 0,
    "target": "any land",
    "text": "6 Damage. Add 2 Badlands/Strife and 1 Blight. In up to 3 adjacent lands with Blight, add 1 Badlands/Strife.",
    "threshold": {
      "elements": {
        "f": 3,
        "w": 3
      },
      "ability": "In up to 3 adjacent lands, 1 Damage to each Invader."
    },
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Spill Bitterness Into the Earth",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740282/powers/spill_bitterness_into_the_earth.png"
  },
  "surging lahar": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753652/powers_cards/surging_lahar.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "w",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "2 Damage. If your Presence is present, Add 1 Badlands.",
    "threshold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": "sacred site",
    "unique": "ember-eyed behemoth",
    "caseName": "Surging Lahar",
    "art": null
  },
  "fiery vengeance": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753653/powers_cards/fiery_vengeance.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "f"
    ],
    "speed": "fast",
    "range": null,
    "target": "any spirit",
    "text": "Cost to Use: Target Spirit Removes 1 of their Destroyed Presence from the game. 1 Fear and 1 Damage in one of target Spirit's lands. (This is your Power, so Blight counts as Badlands, even if target is another Spirit.)",
    "threshold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "vengeance as a burning plague",
    "caseName": "Fiery Vengeance",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740282/powers/fiery_vengeance.png"
  },
  "haunted by primal memories": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753654/powers_cards/haunted_by_primal_memories.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 2,
    "target": "invaders",
    "text": "1 Fear. Defend 3. If Beasts are present, +2 Fear.",
    "threshold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": "sacred site",
    "caseName": "Haunted by Primal Memories",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740283/powers/haunted_by_primal_memories.png"
  },
  "sudden ambush": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753655/powers_cards/sudden_ambush.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "You may Gather 1 Dahan. Each Dahan Destroys 1 Explorer.",
    "threshold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "unique": "thunderspeaker",
    "caseName": "Sudden Ambush",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740284/powers/sudden_ambush.png"
  },
  "resounding footfalls sow dismay": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753656/powers_cards/resounding_footfalls_sow_dismay.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "f",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 0,
    "target": "any land",
    "text": "1 Fear. Add 1 Quake. Skip all Ravage Actions.",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "dances up earthquakes",
    "caseName": "Resounding Footfalls Sow Dismay",
    "art": null
  },
  "mysterious abductions": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753656/powers_cards/mysterious_abductions.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "p"
    ],
    "speed": "fast",
    "range": 0,
    "target": "any land",
    "text": "1 Fear. 1 Damage.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "eyes watch from the trees",
    "caseName": "Mysterious Abductions",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740285/powers/mysterious_abductions.png"
  },
  "unearth a beast of wrathful stone": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753658/powers_cards/unearth_a_beast_of_wrathful_stone.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "invaders",
    "text": "After the next Invader Phase (on any turn) with no Ravage/Build Actions in target land: 3 Fear. 12 Damage. Add 1 Beasts. You may Push that Beasts. 1 Fear and 2 Damage in its land.",
    "threshold": {
      "elements": {
        "m": 2,
        "e": 3,
        "n": 3
      },
      "ability": "Mark it (Marked Beasts). Marked Beasts can't leave the island. Each Slow Phase: You may Push Marked Beasts. 1 Fear and 2 Damage at Marked Beasts."
    },
    "artist": "David Markiwsky",
    "status": "active",
    "from": "sacred site",
    "caseName": "Unearth a Beast of Wrathful Stone",
    "art": null
  },
  "open shifting waterways": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753658/powers_cards/open_shifting_waterways.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Gather up to 2 Dahan. If Dahan and Invaders are present, 1 Fear and 1 Damage.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "fathomless mud of the swamp",
    "caseName": "Open Shifting Waterways",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740286/powers/open_shifting_waterways.png"
  },
  "surrounded by the dahan": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753659/powers_cards/surrounded_by_the_dahan.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "dahan",
    "text": "2 Fear if Invaders are present. 1 Fear if Dahan outnumber Towns/Cities. Isolate target land.",
    "threshold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": null,
    "unique": "hearth-vigil",
    "caseName": "Surrounded by the Dahan",
    "art": null
  },
  "sweltering exhaustion": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753660/powers_cards/sweltering_exhaustion.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "f",
      "a"
    ],
    "speed": "fast",
    "range": 2,
    "target": "any land",
    "text": "1 Fear. Skip up to 1 Ravage/Build Action.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": "sacred site",
    "unique": "rising heat of stone and sand",
    "caseName": "Sweltering Exhaustion",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740286/powers/sweltering_exhaustion.png"
  },
  "fragments of yesteryear": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753661/powers_cards/fragments_of_yesteryear.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "major",
    "cost": 7,
    "elements": [
      "s",
      "m"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "Remove all pieces, then Add the pieces matching target land's Setup symbols.",
    "threshold": {
      "elements": {
        "s": 3
      },
      "ability": "This power may be Fast. 3 — 3 Moon: Don't Remove Dahan, any Spirit's Presence, or Spirit Tokens. Don't add Invaders/Blight."
    },
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "caseName": "Fragments of Yesteryear",
    "art": null
  },
  "gift of the sunlit air": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753662/powers_cards/gift_of_the_sunlit_air.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "fast",
    "range": null,
    "target": "any spirit",
    "text": "Target Spirit gets RangePlus1 with all their Powers. If you target another Spirit, they gain 1 Energy.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "sun-bright whirlwind",
    "caseName": "Gift of the Sunlit Air",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740287/powers/gift_of_the_sunlit_air.png"
  },
  "traveler's boon": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753663/powers_cards/traveler%27s_boon.png",
    "set": [
      "promo pack 2",
      "feather and flame"
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
    "target": "another spirit",
    "text": "Target spirit moves up to 3 of their Presence to one of your lands. They may move up to 1 Invader, 1 Dahan and 1 Beasts along with their Presence. (Total, not for each Presence.)",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "finder of paths unseen",
    "caseName": "Traveler's Boon",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740289/powers/traveler%27s_boon.png"
  },
  "exaltation of molten stone": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753664/powers_cards/exaltation_of_molten_stone.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "e"
    ],
    "speed": "fast",
    "range": null,
    "target": "another spirit",
    "text": "Split 1 Energy per Fire you have between yourself and target Spirit, as evenly as possible. (Gained from the supply.) Target Spirit gains +1 Range with their Powers that originate from a Mountain.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "volcano looming high",
    "caseName": "Exaltation of Molten Stone",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740289/powers/exaltation_of_molten_stone.png"
  },
  "exaltation of tangled growth": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753665/powers_cards/exaltation_of_tangled_growth.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "w",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": null,
    "target": "another spirit",
    "text": "Target Spirit may pay 1 Energy to gain a Power Card. You may pay 2 Energy to gain a Power Card.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "fathomless mud of the swamp",
    "caseName": "Exaltation of Tangled Growth",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740290/powers/exaltation_of_tangled_growth.png"
  },
  "blood water and bloodlust": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753666/powers_cards/blood_water_and_bloodlust.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "w",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Add 1 Beast and 1 Disease.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": "blight",
    "unique": "wounded waters bleeding",
    "caseName": "Blood Water and Bloodlust",
    "art": null
  },
  "boon of watchful guarding": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753667/powers_cards/boon_of_watchful_guarding.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "e",
      "p",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "any spirit",
    "text": "In one of Target Spirit's lands, Defend 4. Target Spirit may pay 1 Energy to instead Defend 8. (This Power Defends a single land, letting you use your Special Rule, \"Dahan Trust the Watchers.\")",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "eyes watch from the trees",
    "caseName": "Boon of Watchful Guarding",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740291/powers/boon_of_watchful_guarding.png"
  },
  "emerge from the dread night wind": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753668/powers_cards/emerge_from_the_dread_night_wind.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a"
    ],
    "speed": "slow",
    "range": null,
    "target": "any land",
    "text": "Add/Move your Incarna to target land. 1 Fear. If exactly 1 Invader is present, Abduct it. Otherwise, Push up to 2 Explorers/Towns to different lands.",
    "threshold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "breath of darkness down your spine",
    "caseName": "Emerge from the Dread Night Wind",
    "art": null
  },
  "jagged shards push from the earth": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753668/powers_cards/jagged_shards_push_from_the_earth.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "f",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Add 1 Badlands. Push up to 2 Dahan.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "stone's unyielding defiance",
    "caseName": "Jagged Shards Push from the Earth",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740292/powers/jagged_shards_push_from_the_earth.png"
  },
  "blooming of the rocks and trees": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753669/powers_cards/blooming_of_the_rocks_and_trees.png",
    "set": [
      "nature incarnate"
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
    "target": "any land",
    "text": "If no Blight is Present, Add 1 Vitality. -or- If no Invaders are Present, Add 1 Strife.",
    "threshold": {
      "elements": {
        "p": 3
      },
      "ability": "You may do both."
    },
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": "sacred site",
    "unique": "towering roots of the jungle",
    "caseName": "Blooming of the Rocks and Trees",
    "art": null
  },
  "offer passage between worlds": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753670/powers_cards/offer_passage_between_worlds.png",
    "set": [
      "promo pack 2",
      "feather and flame"
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
    "target": "any land",
    "text": "Move up to 4 Dahan between target land and one of your lands. -or- The next time Dahan would be Destroyed in target land, Destroy 2 fewer Dahan.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "finder of paths unseen",
    "caseName": "Offer Passage Between Worlds",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740293/powers/offer_passage_between_worlds.png"
  },
  "twist perceptions": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753671/powers_cards/twist_perceptions.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "invaders",
    "text": "Add 1 Strife. You may Push the Invader you added Strife to. (If you add Strife to Explorers/Towns, you can push that Invader first with Senseless Roaming before pushing it with this Power.)",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "wandering voice keens delirium",
    "caseName": "Twist Perceptions",
    "art": null
  },
  "exaltation of echoed steps": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753672/powers_cards/exaltation_of_echoed_steps.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "w",
      "e"
    ],
    "speed": "slow",
    "range": null,
    "target": "another spirit",
    "text": "Target Spirit may Push 1 Presence, Bringing up to 1 Explorer/Town/Dahan. You may do likewise.",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "dances up earthquakes",
    "caseName": "Exaltation of Echoed Steps",
    "art": null
  },
  "call on herders for aid": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753673/powers_cards/call_on_herders_for_aid.png",
    "set": [
      "horizons of spirit island"
    ],
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
    "target": "any land",
    "text": "Gather up to 2 Dahan. For each Dahan present, Push up to 1 Explorer/Town/Dahan.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "rising heat of stone and sand",
    "caseName": "Call on Herders for Aid",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740294/powers/call_on_herders_for_aid.png"
  },
  "a circuitous and wending journey": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753674/powers_cards/a_circuitous_and_wending_journey.png",
    "set": [
      "promo pack 2",
      "feather and flame"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "Push up to half (round up) of Invaders from target land. Do likewise (separately) for Dahan, Presence, and Beasts.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "finder of paths unseen",
    "caseName": "A Circuitous and Wending Journey",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740295/powers/a_circuitous_and_wending_journey.png"
  },
  "pyroclastic bombardment": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753675/powers_cards/pyroclastic_bombardment.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 3,
    "elements": [
      "f",
      "a",
      "e"
    ],
    "speed": "fast",
    "range": 2,
    "target": "any land",
    "text": "1 Damage to each Town/City/Dahan. 1 Damage. 1 Damage to Dahan.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "sacred site",
    "unique": "volcano looming high",
    "caseName": "Pyroclastic Bombardment",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740296/powers/pyroclastic_bombardment.png"
  },
  "favors of story and season": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753676/powers_cards/favors_of_story_and_season.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "another spirit",
    "text": "Target Spirit may Gather up to 3 Dahan into one of their lands. If they have at least 3 Dahan among their lands, they gain 1 Energy and may Reclaim 1 Power Card instead of discarding it at end of turn.",
    "threshold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": null,
    "unique": "hearth-vigil",
    "caseName": "Favors of Story and Season",
    "art": null
  },
  "radiant and hallowed grove": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753677/powers_cards/radiant_and_hallowed_grove.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "towering roots of the jungle's incarna",
    "text": "2 Fear if Invaders are present or adjacent. In both target and one adjacent land, you may Remove an Invader with Health less than or equal to the Terror Level. (Damage doesn't reduce Health.)",
    "threshold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": null,
    "unique": "towering roots of the jungle",
    "caseName": "Radiant and Hallowed Grove",
    "art": null
  },
  "gift of abundance": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753678/powers_cards/gift_of_abundance.png",
    "set": [
      "promo pack 2",
      "feather and flame"
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
    "target": "another spirit",
    "text": "Target Spirit either gains 2 Energy, or may Repeat one Power Card this turn by paying its cost. Either you or target Spirit may add 1 Destroyed Presence to a Wetland where you have Presence.",
    "threshold": null,
    "artist": "Damon Westenhofer",
    "status": "active",
    "from": null,
    "unique": "downpour drenches the world",
    "caseName": "Gift of Abundance",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740296/powers/gift_of_abundance.png"
  },
  "boon of corrupted blood": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753679/powers_cards/boon_of_corrupted_blood.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "any spirit",
    "text": "1 Damage in one of target Spirit's lands. If you target another Spirit, in that land also: Destory 1 of their Presence. 1 Damage. Gather 1 Beasts.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "wounded waters bleeding",
    "caseName": "Boon of Corrupted Blood",
    "art": null
  },
  "gift of seismic energy": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753679/powers_cards/gift_of_seismic_energy.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "any spirit",
    "text": "If you target yourself, gain 3 energy. Otherwise, target spirit gains 1 Energy per Power Card you have in play (max.6). (Don't count Impendingcard.)",
    "threshold": null,
    "artist": "Emily Hancock",
    "status": "active",
    "from": null,
    "unique": "dances up earthquakes",
    "caseName": "Gift of Seismic Energy",
    "art": null
  },
  "blood draws predators": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753680/powers_cards/blood_draws_predators.png",
    "set": [
      "jagged earth"
    ],
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
    "target": "any land",
    "text": "After the next time Invaders are Destroyed in target land: Add 1 Beasts, then 1 Damage per Beasts (count max. 3 Beasts).",
    "threshold": null,
    "artist": "Kat Guevara",
    "status": "active",
    "from": null,
    "caseName": "Blood Draws Predators",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740298/powers/blood_draws_predators.png"
  },
  "stinging sandstorm": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753681/powers_cards/stinging_sandstorm.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "a",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Gather up to 1 of your Presence. 1 Fear and 1 Damage. (If this Power makes a Sacred Site, your Special Rule applies immediately, giving Invaders there -1 Health and possibly Destroying Damaged Invaders.)",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "rising heat of stone and sand",
    "caseName": "Stinging Sandstorm",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740299/powers/stinging_sandstorm.png"
  },
  "exaltation of grasping roots": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753682/powers_cards/exaltation_of_grasping_roots.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "another spirit",
    "text": "Target Spirit may Add 1 Wilds in one of their lands. You may do likewise.",
    "threshold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "ember-eyed behemoth",
    "caseName": "Exaltation of Grasping Roots",
    "art": null
  },
  "tempest of leaves and branches": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753683/powers_cards/tempest_of_leaves_and_branches.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "a",
      "p"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "Choose up to 5 different Invaders (in target land). 1 Damage to each of them.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": "sacred site",
    "unique": "sun-bright whirlwind",
    "caseName": "Tempest of Leaves and Branches",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740299/powers/tempest_of_leaves_and_branches.png"
  },
  "voice of thunder": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753683/powers_cards/voice_of_thunder.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "s",
      "a"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Push up to 4 Dahan. -or- If Invaders are present, 2 Fear.",
    "threshold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "unique": "thunderspeaker",
    "caseName": "Voice of Thunder",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740300/powers/voice_of_thunder.png"
  },
  "regrow from roots": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753684/powers_cards/regrow_from_roots.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "w",
      "e",
      "p"
    ],
    "speed": "slow",
    "range": 1,
    "target": "jungle or wetland",
    "text": "If there are 2 Blight or fewer in target land, Remove 1 Blight.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "keeper of the forbidden wilds",
    "caseName": "Regrow from Roots",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740301/powers/regrow_from_roots.png"
  },
  "call of the deeps": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753685/powers_cards/call_of_the_deeps.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "w"
    ],
    "speed": "fast",
    "range": 0,
    "target": "coastal",
    "text": "Gather 1 Explorer. If target land is the Ocean, you may Gather another Explorer.",
    "threshold": null,
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "unique": "ocean's hungry grasp",
    "caseName": "Call of the Deeps",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740302/powers/call_of_the_deeps.png"
  },
  "inspire the release of stolen lands": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753686/powers_cards/inspire_the_release_of_stolen_lands.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "no blight",
    "text": "Gather up to 3 Dahan. Remove up to 3 Health worth of Invaders per Dahan.",
    "threshold": {
      "elements": {
        "s": 3,
        "w": 3,
        "n": 2
      },
      "ability": "This Power can target lands with Blight. If Dahan are present, Remove 1 Blight from target land, then Remove 1 Explorer, 1 Town, and 1 City from a land within 1 Range (of target land)."
    },
    "artist": "Agnieszka Dabrowiecka",
    "status": "active",
    "from": null,
    "caseName": "Inspire the Release of Stolen Lands",
    "art": null
  },
  "entrancing apparitions": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753687/powers_cards/entrancing_apparitions.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
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
    "target": "any land",
    "text": "Defend 2. If no Invaders are present, Gather up to 2 Explorers.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "caseName": "Entrancing Apparitions",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740303/powers/entrancing_apparitions.png"
  },
  "call to vigilance": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753687/powers_cards/call_to_vigilance.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "2 Fear if Invaders are present. For each Dahan in origin land, Push up to 1 Explorer/Town.",
    "threshold": null,
    "artist": "Aalaa Yassin",
    "status": "active",
    "from": "dahan",
    "unique": "hearth-vigil",
    "caseName": "Call to Vigilance",
    "art": null
  },
  "scarred and stony land": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753688/powers_cards/scarred_and_stony_land.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "m",
      "e"
    ],
    "speed": "slow",
    "range": 1,
    "target": "blight",
    "text": "2 Damage. Add 1 Badlands. Remove 1 Blight in target land from the game. (It goes to the box, not the Blight Card.)",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": "sacred site",
    "unique": "stone's unyielding defiance",
    "caseName": "Scarred and Stony Land",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740304/powers/scarred_and_stony_land.png"
  },
  "ways of shore and heartland": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753689/powers_cards/ways_of_shore_and_heartland.png",
    "set": [
      "promo pack 2",
      "feather and flame"
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
    "target": "any land",
    "text": "Push up to 2 Invaders/Dahan/Presence/Beasts to a land that is also Coastal/Inland (whichever the target land is.)",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "finder of paths unseen",
    "caseName": "Ways of Shore and Heartland",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740305/powers/ways_of_shore_and_heartland.png"
  },
  "ever-multiplying swarm": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753690/powers_cards/ever-multiplying_swarm.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "e",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "Add 2 Beasts.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "many minds move as one",
    "caseName": "Ever-Multiplying Swarm",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740307/powers/ever-multiplying_swarm.png"
  },
  "mark territory with scars and teeth": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753691/powers_cards/mark_territory_with_scars_and_teeth.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "e",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "any land",
    "text": "Defend 9. 2 Fear if Invaders are present. Push 2 Dahan.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "devouring teeth lurk underfoot",
    "caseName": "Mark Territory with Scars and Teeth",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740308/powers/mark_territory_with_scars_and_teeth.png"
  },
  "reach from the infinite darkness": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753692/powers_cards/reach_from_the_infinite_darkness.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "yourself",
    "text": "Abduct up to 2 Presence (of any Spirits, with their permission) from any lands on the island, ignoring land type restrictions on moving Presence. Each Spirit's Presence in the Endless Dark grants them +1 Range with all their Powers (this turn).",
    "threshold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "breath of darkness down your spine",
    "caseName": "Reach from the Infinite Darkness",
    "art": null
  },
  "prey on the builders": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753692/powers_cards/prey_on_the_builders.png",
    "set": [
      "branch and claw"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "n"
    ],
    "speed": "fast",
    "range": 0,
    "target": "any land",
    "text": "You may Gather 1 Beasts. If target land has Beasts, Invaders do not Build there this turn.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "unique": "sharp fangs behind the leaves",
    "caseName": "Prey on the Builders",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740309/powers/prey_on_the_builders.png"
  },
  "scatter to the winds": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753693/powers_cards/scatter_to_the_winds.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "f",
      "a",
      "w"
    ],
    "speed": "slow",
    "range": 2,
    "target": "any land",
    "text": "Choose up to 5 Explorers/Towns/Dahan. Push them to as many different lands as possible.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "sun-bright whirlwind",
    "caseName": "Scatter to the Winds",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740310/powers/scatter_to_the_winds.png"
  },
  "threatening flames": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753695/powers_cards/threatening_flames.png",
    "set": [
      "promo pack 1",
      "feather and flame"
    ],
    "cardType": "unique",
    "cost": 0,
    "elements": [
      "f",
      "p"
    ],
    "speed": "fast",
    "range": 0,
    "target": "blight and invaders",
    "text": "2 Fear. Push 1 Explorer/Town per Terror Level from target land to adjacent lands without your Presence. If there are no such adjacent lands, +2 Fear.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "heart of the wildfire",
    "caseName": "Threatening Flames",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740311/powers/threatening_flames.png"
  },
  "twilight fog brings madness": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753698/powers_cards/twilight_fog_brings_madness.png",
    "set": [
      "branch and claw"
    ],
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
    "target": "any land",
    "text": "Add 1 Strife. Push 1 Dahan. Each remaining Dahan takes 1 Damage.",
    "threshold": null,
    "artist": "Loic Belliau",
    "status": "active",
    "from": null,
    "caseName": "Twilight Fog Brings Madness",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740312/powers/twilight_fog_brings_madness.png"
  },
  "transformative sacrifice": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753699/powers_cards/transformative_sacrifice.png",
    "set": [
      "nature incarnate"
    ],
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
    "target": "any spirit",
    "text": "Target Spirit may Remove up to 3 Presence (from anywhere on the island). Then for each removed Presence, they Take a Minor Power and play it (for free).",
    "threshold": {
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
    "caseName": "Transformative Sacrifice",
    "art": null
  },
  "favors called due": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753700/powers_cards/favors_called_due.png",
    "set": [
      "spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "a",
      "n"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "Gather up to 4 Dahan. If Invaders are present and Dahan now outnumber them, 3 Fear.",
    "threshold": null,
    "artist": "Nolan Nasser",
    "status": "active",
    "from": null,
    "unique": "shadows flicker like flame",
    "caseName": "Favors Called Due",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740313/powers/favors_called_due.png"
  },
  "terrifying rampage": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753701/powers_cards/terrifying_rampage.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "e"
    ],
    "speed": "fast",
    "range": 1,
    "target": "any land",
    "text": "1 Fear. 2 Invaders don't participate in Ravage. (Choose when ravaging; they don't do Damage or take counterattack Damage.) Push 3 Dahan.",
    "threshold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "ember-eyed behemoth",
    "caseName": "Terrifying Rampage",
    "art": null
  },
  "terror of the hunted": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753702/powers_cards/terror_of_the_hunted.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "m",
      "f",
      "n"
    ],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "If Beasts are present, 1 Fear and Add 1 Strife. Add 1 Strife per Terror Level. If target land is the Endless Dark, Add 1 Strife. (Strife only escapes with the Invader it's attached to.)",
    "threshold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "breath of darkness down your spine",
    "caseName": "Terror of the Hunted",
    "art": null
  },
  "belligerent and aggressive crops": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753703/powers_cards/belligerent_and_aggressive_crops.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "f",
      "p"
    ],
    "speed": "slow",
    "range": 2,
    "target": "town or city",
    "text": "Add 1 Wilds. 1 Damage, to Towns/Cities only. If there are any adjacent Wilds: 1 Fear. 1 Damage, to Towns/Cities only.",
    "threshold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": "sacred site",
    "unique": "a spread of rampant green",
    "caseName": "Belligerent and Aggressive Crops",
    "art": null
  },
  "smite the land with fulmination": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753704/powers_cards/smite_the_land_with_fulmination.png",
    "set": [
      "nature incarnate"
    ],
    "cardType": "unique",
    "cost": 2,
    "elements": [
      "s",
      "f",
      "a"
    ],
    "speed": "slow",
    "range": 1,
    "target": "any land",
    "text": "1 Damage. Add 1 Badlands.",
    "threshold": null,
    "artist": "David Markiwsky",
    "status": "active",
    "from": null,
    "unique": "lightning's swift strike",
    "caseName": "Smite the Land with Fulmination",
    "art": null
  },
  "gift of wind-sped steps": {
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753706/powers_cards/gift_of_wind-sped_steps.png",
    "set": [
      "horizons of spirit island"
    ],
    "cardType": "unique",
    "cost": 1,
    "elements": [
      "s",
      "a",
      "n"
    ],
    "speed": "fast",
    "range": null,
    "target": "any spirit",
    "text": "Once this turn, Target Spirit may choose 1 of their Slow Powers with a \"Push\" or \"Gather\" instruction and make that Power Fast (for this turn). If you target another Spirit, they gain 1 Energy.",
    "threshold": null,
    "artist": "Lucas Durham",
    "status": "active",
    "from": null,
    "unique": "sun-bright whirlwind",
    "caseName": "Gift of Wind-Sped Steps",
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740313/powers/gift_of_wind-sped_steps.png"
  },
  "draw towards a consuming void": {
    "caseName": "Draw Towards a Consuming Void",
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753710/powers_cards/draw_towards_a_consuming_void.png",
    "set": [
      "jagged earth",
      "nature incarnate"
    ],
    "cardType": "major",
    "cost": 8,
    "elements": [],
    "speed": "slow",
    "range": 0,
    "target": "any land",
    "text": "Gather 1 Explorer, 1 Town, 1 City, 1 Dahan, 1 Beasts, and 1 Presence (from any Spirit) from each adjacent land. 4 Fear. 15 Damage. 5 Damage to Dahan. Destroy 1 Presence from each Spirit. Destroy 2 Beasts.",
    "threshold": {
      "elements": {},
      "condition": "If you have no other Power Cards in play",
      "ability": "Any number of times: Forget a Minor Power, a Major Power, and a Unique Power to perform the above effects again."
    },
    "artist": "Joshua Wright",
    "status": "active",
    "from": null,
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740314/powers/draw_towards_a_consuming_void.png"
  },
  "elemental boon": {
    "caseName": "Elemental Boon",
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753711/powers_cards/elemental_boon.png",
    "set": [
      "spirit island",
      "horizons of spirit island"
    ],
    "cardType": "minor",
    "cost": 1,
    "elements": [],
    "speed": "fast",
    "range": null,
    "target": "any spirit",
    "text": "Target Spirit gains 3 different Elements of their choice. If you target another Spirit, you also gain the chosen Elements.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740315/powers/elemental_boon.png"
  },
  "gift of nature's connection": {
    "caseName": "Gift of Nature's Connection",
    "image": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756753712/powers_cards/gift_of_nature%27s_connection.png",
    "set": [
      "jagged earth"
    ],
    "cardType": "minor",
    "cost": 0,
    "elements": [],
    "speed": "fast",
    "range": null,
    "target": "any spirit",
    "text": "Target Spirit gains either 2 Energy or 2 of a single Element (their choice) . If you target another Spirit, you gain an Element of your choice.",
    "threshold": null,
    "artist": "Moro Rogers",
    "status": "active",
    "from": null,
    "art": "https://res.cloudinary.com/du1bjnkar/image/upload/v1756740318/powers/gift_of_nature%27s_connection.png"
  }
}

export const CARD_ARTS: Record<string, string> = {}
for (let dict of [BLIGHT_CARDS, EVENTS, FEAR_CARDS, POWERS, ASPECTS]) {
  for (var card of Object.keys(dict)) {
    CARD_ARTS[card] = dict[card].image
  }
}
export const LARGE_COMPONENTS_ARTS: Record<string, string> = { ...BOARDS }
for (let spirit of Object.keys(SPIRITS)) {
  LARGE_COMPONENTS_ARTS[spirit] = SPIRITS[spirit as Spirit].image
}
for (let ad of Object.keys(ADVESARIES)) {
  LARGE_COMPONENTS_ARTS[ad] = ADVESARIES[ad].image
}
export const CASE_NAME_MAP: Record<string,string> = {}
for (let dict of [BLIGHT_CARDS, EVENTS, FEAR_CARDS, POWERS, ASPECTS,ADVESARIES,SCENARIOS,SPIRITS]) {
  for (var card of Object.keys(dict)) {
    CASE_NAME_MAP[card] = dict[card].caseName
  }
}
for(let board in BOARDS) {
  CASE_NAME_MAP[board] = board
}
/*NO SCENARIOS YET*/
