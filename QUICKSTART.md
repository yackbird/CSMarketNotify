# CS 价格监控小程序 - 快速开始

感谢你下载 CS Market Notify 项目！这是一个基于 Taro + NestJS 的 CS 游戏道具价格监控小程序。

## 📦 项目内容

- ✅ 完整前端源码（React + Taro）
- ✅ 完整后端源码（NestJS）
- ✅ 数据库配置
- ✅ 设计规范文档
- ✅ 一键推送 GitHub 脚本

## 🚀 快速开始

### 步骤 1：解压文件

```bash
# Windows PowerShell
tar -xzf CSMarketNotify-with-script.tar.gz

# Mac/Linux
tar -xzf CSMarketNotify-with-script.tar.gz

# 或使用 7-Zip / WinRAR 解压
```

### 步骤 2：安装依赖

```bash
cd CSMarketNotify
pnpm install
```

### 步骤 3：启动开发服务

```bash
pnpm dev
```

访问：http://localhost:5000

---

## 🌐 推送到 GitHub（强烈推荐）

### 方式 1：使用一键推送脚本（最简单）

```bash
# 1. 解压文件后进入目录
cd CSMarketNotify

# 2. 运行推送脚本
bash push-to-github.sh

# 3. 按提示输入 GitHub 仓库 URL
# 4. 推送时输入 GitHub 用户名和 Token
```

### 方式 2：手动推送

```bash
# 1. 初始化 Git
git init
git add .
git commit -m "Initial commit: CS 价格监控小程序"

# 2. 关联远程仓库
git remote add origin https://github.com/yackbird/CSMarketNotify.git

# 3. 推送（需要 GitHub Token）
git push -u origin main
```

### GitHub Token 生成步骤

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 勾选权限：
   - ✅ repo（完整的仓库访问权限）
4. 生成 token 并复制（**只显示一次！**）
5. 推送时用 token 代替密码

---

## 📖 项目说明

### 功能特性

- 🔍 **道具价格监控**：实时查看热门 CS 道具价格
- 🔔 **价格预警**：设置价格下限，自动提醒
- 💱 **汇率查询**：展示人民币汇率
- 📱 **移动端适配**：支持 H5 和微信小程序

### 数据说明

当前使用模拟数据，原因是：
- Steam Market API 在国内网络无法稳定访问
- CSGOBackpack API 存在连接问题
- Buff163 API 有反爬虫限制

未来可接入真实 API，详见 README.md 中的"如何接入真实数据"章节。

---

## 🔧 环境要求

- Node.js >= 18
- pnpm >= 8
- Git

---

## 📝 开发命令

```bash
pnpm dev           # 启动前后端（推荐）
pnpm dev:web       # 仅前端
pnpm dev:server    # 仅后端
pnpm build         # 构建所有
pnpm lint          # 代码检查
```

---

## 🆘 常见问题

### Q: 为什么使用模拟数据？
A: 由于网络环境限制，Steam 等无法稳定访问。模拟数据确保功能演示稳定。

### Q: 如何接入真实数据？
A: 修改 `server/src/cs/cs.service.ts`，替换为真实 API 调用。

### Q: 推送到 GitHub 失败？
A: 检查 Token 是否正确，确保勾选了 `repo` 权限。

---

## 📞 支持

如有问题，请访问 GitHub Issues 提问。

---

**⚠️ 重要提示**：
- **强烈建议推送到 GitHub**，确保代码永久保存
- 云端环境可能会被清理，GitHub 是最可靠的备份
- 推送后你可以在任何地方访问项目

---

**祝你使用愉快！** 🎉
