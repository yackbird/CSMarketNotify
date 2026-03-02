#!/bin/bash

# CS Market Notify 项目 - GitHub 推送脚本
# 使用方法：
# 1. 先确保已安装 Git
# 2. 下载此脚本和源码
# 3. 运行：bash push-to-github.sh

set -e

echo "🚀 开始推送 CS Market Notify 到 GitHub..."
echo ""

# 检查是否已解压源码
if [ ! -f "package.json" ]; then
    echo "❌ 错误：未找到 package.json 文件"
    echo "请确保在 CSMarketNotify 根目录下运行此脚本"
    exit 1
fi

# 检查 Git 是否安装
if ! command -v git &> /dev/null; then
    echo "❌ 错误：未找到 Git 命令"
    echo "请先安装 Git：https://git-scm.com/downloads"
    exit 1
fi

echo "✅ 环境检查通过"
echo ""

# 初始化 Git（如果未初始化）
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git branch -M main
fi

# 添加所有文件
echo "📝 添加文件到 Git..."
git add .

# 提交
echo "💾 提交更改..."
git commit -m "Initial commit: CS 价格监控小程序

- 完整前后端源码
- 价格监控功能
- 预警设置功能
- 汇率查询功能
- 完整文档"

# 关联远程仓库（如果未关联）
if ! git remote get-url origin &> /dev/null; then
    echo "🔗 关联远程仓库..."
    read -p "请输入 GitHub 仓库 URL（例如：https://github.com/yackbird/CSMarketNotify.git）: " REPO_URL
    git remote add origin "$REPO_URL"
fi

# 推送
echo ""
echo "⬆️  推送到 GitHub..."
echo "💡 提示：推送时需要输入 GitHub 用户名和 Token（不是登录密码）"
echo "💡 Token 生成地址：https://github.com/settings/tokens"
echo ""
git push -u origin main

echo ""
echo "✅ 推送完成！"
echo "🌐 访问你的仓库：$(git remote get-url origin)"
