import { supabase } from '../auth'
import type { ArticleData } from '../types'
import { useGlobalStore } from '../globalStore'
const { articleData, preLoading } = useGlobalStore
import router from '@/router'

export async function loadArticle(id: string | string[]) {
  preLoading.value = true
  const { data, error } = await supabase.rpc('get_articles_with_like_counts').eq('id', id)
  if (!error) {
    Object.assign(useGlobalStore.articleData, data[0] as ArticleData)
    const searchResult = await supabase.from('Users').select().eq('id', articleData.user)
    if (!searchResult.error) {
      Object.assign(useGlobalStore.profileData, searchResult.data[0])
      document.title = articleData.title + ' ⋅ SpiritHaven'
    } else {
      // Could not get user
      pageNotFound()
    }
  } else {
    pageNotFound()
  }
  preLoading.value = false
}

function pageNotFound() {
  preLoading.value = false
  router.push('/NotFound')
}
