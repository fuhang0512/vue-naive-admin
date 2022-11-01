/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2022-10-27 16:22:31
 * @LastEditTime: 2022-10-28 17:47:55
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-naive-admin\settings\proxy-config.ts
 */
const proxyConfigMappings: Record<ProxyType, ProxyConfig> = {
  dev: {
    prefix: '/api',
    target: 'http://127.0.0.1:9999',
  },
  test: {
    prefix: '/api',
    target: 'http://localhost:8080',
  },
  prod: {
    prefix: '/api',
    target: 'http://localhost:8080',
  },
}

export function getProxyConfig(envType: ProxyType = 'dev'): ProxyConfig {
  return proxyConfigMappings[envType]
}
