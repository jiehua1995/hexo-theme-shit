document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const uiCopyCode = body?.dataset.uiCopyCode || "Copy code";
  const uiCopied = body?.dataset.uiCopied || "Copied";
  const uiCopyFailed = body?.dataset.uiCopyFailed || "Copy failed";
  const uiSearchLoading = body?.dataset.uiSearchLoading || "Loading index...";
  const uiSearchReady = body?.dataset.uiSearchReady || "__COUNT__ records ready.";
  const uiSearchResultsFor = body?.dataset.uiSearchResultsFor || "__COUNT__ results for \"__QUERY__\".";
  const uiSearchEmptyTitle = body?.dataset.uiSearchEmptyTitle || "No results found";
  const uiSearchEmptyText = body?.dataset.uiSearchEmptyText || "Try a different query.";
  const uiSearchFailed = body?.dataset.uiSearchFailed || "Search index could not be loaded.";
  const uiModeLight = body?.dataset.uiModeLight || "Light";
  const uiModeDark = body?.dataset.uiModeDark || "Dark";
  const uiModeSystem = body?.dataset.uiModeSystem || "System";
  const uiToggleTheme = body?.dataset.uiToggleTheme || "Toggle color mode";
  const defaultColorMode = body?.dataset.defaultColorMode || "system";

  const applyColorMode = (choice) => {
    document.documentElement.setAttribute("data-color-mode-choice", choice);
    document.documentElement.setAttribute("data-color-mode", choice);

    const toggle = document.querySelector("[data-color-mode-toggle='true']");
    if (toggle) {
      const icon = toggle.querySelector("i");
      if (icon) {
        icon.className =
          choice === "light"
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";
      }
      const currentLabel = choice === "light" ? uiModeLight : uiModeDark;
      toggle.setAttribute("title", `${uiToggleTheme}: ${currentLabel}`);
      toggle.setAttribute("aria-label", `${uiToggleTheme}: ${currentLabel}`);
    }
  };

  const getStoredColorMode = () => {
    try {
      return window.localStorage?.getItem("shitColorMode");
    } catch (_) {
      return null;
    }
  };

  const setStoredColorMode = (value) => {
    try {
      window.localStorage?.setItem("shitColorMode", value);
    } catch (_) {
      // Ignore storage failures.
    }
  };

  // First load: check system preference once, cache it
  const initColorMode = () => {
    const stored = getStoredColorMode();
    if (stored) return stored;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = prefersDark ? "dark" : "light";
    setStoredColorMode(initial);
    return initial;
  };

  applyColorMode(initColorMode());

  document.querySelector("[data-color-mode-toggle='true']")?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-color-mode-choice") || initColorMode();
    const next = current === "light" ? "dark" : "light";
    setStoredColorMode(next);
    applyColorMode(next);
  });

  const banner = document.querySelector(".satire-banner");
  const dismissButton = document.querySelector(".dismiss-banner");
  const bannerStorageKey = "shitBannerDismissed";
  if (banner && dismissButton) {
    try {
      if (window.localStorage?.getItem(bannerStorageKey) === "1") {
        banner.setAttribute("hidden", "hidden");
      }
    } catch (_) {
      // Ignore storage access issues and keep the banner visible by default.
    }

    dismissButton.addEventListener("click", () => {
      banner.setAttribute("hidden", "hidden");
      try {
        window.localStorage?.setItem(bannerStorageKey, "1");
      } catch (_) {
        // Ignore storage access issues and still hide the banner for this page view.
      }
    });
  }

  document.querySelectorAll(".copy-citation").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.getAttribute("data-citation") || "";
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = uiCopied;
      } catch (_) {
        button.textContent = uiCopyFailed;
      }
    });
  });

  document.querySelectorAll("figure.highlight").forEach((block) => {
    const codeElement = block.querySelector(".code pre") || block.querySelector("td.code > pre");
    if (!codeElement || block.querySelector(".copy-code")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-code";
    button.innerHTML = `<span class="copy-text"><i class="fa-regular fa-copy" aria-hidden="true"></i></span><span class="copied-text"><i class="fa-solid fa-check" aria-hidden="true"></i></span>`;
    button.setAttribute("title", uiCopyCode);

    button.addEventListener("click", async () => {
      const lines = codeElement.querySelectorAll(".line");
      const value = (lines.length
        ? Array.from(lines).map((line) => line.textContent || "").join("\n")
        : codeElement.textContent || ""
      ).replace(/\n+$/g, "");
      try {
        await navigator.clipboard.writeText(value);
        button.classList.add("copied");
        button.setAttribute("title", uiCopied);
      } catch (_) {
        button.setAttribute("title", uiCopyFailed);
      }
      window.setTimeout(() => {
        button.classList.remove("copied");
        button.setAttribute("title", uiCopyCode);
      }, 1400);
    });

    block.appendChild(button);
  });

  const filterForm = document.querySelector("#article-filters");
  if (filterForm) {
    const rows = Array.from(document.querySelectorAll(".filterable-article"));
    const emptyState = document.querySelector("#filter-empty-state");
    const pagination = document.querySelector("#articles-pagination");
    const inputs = Array.from(filterForm.querySelectorAll("select"));
    const resetButton = filterForm.querySelector(".filter-reset");
    const params = new URLSearchParams(window.location.search);

    inputs.forEach((input) => {
      const value = params.get(input.name);
      if (value) input.value = value;
    });

    const applyFilters = () => {
      const selected = Object.fromEntries(inputs.map((input) => [input.name, input.value.trim()]));
      let visibleCount = 0;

      rows.forEach((row) => {
        const tags = (row.dataset.tags || "").split(",").filter(Boolean);
        const matches =
          (!selected.type || row.dataset.articleType === selected.type) &&
          (!selected.collection || row.dataset.collection === selected.collection) &&
          (!selected.year || row.dataset.year === selected.year) &&
          (!selected.issue || row.dataset.issue === selected.issue) &&
          (!selected.tag || tags.includes(selected.tag));

        row.toggleAttribute("hidden", !matches);
        if (matches) visibleCount += 1;
      });

      emptyState?.classList.toggle("is-hidden", visibleCount > 0);
      if (pagination) pagination.toggleAttribute("hidden", Object.values(selected).some(Boolean));

      const nextParams = new URLSearchParams();
      Object.entries(selected).forEach(([key, value]) => {
        if (value) nextParams.set(key, value);
      });
      const nextUrl = nextParams.toString() ? `${window.location.pathname}?${nextParams.toString()}` : window.location.pathname;
      window.history.replaceState({}, "", nextUrl);
    };

    inputs.forEach((input) => input.addEventListener("change", applyFilters));
    resetButton?.addEventListener("click", () => {
      inputs.forEach((input) => {
        input.value = "";
      });
      applyFilters();
    });

    applyFilters();
  }

  const backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
    const toggleBackToTop = () => {
      backToTopButton.classList.toggle("is-visible", window.scrollY > 480);
    };

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();
  }

  const searchShell = document.querySelector("#site-search-dialog");
  const searchInput = document.querySelector("#site-search-input");
  const searchStatus = document.querySelector("#site-search-status");
  const searchResults = document.querySelector("#site-search-results");
  const searchOpeners = document.querySelectorAll("[data-search-open='true']");
  const searchClosers = document.querySelectorAll("[data-search-close='true']");
  const searchIndexUrl = searchShell?.getAttribute("data-index-url") || "/search-index.json";
  let searchIndex = null;

  const escapeHtml = (value = "") => String(value).replace(/[&<>"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
  }[char]));

  const renderSearchResults = (items) => {
    if (!searchResults) return;
    if (!items.length) {
      searchResults.innerHTML = `
        <article class="search-result-card">
          <h3>${escapeHtml(uiSearchEmptyTitle)}</h3>
          <p>${escapeHtml(uiSearchEmptyText)}</p>
        </article>
      `;
      return;
    }

    searchResults.innerHTML = items.slice(0, 12).map((item) => {
      const meta = [item.type === "article" ? "Article" : "Page", item.authors, item.collection].filter(Boolean).join(" | ");
      const summary = item.abstract || item.excerpt || "";
      const safeSummary = escapeHtml(summary);
      return `
        <article class="search-result-card">
          <div class="meta-line">${escapeHtml(meta)}</div>
          <h3><a href="${item.path}">${escapeHtml(item.title)}</a></h3>
          <p>${safeSummary.slice(0, 220)}</p>
        </article>
      `;
    }).join("");
  };

  const ensureSearchIndex = async () => {
    if (searchIndex) return searchIndex;
    const response = await fetch(searchIndexUrl, { headers: { Accept: "application/json" } });
    searchIndex = await response.json();
    return searchIndex;
  };

  const closeSearch = () => {
    if (!searchShell) return;
    searchShell.setAttribute("hidden", "hidden");
    searchShell.setAttribute("aria-hidden", "true");
  };

  const openSearch = async () => {
    if (!searchShell || !searchInput || !searchResults || !searchStatus) return;
    searchShell.removeAttribute("hidden");
    searchShell.setAttribute("aria-hidden", "false");
    searchStatus.textContent = uiSearchLoading;
    searchInput.focus();

    try {
      const items = await ensureSearchIndex();
      searchStatus.textContent = uiSearchReady.replace("__COUNT__", String(items.length));
      if (!searchInput.value.trim()) {
        renderSearchResults(items.slice(0, 6));
      }
    } catch (_) {
      searchStatus.textContent = uiSearchFailed;
      searchResults.innerHTML = "";
    }
  };

  searchOpeners.forEach((button) => {
    button.addEventListener("click", () => {
      openSearch();
    });
  });

  searchClosers.forEach((button) => {
    button.addEventListener("click", () => {
      closeSearch();
    });
  });

  document.addEventListener("keydown", (event) => {
    if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || event.key === "/") {
      const activeTag = document.activeElement?.tagName;
      if (activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
        event.preventDefault();
        openSearch();
      }
    }
    if (event.key === "Escape") {
      closeSearch();
    }
  });

  searchInput?.addEventListener("input", async () => {
    if (!searchStatus) return;
    const query = searchInput.value.trim().toLowerCase();
    try {
      const items = await ensureSearchIndex();
      if (!query) {
        searchStatus.textContent = uiSearchReady.replace("__COUNT__", String(items.length));
        renderSearchResults(items.slice(0, 6));
        return;
      }

      const results = items.filter((item) => {
        const haystack = [
          item.title,
          item.subtitle,
          item.abstract,
          item.excerpt,
          item.authors,
          item.collection,
          ...(item.tags || []),
        ].join(" ").toLowerCase();
        return haystack.includes(query);
      });

      searchStatus.textContent = uiSearchResultsFor
        .replace("__COUNT__", String(results.length))
        .replace("__SUFFIX__", results.length === 1 ? "" : "s")
        .replace("__QUERY__", query);
      renderSearchResults(results);
    } catch (_) {
      searchStatus.textContent = uiSearchFailed;
    }
  });

  // ============================================================
  // Scroll effects: fade-in + academic debris particles
  // ============================================================

  // --- Fade-in on scroll (IntersectionObserver) ---
  // Apply to container-level elements only, not individual text/headers
  const fadeEls = Array.from(document.querySelectorAll(
    "article.article-row," +
    "article.issue-card," +
    "article.collection-card," +
    "article.search-result-card," +
    "div.metric-card," +
    "div.sidebar-card," +
    "div.featured-article," +
    "div.issue-hero," +
    "div.metric-card-grid," +
    "div.card-grid," +
    "div.feature-grid," +
    "div.section-grid"
  ));
  if ("IntersectionObserver" in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    fadeEls.forEach((el) => {
      el.classList.add("fade-in");
      fadeObserver.observe(el);
    });
  }

  // --- Academic debris floating particles ---
  const debrisChars = ["§", "¶", "‡", "※", "⁂", "❧", "✠", "⸫", "⸪", "⁑"];
  const particleContainer = document.createElement("div");
  particleContainer.className = "debris-particles";
  particleContainer.setAttribute("aria-hidden", "true");
  document.body.appendChild(particleContainer);

  function spawnDebris() {
    const span = document.createElement("span");
    span.textContent = debrisChars[Math.floor(Math.random() * debrisChars.length)];
    const startX = Math.random() * window.innerWidth;
    const duration = 5000 + Math.random() * 9000;
    const size = 12 + Math.random() * 22;
    const drift = -120 + Math.random() * 240;
    span.style.cssText = `
      left: ${startX}px;
      top: -30px;
      font-size: ${size}px;
      opacity: 0.08 + Math.random() * 0.14;
      animation-duration: ${duration}ms;
      --drift: ${drift}px;
    `;
    particleContainer.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  }

  // Spawn 2 particles every 300ms for denser effect
  setInterval(() => {
    spawnDebris();
    spawnDebris();
  }, 300);
  // Pre-spawn a burst so it doesn't start empty
  for (let i = 0; i < 15; i++) {
    setTimeout(spawnDebris, i * 80);
  }
});
