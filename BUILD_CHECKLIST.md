# ✅ CSMarketNotify APK 构建状态检查清单

## 使用说明

在完成每个步骤后，勾选对应的复选框 ✅。

---

## 📋 准备工作阶段

### 1. 下载项目
- [ ] 已下载项目文件（CSMarketNotify.tar.gz）
- [ ] 下载大小确认（约 272KB）
- [ ] 下载来源确认（dev.coze.site）

**下载链接**：
```
https://db3da4c8-8fa1-495c-ace9-6439bb93d07d.dev.coze.site/api/download/code
```

---

### 2. 解压文件
- [ ] 已解压文件到指定目录
- [ ] 项目文件夹存在（如：D:\workspace\CSMarketNotify）
- [ ] 能看到 package.json 文件

**验证命令**：
```bash
dir  # Windows
ls   # Mac/Linux
```

---

### 3. 安装 Java JDK 17
- [ ] 已从 Adoptium 下载 JDK 17
- [ ] 已完成安装（.msi 文件）
- [ ] 已验证 java 命令可用
- [ ] 已确认版本是 17.x

**验证命令**：
```bash
java -version
```

**预期输出**：
```
openjdk version "17.0.x"
```

---

### 4. 安装 Android Studio
- [ ] 已从官方网站下载 Android Studio
- [ ] 已完成安装
- [ ] 已完成首次启动配置
- [ ] 已验证 adb 命令可用
- [ ] 已安装 Android SDK Platform-Tools

**验证命令**：
```bash
adb version
```

**预期输出**：
```
Android Debug Bridge version x.x.x
```

---

## 🚀 构建阶段

### 5. 进入项目目录
- [ ] 已使用 cd 命令进入项目目录
- [ ] 已确认当前路径正确

**验证命令**：
```bash
pwd  # Mac/Linux
cd   # Windows（显示当前路径）
```

**预期路径**：
```
D:\workspace\CSMarketNotify  # Windows
/Users/yourname/workspace/CSMarketNotify  # Mac
```

---

### 6. 安装项目依赖
- [ ] 已运行 pnpm install
- [ ] 安装过程无错误
- [ ] 安装完成提示 "Done in XXs"

**验证命令**：
```bash
pnpm install
```

**预期输出**：
```
Progress: resolved 1234, reused 56, downloaded 78, added 9, done
Done in 45s
```

---

### 7. 构建 H5 应用
- [ ] 已运行 pnpm build:web
- [ ] 构建过程无错误
- [ ] 构建完成提示 "built in XXs"
- [ ] 已生成 dist-web 文件夹

**验证命令**：
```bash
pnpm build:web
```

**预期输出**：
```
✓ built in 30s
dist-web/index.html    12.3 kB
dist-web/assets/*.js   156.7 kB
```

---

### 8. 同步到 Android 项目
- [ ] 已运行 npx cap sync android
- [ ] 同步过程无错误
- [ ] 同步完成提示 "sync finished"
- [ ] android 文件夹已更新

**验证命令**：
```bash
npx cap sync android
```

**预期输出**：
```
✔ sync finished in 0.158s
Synced files to android/
```

---

### 9. 打开 Android Studio
- [ ] 已运行 npx cap open android
- [ ] Android Studio 已自动打开
- [ ] 项目已加载（CSMarketNotify）
- [ ] Gradle 开始同步

**验证命令**：
```bash
npx cap open android
```

**预期结果**：
- Android Studio 窗口打开
- 项目名称显示：CSMarketNotify
- 右下角显示：Gradle sync running...

---

### 10. 等待 Gradle 同步完成
- [ ] 已等待 Gradle 同步完成
- [ ] 右下角同步提示消失
- [ ] 左下角出现 "Build" 选项卡
- [ ] 无错误提示

**预期时间**：首次 5-10 分钟，后续 1-2 分钟

**验证方法**：
- 查看 Android Studio 右下角状态栏
- 点击 "Build" 选项卡，查看是否有错误

---

### 11. 构建 Debug APK
- [ ] 已点击菜单 Build → Build Bundle(s) / APK(s) → Build APK(s)
- [ ] 构建过程已开始
- [ ] 构建进度条显示
- [ ] 构建完成提示 "Build APK(s) succeeded"

**预期时间**：2-3 分钟

---

### 12. 找到 APK 文件
- [ ] 已点击构建成功通知中的 locate
- [ ] 文件管理器已打开
- [ ] 已找到 app-debug.apk 文件
- [ ] 文件路径确认

**文件路径**：
```
D:\workspace\CSMarketNotify\android\app\build\outputs\apk\debug\app-debug.apk
```

**文件大小**：约 15-25 MB

---

## 📱 安装阶段

### 13. 安装到手机
- [ ] 已选择安装方式（USB / 文件 / 微信）
- [ ] 已完成应用安装
- [ ] 应用已出现在手机桌面
- [ ] 应用可以正常打开

**安装方式选项**：
- [ ] USB 连接安装（adb install）
- [ ] 文件传输安装
- [ ] 微信/QQ 传输安装

**验证步骤**：
1. 打开手机，找到 "CS价格监控" 应用
2. 点击应用图标
3. 应用正常打开，显示价格监控页面

---

## 🎉 完成！

### 最终检查
- [ ] 应用可以在手机上正常打开
- [ ] 可以查看道具价格
- [ ] 可以设置价格预警
- [ ] 可以查看汇率信息
- [ ] 界面显示正常

---

## 🆘 问题诊断

如果遇到问题，请根据以下步骤诊断：

### Java 问题
```bash
java -version
# 如果提示 "command not found"，说明 Java 未安装或环境变量未配置
```

### ADB 问题
```bash
adb version
# 如果提示 "command not found"，说明 Android SDK 未配置
```

### Gradle 同步问题
- 检查网络连接
- 配置国内镜像（见 LOCAL_BUILD_GUIDE.md）
- 点击 Android Studio 的 "Try Again"

### 构建失败
- 查看错误信息
- 清理构建缓存：`cd android && ./gradlew clean`
- 重新构建：`./gradlew assembleDebug`

### 安装失败
- 检查手机设置，允许安装未知来源应用
- 确认手机 Android 版本 >= 5.0
- 尝试其他安装方式

---

## 📞 需要帮助？

查看详细文档：
- [LOCAL_BUILD_GUIDE.md](LOCAL_BUILD_GUIDE.md) - 超详细完整指南
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - 快速参考卡
- [ANDROID_BUILD_GUIDE.md](ANDROID_BUILD_GUIDE.md) - 技术文档

复制错误信息，告诉我帮你解决！

---

**祝你构建成功！** 🚀
