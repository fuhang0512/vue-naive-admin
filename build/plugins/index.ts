/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:24:11
 * @LastEditTime: 2022-10-27 16:25:07
 * @LastEditors: 
 * @FilePath: \vue-naive-admin\build\plugins\index.ts
 */
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

import unplugins from './unplugin'
import { setupHtmlPlugin } from './html'

export function setupVitePlugins(viteEnv: ViteEnv, isBuild: boolean): PluginOption[] {
  const plugins = [vue(), ...unplugins, unocss(), setupHtmlPlugin(viteEnv)]

  if (viteEnv.VITE_USE_COMPRESS) {
    plugins.push(
      viteCompression({ algorithm: viteEnv.VITE_COMPRESS_TYPE || 'gzip' }),
    )
  }

  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    )
  }

  return plugins
}
