<script setup lang="ts">
import type { ArticleData, UserData } from '@/scripts/types'
import Card from 'primevue/card'
import { onMounted, ref, computed, watch } from 'vue'
import { supabase } from '@/scripts/auth'
import Tag from './Tag.vue'
import Skeleton from 'primevue/skeleton'
import { setSupabaseError } from '@/scripts/supabaseErrors'
import Loader from './Loader.vue'
import UserAvatarLink from './UserAvatarLink.vue'
import Like from './Like.vue'

const { article } = defineProps<{ article: ArticleData | null }>()
const likes = ref(0)
const articleAuthorData = ref<UserData | null>()
const showAllTags = ref(false)
const moreTags = ref(false)
const articleTags = computed(() =>
  article ? (showAllTags.value ? article.tags : article.tags.slice(0, 3)) : [],
)
const src = computed(
  () =>
    article?.img ||
    'https://res.cloudinary.com/du1bjnkar/image/upload/v1756739709/300px-Spirit_Island_box_ib9kka.png',
)
const loadingHeaderImg = ref(true)

onMounted(updateOtherArticleData)
watch(() => article, updateOtherArticleData)

async function updateOtherArticleData() {
  if (article == null) {
    return
  }
  likes.value = article.likes
  const { data, error } = await supabase.from('Users').select().eq('id', article.user)
  if (!error) {
    articleAuthorData.value = data[0] as UserData
  } else {
    return setSupabaseError(error)
  }
  if (article.tags.length <= 3) {
    showAllTags.value = true
  } else {
    moreTags.value = true
  }
}

// RouterLink to article
const articleTo = computed(() => ({ name: 'article', params: { id: article?.id } }))

// Calculate the time the article was updated relative to now
const units = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'week', seconds: 604800 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  // Everything less than a minute is `now`
]
const calculateTimeDifference = (time: number) => {
  for (let { label, seconds } of units) {
    const interval = Math.floor(time / seconds)
    if (interval >= 1) {
      return {
        interval: interval,
        unit: label,
      }
    }
  }
  return {
    interval: 0,
    unit: '',
  }
}
const timeAgo = computed<string>(() => {
  if (article == null) {
    return ``
  }
  const time = Math.floor((new Date().valueOf() - new Date(article.updated).valueOf()) / 1000)
  const { interval, unit } = calculateTimeDifference(time)
  if (interval == 0) {
    return `Now`
  }
  const suffix = interval === 1 ? '' : 's'
  return `${interval} ${unit}${suffix} ago`
})
</script>

<template>
  <Card class="article-card" v-if="article && articleAuthorData">
    <template #header>
      <RouterLink :to="articleTo">
        <div class="img-container-loading" v-if="loadingHeaderImg">
          <Loader></Loader>
        </div>
        <div class="img-container" v-show="!loadingHeaderImg">
          <img alt="Article Image" :src class="article-card-img" @load="loadingHeaderImg = false" />
        </div>
      </RouterLink>
    </template>
    <template #title
      ><RouterLink class="router-link" :to="articleTo"
        ><span class="title">{{ article.title }}</span></RouterLink
      ></template
    >
    <template #content>
      <p v-if="article.description">
        {{ article.description }}
      </p>
      <div class="flex-row tag-container">
        <Tag v-for="tag in articleTags" :tag="tag" size="small"></Tag>
        <span class="more-tags" v-if="moreTags && !showAllTags" @click="showAllTags = true" role="button"
          >See More</span
        >
      </div>
      <div class="flex-row">
        <UserAvatarLink :profile="articleAuthorData"></UserAvatarLink>
        <span>|</span><span> {{ timeAgo }}</span>
      </div>
      <div class="flex-right">
        <Like v-model:likes="likes" :articleData="article"></Like>
      </div>
    </template>
    <template #footer> </template>
  </Card>
  <Skeleton v-else class="skelleton"> </Skeleton>
</template>

<style lang="css" scoped>
.article-card {
  width: 350px;
  min-height: 300px;
  overflow: hidden;
  border: 0.5px solid var(--p-primary-100);
}
.my-app-dark .article-card {
  border: 0.5px solid var(--p-primary-900);
}
.skelleton {
  width: 350px !important;
  height: 250px !important;
  border-radius: var(--p-card-border-radius);
}
.img-container {
  width: 100%;
  max-height: 150px;
  overflow: hidden;
  cursor: pointer;
}
.img-container-loading {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--p-surface-500);
}
.title {
  font-weight: 600;
  transition: color 0.2s;
  cursor: pointer;
  line-height: 1.4;
}
.title:hover {
  color: var(--p-primary-500);
}

.article-card-img {
  width: 100%;
  height: 100%;
}
p {
  word-wrap: break-word;
}
.flex-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0px;
  flex-wrap: wrap;
}
.tag-container {
  gap: 5px;
  flex-wrap: wrap;
}
.more-tags {
  cursor: pointer;
  font-size: 9px;
}
.more-tags:hover {
  filter: brightness(1.5);
}
.flex-right {
  display: flex;
  justify-content: right;
}

@media only screen and (max-width: 780px) {
  .article-card,
  .skelleton {
    width: 250px !important;
  }
  .img-container {
    width: 100%;
    max-height: 108px;
  }
  .title {
    font-size: 16px;
  }
  p {
    font-size: 12px;
  }
  .flex-row {
    font-size: 10px;
  }
}
</style>
