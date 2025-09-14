<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import { Button } from 'primevue'
import { ref } from 'vue'
import ScrollTop from 'primevue/scrolltop'
import QueryLinkBlockquote from '@/components/QueryLinkBlockquote.vue'

type Section = {
  title: string
  pretext: string
  table?: Record<string, string>[]
  posttext?: string
  queries: { query: string; description: string }[]
}
const sections = ref<Section[]>([
  {
    title: 'Name',
    pretext: `<p>Find cards by name using either words or strings. The results will filter all cards that include the phrase in their name, like <code>the sk</code> (cards that include both <code>the</code> and <code>sk</code>) or <code>"the sk"</code> (cards that include the continuous phrase <code>the sk</code>). </p><p>For exact names, you can use the <code>name</code> or <code>n</code> property with the <code>=</code> operator. For example, <code>n=panic</code> will only find "Panic", whereas <code>n:panic</code> will also find "Panicked by Wild Beasts". You can also use regex: <code>n:/call the/</code>.</p>`,
    queries: [
      { query: 'the sk', description: "Cards that include both 'the' and 'sk' in their name" },
      { query: `"the sk"`, description: "Cards that include both 'the sk' in their name" },
      { query: 'n=panic', description: "Cards with the exact name 'panic'" },
      { query: 'n:set', description: "Cards that include 'set' in their name" },
    ],
  },
  {
    title: 'Type',
    pretext: `<p>Find cards by type using the <code>type:</code> property with one of the following values:</p>`,
    table: [
      { 'Long Form': `<code>Unique</code>`, 'Short Form': `<code>U</code>` },
      { 'Long Form': `<code>Aspect</code>`, 'Short Form': `<code>A</code>` },
      { 'Long Form': `<code>Blight</code>`, 'Short Form': `<code>B</code>` },
      { 'Long Form': `<code>Event</code>`, 'Short Form': `<code>E</code>` },
      { 'Long Form': `<code>Fear</code>`, 'Short Form': `<code>F</code>` },
      { 'Long Form': `<code>Power</code>`, 'Short Form': `<code>P</code>` },
      { 'Long Form': `<code>Major</code>`, 'Short Form': '' },
      { 'Long Form': `<code>Minor</code>`, 'Short Form': '' },
      { 'Long Form': 'A spirit name', 'Short Form': '' },
    ],
    posttext: `<p>You can use either a short form or long form, word or string. All of these queries are the same: <code>type:power</code>, <code>type:"power"</code>, <code>type:p</code>, and <code>type:"p"</code>. If the value is a spirit name, the results are that spirit's unique powers.`,
    queries: [
      { query: 'type:minor', description: 'Minor cards' },
      { query: `type:f or type:"e"`, description: 'Fear cands and Event cards' },
      {
        query: `type:"Lightning's Swift Strike"`,
        description: "Lightning's Swift Strike's unique powers",
      },
    ],
  },
  {
    title: 'Text',
    pretext: `<p>Find cards by their text effect using the <code>text:</code> property with either a string or regex value. Text includes power cards, blight cards, event cards, and fear cards (not aspects due to thier random structure).</p>`,
    queries: [
      { query: 'type:fear text:push', description: 'Fear cards that push' },
      { query: `text:/push (up to )?[23]/`, description: 'Cards that push 2 to 3 things' },
    ],
  },
  {
    title: 'Set',
    pretext: `<p>Find cards by set using the <code>set:</code> or <code>s:</code> property with one of the following values:</p>`,
    table: [
      { 'Long Form': `<code>"Spirit Island"</code>`, 'Short Form': `<code>SI</code>` },
      { 'Long Form': `<code>"Horizons of Spirit Island"</code>`, 'Short Form': `<code>H</code>` },
      { 'Long Form': `<code>"Branch and Claw"</code>`, 'Short Form': `<code>BC</code>` },
      { 'Long Form': `<code>"Jagged Earth"</code>`, 'Short Form': `<code>JE</code>` },
      { 'Long Form': `<code>"Nature Incarnate"</code>`, 'Short Form': `<code>NI</code>` },
      { 'Long Form': `<code>"Feather and Flame"</code>`, 'Short Form': `<code>FF</code>` },
      { 'Long Form': `<code>"Promo Pack 2"</code>`, 'Short Form': '<code>PP1</code>' },
      { 'Long Form': `<code>"Promo Pack 1"</code>`, 'Short Form': '<code>PP2</code>' },
    ],
    queries: [
      { query: 's:h', description: 'All cards in Horizons' },
      { query: `set:"Promo Pack 2"`, description: 'All cards in Promo Pack 2' },
    ],
  },
  {
    title: 'Status',
    pretext: `<p>Find cards by their status using the <code>status:</code> property with one of the following values: <code>Active</code>, <code>Retired</code>, or <code>Replaced</code></p>`,
    queries: [{ query: 'status:retired', description: 'All retired cards' }],
  },
  {
    title: 'Artist',
    pretext: `<p>Find cards by artist using the <code>artist:</code> or <code>a:</code> property with either a string or regex value.</p>`,
    posttext: `<p>Using the <code>=</code> operator instead of <code>:</code> will search for an exact name.`,
    queries: [
      { query: 'a:Nol', description: "Cards with art by someone with 'Nol' in their name" },
      {
        query: `a="Emily Hancock"`,
        description: "Cards with art by someone named 'Emily Hancock'",
      },
    ],
  },
  {
    title: 'Blight Card Island Health',
    pretext: `<p>Find Blight cards by post-flip island health using the <code>health:</code> or <code>h:</code> property with one of the following values:</p>`,
    table: [
      { 'Long Form': `<code>Healthy</code>`, 'Short Form': `<code>H</code>` },
      { 'Long Form': `<code>Blighted</code>`, 'Short Form': `<code>B</code>` },
    ],
    queries: [{ query: 'h:h', description: 'Still healthy Blight cards' }],
  },
  {
    title: 'Blight Per Player',
    pretext: `<p>Find Blight cards by blight per player using the <code>blight:</code> or <code>b:</code> property with an integer value.</p>`,
    posttext: `<p>You can use a comparison operator for a range of results: <code>&lt;</code>, <code>&lt;=</code>, <code>></code>, and <code>>=</code>.</p>`,
    queries: [
      { query: 'b:3', description: 'Blight cards with 3 blight per player' },
      { query: 'b>=4', description: 'Blight cards with 4 or more blight per player' },
    ],
  },
  {
    title: 'Energy Cost',
    pretext: `<p>Find Power cards by energy cost using the <code>cost:</code> or <code>c:</code> property with an integer value.</p>`,
    posttext: `<p>You can use a comparison operator for a range of results: <code>&lt;</code>, <code>&lt;=</code>, <code>></code>, and <code>>=</code>.</p>`,
    queries: [
      { query: 'c:4', description: 'Power cards that cost 4 energy' },
      { query: 'cost>=5', description: 'Power cards that cost 5 or more energy' },
    ],
  },
  {
    title: 'Speed',
    pretext: `<p>Find Power cards by speed using the <code>speed:</code> property with one of the following values:</p>`,
    table: [
      { 'Long Form': `<code>Fast</code>`, 'Short Form': `<code>F</code>` },
      { 'Long Form': `<code>Slow</code>`, 'Short Form': `<code>S</code>` },
    ],
    queries: [{ query: 'speed:f', description: 'Fast powers' }],
  },
  {
    title: 'Range',
    pretext: `<p>Find Power cards by range using the <code>range:</code> or <code>r:</code> property with an integer value or <code>null</code> value.</p>`,
    posttext: `<p>With an integer value, you can use a comparison operator for a range of results: <code>&lt;</code>, <code>&lt;=</code>, <code>></code>, and <code>>=</code>.</p>`,
    queries: [
      { query: 'r:0', description: 'Power cards with a range of 0' },
      { query: 'r:null', description: 'Power cards with no range' },
      { query: 'r<2', description: 'Power cards a range of less than 2' },
    ],
  },
  {
    title: 'From',
    pretext: `<p>Find cards by 'from' requirements using the <code>from:</code> or <code>f:</code> property with either a string or regex value or <code>null</code> for no requirement.</p><p>All possible 'from' requirements are standardized:</p>`,
    table: [
      { 'From Requirement': `<code>Sacred Site</code>` },
      { 'From Requirement': `<code>Dahan</code>` },
      { 'From Requirement': `<code>Blight</code>` },
      {
        'From Requirement': `<code>Jungle</code>, <code>Wetland</code>, <code>Mountain</code>, or <code>Sands</code>`,
      },
      { 'From Requirement': `<code>Mountain or Jungle</code>` },
    ],
    posttext: `<p>The <code>:</code> operator searches for a 'from' requirement that includes the value. The <code>=</code> operator will search for a 'from' requirement that is the exact value you provided.</p>`,
    queries: [
      { query: 'f:null', description: "Power cards with no 'from' requirement" },
      {
        query: `f:mountain`,
        description: 'Power cards that must originate from mountains (or maybe other places?)',
      },
      { query: `f=mountain`, description: 'Power cards that must originate from mountains' },
    ],
  },
  {
    title: 'Target',
    pretext: `<p>Find cards by target using the <code>target:</code> property with either a string or regex value or <code>null</code> for no target.</p><p>All possible targets are standardized:</p>`,
    table: [
      { Target: '<code>Any Land</code>' },
      { Target: '<code>Any Spirit</code>' },
      { Target: '<code>Another Spirit</code>' },
      { Target: '<code>Yourself</code>' },
      {
        Target:
          '<code>Jungle</code>, <code>Wetland</code>, <code>Mountain</code>, or <code>Sands</code>',
      },
      {
        Target:
          '<code>Mountain or Jungle</code>, <code>Mountain or Sands</code>, <code>Mountain or Wetland</code>, <code>Jungle or Sands</code>, <code>Jungle or Wetland</code>, <code>Sands or Wetland</code>',
      },
      { Target: '<code>Dahan</code>' },
      { Target: '<code>Blight</code>' },
      { Target: '<code>No Blight</code>' },
      { Target: '<code>Invaders</code>' },
      { Target: '<code>Coastal</code>' },
      { Target: '<code>Inland</code>' },
      { Target: '<code>No Invaders</code>' },
      { Target: '<code>City</code>' },
      { Target: '<code>Coastal City</code>' },
      { Target: '<code>Coastal or Wetland</code>' },
      { Target: '<code>Any Two Lands</code>' },
      { Target: '<code>Not Wetland</code>' },
      { Target: '<code>Disease</code>' },
      { Target: '<code>Beast</code>' },
      { Target: '<code>Beasts</code>' },
      { Target: '<code>Jungle or No Blight</code>' },
      { Target: '<code>Town or City</code>' },
      { Target: '<code>Strife</code>' },
      { Target: '<code>Dahans</code>' },
      { Target: '<code>Blight and Invaders</code>' },
      { Target: '<code>Incarna</code>' },
    ],
    posttext: `<p>The <code>:</code> operator searches for a target that includes the value. The <code>=</code> operator will search for a target that is the exact value you provided.</p>`,
    queries: [
      { query: 'target:null', description: 'Power cards with no target' },
      { query: `target:invaders`, description: "Power cards where the target includes 'invaders'" },
      {
        query: `target=invaders`,
        description: "Power cards where the target is exactly 'invaders'",
      },
    ],
  },
  {
    title: 'Elements',
    pretext: `<p>Search Power cards by elements using the <code>elements:</code> or <code>e:</code> property with an element pattern value.</p>`,
    table: [
      { Element: `Sun`, 'Character Code': `<code>S</code>` },
      { Element: `Moon`, 'Character Code': `<code>M</code>` },
      { Element: `Fire`, 'Character Code': `<code>F</code>` },
      { Element: `Air`, 'Character Code': `<code>A</code>` },
      { Element: `Water`, 'Character Code': `<code>W</code>` },
      { Element: `Earth`, 'Character Code': `<code>E</code>` },
      { Element: `Plant`, 'Character Code': `<code>P</code>` },
      { Element: `Animal`, 'Character Code': `<code>N</code>` },
    ],
    posttext: `<p>To make an element pattern, combine element characters in a single string or word. For example, <code>sw</code> represents Sun and Water.</p><p>The <code>:</code> operator searches for powers that include the chosen elements. The <code>=</code> operator will search for powers that match the exact elements you provided.</p><p>You can also use an integer value to match the number of elements a power card has. With an integer value, you can use a comparison operator for a range of results: <code>&lt;</code>, <code>&lt;=</code>, <code>></code>, and <code>>=</code>.</p>`,
    queries: [
      { query: 'e:mnp', description: 'Power cards with Moon, Animal, and Plant elements' },
      {
        query: 'e:fe',
        description: 'Power cards that provide both Fire and Earth elements and nothing else',
      },
      { query: 'e>4', description: 'Power cards with more than 4 elements' },
    ],
  },
  {
    title: 'Threshold Elements',
    pretext: `<p>Search Power cards by threshold elements using the <code>thresholdelements:</code> or <code>te:</code> property with an element pattern value. View the section above for an introduction to element patterns.</p>`,
    posttext: `<p>You can include the same element multiple times, like <code>WWWA</code> is 3 Water and 1 Animal element. This can be simplified to <code>3WA</code>, where the prepended number declares the number of the following element.</p><p>The <code>:</code> operator searches for powers that include the chosen threshold elements. The <code>=</code> operator will search for powers that match the exact threshold elements you provided.</p><p>You can also use an integer value to match the number of elements the threshold requires. With an integer value, you can use a comparison operator for a range of results: <code>&lt;</code>, <code>&lt;=</code>, <code>></code>, and <code>>=</code>.`,
    queries: [
      {
        query: 'te:4w2m2e',
        description: 'Power cards with at least a 4 Water, 2 Moon, 2 Earth threshold',
      },
      {
        query: 'te=wwwwmm2e',
        description: 'Power cards with an exact 4 Water, 2 Moon, 2 Earth threshold',
      },
      {
        query: 'tt:"" -te:a',
        description: 'Power cards with a threshold that does not include air elements',
      },
      {
        query: 'te>=8',
        description: 'Power cards with threshold that requires at least 8 elements',
      },
    ],
  },
  {
    title: 'Threshold Text',
    pretext: `<p>Search threshold text using the <code>thresholdtext:</code> or <code>tt:</code> property with either a string or regex value.</p>`,
    queries: [
      {
        query: 'tt:Destroy',
        description: "Power cards with a threshold effect that includes 'Destroy'",
      },
      { query: 'tt:""', description: 'Power cards with a threshold' },
    ],
  },
  {
    title: 'Threshold Condition',
    pretext: `<p>Search threshold condition using the <code>thresholdcondition:</code> or <code>tc:</code> property with either a string or regex value.</p>`,
    queries: [
      {
        query: 'tc:""',
        description: 'All power cards with a threshold condition',
      },
      {
        query: 'tc:"no other power"',
        description: "Power cards with a threshold condition that includes 'no other power'",
      },
    ],
  },
  {
    title: 'Terror Text',
    pretext: `<p>Find cards by their terror level effect using the <code>terror1:</code> or <code>t1:</code> property with either a string or regex value. You can also filter by the second (<code>terror2:</code> or <code>t2:</code>) or third (<code>terror3:</code> or <code>t3:</code>) terror level effect.</p>`,
    queries: [{ query: 't1:skip', description: 'Fear cards with a Terror 1 skip effect' }],
  },
  {
    title: 'Event Names',
    pretext: `<p>Filter Event cards by Event names using the <code>EventName:</code> or <code>en:</code> property with either a string or regex value. </p>`,
    posttext: `<p>Using the <code>=</code> operator instead of <code>:</code> will search for an exact name.`,
    queries: [
      {
        query: 'en="prey on the heedless"',
        description: "Event cards with an event named 'prey on the heedless'",
      },
      {
        query: 'eventname:farm',
        description: "Event cards with an event name that includes 'farm'",
      },
    ],
  },
  {
    title: 'Event Type',
    pretext: `<p>Find Event cards that include a specific event type using the <code>EventType:</code> or <code>ET:</code> property with one of the following values:</p>`,
    table: [
      { 'Long Form': `<code>"Terror 1"</code>`, 'Short Form': `<code>T1</code>` },
      { 'Long Form': `<code>"Terror 1 & 2"</code>`, 'Short Form': `<code>t12</code>` },
      { 'Long Form': `<code>"Terror 2 & 3"</code>`, 'Short Form': `<code>t23</code>` },
      { 'Long Form': `<code>"Terror 3"</code>`, 'Short Form': `<code>t3</code>` },
      { 'Long Form': `<code>"Stage 1"</code>`, 'Short Form': `<code>S1</code>` },
      { 'Long Form': `<code>"Stage 1 & 2"</code>`, 'Short Form': `<code>S12</code>` },
      { 'Long Form': `<code>"Stage 2 & 3"</code>`, 'Short Form': `<code>S23</code>` },
      { 'Long Form': `<code>"Stage 3"</code>`, 'Short Form': `<code>S3</code>` },
      { 'Long Form': `<code>"Healthy Island"</code>`, 'Short Form': `<code>H</code>` },
      { 'Long Form': `<code>"Blighted Island"</code>`, 'Short Form': `<code>B</code>` },
      { 'Long Form': `<code>"Group Choice"</code>`, 'Short Form': `<code>GC</code>` },
      { 'Long Form': `<code>"Individual Choice"</code>`, 'Short Form': `<code>IC</code>` },
      { 'Long Form': `<code>"Adversary Event"</code>`, 'Short Form': `<code>AE</code>` },
      { 'Long Form': `<code>Beasts</code>`, 'Short Form': '' },
      { 'Long Form': `<code>Dahan</code>`, 'Short Form': '' },
      { 'Long Form': `<code>Disease</code>`, 'Short Form': '' },
      { 'Long Form': `<code>Badlands</code>`, 'Short Form': '' },
      { 'Long Form': `<code>"Disease and Strife"</code>`, 'Short Form': '' },
      { 'Long Form': `<code>"Badlands and Beasts"</code>`, 'Short Form': '' },
    ],
    queries: [
      { query: 'eventtype:T3', description: 'Event cards that include a Terror Level 3 event' },
      {
        query: `et:"Disease and Strife" or et:Disease`,
        description: 'Event cards that include some form of Disease event',
      },
    ],
  },
  {
    title: 'Event Type Text',
    pretext: `<p>Find Event cards that include a specific text effect within an event type using one of the following properties with a string or regex value:</p>`,
    table: [
      { Property: '<code>"Terror 1 event"<code>' },
      { Property: '<code>"Terror 1 & 2 event"<code>' },
      { Property: '<code>"Terror 2 & 3 event"<code>' },
      { Property: '<code>"Terror 3 event"<code>' },
      { Property: '<code>"Stage 1 event"<code>' },
      { Property: '<code>"Stage 1 & 2 event"<code>' },
      { Property: '<code>"Stage 2 & 3 event"<code>' },
      { Property: '<code>"Stage 3 event"<code>' },
      { Property: '<code>"Healthy Island event"<code>' },
      { Property: '<code>"Blighted Island event"<code>' },
      { Property: '<code>"Group Choice event"<code>' },
      { Property: '<code>"Individual Choice event"<code>' },
      { Property: '<code>"Adversary Event event"<code>' },
      { Property: '<code>"Beasts event"<code>' },
      { Property: '<code>"Dahan event"<code>' },
      { Property: '<code>"Disease event"<code>' },
      { Property: '<code>"Badlands event"<code>' },
      { Property: '<code>"Disease and Strife event"<code>' },
      { Property: '<code>"Badlands and Beasts event"<code>' },
    ],
    queries: [
      {
        query: '"Terror 3 event":city',
        description: "Event cards with a Terror Level 3 event that includes 'city'",
      },
      {
        query: `"dahan event":damage`,
        description: "Event cards with a Dahan event that includes 'damage'",
      },
    ],
  },
  {
    title: 'Aspect',
    pretext: `<p>Filter Aspects by the spirit it belongs to using the <code>Aspect:</code> property with either a string or regex value (to search for spirit name). </p>`,
    posttext: `<p>Using the <code>=</code> operator instead of <code>:</code> will search for an exact spirit name.`,
    queries: [
      {
        query: 'aspect:lightning',
        description: "Aspects for a spirit with 'lightning' in its name",
      },
      {
        query: `aspect="lightning's swift strike"`,
        description: "Aspects for a spirit named 'lightning's swift strike'",
      },
    ],
  },
  {
    title: 'Or',
    pretext: `<p>By default, all clauses must match to find a card. If you want to search over a set of options, you can use <code>or</code> between clauses. You can also use parentheses <code>(...)</code> to group clauses.</p>`,
    queries: [
      {
        query: 'text:push or text:gather',
        description: 'Cards that push or gather',
      },
      {
        query: `type:power (text:defend or text:"dahan have +")`,
        description: 'Power cards the defend or grant dahan extra health',
      },
    ],
  },
  {
    title: 'Negation',
    pretext: `<p>All clauses can be negated by prefixing them with a hyphen (<code>-</code>). Instead of searching for cards that match the property, it will reject those that match the property.</p>`,
    queries: [
      {
        query: 'type:power -f:"sacred site"',
        description: 'Cards that do not need to originate from sacred sites',
      },
      {
        query: '-text:damage -text:destroy',
        description: 'Cards that do not destroy or damage anything',
      },
      {
        query: `type:power -(e:m or e:f)`,
        description: "Power cards don't grant neither mountain nor fire elements",
      },
    ],
  },
])
// or
// eventtype event
const operators = ref<Record<string, string>[]>([
  {
    Operator: '<code>:</code>',
    Description: "Default operator. More often than not, it means 'contains'",
  },
  { Operator: '<code>=</code>', Description: 'Match exactly' },
  { Operator: '<code>&lt;</code>', Description: 'The property is less than' },
  { Operator: '<code>></code>', Description: 'The property is greater than' },
  { Operator: '<code><=</code>', Description: 'The property is less than or equal to' },
  { Operator: '<code>>=</code>', Description: 'The property is greater than or equal to' },
])

function toId(title: string) {
  return title.replace(/\s/gm, '')
}
function scrollTo(id: string) {
  document.getElementById(toId(id))?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="page">
    <ScrollTop :threshold="50" />
    <h1 class="title">Query <span class="primary">Reference</span></h1>
    <div class="subheading">
      SpiritHaven offers a wide range of keywords and expressions for filtering cards.
      <br />
      Jump to a section below:
    </div>
    <div class="body-container">
      <div class="nav-grid">
        <Button @click.prevent="scrollTo('SyntaxOverview')">Syntax Overview</Button>
        <Button v-for="section in sections" @click.prevent="scrollTo(toId(section.title))">{{
          section.title
        }}</Button>
      </div>
    </div>

    <div class="sections">
      <div class="section" id="SyntaxOverview">
        <h2>Syntax Overview</h2>
        <div class="section-content">
          <div class="text-content">
            <p>
              The SpiritHaven query syntax is completely case-insensitive. A query is formed by
              clauses which often take the form <code>property:value</code> where <code>:</code> is
              the operator. You can include multiple clauses using spaces. For example,
              <code>type:power text:push</code> queries for all power cards where the text includes
              "push".
            </p>
            <p>Different properties can accept different operators:</p>
            <table>
              <thead>
                <tr>
                  <th v-for="(header, i) in Object.keys(operators[0])" :key="i">
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in operators" :key="i">
                  <td v-for="(cell, j) in Object.values(row)" :key="j" v-html="cell"></td>
                </tr>
              </tbody>
            </table>

            <p>They can also accept different values.</p>
            <p>
              <b>Words</b> are any alphanumeric combination of characters, like <code>dahan</code>.
            </p>
            <p>
              <b>Strings</b> can contain any character within double quotes, like
              <code>"dahan"</code> or <code>"destroy one"</code>. Strings also have escape codes for
              quotes and backslashes: <code>"\""</code> and <code>"\\"</code>. Strings are simply a
              more powerful version of Words if you need to search for longer phrases or other
              tokens like <code>"or"</code> and <code>"7"</code>. Thus, any time you could use a
              Word, you can use a string instead (and vice versa).
            </p>
            <p>
              <b>Regex</b> follows all JavaScript regex rules and is written between forward
              slashes, like <code>/\d Damage to 1 Town/City/</code>. This example also showcases one
              of the two escape codes: <code>\/</code> and <code>\\</code>. Regex is
              case-insensitive (like everything else).
            </p>
            <p>
              <b>Integers</b> (Ints) are positive integer numbers like <code>7</code> or
              <code>12</code>. Properties like Blight Per Player and Energy Cost use integers.
            </p>
            <p>
              <b>Null</b> represents a lack of the property, like when a power has no range if it
              targets another spirit. It is written as <code>null</code>.
            </p>
            <p>The text content for cards has been generalized:</p>
            <ul>
              <li>
                The flourishing <i>Or</i> (<img alt="or"
                  src="https://res.cloudinary.com/du1bjnkar/image/upload/v1756739839/Or_rmsxbc.svg"
                />) is changed to <code>-or-</code>
              </li>
              <li>New lines are replaced with spaces</li>
              <li>
                Icons are replaced with words as per
                <a
                  class="primary-link"
                  href="https://spiritislandwiki.com/index.php?title=Main_Page"
                  >the Spirit Island Wiki</a
                >
              </li>
            </ul>
            <p>
              So,
              <RouterLink
                :to="{ name: 'searchCards', query: { q: 'call to isolation' } }"
                class="primary-link"
                target="_blank"
                >Call to Isolation</RouterLink
              >'s text content is <code>Push 1 Explorer/Town per Dahan. -or- Push 1 Dahan.</code>
            </p>
          </div>
          <div class="example-queries">
            <QueryLinkBlockquote
              query="type:power cost>5"
              description="All power cards that cost more than 5 energy"
            ></QueryLinkBlockquote>
            <QueryLinkBlockquote
              query="blight<=3"
              description="All blight cards with less than or equal to 3 blight per player"
            ></QueryLinkBlockquote>
            <QueryLinkBlockquote
              query="te:2w (te:m or te:s)"
              description="All power cards with a threshold of at least 2 water and either 1 moon or sun"
            ></QueryLinkBlockquote>
          </div>
        </div>
      </div>
      <div v-for="section in sections" class="section" :id="toId(section.title)">
        <h2>{{ section.title }}</h2>
        <div class="section-content">
          <div class="text-content">
            <div v-html="section.pretext"></div>
            <table v-if="section.table">
              <thead>
                <tr>
                  <th v-for="(header, i) in Object.keys(section.table[0])" :key="i">
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in section.table" :key="i">
                  <td v-for="(cell, j) in Object.values(row)" :key="j" v-html="cell"></td>
                </tr>
              </tbody>
            </table>
            <div v-html="section.posttext"></div>
          </div>
          <div class="example-queries">
            <QueryLinkBlockquote
              v-for="query in section.queries"
              :query="query.query"
              :description="query.description"
            ></QueryLinkBlockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<style lang="css" scoped>
.page {
  min-height: calc(100vh - 60px);
}
.subheading {
  color: var(--p-surface-800);
  text-align: center;
  font-size: 1rem;
  max-width: 400px;
  margin: auto;
}
.body-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1200px;
  width: 80vw;
  margin: 30px auto;
}
.nav-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

/* Article Styles */
::v-deep(pre),
::v-deep(code) {
  font-family: monospace;
  color: var(--p-surface-600);
  background-color: var(--p-surface-200);
  border-radius: 3px;
  padding: 5px;
  overflow-x: scroll;
}
::v-deep(pre code) {
  padding: 0px;
}
.section * {
  color: var(--p-surface-800);
}
::v-deep(table),
::v-deep(th),
::v-deep(td) {
  border: 1px solid var(--p-surface-300);
}
::v-deep() table {
  border-collapse: collapse;
}
::v-deep(th),
::v-deep(td) {
  padding: 5px 10px;
}

/* Section styles */
.section {
  max-width: 1200px;
  margin: auto;
  padding: 20px 40px;
  border-bottom: 1px solid var(--p-surface-300);
  scroll-margin-top: 80px;
}
.section:last-child {
  border-bottom: 0px;
}
.section-content {
  display: flex;
  flex-direction: row;
  gap: 40px;
}
.example-queries {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 400px;
}
.text-content {
  width: 100%;
}
@media (max-width: 1000px) {
  .example-queries {
    min-width: 300px;
  }
}
@media (max-width: 700px) {
  .section-content {
    flex-direction: column;
    gap: 10px;
  }
}
@media (max-width: 1100px) {
  .nav-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media (max-width: 800px) {
  .nav-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 530px) {
  .nav-grid {
    grid-template-columns: 1fr;
  }
}
</style>
