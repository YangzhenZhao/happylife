import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Weather from './components/Weather.vue'
import Calendar from './components/Calendar.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import store from './store'

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
    }
  ]
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
