<!--
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:27:35
 * @LastEditTime: 2022-11-01 17:49:00
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\src\layout\index.vue
-->

<template>
  <n-layout has-sider wh-full>
    <n-layout-sider
      v-if="!themeStore.isMobile"
      bordered
      collapse-mode="width"
      :collapsed-width="themeStore.sidebar.collapsedWidth"
      :width="themeStore.sidebar.width"
      :native-scrollbar="false"
      :collapsed="themeStore.sidebar.collapsed"
    >
      <SideBar />
    </n-layout-sider>
    <n-drawer
      v-else
      :width="themeStore.sidebar.width"
      :auto-focus="false"
      :show="!themeStore.sidebar.collapsed"
      placement="left"
      display-directive="show"
      @mask-click="themeStore.setCollapsed(true)"
    >
      <SideBar />
    </n-drawer>

    <article flex-1 flex-col overflow-hidden>
      <header
        bg-white
        px-15
        border-b
        bc-eee
        flex
        items-center
        dark="bg-dark border-0"
        :style="`height: ${themeStore.header.height}px`"
      >
        <AppHeader />
      </header>
      <section v-if="themeStore.tab.visible" border-b bc-eee dark:border-0 hidden sm:block>
        <AppTab />
      </section>
      <section flex-1 overflow-hidden bg="#f5f6fb" dark="bg-[#101014]">
        <AppMain />
      </section>
    </article>
  </n-layout>
</template>

<script setup lang="ts">
import SideBar from './sidebar/index.vue'
import AppHeader from './header/index.vue'
import AppTab from './tab/index.vue'
import AppMain from './AppMain.vue'
import { useThemeStore } from '@/store'
import api from '@/api/auth/oauth'
import { getToken } from '../utils'

const themeStore = useThemeStore()
const refreshTimer = ref()

refreshTimer.value = setInterval(async () => {
  console.log('1111111111111111111111111111111111111111111')
  const res = await api.checkToken({
    token: getToken(),
  })
  console.log(res)
}, 5000)

onUnmounted(() => {
  console.log('已经销毁了哈')
  clearInterval(refreshTimer.value)
})
</script>

<style lang="scss" scoped>
.app-container {
  margin: 10px;
  background-color: #fff;
}
</style>
