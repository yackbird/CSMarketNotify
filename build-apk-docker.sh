#!/bin/bash

# CSMarketNotify Android APK 一键构建脚本（Docker 版本）
# 使用 Docker 构建，无需配置 Java 和 Android SDK

echo "🚀 CSMarketNotify Android APK 一键构建脚本"
echo "==================================="
echo ""

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ 错误：未找到 Docker"
    echo ""
    echo "请先安装 Docker："
    echo "  Windows: https://docs.docker.com/desktop/install/windows/"
    echo "  Mac: https://docs.docker.com/desktop/install/mac/"
    echo "  Linux: https://docs.docker.com/engine/install/"
    echo ""
    exit 1
fi

echo "✅ Docker 已安装"
echo ""

# 检查项目文件
if [ ! -f "package.json" ]; then
    echo "❌ 错误：未找到 package.json"
    echo "请在项目根目录运行此脚本"
    exit 1
fi

echo "✅ 项目文件检查通过"
echo ""

# 构建 Docker 镜像
echo "📦 构建 Docker 镜像..."
echo "第一次运行需要下载约 500MB，请耐心等待..."
echo ""

docker build -f Dockerfile.android -t csmarket-android-builder . || {
    echo "❌ Docker 镜像构建失败"
    exit 1
}

echo "✅ Docker 镜像构建完成"
echo ""

# 安装依赖
echo "📦 安装项目依赖..."
docker run --rm -v "$(pwd):/app" csmarket-android-builder bash -c "cd /app && npm install -g pnpm@latest && pnpm install" || {
    echo "❌ 依赖安装失败"
    exit 1
}

echo "✅ 依赖安装完成"
echo ""

# 构建 H5 应用
echo "🔨 构建 H5 应用..."
docker run --rm -v "$(pwd):/app" csmarket-android-builder bash -c "cd /app && pnpm build:web" || {
    echo "❌ H5 构建失败"
    exit 1
}

echo "✅ H5 构建完成"
echo ""

# 同步到 Android 项目
echo "🔄 同步到 Android 项目..."
docker run --rm -v "$(pwd):/app" -w /app csmarket-android-builder bash -c "npm install && npx cap sync android" || {
    echo "❌ Android 同步失败"
    exit 1
}

echo "✅ Android 同步完成"
echo ""

# 构建 APK
echo "📱 构建 APK..."
echo "这可能需要 2-5 分钟，请耐心等待..."
echo ""

docker run --rm -v "$(pwd):/app" -w /app/android csmarket-android-builder bash -c "./gradlew assembleDebug" || {
    echo "❌ APK 构建失败"
    exit 1
}

echo "✅ APK 构建完成"
echo ""

# 复制 APK 到根目录
echo "📦 复制 APK 文件..."
cp android/app/build/outputs/apk/debug/app-debug.apk ./CSMarketNotify.apk

echo ""
echo "✅✅✅ 构建成功！"
echo ""
echo "📱 APK 文件位置：$(pwd)/CSMarketNotify.apk"
echo "📦 文件大小：$(du -h CSMarketNotify.apk | cut -f1)"
echo ""
echo "📲 安装到手机："
echo "  adb install CSMarketNotify.apk"
echo ""
echo "🎉 享受你的 CS 价格监控应用！"
echo ""
