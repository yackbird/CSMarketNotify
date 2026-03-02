# 📱 CSMarketNotify Android APK 本地构建超详细指南

## 🎯 总览

构建一个可安装到 Android 手机的 APK 文件，总共需要 **10-15 分钟**。

---

## 📋 准备工作（5 分钟）

### 步骤 1：下载项目（30 秒）

1. 点击这个链接下载项目（272KB）：
   ```
   https://db3da4c8-8fa1-495c-ace9-6439bb93d07d.dev.coze.site/api/download/code
   ```

2. 文件名：`CSMarketNotify.tar.gz`

3. 下载完成后，将文件放到你想存放的目录（建议放在 `D:\workspace\`）

---

### 步骤 2：解压文件（10 秒）

#### Windows 用户
1. 右键点击 `CSMarketNotify.tar.gz`
2. 选择 "解压到 CSMarketNotify"
3. 如果没有解压软件，下载 7-Zip：https://www.7-zip.org/

#### Mac/Linux 用户
1. 双击 `CSMarketNotify.tar.gz`
2. 或者运行：
   ```bash
   tar -xzf CSMarketNotify.tar.gz
   ```

---

### 步骤 3：安装 Java JDK（2 分钟）

#### 下载 Java

1. 访问：https://adoptium.net/
2. 点击 "Download" 按钮
3. 选择：
   - Version: **Eclipse Temurin 17**
   - Operating System: **Windows**（或你的系统）
   - Architecture: **x64**
   - Package Type: **JDK**
   - 点击下载 `.msi` 文件

#### 安装 Java

1. 双击下载的 `.msi` 文件
2. 点击 "Next" → "Next" → "Install"
3. 等待安装完成
4. 点击 "Close"

#### 验证安装

打开 **命令提示符**（cmd）或 **PowerShell**：

```bash
java -version
```

应该看到类似这样的输出：
```
openjdk version "17.0.x"
```

---

### 步骤 4：安装 Android Studio（2 分钟）

#### 下载 Android Studio

1. 访问：https://developer.android.com/studio
2. 点击 "Download Android Studio"
3. 下载完成后，双击安装程序

#### 安装 Android Studio

1. 双击安装程序
2. 点击 "Next" → 勾选 "Android Virtual Device" → "Next"
3. 选择安装路径（默认即可）→ "Next" → "Install"
4. 等待安装完成 → "Next" → "Finish"

#### 首次启动配置

1. 启动 Android Studio
2. 选择 "Standard" → "Next"
3. 选择主题（Dark 或 Light）→ "Next"
4. 等待下载组件（可能需要 5-10 分钟）
5. 点击 "Finish"

#### 验证安装

打开 **命令提示符**：

```bash
adb version
```

应该看到版本信息。

---

## 🚀 开始构建（5-10 分钟）

### 步骤 5：进入项目目录

打开 **命令提示符**（cmd）或 **PowerShell**：

```bash
# 进入项目目录
cd D:\workspace\CSMarketNotify

# 如果解压后文件夹名不同，使用实际名称
# cd D:\workspace\CSMarketNotify
```

**验证**：运行 `ls`（Windows 用 `dir`），应该能看到 `package.json` 文件。

---

### 步骤 6：安装项目依赖（1-2 分钟）

```bash
pnpm install
```

如果提示 `pnpm: command not found`，先安装 pnpm：

```bash
npm install -g pnpm
```

等待安装完成，会看到类似这样的输出：
```
Done in 45s
```

---

### 步骤 7：构建 H5 应用（30 秒）

```bash
pnpm build:web
```

等待构建完成，会看到：
```
✓ built in 30s
```

---

### 步骤 8：同步到 Android 项目（30 秒）

```bash
npx cap sync android
```

等待同步完成，会看到：
```
✔ sync finished in 0.158s
```

---

### 步骤 9：打开 Android Studio（自动）

```bash
npx cap open android
```

这会自动打开 Android Studio。

---

### 步骤 10：在 Android Studio 中构建 APK（5-8 分钟）

#### 10.1 等待 Gradle 同步

1. Android Studio 打开后，右下角会显示 "Gradle sync running..."
2. 等待同步完成（首次可能需要 5-10 分钟）
3. 同步完成后，左下角会出现 "Build" 选项卡

#### 10.2 构建 Debug APK

1. 点击顶部菜单 **Build**
2. 选择 **Build Bundle(s) / APK(s)**
3. 选择 **Build APK(s)**
4. 等待构建完成（约 2-3 分钟）

#### 10.3 找到 APK 文件

构建完成后：
1. 右下角会弹出一个通知：**Build APK(s) succeeded**
2. 点击通知中的 **locate** 链接
3. 或者点击菜单 **Build** → **Locate Build**
4. 文件管理器会打开，显示 APK 文件

APK 文件位置：
```
D:\workspace\CSMarketNotify\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📱 安装到手机（1 分钟）

### 方式 1：通过 USB 连接（推荐）

1. 用 USB 数据线连接手机到电脑
2. 手机上允许 USB 调试：
   - 打开手机设置
   - 进入 **关于手机**
   - 连续点击 **版本号** 7 次，启用开发者模式
   - 返回设置 → **系统** → **开发者选项**
   - 开启 **USB 调试**
3. 在电脑上打开命令提示符：
   ```bash
   adb devices
   ```
   应该能看到你的设备列表
4. 安装 APK：
   ```bash
   adb install app-debug.apk
   ```
5. 手机上会显示安装成功

### 方式 2：通过文件传输

1. 用 USB 连接手机
2. 在手机上选择 "文件传输" 模式
3. 复制 `app-debug.apk` 到手机存储
4. 在手机文件管理器中找到 APK 文件
5. 点击安装
6. 允许安装未知来源应用（如果提示）
7. 安装完成

### 方式 3：通过微信/QQ 传输

1. 将 APK 文件发送到微信文件传输助手
2. 在手机上下载
3. 点击安装
4. 允许安装
5. 完成

---

## ✅ 完成！

现在你可以在手机上打开 **CS价格监控** 应用了！

---

## 🔧 常见问题解决

### Q1: 提示 "java: command not found"

**A**: Java 未安装或环境变量未配置

**解决**:
1. 重新安装 Java JDK
2. 配置环境变量：
   - 右键 "此电脑" → 属性 → 高级系统设置
   - 环境变量 → 系统变量
   - 新建 `JAVA_HOME`，值为 Java 安装路径（如 `C:\Program Files\Eclipse Adoptium\jdk-17.0.x-hotspot`）
   - 编辑 `Path`，添加 `%JAVA_HOME%\bin`

### Q2: 提示 "adb: command not found"

**A**: Android SDK 未配置

**解决**:
1. 打开 Android Studio
2. 点击 **SDK Manager**
3. SDK Tools 选项卡
4. 勾选 "Android SDK Platform-Tools"
5. 点击 Apply → OK
6. 配置环境变量：
   - 新建 `ANDROID_HOME`，值为 Android SDK 路径（如 `C:\Users\你的用户名\AppData\Local\Android\Sdk`）
   - 编辑 `Path`，添加 `%ANDROID_HOME%\platform-tools` 和 `%ANDROID_HOME%\tools`

### Q3: Gradle 同步失败

**A**: 网络问题或防火墙限制

**解决**:
1. 检查网络连接
2. 如果在国内，配置 Gradle 镜像：
   - 编辑 `android/build.gradle`，添加：
   ```gradle
   repositories {
       maven { url 'https://maven.aliyun.com/repository/google' }
       maven { url 'https://maven.aliyun.com/repository/public' }
       google()
       mavenCentral()
   }
   ```
3. 点击 "Try Again"

### Q4: 构建失败，提示编译错误

**A**: 代码问题或依赖问题

**解决**:
1. 点击 Android Studio 底部的 "Build" 选项卡
2. 查看错误信息
3. 尝试：
   ```bash
   # 清理构建缓存
   cd android
   ./gradlew clean
   # 重新构建
   ./gradlew assembleDebug
   ```

### Q5: 安装失败，提示 "禁止安装"

**A**: 手机安全限制

**解决**:
1. 打开手机设置
2. 进入 **安全**
3. 允许 **安装未知来源应用**
4. 或者在安装 APK 时，点击 **设置** → **允许此来源**
5. 重新安装

### Q6: 应用打开后白屏

**A**: 网络问题或后端地址配置错误

**解决**:
1. 检查手机网络连接
2. 确保能访问后端服务
3. 或者修改 `src/network.ts` 中的后端地址为你的实际后端地址

### Q7: 应用闪退

**A**: 版本兼容问题

**解决**:
1. 检查 Android 版本（需要 Android 5.0+）
2. 查看 Android Studio 的 Logcat 日志
3. 确保所有依赖正确安装

---

## 📞 需要帮助？

如果遇到其他问题：

1. 查看完整文档：`ANDROID_BUILD_GUIDE.md`
2. 查看快速指南：`QUICK_BUILD.md`
3. 检查 Android Studio 的 Build 选项卡的错误信息
4. 复制错误信息，告诉我帮你解决

---

## 🎉 享受你的 CS 价格监控应用！

祝你构建成功！有问题随时问我！🚀
