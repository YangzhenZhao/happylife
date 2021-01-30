let BASE_URL = 'http://47.102.210.180:8000'
const currentURL = window.location.href
if (currentURL.startsWith('http://127.0.0.1') || currentURL.startsWith('http://localhost')) {
  BASE_URL = 'http://127.0.0.1:8000'
}
export default BASE_URL
