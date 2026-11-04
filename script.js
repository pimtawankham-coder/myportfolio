// Minimal Portfolio — tiny helper script (no dependencies)

// 1) Reveal elements as they scroll into view
(function () {
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();

// 2) Current year in the footer
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// 3) Category filter on the My Work page
(function () {
  var chips = document.querySelectorAll(".chip[data-filter]");
  var grid = document.querySelector(".work-grid");
  if (!chips.length || !grid) return;

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.classList.toggle("is-active", c === chip); });
      grid.classList.toggle("is-filtered", f !== "all");
      grid.querySelectorAll(".work").forEach(function (w) {
        var show = f === "all" || w.getAttribute("data-cat") === f;
        w.hidden = !show;
        if (show) w.classList.add("in");
      });
    });
  });
})();
