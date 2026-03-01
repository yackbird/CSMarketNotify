import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useLoad, useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { Network } from '@/network'
import { TrendingUp, TrendingDown, Bell, RefreshCw } from 'lucide-react-taro'
import './index.css'

interface CsItem {
  id: string
  name: string
  name_en: string
  image_url: string
  category: string
  rarity: string
  price: number
  changePercent: number
}

const IndexPage = () => {
  const [items, setItems] = useState<CsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // 获取热门道具列表
  const fetchHotItems = async (showToast = false) => {
    try {
      if (showToast) {
        setLoading(true)
      }

      console.log('[API] 获取热门道具列表')
      const res = await Network.request({
        url: '/api/cs/hot-items'
      })

      console.log('[API Response] 热门道具列表:', res.data)

      if (res.data?.code === 200) {
        setItems(res.data.data || [])
        if (showToast) {
          Taro.showToast({ title: '刷新成功', icon: 'success' })
        }
      } else {
        Taro.showToast({ title: res.data?.msg || '获取数据失败', icon: 'none' })
      }
    } catch (error) {
      console.error('[API Error] 获取热门道具列表失败:', error)
      Taro.showToast({ title: '网络请求失败', icon: 'none' })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // 手动刷新
  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchHotItems(true)
  }

  // 格式化价格
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `¥${(price / 10000).toFixed(2)}万`
    }
    return `¥${price.toFixed(2)}`
  }

  useLoad(() => {
    fetchHotItems()
  })

  useDidShow(() => {
    // 页面显示时刷新数据
    fetchHotItems()
  })

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex items-center justify-between mb-3">
          <Text className="block text-xl font-bold text-gray-900">CS 道具价格监控</Text>
          <View
            className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg"
            onClick={handleRefresh}
          >
            <RefreshCw size={16} color="#2563eb" />
            <Text className="block text-sm font-medium text-blue-600">
              {refreshing ? '刷新中...' : '刷新'}
            </Text>
          </View>
        </View>
        <View className="flex items-center gap-3">
          <Text className="block text-sm text-gray-500">
            实时监控热门道具价格变化
          </Text>
          <View
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 rounded-lg"
            onClick={() => Taro.navigateTo({ url: '/pages/alerts/index' })}
          >
            <Bell size={14} color="#10b981" />
            <Text className="block text-xs font-medium text-emerald-600">
              预警设置
            </Text>
          </View>
        </View>
      </View>

      {/* 道具列表 */}
      {loading && items.length === 0 ? (
        <View className="flex items-center justify-center py-20">
          <Text className="block text-gray-500">加载中...</Text>
        </View>
      ) : items.length === 0 ? (
        <View className="flex flex-col items-center justify-center py-20">
          <Text className="block text-gray-400 text-6xl mb-4">📊</Text>
          <Text className="block text-lg text-gray-500 mb-2">暂无数据</Text>
          <Text className="block text-sm text-gray-400">点击刷新按钮获取最新数据</Text>
        </View>
      ) : (
        <ScrollView className="flex-1" scrollY>
          <View className="p-4">
            {items.map((item) => (
              <View
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-3"
              >
                <View className="flex items-center gap-3 mb-3">
                  <Image
                    src={item.image_url || ''}
                    className="w-16 h-16 rounded-lg"
                    mode="aspectFill"
                  />
                  <View style={{ flex: 1 }}>
                    <Text className="block text-lg font-semibold text-gray-900 mb-1">
                      {item.name}
                    </Text>
                    <View className="flex items-center gap-2">
                      <Text className="block text-xs text-gray-500">{item.category}</Text>
                      <Text className="block text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded">
                        {item.rarity}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="flex items-center justify-between">
                  <View>
                    <Text className="block text-2xl font-bold text-blue-600">
                      {formatPrice(item.price)}
                    </Text>
                  </View>
                  <View className="flex items-center gap-2">
                    {item.changePercent > 0 ? (
                      <View className="flex items-center gap-1">
                        <TrendingUp size={16} color="#10b981" />
                        <Text className="block text-sm font-medium text-emerald-500">
                          +{item.changePercent}%
                        </Text>
                      </View>
                    ) : item.changePercent < 0 ? (
                      <View className="flex items-center gap-1">
                        <TrendingDown size={16} color="#ef4444" />
                        <Text className="block text-sm font-medium text-red-500">
                          {item.changePercent}%
                        </Text>
                      </View>
                    ) : (
                      <Text className="block text-sm font-medium text-gray-500">
                        0%
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default IndexPage
