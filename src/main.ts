import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createRouter, createWebHashHistory} from 'vue-router'
import './style.css'
import App from './App.vue'
import ChooseGacha from "./pages/ChooseGacha.vue";
import Genshin from "./pages/Genshin.vue";
import StarRail from "./pages/StarRail.vue";
import WutheringWaves from "./pages/WutheringWaves.vue";
import ZenlessZoneZero from "./pages/ZenlessZoneZero.vue";

const routes = [
  { path: '/', component: ChooseGacha },
  { path: '/Genshin', component: Genshin },
  { path: '/StarRail', component: StarRail },
  { path: '/WutheringWaves', component: WutheringWaves },
  { path: '/ZenlessZoneZero', component: ZenlessZoneZero }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
