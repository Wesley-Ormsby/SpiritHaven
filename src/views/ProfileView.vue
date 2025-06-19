<script setup lang="ts">
import { supabase } from '@/scripts/auth'
import type { ArticleData, UserData } from '@/scripts/types'
import { notFoundPage, profileData, userData } from '@/scripts/globalStore'
import { watch, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '../router'
import Button from 'primevue/button'
import { SPIRITS } from '@/scripts/data'
import { UserRoundCog, Plus } from 'lucide-vue-next'
import ProfileSettingsDialog from '@/components/ProfileSettingsDialog.vue'
import ArticlePropertiesDialog from '@/components/ArticlePropertiesDialog.vue'
import ArticleCard from '@/components/ArticleCard.vue'

const route = useRoute()
watch(
  () => route.params.id,
  async (newId, oldId) => {
    const { data, error } = await supabase.from('Users').select().eq('id', newId)
    if (!error) {
      profileData.value = data[0] as UserData
    } else {
      router.push('/NotFound')
      notFoundPage.value = window.location.href
    }
    loadArticles()
  },
)
onMounted(loadArticles)

const profileSettingsVisable = ref(false)
const newArticleDialogVisible = ref(false)
const articles = ref<ArticleData[] | null>(null)
// Filter for unlisted
const filteredArticles  = computed(()=>{
  if(articles.value) {
    if(isMyPage.value) {
      return articles.value
    } else {
      return articles.value.filter((art)=>art.access != "unlisted")
    }
  } 
  return []
})

const isMyPage = computed(() => userData.value != null && userData.value.id == profileData.value.id)

async function loadArticles() {
  const { data, error } = await supabase.from('articles').select().eq('user', profileData.value.id)
  articles.value = data
}
</script>

<template>
  <div class="page-content">
  <div class="hero">
    <div class="username">{{ profileData.username }}</div>
    <div class="description">{{ profileData.description }}</div>
    <div class="hero-buttons" v-if="isMyPage">
      <Button @click="profileSettingsVisable = true" label="Profile Settings">
        <template #icon> <UserRoundCog></UserRoundCog> </template
      ></Button>
      <Button @click="newArticleDialogVisible = true" label="New Article"
        ><template #icon> <Plus></Plus> </template
      ></Button>
    </div>
    <div class="image-wrapper">
      <img :src="SPIRITS[profileData.spirit].img_large" class="hero-image" />
    </div>
  </div>
  <div class="articles">
    <ArticleCard
    v-if="articles && filteredArticles.length"
    v-for="article in filteredArticles"
    :article="article"
  />
  <div v-else-if="articles != null && filteredArticles.length == 0">
    <div class="empty-articles">
      <h2>{{isMyPage ? 'Get started!': 'No Articles'}}</h2>
      <Button v-if="isMyPage" @click="newArticleDialogVisible = true">Make an Article</Button></div>
  </div>
  <ArticleCard
    v-else
    v-for="_ in 7"
    :article="null"
  />
  </div>
</div>
  
  <ProfileSettingsDialog v-model="profileSettingsVisable"></ProfileSettingsDialog>
  <ArticlePropertiesDialog v-model="newArticleDialogVisible" :is-new-article="true"></ArticlePropertiesDialog>
</template>

<style scoped>
.page-content {
  min-height: calc(100vh - 600px);
}
.hero {
  margin-top:60px;
  display: flex;
  gap: 10px;
  padding: 20px 40px;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
  background-color: var(--p-primary-200);
  flex-direction: column;
}
.hero-image {
  opacity: 0.4;
  object-fit: cover;
  height: 100%;
}
.image-wrapper {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
}
.image-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, var(--p-primary-200), rgba(0, 0, 0, 0) 50%);
  pointer-events: none; /* lets mouse clicks pass through */
}
.my-app-dark .image-wrapper::after {
  background: linear-gradient(to right, var(--p-primary-950), rgba(0, 0, 0, 0) 50%);
}
.my-app-dark .hero {
  background-color: var(--p-primary-950);
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}
.description {
  color: var(--p-surface-700);
  font-size: 16px;
  z-index: 2;
  max-width: 800px;
  margin-bottom: 10px;
  overflow-wrap: break-word;
}
.username {
  font-size: 70px;
  color: var(--p-surface-900);
  font-weight: bold;
  width: fit-content;
  z-index: 2;
  text-overflow: ellipsis;
  overflow-x: hidden;
  max-width: 80vw;
}
.hero-buttons {
  display: flex;
  gap: 10px;
  z-index: 2;
}
.articles {
  margin:20px 30px;
  flex-direction: row;
  flex-wrap: wrap;
  display:flex;
  align-items:stretch;
  justify-content: center;
  gap:10px;
}

.empty-articles {
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height:200px;
}
@media only screen and (max-width: 1280px) {
  .hero-image {
    opacity: 0.2;
  }
}
@media only screen and (max-width: 880px) {
  .title {
    font-size: 40px;
    max-width: 400px;
  }
  .description {
    font-size: 13px;
    max-width: 400px;
  }
}
@media only screen and (max-width: 480px) {
  .username {
    font-size: 20px;
    max-width: 70vw;
  }
  .description {
    font-size: 11px;
    max-width: 70vw;
  }
  ::v-deep(.p-button-label) {
    font-size: 11px;
  }
  ::v-deep(.p-button) svg {
    width: 15px;
  }
  ::v-deep(.p-button) {
    padding: 3px 10px;
  }
}
</style>
