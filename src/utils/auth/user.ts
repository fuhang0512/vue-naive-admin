/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-11-01 14:12:45
 * @LastEditTime: 2022-11-01 14:15:08
 * @LastEditors: 
 * @FilePath: \vue-naive-admin\src\utils\auth\user.ts
 */
import { getLocal, getLocalExpire, removeLocal, setLocal } from '@/utils'
import api from '@/api'

const USERINFO_CODE = 'user_info'
/** token过期时间：6小时 */
const DURATION = 6 * 60 * 60

export function getUserInfo() {
  return getLocal(USERINFO_CODE)
}

export function setUserInfo(userInfo: string) {
  setLocal(USERINFO_CODE, userInfo)
}

export function removeUserInfo() {
  removeLocal(USERINFO_CODE)
}
