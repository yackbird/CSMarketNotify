"""
CSMarketNotify Android APK 一键构建打包工具
将构建脚本打包成独立的可执行文件
"""

import os
import sys
import subprocess
import shutil
from pathlib import Path

# 颜色定义
RED = '\033[0;31m'
GREEN = '\033[0;32m'
YELLOW = '\033[0;33m'
BLUE = '\033[0;34m'
BRIGHT = '\033[1m'
RESET = '\033[0m'

def print_header():
    """打印标题"""
    print(f"\n{BRIGHT}{BLUE}╔════════════════════════════════════════════════════════════╗{RESET}")
    print(f"{BRIGHT}{BLUE}║{RESET}                                                          {BRIGHT}{BLUE}║{RESET}")
    print(f"{BRIGHT}{BLUE}║{RESET}      {GREEN}📦 CSMarketNotify APK 构建脚本打包工具{RESET}            {BRIGHT}{BLUE}║{RESET}")
    print(f"{BRIGHT}{BLUE}║{RESET}                                                          {BRIGHT}{BLUE}║{RESET}")
    print(f"{BRIGHT}{BLUE}╚════════════════════════════════════════════════════════════╝{RESET}\n")

def check_requirements():
    """检查打包所需工具"""
    print(f"{BRIGHT}{BLUE}[1/4] 检查打包工具...{RESET}\n")

    tools = {
        'python': 'Python',
        'pip': 'pip',
    }

    missing_tools = []

    for tool, name in tools.items():
        if shutil.which(tool):
            print(f"{GREEN}  ✅ {name} 已安装{RESET}")
            version = subprocess.run([tool, '--version'],
                                   capture_output=True, text=True)
            if version.returncode == 0:
                print(f"    版本：{version.stdout.strip()}")
        else:
            print(f"{RED}  ❌ {name} 未安装{RESET}")
            missing_tools.append(name)

    if missing_tools:
        print(f"\n{RED}❌ 缺少必要工具：{', '.join(missing_tools)}{RESET}")
        return False

    print(f"\n{GREEN}✅ 工具检查完成{RESET}\n")
    return True

def install_pyinstaller():
    """安装 PyInstaller"""
    print(f"{BRIGHT}{BLUE}[2/4] 安装 PyInstaller...{RESET}\n")

    try:
        # 检查是否已安装
        result = subprocess.run(['pip', 'show', 'pyinstaller'],
                               capture_output=True, text=True)
        if result.returncode == 0:
            print(f"{GREEN}  ✅ PyInstaller 已安装{RESET}")
            version = result.stdout.split('\n')[0]
            print(f"    {version}")
        else:
            print(f"{BLUE}  正在安装 PyInstaller...{RESET}")
            subprocess.run(['pip', 'install', 'pyinstaller'],
                          check=True)
            print(f"{GREEN}  ✅ PyInstaller 安装完成{RESET}")
    except subprocess.CalledProcessError as e:
        print(f"{RED}  ❌ PyInstaller 安装失败：{e}{RESET}")
        return False

    print(f"\n{GREEN}✅ PyInstaller 准备完成{RESET}\n")
    return True

def create_build_script():
    """创建 Python 构建脚本"""
    print(f"{BRIGHT}{BLUE}[3/4] 创建构建脚本...{RESET}\n")

    script_content = '''#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CSMarketNotify Android APK 一键构建器
自动检查环境、安装依赖、构建应用、同步到 Android 项目
"""

import os
import sys
import subprocess
import time
from pathlib import Path

# Windows 路径处理
if os.name == 'nt':
    import ctypes
    kernel32 = ctypes.windll.kernel32
    kernel32.SetConsoleMode(kernel32.GetStdHandle(-11), 7)

def print_step(step, total, message):
    """打印步骤标题"""
    print(f"\\n[步骤 {step}/{total}] {message}...")
    print("-" * 50)

def run_command(cmd, description):
    """执行命令"""
    print(f"\\n执行: {description}")
    print(f"命令: {' '.join(cmd)}")
    try:
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
        print(f"✓ 成功")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ 失败")
        if e.stdout:
            print(f"输出: {e.stdout}")
        if e.stderr:
            print(f"错误: {e.stderr}")
        return False

def main():
    """主函数"""
    print("""
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║         🚀 CSMarketNotify Android APK 一键构建器           ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    """)

    current_dir = Path.cwd()

    # 检查是否在项目目录
    if not (current_dir / "package.json").exists():
        print("错误：未找到 package.json 文件")
        print("请在 CSMarketNotify 项目根目录下运行此程序")
        input("\\n按回车键退出...")
        sys.exit(1)

    print(f"当前目录: {current_dir}\\n")

    # 步骤 1: 环境检查
    print_step(1, 6, "环境检查")

    # 检查 Java
    java_path = shutil.which("java")
    if not java_path:
        print("✗ 未找到 Java")
        print("请安装 Java JDK 17: https://adoptium.net/")
        input("\\n按回车键退出...")
        sys.exit(1)
    print("✓ Java 已安装")

    # 检查 pnpm
    pnpm_path = shutil.which("pnpm")
    if not pnpm_path:
        print("✗ 未找到 pnpm")
        print("正在安装 pnpm...")
        if not run_command([sys.executable, "-m", "pip", "install", "-U", "pnpm"],
                          "安装 pnpm"):
            input("\\n按回车键退出...")
            sys.exit(1)
    print("✓ pnpm 已安装")

    # 步骤 2: 安装依赖
    print_step(2, 6, "安装项目依赖")

    if (current_dir / "node_modules").exists():
        print("检测到 node_modules 目录，跳过依赖安装")
    else:
        if not run_command([pnpm_path, "install"], "安装依赖"):
            input("\\n按回车键退出...")
            sys.exit(1)

    # 步骤 3: 构建 H5 应用
    print_step(3, 6, "构建 H5 应用")

    if not run_command([pnpm_path, "run", "build:web"], "构建 H5"):
        input("\\n按回车键退出...")
        sys.exit(1)

    # 步骤 4: 同步到 Android 项目
    print_step(4, 6, "同步到 Android 项目")

    node_path = shutil.which("node")
    npx_cmd = [node_path, "npx", "cap", "sync", "android"]
    if not run_command(npx_cmd, "同步到 Android"):
        input("\\n按回车键退出...")
        sys.exit(1)

    # 步骤 5: 打开 Android Studio
    print_step(5, 6, "打开 Android Studio")

    npx_cmd = [node_path, "npx", "cap", "open", "android"]
    if not run_command(npx_cmd, "打开 Android Studio"):
        print("打开 Android Studio 失败，但构建已完成")

    # 步骤 6: 完成说明
    print_step(6, 6, "构建说明")

    print("""
在 Android Studio 中执行以下步骤：

  1. 等待 Gradle 同步完成（首次可能需要 5-10 分钟）
  2. 点击菜单：Build → Build Bundle(s) / APK(s) → Build APK(s)
  3. 等待构建完成（约 2-3 分钟）
  4. 点击通知中的 locate 链接找到 APK 文件

APK 文件位置：
  android/app/build/outputs/apk/debug/app-debug.apk

详细文档：
  - QUICK_REFERENCE.md       快速参考卡
  - LOCAL_BUILD_GUIDE.md     完整构建指南
  - BUILD_CHECKLIST.md       构建检查清单
    """)

    print("\\n" + "=" * 50)
    print("🎉 构建准备完成！")
    print("=" * 50 + "\\n")

    input("按回车键退出...")

if __name__ == "__main__":
    import shutil
    main()
'''

    script_path = Path("build_apk_builder.py")
    with open(script_path, 'w', encoding='utf-8') as f:
        f.write(script_content)

    print(f"{GREEN}  ✅ 构建脚本已创建：{script_path}{RESET}\n")
    return True

def build_executable():
    """打包成可执行文件"""
    print(f"{BRIGHT}{BLUE}[4/4] 打包可执行文件...{RESET}\n")

    if not Path("build_apk_builder.py").exists():
        print(f"{RED}  ❌ 构建脚本不存在{RESET}")
        return False

    try:
        # PyInstaller 命令
        cmd = [
            'pyinstaller',
            '--onefile',  # 打包成单个文件
            '--windowed' if os.name != 'nt' else '--console',  # Windows 显示控制台
            '--name=CSMarketNotify-APK-Builder',
            '--add-data=build-apk-one-click.bat:.' if os.path.exists('build-apk-one-click.bat') else '',
            'build_apk_builder.py'
        ]

        # 过滤空参数
        cmd = [arg for arg in cmd if arg]

        print(f"{BLUE}  执行打包命令...{RESET}")
        print(f"  命令: {' '.join(cmd)}\n")

        subprocess.run(cmd, check=True)

        print(f"\n{GREEN}  ✅ 打包完成！{RESET}")

        # 显示输出文件位置
        if os.name == 'nt':  # Windows
            exe_path = Path("dist/CSMarketNotify-APK-Builder.exe")
            if exe_path.exists():
                print(f"\n{GREEN}  可执行文件：{exe_path.absolute()}{RESET}")
                print(f"  文件大小：{exe_path.stat().st_size / 1024 / 1024:.2f} MB")
        else:  # Mac/Linux
            exe_path = Path("dist/CSMarketNotify-APK-Builder")
            if exe_path.exists():
                print(f"\n{GREEN}  可执行文件：{exe_path.absolute()}{RESET}")
                print(f"  文件大小：{exe_path.stat().st_size / 1024 / 1024:.2f} MB")

        # 清理临时文件
        print(f"\n{YELLOW}  清理临时文件...{RESET}")
        if Path("build").exists():
            shutil.rmtree("build")
        if Path("CSMarketNotify-APK-Builder.spec").exists():
            os.remove("CSMarketNotify-APK-Builder.spec")
        print(f"{GREEN}  ✅ 清理完成{RESET}")

        return True

    except subprocess.CalledProcessError as e:
        print(f"{RED}  ❌ 打包失败：{e}{RESET}")
        return False

def main():
    """主函数"""
    print_header()

    # 检查工具
    if not check_requirements():
        print(f"\n{RED}❌ 请先安装缺少的工具{RESET}")
        input("\n按回车键退出...")
        sys.exit(1)

    # 安装 PyInstaller
    if not install_pyinstaller():
        print(f"\n{RED}❌ PyInstaller 安装失败${RESET}")
        input("\n按回车键退出...")
        sys.exit(1)

    # 创建构建脚本
    if not create_build_script():
        print(f"\n{RED}❌ 构建脚本创建失败${RESET}")
        input("\n按回车键退出...")
        sys.exit(1)

    # 打包可执行文件
    if not build_executable():
        print(f"\n{RED}❌ 可执行文件打包失败${RESET}")
        input("\n按回车键退出...")
        sys.exit(1)

    # 完成
    print(f"\n{BRIGHT}${GREEN}╔════════════════════════════════════════════════════════════╗${RESET}")
    print(f"{BRIGHT}${GREEN}║${RESET}                     ${BRIGHT}🎉 打包完成！${RESET}                         ${BRIGHT}${GREEN}║${RESET}")
    print(f"{BRIGHT}${GREEN}╚════════════════════════════════════════════════════════════╝${RESET}\n")

    print(f"{BLUE}使用说明：${RESET}")
    if os.name == 'nt':  # Windows
        print(f"  1. 在 dist 目录找到 CSMarketNotify-APK-Builder.exe")
        print(f"  2. 双击运行或在命令行执行")
        print(f"  3. 脚本会自动完成所有构建步骤")
    else:  # Mac/Linux
        print(f"  1. 在 dist 目录找到 CSMarketNotify-APK-Builder")
        print(f"  2. 添加执行权限：chmod +x dist/CSMarketNotify-APK-Builder")
        print(f"  3. 运行：./dist/CSMarketNotify-APK-Builder")

    print(f"\n{BLUE}注意：${RESET}")
    print(f"  • 可执行文件约 15-25 MB")
    print(f"  • 首次运行需要联网安装依赖")
    print(f"  • 需要提前安装 Java JDK 17 和 Android Studio\n")

    input("按回车键退出...")

if __name__ == "__main__":
    main()
