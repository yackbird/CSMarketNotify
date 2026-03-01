# CS 道具价格监控系统设计指南

## 品牌定位

**应用定位**：专业的 CS（Counter-Strike）游戏道具价格监控工具
**设计风格**：科技感、专业、数据可视化
**目标用户**：CS 游戏玩家、饰品收藏者、交易商

## 配色方案

### 主色调
- **主色（科技蓝）**：`bg-blue-600` / `text-blue-600`（#2563eb）
- **辅助色（绿色上涨）**：`bg-emerald-500` / `text-emerald-500`（价格上涨）
- **警告色（红色下跌）**：`bg-red-500` / `text-red-500`（价格下跌）

### 中性色
- **背景色**：`bg-gray-50` / `bg-white`
- **文字主色**：`text-gray-900`
- **文字次色**：`text-gray-500`
- **边框色**：`border-gray-200`

### 语义色
- **成功**：`bg-emerald-500` / `text-emerald-600`
- **警告**：`bg-amber-500` / `text-amber-600`
- **错误**：`bg-red-500` / `text-red-600`
- **信息**：`bg-blue-500` / `text-blue-600`

## 字体规范

- **H1（页面标题）**：`text-2xl font-bold`
- **H2（区块标题）**：`text-xl font-semibold`
- **H3（卡片标题）**：`text-lg font-semibold`
- **Body（正文）**：`text-base`
- **Caption（辅助文字）**：`text-sm text-gray-500`

## 间距系统

- **页面边距**：`p-4`
- **卡片内边距**：`p-4`
- **组件间距**：`gap-4`
- **列表项间距**：`gap-3`

## 组件规范

### 按钮样式

#### 主按钮
```tsx
<View className="bg-blue-600 rounded-lg py-3 px-6">
  <Text className="block text-white font-medium text-center">确认</Text>
</View>
```

#### 次按钮
```tsx
<View className="bg-gray-100 rounded-lg py-3 px-6">
  <Text className="block text-gray-700 font-medium text-center">取消</Text>
</View>
```

#### 危险按钮
```tsx
<View className="bg-red-500 rounded-lg py-3 px-6">
  <Text className="block text-white font-medium text-center">删除</Text>
</View>
```

### 卡片样式

```tsx
<View className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
  <Text className="block text-lg font-semibold mb-2">标题</Text>
  <Text className="block text-sm text-gray-500">描述内容</Text>
</View>
```

### 价格卡片

```tsx
<View className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
  <View className="flex items-center gap-3 mb-3">
    <Image src={imageUrl} className="w-16 h-16 rounded-lg" />
    <View style={{ flex: 1 }}>
      <Text className="block text-lg font-semibold">{itemName}</Text>
      <Text className="block text-sm text-gray-500">{category}</Text>
    </View>
  </View>
  <View className="flex items-center justify-between">
    <Text className="block text-2xl font-bold text-blue-600">¥{price}</Text>
    <Text className={`block text-sm font-medium ${isUp ? 'text-emerald-500' : 'text-red-500'}`}>
      {isUp ? '+' : ''}{changePercent}%
    </Text>
  </View>
</View>
```

### 输入框（跨端兼容）

```tsx
<View className="bg-gray-50 rounded-xl px-4 py-3 mb-3">
  <Input
    className="w-full bg-transparent text-base"
    placeholder="请输入目标价格"
    placeholderClass="text-gray-400"
  />
</View>
```

### 空状态

```tsx
<View className="flex flex-col items-center justify-center py-16">
  <Text className="block text-gray-400 text-6xl mb-4">📊</Text>
  <Text className="block text-lg text-gray-500 mb-2">暂无数据</Text>
  <Text className="block text-sm text-gray-400">快去添加你关注的道具吧</Text>
</View>
```

### 加载状态

```tsx
<View className="flex items-center justify-center py-16">
  <Text className="block text-gray-500">加载中...</Text>
</View>
```

## 导航结构

### 页面配置
- **首页**：`pages/index/index` - 价格监控首页（热门道具、我的关注）
- **设置页**：`pages/alerts/index` - 预警设置页（新建预警、管理预警）
- **数据页**：`pages/history/index` - 历史数据页（价格趋势图）

### 页面跳转
- 首页 → 设置页：`Taro.navigateTo({ url: '/pages/alerts/index' })`
- 设置页 → 首页：`Taro.navigateBack()`

## 数据展示规范

### 价格展示
- **当前价格**：`text-2xl font-bold text-blue-600`
- **上涨**：`text-emerald-500`（+5.2%）
- **下跌**：`text-red-500`（-3.8%）

### 时间展示
- **格式**：`YYYY-MM-DD HH:mm`
- **样式**：`text-sm text-gray-500`

### 排名展示
- **前三名**：使用不同颜色的徽章
  - 第 1 名：`bg-amber-400 text-white`
  - 第 2 名：`bg-gray-300 text-white`
  - 第 3 名：`bg-amber-600 text-white`
- **其他**：`text-gray-500`

## 跨端兼容性要求

- ✅ 所有 Text 组件垂直排列时添加 `block` 类
- ✅ Input 组件必须用 View 包裹，样式放 View 上
- ✅ Input Flex 布局必须 View 包装，flex 属性放 View 上
- ✅ Fixed + Flex 布局必须使用 inline style
- ✅ 平台检测：`const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP`

## 小程序约束

- **包体积限制**：代码分包，主包 < 2MB
- **图片策略**：使用 CDN，图片大小 < 500KB
- **性能优化**：列表虚拟滚动（>100 项）
- **网络请求**：统一使用 Network.request
