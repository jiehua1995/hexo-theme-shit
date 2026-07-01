const pagination = require("hexo-pagination");
const { normalizeLocale, resolveLocalizedValue, translate } = require("./i18n");

function pagePath(theme, key) {
  const configured = theme.pages?.[key]?.path || key;
  return String(configured).replace(/^\/+|\/+$/g, "");
}

hexo.extend.generator.register("shit-pages", function (locals) {
  const theme = hexo.theme.config || {};
  const locale = normalizeLocale(theme.i18n?.locale || hexo.config.language || "en");
  const pages = [];
  const posts = locals.posts.sort("-date");

  if (theme.pages?.articles?.enabled !== false) {
    pages.push(
      ...pagination(pagePath(theme, "articles"), posts, {
        perPage: hexo.config.per_page || 8,
        layout: ["page", "archive", "index"],
        data: {
          title: resolveLocalizedValue(theme.pages.articles.title, locale),
          description: resolveLocalizedValue(theme.pages.articles.description, locale),
          page_key: "articles",
        },
      }),
    );
  }

  [
    "current_issue",
    "issues",
    "collections",
    "submit",
    "for_authors",
    "policies",
    "editorial_board",
    "about",
    "indexing",
    "metrics",
    "announcements",
    "special_issues",
    "faq",
  ].forEach((key) => {
    if (theme.pages?.[key]?.enabled === false) return;
    pages.push({
      path: `${pagePath(theme, key)}/index.html`,
      layout: ["page", "index"],
      data: {
        title: resolveLocalizedValue(theme.pages?.[key]?.title, locale),
        description: resolveLocalizedValue(theme.pages?.[key]?.description, locale),
        page_key: key,
      },
    });
  });

  pages.push({
    path: "404.html",
    layout: ["404", "page", "index"],
    data: {
      title: translate(locale, "evidence_not_found"),
      page_key: "404",
    },
  });

  return pages;
});
