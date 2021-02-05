import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Weather from './components/Weather.vue'
import Calendar from './components/Calendar.vue'
import FindMore from './components/FindMore.vue'
import UnicodeToChinese from './views/UnicodeToChinese.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import NumToChinese from './views/NumToChinese.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Weather
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/find-more',
      name: 'find-more',
      component: FindMore
    },
    {
      path: '/unicode-to-chinese',
      name: 'unicode-to-chinese',
      component: UnicodeToChinese
    },
    {
      path: '/num-to-chinese',
      name: 'num-to-chinese',
      component: NumToChinese
    }
  ]
})
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
