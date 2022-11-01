/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-28 17:27:35
 * @LastEditTime: 2022-10-31 10:50:30
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\src\components\custom\verifition\utils\axios.ts
 */
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_API

const service = axios.create({
  timeout: 40000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8',
  },
})
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {}
)
export default service
