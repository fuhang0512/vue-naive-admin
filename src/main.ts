/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:00:33
 * @LastEditTime: 2022-10-27 16:33:44
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\src\main.ts
 */
import '@/styles/reset.css'
import '@/styles/index.scss'
import 'uno.css'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'


async function setupApp() {
  const app = createApp(App)
  setupStore(app)
  await setupRouter(app)
  app.mount('#app')
}

setupApp()
