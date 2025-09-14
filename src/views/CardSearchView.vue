<script setup lang="ts">
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { onBeforeMount, ref, computed, watch, useTemplateRef } from 'vue'
import Footer from '@/components/Footer.vue'
import { useRoute, useRouter } from 'vue-router'
import type { QueryResult } from '@/scripts/HavenDSL/types'
import { searchCards } from '@/scripts/HavenDSL/search'
import { CARD_ARTS } from '@/scripts/data'
import Message from 'primevue/message'
import LoadingCard from '@/components/LoadingCard.vue'
import ScrollTop from 'primevue/scrolltop'
import { cardSearchOrders, type CardSearchOrders, type Direction } from '@/scripts/types'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import RadioButton from 'primevue/radiobutton'
import { ArrowDownWideNarrow } from 'lucide-vue-next'
const route = useRoute()
const router = useRouter()

const query = ref('')
const sortBy = ref<CardSearchOrders>('Type')
const sortDirection = ref('Ascending')
const queryResult = ref<QueryResult | null>(null)

watch(() => route.fullPath, findCards)
onBeforeMount(findCards)

function findCards() {
  const qParam = route.query.q
  const sParam = route.query.s
  const oParam = route.query.o

  query.value = typeof qParam === 'string' ? qParam : ''
  sortBy.value =
    typeof sParam === 'string' && (cardSearchOrders as readonly string[]).includes(sParam)
      ? (sParam as CardSearchOrders)
      : 'Type'

  sortDirection.value = oParam === 'Descending' ? 'Descending' : 'Ascending'

  queryResult.value = search()
}

const loadingImages = ref<boolean[]>([])
const allNames = ref<string[]>([])
const allURLs = computed(() => {
  if (queryResult.value != null && queryResult.value.errors.length == 0) {
    loadingImages.value = Array(queryResult.value.query.length).fill(false)
    allNames.value = queryResult.value.query
    return queryResult.value.query.map((name) => {
      return CARD_ARTS[name]
    })
  }
  return []
})

function search() {
  let result = searchCards(query.value, false, sortBy.value)
  if (sortDirection.value == 'Descending') {
    result.query = result.query.reverse()
  }
  return result
}

function updateQuery(changes: { s?: CardSearchOrders; o?: Direction }) {
  router.push({
    path: '/search/cards',
    query: {
      q: query.value,
      s: changes.s || sortBy.value,
      o: changes.o || sortDirection.value,
    },
  })
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
</script>

<template>
  <ScrollTop :threshold="50" />
  <div class="page">
    <h1 class="title">Search <span class="primary">Cards</span></h1>
    <div class="text-input-container">
      <InputGroup>
        <InputGroupAddon>
          <Button aria-controls="order_menu" aria-haspopup="true" aria-label="Sort" @click="openSortMenu"
            ><template #icon> <ArrowDownWideNarrow></ArrowDownWideNarrow> </template
          ></Button>
          <Menu ref="sortMenu" id="order_menu" :model="sortOptions" :popup="true">
            <template #item="{ item, props }">
              <label
                style="padding: 2px"
                v-if="item.category == 'sortBy'"
                @click="updateQuery({ s: item.label as CardSearchOrders })"
                role="button"
              >
                <RadioButton v-model="sortBy" :value="item.label" />
                {{ item.label }}
              </label>
              <label v-else style="padding: 2px">
                <RadioButton
                  v-model="sortDirection"
                  :value="item.label"
                  @click="updateQuery({ o: item.label as Direction })"
                  role="button"
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
        <RouterLink to="/query-syntax" target="_blank" class="primary-link underline"
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
      <LoadingCard v-for="(url,i) in allURLs" :url="url" :alt="allNames[i]" />
    </div>
  </div>
  <Footer></Footer>
</template>

<style lang="css" scoped>
.page {
  min-height: calc(100vh - 60px);
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
label {
  display: flex;
  align-items: center;
  gap: 8px;
}
@media only screen and (max-width: 400px) {
  .body-container {
    width: 90vw;
  }
}
</style>
