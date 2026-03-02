# 🚀 一键构建脚本使用说明

## 📦 提供的构建工具

我已经为你准备了三种构建方式：

### 1️⃣ Windows 批处理脚本（推荐）⚡
- **文件名**：`build-apk-one-click.bat`
- **适用系统**：Windows 10/11
- **特点**：简单直接，双击即可运行
- **包含功能**：环境检查、依赖安装、H5 构建、Android 同步、可选安装到手机

### 2️⃣ Mac/Linux Shell 脚本
- **文件名**：`build-apk-one-click.sh`
- **适用系统**：macOS、Linux
- **特点**：命令行界面，功能完整
- **包含功能**：环境检查、依赖安装、H5 构建、Android 同步、可选安装到手机

### 3️⃣ 可执行文件打包工具
- **文件名**：`package-executable.py`
- **适用系统**：Windows/Mac/Linux（需要 Python）
- **特点**：打包成独立的 .exe 或可执行文件
- **输出文件**：CSMarketNotify-APK-Builder（约 15-25 MB）

---

## 🎯 使用方式

### 方式 1：直接运行脚本（最简单）

#### Windows 用户
1. 找到 `build-apk-one-click.bat` 文件
2. 双击运行
3. 脚本会自动完成所有步骤
4. 在 Android Studio 中构建 APK

#### Mac/Linux 用户
1. 找到 `build-apk-one-click.sh` 文件
2. 添加执行权限：
   ```bash
   chmod +x build-apk-one-click.sh
   ```
3. 运行脚本：
   ```bash
   ./build-apk-one-click.sh
   ```
4. 脚本会自动完成所有步骤
5. 在 Android Studio 中构建 APK

---

### 方式 2：打包成独立可执行文件

如果你想要一个真正的可执行文件（.exe），可以使用打包工具。

#### 步骤 1：运行打包脚本
```bash
python package-executable.py
```

#### 步骤 2：等待打包完成
- 脚本会自动检查环境
- 安装 PyInstaller（如果未安装）
- 创建构建脚本
- 打包成可执行文件
- 清理临时文件

#### 步骤 3：使用生成的可执行文件

**Windows**：
1. 在 `dist` 目录找到 `CSMarketNotify-APK-Builder.exe`
2. 双击运行
3. 脚本会自动完成所有步骤

**Mac/Linux**：
1. 在 `dist` 目录找到 `CSMarketNotify-APK-Builder`
2. 添加执行权限：
   ```bash
   chmod +x dist/CSMarketNotify-APK-Builder
   ```
3. 运行：
   ```bash
   ./dist/CSMarketNotify-APK-Builder
   ```

---

## 📋 脚本功能详解

### 环境检查
- ✅ 检查 Java 版本（需要 JDK 17+）
- ✅ 检查 ADB（Android Debug Bridge）
- ✅ 检查 pnpm（包管理器）
- ✅ 检查 Node.js（运行环境）

### 自动化流程
1. **安装依赖**：自动安装项目依赖（pnpm install）
2. **构建 H5**：自动构建 H5 应用（pnpm build:web）
3. **同步 Android**：自动同步到 Android 项目（npx cap sync android）
4. **打开 Android Studio**：自动打开 Android Studio（npx cap open android）

### 可选功能
- **安装到手机**：检测已连接的 Android 设备，可选安装 APK
- **错误处理**：每个步骤都有错误检测和提示
- **进度显示**：清晰显示当前执行步骤和进度

---

## 🎨 界面预览

### Windows 版本界面
```
╔════════════════════════════════════════════════════════════╗
║                                                          ║
║      🚀 CSMarketNotify Android APK 一键构建脚本          ║
║                                                          ║
╚════════════════════════════════════════════════════════════╝

📍 当前目录：D:\workspace\CSMarketNotify

[1/6] 环境检查...
  检查 Java...
    ✅ Java 已安装
    版本：17.0.10
  检查 ADB...
    ✅ ADB 已安装
    版本：1.0.41
  检查 pnpm...
    ✅ pnpm 已安装
    版本：9.15.0
  检查 Node.js...
    ✅ Node.js 已安装
    版本：v20.18.2

✅ 环境检查完成

[2/6] 安装项目依赖...
  正在安装依赖（可能需要几分钟）...
✅ 依赖安装完成

[3/6] 构建 H5 应用...
  正在构建 H5 应用...
✅ H5 构建完成

[4/6] 同步到 Android 项目...
  正在同步到 Android 项目...
✅ 同步完成

[5/6] 打开 Android Studio...
  正在打开 Android Studio...
✅ Android Studio 已打开

[6/6] 构建说明...
╔════════════════════════════════════════════════════════════╗
║  在 Android Studio 中执行以下步骤：                       ║
╚════════════════════════════════════════════════════════════╝

  1. 等待 Gradle 同步完成（首次可能需要 5-10 分钟）
  2. 点击菜单：Build → Build Bundle(s) / APK(s) → Build APK(s)
  3. 等待构建完成（约 2-3 分钟）
  4. 点击通知中的 locate 链接找到 APK 文件

APK 文件位置：
  android\app\build\outputs\apk\debug\app-debug.apk

╔════════════════════════════════════════════════════════════╗
║                     🎉 构建准备完成！                      ║
╚════════════════════════════════════════════════════════════╝
```

---

## ⚠️ 注意事项

### 前置要求
1. **Java JDK 17**：必须安装
   - 下载地址：https://adoptium.net/
   - 选择：Eclipse Temurin 17 + JDK

2. **Android Studio**：必须安装
   - 下载地址：https://developer.android.com/studio
   - 首次启动需要下载 SDK（5-10 分钟）

3. **Node.js**：如果未安装会自动提示
   - 下载地址：https://nodejs.org/

### 常见问题

#### Q1: 提示 "未找到 Java"
**A**: 请安装 Java JDK 17，并确保正确配置环境变量。

#### Q2: 提示 "未找到 pnpm"
**A**: 脚本会自动安装 pnpm，或手动运行：
```bash
npm install -g pnpm
```

#### Q3: Gradle 同步失败
**A**:
1. 检查网络连接
2. 如果在国内，配置 Gradle 镜像（见 LOCAL_BUILD_GUIDE.md）
3. 点击 Android Studio 的 "Try Again"

#### Q4: 构建失败
**A**:
1. 查看 Android Studio 的 Build 选项卡
2. 查看错误信息
3. 运行清理命令：
   ```bash
   cd android
   ./gradlew clean
   ```

#### Q5: 打包可执行文件失败
**A**:
1. 确保已安装 Python 3.7+
2. 确保有网络连接（下载 PyInstaller）
3. 查看 Python 错误信息

---

## 🔄 更新与维护

### 如何更新脚本
1. 从 GitHub 拉取最新代码：
   ```bash
   git pull origin cs-market-monitor
   ```

2. 重新打包可执行文件（如果使用方式 2）：
   ```bash
   python package-executable.py
   ```

### 如何自定义脚本
- Windows 脚本：编辑 `build-apk-one-click.bat`
- Mac/Linux 脚本：编辑 `build-apk-one-click.sh`
- 打包工具：编辑 `package-executable.py`

---

## 📞 获取帮助

如果遇到问题：

1. **查看文档**
   - [LOCAL_BUILD_GUIDE.md](LOCAL_BUILD_GUIDE.md) - 完整构建指南
   - [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - 快速参考卡
   - [BUILD_CHECKLIST.md](BUILD_CHECKLIST.md) - 构建检查清单

2. **收集信息**
   - 复制完整的错误信息
   - 记录操作系统版本
   - 记录脚本输出

3. **寻求帮助**
   - 将错误信息发给我
   - 我会帮你解决问题

---

## 🎉 开始使用

**Windows 用户**：
```bash
# 方式 1：双击运行 build-apk-one-click.bat

# 方式 2：打包成 .exe
python package-executable.py
```

**Mac/Linux 用户**：
```bash
# 方式 1：运行脚本
chmod +x build-apk-one-click.sh
./build-apk-one-click.sh

# 方式 2：打包成可执行文件
python package-executable.py
```

---

**祝你构建成功！** 🚀
