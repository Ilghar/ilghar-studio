/* Pause decorative tile loops when the user prefers reduced motion. */
(function () {
  function reduce() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function apply() {
    var off = reduce();
    document.querySelectorAll("video.tile-loop").forEach(function (v) {
      if (off) {
        v.pause();
        v.removeAttribute("autoplay");
        try { v.currentTime = 0; } catch {
          /* currentTime can throw if the media is not ready */
        }
      } else {
        v.setAttribute("autoplay", "");
        var play = v.play();
        if (play && play.catch) play.catch(function () {});
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
  var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.addEventListener) mq.addEventListener("change", apply);
  else if (mq.addListener) mq.addListener(apply);
})();
