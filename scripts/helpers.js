const path = require("node:path");
const { normalizeLocale, resolveLocalizedValue, translate } = require("./i18n");

function withLeadingSlash(input = "") {
  if (!input) return "/";
  return `/${String(input).replace(/^\/+|\/+$/g, "")}/`;
}

function withoutTrailingSlash(input = "") {
  return String(input || "").replace(/\/+$/g, "");
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function dateParts(input) {
  const date = new Date(input);
  return {
    year: String(date.getFullYear()),
    month: pad2(date.getMonth() + 1),
    day: pad2(date.getDate()),
  };
}

const themeConfig = () => hexo.theme?.config || {};
const currentLocale = () => normalizeLocale(themeConfig().i18n?.locale || hexo.config.language || "en");
const themePackage = () => {
  try {
    return require(path.join(hexo.theme_dir, "package.json"));
  } catch (_) {
    return {};
  }
};

function simpleSlugize(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-") || "article";
}

  function articleTypeFor(post) {
    const theme = themeConfig();
    const value = post.article_type || post.type || "Plausible Nonsense";
    return (
      (theme.article_types || []).find(
        (item) => item.name === value || item.slug === value,
      ) || {
        name: value,
        slug: simpleSlugize(value),
        color: "#51636f",
        description: "",
        icon: "PN",
      }
    );
  }

  function noticesFor(post) {
    const theme = themeConfig();
    const noticeSet = new Set(theme.notices?.defaults || []);
    const type = articleTypeFor(post);
    (type.default_notices || []).forEach((item) => noticeSet.add(item));
    (post.notices || []).forEach((item) => noticeSet.add(item));
    if (post.fictional_data) noticeSet.add("FICTIONAL DATA");
    if (post.ai_generated) noticeSet.add("AI-GENERATED");
    return [...noticeSet];
  }

  function metricsFor(post) {
    const theme = themeConfig();
    return {
      ...(theme.metrics?.defaults || {}),
      ...(post.metrics || {}),
    };
  }

  function issueList(posts) {
    const theme = themeConfig();
    return (theme.issues || []).map((issue) => {
      const issuePosts = posts.filter(
        (post) => String(post.issue_id || "") === String(issue.id || ""),
      );
      return {
        ...issue,
        posts: issuePosts,
        count: issuePosts.length,
      };
    });
  }

  function collectionList(posts) {
    const theme = themeConfig();
    return (theme.collections || []).map((collection) => {
      const collectionPosts = posts.filter(
        (post) => String(post.collection || "") === collection.name,
      );
      return {
        ...collection,
        posts: collectionPosts,
        count: collectionPosts.length,
      };
    });
  }

  function sortedPostsInIssue(issueId) {
    return hexo.locals
      .get("posts")
      .filter((post) => String(post.issue_id || "") === String(issueId || ""))
      .sort("date")
      .toArray();
  }

hexo.extend.helper.register("shit_theme", themeConfig);
hexo.extend.helper.register("shit_locale", currentLocale);
hexo.extend.helper.register("shit_value", (value) => resolveLocalizedValue(value, currentLocale()));
hexo.extend.helper.register("shit_ui", (key, vars = {}) => translate(currentLocale(), key, vars));
hexo.extend.helper.register("shit_theme_version", () => themePackage().version || "0.0.0");
hexo.extend.helper.register("shit_theme_repo_url", () => {
  return themeConfig().github?.repo_url || themePackage().homepage || null;
});
hexo.extend.helper.register("shit_page_config", (key) => {
  return themeConfig().pages?.[key] || {};
});
hexo.extend.helper.register("shit_page_title", (key, fallback = "") => {
  return resolveLocalizedValue(themeConfig().pages?.[key]?.title, currentLocale()) || fallback;
});
hexo.extend.helper.register("shit_page_description", (key, fallback = "") => {
  return resolveLocalizedValue(themeConfig().pages?.[key]?.description, currentLocale()) || fallback;
});
hexo.extend.helper.register("shit_link_label", (item) => {
  if (item.translation_key) return translate(currentLocale(), item.translation_key);
  return resolveLocalizedValue(item.label, currentLocale()) || item.label;
});
hexo.extend.helper.register("shit_page_path", (key) => {
  if (key === "home") return url_for("/");
  const page = themeConfig().pages?.[key];
  const raw = withLeadingSlash(page?.path || key);
  return url_for(raw);
});
hexo.extend.helper.register("shit_article_type", articleTypeFor);
hexo.extend.helper.register("shit_notices", noticesFor);
hexo.extend.helper.register("shit_metrics", metricsFor);
hexo.extend.helper.register("shit_metric_entries", (post) => {
  const theme = themeConfig();
  const labels = theme.metrics?.labels || {};
  const metrics = metricsFor(post);
  return (theme.metrics?.order || Object.keys(metrics))
    .filter((key) => metrics[key] !== undefined && metrics[key] !== null && metrics[key] !== "")
    .map((key) => ({
      key,
      label: resolveLocalizedValue(labels[key], currentLocale()) || labels[key] || key,
      value: metrics[key],
    }));
});
hexo.extend.helper.register("shit_metrics_compact", (post) => {
  const metrics = metricsFor(post);
  return [
    `Absurdity ${metrics.absurdity_score}`,
    `Plausibility ${metrics.plausibility_index}`,
    `Reviewer 2 Risk ${metrics.reviewer2_risk}`,
    `Evidence ${metrics.evidence_status}`,
  ].join(" · ");
});
hexo.extend.helper.register("shit_author_names", (post) => {
  if (Array.isArray(post.authors) && post.authors.length) {
    return post.authors.map((author) => author.name).join(", ");
  }
  return post.author || hexo.config.author || "Anonymous Committee";
});
hexo.extend.helper.register("shit_citation", (post) => {
  const authors = Array.isArray(post.authors) && post.authors.length
    ? post.authors.map((author) => author.name).join(", ")
    : post.author || "Anonymous Committee";
  const year = new Date(post.date).getFullYear();
  const journal = themeConfig().journal?.short_name || hexo.config.title;
  const articleNumber = hexo.extend.helper.get("shit_article_number")(post);
  const permalink = hexo.extend.helper.get("shit_absolute_url")(post.path);
  return `${authors} (${year}). ${post.title}. ${journal}. Article ${articleNumber}. ${permalink}`;
});
hexo.extend.helper.register("shit_absolute_url", (inputPath = "") => {
  const siteUrl = withoutTrailingSlash(hexo.config.url || "");
  const localPath = withLeadingSlash(inputPath);
  return siteUrl ? `${siteUrl}${localPath}` : localPath;
});
hexo.extend.helper.register("shit_article_number", (post) => {
  if (post.article_number) return post.article_number;
  if (post.issue_id) {
    const issuePosts = sortedPostsInIssue(post.issue_id);
    const index = issuePosts.findIndex((item) => item.source === post.source || item.path === post.path);
    const issue = (themeConfig().issues || []).find((item) => item.id === post.issue_id);
    if (index >= 0 && issue) {
      return `V${issue.volume}I${issue.issue}-${String(index + 1).padStart(2, "0")}`;
    }
  }
  const allPosts = hexo.locals.get("posts").sort("date").toArray();
  const globalIndex = allPosts.findIndex((item) => item.source === post.source || item.path === post.path);
  return `SHIT-${String(globalIndex + 1).padStart(4, "0")}`;
});
hexo.extend.helper.register("shit_identifier", (post) => {
  if (post.shit_id) return post.shit_id;
  const { year, month, day } = dateParts(post.published || post.date);
  return `shit.${year}.${month}.${day}`;
});
hexo.extend.helper.register("shit_doi_like", (post) => {
  if (post.doi_like) return post.doi_like;
  const { year, month, day } = dateParts(post.published || post.date);
  const slug = post.slug || simpleSlugize(post.title || "article");
  return `10.shit/${year}.${month}.${day}.${slug}`;
});
hexo.extend.helper.register("shit_issue_list", (posts) => issueList(posts));
hexo.extend.helper.register("shit_current_issue", (posts) => {
  const theme = themeConfig();
  return issueList(posts).find((issue) => issue.id === theme.homepage?.current_issue_id) || null;
});
hexo.extend.helper.register("shit_collection_list", (posts) => collectionList(posts));
hexo.extend.helper.register("shit_collection_for_post", (post) => {
  const theme = themeConfig();
  return (theme.collections || []).find((item) => item.name === post.collection) || null;
});
hexo.extend.helper.register("shit_featured_post", (posts) => {
  const slug = themeConfig().homepage?.featured_article_slug;
  return posts.find((post) => post.slug === slug) || posts[0] || null;
});
hexo.extend.helper.register("shit_issue_for_post", (post) => {
  const theme = themeConfig();
  return (theme.issues || []).find((item) => item.id === post.issue_id) || null;
});
hexo.extend.helper.register("shit_edit_link", (post) => {
  const base = themeConfig().github?.edit_link;
  if (!base) return null;
  return `${base}${path.basename(post.source || "")}`;
});
