/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:27:35
 * @LastEditTime: 2022-11-01 14:50:15
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\src\store\modules\user\index.ts
 */
import { defineStore } from 'pinia'
import { removeToken, toLogin } from '@/utils'
import { usePermissionStore, useTabStore } from '@/store'
import { resetRouter } from '@/router'
import api from '@/api'

interface UserInfo {
  id?: string
  name?: string
  avatar?: string
  role?: Array<string>
}

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: <UserInfo> {},
    }
  },
  getters: {
    userId(): string {
      return this.userInfo.id || ''
    },
    name(): string {
      return this.userInfo.name || ''
    },
    avatar(): string {
      return this.userInfo.avatar || ''
    },
    role(): Array<string> {
      return this.userInfo.role || []
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const res: any = await api.getUser()
        if (res.code === 0) {
          // const { id, name, avatar, role } = res.data?.sysUser
          console.log(res.data);
          
          // this.userInfo = { id, name, avatar, role }
          this.userInfo = res.data?.sysUser
          return Promise.resolve(res.data)
        }
        else {
          return Promise.reject(res)
        }
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
    async logout() {
      const { resetTabs } = useTabStore()
      const { resetPermission } = usePermissionStore()
      removeToken()
      resetPermission()
      resetTabs()
      resetRouter()
      this.$reset()
      toLogin()
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
