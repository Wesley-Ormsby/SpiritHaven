import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { profileData, articleData, notFoundPage } from '@/scripts/globalStore'
import { supabase } from '@/scripts/auth'
import type { ArticleData, UserData } from '@/scripts/types'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from) => changeTitle()
    },
    {
      path: '/profile/:id',
      name: 'profile',
      beforeEnter: async (to, from) => {
        const { data, error } = await supabase.from('Users').select().eq('id', to.params.id)
        if (!error) {
          profileData.value = data[0] as UserData
          changeTitle(profileData.value.username + " ⋅ SpiritHaven")
        } else {
          router.push('/NotFound')
          notFoundPage.value = window.location.href
        }
      },
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/article/:id',
      name: 'article',
      beforeEnter: async (to, from) => {
        const { data, error } = await supabase.from('articles').select().eq('id', to.params.id)
        if (!error) {
          articleData.value = data[0] as ArticleData
          const searchResult = await supabase
            .from('Users')
            .select()
            .eq('id', articleData.value.user)
          if (!searchResult.error) {
            profileData.value = searchResult.data[0]
            changeTitle(articleData.value.title + " ⋅ SpiritHaven")
          } else {
            // Could not get user
            router.push('/NotFound')
            notFoundPage.value = window.location.href
          }
        } else {
          router.push('/NotFound')
          notFoundPage.value = window.location.href
        }
      },
      component: () => import('../views/ArticleView.vue'),
    },
    {
      path: '/search/article',
      name: 'searchArticle',
      component: () => import('../views/ArticleSearchView.vue'),
      beforeEnter: (to, from) => changeTitle("Article Search ⋅ SpiritHaven")
    },
    {
      path: '/search/user',
      name: 'searchUser',
      component: () => import('../views/UserSearchView.vue'),
      beforeEnter: (to, from) => changeTitle("User Search ⋅ SpiritHaven")
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
      beforeEnter: (to, from) => changeTitle("404 Page Not Found ⋅ SpiritHaven")
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

function changeTitle(title: string = "SpiritHaven") {
  document.title = title;
}


export default router
