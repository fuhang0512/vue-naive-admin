/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-27 16:27:35
 * @LastEditTime: 2022-11-01 17:30:55
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\src\utils\http\interceptors.ts
 */
import type { AxiosError, AxiosResponse } from 'axios'
import { AxiosRejectError, resolveResError } from './helpers'
import { getToken } from '~/src/utils/auth/token'
import type { RequestConfig } from '~/types/axios'

/** 请求拦截 */
export function reqResolve(config: RequestConfig) {
  // 处理不需要token的请求
  if (config.noNeedToken) return config

  const token = getToken()
  if (!token) return Promise.reject(new AxiosRejectError({ code: 401, msg: '登录已过期，请重新登录！' }))

  /**
   * * 加上 token
   * ! 认证方案: JWT Bearer
   */
  const Authorization = config.headers?.Authorization || `Bearer ${token}`
  if (config.headers) config.headers.Authorization = config.headers.Authorization || `Bearer ${token}`
  else config.headers = { Authorization }

  return config
}

/** 请求错误拦截 */
export function reqReject(error: AxiosError) {
  return Promise.reject(error)
}

/** 响应拦截 */
export function resResolve(response: AxiosResponse) {
  // TODO: 处理不同的 response.headers
  const { data, status, config, statusText } = response
  if (data?.code === 0 || !!(data?.access_token && data?.refresh_token) || !!data?.username) {
    return Promise.resolve(data)
  } else {
    const code = data?.code ?? status
    /** 根据code处理对应的操作，并返回处理后的message */
    let msg = resolveResError(code, data?.msg ?? statusText)
    const { noNeedTip } = config as RequestConfig
    !noNeedTip && window.$message?.error(msg)
    return Promise.reject(new AxiosRejectError({ code, msg, data: data || response }))
  }
}

/** 响应错误拦截 */
export function resReject(error: AxiosError) {
  console.log('err', error)
  if (!error || !error.response) {
    const code = error?.code
    /** 根据code处理对应的操作，并返回处理后的message */
    const msg = resolveResError(code, error.message)
    window.$message?.error(msg)
    return Promise.reject(new AxiosRejectError({ code, msg, data: error }))
  }
  const { data, status, config } = error.response
  let { code, msg } = data as AxiosRejectError
  code = code ?? status
  console.log(code)

  msg = msg ?? error.message
  if (status === 424) {
    resolveResError(401, msg)
  } else {
    msg = resolveResError(code, msg)
  }
  /** 需要错误提醒 */
  const { noNeedTip } = config as RequestConfig

  !noNeedTip && window.$message?.error(msg)
  return Promise.reject(new AxiosRejectError({ code, msg, data: error.response?.data || error.response }))
}
