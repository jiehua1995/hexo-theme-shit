# hexo-theme-shit

> **一个让你的博客看起来像正经学术期刊的 Hexo 主题——尽管所有内容都是 AI 瞎编的。**

**SHIT** = **S**ociety for **H**yperbolic and **I**maginary **T**heories（夸张与虚构理论学会）

[English Documentation](./README.md)

---

## 🔬 这是什么？

这是一个 **Hexo 主题**，把你的博客变成一个看起来像正经学术期刊的网站。站点上的每一篇文章都是 **AI 生成的虚构内容、讽刺幽默和荒诞文学**。这里没有任何真实科学、真实研究或真实建议。一切都是瞎编的——但它看起来超级官方。

### 能当真实博客用吗？

**当然可以。** 虽然默认内容是 AI 瞎编的，但主题本身就是一个功能完整的 Hexo 主题。你可以：

- 用同样的精美排版写真实文章
- 自定义所有内容
- 用作个人博客、作品集或发布站点
- 移除或修改讽刺元素

## ⚠️ 免责声明

本主题演示内容中的所有文章、作者、数据、指标和编委成员都是**完全虚构且由 AI 生成的**。它们仅用于讽刺和幽默目的。

---

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) ≥ 14.x
- [Hexo](https://hexo.io/) ≥ 6.x

### 安装

```bash
# 如果还没安装 Hexo
npm install -g hexo-cli

# 初始化新站点（或使用已有站点）
hexo init my-blog
cd my-blog

# 安装主题
git clone https://github.com/example/hexo-theme-shit themes/hexo-theme-shit

# 配置站点的 _config.yml
# 设置 theme: hexo-theme-shit
```

### 部署到 GitHub Pages

推荐使用 GitHub Pages + GitHub Actions 部署。

1. **Fork 或克隆** 本仓库为你的仓库（如 `yourname/yourblog.github.io`）

2. **配置站点的 `_config.yml`** — 设置正确的 URL：
   ```yaml
   # 对于 username.github.io：
   url: https://username.github.io
   root: /

   # 对于 username.github.io/blog：
   url: https://username.github.io
   root: /blog/
   ```

3. **提交并推送** 你的更改到 `main` 分支

4. **启用 GitHub Pages：**
   - 进入你的仓库 → **Settings** → **Pages**
   - **Source** 选择 **GitHub Actions**
   - 保存设置

5. 仓库中已包含 GitHub Actions 工作流（`/.github/workflows/`），每次推送到 `main` 分支时会自动构建并部署。

### 本地预览

在部署前，你可以先在本地预览：

```bash
npm install
hexo server
# 打开 http://localhost:4000
```

---

## ⚙️ 配置

主题配置位于 **`themes/hexo-theme-shit/_config.yml`**。

`_config.yml` 文件中包含**详细的中英文双语注释**，解释了每一个选项。以下是快速概览：

### 主要设置

| 配置段 | 说明 |
|---------|-------------------|
| `journal` | 期刊身份：名称、标语、Logo、ISSN 等 |
| `style` | 外观：色彩方案、字体、布局宽度、暗色模式 |
| `satire_banner` | 控制顶部讽刺/免责声明标语 |
| `navigation` | 顶部导航栏菜单项 |
| `homepage` | 首页显示哪些版块 |
| `pages` | 启用/禁用内置页面（关于、政策等） |
| `issues` | 期刊期号：卷号、期号、封面、推荐文章 |
| `collections` | 主题文章合集 |
| `article_types` | 文章类型分类（带颜色和图标） |
| `metrics` | 搞笑学术指标 |
| `editorial_board` | 虚构编委成员 |
| `github` | GitHub 仓库、Issues 和讨论链接 |

---

## 🎨 自定义

### 1. 修改期刊身份

编辑 `_config.yml` 中的 `journal` 部分：

```yaml
journal:
  short_name: MyJournal        # 简称
  full_name: My Journal        # 全称
  tagline: Real science for real people  # 标语
  slogan: Seriously, this is fake.  # 口号
  logo: /images/my-logo.svg     # Logo 路径
  favicon: /images/my-favicon.ico  # 网站图标
```

### 2. 修改颜色和样式

```yaml
style:
  preset: institutional       # 风格预设：institutional / academic / modern
  color_mode: system          # 颜色模式：system（跟随系统）/ light / dark
  dark_mode: true             # 是否启用暗色模式
  layout_width: 1280px        # 布局最大宽度
```

### 3. 添加文章

在 `source/_posts/` 中创建 markdown 文件。每篇文章支持 front-matter 元数据：

```yaml
---
title: "我的真实文章"
date: 2026-07-01
category:
  - 真实研究
tags:
  - 真实
  - 数据
article_type: retraction-ready-report  # 可选，见下方文章类型
metrics:
  absurdity_score: 10
  plausibility_index: 95
  evidence_status: Solid
---

你的文章内容...
```

### 4. 配置页面

在 `_config.yml` 中启用或禁用内置页面：

```yaml
pages:
  articles:
    enabled: true        # 启用
    title: 文章          # 页面标题
    path: articles       # URL 路径
  about:
    enabled: true
    title: 关于
    path: about
```

### 5. 自定义样式

将自定义 CSS 放在 `source/css/_custom.styl`（或 `.css`），主题会自动引入。

### 6. 自定义图片

替换 `themes/hexo-theme-shit/source/images/` 中的图片：

- `shit-seal.svg` → Logo / 徽章
- `avatar-1.svg` ~ `avatar-4.svg` → 编委头像
- `issue-cover-*.svg` → 期刊封面

---

## 📄 内置页面

| 页面 | 路径 | 说明 |
|------|------|-------------------|
| 文章 | `/articles/` | 文章列表 |
| 当期杂志 | `/current-issue/` | 当期杂志 |
| 所有期刊 | `/issues/` | 所有期刊 |
| 主题合集 | `/collections/` | 主题合集 |
| 政策声明 | `/policies/` | 政策声明 |
| 编委介绍 | `/editorial-board/` | 编委介绍 |
| 投稿 | `/submit/` | 投稿指南 |
| 期刊指标 | `/metrics/` | 期刊指标 |
| 关于 | `/about/` | 关于 |
| 常见问题 | `/faq/` | 常见问题 |
| 作者指南 | `/for-authors/` | 作者指南 |
| 收录信息 | `/indexing/` | 收录信息 |
| 公告 | `/announcements/` | 公告 |
| 特刊 | `/special-issues/` | 特刊 |

---

## 📝 文章类型

主题支持 20 种文章类型，每种有独立的颜色标签和图标。在 `_config.yml` 中自定义：

```yaml
article_types:
  - name: 我的自定义类型
    slug: my-type
    color: "#ff0000"
    icon: MC
    description: 类型描述
```

**可用类型：**

| 类型 | 图标 |
|------|------|
| 随时可撤回报告 | RR |
| 虚构数据集 | ID |
| 无用方法 | UM |
| 计算白日梦 | CD |
| 同行评审剧场 | PT |
| 基金提案小说 | GF |
| 需要引用 | CN |
| 合成综述 | SR |
| ... 以及 12 种更多 | |

---

## 🌐 国际化

主题支持多语言。在 `_config.yml` 中设置语言：

```yaml
i18n:
  locale: zh    # 当前语言
                 # 支持：en（英文）/ zh（简体中文）
```

要添加中文翻译，在 `themes/hexo-theme-shit/languages/zh.js` 创建翻译文件。

---

## 🛠️ 高级用法

### 自定义页脚

```yaml
footer:
  copyright: 你的名字 2026
  slogan: 你的个性化标语
  links:
    - label: GitHub
      path: https://github.com/your-repo
```

### 社交链接

```yaml
footer:
  social_links:
    - label: Twitter
      path: https://twitter.com/your-handle
    - label: 微信
      path: /wechat-qr.png
```

### 讽刺标语

控制免责声明标语：

```yaml
satire_banner:
  enabled: true        # 是否显示
  sticky: true         # 是否固定顶部
  dismissible: true    # 是否可关闭
  text: 自定义免责声明（英文）...
  text_zh: 自定义免责声明（中文）...
```

设置为 `enabled: false` 可以完全隐藏（如果你用真实内容的话）。

---

## 📦 目录结构

```
my-blog/
├── _config.yml              # Hexo 站点配置
├── source/
│   └── _posts/              # 你的文章
│       ├── article-1.md
│       └── article-2.md
├── themes/
│   └── hexo-theme-shit/
│       ├── _config.yml      # 主题配置
│       ├── layout/          # EJS 模板
│       ├── source/
│       │   ├── css/         # 样式表
│       │   ├── images/      # 图片和图标
│       │   └── js/          # JavaScript
│       └── scripts/         # Hexo 脚本（helpers, generators）
```

---

## 🤝 贡献

欢迎各种 PR 或 Issue：

- 修复 Bug
- 添加功能
- 改进翻译
- 编写新文章类型

---

## 📄 许可

[MIT License](./themes/hexo-theme-shit/LICENSE)

---

## 🎭 用荒诞构建

由 [Society for Hyperbolic and Imaginary Theories](https://github.com/example/hexo-theme-shit) 制作。

**写得不对，但排版很美。**
