export const date2str = (val: Date) => {
  const year = val.getFullYear()
  const month = (val.getMonth() + 1).toString().padStart(2, '0')
  const day = val.getDate().toString().padStart(2, '0')
  return `${year}${month}${day}`
}
export const baseUrl = () => {
  const currentURL = window.location.href
  if (currentURL.startsWith('http://127.0.0.1') || currentURL.startsWith('http://localhost')) {
    return 'http://127.0.0.1:8000'
  }
  return 'http://47.102.210.180:8000'
}
export const unicodeToChinese = (val: string) => {
  let res = val.replace(/\\/g, '%')
  // 转换中文
  res = unescape(res)
  // 将其他受影响的转换回原来
  res = res.replace(/%/g, '\\')
  // 对网址的链接进行处理
  res = res.replace(/\\/g, '')
  return res
}
