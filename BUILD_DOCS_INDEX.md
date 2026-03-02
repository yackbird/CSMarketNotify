# 📚 CSMarketNotify Android 构建文档总览

## 🎯 快速开始

如果你想在手机上安装 CS 价格监控应用，从这里开始：

### ⚡ 最快路径（10 分钟）

1. 阅读 [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - 快速参考卡
2. 按照 10 个步骤操作
3. 完成 APK 构建
4. 安装到手机

### 📖 完整路径（15 分钟）

1. 阅读 [LOCAL_BUILD_GUIDE.md](LOCAL_BUILD_GUIDE.md) - 超详细完整指南
2. 按照 12 个步骤操作
3. 解决常见问题
4. 安装到手机

### ✅ 检查路径（任何时间）

1. 使用 [BUILD_CHECKLIST.md](BUILD_CHECKLIST.md) - 构建状态检查清单
2. 勾选已完成的步骤
3. 确认所有步骤都完成

---

## 📚 文档说明

### 1. QUICK_REFERENCE.md - 快速参考卡 ⚡
**适合人群**：有一定 Android 开发经验的用户

**内容**：
- 10 个快速步骤
- 关键命令汇总
- 常见问题速查
- 下载链接汇总

**优点**：
- 最简洁
- 最快速
- 适合参考

**预计时间**：10 分钟

---

### 2. LOCAL_BUILD_GUIDE.md - 超详细完整指南 📖
**适合人群**：所有用户，特别是初次构建的用户

**内容**：
- 12 个详细步骤
- 每步都有截图说明（文字描述）
- 完整的错误排查指南
- 多种安装方式

**优点**：
- 最详细
- 最容易理解
- 适合新手

**预计时间**：15 分钟

---

### 3. BUILD_CHECKLIST.md - 构建状态检查清单 ✅
**适合人群**：所有用户，在构建过程中使用

**内容**：
- 13 个检查项
- 每项都有验证命令
- 问题诊断指南

**优点**：
- 确保不遗漏步骤
- 快速发现问题
- 适合排查问题

**使用场景**：
- 构建过程中检查进度
- 遇到问题时诊断
- 确认构建是否完成

---

### 4. ANDROID_BUILD_GUIDE.md - 技术文档 📋
**适合人群**：开发者，需要深入了解技术细节

**内容**：
- Capacitor 配置说明
- Android 项目结构
- 自定义签名配置
- 高级功能配置

**优点**：
- 技术最深入
- 适合定制开发
- 适合调试

**使用场景**：
- 需要自定义配置
- 需要添加新功能
- 需要调试问题

---

### 5. ONLINE_BUILD_GUIDE.md - 在线构建文档 ☁️
**适合人群**：不想安装开发工具的用户

**内容**：
- 在线构建服务配置
- Codemagic 使用指南
- 自动化 CI/CD 配置

**优点**：
- 无需本地环境
- 自动化构建
- 适合团队协作

**注意**：需要注册在线构建服务账号

---

## 🗂️ 构建脚本

### build-android-apk.bat（Windows）
**功能**：一键构建脚本

**使用方法**：
```bash
build-android-apk.bat
```

**包含步骤**：
1. 检查环境
2. 安装依赖
3. 构建 H5
4. 同步 Android
5. 打开 Android Studio

---

### build-android-apk.sh（Mac/Linux）
**功能**：一键构建脚本

**使用方法**：
```bash
bash build-android-apk.sh
```

**包含步骤**：
1. 检查环境
2. 安装依赖
3. 构建 H5
4. 同步 Android
5. 打开 Android Studio

---

## 🎯 推荐阅读顺序

### 初次构建用户
1. [LOCAL_BUILD_GUIDE.md](LOCAL_BUILD_GUIDE.md) - 完整指南
2. [BUILD_CHECKLIST.md](BUILD_CHECKLIST.md) - 检查清单
3. 构建过程中参考 [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

### 有经验用户
1. [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - 快速参考
2. 构建过程中参考 [BUILD_CHECKLIST.md](BUILD_CHECKLIST.md)

### 开发者
1. [ANDROID_BUILD_GUIDE.md](ANDROID_BUILD_GUIDE.md) - 技术文档
2. 需要时参考 [LOCAL_BUILD_GUIDE.md](LOCAL_BUILD_GUIDE.md)

### 需要在线构建
1. [ONLINE_BUILD_GUIDE.md](ONLINE_BUILD_GUIDE.md) - 在线构建文档

---

## 🔧 常见问题

### Q: 我该从哪个文档开始？
**A**: 如果你从未构建过 Android 应用，从 [LOCAL_BUILD_GUIDE.md](LOCAL_BUILD_GUIDE.md) 开始。如果你有经验，从 [QUICK_REFERENCE.md](QUICK_REFERENCE.md) 开始。

### Q: 构建需要多长时间？
**A**: 首次构建约 15 分钟（包括下载工具），后续构建约 10 分钟。

### Q: 需要安装哪些工具？
**A**:
- Java JDK 17
- Android Studio
- pnpm（项目依赖管理）

### Q: 可以在手机上直接构建吗？
**A**: 不可以。需要在电脑上构建，然后将 APK 安装到手机。

### Q: 构建失败怎么办？
**A**:
1. 查看错误信息
2. 参考对应文档的"常见问题"章节
3. 使用 [BUILD_CHECKLIST.md](BUILD_CHECKLIST.md) 诊断问题
4. 复制错误信息，告诉我帮你解决

### Q: APK 文件在哪里？
**A**:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Q: 如何分享 APK 给其他人？
**A**:
- 通过微信/QQ 发送文件
- 上传到云盘分享链接
- 发送到手机文件传输助手

### Q: 应用可以在 iOS 上运行吗？
**A**: 目前只支持 Android。如需 iOS 支持，需要配置 iOS 平台。

---

## 📞 获取帮助

如果遇到问题：

1. **查看文档**
   - 先查看对应文档的"常见问题"章节
   - 使用 [BUILD_CHECKLIST.md](BUILD_CHECKLIST.md) 诊断问题

2. **收集信息**
   - 复制完整的错误信息
   - 记录执行步骤
   - 说明操作系统版本

3. **寻求帮助**
   - 将错误信息和问题描述发给我
   - 我会帮你解决问题

---

## 🎉 开始构建

准备好了吗？选择一个文档开始：

- ⚡ **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - 快速参考卡
- 📖 **[LOCAL_BUILD_GUIDE.md](LOCAL_BUILD_GUIDE.md)** - 超详细完整指南
- ✅ **[BUILD_CHECKLIST.md](BUILD_CHECKLIST.md)** - 构建状态检查清单

**祝你构建成功！** 🚀
