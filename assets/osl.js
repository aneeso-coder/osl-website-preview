/* Obsidian Supported Living — minimal progressive enhancement.
   No framework, no network requests. Everything degrades to working HTML. */
(function () {
  "use strict";

  /* ---- Theme -------------------------------------------------------- */
  var root = document.documentElement;
  var btn = document.querySelector(".theme-btn");

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function currentIsDark() {
    var set = root.getAttribute("data-theme");
    return set ? set === "dark" : systemPrefersDark();
  }
  function label() {
    if (!btn) return;
    var toDark = !currentIsDark();
    btn.setAttribute("aria-label", toDark ? "Switch to dark theme" : "Switch to light theme");
    btn.setAttribute("aria-pressed", String(currentIsDark()));
  }
  if (btn) {
    label();
    btn.addEventListener("click", function () {
      root.setAttribute("data-theme", currentIsDark() ? "light" : "dark");
      try { localStorage.setItem("osl-theme", root.getAttribute("data-theme")); } catch (e) {}
      label();
    });
  }

  /* ---- Mobile menu -------------------------------------------------- */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("primary-nav");
  var mq = window.matchMedia("(max-width: 60rem)");

  function syncNav() {
    if (!menuBtn || !nav) return;
    if (mq.matches) {
      nav.hidden = menuBtn.getAttribute("aria-expanded") !== "true";
    } else {
      nav.hidden = false;
    }
  }
  if (menuBtn && nav) {
    menuBtn.setAttribute("aria-expanded", "false");
    syncNav();
    menuBtn.addEventListener("click", function () {
      var open = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!open));
      syncNav();
    });
    (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(syncNav);
  }

  /* ---- Nav submenu disclosure --------------------------------------- */
  var discs = Array.prototype.slice.call(document.querySelectorAll(".nav__disclosure"));

  function closeAll(except) {
    discs.forEach(function (d) {
      if (d === except) return;
      d.setAttribute("aria-expanded", "false");
      var m = document.getElementById(d.getAttribute("aria-controls"));
      if (m) m.hidden = true;
    });
  }

  discs.forEach(function (d) {
    var menu = document.getElementById(d.getAttribute("aria-controls"));
    if (!menu) return;
    menu.hidden = true;
    d.setAttribute("aria-expanded", "false");

    d.addEventListener("click", function () {
      var open = d.getAttribute("aria-expanded") === "true";
      closeAll(d);
      d.setAttribute("aria-expanded", String(!open));
      menu.hidden = open;
    });

    d.parentElement.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && d.getAttribute("aria-expanded") === "true") {
        d.setAttribute("aria-expanded", "false");
        menu.hidden = true;
        d.focus();
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest || !e.target.closest(".nav__item--has-menu")) closeAll(null);
  });

  /* ---- Before/after comparison --------------------------------------
     The slider is a real <input type="range">, so keyboard, touch and
     screen-reader support come from the platform rather than from us.
     Without JS the seam sits at the CSS default and both photographs
     remain readable, each with its own alt text. */
  Array.prototype.slice.call(document.querySelectorAll(".ba__range")).forEach(function (range) {
    var stage = range.closest(".ba__stage");
    if (!stage) return;

    function paint() {
      stage.style.setProperty("--pos", range.value + "%");
      // Announce position as words, not a bare number.
      var pct = Number(range.value);
      var text = pct <= 2 ? "Showing the refurbished room"
               : pct >= 98 ? "Showing the room before refurbishment"
               : pct + "% before, " + (100 - pct) + "% after";
      range.setAttribute("aria-valuetext", text);
    }
    range.addEventListener("input", paint);
    paint();
  });

  /* ---- Footer year --------------------------------------------------- */
  var y = document.querySelector("[data-year]");
  if (y) {
    // Never regress below the launch year of this build.
    y.textContent = String(Math.max(2026, new Date().getFullYear()));
  }
})();
