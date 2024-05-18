import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

createApp(App).use(createPinia().use(piniaPluginPersistedstate)).mount('#app')
