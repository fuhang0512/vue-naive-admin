/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:24:03
 * @LastEditTime: 2022-11-01 11:10:30
 * @LastEditors: 
 * @FilePath: \vue-naive-admin\types\axios.d.ts
 */
import type { AxiosRequestConfig } from 'axios'

interface RequestConfig extends AxiosRequestConfig {
  /** 接口是否需要token */
  noNeedToken?: boolean
  /** 接口是否需要错误提醒 */
  noNeedTip?: boolean
}

interface ErrorResolveResponse {
  code?: number | string
  msg: string
  data?: any
}