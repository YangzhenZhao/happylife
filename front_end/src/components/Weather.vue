<template>
  <div>
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4 bg-info">
          <div class="card bg-info">
            <div id="weather-v2-plugin-standard"></div>
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
declare global {
  interface Window {
    WIDGET: object;
  }
}
interface IndexItem {
  name: string;
  type: string;
  text: string;
}
interface LifeIndexResponse {
  data: {
    daily: IndexItem[];
  };
}
interface NowWeatherResponse {
  data: {
    now: {
      humidity: string;
      windScale: string;
      windDir: string;
    };
  };
}
interface AirResponse {
  data: {
    now: {
      category: string;
      aqi: string;
    };
  };
}
interface WarningItem {
  sender: string;
  text: string;
}
interface WarningResponse {
  data: {
    warning: WarningItem[];
  };
}
interface ThreeDayItem {
  sunrise: string;
  sunset: string;
}
interface ThreeDayResponse {
  data: {
    daily: ThreeDayItem[];
  };
}
// 110105013 团结湖
// 101010300 朝阳
// 141023 襄汾
// 141000 临汾
// 101100701 临汾
// 101100707 襄汾
// 迎泽区 101100108
// 101120504 蓬莱市
const defaulfAreaId = '101100108'
const hefengKey = 'f2a966508ce8433da12c29af775858b3'
const hefengAPIUrlPrefix = 'https://devapi.qweather.com/v7'
const BASE_URL = 'http://localhost:8000'
const hefengidRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})
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
    key: '2vgaxeXBaw'
  }
}
export default defineComponent({
  name: 'Weather',
  setup () {
    const areaCode = ref(defaulfAreaId)
    const store = useStore()
    const userName = computed(() => store.state.userName)
    onMounted(async () => {
      (function (d) {
        const c = d.createElement('link')
        c.rel = 'stylesheet'
        c.href = 'https://apip.weatherdt.com/standard/static/css/weather-standard.css?v=2.0'
        const s = d.createElement('script')
        s.src = 'https://apip.weatherdt.com/standard/static/js/weather-standard.js?v=2.0'
        const sn = d.getElementsByTagName('script')[0]
        if (sn && sn.parentNode) {
          sn.parentNode.insertBefore(c, sn)
          sn.parentNode.insertBefore(s, sn)
        }
      })(document)
      const res = await hefengidRequest.get(`users/hefeng_city_id/${userName.value}`)
      areaCode.value = res.data
    })
    watch(userName, async () => {
      if (userName.value === '') {
        return
      }
      const res = await hefengidRequest.get(`users/hefeng_city_id/${userName.value}`)
      areaCode.value = res.data
    })
    const warningList = ref()
    const dailyData = ref()
    const now = ref()
    const air = ref()
    const threeDay = ref()
    const updateWeatherShow = () => {
      axios.get(`${hefengAPIUrlPrefix}/indices/1d?key=${hefengKey}&location=${areaCode.value}&type=0`)
        .then(function (response: LifeIndexResponse) {
          dailyData.value = response.data.daily
        })
        .catch(function (error: object) {
          console.log(error)
        })
      axios.get(`${hefengAPIUrlPrefix}/weather/now?key=${hefengKey}&location=${areaCode.value}`)
        .then(function (response: NowWeatherResponse) {
          now.value = response.data.now
        })
        .catch(function (error: object) {
          console.log(error)
        })
      axios.get(`${hefengAPIUrlPrefix}/air/now?key=${hefengKey}&location=${areaCode.value}`)
        .then(function (response: NowWeatherResponse) {
          air.value = response.data.now
        })
        .catch(function (error: object) {
          console.log(error)
        })
      axios.get(`${hefengAPIUrlPrefix}/weather/3d?key=${hefengKey}&location=${areaCode.value}`)
        .then(function (response: ThreeDayResponse) {
          threeDay.value = response.data.daily
        })
        .catch(function (error: object) {
          console.log(error)
        })
      axios.get(`${hefengAPIUrlPrefix}/warning/now?key=${hefengKey}&location=${areaCode.value}`)
        .then(function (response: WarningResponse) {
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
          key: '2vgaxeXBaw'
        }
      }
      console.log('watch', areaCode.value)
      updateWeatherShow()
    })
    return {
      dailyData,
      now,
      air,
      threeDay,
      warningList,
      userName,
      areaCode
    }
  }
})
</script>

<style scoped>
</style>
