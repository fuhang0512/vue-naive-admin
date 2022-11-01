/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-27 16:27:35
 * @LastEditTime: 2022-10-31 19:06:40
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\src\utils\common\crypto.ts
 */
import CryptoJS from 'crypto-js'

const CryptoSecret = '5c32db7ffd41e1c8'

/**
 *加密处理
 */
export const encryptionLogin = (params: any) => {
  let { data, type, param, key } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach((ele: any) => {
      // result[ele] = Buffer.from(result[ele]).toString('Base64')
      result[ele] = window.btoa(result[ele])
    })
  } else {
    param.forEach((ele: any) => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding,
      })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

/**
 * 加密数据
 * @param data - 数据
 */
export function encryption(data: any) {
  const newData = JSON.stringify(data)
  return CryptoJS.AES.encrypt(newData, CryptoSecret).toString()
}

/**
 * 解密数据
 * @param cipherText - 密文
 */
export function decryption(cipherText: string) {
  const bytes = CryptoJS.AES.decrypt(cipherText, CryptoSecret)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  if (originalText) return JSON.parse(originalText)

  return null
}
