<template>
  <div>
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4 bg-info">
          <div class="card bg-info">
            <div id="he-plugin-standard"></div>
            <ul class="list-group list-group-flush">
              <li v-if="now" class="list-group-item">相对湿度: {{now.humidity}}%</li>
              <li v-if="air" class="list-group-item">空气质量: {{air.category}} {{air.aqi}}</li>
              <li v-if="now" class="list-group-item">{{now.windScale}}级 {{now.windDir}}</li>
              <li v-if="threeDay" class="list-group-item">日出: {{threeDay[0].sunrise}} 日落: {{threeDay[0].sunset}}</li>
            </ul>
            <div v-if="warningList && warningList.length > 0">
               <div class="card-header">
                天气灾害预警
              </div>
              <ul class="list-group list-group-flush">
                <li v-for="(item, index) in warningList" :key="index" class="list-group-item">{{item.sender}}: {{item.text}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card bg-info">
            <div class="card-header">
              生活指数
            </div>
            <ul class="list-group list-group-flush">
              <li v-for="item in dailyData" :key="item.type" class="list-group-item">{{item.name}}: {{item.text}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { defaulfAreaId, hefengKey, hefengAPIUrlPrefix } from '../hooks/const'
import * as utils from '../hooks/utils'
import * as weather from '../hooks/weather'
import rearrangeDailyData from '../hooks/weather'
declare global {
  interface Window {
    WIDGET: object;
  }
}
window.WIDGET = {
  CONFIG: {
    layout: 1,
    width: '430',
    height: '300',
    background: 1,
    dataColor: 'FFFFFF',
    language: 'zh',
    borderRadius: 2,
    city: defaulfAreaId,
    key: '7eb0041249df428d842a21fec4368eb1'
  }
}
const hefengidRequest = axios.create({
  baseURL: utils.baseUrl(),
  timeout: 5000
})
export default defineComponent({
  name: 'Weather',
  setup () {
    const areaCode = ref(defaulfAreaId)
    const store = useStore()
    const userName = computed(() => store.state.userName)
    const accessToken = computed(() => store.state.accessToken)
    const getHefengCityId = async () => {
      hefengidRequest.defaults.headers.Authorization = `Bearer ${accessToken.value}`
      try {
        const res = await hefengidRequest.get(`users/hefeng_city_id/${userName.value}`)
        areaCode.value = res.data
      } catch (err) {
        if (err.response.status === 401) {
          const refreshBody = { refresh: store.state.refreshToken }
          try {
            const res = await hefengidRequest.post('/api/token/refresh/', refreshBody)
            if (res.status === 200) {
              store.commit('refresh', res.data.access)
              const headerAuthorization = `Bearer ${res.data.access}`
              hefengidRequest.defaults.headers.Authorization = headerAuthorization
              const response = await hefengidRequest.get(`users/hefeng_city_id/${userName.value}`)
              areaCode.value = response.data
            }
          } catch (err) {
            if (err.response.status === 401) {
              store.commit('logout')
            }
          }
        }
      }
    }
    onMounted(async () => {
      (function (d) {
        const c = d.createElement('link')
        c.rel = 'stylesheet'
        c.href = 'https://apip.weatherdt.com/standard/static/css/weather-standard.css?v=2.0'
        const s = d.createElement('script')
        s.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0'
        const sn = d.getElementsByTagName('script')[0]
        if (sn && sn.parentNode) {
          sn.parentNode.insertBefore(c, sn)
          sn.parentNode.insertBefore(s, sn)
        }
      })(document)
      await getHefengCityId()
    })
    watch(userName, async () => {
      if (userName.value === '') {
        return
      }
      await getHefengCityId()
    })
    const warningList = ref()
    const dailyData = ref()
    const now = ref()
    const air = ref()
    const threeDay = ref()
    const updateWeatherShow = () => {
      axios.get(`${hefengAPIUrlPrefix}/indices/1d?key=${hefengKey}&location=${areaCode.value}&type=0`)
        .then(function (response: weather.LifeIndexResponse) {
          dailyData.value = rearrangeDailyData(response.data.daily)
        })
        .catch(function (error: object) {
          console.log(error)
        })
      axios.get(`${hefengAPIUrlPrefix}/weather/now?key=${hefengKey}&location=${areaCode.value}`)
        .then(function (response: weather.NowWeatherResponse) {
          now.value = response.data.now
        })
        .catch(function (error: object) {
          console.log(error)
        })
      axios.get(`${hefengAPIUrlPrefix}/air/now?key=${hefengKey}&location=${areaCode.value}`)
        .then(function (response: weather.NowWeatherResponse) {
          air.value = response.data.now
        })
        .catch(function (error: object) {
          console.log(error)
        })
      axios.get(`${hefengAPIUrlPrefix}/weather/3d?key=${hefengKey}&location=${areaCode.value}`)
        .then(function (response: weather.ThreeDayResponse) {
          threeDay.value = response.data.daily
        })
        .catch(function (error: object) {
          console.log(error)
        })
      axios.get(`${hefengAPIUrlPrefix}/warning/now?key=${hefengKey}&location=${areaCode.value}`)
        .then(function (response: weather.WarningResponse) {
          warningList.value = response.data.warning
        })
        .catch(function (error: object) {
          console.log(error)
        })
    }
    updateWeatherShow()
    watch(areaCode, () => {
      window.WIDGET = {
        CONFIG: {
          layout: 1,
          width: '430',
          height: '300',
          background: 1,
          dataColor: 'FFFFFF',
          language: 'zh',
          borderRadius: 2,
          city: areaCode.value,
          key: '7eb0041249df428d842a21fec4368eb1'
        }
      }
      updateWeatherShow()
    })
    return {
      dailyData,
      now,
      air,
      threeDay,
      warningList,
      userName,
      areaCode,
      accessToken,
      getHefengCityId
    }
  }
})
</script>

<style scoped>
</style>
