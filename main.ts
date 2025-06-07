import { createApp } from 'vue'
import App from './App.vue'
import router from './src/router'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import 'primevue/resources/themes/saga-blue/theme.css' // atau tema lain
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import './assets/main.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(router)

app.mount('#app')
