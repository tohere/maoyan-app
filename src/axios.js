import axios from 'axios'

/**
 * 请求拦截
 */
axios.interceptors.request.use(req => {
  return req
}, err => {
  return Promise.reject(err)
})

/**
 * 响应拦截
 */
axios.interceptors.response.use(res => {
  return res
}, err => {
  return Promise.reject(err)
})

export default axios
