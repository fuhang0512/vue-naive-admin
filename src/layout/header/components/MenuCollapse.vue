<!--
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:27:35
 * @LastEditTime: 2022-10-31 14:31:33
 * @LastEditors: 
 * @FilePath: \vue-naive-admin\src\layout\header\components\MenuCollapse.vue
-->
<script setup lang="ts">
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
</script>

<template>
  <n-icon size="20" cursor-pointer @click="themeStore.toggleCollapsed()">
    <icon-mdi:format-indent-increase v-if="themeStore.sidebar.collapsed" />
    <icon-mdi:format-indent-decrease v-else />
  </n-icon>
</template>
