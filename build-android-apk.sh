#!/bin/bash

# Android APK 构建脚本
# 在本地电脑上运行

echo "🚀 CSMarketNotify Android APK 构建脚本"
echo "================================"
echo ""

# 检查必要工具
echo "📋 检查环境..."

if ! command -v java &> /dev/null; then
    echo "❌ 错误：未找到 Java"
    echo "请安装 Java JDK 17：https://adoptium.net/"
    exit 1
fi

echo "✅ Java 版本：$(java -version 2>&1 | head -1)"

if ! command -v pnpm &> /dev/null; then
    echo "❌ 错误：未找到 pnpm"
    echo "请安装 pnpm：npm install -g pnpm"
    exit 1
fi

echo "✅ pnpm 版本：$(pnpm --version)"

echo ""

# 步骤 1：安装依赖
echo "📦 安装依赖..."
pnpm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

echo "✅ 依赖安装完成"
echo ""

# 步骤 2：构建 H5 应用
echo "🔨 构建 H5 应用..."
pnpm build:web

if [ $? -ne 0 ]; then
    echo "❌ H5 构建失败"
    exit 1
fi

echo "✅ H5 构建完成"
echo ""

# 步骤 3：同步到 Android 项目
echo "🔄 同步到 Android 项目..."
npx cap sync android

if [ $? -ne 0 ]; then
    echo "❌ 同步失败"
    exit 1
fi

echo "✅ 同步完成"
echo ""

# 步骤 4：打开 Android Studio
echo "📱 打开 Android Studio..."
echo "请在 Android Studio 中："
echo "  1. 点击 Build → Build Bundle(s) / APK(s) → Build APK(s)"
echo "  2. 等待构建完成"
echo "  3. 点击通知中的 locate 链接找到 APK 文件"
echo ""

npx cap open android

echo ""
echo "✅ Android Studio 已打开"
echo ""
echo "📖 详细说明请查看：ANDROID_BUILD_GUIDE.md"
echo ""
echo "🎉 构建准备完成！"
