<script setup lang="ts">
import { onMounted, useTemplateRef, ref, markRaw, computed, watch, nextTick } from 'vue'
import { highlight } from '@/scripts/highlighter'
import { useGlobalStore } from '@/scripts/globalStore'
import { onBeforeRouteLeave } from 'vue-router'
import Popover from 'primevue/popover'
import InputText from 'primevue/inputtext'
import AutoComplete from 'primevue/autocomplete'
import Message from 'primevue/message'
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
import SymbolSVG from './svgs/SymbolSVG.vue'
import ComponentSVG from './svgs/ComponentSVG.vue'
import LargeComponentSVG from './svgs/LargeComponentSVG.vue'
import DeleteArticleDialog from './DeleteArticleDialog.vue'
import ArticlePropertiesDialog from './ArticlePropertiesDialog.vue'
import CenterDisplaySVG from './svgs/CenterDisplaySVG.vue'
import {
  ADVESARIES,
  BOARDS,
  CASE_NAME_MAP,
  INVERTABLE_SYMBOLS,
  SPIRITS,
  SYMBOL_DATA,
} from '@/scripts/data'
import { searchCards } from '@/scripts/HavenDSL/search'
import type { QueryResult } from '@/scripts/HavenDSL/types'
import { setSupabaseError } from '@/scripts/supabaseErrors'
import Loader from './Loader.vue'
import CustomSymbol from './customSymbols/CustomSymbol.vue'
import CustomSymbolDialog from './customSymbols/CustomSymbolDialog.vue'
const { articleData } = useGlobalStore
const toast = useToast()

const textarea = useTemplateRef('textarea')
const forground = useTemplateRef('forground')

/* EDITOR + MARKDOWN SYNCING */
onMounted(() => {
  articleContent.value = articleData.content
  inputEvent()
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
  if (forground.value == null || textarea.value == null) return
  let value = textarea.value.value
  if (value[value.length - 1] == '\n') {
    value += ' '
  }
  forground.value.innerHTML = highlight(value)
}

function checkTab(event: KeyboardEvent) {
  if (textarea.value == null) return
  let value = textarea.value.value
  if (event.key == 'Tab') {
    event.preventDefault() // stop normal event
    let before_tab = value.slice(0, textarea.value.selectionStart) 
    let after_tab = value.slice(textarea.value.selectionEnd, textarea.value.value.length) 
    let cursor_pos = textarea.value.selectionStart + 1
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
const articleContent = ref("")
const unsavedChanges = computed(()=>articleContent.value != articleData.content)
const loadingSave = ref(false)
async function saveContent() {
  if (articleData == null) {
    return
  }
  loadingSave.value = true
  const { data, error } = await supabase
    .from('articles')
    .update({ content: articleData.content })
    .eq('id', articleData.id)
    .select()
  if (!error) {
    toast.add({ severity: 'success', summary: 'Saved', life: 2200 })
    articleContent.value = data[0].content
  } else {
    setSupabaseError(error)
  }
  loadingSave.value = false
}

// Delete
const deleteDialogVisable = ref(false)
function openDeleteDialog() {
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
  articleData.content = el.value
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
      el.value = value.slice(0, start) + markdown + markdown + value.slice(end)
      el.selectionStart = el.selectionEnd = start + markdown.length
    } else {
      // Wrap selected text
      el.value = value.slice(0, start) + markdown + selected + markdown + value.slice(end)
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
  articleData.content = el.value
  update()
  el.focus()
}

// Add image/link
function insertMarkdownLink(type: 'image' | 'link') {
  const defaults = {
    image: {
      url: 'https://res.cloudinary.com/du1bjnkar/image/upload/v1756733058/river_surges_in_sunlight_u1sbpe.png',
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
    const { url, alt } = defaults.image
    insertion = `![${alt}](${url})`
    selectStart = 2
    selectEnd = 2 + alt.length
  } else {
    const { url, text } = defaults.link
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
  articleData.content = el.value
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
const customSymbolDialogVisibility = ref(false)
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
const hoverlinkQueryResult = ref<QueryResult | null>(null)
const hoverlinkQueryCards = computed(() =>
  hoverlinkQueryResult.value == null
    ? []
    : hoverlinkQueryResult.value.query.map((name) => CASE_NAME_MAP[name]),
)
function componentSearch() {
  hoverlinkQueryResult.value = searchCards(selectedComponent.value, true)
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
  hoverlinkQueryResult.value = null
}
function insertComponentLink() {
  if (selectedComponent.value) {
    insertText(
      `[[${selectedComponent.value}${nickname.value.trim().length > 0 ? ' | ' + nickname.value : ''}]]`,
    )
  }
  if (componentPopover.value) componentPopover.value.hide()
}
const validHoverLinkName = computed(() =>
  Boolean(selectedComponent.value && CASE_NAME_MAP[selectedComponent.value.toLowerCase()]),
)

// Card Display
const cardDisplayPopover = useTemplateRef('cardDisplayPopover')
const cardDisplayMainAutocompleteContainer = useTemplateRef('centeredMainAutocompleteContainer')
const selectedDisplayCard = ref<string>('')
const displayCards = ref<string[]>([])
const cardDisplayQueryResult = ref<QueryResult | null>(null)
const cardDisplayQueryCards = computed(() =>
  cardDisplayQueryResult.value == null
    ? []
    : cardDisplayQueryResult.value.query.map((name) => CASE_NAME_MAP[name]),
)
function cardSearch() {
  cardDisplayQueryResult.value = searchCards(selectedDisplayCard.value, true)
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
  cardDisplayQueryResult.value = null
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
]
const normalCaseComponents = largeComponents.map((name) => CASE_NAME_MAP[name])
const filteredLCD = ref()
function LCDSearch() {
  filteredLCD.value = normalCaseComponents.filter((name) => {
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
const validLCDName = computed(() => largeComponents.includes(selectedLCD.value.toLowerCase()))

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
  articleData.content = el.value
  update()
}

/* Rendering information */
const ribbonButtons = ref([
  {
    is: Heading1,
    function: () => addBlock('#'),
    tooltip: 'make heading',
  },
  {
    is: Bold,
    function: () => addInlineEffect('**'),
    tooltip: 'make bold',
  },
  {
    is: Italic,
    function: () => addInlineEffect('*'),
    tooltip: 'make italic',
  },
  {
    is: Strikethrough,
    function: () => addInlineEffect('~~'),
    tooltip: 'make strikethrough',
  },
  {
    is: List,
    function: () => addBlock('-'),
    tooltip: 'add unordered list',
  },
  {
    is: ListOrdered,
    function: () => addBlock('1.'),
    tooltip: 'add ordered list',
  },
  {
    is: Link,
    function: () => insertMarkdownLink('link'),
    tooltip: 'add link',
  },
  {
    is: Image,
    function: () => insertMarkdownLink('image'),
    tooltip: 'add image',
  },
  {
    is: TextQuote,
    function: () => addBlock('>'),
    tooltip: 'add blockqoute',
  },
  {
    is: markRaw(SymbolSVG),
    function: toggleSymbolPopover,
    tooltip: 'add symbol',
    ariaControls: 'symbol_popover'
  },
  {
    is: markRaw(ComponentSVG),
    function: toggleComponentPopover,
    tooltip: 'add hover link',
    ariaControls: 'hoverlink_popover'
  },
  {
    is: markRaw(LargeComponentSVG),
    function: toggleLCDPopover,
    tooltip: 'add large component display',
    ariaControls: 'large_component_popover'
  },
  {
    is: markRaw(CenterDisplaySVG),
    function: toggleCenteredPopover,
    tooltip: 'add card display',
    ariaControls: 'card_display_popover'
  },
])
</script>

<template>
  <div class="editor" v-if="articleData != null">
    <div class="ribbon">
      <Button class="ribbon-button" @click="saveContent" :disabled="!unsavedChanges" :loading="loadingSave">
          <Loader v-if="loadingSave"></Loader>
          <Save v-else></Save>
        Save
      </Button>
      <Button class="ribbon-button" @click="openDeleteDialog">
          <Trash2></Trash2>
        Delete
      </Button>
      <Button class="ribbon-button" @click="changePropertiesDialogVisable = true">
          <Settings2></Settings2>
        Edit Article Properties
      </Button>
      <div class="seperator"></div>
      <Button
        v-for="(button, i) in ribbonButtons"
        class="ribbon-button"
        :key="i"
        :aria-label="button.tooltip"
        :aria-haspopup="button.ariaControls != undefined" 
        :aria-controls="button.ariaControls"
        @mousedown.prevent="button.function"
        v-tooltip.bottom="{
          value: button.tooltip,
          showDelay: 1000,
          pt: { text: { style: { 'font-size': '10px', padding: '4px' } } },
        }"
      >
        <Component :is="button.is"></Component>
      </Button>
      <!-- RIBBON POPOVERS -->
      <Popover ref="symbolPopover" @show="symbolFilterInput = ''" id="symbol_popover">
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
              role="button"
            />
          </div>
          <div v-else>No results for filter</div>
          <div class="popover-footer">
          <Button @click="customSymbolDialogVisibility = true">See Custom Symbols</Button>
          </div>
        </div>
      </Popover>
      <CustomSymbolDialog v-model:visible="customSymbolDialogVisibility" :insertSymbol="insertSymbol"></CustomSymbolDialog>
      <Popover ref="componentPopover" @show="resetComponentPopover" id="hoverlink_popover">
        <div class="popover">
          <div class="popover-heading">Hover Link</div>
          <div class="form">
            <label ref="autocompleteContainer" class="label">
              <span>Component Name</span>
              <AutoComplete
                v-model="selectedComponent"
                :suggestions="hoverlinkQueryCards"
                @complete="componentSearch"
                fluid
                forceSelection
                autoOptionFocus
                inputId="autocomplete"
                @keyup.enter="insertComponentLink"
                placeholder="Filter components..."
                :showEmptyMessage="
                  Boolean(hoverlinkQueryResult && hoverlinkQueryResult.errors.length == 0)
                "
              >
                <template #option="slotProps">
                  <span class="popover-auto-complete-otion">{{ slotProps.option }}</span>
                </template>
              </AutoComplete>
              <span class="reminder"
                >(the search uses
                <RouterLink to="/query-syntax" target="_blank" class="primary-link underline"
                  >query</RouterLink
                >
                syntax)</span
              >
            </label>
            <Message
              severity="error"
              v-if="hoverlinkQueryResult && selectedComponent"
              v-for="error in hoverlinkQueryResult.errors"
              >{{ error }}</Message
            >
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
            <Button @click="insertComponentLink" size="small" :disabled="!validHoverLinkName"
              >Add Component Link</Button
            >
          </div>
        </div>
      </Popover>
      <Popover ref="LCDPopover" @show="resetLCDPopover" id="large_component_popover">
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
                autoOptionFocus
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
            <Button @click="insertLCD" size="small" :disabled="!validLCDName"
              >Add Component Display</Button
            >
          </div>
        </div>
      </Popover>
      <Popover ref="cardDisplayPopover" @show="resetCenteredPopover" id="card_display_popover">
        <div class="popover">
          <div class="popover-heading">Card Display</div>
          <div class="form">
            <label ref="centeredMainAutocompleteContainer" class="label">
              <span>Card Name</span>
              <AutoComplete
                v-model="selectedDisplayCard"
                :suggestions="cardDisplayQueryCards"
                @complete="cardSearch"
                @option-select="addCardToCenteredDisplay"
                fluid
                forceSelection
                autoOptionFocus
                inputId="autocomplete"
                placeholder="Filter cards..."
                :showEmptyMessage="
                  Boolean(cardDisplayQueryResult && cardDisplayQueryResult.errors.length == 0)
                "
              >
                <template #option="slotProps">
                  <span class="popover-auto-complete-otion">{{ slotProps.option }}</span>
                </template>
              </AutoComplete>
              <span class="reminder"
                >(4 cards max, this search uses
                <RouterLink to="/query-syntax" target="_blank" class="primary-link underline"
                  >query</RouterLink
                >
                syntax)</span
              >
            </label>
            <Message
              severity="error"
              v-if="cardDisplayQueryResult && selectedDisplayCard"
              v-for="error in cardDisplayQueryResult.errors"
              >{{ error }}</Message
            >
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
        placeholder="Start writing..."
        @input="inputEvent"
        @scroll="syncScroll()"
        @keydown="checkTab"
        @click="saveCaretPosition"
        @keyup="saveCaretPosition"
        @keydown.capture="handleShortcuts"
      ></textarea>
      <pre class="forground ignore-smooth-scroll" ref="forground"></pre>
    </div>
    <DeleteArticleDialog v-model="deleteDialogVisable" :article="articleData"></DeleteArticleDialog>
    <ArticlePropertiesDialog
      v-model="changePropertiesDialogVisable"
      :is-new-article="false"
      @save="articleContent = articleData.content"
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
  padding: 5px;
  color: var(--p-surface-800) !important;
  background-color: var(--p-surface-200);
  border-color: var(--p-surface-200) !important;
  transition: background-color 0.2s;
  width:auto;
}
.ribbon-button:hover:not(:disabled) {
  background-color: var(--p-surface-300) !important;
}
.ribbon-button svg {
  width:20px;
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
  margin-top: 15px;
}
/* popover-auto-complete-option in main.css*/
.popover-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.display-list {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  gap: 2px;
}
.display-item-end {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}
.end-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px;
  padding: 0px;
  height: 100%;
}
.display-item {
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: var(--p-surface-200);
  align-items: center;
  height: 52px;
}
.display-item-value {
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  width: 100%;
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
.forground::v-deep(.hljs-link) {
  text-decoration: underline;
}
.forground::v-deep(.hljs-bullet) {
  color: var(--p-primary-500);
}
.forground::v-deep(.hljs-code) {
  color: var(--p-surface-600);
  background-color: var(--p-surface-100);
  border-radius: 2px;

  /* Short hand styling for mobile */
  outline-width: 3px;
  outline-style: solid;
  outline-color: var(--p-surface-100);
}
.forground::v-deep(.hljs-hr) {
  color: var(--p-primary-400);
}
/* Link style in main.css */
.forground::v-deep(.hljs-symbol),
.forground::v-deep(.hljs-hoverlink),
.forground::v-deep(.hljs-block-component) {
  font-weight: inherit;
  color: var(--p-primary-500);
}
.forground::v-deep(.hljs-hoverlink-nickname) {
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
::placeholder {
  color: var(--p-surface-600);
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
