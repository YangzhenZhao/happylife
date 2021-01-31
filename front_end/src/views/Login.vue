<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">用户名</label>
        <input
          type="text" class="form-control"
          v-model="userName"
          placeholder="请输入用户名"
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">密码</label>
        <input
          type="password"
          v-model="password"
          class="form-control" placeholder="请输入密码"
        >
      </div>
      <button
        type="submit" class="btn btn-primary"
        @click.prevent="login"
      >
        提交
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import * as utils from '../hooks/utils'
const tokenRequest = axios.create({
  baseURL: utils.baseUrl(),
  timeout: 5000
})
export default defineComponent({
  name: 'Login',
  setup () {
    const store = useStore()
    const router = useRouter()
    const userName = ref('')
    const password = ref('')
    const login = () => {
      const loginBody = {
        username: userName.value,
        password: password.value
      }
      tokenRequest.post('api/token/', loginBody).then((response) => {
        console.log(response.data)
        router.push('/')
        store.commit('login', {
          userName: userName.value,
          tokenData: response.data
        })
      })
    }
    return {
      userName,
      password,
      login
    }
  }
})
</script>

<style scoped>
</style>
