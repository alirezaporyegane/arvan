// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { useI18n } from 'vue-i18n'
import i18n from '@/services/translate'

export default createVuetify({
  defaults: {
    VBtn: { class: 'text-none' }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1C7CD5',
          success: '#5CB85C',
          info: '#56C0E0',
          warning: '#56C0E0',
          error: '#D9534F',
          'primary-on': '#DCEDF6',
          'success-on': '#E2EED8',
          silver: '#ECEEEF',
          'warning-on': '#FCF7E4',
          'error-on': '#EFDFDF',
          'charcoal-grey': '#373A3C',
          'surface-container-on': '#55595C',
          'surface-container-highest': '#818A91',
          'surface-container-low': '#DDD',
          'warm-grey': '#777777'
        }
      }
    }
  },
  locale: {
    locale: 'en',
    adapter: createVueI18nAdapter({ i18n, useI18n })
  }
})
