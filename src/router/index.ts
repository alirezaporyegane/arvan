import { createRouter, createWebHistory, RouteLocationNormalizedGeneric } from 'vue-router/auto'
import translations from '@/services/translate/index'
import authMiddleware from '@/middleware/AuthMIddleware'
import useAppConfig from '@/composables/useAppConfig'

// Views
import Article from './Article'

const router = createRouter({
  history: createWebHistory(useAppConfig().baseUrl),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [Article]
    },
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'Login',
          meta: {
            title: translations.global.t('title.login')
          },
          component: () => import('@/views/LoginPage.vue')
        },
        {
          path: 'register',
          name: 'Register',
          meta: {
            title: translations.global.t('title.register')
          },
          component: () => import('@/views/RegisterPage.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  authMiddleware(to, from, next)
  setPageTitle(to)
})

function setPageTitle(to: RouteLocationNormalizedGeneric) {
  const { title, description } = to.meta
  const titleParam = to.params.slug
  const defaultTitle = 'Arvan Challenge'

  if (title) document.title = `${title} - ${defaultTitle}`
  else if (titleParam) document.title = `${titleParam} - ${defaultTitle}`
  else document.title = defaultTitle

  const descriptionElement = document.querySelector('head meta[name="description"]')
  descriptionElement?.setAttribute('content', (description as string) || defaultTitle)
}

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
