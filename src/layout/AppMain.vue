<!--
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:27:35
 * @LastEditTime: 2022-11-01 15:45:45
 * @LastEditors: 
 * @FilePath: \vue-naive-admin\src\layout\AppMain.vue
-->
<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" v-if="appStore.reloadFlag" :key="route.path" />
  </router-view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
const appStore = useAppStore()
</script>
