import { jsonp } from 'vue-jsonp'
import { ref, onMounted, onUnmounted, Ref } from 'vue'

const QQ_KEY = 'OZYBZ-5U56I-VK2GC-5WUD6-C7KN5-YDF5H'

const getChildLocationObj = async (firstLocationId: string) => {
  const resRecord: Record<string, string> = {}
  const response = await jsonp('http://apis.map.qq.com/ws/district/v1/getchildren', {
    output: 'jsonp',
    key: QQ_KEY,
    id: firstLocationId
  })
  const resArray = response.result[0]
  for (let i = 0; i < resArray.length; i++) {
    const item = resArray[i]
    resRecord[item.fullname] = item.id
  }
  return resRecord
}

export default getChildLocationObj
