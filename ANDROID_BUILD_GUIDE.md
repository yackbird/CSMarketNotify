# Android APK 构建指南

本指南帮助你将 CSMarketNotify H5 应用打包成 Android APK 安装包。

## 📋 前置要求

在本地电脑上，你需要安装以下工具：

### 1. 安装 Java JDK

**下载地址**：https://adoptium.net/

- 选择 **Java 17 (LTS)**
- 根据你的操作系统选择安装包
- 安装后配置环境变量 `JAVA_HOME`

验证安装：
```bash
java -version
```

### 2. 安装 Android SDK

**推荐方式：使用 Android Studio**

1. 下载 Android Studio：https://developer.android.com/studio
2. 安装并启动 Android Studio
3. 在欢迎界面选择 **SDK Manager**
4. 安装：
   - ✅ Android SDK Platform-Tools
   - ✅ Android SDK Build-Tools（最新版本）
   - ✅ Android 13.0 (API 33) 或更高版本

验证安装：
```bash
adb version
```

---

## 🚀 构建步骤

### 步骤 1：下载项目

```bash
# 克隆或下载项目
git clone https://github.com/yackbird/TDSimulator.git -b cs-market-monitor CSMarketMonitor

# 或从之前的下载解压
cd CSMarketNotify
```

### 步骤 2：安装依赖

```bash
pnpm install
```

### 步骤 3：构建 H5 应用

```bash
pnpm build:web
```

### 步骤 4：同步到 Android 项目

```bash
npx cap sync android
```

### 步骤 5：打开 Android 项目

```bash
npx cap open android
```

这会自动打开 Android Studio。

### 步骤 6：在 Android Studio 中构建 APK

#### 生成 Debug APK（用于测试）

1. 在 Android Studio 中，点击菜单 **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. 等待构建完成
3. 点击通知中的 **locate** 链接，找到 APK 文件
4. APK 位置：`android/app/build/outputs/apk/debug/app-debug.apk`

#### 生成 Release APK（用于发布）

1. 在 Android Studio 中，点击菜单 **Build** → **Generate Signed Bundle / APK**
2. 选择 **APK**
3. 配置签名密钥：
   - 点击 **Create new...** 创建新的密钥库
   - 输入密钥库路径、密码、别名等信息
   - 记住这些信息，以后发布需要用到
4. 选择 **release** 构建变体
5. 点击 **Finish**
6. APK 位置：`android/app/build/outputs/apk/release/app-release.apk`

---

## 📱 安装 APK 到手机

### 方式 1：通过 ADB 安装（推荐）

```bash
# 连接手机到电脑，开启 USB 调试
adb devices

# 安装 APK
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### 方式 2：通过 USB 复制

1. 用 USB 连接手机
2. 复制 APK 文件到手机存储
3. 在手机文件管理器中点击 APK 文件安装

### 方式 3：通过云盘/微信传输

1. 上传 APK 到云盘或发送到微信
2. 在手机上下载并安装

---

## 🔧 自定义配置

### 修改应用名称

编辑 `capacitor.config.ts`：

```typescript
const config: CapacitorConfig = {
  appId: 'com.csmarket.app',
  appName: 'CS价格监控',  // 修改这里
  webDir: 'dist-web'
};
```

### 修改应用图标

1. 准备一个 1024x1024 的 PNG 图标
2. 使用在线工具生成不同尺寸的图标：https://icon.kitchen/
3. 将生成的图标文件复制到：
   - `android/app/src/main/res/mipmap-*/ic_launcher.png`
   - `android/app/src/main/res/mipmap-*/ic_launcher_round.png`

### 修改应用包名

编辑 `capacitor.config.ts` 和 `android/app/build.gradle`：

```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  appId: 'com.yourcompany.yourapp',  // 修改这里
  // ...
};
```

---

## ⚠️ 注意事项

### 网络请求配置

由于 Android 应用的安全限制，需要配置网络权限：

编辑 `android/app/src/main/AndroidManifest.xml`，添加：

```xml
<application>
    <uses-library
        android:name="org.apache.http.legacy"
        android:required="false" />
</application>
```

### 后端地址配置

确保 H5 应用使用正确的后端地址：

1. 检查 `src/network.ts` 中的 `PROJECT_DOMAIN` 配置
2. 确保后端服务可以公网访问
3. 或者使用本地 IP 地址（仅测试用）

---

## 🆘 常见问题

### Q: 构建失败，提示找不到 Gradle

**A**: Android Studio 首次打开项目时会自动下载 Gradle，需要等待。

### Q: 安装失败，提示"禁止安装未知来源的应用"

**A**: 在手机设置中，允许安装未知来源的应用（设置 → 安全 → 允许未知来源）

### Q: 应用打开后白屏

**A**: 检查网络连接，确保能访问后端服务。查看 Android Studio 的 Logcat 查看错误日志。

### Q: 如何更新应用？

**A**: 重新构建 APK，然后覆盖安装即可。

---

## 📦 最终产物

构建完成后，你会得到：

- `app-debug.apk` - Debug 版本，用于测试
- `app-release.apk` - Release 版本，用于发布

可以直接安装到任何 Android 设备上使用！

---

## 🎉 完成！

现在你有一个完整的 Android APK，可以在任何 Android 设备上安装使用 CS 价格监控应用了！

**祝使用愉快！** 🚀
