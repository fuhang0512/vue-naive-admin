/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-11-01 15:58:08
 * @LastEditTime: 2022-11-01 17:56:37
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\src\api\auth\oauth.ts
 */
import { getSession, request } from '@/utils'

export default {
  // 校验token是否过期
  checkToken: (data: any) => {
    return request.get('/auth/oauth/check_token', {
      headers: {
        Authorization: getSession('basicAuth'),
      },
      params: data,
    })
  },

  // 退出登录
  logout: () => {
    return request.delete('/auth/token/logout')
  },
}
