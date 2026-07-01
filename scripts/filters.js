const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

function buildCss() {
  const root = hexo.base_dir;
  const input = path.join(
    root,
    "themes",
    "hexo-theme-shit",
    "source",
    "css",
    "tailwind.css",
  );
  const output = path.join(
    root,
    "themes",
    "hexo-theme-shit",
    "source",
    "css",
    "main.css",
  );
  const cli = path.join(
    root,
    "node_modules",
    "@tailwindcss",
    "cli",
    "dist",
    "index.mjs",
  );

  hexo.log.info("[hexo-theme-shit] Building Tailwind CSS");
  execFileSync(process.execPath, [cli, "-i", input, "-o", output, "--minify"], {
    cwd: root,
    stdio: "inherit",
  });
}

function copyFontAwesomeAssets() {
  const root = hexo.base_dir;
  const sourceDir = path.join(
    root,
    "node_modules",
    "@fortawesome",
    "fontawesome-free",
    "webfonts",
  );
  const targetDir = path.join(
    root,
    "themes",
    "hexo-theme-shit",
    "source",
    "webfonts",
  );
  const publicDir = path.join(root, "public", "webfonts");

  if (!fs.existsSync(sourceDir)) return;
  fs.mkdirSync(targetDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  for (const entry of fs.readdirSync(sourceDir)) {
    const sourceFile = path.join(sourceDir, entry);
    fs.copyFileSync(sourceFile, path.join(targetDir, entry));
    fs.copyFileSync(sourceFile, path.join(publicDir, entry));
  }
}

function prepareThemeAssets() {
  copyFontAwesomeAssets();
  buildCss();
}

hexo.extend.filter.register("before_generate", prepareThemeAssets);
hexo.extend.filter.register("before_server", prepareThemeAssets);
