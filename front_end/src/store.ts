import { createStore } from 'vuex'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
let userName = ''
if (localStorage.userName) {
  userName = localStorage.userName
}
const store = createStore({
  state: {
    userName: userName
  },
  mutations: {
    login (state, { userName, tokenData }) {
      localStorage.userName = userName
      localStorage.setItem(ACCESS_TOKEN, tokenData.access)
      localStorage.setItem(REFRESH_TOKEN, tokenData.refresh)
      state.userName = userName
    },
    logout (state) {
      localStorage.userName = ''
      localStorage.removeItem(ACCESS_TOKEN)
      localStorage.removeItem(REFRESH_TOKEN)
      state.userName = ''
    }
  },
  actions: {
  }
})

export default store
