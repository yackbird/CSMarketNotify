# CS 价格监控小程序

基于 [Taro 4](https://docs.taro.zone/docs/) + [Nest.js](https://nestjs.com/) 的前后端分离项目，用于监控 CS (Counter-Strike) 游戏道具价格变化，支持价格预警和实时汇率查询。

## 项目概述

这是一个 H5 Web App，提供以下核心功能：

- 🔍 **道具价格监控**：实时查看热门 CS 道具价格
- 🔔 **价格预警**：设置价格下限，超过阈值自动提醒
- 💱 **汇率查询**：展示人民币兑换主要货币的实时汇率
- 📱 **移动端适配**：支持 H5 和微信小程序双端访问
- ☁️ **云端存储**：使用 Supabase PostgreSQL 存储用户数据

## 功能特性

### 1. 价格监控首页
- 展示 5 个热门 CS 道具实时价格
- 支持手动刷新获取最新价格
- 显示价格趋势（涨/跌）
- 模拟价格波动效果

### 2. 预警设置
- 为每个道具设置价格下限
- 当价格低于设定值时触发预警
- 支持添加/删除预警规则
- 实时显示当前预警状态

### 3. 汇率展示
- 显示 CNY 对 USD、EUR、JPY 等货币的汇率
- 支持手动刷新汇率数据

## 技术栈

### 前端
- **框架**: Taro 4.1.9
- **语言**: TypeScript 5.4.5
- **UI**: React 18.0.0
- **样式**: TailwindCSS 4.1.18
- **状态管理**: Zustand 5.0.9
- **图标**: lucide-react-taro

### 后端
- **框架**: NestJS 10.4.15
- **ORM**: Drizzle ORM 0.45.1
- **数据库**: Supabase (PostgreSQL)
- **验证**: Zod 4.3.5

### 工具
- **构建**: Vite 4.2.0
- **包管理**: pnpm
- **运行时**: Node.js >= 18

## 项目结构

```
├── .cozeproj/                # Coze 平台配置
├── config/                   # Taro 构建配置
├── server/                   # NestJS 后端服务
│   └── src/
│       ├── main.ts           # 服务入口
│       ├── app.module.ts     # 根模块
│       ├── cs/               # CS 道具相关模块
│       │   ├── cs.module.ts
│       │   ├── cs.controller.ts
│       │   └── cs.service.ts
│       └── storage/          # 存储模块
│           └── database/     # 数据库配置
├── src/                      # 前端源码
│   ├── pages/                # 页面组件
│   │   ├── index/            # 价格监控首页
│   │   ├── alerts/           # 预警设置页面
│   │   └── rates/            # 汇率展示页面
│   ├── utils/                # 工具函数
│   ├── network.ts            # 网络请求封装
│   ├── app.ts                # 应用入口
│   └── app.config.ts         # 应用配置
└── design_guidelines.md      # UI 设计规范
```

## 快速开始

### 环境要求
- Node.js >= 18
- pnpm >= 8
- Git

### 安装依赖

```bash
pnpm install
```

### 本地开发

同时启动 H5 前端和 NestJS 后端：

```bash
pnpm dev
```

- 前端地址：http://localhost:5000
- 后端地址：http://localhost:3000

单独启动：

```bash
pnpm dev:web      # 仅 H5 前端
pnpm dev:weapp    # 仅微信小程序
pnpm dev:server   # 仅后端服务
```

### 构建

```bash
pnpm build        # 构建所有（H5 + 小程序 + 后端）
pnpm build:web    # 仅构建 H5
pnpm build:weapp  # 仅构建微信小程序
pnpm build:server # 仅构建后端
```

### 预览小程序

```bash
pnpm preview:weapp # 构建并生成预览二维码
```

## 📱 Android APK 构建

将 H5 应用打包成 Android APK，可在手机上安装使用。

### 前置要求
- Java JDK 17+
- Android Studio
- pnpm

### 快速构建

#### Windows 用户
```bash
build-android-apk.bat
```

#### Mac/Linux 用户
```bash
bash build-android-apk.sh
```

#### 手动构建
```bash
# 1. 安装依赖
pnpm install

# 2. 构建 H5 应用
pnpm build:web

# 3. 同步到 Android 项目
npx cap sync android

# 4. 打开 Android Studio
npx cap open android

# 5. 在 Android Studio 中构建 APK
# Build → Build Bundle(s) / APK(s) → Build APK(s)
```

### 详细文档

- 📖 [QUICK_BUILD.md](QUICK_BUILD.md) - 快速构建指南
- 📖 [ANDROID_BUILD_GUIDE.md](ANDROID_BUILD_GUIDE.md) - 完整构建文档

## 数据说明

### 重要提示
由于以下原因，当前项目使用**模拟数据**：

1. **网络限制**：
   - Steam Market API 在国内网络环境下无法稳定访问
   - CSGOBackpack API 同样存在连接问题
   - Buff163 API 有反爬虫机制（返回 403）

2. **合规性考虑**：
   - Steam Market API 官方合规，但需要稳定的网络环境
   - 第三方 API 可能存在服务条款限制

3. **演示稳定性**：
   - 模拟数据确保功能演示的稳定性
   - 避免因网络问题导致功能不可用

### 数据源说明

| 数据类型 | 当前方案 | 替代方案 |
|---------|---------|---------|
| 道具价格 | 模拟数据 | Steam Market API / CSGOBackpack API |
| 汇率数据 | 模拟数据 | ExchangeRate-API.com |

### 如何接入真实数据

如果需要接入真实数据，只需修改后端服务：

```typescript
// server/src/cs/cs.service.ts

async getItemPrices() {
  // 方案 1: Steam Market API
  const response = await fetch(
    'https://steamcommunity.com/market/priceoverview/?appid=730&currency=23&market_hash_name=AK-47%20%7C%20Redline'
  )
  return await response.json()

  // 方案 2: CSGOBackpack API
  const response = await fetch('https://prices.csgobackpack.net/api/v1/prices/current/')
  return await response.json()
}
```

## 前端开发规范

### 新建页面流程

1. 在 `src/pages/` 下创建页面目录
2. 创建 `index.tsx`（页面组件）
3. 创建 `index.config.ts`（页面配置）
4. 在 `src/app.config.ts` 的 `pages` 数组中注册

### 路径别名

项目配置了 `@/*` 路径别名指向 `src/*`：

```typescript
import { SomeComponent } from '@/components/SomeComponent'
```

### 网络请求

使用封装好的 Network 工具：

```typescript
import { Network } from '@/network'

const data = await Network.request({
  url: '/api/cs/prices',
  method: 'GET'
})
```

### 样式开发

使用 Tailwind CSS 实现样式：

```tsx
<View className="flex flex-col p-4 bg-white rounded-lg">
  <Text className="text-lg font-bold text-gray-800">标题</Text>
</View>
```

## 设计规范

项目遵循 `design_guidelines.md` 中的设计规范：

- **配色方案**：主色 #1890ff，中性色 #999999
- **按钮样式**：圆角按钮，支持主/次/禁用状态
- **卡片样式**：圆角 + 阴影 + 统一内边距
- **间距系统**：使用 Tailwind 的 `gap-*` 和 `p-*`

## 数据库 Schema

项目使用 Drizzle ORM 定义数据表：

```typescript
// cs_items - 道具信息表
export const csItems = pgTable('cs_items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  marketHashName: text('market_hash_name').notNull(),
  rarity: text('rarity'),
  imageUrl: text('image_url'),
})

// cs_prices - 价格历史表
export const csPrices = pgTable('cs_prices', {
  id: serial('id').primaryKey(),
  itemId: integer('item_id').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
})

// cs_alerts - 预警规则表
export const csAlerts = pgTable('cs_alerts', {
  id: serial('id').primaryKey(),
  itemId: integer('item_id').notNull(),
  alertPrice: decimal('alert_price', { precision: 10, scale: 2 }).notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
```

## API 接口

### 道具价格

```bash
GET  /api/cs/prices         # 获取所有道具价格
GET  /api/cs/prices/:id     # 获取单个道具价格
POST /api/cs/prices/refresh # 刷新价格数据
```

### 预警管理

```bash
GET    /api/cs/alerts         # 获取所有预警
POST   /api/cs/alerts         # 创建预警
DELETE /api/cs/alerts/:id     # 删除预警
```

### 汇率查询

```bash
GET  /api/cs/rates        # 获取汇率数据
POST /api/cs/rates/refresh # 刷新汇率
```

## 常见问题

### Q: 为什么使用模拟数据？
A: 由于网络环境和合规性限制，Steam、CSGOBackpack 等 API 无法稳定访问。模拟数据确保功能演示的稳定性。

### Q: 如何接入真实数据？
A: 修改 `server/src/cs/cs.service.ts` 中的数据获取逻辑，替换为真实 API 调用即可。

### Q: 支持哪些平台？
A: 支持 H5 Web App 和微信小程序双端。

### Q: 数据存储在哪里？
A: 使用 Supabase PostgreSQL 云数据库，数据安全可靠。

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 联系方式

如有问题，请通过 GitHub Issues 联系。
