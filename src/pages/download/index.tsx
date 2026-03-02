import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect } from 'react'

export default function DownloadPage() {
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '下载源码' })
  }, [])

  const handleDownload = () => {
    // 读取文件并触发下载
    Taro.request({
      url: '/api/download/code',
      method: 'GET',
      responseType: 'arraybuffer',
      success: (res) => {
        const blob = new Blob([res.data as ArrayBuffer], { type: 'application/gzip' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'CSMarketNotify.tar.gz'
        a.click()
        URL.revokeObjectURL(url)
      },
      fail: (err) => {
        Taro.showToast({ title: '下载失败', icon: 'none' })
        console.error(err)
      }
    })
  }

  return (
    <View className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <View className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full">
        <Text className="block text-2xl font-bold text-center text-gray-800 mb-4">
          📦 CS 价格监控小程序
        </Text>

        <View className="space-y-4 mb-6">
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
            <Text className="block text-gray-600">设计规范</Text>
          </View>
        </View>

        <View className="bg-blue-50 rounded-lg p-4 mb-6">
          <Text className="block text-sm text-gray-600 text-center">
            文件大小：260KB
          </Text>
          <Text className="block text-sm text-gray-600 text-center mt-2">
            格式：tar.gz 压缩包
          </Text>
        </View>

        <Button
          onClick={handleDownload}
          className="w-full bg-blue-500 text-white rounded-lg py-3 text-base"
        >
          点击下载源码
        </Button>

        <View className="mt-6 text-center">
          <Text className="block text-xs text-gray-500">
            解压后运行 pnpm install && pnpm dev
          </Text>
        </View>
      </View>
    </View>
  )
}
