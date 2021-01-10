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
      <ul class="list-inline mb-0" v-if="userName === ''">
        <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light">登录</router-link></li>
        <li class="list-inline-item"><router-link to="/signup" class="btn btn-outline-light">注册</router-link></li>
      </ul>
      <div v-else class="btn-group show mr-3">
        <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" @click.prevent="toggleOpen">
          {{userName}}
        </button>
        <div class="dropdown-menu" :style="{display: 'block'}" v-if="isDropDownOpen">
          <li class="dropdown-item">编辑资料</li>
          <li class="dropdown-item" @click.prevent="logOut">退出登录</li>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    <footer class="text-center py-4 text-black-50 bg-light">
      <small>&copy; 2020-2021 不要香菜</small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from 'vuex'
const navDataList = [
  { title: '天气', toUrl: '/' },
  { title: '日历', toUrl: '/calendar' }
]
export default defineComponent({
  name: 'App',
  setup () {
    const isDropDownOpen = ref(false)
    const store = useStore()
    const userName = computed(() => store.state.userName)
    const navName = ref('weather')
    const onClickNav = (val: string) => {
      navName.value = val
      console.log('change to ', val)
    }
    const logOut = () => {
      store.commit('logout')
    }
    const toggleOpen = () => {
      isDropDownOpen.value = !isDropDownOpen.value
    }
    return {
      onClickNav,
      navName,
      navDataList,
      userName,
      isDropDownOpen,
      toggleOpen,
      logOut
    }
  }
})
</script>

<style>
</style>
