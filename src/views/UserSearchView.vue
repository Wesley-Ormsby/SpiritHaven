<script setup lang="ts">
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { Button } from 'primevue'
import { onBeforeMount, ref, computed, watch} from 'vue'
import { Search, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-vue-next'
import { supabase } from '@/scripts/auth'
import type { UserData } from '@/scripts/types'
import UserCard from '@/components/UserCard.vue'
import Footer from '@/components/Footer.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
watch(
  () => route.fullPath,
  async (newId, oldId) => {
    setupData()
  },
)

const input = ref('')
const allUsers = ref<UserData[]>([])
const p = ref(1)
const q = ref('')
const rowsPerPage = 20

// Should copute based on url param
const filteredUsers = computed(() => {
  const query = q.value.toLowerCase().trim().split(/\s/g)
  return allUsers.value.filter((user) => {
    let username = user.username.toLowerCase()
    for (var term of query) {
      if (!username.includes(term)) {
        return false
      }
    }
    return true
  })
})
const lowerbound = computed(() => (p.value - 1) * rowsPerPage)
const upperbound = computed(() =>
  Math.min(lowerbound.value + rowsPerPage, filteredUsers.value.length),
)
const pages = computed(() => Math.ceil(filteredUsers.value.length / rowsPerPage))
const pageUsers = computed(() => {
  return filteredUsers.value.slice(lowerbound.value, upperbound.value)
})

const pageError = computed(() => p.value < 1 || p.value > pages.value)

onBeforeMount(setupData)

async function setupData() {
  input.value = ""
  p.value = 1
  q.value = ''
  const { data, error } = await supabase.from('Users').select()
  if (!error) {
    allUsers.value = data
  }
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
}

function changePage(newPage: number) {
  var searchParams = new URLSearchParams(window.location.search)
  searchParams.set('p', String(Number(newPage)))
  window.location.search = searchParams.toString()
}
function search() {
  var searchParams = new URLSearchParams(window.location.search)
  searchParams.set('q', input.value)
  searchParams.set('p', "1")
  window.location.search = searchParams.toString()
}
</script>

<template>
  <div class="page">
    <h1>Search <span class="primary">Users</span></h1>
    <div class="text-input-container">
      <InputGroup>
        <InputText type="text" v-model="input" placeholder="Search for an user" @keypress.enter="search"/>
        <InputGroupAddon>
          <Button @click="search"><Search></Search></Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
    <div class="user-container">
      <!-- REMEMBER SKELLETONS -->
      <UserCard v-if="allUsers.length == 0" v-for="_ in rowsPerPage" :data="null"></UserCard>
       <h2 v-else-if="filteredUsers.length<1">No Results Found for Query "<span class="primary">{{ q }}</span>"</h2>
       <div v-else-if="pageError" class="centered-column">
        <h2>Page {{p}} is out of the page range</h2>
        <Button @click="changePage(1)">Go to page 1</Button>
       </div>
      <UserCard v-else-if="allUsers.length" v-for="user in pageUsers" :data="user"></UserCard>
    </div>
    <div class="paginator" v-if="filteredUsers.length>0 && !pageError">
      <Button rounded @click="changePage(1)" :disabled="p == 1">
        <template #icon> <ChevronsLeft /> </template
      ></Button>
      <Button rounded @click="changePage(p - 1)" :disabled="p == 1">
        <template #icon> <ChevronLeft /> </template
      ></Button>
      <div>Showing {{ lowerbound + 1 }} to {{ upperbound }} of {{ filteredUsers.length }}</div>
      <Button rounded @click="changePage(p + 1)" :disabled="p == pages">
        <template #icon> <ChevronRight /> </template
      ></Button>
      <Button rounded @click="changePage(pages)" :disabled="p == pages">
        <template #icon> <ChevronsRight /> </template
      ></Button>
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
}
.primary {
  color: var(--p-primary-500);
}
.text-input-container {
  max-width: 500px;
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
}
.user-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 1200px;
  width: 80vw;
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
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.primary {
  color:var(--p-primary-500)
}
</style>
