<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark" style="background-color: #ff2121;">
      <router-link class="navbar-brand" to="/">HappyLife</router-link>
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link
            v-for="(item, index) in navDataList"
            :key="index" class="nav-item nav-link"
            active-class="active" :to="item.toUrl">
            {{item.title}}
          </router-link>
        </div>
      </div>
      <ul class="list-inline mb-0">
        <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light">登录</router-link></li>
        <li class="list-inline-item"><a href="#" class="btn btn-outline-light">注册</a></li>
      </ul>
    </nav>
    <router-view></router-view>
    <footer class="text-center py-4 text-black-50 bg-light">
      <small>&copy; 2020 不要香菜</small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
const navDataList = [
  { title: '天气', toUrl: '/' },
  { title: '日历', toUrl: '/calendar' }
]
export default defineComponent({
  name: 'App',
  setup () {
    const navName = ref('weather')
    const onClickNav = (val: string) => {
      navName.value = val
      console.log('change to ', val)
    }
    return {
      onClickNav,
      navName,
      navDataList
    }
  }
})
</script>

<style>
</style>
