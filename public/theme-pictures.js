/* Keep <picture> sources in sync with the theme toggle (data-theme),
   not only the OS prefers-color-scheme media they ship with. */
(function () {
  var DARK_MQ = "(prefers-color-scheme: dark)";

  function currentTheme() {
    var root = document.documentElement;
    var attr = root.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") return attr;
    if (root.classList.contains("dark")) return "dark";
    if (root.classList.contains("light")) return "light";
    try {
      var stored = localStorage.getItem("ilghar-theme");
      if (stored === "dark" || stored === "light") return stored;
    } catch {
      /* localStorage can throw in a blocked or private context */
    }
    return window.matchMedia(DARK_MQ).matches ? "dark" : "light";
  }

  function isThemeSource(source) {
    if (source.getAttribute("data-theme") === "dark" || source.getAttribute("data-theme") === "light") {
      return true;
    }
    var media = source.getAttribute("media") || "";
    return /prefers-color-scheme:\s*dark/i.test(media) || media === "all" || media === "not all";
  }

  function intendedTheme(source) {
    var marked = source.getAttribute("data-theme");
    if (marked === "dark" || marked === "light") return marked;
    return "dark";
  }

  function sync() {
    var theme = currentTheme();
    document.querySelectorAll("picture source").forEach(function (source) {
      if (!isThemeSource(source)) return;
      source.media = intendedTheme(source) === theme ? "all" : "not all";
    });
    document.querySelectorAll("picture.theme-src").forEach(function (pic) {
      var img = pic.querySelector("img");
      var light = pic.getAttribute("data-light");
      var dark = pic.getAttribute("data-dark");
      if (!img || !light || !dark) return;
      // Leave srcset pictures to the <source media> path above so high-DPI
      // sets stay intact. Plain src-only pictures (the SÁBÁT SVG covers)
      // get their img.src swapped so currentSrc matches the theme.
      if (img.getAttribute("srcset")) return;
      img.src = theme === "dark" ? dark : light;
    });
  }

  function start() {
    sync();
    new MutationObserver(sync).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
