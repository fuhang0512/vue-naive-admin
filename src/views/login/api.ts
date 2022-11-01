/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-27 16:27:35
 * @LastEditTime: 2022-11-01 17:14:15
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\src\views\login\api.ts
 */
import { request } from '@/utils'
import qs from 'qs'
import type { RequestConfig } from '~/types/axios'

export default {
  login: (data: any, params: any) => {
    return request.post('/auth/oauth/token', qs.stringify({ username: data.username, password: data.password }), {
      noNeedToken: true,
      headers: {
        'TENANT-ID': '1',
        Authorization: data.basicAuth,
      },
      params,
    } as RequestConfig)
  },
}
