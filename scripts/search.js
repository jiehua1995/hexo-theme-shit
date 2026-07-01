function stripMarkup(value = "") {
  return String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function withRoot(input = "") {
  const root = String(hexo.config.root || "/").replace(/\/+$/, "");
  const localPath = `/${String(input || "").replace(/^\/+/, "")}`;
  return `${root}${localPath}`.replace(/\/{2,}/g, "/");
}

hexo.extend.generator.register("shit_search_index", function (locals) {
  const posts = locals.posts.sort("-date").toArray().map((post) => ({
    type: "article",
    title: post.title,
    subtitle: post.subtitle || "",
    abstract: post.abstract || "",
    excerpt: stripMarkup(post.excerpt || post.content || ""),
    authors: Array.isArray(post.authors) ? post.authors.map((author) => author.name).join(", ") : (post.author || ""),
    tags: (post.tags || []).map((tag) => tag.name || tag.slug || String(tag)),
    collection: post.collection || "",
    path: withRoot(post.path || ""),
    date: post.date,
  }));

  const pages = locals.pages.toArray()
    .filter((page) => page.title && page.path && !String(page.path).startsWith("404"))
    .map((page) => ({
      type: "page",
      title: page.title,
      subtitle: "",
      abstract: page.description || "",
      excerpt: stripMarkup(page.content || ""),
      authors: "",
      tags: [],
      collection: "",
      path: withRoot(page.path || ""),
      date: page.date || null,
    }));

  return {
    path: "search-index.json",
    data: JSON.stringify([...posts, ...pages]),
  };
});
