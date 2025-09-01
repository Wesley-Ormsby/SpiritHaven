import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { loadArticle } from '@/scripts/utils/loadArticle'
import { loadProfile } from '@/scripts/utils/loadProfile'
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
        await loadProfile(to.params.id)
      },
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/article/:id',
      name: 'article',
      beforeEnter: async (to, from) => {
        await loadArticle(to.params.id)
      },
      component: () => import('@/views/ArticleView.vue'),
    },
    {
      path: '/search/article',
      name: 'searchArticle',
      component: () => import('@/views/ArticleSearchView.vue'),
      beforeEnter: (to, from) => changeTitle("Article Search ⋅ SpiritHaven")
    },
    {
      path: '/search/cards',
      name: 'searchCards',
      component: () => import('@/views/CardSearchView.vue'),
      beforeEnter: (to, from) => changeTitle("Card Search ⋅ SpiritHaven")
    },
    {
      path: '/search/user',
      name: 'searchUser',
      component: () => import('@/views/UserSearchView.vue'),
      beforeEnter: (to, from) => changeTitle("User Search ⋅ SpiritHaven")
    },
    {
      path: '/query-syntax',
      name: 'querySyntax',
      component: () => import('@/views/QuerySyntax.vue'),
      beforeEnter: (to, from) => changeTitle("Query Syntax ⋅ SpiritHaven")
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      beforeEnter: (to, from) => changeTitle("404 Page Not Found ⋅ SpiritHaven")
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
})

function changeTitle(title: string = "SpiritHaven") {
  document.title = title;
}


export default router
