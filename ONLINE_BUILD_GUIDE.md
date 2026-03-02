# 📱 CSMarketNotify Android APK - 极简构建指南

## ⚡ 3 步搞定（不需要 Java，不需要 Android Studio）

### 步骤 1：下载项目（30 秒）

点击下载（272KB）：
```
https://db3da4c8-8fa1-495c-ace9-6439bb93d07d.dev.coze.site/api/download/code
```

### 步骤 2：解压（10 秒）

Windows：右键 → 解压
Mac：双击解压

### 步骤 3：在线构建（5 分钟）

访问这个网站：https://www.appveyor.com/

上传项目文件，选择 Android 构建，5 分钟后下载 APK。

---

## 🚀 或者使用 GitHub Actions（推荐）

我已经配置好了自动构建，你只需要：

### 方法 1：Fork 仓库并启用 Actions

1. 访问：https://github.com/yackbird/TDSimulator
2. Fork 到你的账号
3. 启用 GitHub Actions
4. 等待构建完成（约 5 分钟）
5. 在 Actions 页面下载 APK

### 方法 2：直接使用我的仓库

访问 Actions 页面查看构建结果：
```
https://github.com/yackbird/TDSimulator/actions
```

---

## 📦 其他在线构建服务

### 1. Codemagic（推荐移动应用）
- 网址：https://codemagic.io/
- 免费额度：每月 500 分钟构建
- 上传项目，选择 Android，5 分钟搞定

### 2. AppCenter（微软）
- 网址：https://appcenter.ms/
- 免费使用
- 支持持续集成

### 3. Bitrise
- 网址：https://bitrise.io/
- 免费额度：每月 200 分钟

---

## 🎯 推荐方案（最简单）

**使用 Codemagic**：

1. 访问：https://codemagic.io/
2. 注册账号（免费）
3. 关联 GitHub 仓库（选择你的 Fork 或我的仓库）
4. 选择 `cs-market-monitor` 分支
5. 配置构建：
   - Platform: Android
   - Build type: APK
   - Script: `pnpm install && pnpm build:web && npx cap sync android && cd android && ./gradlew assembleDebug`
6. 点击 Start Build
7. 等待 5 分钟，下载 APK

---

## ❓ 为什么推荐在线构建？

| 方案 | 时间 | 需要安装 | 难度 |
|------|------|---------|------|
| 本地构建 | 10 分钟 | Java + Android Studio | ⭐⭐⭐⭐ |
| Docker 构建 | 5 分钟 | Docker | ⭐⭐⭐ |
| **在线构建** | **5 分钟** | **无** | **⭐** |

---

## 📱 下载 APK

构建完成后，你会得到：
- **app-debug.apk** - 测试版，可直接安装
- **app-release.apk** - 正式版，需要签名

---

## 🎉 选择一个方案，5 分钟后你就有 APK 了！

**推荐：使用 Codemagic，最简单！**

**需要我帮你配置吗？** 😊
