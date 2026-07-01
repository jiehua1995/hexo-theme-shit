# hexo-theme-shit

> **一本正经地胡说八道。** A Hexo theme that looks like a serious academic journal while publishing AI-generated nonsense, academic satire, and fictionally formatted hallucinations.

![Preview](https://img.shields.io/badge/Hexo-8.x-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📖 关于主题 / About

**hexo-theme-shit** 是一个外观像正经学术期刊的 Hexo 主题，专门用于发布由 AI 生成的虚构学术文章、学术讽刺内容和一本正经的胡说八道。

所有文章内容均为 **AI 虚构/讽刺创作**，不构成任何科学、医学、法律或专业建议。

hexo-theme-shit is a Hexo theme that looks like a serious academic journal while publishing AI-generated fictional scholarship, academic satire, and professionally formatted nonsense.

All article content is **AI-generated fiction/satire** and should not be interpreted as scientific, medical, legal, or professional advice.

### ✨ 核心特色 / Features

- 完整的学术期刊风格：首页、文章页、存档页和多个内部页面
- 配置驱动：支持自定义品牌、导航、公告、指标、文章类型、合集、期刊号和编委会
- 8 种视觉预设：classic、nature、cell、lancet、arxiv、institutional、minimal、absurdist
- 内置讽刺声明和免责声明
- GitHub Issues 投稿工作流（可自定义）
- 双语支持（中/英）

---

## 🚀 快速开始 / Quick Start

### 1. 初始化项目

```bash
npx hexo init . --no-install
cd .
```

### 2. 安装主题

将主题放到 `themes/hexo-theme-shit/` 目录：

```bash
git clone https://github.com/your-username/hexo-theme-shit.git themes/hexo-theme-shit
```

然后在站点根目录的 `_config.yml` 中设置：

```yaml
theme: hexo-theme-shit
```

### 3. 安装依赖

```bash
yarn install
```

### 4. 启动站点

```bash
yarn start
```

站点将在 `http://localhost:4000` 运行。

---

## ⚙️ 配置说明 / Configuration

主题的所有配置都在 `themes/hexo-theme-shit/_config.yml` 中，详细的配置说明见该文件内的中英双语注释。

以下是主要配置区域概览：

| 区域 | 说明 / Description |
|------|-------------------|
| `journal` | 期刊品牌信息（名称、标语、Logo 等）/ Journal branding |
| `style` | 视觉风格预设和排版设置 / Visual presets and typography |
| `i18n` | 语言设置 / Language configuration |
| `satire_banner` | 讽刺声明横幅 / Satire notice banner |
| `navigation` | 顶部导航栏 / Top navigation |
| `homepage` | 首页模块开关和排序 / Homepage section toggles |
| `pages` | 各内部页面开关、标题和路径 / Page enable/disable |
| `article_types` | 自定义文章类型和颜色 / Custom article types |
| `metrics` | 期刊指标标签和默认值 / Journal metrics |
| `github` | GitHub 仓库和投稿链接 / GitHub integration |
| `editorial_board` | 编委会成员卡片 / Editorial board members |
| `collections` | 内容合集分类 / Content collections |
| `issues` | 期刊号定义 / Issue definitions |

> 💡 **详细的中英双语配置注释请查看 `_config.yml` 文件。**

---

## ✍️ 写一篇文章 / Writing Articles

在 `source/_posts/` 目录下创建 Markdown 文件，使用标准 Hexo 前后端语法。示例：

```yaml
---
title: 一个虚构的研究发现
subtitle: 副标题
article_type: Useful Absurdity
issue_id: 202607
collection: Useful Absurdities
authors:
  - name: 张三
    affiliation: 虚构大学 nonsense 学院
notices:
  - SATIRE
  - AI-GENERATED
metrics:
  absurdity_score: 97
  plausibility_index: 88
abstract: >
  这里是摘要。
---
```

### 支持的文章元字段 / Supported Front Matter Fields

| 字段 | 说明 |
|------|------|
| `title` | 标题 / Title |
| `subtitle` | 副标题 / Subtitle |
| `article_type` | 文章类型（需与 _config.yml 中定义匹配） |
| `issue_id` | 期刊号 |
| `collection` | 合集分类 |
| `authors` | 作者列表（数组，每个含 name 和 affiliation） |
| `affiliations` | 作者单位列表 |
| `published` | 发布日期 |
| `volume` / `issue` | 卷号和期号 |
| `pages` | 页码范围 |
| `shit_id` | 文章唯一标识 |
| `doi_like` | 类 DOI 标识符 |
| `keywords` | 关键词列表 |
| `notices` | 声明标签（如 SATIRE、AI-GENERATED） |
| `metrics` | 期刊指标（absurdity_score 等） |
| `abstract` | 摘要 |
| `data_availability` | 数据可用性声明 |
| `code_availability` | 代码可用性声明 |
| `competing_interests` | 利益冲突声明 |

---

## 🎨 自定义主题 / Customization

### 切换视觉预设

编辑 `_config.yml`：

```yaml
style:
  preset: nature  # 可选: classic, nature, cell, lancet, arxiv, institutional, minimal, absurdist
```

### 自定义文章类型

在 `_config.yml` 的 `article_types` 中添加或修改：

```yaml
article_types:
  - name: My Custom Type
    slug: my-custom-type
    color: "#ff0000"
    icon: MC
    description: 我的自定义类型 / My custom type description
    default_notices: [SATIRE, FICTIONAL STUDY]
```

### 自定义编委会

在 `_config.yml` 的 `editorial_board` 中修改：

```yaml
editorial_board:
  - name: Dr. Your Name
    role: Editor-in-Chief
    affiliation: Your University
    avatar: /images/your-avatar.svg
    bio: Your bio here.
    orcid: 0000-0000-0000-0000
    research_interests: [your, interests]
```

### 自定义期刊号和合集

- **期刊号**：在 `issues` 中添加/修改
- **合集**：在 `collections` 中添加/修改

### 自定义页面

在 `pages` 中控制各页面的启用状态、标题和路径：

```yaml
pages:
  articles:
    enabled: true
    title: 文章 / Articles
    path: articles
    description: 文章描述 / Description in both languages
  faq:
    enabled: false  # 禁用某个页面
```

---

## 📄 内置页面 / Built-In Pages

每个页面均可通过 `pages` 配置独立控制：

| 页面 | 路径 | 说明 |
|------|------|------|
| Articles | `/articles/` | 文章存档 |
| Current Issue | `/current-issue/` | 当前期刊号 |
| Issues | `/issues/` | 历史期刊号 |
| Collections | `/collections/` | 合集分类 |
| Submit | `/submit/` | 投稿指南 |
| For Authors | `/for-authors/` | 作者指南 |
| Policies | `/policies/` | 政策声明 |
| Editorial Board | `/editorial-board/` | 编委会 |
| About | `/about/` | 关于 |
| Indexing | `/indexing/` | 收录信息 |
| Metrics | `/metrics/` | 期刊指标 |
| Announcements | `/announcements/` | 公告 |
| Special Issues | `/special-issues/` | 特刊 |
| FAQ | `/faq/` | 常见问题 |

---

## 🌐 双语支持 / i18n

编辑 `_config.yml`：

```yaml
i18n:
  locale: zh  # 或 en
```

切换后，所有界面文字和声明都会自动使用对应语言。

---

## 🚢 部署 / Deployment

生成静态站点：

```bash
yarn build
# 或
yarn build:css && hexo generate
```

生成的静态文件在 `public/` 目录，可部署到 GitHub Pages、Vercel、Netlify 等任何静态托管平台。

---

## 📝 版权与声明 / License & Disclaimer

- 主题代码使用 **MIT License** 开源
- 主题本身是为戏谑和搞笑目的而设计的，所有内容均为虚构
- 用作个人博客时，请移除或修改讽刺声明
- 使用本主题发布的文章内容不代表主题作者的立场

---

## 🤝 贡献 / Contributing

欢迎提交 Issue 和 Pull Request！无论是功能改进、bug 修复、新增视觉预设，还是更好的中文本地化，都非常欢迎。

> 前提：请确保你的改动不会让这份胡说八道变得不够好笑。
