/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-28 17:27:35
 * @LastEditTime: 2022-10-31 10:52:36
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\src\components\custom\verifition\api\index.ts
 */
/**
 * 此处可直接引用自己项目封装好的 axios 配合后端联调
 */

import request from './../utils/axios' //组件内部封装的axios
// import request from "@/utils/http/index.ts"       //调用项目封装的axios
import type { RequestConfig } from '~/types/axios'
// import { request } from '@/utils'

//获取验证图片  以及token
export const reqGet = (data: object) => {
  return request({
    url: '/code',
    method: 'get',
    data,
  })
}

//滑动或者点选验证
export const reqCheck = (data: object) => {
  return request({
    url: '/code/check',
    method: 'post',
    params: data,
  })
}
