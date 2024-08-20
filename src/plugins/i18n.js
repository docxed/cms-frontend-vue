import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { en, th } from 'vuetify/locale'

const customMessage = {
  en: {
    ...messages.en,
    $vuetify: {
      ...en,
    },
  },
  th: {
    ...messages.th,
    $vuetify: {
      ...th,
    },
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: 'th',
  globalInjection: false,
  missingWarn: false,
  fallbackWarn: false,
  messages: customMessage,
})

export const install = (app) => {
  app.use(i18n)
}
