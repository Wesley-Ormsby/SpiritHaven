<script setup lang="ts">
import { supabase } from '@/scripts/auth'
import type { ArticleData } from '@/scripts/types'
import { computed, onMounted, ref } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'
import Button from 'primevue/button'
import Footer from '@/components/Footer.vue'
import { setSupabaseError } from '@/scripts/supabaseErrors'

const newArticles = computed(() => {
  return [...allArticles.value]
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, 12)
})
const updatedArticles = computed(() => {
  return [...allArticles.value]
    .filter(
      (article) =>
        Math.abs(new Date(article.published).getTime() - new Date(article.updated).getTime()) > 1,
    )
    .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
    .slice(0, 12)
})
const allArticles = ref<ArticleData[]>([])
onMounted(async () => {
  const { data, error } = await supabase.from('articles').select().eq('access', 'public')
  if (!error) {
    allArticles.value = data
  } else {
    setSupabaseError(error)
  }
})

const nullArray = Array(7).fill(null)
</script>

<template>
  <h1>Spirit<span class="primary-text">Haven</span></h1>
  <div class="subheading">Your sanctuary for Spirit Island tactics, tales, news, and more!</div>

  <h2>New Articles</h2>
  <div class="articles">
    <ArticleCard
      v-for="article in newArticles.length ? newArticles : nullArray"
      :article="article"
    />
  </div>
  <RouterLink class="router-link" to="/search/article?sort=recently+published"
    ><Button variant="outlined" class="centered-button">View More</Button></RouterLink
  >
  <h2>Recently Updated Articles</h2>
  <div class="articles">
    <ArticleCard
      v-for="article in updatedArticles.length ? updatedArticles : nullArray"
      :article="article"
    />
  </div>
  <RouterLink class="router-link" to="/search/article?sort=recently+updated"
    ><Button variant="outlined" class="centered-button">View More</Button></RouterLink
  >
  <Footer></Footer>
</template>

<style lang="css" scoped>
h1 {
  margin-top: 90px;
  margin-bottom: -10px;
  font-size: 80px;
  color: var(--p-surface-800);
  letter-spacing: 2px;
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
}
.subheading {
  color: var(--p-surface-700);
  font-weight: normal;
  margin: 0px;
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
}
h2 {
  text-align: center;
  font-size: 20px;
  color: var(--p-surface-700);
}
.primary-text {
  color: var(--p-primary-500);
}
.centered-button {
  margin: auto;
  display: block;
}

.articles {
  margin: 20px 30px;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 10px;
}
@media only screen and (max-width: 780px) {
  h1 {
    font-size: 60px;
  }
  h2 {
    font-size: 18px;
  }
  h3 {
    font-size: 16px;
  }
}
@media only screen and (max-width: 400px) {
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 16px;
  }
}
</style>
