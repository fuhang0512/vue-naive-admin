/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:27:35
 * @LastEditTime: 2022-11-01 11:32:48
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\src\utils\http\helpers.ts
 */
import type { ErrorResolveResponse } from '~/types/axios'
import { useUserStore } from '@/store'

/** 自定义错误 */
export class AxiosRejectError extends Error {
  code?: number | string
  data?: any
  msg?: any
  constructor(rejectData: ErrorResolveResponse, options?: ErrorOptions) {
    const { code, msg, data } = rejectData
    super(msg, options)
    this.code = code
    this.data = data
  }
}
export function resolveResError(code: number | string | undefined, message = ''): string {
  switch (code) {
    case 400:
      message = message ?? '请求参数错误'
      break
    case 401:
      message = message ?? '登录已过期'
      useUserStore().logout()
      break
    case 403:
      message = message ?? '没有权限'
      break
    case 404:
      message = message ?? '资源或接口不存在'
      break
    case 500:
      message = message ?? '服务器异常'
      break
    default:
      message = message ?? `【${code}】: 未知异常!`
      break
  }
  return message
}

