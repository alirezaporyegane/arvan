import type { RouteRecordRaw } from 'vue-router'
import translations from '@/services/translate/index'

export default {
  path: '/',
  name: 'Article',
  children: [
    {
      path: '',
      name: 'ArticlePage',
      meta: {
        title: translations.global.t('title.allArticles')
      },
      component: () => import('@/views/Article/ArticlePage.vue')
    },
    {
      path: 'article/edit/:slug',
      name: 'edit-article',
      meta: {
        title: translations.global.t('title.editArticle')
      },
      component: () => import('@/views/Article/EditArticlePage.vue')
    }
  ]
} as RouteRecordRaw
