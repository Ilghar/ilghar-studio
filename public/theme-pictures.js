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
    } catch (e) {}
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
