import type { AuthError, PostgrestError } from '@supabase/supabase-js'
import {ref} from 'vue'

export const supabaseError = ref<AuthError|PostgrestError|null>()
export function setSupabaseError(error:AuthError|PostgrestError) {
    supabaseError.value = error
}