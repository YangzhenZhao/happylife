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
      <div class="form-row">
        <div class="form-group col-md-3">
          <select id="province" class="form-control">
            <option v-for="(item, index) in province" :key="index">{{ item }}</option>
          </select>
        </div>
        <div class="form-group col-md-3">
          <select id="inputState" class="form-control">
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div class="form-group col-md-3">
          <select id="inputState" class="form-control">
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div class="form-group col-md-3">
          <select id="inputState" class="form-control">
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div>
      </div>
      <button
        type="submit" class="btn btn-primary"
        @click.prevent="signUp"
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
import province from '../hooks/province'
const BASE_URL = 'http://localhost:8000'
const tokenRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})
export default defineComponent({
  name: 'SignUp',
  setup () {
    const store = useStore()
    const router = useRouter()
    const userName = ref('')
    const password = ref('')
    const signUp = () => {
      const loginBody = {
        username: userName.value,
        password: password.value
      }
      tokenRequest.post('signup/', loginBody).then((response) => {
        console.log(response.data)
        router.push('/login')
      })
    }
    return {
      userName,
      password,
      signUp,
      province
    }
  }
})
</script>

<style scoped>
</style>
