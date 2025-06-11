import { createClient, type User } from '@supabase/supabase-js'
import { ref } from 'vue'
import { setupThemeAndDisplay } from './themeDisplay'
import type { UserData } from './types'

export const user = ref<User | null>(null)
export const userData = ref<UserData | null>(null)
console.log(import.meta.env.VITE_API_URL)
export const supabase = createClient(
  import.meta.env.VITE_API_URL,
  import.meta.env.VITE_API_KEY,
)

export async function signInWithDiscord() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
  })
}

export async function setupUser() {
  const { data } = await supabase.auth.getUser()
  user.value = data.user
  if(user.value != null) {
    const { data, error } = await supabase.from('Users').select().eq('id', user.value.id)
    if(!error) {
        userData.value = data[0] as UserData
    }
  } 
  setupThemeAndDisplay();
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  user.value = null
  userData.value = null
  setupThemeAndDisplay()
  window.location.reload()
}
