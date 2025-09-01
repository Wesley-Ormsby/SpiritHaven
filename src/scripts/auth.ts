import { createClient, type User } from '@supabase/supabase-js'
import { ref } from 'vue'
import { setupThemeAndDisplay } from './themeDisplay'
import type { UserData } from './types'
import {useGlobalStore} from './globalStore'
import { setSupabaseError } from './supabaseErrors'
const { preLoading, userData,userLikes } = useGlobalStore
export const user = ref<User | null>(null)

export const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY)

export async function signInWithDiscord() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: import.meta.env.VITE_API_REDIRECT,
    },
  })
  if (error) {
    setSupabaseError(error)
  }
}

export async function setupUser() {
  preLoading.value = true
  setupThemeAndDisplay()
  const { data } = await supabase.auth.getUser()
  user.value = data.user
  if (user.value != null) {
    const { data: userRows, error } = await supabase.from('Users').select().eq('id', user.value.id)
    if (!error) {
      userData.value = userRows[0] as UserData
    } else {
      setSupabaseError(error)
    }
    // Load likes
    const { data:likedArticles, error: likedArticlesError } = await supabase.from('likes').select('article').eq('user', user.value.id)
    if(!likedArticlesError) {
      userLikes.value = likedArticles.map((articleObj=>articleObj.article))
    } else {
      setSupabaseError(likedArticlesError)
    }
  }
  setupThemeAndDisplay()
  preLoading.value = false
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) setSupabaseError(error)
  userLikes.value = []
  localStorage.setItem('signedOut', Date.now().toString())
  window.location.reload()
}

// Sign out listener to sign out of all tabs
window.addEventListener('storage', async (event) => {
  if (event.key === 'signedOut') {
    const { error } = await supabase.auth.signOut()
    if (error) setSupabaseError(error)
    window.location.reload()
  }
})