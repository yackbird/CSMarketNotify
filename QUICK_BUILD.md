# Android APK 构建快速指南

## 🚀 快速开始（5 分钟）

### 前置准备

1. ✅ 安装 Java JDK 17：https://adoptium.net/
2. ✅ 安装 Android Studio：https://developer.android.com/studio
3. ✅ 安装 pnpm（如果没有）：`npm install -g pnpm`

---

### 构建步骤

#### 方式 1：使用构建脚本（推荐）

```bash
# 下载项目后，在项目根目录运行
bash build-android-apk.sh
```

脚本会自动完成：
- ✅ 安装依赖
- ✅ 构建 H5 应用
- ✅ 同步到 Android 项目
- ✅ 打开 Android Studio

然后在 Android Studio 中：
1. 点击 **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. 等待构建完成
3. 点击通知中的 **locate** 链接找到 APK

---

#### 方式 2：手动构建

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

---

## 📱 安装到手机

### 通过 ADB（推荐）

```bash
# 连接手机，开启 USB 调试
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### 通过文件管理器

1. 将 APK 复制到手机存储
2. 在文件管理器中点击 APK 安装

---

## 🌐 配置后端地址

应用需要访问后端 API，有两种方式：

### 方式 1：使用公网后端

修改 `src/network.ts` 中的 `PROJECT_DOMAIN`：

```typescript
const PROJECT_DOMAIN = 'https://your-backend-domain.com'
```

### 方式 2：使用本地网络（仅测试）

```typescript
const PROJECT_DOMAIN = 'http://192.168.1.100:3000'
```

> 注意：手机和电脑需要在同一个局域网

---

## 🔧 修改应用信息

### 修改名称和包名

编辑 `capacitor.config.ts`：

```typescript
const config: CapacitorConfig = {
  appId: 'com.csmarket.app',        // 包名
  appName: 'CS价格监控',             // 应用名称
  webDir: 'dist-web'
};
```

### 修改图标

1. 准备 1024x1024 的 PNG 图标
2. 使用 https://icon.kitchen/ 生成图标
3. 替换 `android/app/src/main/res/mipmap-*/` 下的图标文件

---

## ⚠️ 常见问题

### Q: 构建失败，提示找不到 Java

**A**: 检查 JAVA_HOME 环境变量是否正确配置：
```bash
echo $JAVA_HOME
java -version
```

### Q: 安装提示"禁止安装"

**A**: 手机设置 → 安全 → 允许安装未知来源

### Q: 应用打开后白屏

**A**: 检查网络连接和后端地址配置是否正确

---

## 📦 完整文档

详细说明请查看：`ANDROID_BUILD_GUIDE.md`

---

## 🎉 完成！

构建完成后，你将得到一个可以在任何 Android 设备上安装的 APK 文件！

**祝使用愉快！** 🚀
