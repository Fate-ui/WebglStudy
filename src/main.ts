import { createApp } from 'vue'
import '@/style/index.scss'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
import 'normalize.css'
//原子化css
import 'uno.css'
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
