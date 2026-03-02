#!/bin/bash

# 推送到 GitHub 脚本
# 使用代理加速

echo "🚀 准备推送到 GitHub..."
echo "📦 仓库: https://github.com/yackbird/TDSimulator.git"
echo ""

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：未找到 package.json 文件"
    echo "请在 CSMarketNotify 根目录下运行此脚本"
    exit 1
fi

# 检查 Git 是否初始化
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git branch -M main
fi

echo "✅ Git 仓库已就绪"
echo ""

# 添加所有文件
echo "📝 添加文件到 Git..."
git add .

# 提交
echo "💾 提交更改..."
git commit -m "feat: CS 价格监控小程序

- 完整前后端源码
- 价格监控功能
- 预警设置功能
- 汇率查询功能
- 完整文档

技术栈：
- Taro 4 + React 18
- NestJS 10
- Supabase PostgreSQL
- Tailwind CSS" || echo "没有新的更改需要提交"

echo ""

# 检查是否已关联远程仓库
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")
TARGET_URL="https://github.com/yackbird/TDSimulator.git"

if [ "$REMOTE_URL" != "$TARGET_URL" ]; then
    echo "🔗 关联远程仓库..."
    git remote set-url origin "$TARGET_URL" 2>/dev/null || git remote add origin "$TARGET_URL"
fi

echo "✅ 远程仓库已配置: $TARGET_URL"
echo ""

echo "⬆️  开始推送到 GitHub..."
echo "💡 提示：使用代理加速"
echo "💡 如果需要，请输入 GitHub 用户名和 Token（不是登录密码）"
echo ""

# 使用代理推送（常见的代理端口）
PROXY_PORTS=("7890" "1080" "7891" "1087")
PUSH_SUCCESS=0

for PORT in "${PROXY_PORTS[@]}"; do
    echo "🔍 尝试使用端口 $PORT 的代理..."

    # 尝试 HTTP 代理
    git -c http.proxy=http://127.0.0.1:$PORT -c https.proxy=http://127.0.0.1:$PORT push -u origin main 2>/dev/null

    if [ $? -eq 0 ]; then
        echo "✅ 推送成功！（使用端口 $_PORT 的 HTTP 代理）"
        PUSH_SUCCESS=1
        break
    fi

    # 尝试 SOCKS5 代理
    git -c http.proxy=socks5://127.0.0.1:$PORT -c https.proxy=socks5://127.0.0.1:$PORT push -u origin main 2>/dev/null

    if [ $? -eq 0 ]; then
        echo "✅ 推送成功！（使用端口 $PORT 的 SOCKS5 代理）"
        PUSH_SUCCESS=1
        break
    fi
done

if [ $PUSH_SUCCESS -eq 0 ]; then
    echo ""
    echo "⚠️  所有代理端口都尝试失败，尝试不使用代理推送..."
    echo "💡 如果需要代理，请手动运行："
    echo "   git -c http.proxy=http://127.0.0.1:YOUR_PORT push -u origin main"
    echo ""

    git push -u origin main

    if [ $? -eq 0 ]; then
        echo "✅ 推送成功！（未使用代理）"
    else
        echo "❌ 推送失败"
        echo "💡 可能原因："
        echo "   1. Wait Toolkit 未启动"
        echo "   2. 代理端口不正确"
        echo "   3. GitHub Token 错误"
        echo ""
        echo "💡 手动推送命令："
        echo "   git -c http.proxy=http://127.0.0.1:YOUR_PORT push -u origin main"
        exit 1
    fi
fi

echo ""
echo "🎉 推送完成！"
echo "🌐 访问你的仓库：https://github.com/yackbird/TDSimulator"
