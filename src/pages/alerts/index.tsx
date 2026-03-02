import { View, Text, ScrollView, Input } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { Network } from '@/network'
import { Bell, Plus, Trash2, X, TrendingUp, TrendingDown } from 'lucide-react-taro'
import './index.css'

interface Alert {
  id: string
  item_id: string
  item_name: string
  target_price: number
  alert_type: 'below' | 'above'
  is_active: boolean
  is_triggered: boolean
  created_at: string
}

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [itemName, setItemName] = useState('')
  const [targetPrice, setTargetPrice] = useState('')
  const [alertType, setAlertType] = useState<'below' | 'above'>('below')

  // 获取预警列表
  const fetchAlerts = async () => {
    try {
      setLoading(true)
      console.log('[API] 获取预警列表')
      const res = await Network.request({
        url: '/api/cs/alerts'
      })

      console.log('[API Response] 预警列表:', res.data)

      if (res.data?.code === 200) {
        setAlerts(res.data.data || [])
      } else {
        Taro.showToast({ title: res.data?.msg || '获取预警失败', icon: 'none' })
      }
    } catch (error) {
      console.error('[API Error] 获取预警列表失败:', error)
      Taro.showToast({ title: '网络请求失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  // 创建预警
  const handleCreateAlert = async () => {
    if (!itemName.trim()) {
      Taro.showToast({ title: '请输入道具名称', icon: 'none' })
      return
    }
    if (!targetPrice.trim()) {
      Taro.showToast({ title: '请输入目标价格', icon: 'none' })
      return
    }

    const price = parseFloat(targetPrice)
    if (Number.isNaN(price) || price <= 0) {
      Taro.showToast({ title: '请输入有效的价格', icon: 'none' })
      return
    }

    try {
      console.log('[API] 创建预警:', { itemName, targetPrice: price, alertType })
      const res = await Network.request({
        url: '/api/cs/alerts',
        method: 'POST',
        data: {
          itemId: '',  // 实际应用中需要从道具列表选择
          itemName: itemName.trim(),
          targetPrice: price,
          alertType,
        }
      })

      console.log('[API Response] 创建预警:', res.data)

      if (res.data?.code === 200) {
        Taro.showToast({ title: '预警创建成功', icon: 'success' })
        setShowAddModal(false)
        setItemName('')
        setTargetPrice('')
        fetchAlerts()
      } else {
        Taro.showToast({ title: res.data?.msg || '创建预警失败', icon: 'none' })
      }
    } catch (error) {
      console.error('[API Error] 创建预警失败:', error)
      Taro.showToast({ title: '网络请求失败', icon: 'none' })
    }
  }

  // 删除预警
  const handleDeleteAlert = async (alertId: string) => {
    try {
      const res = await Taro.showModal({
        title: '确认删除',
        content: '确定要删除这个预警吗？',
      })

      if (!res.confirm) return

      console.log('[API] 删除预警:', alertId)
      const response = await Network.request({
        url: `/api/cs/alerts/${alertId}`,
        method: 'DELETE'
      })

      console.log('[API Response] 删除预警:', response.data)

      if (response.data?.code === 200) {
        Taro.showToast({ title: '删除成功', icon: 'success' })
        fetchAlerts()
      } else {
        Taro.showToast({ title: response.data?.msg || '删除失败', icon: 'none' })
      }
    } catch (error) {
      console.error('[API Error] 删除预警失败:', error)
      Taro.showToast({ title: '网络请求失败', icon: 'none' })
    }
  }

  useLoad(() => {
    fetchAlerts()
  })

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex items-center justify-between mb-2">
          <Text className="block text-xl font-bold text-gray-900">价格预警</Text>
          <View
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} color="#ffffff" />
            <Text className="block text-sm font-medium text-white">新建预警</Text>
          </View>
        </View>
        <Text className="block text-sm text-gray-500">
          设置价格目标，到达时自动通知
        </Text>
      </View>

      {/* 预警列表 */}
      {loading && alerts.length === 0 ? (
        <View className="flex items-center justify-center py-20">
          <Text className="block text-gray-500">加载中...</Text>
        </View>
      ) : alerts.length === 0 ? (
        <View className="flex flex-col items-center justify-center py-20">
          <Bell size={48} color="#9ca3af" />
          <Text className="block text-lg text-gray-500 mt-4 mb-2">暂无预警</Text>
          <Text className="block text-sm text-gray-400 mb-4">点击&quot;新建预警&quot;开始监控</Text>
        </View>
      ) : (
        <ScrollView className="flex-1" scrollY>
          <View className="p-4">
            {alerts.map((alert) => (
              <View
                key={alert.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-3"
              >
                <View className="flex items-center justify-between mb-3">
                  <View className="flex items-center gap-2">
                    {alert.alert_type === 'below' ? (
                      <TrendingDown size={20} color="#ef4444" />
                    ) : (
                      <TrendingUp size={20} color="#10b981" />
                    )}
                    <Text className="block text-base font-semibold text-gray-900">
                      {alert.item_name}
                    </Text>
                  </View>
                  <View
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
                    onClick={() => handleDeleteAlert(alert.id)}
                  >
                    <Trash2 size={14} color="#9ca3af" />
                    <Text className="block text-xs text-gray-500">删除</Text>
                  </View>
                </View>

                <View className="flex items-center justify-between">
                  <View>
                    <Text className="block text-xs text-gray-500 mb-1">
                      {alert.alert_type === 'below' ? '低于' : '高于'} ¥{alert.target_price}
                    </Text>
                    <Text className="block text-sm text-gray-400">
                      {new Date(alert.created_at).toLocaleString()}
                    </Text>
                  </View>
                  {alert.is_triggered && (
                    <View className="px-3 py-1 bg-emerald-100 rounded-full">
                      <Text className="block text-xs font-medium text-emerald-600">
                        已触发
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* 新建预警弹窗 */}
      {showAddModal && (
        <View className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <View className="bg-white rounded-xl p-6 w-11/12 max-w-sm">
            <View className="flex items-center justify-between mb-4">
              <Text className="block text-lg font-bold text-gray-900">新建预警</Text>
              <View onClick={() => setShowAddModal(false)}>
                <X size={24} color="#6b7280" />
              </View>
            </View>

            {/* 道具名称 */}
            <View className="mb-4">
              <Text className="block text-sm font-medium text-gray-700 mb-2">
                道具名称
              </Text>
              <View className="bg-gray-50 rounded-xl px-4 py-3">
                <Input
                  className="w-full bg-transparent text-base"
                  placeholder="例如：AK-47 | 红线"
                  value={itemName}
                  onInput={(e) => setItemName(e.detail.value)}
                />
              </View>
            </View>

            {/* 目标价格 */}
            <View className="mb-4">
              <Text className="block text-sm font-medium text-gray-700 mb-2">
                目标价格（元）
              </Text>
              <View className="bg-gray-50 rounded-xl px-4 py-3">
                <Input
                  className="w-full bg-transparent text-base"
                  type="number"
                  placeholder="输入目标价格"
                  value={targetPrice}
                  onInput={(e) => setTargetPrice(e.detail.value)}
                />
              </View>
            </View>

            {/* 预警类型 */}
            <View className="mb-6">
              <Text className="block text-sm font-medium text-gray-700 mb-2">
                预警类型
              </Text>
              <View className="flex gap-3">
                <View
                  className={`flex-1 py-3 rounded-xl text-center border-2 ${
                    alertType === 'below'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-white'
                  }`}
                  onClick={() => setAlertType('below')}
                >
                  <Text
                    className={`block text-sm font-medium ${
                      alertType === 'below' ? 'text-red-600' : 'text-gray-700'
                    }`}
                  >
                    低于目标价
                  </Text>
                </View>
                <View
                  className={`flex-1 py-3 rounded-xl text-center border-2 ${
                    alertType === 'above'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 bg-white'
                  }`}
                  onClick={() => setAlertType('above')}
                >
                  <Text
                    className={`block text-sm font-medium ${
                      alertType === 'above' ? 'text-emerald-600' : 'text-gray-700'
                    }`}
                  >
                    高于目标价
                  </Text>
                </View>
              </View>
            </View>

            {/* 按钮 */}
            <View className="flex gap-3">
              <View
                className="flex-1 py-3 rounded-xl text-center bg-gray-100"
                onClick={() => setShowAddModal(false)}
              >
                <Text className="block text-base font-medium text-gray-700">取消</Text>
              </View>
              <View
                className="flex-1 py-3 rounded-xl text-center bg-blue-600"
                onClick={handleCreateAlert}
              >
                <Text className="block text-base font-medium text-white">确认</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default AlertsPage
