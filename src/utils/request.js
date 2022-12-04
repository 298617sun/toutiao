import axios from 'axios'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
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
