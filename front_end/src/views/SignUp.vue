<template>
  <div class="container">
    <form>
      <div class="form-group mt-3">
        <label for="inputUser">用户名</label>
        <input
          type="text" class="form-control"
          v-model="userName"
          placeholder="请输入用户名"
        >
      </div>
      <div class="form-group">
        <label for="inputPassword">密码</label>
        <input
          type="password"
          v-model="password"
          class="form-control" placeholder="请输入密码"
        >
      </div>
      <div class="form-group">
        <label for="inputPasswordRepeat">确认密码</label>
        <input
          type="password"
          v-model="passwordRepeat"
          class="form-control" placeholder="请再次输入密码"
        >
      </div>
      <label for="inputAddress">地址</label>
      <div class="form-row">
        <div class="col-md-4">
          <select v-model="firstLocationName" id="province" class="form-control">
            <option v-for="(id, name) in province" :key="id">{{ name }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <select v-model="secondLocationName" class="form-control">
            <option v-for="(id, name) in secondLocationRecord" :key="id">{{ name }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <select v-model="thirdLocationName" id="inputState" class="form-control">
            <option v-for="(id, name) in thirdLocationRecord" :key="id">{{ name }}</option>
          </select>
        </div>
      </div>
      <div class="form-group mt-3">
        <label for="inputEmail">邮箱</label>
        <input
          type="email"
          v-model="email"
          class="form-control" placeholder="请输入邮箱地址"
        >
      </div>
      <label for="inputAddress">性别</label>
      <div class="form-row ml-1">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" v-model="sex" value="male">
          <label class="form-check-label" for="inlineRadio1">男</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" v-model="sex" value="female">
          <label class="form-check-label" for="inlineRadio2">女</label>
        </div>
      </div>
      <label for="inputBirthDate" class="mt-2">出生日期</label>
      <div>
        <el-date-picker
          v-model="dateValue"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <button
        type="submit" class="btn btn-primary mt-3"
        @click.prevent="signUp"
      >
        提交
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, Ref, reactive, computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import province from '../hooks/province'
import getChildLocationObj from '../hooks/locationDeal'
import date2str from '../hooks/utils'
import BASE_URL from '../hooks/const'
const signUpRequest = axios.create({
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
    const passwordRepeat = ref('')
    const dateValue = ref(new Date())
    const email = ref('')
    const thirdLocationName = ref('')
    const firstLocationName = ref('')
    const secondLocationName = ref('')
    const sex = ref('')
    const secondLocationRecord: Ref<Record<string, string>> = ref({})
    const thirdLocationRecord: Ref<Record<string, string>> = ref({})
    watch(firstLocationName, async () => {
      const firstLocationId = province[firstLocationName.value]
      secondLocationRecord.value = await getChildLocationObj(firstLocationId)
      thirdLocationName.value = ''
    })
    watch(secondLocationName, async () => {
      const id = secondLocationRecord.value[secondLocationName.value]
      thirdLocationRecord.value = await getChildLocationObj(id)
      thirdLocationName.value = ''
    })
    const getHefengId = async (id: string) => {
      return await axios.get(`https://geoapi.qweather.com/v2/city/lookup?key=f2a966508ce8433da12c29af775858b3&location=${id}`)
    }
    const getThirdId = () => {
      return thirdLocationRecord.value[thirdLocationName.value]
    }
    const getSecondId = () => {
      return secondLocationRecord.value[secondLocationName.value]
    }
    const signUp = async () => {
      if (userName.value === '' || email.value === '' || thirdLocationName.value === '') {
        return
      }
      if (sex.value === '') {
        return
      }
      if (password.value === '' || password.value !== passwordRepeat.value) {
        return
      }
      const thirdId = getThirdId()
      const response = await getHefengId(thirdId)
      let hefengCityId = ''
      if (response.data.code === '404') {
        hefengCityId = (await getHefengId(getSecondId())).data.location[0].id
      } else {
        hefengCityId = response.data.location[0].id
      }
      const addr = `${firstLocationName.value}-${secondLocationName.value}-${thirdLocationName.value}`
      const body = {
        username: userName.value,
        password: password.value,
        email: email.value,
        addr,
        sex: sex.value,
        hefengCityId,
        dateOfBirth: date2str(dateValue.value)
      }
      const signUpResponse = await signUpRequest.post('users/signup/', body)
      console.log(signUpResponse)
      if (signUpResponse.data.status === '200') {
        router.push('/login')
      }
    }
    return {
      userName,
      password,
      email,
      signUp,
      province,
      firstLocationName,
      secondLocationRecord,
      secondLocationName,
      thirdLocationRecord,
      thirdLocationName,
      passwordRepeat,
      dateValue,
      sex
    }
  }
})
</script>

<style scoped>
</style>
