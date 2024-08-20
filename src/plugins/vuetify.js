import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import { i18n } from './i18n'
import { useI18n } from 'vue-i18n'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {},
  locale: {
    adapter: createVueI18nAdapter({
      i18n,
      useI18n,
    }),
  },
})

export const install = (app) => {
  app.use(vuetify)
}
