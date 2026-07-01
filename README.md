# SHIT Journal Theme

[中文文档](./README_CN.md)

> **A Hexo theme that makes everything look like a real academic journal — when nothing in it is real.**

**SHIT** = **S**ociety for **H**yperbolic and **I**maginary **T**heories

---

## 🔬 What is this?

This is a **Hexo theme** that turns your blog into a professional-looking academic journal. Every article on this site is **AI-generated fiction, satire, and absurdist humor**. Nothing you read here is real science, real research, or real advice. It's all made up — but it looks ridiculously official doing it.

### Can I use it for a real blog?

**Yes, absolutely.** While the default content is all AI-generated nonsense, the theme itself is a fully functional Hexo theme. You can:

- Write real articles with the same beautiful formatting
- Customize everything to your liking
- Use it as a personal blog, portfolio, or publication site
- Remove or modify the satire elements

## ⚠️ Disclaimer

All articles, authors, data, metrics, and editorial board members displayed in this theme's demo content are **entirely fictional and AI-generated**. They exist for satirical and humorous purposes only.

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 14.x
- [Hexo](https://hexo.io/) ≥ 6.x

### Installation

```bash
# Install Hexo if you haven't
npm install -g hexo-cli

# Initialize a new site (or use existing one)
hexo init my-blog
cd my-blog

# Install the theme
git clone https://github.com/example/hexo-theme-shit themes/hexo-theme-shit

# Configure your site's _config.yml
# Set theme: hexo-theme-shit
```

### Deploy to GitHub Pages

The recommended way to deploy is via GitHub Pages + GitHub Actions.

1. **Fork or clone** this repo as your own repository (e.g. `yourname/yourblog.github.io`)

2. **Configure your site's `_config.yml`** — set the correct URL:
   ```yaml
   # For username.github.io:
   url: https://username.github.io
   root: /

   # For username.github.io/blog:
   url: https://username.github.io
   root: /blog/
   ```

3. **Commit and push** your changes to the `main` branch

4. **Enable GitHub Pages:**
   - Go to your repo → **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

5. The included GitHub Actions workflow (`/.github/workflows/`) will automatically build and deploy your site on every push to `main`.

### Run Locally (for preview)

If you want to preview locally before deploying:

```bash
npm install
hexo server
# Open http://localhost:4000
```

---

## ⚙️ Configuration

The theme configuration is in **`themes/hexo-theme-shit/_config.yml`**.

See the `_config.yml` file for **detailed bilingual (Chinese/English) comments** explaining every option. Here's a quick overview:

### Key Settings

| Section | Description |
|---------|-------------------|
| `journal` | Journal identity: name, tagline, logo, ISSN, etc. |
| `style` | Appearance: color scheme, typography, layout width, dark mode |
| `satire_banner` | Control the satire/disclaimer banner at the top |
| `navigation` | Menu items in the top navigation bar |
| `homepage` | Which sections to show on the homepage |
| `pages` | Enable/disable built-in pages (About, Policies, etc.) |
| `issues` | Journal issues: volume, number, cover image, featured article |
| `collections` | Themed article collections |
| `article_types` | Article type categories with colors and icons |
| `metrics` | Fake academic metrics to display |
| `editorial_board` | Fictional editorial board members |
| `github` | GitHub repo, issues, and discussion links |

---

## 🎨 Customization

### 1. Change Journal Identity

Edit the `journal` section in `_config.yml`:

```yaml
journal:
  short_name: MyJournal        # Short name
  full_name: My Journal        # Full name
  tagline: Real science for real people  # Tagline
  slogan: Seriously, this is fake.  # Slogan
  logo: /images/my-logo.svg     # Logo path
  favicon: /images/my-favicon.ico  # Favicon
```

### 2. Change Colors & Style

```yaml
style:
  preset: institutional       # Preset: institutional / academic / modern
  color_mode: system          # Mode: system (follows OS) / light / dark
  dark_mode: true             # Enable dark mode
  layout_width: 1280px        # Max layout width
```

### 3. Add Your Articles

Create markdown files in `source/_posts/`. Each article supports front-matter metadata:

```yaml
---
title: "My Real Article"
date: 2026-07-01
category:
  - Real Research
tags:
  - real
  - data
article_type: retraction-ready-report  # Optional, see article types below
metrics:
  absurdity_score: 10
  plausibility_index: 95
  evidence_status: Solid
---

Your article content here...
```

### 4. Configure Pages

Enable or disable built-in pages in `_config.yml`:

```yaml
pages:
  articles:
    enabled: true        # Enable
    title: Articles      # Page title
    path: articles       # URL path
  about:
    enabled: true
    title: About
    path: about
```

### 5. Custom CSS

Place your custom CSS in `source/css/_custom.styl` (or `.css`), and it will be automatically included.

### 6. Custom Images

Replace images in `themes/hexo-theme-shit/source/images/`:

- `shit-seal.svg` → Logo / Seal
- `avatar-1.svg` ~ `avatar-4.svg` → Editor avatars
- `issue-cover-*.svg` → Issue covers

---

## 📄 Built-in Pages

| Page | Path | Description |
|------|------|-------------------|
| Articles | `/articles/` | Article list |
| Current Issue | `/current-issue/` | Current issue |
| Issues | `/issues/` | All issues |
| Collections | `/collections/` | Themed collections |
| Policies | `/policies/` | Policy statements |
| Editorial Board | `/editorial-board/` | Editor profiles |
| Submit | `/submit/` | Submission guide |
| Metrics | `/metrics/` | Journal metrics |
| About | `/about/` | About us |
| FAQ | `/faq/` | Frequently asked questions |
| For Authors | `/for-authors/` | Author guidelines |
| Indexing | `/indexing/` | Indexing info |
| Announcements | `/announcements/` | Announcements |
| Special Issues | `/special-issues/` | Special issues |

---

## 📝 Article Types

The theme supports 20 article types, each with its own color badge and icon. Customize them in `_config.yml`:

```yaml
article_types:
  - name: My Custom Type
    slug: my-type
    color: "#ff0000"
    icon: MC
    description: A description of this type
```

**Available types:**

| Type | Icon |
|------|------|
| Retraction-Ready Report | RR |
| Imaginary Dataset | ID |
| Unnecessary Methods | UM |
| Computational Daydream | CD |
| Peer Review Theater | PT |
| Grant Proposal Fiction | GF |
| Citation Needed | CN |
| Synthetic Review | SR |
| ... and 12 more | |

---

## 🌐 i18n

The theme supports multiple locales. Set the language in `_config.yml`:

```yaml
i18n:
  locale: en    # Current locale
                 # Supported: en / zh
```

To add Chinese translations, create `themes/hexo-theme-shit/languages/zh.js` with all translation keys.

---

## 🛠️ Advanced

### Custom Footer

```yaml
footer:
  copyright: Your Name 2026
  slogan: Your personalized tagline
  links:
    - label: GitHub
      path: https://github.com/your-repo
```

### Social Links

```yaml
footer:
  social_links:
    - label: Twitter
      path: https://twitter.com/your-handle
    - label: WeChat
      path: /wechat-qr.png
```

### Satire Banner

Control the disclaimer banner:

```yaml
satire_banner:
  enabled: true        # Show banner
  sticky: true         # Stick to top
  dismissible: true    # Can be dismissed
  text: Custom disclaimer text...
  text_zh: 自定义免责声明（中文）...
```

Set `enabled: false` to hide it entirely if you're using this theme for real content.

---

## 📦 Directory Structure

```
my-blog/
├── _config.yml              # Hexo site configuration
├── source/
│   └── _posts/              # Your articles
│       ├── article-1.md
│       └── article-2.md
├── themes/
│   └── hexo-theme-shit/
│       ├── _config.yml      # Theme configuration
│       ├── layout/          # EJS templates
│       ├── source/
│       │   ├── css/         # Stylesheets
│       │   ├── images/      # Images & icons
│       │   └── js/          # JavaScript
│       └── scripts/         # Hexo scripts (helpers, generators)
```

---

## 🤝 Contributing

Contributions welcome! Whether it's:

- Fixing bugs
- Adding features
- Improving translations
- Writing new article types

Feel free to open a PR or issue.

---

## 📄 License

[MIT License](./themes/hexo-theme-shit/LICENSE)

---

## 🎭 Made with nonsense

Made by [Society for Hyperbolic and Imaginary Theories](https://github.com/example/hexo-theme-shit).

**Wrong, but beautifully formatted.**
