import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.csmarket.app',
  appName: 'CS价格监控',
  webDir: 'dist-web',

  // 服务器配置
  server: {
    // 允许访问的 URL 域名（如果不设置，只能加载本地资源）
    // 后端服务地址
    androidScheme: 'https'
  },

  // 插件配置
  plugins: {
    // 状态栏插件
    StatusBar: {
      style: 'dark',
      backgroundColor: '#ffffff'
    },
    // 键盘插件
    Keyboard: {
      resize: 'ionic',
      style: 'dark',
      resizeOnFullScreen: true
    },
    // 触觉反馈插件
    Haptics: {
      impact: {
        style: 'HEAVY'
      }
    }
  }
};

export default config;
