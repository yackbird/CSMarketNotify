@echo off
REM Android APK 构建脚本 (Windows 版本)

echo.
echo 🚀 CSMarketNotify Android APK 构建脚本
echo ========================================
echo.

REM 检查 Java
where java >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ 错误：未找到 Java
    echo 请安装 Java JDK 17：https://adoptium.net/
    pause
    exit /b 1
)

echo ✅ Java 版本：
java -version
echo.

REM 检查 pnpm
where pnpm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ 错误：未找到 pnpm
    echo 请安装 pnpm：npm install -g pnpm
    pause
    exit /b 1
)

echo ✅ pnpm 版本：
pnpm --version
echo.

REM 步骤 1：安装依赖
echo 📦 安装依赖...
call pnpm install
if %ERRORLEVEL% neq 0 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)
echo ✅ 依赖安装完成
echo.

REM 步骤 2：构建 H5 应用
echo 🔨 构建 H5 应用...
call pnpm build:web
if %ERRORLEVEL% neq 0 (
    echo ❌ H5 构建失败
    pause
    exit /b 1
)
echo ✅ H5 构建完成
echo.

REM 步骤 3：同步到 Android 项目
echo 🔄 同步到 Android 项目...
call npx cap sync android
if %ERRORLEVEL% neq 0 (
    echo ❌ 同步失败
    pause
    exit /b 1
)
echo ✅ 同步完成
echo.

REM 步骤 4：打开 Android Studio
echo 📱 打开 Android Studio...
echo.
echo 请在 Android Studio 中：
echo   1. 点击 Build → Build Bundle(s) / APK(s) → Build APK(s)
echo   2. 等待构建完成
echo   3. 点击通知中的 locate 链接找到 APK 文件
echo.

call npx cap open android

echo.
echo ✅ Android Studio 已打开
echo.
echo 📖 详细说明请查看：ANDROID_BUILD_GUIDE.md
echo.
echo 🎉 构建准备完成！
echo.
pause
