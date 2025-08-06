# 📚 博客项目 Cloudflare Pages 部署教程

## 🎯 部署概述

Cloudflare Pages 是一个免费的静态网站托管平台，支持直接从 GitHub 仓库部署，非常适合 React 项目。

## 📋 准备工作

### 1. 注册 Cloudflare 账户

1. 访问 [Cloudflare 官网](https://www.cloudflare.com/)
2. 点击右上角 "Sign Up" 注册
3. 填写邮箱和密码
4. 验证邮箱地址

### 2. 创建 GitHub 仓库

#### 方法一：使用 GitHub Desktop（推荐新手）

1. 下载安装 [GitHub Desktop](https://desktop.github.com/)
2. 用 GitHub 账户登录
3. 点击 "File" → "Add Local Repository"
4. 选择项目文件夹：`/Users/qiuliang/code/cloudflare/blog-project`
5. 点击 "Publish repository"
6. 填写仓库名称：`blog-project`
7. 确保勾选 "Public"（免费版需要公开仓库）
8. 点击 "Publish Repository"

#### 方法二：使用命令行

```bash
# 进入项目目录
cd /Users/qiuliang/code/cloudflare/blog-project

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: React blog with Ant Design"

# 在 GitHub 上创建新仓库后，添加远程仓库
git remote add origin https://github.com/你的用户名/blog-project.git

# 推送代码
git branch -M main
git push -u origin main
```

## 🚀 部署到 Cloudflare Pages

### 第一步：访问 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 在左侧菜单中找到 "Pages"
3. 点击 "Create a project"

### 第二步：连接 GitHub

1. 选择 "Connect to Git"
2. 点击 "Connect GitHub"
3. 授权 Cloudflare 访问你的 GitHub 账户
4. 选择你刚创建的 `blog-project` 仓库

### 第三步：配置构建设置

在部署配置页面填写以下信息：

```
Project name: blog-project (可自定义)
Production branch: main
Build command: npm run build
Build output directory: build
Root directory: / (保持默认)
Environment variables: (暂时留空)
```

**重要的构建设置：**
- **Framework preset**: Create React App
- **Node.js version**: 18.x （推荐）

### 第四步：开始部署

1. 点击 "Save and Deploy"
2. Cloudflare 会自动：
   - 克隆你的代码
   - 安装依赖 (`npm install`)
   - 构建项目 (`npm run build`)
   - 部署到全球 CDN

### 第五步：等待部署完成

- 部署过程通常需要 2-5 分钟
- 你可以在构建日志中查看进度
- 部署成功后会显示访问链接

## 🌐 访问你的网站

部署完成后，Cloudflare 会提供一个免费域名：
```
https://blog-project-xxx.pages.dev
```

## 🔧 后续更新

### 自动部署
每当你向 GitHub 仓库推送代码时，Cloudflare Pages 会自动重新部署：

```bash
# 修改代码后
git add .
git commit -m "更新描述"
git push
```

### 查看部署状态
1. 登录 Cloudflare Dashboard
2. 进入 Pages → 你的项目
3. 查看 "Deployments" 页面

## 🎨 自定义域名（可选）

### 如果你有自己的域名：

1. 在项目设置中找到 "Custom domains"
2. 点击 "Set up a custom domain"
3. 输入你的域名
4. 按照提示配置 DNS 记录

### 免费域名选项：
- 继续使用 `xxx.pages.dev` 域名（完全免费）
- 或者使用 Freenom 等服务申请免费域名

## 🛠️ 常见问题

### 构建失败？
1. 检查 `package.json` 中的构建脚本
2. 确保所有依赖都在 `dependencies` 中
3. 查看构建日志中的具体错误

### 页面显示空白？
1. 确保构建输出目录设置为 `build`
2. 检查浏览器控制台是否有 JavaScript 错误

### 环境变量设置
如果需要环境变量：
1. 进入项目设置
2. 找到 "Environment variables"
3. 添加 `REACT_APP_` 开头的变量

## 📊 项目结构

确保项目结构正确：
```
blog-project/
├── public/
├── src/
│   ├── components/
│   ├── types/
│   └── ...
├── package.json
├── tsconfig.json
└── deployment.md (本文件)
```

## 🎉 完成！

恭喜！你的博客项目现在已经部署到 Cloudflare Pages，全球用户都可以快速访问你的网站。

## 📞 获取帮助

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [GitHub 帮助文档](https://docs.github.com/)
- 如果遇到问题，可以查看 Cloudflare Dashboard 中的构建日志

---

**下一步建议：**
- 添加更多博客文章
- 优化 SEO 设置
- 添加网站分析
- 配置自定义 404 页面