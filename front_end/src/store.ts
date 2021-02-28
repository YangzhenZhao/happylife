import { createStore } from 'vuex'

let accessToken = 'accessToken'
let refreshToken = 'refreshToken'
let userName = ''
if (localStorage.userName) {
  userName = localStorage.userName
  accessToken = localStorage.accessToken
  refreshToken = localStorage.refreshToken
}
const store = createStore({
  state: {
    userName: userName,
    accessToken: accessToken,
    refreshToken: refreshToken
  },
  mutations: {
    login (state, { userName, tokenData }) {
      localStorage.userName = userName
      state.userName = userName
      localStorage.accessToken = tokenData.access
      state.accessToken = tokenData.access
      localStorage.refreshToken = tokenData.refresh
      state.refreshToken = tokenData.refresh
    },
    logout (state) {
      localStorage.userName = ''
      state.userName = ''
      localStorage.accessToken = ''
      state.accessToken = ''
      localStorage.refreshToken = ''
      state.refreshToken = ''
    }
  },
  actions: {
  }
})

export default store
