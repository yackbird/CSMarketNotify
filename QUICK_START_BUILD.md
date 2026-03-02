# ⚡ 一键构建脚本 - 快速开始

## 🎯 三种使用方式

### 方式 1：Windows 双击运行（最简单）⚡

1. 找到 `build-apk-one-click.bat` 文件
2. **双击运行**
3. 等待自动完成所有步骤
4. 在 Android Studio 中点击 "Build APK(s)"
5. 完成！

---

### 方式 2：Mac/Linux 命令行运行

1. 添加执行权限：
   ```bash
   chmod +x build-apk-one-click.sh
   ```

2. 运行脚本：
   ```bash
   ./build-apk-one-click.sh
   ```

3. 在 Android Studio 中点击 "Build APK(s)"
4. 完成！

---

### 方式 3：打包成独立可执行文件

1. 运行打包脚本：
   ```bash
   python package-executable.py
   ```

2. 等待打包完成（约 2-3 分钟）

3. 使用生成的可执行文件：
   - **Windows**: 双击 `dist/CSMarketNotify-APK-Builder.exe`
   - **Mac/Linux**: 运行 `./dist/CSMarketNotify-APK-Builder`

4. 在 Android Studio 中点击 "Build APK(s)"
5. 完成！

---

## ✅ 脚本会自动做什么？

1. ✅ 检查环境（Java、ADB、pnpm、Node.js）
2. ✅ 安装项目依赖
3. ✅ 构建 H5 应用
4. ✅ 同步到 Android 项目
5. ✅ 打开 Android Studio
6. ✅ 可选：安装到已连接的手机

---

## 📋 前置要求

**必须安装**：
- Java JDK 17：https://adoptium.net/
- Android Studio：https://developer.android.com/studio

**可选安装**：
- Node.js：如果未安装会自动提示

---

## 🎉 完成！

脚本运行完成后，只需在 Android Studio 中：

1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. 点击 locate 找到 APK 文件
3. 安装到手机

---

## 📖 详细文档

- [BUILD_SCRIPTS_GUIDE.md](BUILD_SCRIPTS_GUIDE.md) - 完整使用说明
- [LOCAL_BUILD_GUIDE.md](LOCAL_BUILD_GUIDE.md) - 详细构建指南
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - 快速参考卡

---

**现在就开始吧！** 🚀
