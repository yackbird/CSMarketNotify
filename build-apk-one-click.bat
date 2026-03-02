@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

REM ========================================
REM CSMarketNotify Android APK 一键构建脚本 (Windows 增强版)
REM ========================================

title CSMarketNotify Android APK 构建脚本

:: 颜色定义
set "GREEN=[92m"
set "RED=[91m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "RESET=[0m"
set "BRIGHT=[1m"

:: 计时开始
set START_TIME=%time%

echo.
echo %BRIGHT%%BLUE%╔════════════════════════════════════════════════════════════╗%RESET%
echo %BRIGHT%%BLUE%║%RESET%                                                          %BRIGHT%%BLUE%║%RESET%
echo %BRIGHT%%BLUE%║%RESET%      %GREEN%🚀 CSMarketNotify Android APK 一键构建脚本%RESET%          %BRIGHT%%BLUE%║%RESET%
echo %BRIGHT%%BLUE%║%RESET%                                                          %BRIGHT%%BLUE%║%RESET%
echo %BRIGHT%%BLUE%╚════════════════════════════════════════════════════════════╝%RESET%
echo.

:: 检查当前目录
if not exist "package.json" (
    echo %RED%❌ 错误：未找到 package.json 文件%RESET%
    echo %YELLOW%请在 CSMarketNotify 项目根目录下运行此脚本%RESET%
    pause
    exit /b 1
)

echo %BLUE%📍 当前目录：%cd%%RESET%
echo.

:: ========================================
:: 第 1 步：环境检查
:: ========================================
echo %BRIGHT%%BLUE%[1/6] 环境检查...%RESET%
echo.

:: 检查 Java
echo %BLUE%  检查 Java...%RESET%
where java >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo %RED%    ❌ 未找到 Java%RESET%
    echo %YELLOW%    请安装 Java JDK 17：https://adoptium.net/%RESET%
    pause
    exit /b 1
)
echo %GREEN%    ✅ Java 已安装%RESET%
for /f "tokens=3" %%i in ('java -version 2^>^&1 ^| findstr /i "version"') do (
    echo %BLUE%    版本：%%i%RESET%
)
echo.

:: 检查 ADB
echo %BLUE%  检查 ADB（Android Debug Bridge）...%RESET%
where adb >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo %YELLOW%    ⚠️  未找到 ADB（但可以继续构建）%RESET%
    echo %YELLOW%    如需安装到手机，请安装 Android Studio%RESET%
) else (
    echo %GREEN%    ✅ ADB 已安装%RESET%
    for /f "tokens=3" %%i in ('adb version 2^>^&1 ^| findstr /i "version"') do (
        echo %BLUE%    版本：%%i%RESET%
    )
)
echo.

:: 检查 pnpm
echo %BLUE%  检查 pnpm...%RESET%
where pnpm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo %RED%    ❌ 未找到 pnpm%RESET%
    echo %YELLOW%    正在安装 pnpm...%RESET%
    call npm install -g pnpm
    if %ERRORLEVEL% neq 0 (
        echo %RED%    pnpm 安装失败%RESET%
        pause
        exit /b 1
    )
)
echo %GREEN%    ✅ pnpm 已安装%RESET%
for /f "tokens=*" %%i in ('pnpm --version') do (
    echo %BLUE%    版本：%%i%RESET%
)
echo.

:: 检查 Node.js
echo %BLUE%  检查 Node.js...%RESET%
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo %RED%    ❌ 未找到 Node.js%RESET%
    echo %YELLOW%    请安装 Node.js：https://nodejs.org/%RESET%
    pause
    exit /b 1
)
echo %GREEN%    ✅ Node.js 已安装%RESET%
for /f "tokens=*" %%i in ('node --version') do (
    echo %BLUE%    版本：%%i%RESET%
)
echo.

echo %GREEN%✅ 环境检查完成%RESET%
echo.

:: ========================================
:: 第 2 步：安装项目依赖
:: ========================================
echo %BRIGHT%%BLUE%[2/6] 安装项目依赖...%RESET%
echo.

if exist "node_modules\" (
    echo %YELLOW%  检测到 node_modules 目录，跳过依赖安装%RESET%
) else (
    echo %BLUE%  正在安装依赖（可能需要几分钟）...%RESET%
    call pnpm install
    if %ERRORLEVEL% neq 0 (
        echo %RED%  ❌ 依赖安装失败%RESET%
        pause
        exit /b 1
    )
)

echo %GREEN%✅ 依赖安装完成%RESET%
echo.

:: ========================================
:: 第 3 步：构建 H5 应用
:: ========================================
echo %BRIGHT%%BLUE%[3/6] 构建 H5 应用...%RESET%
echo.

echo %BLUE%  正在构建 H5 应用...%RESET%
call pnpm build:web
if %ERRORLEVEL% neq 0 (
    echo %RED%  ❌ H5 构建失败%RESET%
    pause
    exit /b 1
)

if not exist "dist-web\" (
    echo %RED%  ❌ dist-web 目录未生成%RESET%
    pause
    exit /b 1
)

echo %GREEN%✅ H5 构建完成%RESET%
echo.

:: ========================================
:: 第 4 步：同步到 Android 项目
:: ========================================
echo %BRIGHT%%BLUE%[4/6] 同步到 Android 项目...%RESET%
echo.

echo %BLUE%  正在同步到 Android 项目...%RESET%
call npx cap sync android
if %ERRORLEVEL% neq 0 (
    echo %RED%  ❌ 同步失败%RESET%
    pause
    exit /b 1
)

echo %GREEN%✅ 同步完成%RESET%
echo.

:: ========================================
:: 第 5 步：打开 Android Studio
:: ========================================
echo %BRIGHT%%BLUE%[5/6] 打开 Android Studio...%RESET%
echo.

echo %BLUE%  正在打开 Android Studio...%RESET%
call npx cap open android

echo %GREEN%✅ Android Studio 已打开%RESET%
echo.

:: ========================================
:: 第 6 步：构建说明
:: ========================================
echo %BRIGHT%%BLUE%[6/6] 构建说明%RESET%
echo.

echo %BRIGHT%%YELLOW%╔════════════════════════════════════════════════════════════╗%RESET%
echo %BRIGHT%%YELLOW%║%RESET%  %BRIGHT%在 Android Studio 中执行以下步骤：%RESET%                     %BRIGHT%%YELLOW%║%RESET%
echo %BRIGHT%%YELLOW%╚════════════════════════════════════════════════════════════╝%RESET%
echo.
echo %GREEN%  1. 等待 Gradle 同步完成（首次可能需要 5-10 分钟）%RESET%
echo %GREEN%  2. 点击菜单：Build → Build Bundle(s) / APK(s) → Build APK(s)%RESET%
echo %GREEN%  3. 等待构建完成（约 2-3 分钟）%RESET%
echo %GREEN%  4. 点击通知中的 locate 链接找到 APK 文件%RESET%
echo.
echo %BRIGHT%%YELLOW%APK 文件位置：%RESET%
echo %BLUE%  android\app\build\outputs\apk\debug\app-debug.apk%RESET%
echo.

:: ========================================
:: 安装到手机（可选）
:: ========================================
echo %BRIGHT%%YELLOW%是否要安装到已连接的手机？(Y/N)%RESET%
choice /c YN /n /m "请输入 Y 或 N："
if %ERRORLEVEL% equ 1 (
    echo.
    echo %BLUE%  检查已连接的设备...%RESET%
    adb devices

    echo.
    set APK_PATH=android\app\build\outputs\apk\debug\app-debug.apk
    if not exist "%APK_PATH%" (
        echo %RED%  ⚠️  APK 文件不存在，请先在 Android Studio 中构建%RESET%
    ) else (
        echo %BLUE%  正在安装到手机...%RESET%
        call adb install -r "%APK_PATH%"
        if %ERRORLEVEL% equ 0 (
            echo %GREEN%  ✅ 安装成功！%RESET%
        ) else (
            echo %RED%  ❌ 安装失败%RESET%
        )
    )
)

:: ========================================
:: 完成
:: ========================================
echo.
echo %BRIGHT%%GREEN%╔════════════════════════════════════════════════════════════╗%RESET%
echo %BRIGHT%%GREEN%║%RESET%                     %BRIGHT%🎉 构建准备完成！%RESET%                    %BRIGHT%%GREEN%║%RESET%
echo %BRIGHT%%GREEN%╚════════════════════════════════════════════════════════════╝%RESET%
echo.
echo %BLUE%📖 详细文档：%RESET%
echo %BLUE%  - QUICK_REFERENCE.md       快速参考卡%RESET%
echo %BLUE%  - LOCAL_BUILD_GUIDE.md     完整构建指南%RESET%
echo %BLUE%  - BUILD_CHECKLIST.md       构建检查清单%RESET%
echo.
echo %BLUE%🌐 仓库地址：%RESET%
echo %BLUE%  https://github.com/yackbird/CSMarketNotify%RESET%
echo.

:: 计时结束
set END_TIME=%time%

echo %BRIGHT%%BLUE%执行时间：%RESET%
echo %BLUE%  开始：%START_TIME%%RESET%
echo %BLUE%  结束：%END_TIME%%RESET%
echo.

pause
