#!/bin/bash

# ========================================
# CSMarketNotify Android APK 一键构建脚本 (Mac/Linux 增强版 - 使用 npx)
# ========================================

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
BRIGHT='\033[1m'
RESET='\033[0m'

# 计时开始
START_TIME=$(date +%s)

echo ""
echo "${BRIGHT}${BLUE}╔════════════════════════════════════════════════════════════╗${RESET}"
echo "${BRIGHT}${BLUE}║${RESET}                                                          ${BRIGHT}${BLUE}║${RESET}"
echo "${BRIGHT}${BLUE}║${RESET}      ${GREEN}🚀 CSMarketNotify Android APK 一键构建脚本${RESET}          ${BRIGHT}${BLUE}║${RESET}"
echo "${BRIGHT}${BLUE}║${RESET}                                                          ${BRIGHT}${BLUE}║${RESET}"
echo "${BRIGHT}${BLUE}╚════════════════════════════════════════════════════════════╝${RESET}"
echo ""

# 检查当前目录
if [ ! -f "package.json" ]; then
    echo "${RED}❌ 错误：未找到 package.json 文件${RESET}"
    echo "${YELLOW}请在 CSMarketNotify 项目根目录下运行此脚本${RESET}"
    exit 1
fi

echo "${BLUE}📍 当前目录：$(pwd)${RESET}"
echo ""

# ========================================
# 第 1 步：环境检查
# ========================================
echo "${BRIGHT}${BLUE}[1/6] 环境检查...${RESET}"
echo ""

# 检查 Java
echo "${BLUE}  检查 Java...${RESET}"
if ! command -v java &> /dev/null; then
    echo "${RED}    ❌ 未找到 Java${RESET}"
    echo "${YELLOW}    请安装 Java JDK 17：https://adoptium.net/${RESET}"
    exit 1
fi
echo "${GREEN}    ✅ Java 已安装${RESET}"
java -version 2>&1 | head -n 1 | sed 's/^/    版本：/'
echo ""

# 检查 ADB
echo "${BLUE}  检查 ADB（Android Debug Bridge）...${RESET}"
if ! command -v adb &> /dev/null; then
    echo "${YELLOW}    ⚠️  未找到 ADB（但可以继续构建）${RESET}"
    echo "${YELLOW}    如需安装到手机，请安装 Android Studio${RESET}"
else
    echo "${GREEN}    ✅ ADB 已安装${RESET}"
    adb version | head -n 1 | sed 's/^/    版本：/'
fi
echo ""

# 检查 Node.js 和 npx
echo "${BLUE}  检查 Node.js 和 npx...${RESET}"
if ! command -v node &> /dev/null; then
    echo "${RED}    ❌ 未找到 Node.js${RESET}"
    echo "${YELLOW}    请安装 Node.js：https://nodejs.org/${RESET}"
    exit 1
fi

if ! command -v npx &> /dev/null; then
    echo "${RED}    ❌ 未找到 npx${RESET}"
    echo "${YELLOW}    npx 是 Node.js 的一部分，请确保 Node.js 正确安装${RESET}"
    exit 1
fi

echo "${GREEN}    ✅ Node.js 已安装${RESET}"
node --version | sed 's/^/    版本：/'

echo "${GREEN}    ✅ npx 已可用${RESET}"
echo ""

# 验证 pnpm（通过 npx）
echo "${BLUE}  检查 pnpm（通过 npx）...${RESET}"
if ! npx pnpm --version &> /dev/null; then
    echo "${RED}    ❌ 无法通过 npx 使用 pnpm${RESET}"
    echo "${YELLOW}    请检查网络连接${RESET}"
    exit 1
fi

echo "${GREEN}    ✅ pnpm 可通过 npx 使用${RESET}"
npx pnpm --version | sed 's/^/    版本：/'
echo ""

echo "${GREEN}✅ 环境检查完成${RESET}"
echo ""

# ========================================
# 第 2 步：安装项目依赖
# ========================================
echo "${BRIGHT}${BLUE}[2/6] 安装项目依赖...${RESET}"
echo ""

if [ -d "node_modules" ]; then
    echo "${YELLOW}  检测到 node_modules 目录，跳过依赖安装${RESET}"
else
    echo "${BLUE}  正在安装依赖（可能需要几分钟）...${RESET}"
    npx pnpm install
    if [ $? -ne 0 ]; then
        echo "${RED}  ❌ 依赖安装失败${RESET}"
        exit 1
    fi
fi

echo "${GREEN}✅ 依赖安装完成${RESET}"
echo ""

# ========================================
# 第 3 步：构建 H5 应用
# ========================================
echo "${BRIGHT}${BLUE}[3/6] 构建 H5 应用...${RESET}"
echo ""

echo "${BLUE}  正在构建 H5 应用...${RESET}"
npx pnpm build:web
if [ $? -ne 0 ]; then
    echo "${RED}  ❌ H5 构建失败${RESET}"
    exit 1
fi

if [ ! -d "dist-web" ]; then
    echo "${RED}  ❌ dist-web 目录未生成${RESET}"
    exit 1
fi

echo "${GREEN}✅ H5 构建完成${RESET}"
echo ""

# ========================================
# 第 4 步：同步到 Android 项目
# ========================================
echo "${BRIGHT}${BLUE}[4/6] 同步到 Android 项目...${RESET}"
echo ""

echo "${BLUE}  正在同步到 Android 项目...${RESET}"
npx cap sync android
if [ $? -ne 0 ]; then
    echo "${RED}  ❌ 同步失败${RESET}"
    exit 1
fi

echo "${GREEN}✅ 同步完成${RESET}"
echo ""

# ========================================
# 第 5 步：打开 Android Studio
# ========================================
echo "${BRIGHT}${BLUE}[5/6] 打开 Android Studio...${RESET}"
echo ""

echo "${BLUE}  正在打开 Android Studio...${RESET}"
npx cap open android

echo "${GREEN}✅ Android Studio 已打开${RESET}"
echo ""

# ========================================
# 第 6 步：构建说明
# ========================================
echo "${BRIGHT}${BLUE}[6/6] 构建说明...${RESET}"
echo ""

echo "${BRIGHT}${YELLOW}╔════════════════════════════════════════════════════════════╗${RESET}"
echo "${BRIGHT}${YELLOW}║${RESET}  ${BRIGHT}在 Android Studio 中执行以下步骤：${RESET}                     ${BRIGHT}${YELLOW}║${RESET}"
echo "${BRIGHT}${YELLOW}╚════════════════════════════════════════════════════════════╝${RESET}"
echo ""
echo "${GREEN}  1. 等待 Gradle 同步完成（首次可能需要 5-10 分钟）${RESET}"
echo "${GREEN}  2. 点击菜单：Build → Build Bundle(s) / APK(s) → Build APK(s)${RESET}"
echo "${GREEN}  3. 等待构建完成（约 2-3 分钟）${RESET}"
echo "${GREEN}  4. 点击通知中的 locate 链接找到 APK 文件${RESET}"
echo ""
echo "${BRIGHT}${YELLOW}APK 文件位置：${RESET}"
echo "${BLUE}  android/app/build/outputs/apk/debug/app-debug.apk${RESET}"
echo ""

# ========================================
# 安装到手机（可选）
# ========================================
if command -v adb &> /dev/null; then
    echo "${BRIGHT}${YELLOW}是否要安装到已连接的手机？(y/n)${RESET}"
    read -r -p "请输入 y 或 n：" answer

    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        echo ""
        echo "${BLUE}  检查已连接的设备...${RESET}"
        adb devices

        echo ""
        APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
        if [ ! -f "$APK_PATH" ]; then
            echo "${RED}  ⚠️  APK 文件不存在，请先在 Android Studio 中构建${RESET}"
        else
            echo "${BLUE}  正在安装到手机...${RESET}"
            adb install -r "$APK_PATH"
            if [ $? -eq 0 ]; then
                echo "${GREEN}  ✅ 安装成功！${RESET}"
            else
                echo "${RED}  ❌ 安装失败${RESET}"
            fi
        fi
    fi
fi

# ========================================
# 完成
# ========================================
echo ""
echo "${BRIGHT}${GREEN}╔════════════════════════════════════════════════════════════╗${RESET}"
echo "${BRIGHT}${GREEN}║${RESET}                     ${BRIGHT}🎉 构建准备完成！${RESET}                    ${BRIGHT}${GREEN}║${RESET}"
echo "${BRIGHT}${GREEN}╚════════════════════════════════════════════════════════════╝${RESET}"
echo ""
echo "${BLUE}📖 详细文档：${RESET}"
echo "${BLUE}  - QUICK_REFERENCE.md       快速参考卡${RESET}"
echo "${BLUE}  - LOCAL_BUILD_GUIDE.md     完整构建指南${RESET}"
echo "${BLUE}  - BUILD_CHECKLIST.md       构建检查清单${RESET}"
echo ""
echo "${BLUE}🌐 仓库地址：${RESET}"
echo "${BLUE}  https://github.com/yackbird/CSMarketNotify${RESET}"
echo ""

# 计时结束
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
MINUTES=$((DURATION / 60))
SECONDS=$((DURATION % 60))

echo "${BRIGHT}${BLUE}执行时间：${RESET}"
echo "${BLUE}  总耗时：${MINUTES} 分 ${SECONDS} 秒${RESET}"
echo ""

echo "${GREEN}完成！${RESET}"
