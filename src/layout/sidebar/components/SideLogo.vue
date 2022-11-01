<!--
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:27:35
 * @LastEditTime: 2022-10-31 14:31:50
 * @LastEditors: 
 * @FilePath: \vue-naive-admin\src\layout\sidebar\components\SideLogo.vue
-->
<script setup lang="ts">
import { useThemeStore } from '@/store'
const title = import.meta.env.VITE_APP_TITLE

const themeStore = useThemeStore()
</script>

<template>
  <router-link h-60 f-c-c to="/">
    <icon-custom-logo text-36 color-primary />
    <h2 v-show="!themeStore.sidebar.collapsed" ml-15 color-primary text-18 font-bold max-w-140 flex-shrink-0>
      {{ title }}
    </h2>
  </router-link>
</template>
