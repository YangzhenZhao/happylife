const date2str = (val: Date) => {
  const year = val.getFullYear()
  const month = (val.getMonth() + 1).toString().padStart(2, '0')
  const day = val.getDate().toString().padStart(2, '0')
  return `${year}${month}${day}`
}

export default date2str
