<!--
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:27:35
 * @LastEditTime: 2022-11-01 18:01:04
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\src\layout\header\components\UserAvatar.vue
-->
<script setup lang="ts">
import { useUserStore } from '@/store'
import { renderIcon } from '@/utils'
import api from '@/api/auth/oauth'

const userStore = useUserStore()

const options = [
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('mdi:exit-to-app', { size: 14 }),
  },
]

function handleSelect(key: string) {
  if (key === 'logout') {
    window.$dialog?.info({
      content: '确认退出？',
      title: '提示',
      positiveText: '确定',
      negativeText: '取消',
      async onPositiveClick() {
        console.log('退出登录')
        const res: any = await api.logout()
        console.log(res)
        if (res.code === 0) {
          userStore.logout()
          window.$message?.success('已退出登录!')
        } else {
          userStore.logout()
        }
      },
    })
  }
}
</script>

<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div flex items-center cursor-pointer>
      <img :src="userStore.avatar" mr10 w-35 h-35 rounded-full />
      <span hidden sm:block>{{ userStore.name }}</span>
    </div>
  </n-dropdown>
</template>
