# ⚡ CSMarketNotify APK 构建快速参考卡

## 📦 快速构建（10 分钟）

### 1️⃣ 下载项目（30 秒）
```
https://db3da4c8-8fa1-495c-ace9-6439bb93d07d.dev.coze.site/api/download/code
```

### 2️⃣ 解压文件（10 秒）
右键 → 解压到当前文件夹

### 3️⃣ 安装 Java（2 分钟）
下载：https://adoptium.net/
选择：Eclipse Temurin 17 + JDK + Windows + x64

验证：`java -version`

### 4️⃣ 安装 Android Studio（2 分钟）
下载：https://developer.android.com/studio
双击安装 → 默认选项

验证：`adb version`

### 5️⃣ 进入项目目录
```bash
cd D:\workspace\CSMarketNotify
```

### 6️⃣ 安装依赖（2 分钟）
```bash
pnpm install
```

### 7️⃣ 构建 H5（30 秒）
```bash
pnpm build:web
```

### 8️⃣ 同步 Android（30 秒）
```bash
npx cap sync android
```

### 9️⃣ 打开 Android Studio
```bash
npx cap open android
```

### 🔟 构建 APK（5 分钟）
1. 等待 Gradle 同步完成
2. Build → Build Bundle(s) / APK(s) → Build APK(s)
3. 点击通知中的 locate
4. 找到：`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📱 安装到手机

### USB 方式
```bash
adb install app-debug.apk
```

### 文件方式
复制 APK → 手机文件管理器 → 点击安装

---

## ⚠️ 关键点

- **Java 版本**：必须是 17
- **Android Studio**：首次启动需要下载组件（5-10 分钟）
- **Gradle 同步**：首次运行需要时间（5-10 分钟）
- **网络**：确保网络稳定

---

## 🆘 遇到问题？

查看详细文档：`LOCAL_BUILD_GUIDE.md`

常见问题：
- `java: command not found` → 重新安装 Java，配置环境变量
- `adb: command not found` → 配置 Android SDK 环境变量
- Gradle 同步失败 → 配置国内镜像（见详细文档）
- 安装失败 → 手机允许未知来源应用

---

## 🎯 下载链接汇总

- **项目源码**：https://db3da4c8-8fa1-495c-ace9-6439bb93d07d.dev.coze.site/api/download/code
- **Java JDK**：https://adoptium.net/
- **Android Studio**：https://developer.android.com/studio
- **7-Zip（解压工具）**：https://www.7-zip.org/

---

## ✅ 检查清单

- [ ] 已下载并解压项目
- [ ] 已安装 Java JDK 17
- [ ] 已安装 Android Studio
- [ ] 已安装 pnpm
- [ ] 已构建 H5 应用
- [ ] 已同步到 Android 项目
- [ ] 已在 Android Studio 中构建 APK
- [ ] 已下载 APK 文件
- [ ] 已安装到手机

---

**祝你构建成功！** 🚀
