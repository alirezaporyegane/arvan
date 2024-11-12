import type { RouteRecordRaw } from 'vue-router'
import translations from '@/services/translate/index'

export default {
  path: '/',
  name: 'Article',
  children: [
    {
      path: '',
      name: 'article',
      meta: {
        title: translations.global.t('title.allArticles')
      },
      component: () => import('@/views/Article/ArticlePage.vue')
    },
    {
      path: 'create',
      name: 'create',
      meta: {
        title: translations.global.t('title.newArticle')
      },
      component: () => import('@/views/Article/CreateArticlePage.vue')
    },
    {
      path: 'edit/:id',
      name: 'edit-article',
      meta: {
        title: translations.global.t('title.editArticle')
      },
      component: () => import('@/views/Article/EditArticlePage.vue')
    }
  ]
} as RouteRecordRaw
