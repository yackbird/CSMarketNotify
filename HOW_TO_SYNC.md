# 🔄 如何在本地同步最新代码

## 📦 最新改动

已验证临时方案成功！构建脚本已修改为使用 `npx pnpm`。

### 修改的文件
1. ✅ `build-apk-one-click.bat` - Windows 版本
2. ✅ `build-apk-one-click.sh` - Mac/Linux 版本
3. ✅ `UPDATE_NPX_SOLUTION.md` - 更新说明文档

### 修改内容
- 使用 `npx pnpm` 代替 `pnpm`
- 无需全局安装 pnpm
- 只需安装 Node.js 即可使用
- 解决 npm PATH 配置问题

---

## 🚀 本地同步步骤

### 方法 1：拉取最新代码（推荐）

```bash
# 1. 进入项目目录
cd /path/to/your/CSMarketNotify

# 2. 拉取最新代码
git pull origin cs-market-monitor
```

---

### 方法 2：暴力同步（覆盖本地修改）

```bash
# 1. 进入项目目录
cd /path/to/your/CSMarketNotify

# 2. 获取远端最新代码
git fetch origin

# 3. 重置到远端最新状态
git reset --hard origin/cs-market-monitor

# 4. 清理未跟踪文件
git clean -fd
```

---

### 方法 3：使用 SSH 密钥（如果 HTTPS 有问题）

如果你配置了 SSH 密钥：

```bash
# 1. 检查是否有 SSH 密钥
ls ~/.ssh/

# 2. 如果没有，生成 SSH 密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 3. 添加到 GitHub
# 复制 ~/.ssh/id_ed25519.pub 的内容
# 到 GitHub Settings → SSH and GPG keys → New SSH key

# 4. 测试连接
ssh -T git@github.com

# 5. 修改远程地址为 SSH
git remote set-url origin git@github.com:yackbird/CSMarketNotify.git

# 6. 拉取最新代码
git pull origin cs-market-monitor
```

---

## ✅ 同步后验证

同步完成后，运行以下命令验证：

```bash
# 1. 查看最新提交
git log --oneline -3

# 应该看到：
# d57e1276d fix: 修改构建脚本使用 npx pnpm 解决 npm PATH 问题
# 95842a7a9 docs: 添加一键构建脚本快速开始文档
# dc8d002d0 feat: 添加一键构建脚本和打包工具

# 2. 查看新增文件
ls -lh UPDATE_NPX_SOLUTION.md

# 3. 查看修改的文件
git diff HEAD~1 build-apk-one-click.bat | head -30
```

---

## 🎯 同步后立即测试

同步成功后，立即测试新的构建脚本：

### Windows 用户
```bash
# 双击运行
build-apk-one-click.bat
```

### Mac/Linux 用户
```bash
# 添加执行权限
chmod +x build-apk-one-click.sh

# 运行
./build-apk-one-click.sh
```

---

## ⚠️ 同步时可能遇到的问题

### 问题 1：git pull 失败
```
error: cannot pull with rebase: You have unstaged changes.
```

**解决**：
```bash
# 方式 1：提交本地修改
git add .
git commit -m "本地修改"
git pull origin cs-market-monitor

# 方式 2：暂存本地修改
git stash
git pull origin cs-market-monitor
git stash pop

# 方式 3：放弃本地修改
git reset --hard HEAD
git pull origin cs-market-monitor
```

---

### 问题 2：合并冲突
```
CONFLICT (content): Merge conflict in build-apk-one-click.bat
```

**解决**：
```bash
# 1. 编辑冲突文件，手动解决冲突
# 2. 标记冲突已解决
git add build-apk-one-click.bat

# 3. 完成合并
git commit -m "解决合并冲突"

# 或者放弃合并，使用远端版本
git reset --hard origin/cs-market-monitor
```

---

### 问题 3：无法连接到 GitHub
```
fatal: unable to access 'https://github.com/...': Failed to connect
```

**解决**：
```bash
# 1. 检查网络连接
ping github.com

# 2. 配置代理（如果需要）
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 3. 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

---

## 📋 完整同步流程

```bash
# 1. 进入项目目录
cd D:\workspace\CSMarketNotify

# 2. 查看当前状态
git status
git branch

# 3. 查看本地是否有未提交的修改
git diff

# 4. 获取远端最新代码
git fetch origin

# 5. 查看远端新增的提交
git log HEAD..origin/cs-market-monitor --oneline

# 6. 拉取最新代码
git pull origin cs-market-monitor

# 7. 验证同步成功
git log --oneline -3

# 8. 测试构建脚本
build-apk-one-click.bat  # Windows
# 或
./build-apk-one-click.sh # Mac/Linux
```

---

## 🎉 同步成功！

同步成功后，你的本地构建脚本已更新为：

✅ 使用 `npx pnpm` 代替 `pnpm`
✅ 无需全局安装 pnpm
✅ 只需安装 Node.js 即可使用
✅ 解决 npm PATH 配置问题

现在可以直接运行构建脚本了！

---

**最后更新**: 2025-03-02
**状态**: ✅ 已在沙箱验证，等待本地同步
