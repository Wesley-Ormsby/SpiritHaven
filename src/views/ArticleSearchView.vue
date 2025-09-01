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
import { supabase } from '@/scripts/auth'
import type { ArticleData } from '@/scripts/types'
import Footer from '@/components/Footer.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import ArticleFilterDialog from '@/components/ArticleFilterDialog.vue'
import RadioButton from 'primevue/radiobutton'
import Menu from 'primevue/menu'
import ArticleCard from '@/components/ArticleCard.vue'
import { TAGS } from '@/scripts/data'
import { useGlobalStore } from '@/scripts/globalStore'
import { useRoute, useRouter } from 'vue-router'
import { setSupabaseError } from '@/scripts/supabaseErrors'

const router = useRouter()
const route = useRoute()
const { userData, userLikes } = useGlobalStore

const input = ref('')
const allArticles = ref<ArticleData[]>([])
const p = ref(1)
const q = ref('')
const tags = ref<string[]>([])
const author = ref<string>('')
const sortDirection = ref('descending')
const sortBy = ref('recently updated')
const rowsPerPage = 20
const filterDialogVisible = ref(false)
const loading = ref(true)

watch(
  () => route.query,
  async (newId, oldId) => {
    setupData()
  },
)
onMounted(setupData)

const sortOptions = ref([
  {
    label: 'Sort By',
    items: [
      {
        label: 'name',
        category: 'sortBy',
      },
      { 
        label: 'likes',
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

const tabs = ref(['all articles', 'your articles', 'liked articles'])
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
  'likes': function (a: ArticleData, b: ArticleData) {
    return b.likes - a.likes
  },
}

const filteredArticles = computed(() => {
  const query = q.value.toLowerCase().trim().split(/\s/g)
  const sortedArticles = allArticles.value
    .filter((article) => {
      const title = article.title.toLowerCase()
      if (author.value && article.user != author.value) {
        return false
      }
      if (!query.every((term) => title.includes(term.toLowerCase()))) {
        return false
      }
      if (!tags.value.every((tag) => article.tags.includes(tag))) {
        return false
      }
      return true
    })
    .sort(sortFunction[sortBy.value])
  return sortDirection.value == 'ascending' ? sortedArticles : sortedArticles.reverse()
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

function changePage(newPage: number) {
  updateQuery({ p: newPage.toString() })
}

function search(key: string, value: string) {
  updateQuery({ q: input.value, [key]: value, p: '1' })
}

function updateQuery(params: Record<string, string>) {
  router.replace({ query: { ...route.query, ...params } })
}

async function setupData() {
  // Reset variables
  input.value = ''
  allArticles.value = []
  p.value = 1
  q.value = ''
  tags.value = []
  author.value = ''
  sortDirection.value = 'ascending'
  sortBy.value = 'recently updated'
  filterDialogVisible.value = false
  selectedTab.value = 'all articles'
  loading.value = true

  const params = new URLSearchParams(document.location.search)
  const query = params.get('q')
  if (query != null) {
    input.value = query
    q.value = query
  }
  const page = params.get('p')
  if (page != null && /^\d+$/.test(page)) {
    p.value = Number(page)
  }
  const sortParam = params.get('sort')
  if (
    sortParam != null &&
    ['recently updated', 'recently published', 'name', 'likes'].includes(sortParam.toLowerCase())
  ) {
    sortBy.value = sortParam.toLowerCase()
  }
  const directionParam = params.get('direction')
  if (
    directionParam != null &&
    (directionParam.toLowerCase() == 'ascending' || directionParam.toLowerCase() == 'descending')
  ) {
    sortDirection.value = directionParam.toLowerCase()
  }
  const tabParam = params.get('tab')
  if (tabParam != null && tabs.value.includes(tabParam.toLowerCase())) {
    selectedTab.value = tabParam.toLowerCase()
  }
  const tagsParam = params.get('tags')
  if (tagsParam != null) {
    for (let tag of tagsParam.split(',')) {
      if (TAGS.includes(tag.toLowerCase())) {
        tags.value.push(tag.toLowerCase())
      }
    }
  }
  const authorParam = params.get('author')
  if (authorParam != null) {
    author.value = authorParam
  }

  let data: ArticleData[] = []
  let error = null
  if (selectedTab.value == 'your articles') {
    if (userData.value != null) {
      let result = await supabase.rpc('get_articles_with_like_counts').eq('user', userData.value.id)
      data = result.data as ArticleData[]
      error = result.error
    }
  } else if(selectedTab.value == 'liked articles') {
    let result = await supabase.rpc('get_articles_with_like_counts').eq('access', 'public')
    data = (result.data as ArticleData[]).filter((article)=>userLikes.value.includes(article.id))
    error = result.error
  } else {
    let result = await supabase.rpc('get_articles_with_like_counts').eq('access', 'public')
    data = result.data as ArticleData[]
    error = result.error
  }
  if (!error) {
    allArticles.value = data
  } else {
    return setSupabaseError(error)
  }
  loading.value = false
}
</script>

<template>
  <div class="page">
    <h1 class="title">Search <span class="primary">Articles</span></h1>
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
        <div class="filter-buttons-container">
          <Button size="small" label="More Filters" @click="filterDialogVisible = true"
            ><template #icon> <ListFilter></ListFilter> </template
          ></Button>
          <Button size="small" label="Sort" aria-controls="order_menu" @click="openSortMenu"
            ><template #icon> <ArrowDownWideNarrow></ArrowDownWideNarrow> </template
          ></Button>
          <RouterLink to="/search/article"
            ><Button label="Reset" size="small" variant="outlined"
              ><template #icon> <X></X> </template></Button
          ></RouterLink>
        </div>
        <Menu ref="sortMenu" id="order_menu" :model="sortOptions" :popup="true">
          <template #item="{ item, props }">
            <label
              style="padding: 2px"
              v-if="item.category == 'sortBy'"
              @click="search('sort', item.label as string)"
            >
              <RadioButton v-model="sortBy" :value="item.label" />
              {{ item.label }}
            </label>
            <label v-else style="padding: 2px">
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
    v-model="filterDialogVisible"
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

.filter-container,
.filter-buttons-container {
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
.flex-row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
@media (max-width: 960px) {
  .filter-container,
  .searchOptions {
    flex-direction: column;
    align-items: start;
    width: min-content;
    margin: auto;
    gap:20px;
  }
}
</style>
