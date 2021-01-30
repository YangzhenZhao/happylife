let BASE_URL = 'http://localhost:8000'
if (process.env.FRONT_END_BASE_URL !== undefined) {
  BASE_URL = process.env.FRONT_END_BASE_URL
}
console.log(BASE_URL)

export default BASE_URL
