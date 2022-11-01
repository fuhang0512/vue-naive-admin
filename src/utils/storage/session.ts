/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:27:35
 * @LastEditTime: 2022-10-31 18:49:31
 * @LastEditors: 
 * @FilePath: \vue-naive-admin\src\utils\storage\session.ts
 */
import { decryption, encryption } from '@/utils'

export function setSession(key: string, value: unknown) {
  const json = encryption(value)
  sessionStorage.setItem(key, json)
}

export function getSession<T>(key: string) {
  const json = sessionStorage.getItem(key)
  let data: T | null = null
  if (json) {
    try {
      data = decryption(json)
    }
    catch {}
  }
  return data
}

export function removeSession(key: string) {
  window.sessionStorage.removeItem(key)
}

export function clearSession() {
  window.sessionStorage.clear()
}
