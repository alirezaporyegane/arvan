/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
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
          'surface-on': '#373A3C',
          'surface-container-on': '#55595C',
          'surface-container-highest': '#818A91',
          'surface-container-low': '#DDDDDD',
          'warm-grey': '#777777'
        }
      }
    }
  }
})
