import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
// FormKit
import { plugin, defaultConfig } from '@formkit/vue'
// SignalR
import { signalRService } from './services/signalrService'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(plugin, defaultConfig)

signalRService
  .connect()
  .then(() => {
    app.mount('#app')
  })
  .catch((err) => {
    console.error('SignalR 啟動失敗，但 Vue 仍啟動', err)
    app.mount('#app')
  })
