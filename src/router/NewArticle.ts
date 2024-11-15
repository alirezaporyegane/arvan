import type { RouteRecordRaw } from 'vue-router'
import translations from '@/services/translate/index'

export default {
  path: '/new-article',
  name: 'NewArticle',
  children: [
    {
      path: '',
      name: 'NewArticlePAge',
      meta: {
        title: translations.global.t('title.newArticle')
      },
      component: () => import('@/views/Article/CreateArticlePage.vue')
    }
  ]
} as RouteRecordRaw
