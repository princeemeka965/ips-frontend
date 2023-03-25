import { createApp } from 'vue'
import VueLazyLoad from 'vue3-lazyload'
import "@fontsource/montserrat"
import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/devices.css'

const app = createApp(App)

app.use(VueLazyLoad, {})

app.use(router)

app.mount('#app')
