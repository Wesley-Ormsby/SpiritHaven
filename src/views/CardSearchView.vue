<script setup lang="ts">
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { onBeforeMount, ref, computed, watch, useTemplateRef } from 'vue'
import Footer from '@/components/Footer.vue'
import { useRoute } from 'vue-router'
import type { QueryResult } from '@/scripts/HavenDSL/types'
import { searchCards } from '@/scripts/HavenDSL/search'
import { CARD_ARTS } from '@/scripts/data'
import Message from 'primevue/message'
import LoadingCard from '@/components/LoadingCard.vue'
import ScrollTop from 'primevue/scrolltop'
import { cardSearchOrders, type CardSearchOrders } from '@/scripts/types'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import RadioButton from 'primevue/radiobutton'
import { ArrowDownWideNarrow } from 'lucide-vue-next'
const route = useRoute()
watch(
  () => route.fullPath,
  async (newId, oldId) => {
    findCards
  },
)

const query = ref('')
const sortBy = ref<CardSearchOrders>('Type')
const sortDirection = ref('Ascending')
const queryResult = ref<QueryResult | null>(null)

onBeforeMount(findCards)

async function findCards() {
  query.value = ''
  let params = new URLSearchParams(document.location.search)
  let queryPram = params.get('q')
  if (queryPram != null) {
    query.value = queryPram
  }
  let sortParam = params.get('s')
  if (sortParam != null && (cardSearchOrders as readonly string[]).includes(sortParam)) {
    sortBy.value = sortParam as CardSearchOrders
  }
  let orderParam = params.get('o')
  if (orderParam != null && orderParam == "Descending") {
    sortDirection.value = orderParam
  }
  queryResult.value = search()
}

const loadingImages = ref<boolean[]>([])
const allURLs = computed(() => {
  if (queryResult.value != null && queryResult.value.errors.length == 0) {
    loadingImages.value = Array(queryResult.value.query.length).fill(false)
    return queryResult.value.query.map((name) => {
      return CARD_ARTS[name]
    })
  }
  return []
})

function updateQuery() {
  window.history.pushState(
    {},
    `Query: ${query.value}`,
    `/search/cards?q=${encodeURIComponent(query.value)}`,
  )
  queryResult.value = search()
}
function search() {
  let result = searchCards(query.value,false,sortBy.value)
  if(sortDirection.value == "Descending") {
    result.query = result.query.reverse()
  }
  return result
}

// Sorting
const menu = useTemplateRef('sortMenu')
const sortOptions = ref([
  {
    label: 'Sort By',
    items: [
      {
        label: 'Type',
        category: 'sortBy',
      },
      {
        label: 'Name',
        category: 'sortBy',
      },
      {
        label: 'Cost',
        category: 'sortBy',
      },
      {
        label: 'Speed',
        category: 'sortBy',
      },
      {
        label: 'Range',
        category: 'sortBy',
      },
      {
        label: 'Artist',
        category: 'sortBy',
      },
    ],
  },
  {
    label: 'Sort Direction',
    items: [
      {
        label: 'Ascending',
        category: 'sortDirection',
      },
      {
        label: 'Descending',
        category: 'sortDirection',
      },
    ],
  },
])
const openSortMenu = (event: Event) => {
  menu?.value?.toggle(event)
}

function changeSortDirection(order:string) {
  var searchParams = new URLSearchParams(window.location.search)
  searchParams.set("o", order)
  window.location.search = searchParams.toString()
}
function changeSort(sort: CardSearchOrders) {
  var searchParams = new URLSearchParams(window.location.search)
  searchParams.set("s", sort)
  window.location.search = searchParams.toString()
}
</script>

<template>
  <ScrollTop :threshold="50" />
  <div class="page">
    <h1>Search <span class="primary">Cards</span></h1>
    <div class="text-input-container">
      <InputGroup>
        <InputGroupAddon>
          <Button aria-controls="order_menu" @click="openSortMenu"
            ><template #icon> <ArrowDownWideNarrow></ArrowDownWideNarrow> </template
          ></Button>
          <Menu ref="sortMenu" id="order_menu" :model="sortOptions" :popup="true">
            <template #item="{ item, props }">
              <label
                style="padding: 2px"
                v-if="item.category == 'sortBy'"
                @click="changeSort(item.label as CardSearchOrders)"
              >
                <RadioButton v-model="sortBy" :value="item.label" />
                {{ item.label }}
              </label>
              <label v-else style="padding: 2px">
                <RadioButton
                  v-model="sortDirection"
                  :value="item.label"
                  @click="changeSortDirection(item.label as string)"
                />
                {{ item.label }}
              </label>
            </template></Menu
          >
        </InputGroupAddon>
        <InputText
          type="text"
          v-model="query"
          placeholder="Enter a query..."
          @keyup="updateQuery"
        />
        <InputGroupAddon>
          <span class="primary">{{ allURLs.length }} cards</span>
        </InputGroupAddon>
      </InputGroup>
      <span class="reminder"
        >The search uses query syntax.
        <RouterLink to="/query-syntax" target="_blank" class="primary-link"
          >View the guide</RouterLink
        >.</span
      >
      <Message severity="error" v-if="queryResult" v-for="error in queryResult.errors">{{
        error
      }}</Message>
      <Message
        severity="warn"
        v-if="queryResult && queryResult.errors.length == 0 && queryResult.query.length == 0"
        >No cards found for query</Message
      >
    </div>
    <div class="body-container">
      <LoadingCard v-for="url in allURLs" :url="url" />
    </div>
  </div>
  <Footer></Footer>
</template>

<style lang="css" scoped>
.page {
  min-height: calc(100vh - 60px);
}
h1 {
  color: var(--p-surface-900);
  margin-top: 70px;
  text-align: center;
  font-size: 60px;
  margin-bottom: 30px;
}
.primary {
  color: var(--p-primary-500);
}
.text-input-container {
  max-width: 500px;
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  gap: 10px;
  display: flex;
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
.reminder {
  font-size: small;
  color: var(--p-surface-600);
}
label {
  display:flex;
  align-items: center;
  gap:8px;
}
</style>
