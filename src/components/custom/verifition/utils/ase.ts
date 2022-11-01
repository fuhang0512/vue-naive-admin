/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-28 17:27:35
 * @LastEditTime: 2022-10-31 18:40:31
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\src\components\custom\verifition\utils\ase.ts
 */
import CryptoJS from 'crypto-js'
/**
 * @word 要加密的内容
 * @keyWord String  服务器随机返回的关键字
 *  */
export function aesEncrypt(word: string, keyWord = 'XwKsGlMcdPMEhR1B') {
  var key = CryptoJS.enc.Utf8.parse(keyWord)
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}
