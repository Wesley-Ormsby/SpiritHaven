<script setup lang="ts">
import { onMounted, useTemplateRef, ref, markRaw, computed } from 'vue'
import { highlight } from '@/scripts/highlighter'
import { articleData } from '@/scripts/globalStore'
import { onBeforeRouteLeave } from 'vue-router'
import Popover from 'primevue/popover'
import InputText from 'primevue/inputtext'
import AutoComplete from 'primevue/autocomplete'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import {
  Save,
  Trash2,
  Settings2,
  Heading1,
  Bold,
  Italic,
  Strikethrough,
  ListOrdered,
  List,
  Link,
  Image,
  TextQuote,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-vue-next'
import { supabase } from '@/scripts/auth'
import Loader from './Loader.vue'
import SymbolSVG from './svgs/SymbolSVG.vue'
import ComponentSVG from './svgs/ComponentSVG.vue'
import LargeComponentSVG from './svgs/LargeComponentSVG.vue'
import DeleteArticleDialog from './DeleteArticleDialog.vue'
import ArticlePropertiesDialog from './ArticlePropertiesDialog.vue'
import CenterDisplaySVG from './svgs/CenterDisplaySVG.vue'
import {
  ADVESARIES,
  BOARDS,
  CARD_ARTS,
  CASE_NAME_MAP,
  INVERTABLE_SYMBOLS,
  LARGE_COMPONENTS_ARTS,
  SCENARIOS,
  SPIRITS,
  SYMBOL_DATA,
} from '@/scripts/data'

const toast = useToast()

const textarea = useTemplateRef('textarea')
const forground = useTemplateRef('forground')
const unsavedChanges = ref(false)

onMounted(() => {
  inputEvent()
  unsavedChanges.value = false
})
onBeforeRouteLeave((to, from) => {
  if (unsavedChanges.value) {
    const answer = window.confirm('Are you sure you want to leave with unsaved changes?')
    if (!answer) return false
  }
})

function inputEvent() {
  update()
  syncScroll()
  saveCaretPosition()
}
function update() {
  unsavedChanges.value = true
  if (forground.value == null || textarea.value == null) return
  let value = textarea.value.value
  if (value[value.length - 1] == '\n') {
    value += ' '
  }
  forground.value.innerHTML = highlight(value)
}

function check_tab(event: KeyboardEvent) {
  if (textarea.value == null) return
  let value = textarea.value.value
  if (event.key == 'Tab') {
    event.preventDefault() // stop normal event
    let before_tab = value.slice(0, textarea.value.selectionStart) // text before tab
    let after_tab = value.slice(textarea.value.selectionEnd, textarea.value.value.length) // text after tab
    let cursor_pos = textarea.value.selectionStart + 1 // where cursor moves after tab - moving forward by 1 char to after tab
    textarea.value.value = before_tab + '\t' + after_tab // add tab char
    // move cursor
    textarea.value.selectionStart = cursor_pos
    textarea.value.selectionEnd = cursor_pos
    update() // Update text to include indent
  }
}

function syncScroll() {
  if (forground.value == null || textarea.value == null) return
  forground.value.scrollTop = textarea.value.scrollTop
  forground.value.scrollLeft = textarea.value.scrollLeft
}

/* RIBBON OPTIONS */
// Save
const saving = ref(false)
async function saveContent() {
  if (articleData.value == null) {
    return
  }
  saving.value = true
  const { data, error } = await supabase
    .from('articles')
    .update({ content: articleData.value.content })
    .eq('id', articleData.value.id)
  if (!error) {
    toast.add({ severity: 'success', summary: 'Saved', life: 2200 })
  }
  saving.value = false
  unsavedChanges.value = false
}

// delete
const deleteDialogVisable = ref(false)
function openDeleteDialog() {
  unsavedChanges.value = false
  deleteDialogVisable.value = true
}

// Change properties
const changePropertiesDialogVisable = ref(false)

// Carrot position for the following functions
const caretPos = ref<number | null>(null)
function saveCaretPosition() {
  if (textarea.value) {
    caretPos.value = textarea.value.selectionStart
  }
}

// Add block, like `# ....` or `> ...`
function addBlock(markdown: string) {
  const el = textarea.value
  if (!el) return
  const value = el.value
  if (document.activeElement === el) {
    const cursorPos = el.selectionStart
    const lastNewline = value.slice(0, cursorPos).lastIndexOf('\n')
    const lineStart = lastNewline === -1 ? 0 : lastNewline + 1
    el.value = value.slice(0, lineStart) + markdown + ' ' + value.slice(lineStart)
    el.selectionStart = el.selectionEnd = cursorPos + markdown.length + 1
  } else {
    el.value = value + '\n' + markdown + ' '
    el.selectionStart = el.selectionEnd = el.value.length
    el.focus()
  }
  articleData.value.content = el.value
  update()
}

// Add Bold/Italic/Strikethrough
function addInlineEffect(markdown: string) {
  const el = textarea.value
  if (!el) return
  const value = el.value
  const isFocused = document.activeElement === el

  if (isFocused) {
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end)
    if (start === end) {
      // No selection, so insert empty markdown and place cursor in middle
      const newValue = value.slice(0, start) + markdown + markdown + value.slice(end)
      el.value = newValue
      el.selectionStart = el.selectionEnd = start + markdown.length
    } else {
      // Wrap selected text
      const newValue = value.slice(0, start) + markdown + selected + markdown + value.slice(end)
      el.value = newValue
      el.selectionStart = start + markdown.length
      el.selectionEnd = end + markdown.length
    }
  } else {
    // Not focused, so append to end and place cursor between
    const needsNewline = !value.endsWith('\n') && value.length > 0
    const newValue = value + (needsNewline ? '\n' : '') + markdown + markdown
    el.value = newValue
    el.selectionStart = el.selectionEnd = newValue.length - markdown.length
  }
  articleData.value.content = el.value
  update()
  el.focus()
}

// Add image/link
function insertMarkdownLink(type: 'image' | 'link') {
  const defualts = {
    image: {
      url: 'https://spiritislandwiki.com/images/f/ff/River_Surges_in_Sunlight.png',
      alt: 'River',
    },
    link: {
      url: 'https://spirit-haven-nu.vercel.app/',
      text: 'SpiritHaven',
    },
  }
  const el = textarea.value
  if (!el) return

  const isFocused = document.activeElement === el
  const value = el.value

  let insertion
  let selectStart
  let selectEnd

  if (type === 'image') {
    const { url, alt } = defualts.image
    insertion = `![${alt}](${url})`
    selectStart = 2
    selectEnd = 2 + alt.length
  } else {
    const { url, text } = defualts.link
    insertion = `[${text}](${url})`
    selectStart = 1
    selectEnd = 1 + text.length
  }

  if (isFocused) {
    const start = el.selectionStart
    const newValue = value.slice(0, start) + insertion + value.slice(el.selectionEnd)

    el.value = newValue
    el.selectionStart = start + selectStart
    el.selectionEnd = start + selectEnd
  } else {
    const needsNewline = !value.endsWith('\n') && value.length > 0
    const newValue = value + (needsNewline ? '\n' : '') + insertion

    el.value = newValue
    el.selectionStart = newValue.length - insertion.length + selectStart
    el.selectionEnd = newValue.length - insertion.length + selectEnd
  }
  el.focus()
  articleData.value.content = el.value
  update()
}

// For bold and italic shortcuts
function handleShortcuts(event: KeyboardEvent) {
  const ctrlOrCmd = event.metaKey || event.ctrlKey
  if (ctrlOrCmd && event.key.toLowerCase() === 'b') {
    event.preventDefault()
    addInlineEffect('**')
  }

  if (ctrlOrCmd && event.key.toLowerCase() === 'i') {
    event.preventDefault()
    addInlineEffect('*')
  }
}

// Symbols
const symbolPopover = useTemplateRef('symbolPopover')
const symbolFilterInput = ref('')
const filteredSymbols = computed(() => {
  const search = symbolFilterInput.value.trim().toLowerCase()
  return Object.keys(SYMBOL_DATA).filter((key) => key.includes(search))
})
const toggleSymbolPopover = (event: Event) => {
  if (symbolPopover.value) symbolPopover.value.toggle(event)
}
function insertSymbol(name: string) {
  insertText(`{{${name}}}`)
}
function symbolEnterShortcut() {
  if (filteredSymbols.value.length > 0) {
    insertText(`{{${filteredSymbols.value[0]}}}`)
    symbolPopover.value?.hide()
  }
}

// Component hover-link
const componentPopover = useTemplateRef('componentPopover')
const autocompleteContainer = useTemplateRef('autocompleteContainer')
const selectedComponent = ref<string>('')
const nickname = ref('')
const allComponents = [...Object.keys(CARD_ARTS), ...Object.keys(LARGE_COMPONENTS_ARTS)].map(
  (name) => CASE_NAME_MAP[name],
)
const filteredComponents = ref()
function componentSearch() {
  filteredComponents.value = allComponents.filter((name) => {
    let lowerCaseName = name.toLowerCase()
    for (let section of selectedComponent.value.split(' ')) {
      if (!lowerCaseName.includes(section.trim().toLowerCase())) {
        return false
      }
    }
    return true
  })
}
const toggleComponentPopover = (event: Event) => {
  if (componentPopover.value) componentPopover.value.toggle(event)
}
function resetComponentPopover() {
  if (autocompleteContainer.value) {
    autocompleteContainer.value.querySelector('input')?.focus()
  }
  selectedComponent.value = ''
  nickname.value = ''
}
function insertComponentLink() {
  if (selectedComponent.value) {
    insertText(
      `[[${selectedComponent.value}${nickname.value.trim().length > 0 ? ' | ' + nickname.value : ''}]]`,
    )
  }
  if (componentPopover.value) componentPopover.value.hide()
}

// Card Display
const cardDisplayPopover = useTemplateRef('cardDisplayPopover')
const cardDisplayMainAutocompleteContainer = useTemplateRef('centeredMainAutocompleteContainer')
const selectedDisplayCard = ref<string>('')
const displayCards = ref<string[]>([])
const cardComponents = Object.keys(CARD_ARTS).map(name=>CASE_NAME_MAP[name])
const filteredCardComponents = ref()
function cardSearch() {
  filteredCardComponents.value = cardComponents.filter((name) => {
    let lowerCaseName = name.toLowerCase()
    for (let section of selectedDisplayCard.value.split(' ')) {
      if (!lowerCaseName.includes(section.trim().toLowerCase())) {
        return false
      }
    }
    return true
  })
}
const toggleCenteredPopover = (event: Event) => {
  if (cardDisplayPopover.value) cardDisplayPopover.value.toggle(event)
}
function resetCenteredPopover() {
  if (cardDisplayMainAutocompleteContainer.value) {
    cardDisplayMainAutocompleteContainer.value.querySelector('input')?.focus()
  }
  selectedDisplayCard.value = ''
  displayCards.value = []
}
function addCardToCenteredDisplay() {
  if (displayCards.value.length < 4) {
    displayCards.value.push(selectedDisplayCard.value)
    selectedDisplayCard.value = ''
  }
}
function swapItem(index1: number, index2: number) {
  let display = displayCards.value
  // Swap (NOTE: COLEN NECCESSARY)
  ;[display[index1], display[index2]] = [display[index2], display[index1]]
}
function insertCenteredCards() {
  insertText(`\n\n![[${displayCards.value.join(' | ')}]]\n`)
  if (cardDisplayPopover.value) cardDisplayPopover.value.hide()
}

// Large Component Display
const LCDPopover = useTemplateRef('LCDPopover')
const LCDAutocompleteContainer = useTemplateRef('LCDAutocompleteContainer')
const selectedLCD = ref<string>('')
const largeComponents = [
  ...Object.keys(SPIRITS),
  ...Object.keys(ADVESARIES),
  ...Object.keys(BOARDS),
].map((name) => CASE_NAME_MAP[name])
const filteredLCD = ref()
function LCDSearch() {
  filteredLCD.value = largeComponents.filter((name) => {
    let lowerCaseName = name.toLowerCase()
    for (let section of selectedLCD.value.split(' ')) {
      if (!lowerCaseName.includes(section.trim().toLowerCase())) {
        return false
      }
    }
    return true
  })
}
const toggleLCDPopover = (event: Event) => {
  if (LCDPopover.value) LCDPopover.value.toggle(event)
}
function resetLCDPopover() {
  if (LCDAutocompleteContainer.value) {
    LCDAutocompleteContainer.value.querySelector('input')?.focus()
  }
  selectedLCD.value = ''
}
function insertLCD() {
  if (selectedLCD.value) {
    insertText(`\n![[${selectedLCD.value}]]\n`)
  } else if (filteredLCD.value.length > 0) {
    insertText(`\n![[${filteredLCD.value[0]}]]\n`)
  }
  if (LCDPopover.value) LCDPopover.value.hide()
}

function insertText(text: string) {
  const el = textarea.value
  if (!el) return
  el.focus()
  const start = el.selectionStart
  const end = el.selectionEnd
  if (start == null || end == null) {
    el.value += text
    el.selectionStart = el.selectionEnd = el.value.length
  } else {
    el.value = el.value.substring(0, start) + text + el.value.substring(end)
    el.selectionStart = el.selectionEnd = start + text.length // new position of caret
  }
  articleData.value.content = el.value
  update()
}

/* Rendering information */
const ribbonButtons = ref([
  {
    is: Heading1,
    funciton: () => addBlock('#'),
    tooltip: 'make heading',
  },
  {
    is: Bold,
    funciton: () => addInlineEffect('**'),
    tooltip: 'make bold',
  },
  {
    is: Italic,
    funciton: () => addInlineEffect('*'),
    tooltip: 'make italic',
  },
  {
    is: Strikethrough,
    funciton: () => addInlineEffect('~~'),
    tooltip: 'make strikethrough',
  },
  {
    is: List,
    funciton: () => addBlock('-'),
    tooltip: 'add unordered list',
  },
  {
    is: ListOrdered,
    funciton: () => addBlock('1.'),
    tooltip: 'add ordered list',
  },
  {
    is: Link,
    funciton: () => insertMarkdownLink('link'),
    tooltip: 'add link',
  },
  {
    is: Image,
    funciton: () => insertMarkdownLink('image'),
    tooltip: 'add image',
  },
  {
    is: TextQuote,
    funciton: () => addBlock('>'),
    tooltip: 'add blockqoute',
  },
  {
    is: markRaw(SymbolSVG),
    funciton: toggleSymbolPopover,
    tooltip: 'add symbol',
  },
  {
    is: markRaw(ComponentSVG),
    funciton: toggleComponentPopover,
    tooltip: 'add component link',
  },
  {
    is: markRaw(LargeComponentSVG),
    funciton: toggleLCDPopover,
    tooltip: 'add large component display',
  },
  {
    is: markRaw(CenterDisplaySVG),
    funciton: toggleCenteredPopover,
    tooltip: 'add card display',
  },
])
</script>

<template>
  <div class="editor" v-if="articleData != null">
    <div class="ribbon">
      <div class="ribbon-button" @click="saveContent">
        <Save v-if="!saving"></Save>
        <Loader v-else></Loader>
        <span>Save</span>
      </div>
      <div class="ribbon-button" @click="openDeleteDialog">
        <Trash2></Trash2>
        <span>Delete</span>
      </div>
      <div class="ribbon-button" @click="changePropertiesDialogVisable = true">
        <Settings2></Settings2>
        <span>Edit Article Properties</span>
      </div>
      <div class="seperator"></div>
      <div
        v-for="(button, i) in ribbonButtons"
        class="ribbon-button"
        :key="i"
        @mousedown.prevent="button.funciton"
        v-tooltip.bottom="{
          value: button.tooltip,
          showDelay: 1000,
          pt: { text: { style: { 'font-size': '10px', padding: '4px' } } },
        }"
      >
        <Component :is="button.is"></Component>
      </div>
      <!-- RIBBON POPOVERS -->
      <Popover ref="symbolPopover" @show="symbolFilterInput = ''">
        <div class="popover">
          <div class="popover-heading">Add Symbol</div>
          <InputText
            v-model="symbolFilterInput"
            autofocus
            fluid
            placeholder="Filter symbols..."
            @keyup.enter="symbolEnterShortcut"
          ></InputText>
          <div class="symbol-container" v-if="filteredSymbols.length >= 1">
            <img
              v-for="symbol of filteredSymbols"
              class="symbol-option"
              :class="{ invert: INVERTABLE_SYMBOLS.includes(symbol) }"
              :alt="symbol"
              :src="SYMBOL_DATA[symbol]"
              @click="insertSymbol(symbol)"
            />
          </div>
          <div v-else>No results for filter</div>
        </div>
      </Popover>
      <Popover ref="componentPopover" @show="resetComponentPopover">
        <div class="popover">
          <div class="popover-heading">Game Component Link</div>
          <div class="form">
            <label ref="autocompleteContainer" class="label">
              <span>Component Name</span>
              <AutoComplete
                v-model="selectedComponent"
                :suggestions="filteredComponents"
                @complete="componentSearch"
                fluid
                forceSelection
                autoOptiionFocus
                inputId="autocomplete"
                @keyup.enter="insertComponentLink"
                placeholder="Filter components..."
              >
                <template #option="slotProps">
                  <span class="popover-auto-complete-otion">{{ slotProps.option }}</span>
                </template>
              </AutoComplete>
            </label>
            <label class="label">
              <span>Nickname</span>
              <InputText
                v-model="nickname"
                fluid
                @keyup.enter="insertComponentLink"
                inputId="nickname"
              ></InputText>
            </label>
          </div>
          <div class="popover-footer">
            <Button @click="insertComponentLink" size="small">Add Component Link</Button>
          </div>
        </div>
      </Popover>
      <Popover ref="LCDPopover" @show="resetLCDPopover">
        <div class="popover">
          <div class="popover-heading">Large Component Display</div>
          <div class="form">
            <label ref="LCDAutocompleteContainer" class="label">
              <span>Component Name</span>
              <AutoComplete
                v-model="selectedLCD"
                :suggestions="filteredLCD"
                @complete="LCDSearch"
                fluid
                forceSelection
                autoOptiionFocus
                inputId="LCDAutocompleteContainer"
                @keyup.enter="insertLCD"
                placeholder="Filter components..."
              >
                <template #option="slotProps">
                  <span class="popover-auto-complete-otion">{{ slotProps.option }}</span>
                </template>
              </AutoComplete>
            </label>
          </div>
          <div class="popover-footer">
            <Button @click="insertLCD" size="small">Add Component Display</Button>
          </div>
        </div>
      </Popover>
      <Popover ref="cardDisplayPopover" @show="resetCenteredPopover">
        <div class="popover">
          <div class="popover-heading">Card Display</div>
          <div class="form">
            <label ref="centeredMainAutocompleteContainer" class="label">
              <span>Card Name</span>
              <AutoComplete
                v-model="selectedDisplayCard"
                :suggestions="filteredCardComponents"
                @complete="cardSearch"
                @option-select="addCardToCenteredDisplay"
                fluid
                forceSelection
                autoOptiionFocus
                inputId="autocomplete"
                placeholder="Filter cards..."
              >
                <template #option="slotProps">
                  <span class="popover-auto-complete-otion">{{ slotProps.option }}</span>
                </template>
              </AutoComplete>
              <span class="reminder">(4 cards max)</span>
            </label>
            <div class="display-list">
              <div v-for="(card, i) in displayCards" class="display-item">
                <div class="display-item-end">
                  <Button class="end-button" v-if="i != 0" @click="swapItem(i, i - 1)">
                    <ChevronUp></ChevronUp>
                  </Button>
                  <Button
                    class="end-button"
                    v-if="i != displayCards.length - 1"
                    @click="swapItem(i, i + 1)"
                  >
                    <ChevronDown></ChevronDown>
                  </Button>
                </div>
                <div class="display-item-value">
                  {{ card }}
                </div>
                <div class="display-item-end">
                  <Button @click="displayCards.splice(i, 1)" class="end-button"><X></X></Button>
                </div>
              </div>
            </div>
            <div class="popover-footer">
              <Button @click="insertCenteredCards" v-if="displayCards.length > 0"
              >Insert Display</Button
            >
          </div>
            
          </div>
        </div>
      </Popover>
    </div>
    <div class="typeing-area">
      <textarea
        ref="textarea"
        spellcheck="false"
        autocapitalize="none"
        v-model="articleData.content"
        @input="inputEvent"
        @scroll="syncScroll()"
        @keydown="check_tab"
        @click="saveCaretPosition"
        @keyup="saveCaretPosition"
        @keydown.capture="handleShortcuts"
      ></textarea>
      <pre class="forground" ref="forground"></pre>
    </div>
    <DeleteArticleDialog v-model="deleteDialogVisable" :article="articleData"></DeleteArticleDialog>
    <ArticlePropertiesDialog
      v-model="changePropertiesDialogVisable"
      :is-new-article="false"
    ></ArticlePropertiesDialog>
    <Toast />
  </div>
</template>
<style scoped>
/* Editor */
.editor {
  display: flex;
  flex-direction: column;
  height: 100%;
}
/* RIBBON */
.ribbon {
  display: flex;
  font-size: smaller;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: stretch;
  background-color: var(--p-surface-200);
}
.ribbon-button {
  cursor: pointer;
  padding: 5px;
  color: var(--p-surface-800);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: background-color 0.2s;
  height: auto;
}
.ribbon-button:hover {
  background-color: var(--p-surface-300);
}
.ribbon-button svg {
  stroke-width: 1.5px;
  width: 20px;
  height: 20px;
}
.seperator {
  width: 2px;
  background-color: var(--p-surface-300);
}
/* POPOVERS */
.popover {
  width: min(80vw, 300px);
}
.symbol-container {
  display: flex;
  gap: 5px;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 20px;
  max-height: 300px;
  overflow-y: scroll;
}
.symbol-option {
  max-width: 30px;
  max-height: 30px;
  object-fit: contain;
  width: auto;
  height: auto;
  flex-shrink: 0;
  cursor: pointer;
}
.popover-heading {
  color: var(--p-surface-700);
  font-weight: 500;
  margin-bottom: 10px;
}
.form {
  display: flex;
  margin-top: 15px;
  flex-direction: column;
  gap: 10px;
}
.label {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
/* popover-auto-complete-otion in main.css*/
.popover-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.display-list {
  display:flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  gap:2px;
}
.display-item-end {
  display:flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}
.end-button {
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px;
  padding:0px;
  height: 100%;
}
.display-item {
  display:flex;
  flex-direction: row;
  gap:10px;
  background-color: var(--p-surface-200);
  align-items: center;
  height:52px;
}
.display-item-value {
  overflow:hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  width: 100%;
}
.reminder {
  font-size: small;
  color:var(--p-surface-600)
}



/* Highlighting */
.forground::v-deep(.hljs-section) {
  color: var(--p-primary-500);
  font-weight: bold;
}
.forground::v-deep(.hljs-strong) {
  font-weight: bold;
}
.forground::v-deep(.hljs-emphasis) {
  font-style: italic;
}
.forground::v-deep(.hljs-strike-through) {
  text-decoration: line-through;
}
.forground::v-deep(.hljs-bullet) {
  color: var(--p-primary-500);
}
.forground::v-deep(.hljs-code) {
  color: var(--p-surface-600);
  background-color: var(--p-surface-100);
  border-radius: 2px;
  outline: 3px solid var(--p-surface-100);
}
.forground::v-deep(.hljs-hr) {
  color: var(--p-primary-400);
}
.forground::v-deep(.hljs-link) {
  color: var(--p-primary-300);
  text-decoration: underline;
}
.forground::v-deep(.hljs-symbol),
.forground::v-deep(.hljs-inline-component),
.forground::v-deep(.hljs-block-component) {
  font-weight: inherit;
  color: var(--p-primary-500);
}
.forground::v-deep(.hljs-inline-nickname) {
  font-weight: inherit;
  color: var(--p-primary-700);
}

/* Synced text area */
.typeing-area {
  position: relative;
  width: 100%;
  height: 100%;
}
textarea,
.forground {
  margin: 0px;
  padding: 10px;
  border: 0;

  font-size: 0.8rem;
  font-family: monospace;
  line-height: 1.5;
  tab-size: 2;

  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  /* scrolling */
  overflow-x: hidden;
  white-space: pre-wrap; /* allow wrapping */
  word-wrap: break-word; /* break long words */
  overflow-wrap: break-word;
}

.forground {
  background-color: var(--p-surface-50);
  z-index: 0;
  color: var(--p-surface-900);
}
::selection {
  opacity: 0;
  color: var(--p-surface-500);
  background-color: #b4d5ff;
}
textarea {
  resize: none;
  color: transparent;
  background: transparent;
  caret-color: #f2d5cf;
  z-index: 1;
}
textarea:focus {
  outline: none;
}
</style>
