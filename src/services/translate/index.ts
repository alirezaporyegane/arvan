import { createI18n } from 'vue-i18n'
import { en as enVuetify } from 'vuetify/locale'
import en from './en'

const i18n = createI18n({
  locale: 'fa',
  fallbackLocale: 'en',
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  messages: {
    en: {
      ...en,
      $vuetify: {
        ...enVuetify
      }
    }
  }
})

export default i18n
