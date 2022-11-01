/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:24:11
 * @LastEditTime: 2022-10-28 17:38:24
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\build\config\proxy.ts
 */
import type { ProxyOptions } from 'vite'
import { getProxyConfig } from '../../settings/proxy-config'

export function createViteProxy(isUseProxy = true, proxyType: ProxyType) {
  if (!isUseProxy)
    return undefined

  const proxyConfig = getProxyConfig(proxyType)
  console.log('proxyConfig', proxyConfig);
  
  const proxy: Record<string, string | ProxyOptions> = {
    [proxyConfig.prefix]: {
      target: proxyConfig.target,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${proxyConfig.prefix}`), ''),
    },
  }
  return proxy
}
