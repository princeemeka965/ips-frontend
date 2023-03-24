import { createApp } from 'vue'
import "@fontsource/montserrat"
import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/devices.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
