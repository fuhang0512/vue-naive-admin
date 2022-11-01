/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:27:35
 * @LastEditTime: 2022-11-01 11:50:48
 * @LastEditors: 
 * @FilePath: \vue-naive-admin\src\api\index.ts
 */
import { request } from '@/utils'

export default {
  getUser: () => request.get('/admin/user/info'),
  refreshToken: () => request.post('/auth/refreshToken'),
}
