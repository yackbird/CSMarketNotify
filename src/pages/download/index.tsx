import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect } from 'react'

export default function DownloadPage() {
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '下载源码' })
  }, [])

  const handleDownload = () => {
    Taro.showToast({ title: '开始下载...', icon: 'loading' })

    // 直接打开下载链接
    const downloadUrl = '/api/download/code'

    // 方式 1: H5 端使用 window.open
    if (process.env.TARO_ENV === 'h5') {
      window.open(downloadUrl, '_blank')
      setTimeout(() => {
        Taro.showToast({ title: '下载已开始', icon: 'success' })
      }, 1000)
    }
    // 方式 2: 小程序端使用 downloadFile
    else if (process.env.TARO_ENV === 'weapp') {
      Taro.downloadFile({
        url: downloadUrl,
        success: (res) => {
          Taro.showToast({ title: '下载成功', icon: 'success' })
          Taro.openDocument({
            filePath: res.tempFilePath,
            showMenu: true
          })
        },
        fail: (err) => {
          console.error('下载失败:', err)
          Taro.showToast({ title: '下载失败', icon: 'none' })
        }
      })
    }
  }

  const handleDirectLink = () => {
    // 复制链接到剪贴板
    const fullUrl = 'https://db3da4c8-8fa1-495c-ace9-6439bb93d07d.dev.coze.site/api/download/code'

    Taro.setClipboardData({
      data: fullUrl,
      success: () => {
        Taro.showToast({ title: '链接已复制', icon: 'success' })
      }
    })
  }

  return (
    <View className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <View className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full">
        <Text className="block text-2xl font-bold text-center text-gray-800 mb-4">
          📦 CS 价格监控小程序
        </Text>

        <View className="space-y-3 mb-6">
          <View className="flex items-center">
            <Text className="block text-green-500 mr-2">✅</Text>
            <Text className="block text-gray-600">完整前后端源码</Text>
          </View>
          <View className="flex items-center">
            <Text className="block text-green-500 mr-2">✅</Text>
            <Text className="block text-gray-600">配置文件</Text>
          </View>
          <View className="flex items-center">
            <Text className="block text-green-500 mr-2">✅</Text>
            <Text className="block text-gray-600">README 文档</Text>
          </View>
          <View className="flex items-center">
            <Text className="block text-green-500 mr-2">✅</Text>
            <Text className="block text-gray-600">GitHub 推送脚本</Text>
          </View>
        </View>

        <View className="bg-blue-50 rounded-lg p-4 mb-6">
          <Text className="block text-sm text-gray-600 text-center">
            文件大小：261KB
          </Text>
          <Text className="block text-sm text-gray-600 text-center mt-2">
            格式：tar.gz 压缩包
          </Text>
        </View>

        <View className="space-y-3">
          <Button
            onClick={handleDownload}
            className="w-full bg-blue-500 text-white rounded-lg py-3"
          >
            点击下载源码
          </Button>

          <Button
            onClick={handleDirectLink}
            className="w-full bg-gray-100 text-gray-700 rounded-lg py-3"
          >
            复制下载链接
          </Button>
        </View>

        <View className="mt-6 text-center">
          <Text className="block text-xs text-gray-500">
            下载后运行：bash push-to-github.sh
          </Text>
        </View>
      </View>
    </View>
  )
}
