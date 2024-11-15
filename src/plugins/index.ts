/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'

// Translations
import translations from '@/services/translate'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// Types
import type { App } from 'vue'

// Style
import 'vue3-snackbar/styles'

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(translations)
    .use(Vue3Toastify, {
      autoClose: 3000,
      multiple: false
    } as ToastContainerOptions)
}
