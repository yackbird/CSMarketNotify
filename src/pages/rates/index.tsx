import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { Network } from '@/network'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react-taro'
import './index.css'

interface ExchangeRate {
  currency: string
  name: string
  rate: number
  changePercent: number
}

const ExchangeRatesPage = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // 获取汇率数据
  const fetchExchangeRates = async (showToast = false) => {
    try {
      if (showToast) {
        setLoading(true)
      }

      console.log('[API] 获取真实汇率数据')
      const res = await Network.request({
        url: '/api/cs/exchange-rates'
      })

      console.log('[API Response] 汇率数据:', res.data)

      if (res.data?.code === 200) {
        setRates(res.data.data || [])
        if (showToast) {
          Taro.showToast({ title: '刷新成功', icon: 'success' })
        }
      } else {
        Taro.showToast({ title: res.data?.msg || '获取数据失败', icon: 'none' })
      }
    } catch (error) {
      console.error('[API Error] 获取汇率数据失败:', error)
      Taro.showToast({ title: '网络请求失败', icon: 'none' })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // 手动刷新
  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchExchangeRates(true)
  }

  useLoad(() => {
    fetchExchangeRates()
  })

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex items-center justify-between mb-2">
          <Text className="block text-xl font-bold text-gray-900">实时汇率</Text>
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
        <View className="flex items-center gap-2">
          <Text className="block text-sm text-gray-500">
            基准货币：人民币 (CNY)
          </Text>
          <View className="px-2 py-1 bg-emerald-100 rounded-full">
            <Text className="block text-xs font-medium text-emerald-600">
              真实数据
            </Text>
          </View>
        </View>
      </View>

      {/* 汇率列表 */}
      {loading && rates.length === 0 ? (
        <View className="flex items-center justify-center py-20">
          <Text className="block text-gray-500">加载中...</Text>
        </View>
      ) : rates.length === 0 ? (
        <View className="flex flex-col items-center justify-center py-20">
          <Text className="block text-gray-400 text-6xl mb-4">💱</Text>
          <Text className="block text-lg text-gray-500 mb-2">暂无数据</Text>
          <Text className="block text-sm text-gray-400">点击刷新按钮获取最新汇率</Text>
        </View>
      ) : (
        <ScrollView className="flex-1" scrollY>
          <View className="p-4">
            <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <Text className="block text-sm text-blue-800 font-medium mb-1">
                📊 数据来源：ExchangeRate-API.com
              </Text>
              <Text className="block text-xs text-blue-600">
                本接口调用真实公共 API，演示外部数据获取能力
              </Text>
            </View>

            {rates.map((item, index) => (
              <View
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-3"
              >
                <View className="flex items-center justify-between">
                  <View>
                    <Text className="block text-lg font-semibold text-gray-900 mb-1">
                      {item.currency} - {item.name}
                    </Text>
                    <Text className="block text-2xl font-bold text-blue-600">
                      {item.rate.toFixed(4)}
                    </Text>
                  </View>
                  <View className="flex items-center gap-2">
                    {item.changePercent > 0 ? (
                      <View className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 rounded-full">
                        <TrendingUp size={16} color="#10b981" />
                        <Text className="block text-sm font-medium text-emerald-600">
                          +{item.changePercent.toFixed(2)}%
                        </Text>
                      </View>
                    ) : item.changePercent < 0 ? (
                      <View className="flex items-center gap-1 px-3 py-1.5 bg-red-50 rounded-full">
                        <TrendingDown size={16} color="#ef4444" />
                        <Text className="block text-sm font-medium text-red-500">
                          {item.changePercent.toFixed(2)}%
                        </Text>
                      </View>
                    ) : (
                      <View className="px-3 py-1.5 bg-gray-100 rounded-full">
                        <Text className="block text-sm font-medium text-gray-500">
                          0.00%
                        </Text>
                      </View>
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

export default ExchangeRatesPage
