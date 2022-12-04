import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
// 请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})
// 响应拦截器
request.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    Toast.fail(err.response.data.message)
    return new Promise(() => {})
  }
)
export default request
