<script setup lang="ts">
import { Button } from 'primevue'
import { ref, computed, useTemplateRef, onMounted, watch } from 'vue'
import {
  Search,
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
  ListFilter,
  ArrowDownWideNarrow,
  X,
} from 'lucide-vue-next'
import { supabase, userData } from '@/scripts/auth'
import type { ArticleData, UserData } from '@/scripts/types'
import Footer from '@/components/Footer.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import ArticleFilterDialog from '@/components/ArticleFilterDialog.vue'
import RadioButton from 'primevue/radiobutton'
import Menu from 'primevue/menu'
import ArticleCard from '@/components/ArticleCard.vue'
import { TAGS } from '@/scripts/data'
import { allUsers } from '@/scripts/globalStore'
import { useRoute } from 'vue-router'

const input = ref('')
const allArticles = ref<ArticleData[]>([])
const p = ref(1)
const q = ref('')
const tags = ref<string[]>([])
const author = ref<string>('')
const sortDirection = ref('descending')
const sortBy = ref('recently updated')
const rowsPerPage = 20
const filterDialogVisable = ref(false)
const loading = ref(true)

const route = useRoute()
watch(
  () => route.params,
  async (newId, oldId) => {
    setupData()
  },
)

const sortOptions = ref([
  {
    label: 'Sort By',
    items: [
      {
        label: 'name',
        category: 'sortBy',
      },
      {
        label: 'recently updated',
        category: 'sortBy',
      },
      {
        label: 'recently published',
        category: 'sortBy',
      },
    ],
  },
  {
    label: 'Sort Direction',
    items: [
      {
        label: 'ascending',
        category: 'sortDirection',
      },
      {
        label: 'descending',
        category: 'sortDirection',
      },
    ],
  },
])
const menu = useTemplateRef('sortMenu')
const openSortMenu = (event: Event) => {
  menu?.value?.toggle(event)
}

const tabs = ref(['all articles', 'your articles'])
const selectedTab = ref('all articles')
function selectTab(tab: string) {
  selectedTab.value = tab
  search('tab', tab)
}

const sortFunction: Record<string, (a: ArticleData, b: ArticleData) => number> = {
  name: function (a: ArticleData, b: ArticleData) {
    return a.title.localeCompare(b.title)
  },
  'recently updated': function (a: ArticleData, b: ArticleData) {
    return new Date(b.updated).getTime() - new Date(a.updated).getTime()
  },
  'recently published': function (a: ArticleData, b: ArticleData) {
    return new Date(b.published).getTime() - new Date(a.published).getTime()
  },
}

const filteredArticles = computed(() => {
  const query = q.value.toLowerCase().trim().split(/\s/g)
  let sortedArticles = allArticles.value
    .filter((article) => {
      let title = article.title.toLowerCase()
      if (author.value && article.user != author.value) {
        return false
      }
      for (var term of query) {
        if (!title.includes(term)) {
          return false
        }
      }
      for (var tag of tags.value) {
        if (!article.tags.includes(tag)) {
          return false
        }
      }
      return true
    })
    .sort(sortFunction[sortBy.value])
  if (sortDirection.value == 'ascending') {
    sortedArticles.reverse()
  }
  return sortedArticles
})
const lowerbound = computed(() => (p.value - 1) * rowsPerPage)
const upperbound = computed(() =>
  Math.min(lowerbound.value + rowsPerPage, filteredArticles.value.length),
)
const pages = computed(() => Math.ceil(filteredArticles.value.length / rowsPerPage))
const pageArticles = computed(() => {
  return filteredArticles.value.slice(lowerbound.value, upperbound.value)
})

const pageError = computed(() => p.value < 1 || p.value > pages.value)

onMounted(setupData)

function changePage(newPage: number) {
  var searchParams = new URLSearchParams(window.location.search)
  searchParams.set('p', String(Number(newPage)))
  window.location.search = searchParams.toString()
}
function search(key: string, value: string) {
  var searchParams = new URLSearchParams(window.location.search)
  searchParams.set(key, value)
  searchParams.set('p', '1')
  window.location.search = searchParams.toString()
}

async function setupData() {
  // reset variables
  input.value = ''
  allArticles.value = []
  p.value = 1
  q.value = ''
  tags.value = []
  author.value = ''
  sortDirection.value = 'descending'
  sortBy.value = 'recently updated'
  filterDialogVisable.value = false
  selectedTab.value = 'all articles'
  loading.value = true

  let params = new URLSearchParams(document.location.search)
  let query = params.get('q')
  if (query != null) {
    input.value = query
    q.value = query
  }
  let page = params.get('p')
  if (page != null && /^\d+$/.test(page)) {
    p.value = Number(page)
  }
  let sortParam = params.get('sort')
  if (
    sortParam != null &&
    ['recently updated', 'recently updated', 'name'].includes(sortParam.toLowerCase())
  ) {
    sortBy.value = sortParam.toLowerCase()
  }
  let directionParam = params.get('direction')
  if (
    directionParam != null &&
    (directionParam.toLowerCase() == 'ascending' || directionParam.toLowerCase() == 'descending')
  ) {
    sortDirection.value = directionParam.toLowerCase()
  }
  let tabParam = params.get('tab')
  if (tabParam != null && tabs.value.includes(tabParam.toLowerCase())) {
    selectedTab.value = tabParam.toLowerCase()
  }
  let tagsParam = params.get('tags')
  if (tagsParam != null) {
    for (var tag of tagsParam.split(',')) {
      if (TAGS.includes(tag.toLowerCase())) {
        tags.value.push(tag.toLowerCase())
      }
    }
  }
  let authorParam = params.get('author')
  if (authorParam != null) {
    let { data, error } = await supabase.from('Users').select()
    if (!error) {
      allUsers.value = data as UserData[]
    }
    for (let user of allUsers.value) {
      if ((user.id = authorParam)) {
        author.value = authorParam
        break
      }
    }
  }
  const { data, error } =
    selectedTab.value == 'your articles'
      ? userData.value != null
        ? await supabase.from('articles').select().eq('id', userData.value.id)
        : { data: [], error: false }
      : await supabase.from('articles').select().not('access', 'eq', 'unlisted')
  if (!error) {
    allArticles.value = data
  }
  loading.value = false
}
</script>

<template>
  <div class="page">
    <h1>Search <span class="primary">Articles</span></h1>
    <div class="searchOptions">
      <div class="tabGroup">
        <div
          v-for="tab of tabs"
          @click="selectTab(tab)"
          class="tab"
          :class="{ selectedTab: selectedTab == tab }"
        >
          {{ tab }}
        </div>
      </div>
      <div class="filter-container">
        <InputGroup class="small-group">
          <InputText
            type="text"
            v-model="input"
            placeholder="Search articles..."
            @keypress.enter="search('q', input)"
            size="small"
          />
          <InputGroupAddon>
            <Button @click="search('q', input)" size="small"><Search></Search></Button>
          </InputGroupAddon>
        </InputGroup>
        <Button size="small" label="More Filters" @click="filterDialogVisable = true"
          ><template #icon> <ListFilter></ListFilter> </template
        ></Button>
        <Button size="small" label="Sort" aria-controls="order_menu" @click="openSortMenu"
          ><template #icon> <ArrowDownWideNarrow></ArrowDownWideNarrow> </template
        ></Button>
        <RouterLink to="/search/article"
          ><Button label="Reset" size="small" variant="outlined"
            ><template #icon> <X></X> </template></Button
        ></RouterLink>
        <Menu ref="sortMenu" id="order_menu" :model="sortOptions" :popup="true">
          <template #item="{ item, props }">
            <label v-if="item.category == 'sortBy'" @click="search('sort', item.label as string)">
              <RadioButton v-model="sortBy" :value="item.label" />
              {{ item.label }}
            </label>
            <label v-else>
              <RadioButton
                v-model="sortDirection"
                :value="item.label"
                @click="search('direction', item.label as string)"
              />
              {{ item.label }}
            </label>
          </template></Menu
        >
      </div>
    </div>
    <div class="article-container">
      <!-- REMEMBER SKELLETONS -->
      <ArticleCard v-if="loading" v-for="_ in rowsPerPage" :article="null"></ArticleCard>
      <h2 v-else-if="filteredArticles.length < 1">No Results Found for Query</h2>
      <div v-else-if="pageError" class="centered-column">
        <h2>Page {{ p }} is out of the page range</h2>
        <Button @click="changePage(1)">Go to page 1</Button>
      </div>
      <ArticleCard
        v-else-if="allArticles.length"
        v-for="article in pageArticles"
        :article="article"
      ></ArticleCard>
    </div>
    <div class="paginator" v-if="filteredArticles.length > 0 && !pageError">
      <Button rounded @click="changePage(1)" :disabled="p == 1">
        <template #icon> <ChevronsLeft /> </template
      ></Button>
      <Button rounded @click="changePage(p - 1)" :disabled="p == 1">
        <template #icon> <ChevronLeft /> </template
      ></Button>
      <div>Showing {{ lowerbound + 1 }} to {{ upperbound }} of {{ filteredArticles.length }}</div>
      <Button rounded @click="changePage(p + 1)" :disabled="p == pages">
        <template #icon> <ChevronRight /> </template
      ></Button>
      <Button rounded @click="changePage(pages)" :disabled="p == pages">
        <template #icon> <ChevronsRight /> </template
      ></Button>
    </div>
  </div>
  <Footer></Footer>

  <ArticleFilterDialog
    v-model="filterDialogVisable"
    :q="q"
    :id="author"
    :tags="tags"
  ></ArticleFilterDialog>
</template>

<style lang="css" scoped>
.page {
  min-height: calc(100vh - 60px);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 90vw;
}
h1 {
  color: var(--p-surface-900);
  margin-top: 70px;
  text-align: center;
  font-size: 60px;
}
.primary {
  color: var(--p-primary-500);
}
.filter-container {
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 10px;
}
::v-deep(.p-button-label) {
  text-wrap: nowrap;
}
::v-deep(.p-button) {
  flex-shrink: 0;
}
label {
  display: flex;
  gap: 10px;
  align-items: center;
  text-transform: capitalize;
}
.small-group {
  height: 38px;
  max-width: 400px;
}
.tab {
  height: 38px;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 18px;
  transition: color 0.3s;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--p-surface-700);
}
.tab:hover {
  color: var(--p-surface-900);
}
.selectedTab {
  background-color: var(--p-surface-300);
}
.searchOptions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}
.tabGroup {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.article-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 30px auto;
}
.paginator {
  display: flex;
  gap: 5px;
}
.paginator {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}
.centered-column {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.primary {
  color: var(--p-primary-500);
}
.flex-row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
