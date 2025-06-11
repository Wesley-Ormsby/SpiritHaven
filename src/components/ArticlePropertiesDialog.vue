<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import RadioButton from 'primevue/radiobutton'
import Message from 'primevue/message'
import Listbox from 'primevue/listbox'
import ImgLoad from './ImgLoad.vue'
import router from '../router'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { X, Upload, TriangleAlert, Image, SprayCan } from 'lucide-vue-next'
import { ref, useTemplateRef, watch } from 'vue'
import { ADVESARIES, POWERS, SCENARIOS, SPIRITS } from '@/scripts/data'
import type { Access, ArticleData, Spirit } from '@/scripts/types'
import { articleData, profileData } from '@/scripts/globalStore'
import { supabase } from '@/scripts/auth'
import TagMultiselect from './TagMultiselect.vue'

const model = defineModel<boolean>({ required: true })

// isNewArticle -> create new article
// !isNewArticle -> update existing article
const props = defineProps<{ isNewArticle: boolean }>()

// Title
const title = ref('')
const invalidTitle = ref<null | boolean>(null)
const titleEl = useTemplateRef('title-ref-parent')
watch(
  () => title.value,
  () => {
    if (invalidTitle.value != null) {
      invalidTitle.value = title.value.length > 80 || title.value.length < 5
    }
  },
)

// Description
const description = ref('')

// Content
const textareaContent = ref('')
function uploadContent(event: any) {
  const file: File = event.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    textareaContent.value = reader.result as string
  }
  reader.readAsText(file)
}

// Tags
const selectedTags = ref<{ tag: string }[]>([])


// Access
const selectedAccess = ref<Access>('private')
const accessDescription: Record<Access, string> = {
  private: 'Only you can view your article',
  public: 'Anyone can view your article',
  unlisted:
    'Your article won’t appear on your public profile or in any lists, but anyone with the link can still view it',
}
const showAccessDescription = ref(false)
const hoveringAccess = ref<Access>('private')
const timoutDisplay = ref()
async function showDescription(hov: Access) {
  timoutDisplay.value = setTimeout(() => {
    showAccessDescription.value = true
  }, 1000)
  hoveringAccess.value = hov
}
function stopDisplay() {
  clearTimeout(timoutDisplay.value)
  showAccessDescription.value = false
}

// Header Image
const selectedURL = ref<string>('')
const imageURL = ref('')
const gallaryURL = ref<{ name: string; url: string } | null>(null)
const showImage = ref(false)
const imageError = ref(false)
const headerURLContainer = useTemplateRef("headerURLContainer")
function selectAllTextInInput() {
  if(headerURLContainer.value) {
    headerURLContainer.value.querySelector('input')?.select()
  }
}
function inputURLOnChange() {
  if (selectedURL.value.trim() != '') {
    showImage.value = true
    imageURL.value = selectedURL.value + ''
    imageError.value = false
  } else {
    imageURL.value = ''
    showImage.value = false
  }
}
async function pressGallaryOption() {
  if (gallaryURL.value == null) return
  selectedURL.value = gallaryURL.value.url
  imageError.value = false
  inputURLOnChange()
}
const gallary = ref<{ name: string; url: string }[]>([
  ...Object.keys(SPIRITS).map((spirit) => {
    return {
      name: spirit,
      url: SPIRITS[spirit as Spirit].img_large as string,
    }
  }),
  ...Object.keys(SCENARIOS)
    .filter((scenario) => SCENARIOS[scenario].art != null)
    .map((scenario) => {
      return {
        name: scenario,
        url: SCENARIOS[scenario].art as string,
      }
    }),
  ...Object.keys(ADVESARIES).map((adv) => {
    return {
      name: adv + ' flag',
      url: ADVESARIES[adv].flag as string,
    }
  }),
  ...Object.keys(ADVESARIES)
    .filter((adv) => ADVESARIES[adv].map != null)
    .map((adv) => {
      return {
        name: adv + ' map',
        url: ADVESARIES[adv].map as string,
      }
    }),
    ...Object.keys(POWERS)
    .filter((card) => POWERS[card].art != null)
    .map((card) => {
      return {
        name: card,
        url: POWERS[card].art as string,
      }
    }),
])

function open() {
  // reset variables
  imageError.value = false
  gallaryURL.value = null
  invalidTitle.value = null
  showAccessDescription.value = false
  if (props.isNewArticle) {
    title.value = ''
    description.value = ''
    textareaContent.value = ''
    selectedTags.value = []
    selectedAccess.value = 'private'
    showAccessDescription.value = false
    selectedURL.value = ''
    imageError.value = false
    imageURL.value = ''
    showImage.value = false
  } else {
    title.value = articleData.value.title + ''
    description.value = articleData.value.description + ''
    textareaContent.value = articleData.value.content + ''
    selectedTags.value = articleData.value.tags.map((tag) => ({ tag }))
    selectedAccess.value = (articleData.value.access + '') as Access
    if (articleData.value.img != null) {
      selectedURL.value = articleData.value.img + ''
      imageURL.value = articleData.value.img + ''
      showImage.value = true
    } else {
      showImage.value = false
    }
  }

  clearTimeout(timoutDisplay.value)
}

async function openNewArticle() {
  if (profileData.value == null) {
    return
  }
  if (title.value.length > 80 || title.value.length < 5) {
    invalidTitle.value = true
    if (titleEl.value != null) {
      const el = titleEl.value.querySelector('input') as HTMLElement
      el.scrollIntoView({ behavior: 'smooth' })
      el.focus()
    }
    return
  }
  // Note, the dates should be auto updated
  const article = {
    user: profileData.value.id,
    img: imageURL.value || null,
    title: title.value,
    description: description.value,
    tags: selectedTags.value.map((tag: { tag: string }) => tag.tag.toLowerCase()),
    content: textareaContent.value,
    access: selectedAccess.value,
  }
  if (props.isNewArticle) {
    const { data, error } = await supabase.from('articles').insert(article).select()
    if (!error) {
      router.push({ name: 'article', params: { id: data[0].id } })
    }
  } else {
    const { data, error } = await supabase
      .from('articles')
      .update(article)
      .eq('id', articleData.value.id)
      .select()
    console.log(data)
    if (!error) {
      console.log('not error')
      articleData.value = data[0] as ArticleData
    }
    model.value = false
  }
}
</script>
<template>
  <Dialog
    v-model:visible="model"
    modal
    :header="props.isNewArticle ? 'New Article' : 'Update Article Properties'"
    :style="{ width: '25rem' }"
    :breakpoints="{ '600px': '80vw' }"
    :draggable="false"
    @show="open"
    @hide=""
  >
    <template #closebutton="{ closeCallback }">
      <X class="close-x" @click="closeCallback"></X>
    </template>
    <div class="form">
      <label ref="title-ref-parent">
        Title
        <InputText type="text" v-model="title" :invalid="invalidTitle" maxLength="80" />
        <span class="error" :class="{ visible: invalidTitle }"
          >The title must be 5-80 characters</span
        >
      </label>
      <label>
        <span>Description <i>(optional)</i></span>
        <Textarea
          v-model="description"
          rows="4"
          cols="30"
          fluid
          style="resize: none"
          maxLength="150"
        />
      </label>
      <label>
        <span class="inline-icon-text">Access</span>
        <div class="split-container">
          <div>
            <div class="check-box-container">
              <div
                class="check-box-option"
                @mouseenter="showDescription('private')"
                @mouseleave="stopDisplay"
              >
                <RadioButton v-model="selectedAccess" inputId="a1" name="private" value="private" />
                <label for="a1">Private</label>
              </div>
              <div
                class="check-box-option"
                @mouseenter="showDescription('unlisted')"
                @mouseleave="stopDisplay"
              >
                <RadioButton
                  v-model="selectedAccess"
                  inputId="a2"
                  name="unlisted"
                  value="unlisted"
                />
                <label for="a2">Unlisted</label>
              </div>
              <div
                class="check-box-option"
                @mouseenter="showDescription('public')"
                @mouseleave="stopDisplay"
              >
                <RadioButton v-model="selectedAccess" inputId="a3" name="public" value="public" />
                <label for="a3">Public</label>
              </div>
            </div>
          </div>
          <div>
            <Message severity="info" size="small" v-if="showAccessDescription">
              <span>{{ accessDescription[hoveringAccess] }}</span></Message
            >
          </div>
        </div>
      </label>
      <label>
        <span>Tags <i>(optional)</i></span>
        <TagMultiselect v-model="selectedTags"></TagMultiselect>
      </label>
      <span>Header Image <i>(optional)</i></span>
      <div ref="headerURLContainer">
      <InputGroup>
        <InputText
          type="text"
          v-model="selectedURL"
          placeholder="Enter image url"
          @change="inputURLOnChange"
          @focus="selectAllTextInInput"
        />
        <InputGroupAddon>
          <TriangleAlert v-if="imageError"></TriangleAlert>
          <ImgLoad
            v-else-if="showImage"
            :src="imageURL"
            class="list-image"
            alt="header image"
            v-model="imageError"
            :preview="true"
            :key="imageURL"
          />
          <Image v-else></Image>
        </InputGroupAddon>
      </InputGroup>
    </div>
      <label> Select a Gallery Image for the Header</label>
      <Listbox
        v-model="gallaryURL"
        :options="gallary"
        filter
        optionLabel="name"
        @change="pressGallaryOption"
      >
        <template #option="slotProps">
          <div class="list-option">
            <div class="list-image-continer">
              <ImgLoad
                :src="slotProps.option.url"
                :preview="false"
                class="list-image"
                :alt="slotProps.option.name"
              />
            </div>
            <span>{{ slotProps.option.name }}</span>
          </div>
        </template>
      </Listbox>

      <label>
        <span>Content <i>(optional)</i> </span>
        <Textarea v-model="textareaContent" rows="5" cols="30" fluid style="resize: none" />
      </label>
      <FileUpload
        mode="basic"
        name="textFile"
        customUpload
        accept=".md,.txt"
        @uploader="uploadContent"
        :auto="true"
        chooseLabel="Upload File"
      >
        <template #chooseicon> <Upload></Upload> </template
      ></FileUpload>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <Button class="secondary" @click="model = false">Cancel</Button>
        <Button @click="openNewArticle">{{
          props.isNewArticle ? 'Open in Editor' : 'Save Changes'
        }}</Button>
      </div>
    </template>
  </Dialog>
</template>
<style scoped>
/* FORM */
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
label {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
::v-deep(.p-fileupload) {
  display: block;
}
::v-deep(.p-fileupload) .p-button {
  padding: 5px 10px;
  font-size: 12px;
}
::v-deep(.p-fileupload .lucide-upload-icon) {
  width: 12px !important;
}
::v-deep(.p-multiselect-list-container) {
  max-height: 10rem;
}
.multiselect-option-text {
  text-transform: capitalize;
  text-transform: capitalize;
  overflow: auto;
  text-overflow: ellipsis;
}
::v-deep(.p-multiselect-label) {
  overflow-x: scroll;
}
.check-box-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}
.check-box-option {
  display: flex;
  flex-direction: row;
  gap: 4px;
}
.split-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.access-description {
  padding: 5px;
}
::v-deep(.p-listbox-list-container) {
  max-height: 8rem !important;
}
::v-deep(.p-listbox .p-listbox-list .p-listbox-option.p-listbox-option-selected) {
  background-color: var(--p-listbox-option-background);
}
::v-deep(.p-listbox .p-listbox-list .p-listbox-option.p-listbox-option-selected):hover {
  background-color: var(--p-listbox-option-focus-background);
}
.list-option {
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
  align-items: center;
  gap: 10px;
  max-width: 60vw;
}
.list-option span {
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  text-wrap: nowrap;
}
.list-image-continer {
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-image {
  height: 24px;
  width: auto;
}

/* HEADER + FOOTER */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}
.secondary {
  background-color: var(--p-surface-300);
  border-color: var(--p-surface-300) !important;
  color: var(--p-surface-900) !important;
}
.secondary:hover {
  background-color: var(--p-surface-400) !important;
}
.close-x {
  stroke: var(--p-surface-600);
  transition: 0.3s stroke;
  cursor: pointer;
}
.close-x:hover {
  stroke: var(--p-surface-900);
}

.error {
  color: var(--p-red-500);
  opacity: 0;
  font-size: 12px;
}
.visible {
  opacity: 1;
}
@media only screen and (max-width: 500px) {
  ::v-deep(.p-message-text) {
    font-size: 10px !important;
  }
  .multiselect-option-text,
  .list-option span {
    font-size: 12px;
  }
}
</style>
