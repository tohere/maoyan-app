export const setTime = () => {
  const date = new Date()
  const y = date.getFullYear()
  let m = date.getMonth()
  let d = date.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  return `${y}-${m}-${d}`
}
