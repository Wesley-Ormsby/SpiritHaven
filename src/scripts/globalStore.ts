import { ref, reactive } from 'vue'
import type { UserData, ArticleData } from './types'

export const useGlobalStore = {
  profileData: reactive<UserData>({
    id: '',
    theme: 'a',
    display: 'light',
    spirit: 'wounded waters bleeding',
    username: '',
    description: '',
  }),
  userLikes: ref<string[]>([]),
  userData: ref<UserData | null>(null),
  articleData: reactive<ArticleData>({
    id: '',
    user: '',
    img: null,
    title: '',
    description: '',
    tags: [],
    content: '',
    access: 'private',
    published: '',
    updated: '',
    likes: 0
  }),
  allUsers: ref<UserData[]>([]),
  preLoading: ref(false),
}
