<!--
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:00:33
 * @LastEditTime: 2022-10-27 16:28:00
 * @LastEditors: 
 * @FilePath: \vue-naive-admin\src\App.vue
-->
<script setup lang="ts">
import AppProvider from '@/components/common/AppProvider.vue'
</script>

<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AppProvider>
</template>
