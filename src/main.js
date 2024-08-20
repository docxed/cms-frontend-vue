import '@/styles/main.css'
import 'unfonts.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const plugins = import.meta.glob('./plugins/*.js', { eager: true })
for (const path in plugins) {
  if (plugins[path].install) {
    plugins[path].install(app)
  }
}

app.use(router)

app.mount('#app')
