import { supabase } from '../auth'
import { useGlobalStore } from '../globalStore'
const { profileData, notFoundPage, preLoading } = useGlobalStore
import router from '@/router'

export async function loadProfile(id: string | string[]) {
  preLoading.value = true
  const { data, error } = await supabase.from('Users').select().eq('id', id)
  if (!error) {
    Object.assign(useGlobalStore.profileData, data[0])
    document.title = profileData.username + ' ⋅ SpiritHaven'
  } else {
    notFoundPage.value = window.location.href
    preLoading.value = false
    router.push('/NotFound')
  }
  preLoading.value = false
}
