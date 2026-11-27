(function () {
  "use strict";

  var CATEGORY_META = {
    curry:     { icon: "🍛", label: "Curry",              color: "var(--cat-curry)" },
    bread:     { icon: "🍞", label: "Bread",              color: "var(--cat-bread)" },
    protein:   { icon: "🥩", label: "Protein / Meat-alt", color: "var(--cat-protein)" },
    mains:     { icon: "🍽️", label: "Mains",              color: "var(--cat-mains)" },
    sauce:     { icon: "🥣", label: "Sauce / Base",       color: "var(--cat-sauce)" },
    condiment: { icon: "🧂", label: "Condiment",          color: "var(--cat-condiment)" }
  };
  var FALLBACK_META = { icon: "🍴", label: "", color: "var(--accent)" };

  // A more specific picture per recipe, so cards don't all look alike.
  var RECIPE_EMOJI = {
    "curry-base": "🥣",
    "savory-dry-seasoning-blend": "🧂",
    "madras-curry": "🌶️",
    "vegan-butter-tofu-makhani": "🍛",
    "kebab-shop-doner-wrap-bread": "🌯",
    "soya-milk-vegan-burger-buns": "🍔",
    "vegan-naan": "🫓",
    "water-based-vegan-burger-buns": "🍞",
    "seitan-steaks": "🥩",
    "gastropub-vegan-sausage-meat": "🌭",
    "smoky-savory-vegan-deli-ham": "🥪",
    "umami-burger": "🍔",
    "tofu-beef-mince": "🍝",
    "cauliflower-steaks-butter-bean-puree-chimichurri": "🥦",
    "cozy-italian-lentil-stew": "🍲",
    "crispy-tofu-shawarma": "🥙",
    "beefy-tofu-shepherds-pie": "🥧"
  };

  var FLOATIES = ["🥕", "🌶️", "🧄", "🍅", "🥦", "🌿", "🍋", "🧅"];

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  var state = {
    search: "",
    category: "all",
    tags: new Set(),
    unit: "metric",
    macroView: "serving", // "serving" | "100g" | "total"
    servingOverrides: {}, // recipeId -> servings number
    sizeOverrides: {}, // recipeId -> target item weight in grams (only for recipes with itemWeightG)
    cook: loadCook() // recipeId -> { i: [ingredient indexes], s: ["block-step"] }
  };

  function getMultiplier(r, servings, itemWeight) {
    var m = servings / r.servings;
    if (r.itemWeightG) m *= (itemWeight || r.itemWeightG) / r.itemWeightG;
    return m;
  }

  function metaFor(r) {
    var m = CATEGORY_META[r.category] || FALLBACK_META;
    return { icon: RECIPE_EMOJI[r.id] || m.icon, label: m.label || r.category, color: m.color };
  }

  var els = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    els.grid = document.getElementById("recipeGrid");
    els.search = document.getElementById("searchInput");
    els.catPills = document.getElementById("catPills");
    els.tagChips = document.getElementById("tagChips");
    els.resultsCount = document.getElementById("resultsCount");
    els.emptyState = document.getElementById("emptyState");
    els.modalOverlay = document.getElementById("modalOverlay");
    els.modal = document.getElementById("modal");
    els.unitToggleBtns = document.querySelectorAll("#unitToggle button");
    els.themeToggleBtns = document.querySelectorAll("#themeToggle button");
    els.macroViewBtns = document.querySelectorAll("#macroViewToggle button");
    els.backToTop = document.getElementById("backToTop");

    buildFloaties();
    buildCategoryPills();
    buildTagChips();
    bindGlobalEvents();

    // Guard against browsers restoring stale form values on reload/bfcache.
    els.search.value = "";
    applyStoredTheme();
    render();
  }

  // ---------- decoration ----------

  function buildFloaties() {
    var box = document.getElementById("floaties");
    if (!box || reduceMotion) return;
    FLOATIES.forEach(function (e, i) {
      var s = document.createElement("span");
      s.textContent = e;
      s.style.left = (8 + i * 11.5 + Math.random() * 4) + "%";
      s.style.top = (Math.random() * 70) + "%";
      s.style.animationDelay = (-Math.random() * 6) + "s";
      s.style.animationDuration = (5 + Math.random() * 4) + "s";
      s.style.fontSize = (1.4 + Math.random() * 1.2) + "rem";
      s.style.opacity = 0.25 + Math.random() * 0.35;
      box.appendChild(s);
    });
  }

  // ---------- filters ----------

  function buildCategoryPills() {
    var counts = {};
    RECIPES.forEach(function (r) { counts[r.category] = (counts[r.category] || 0) + 1; });
    var cats = Object.keys(counts).sort();
    var all = [{ key: "all", icon: "✨", label: "All", color: "var(--accent)", n: RECIPES.length }]
      .concat(cats.map(function (c) {
        var m = CATEGORY_META[c] || FALLBACK_META;
        return { key: c, icon: m.icon, label: m.label || c, color: m.color, n: counts[c] };
      }));
    all.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "cat-pill" + (c.key === state.category ? " active" : "");
      b.style.setProperty("--c", c.color);
      b.setAttribute("data-cat", c.key);
      b.setAttribute("aria-pressed", c.key === state.category ? "true" : "false");
      b.innerHTML = '<span class="em">' + c.icon + '</span>' + escapeHtml(c.label) + ' <span class="n">' + c.n + '</span>';
      b.addEventListener("click", function () { setCategory(c.key); });
      els.catPills.appendChild(b);
    });
  }

  function setCategory(key) {
    state.category = key;
    els.catPills.querySelectorAll(".cat-pill").forEach(function (p) {
      var on = p.getAttribute("data-cat") === key;
      p.classList.toggle("active", on);
      p.setAttribute("aria-pressed", on ? "true" : "false");
    });
    render();
  }

  function buildTagChips() {
    var tagSet = new Set();
    RECIPES.forEach(function (r) { (r.tags || []).forEach(function (t) { tagSet.add(t); }); });
    Array.from(tagSet).sort().forEach(function (tag) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = tag;
      chip.setAttribute("aria-pressed", "false");
      chip.addEventListener("click", function () {
        var on = !state.tags.has(tag);
        if (on) state.tags.add(tag); else state.tags.delete(tag);
        chip.classList.toggle("active", on);
        chip.setAttribute("aria-pressed", on ? "true" : "false");
        render();
      });
      els.tagChips.appendChild(chip);
    });
  }

  function clearFilters() {
    state.search = "";
    state.tags.clear();
    els.search.value = "";
    els.tagChips.querySelectorAll(".chip.active").forEach(function (c) {
      c.classList.remove("active");
      c.setAttribute("aria-pressed", "false");
    });
    setCategory("all");
  }

  function bindGlobalEvents() {
    els.search.addEventListener("input", function (e) {
      state.search = e.target.value.trim().toLowerCase();
      render();
    });
    els.unitToggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.unit = btn.getAttribute("data-unit");
        els.unitToggleBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        render();
        if (currentOpenId) rerenderModal();
      });
    });
    els.themeToggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTheme(btn.getAttribute("data-theme"));
        els.themeToggleBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
      });
    });
    els.macroViewBtns.forEach(function (btn) {
      btn.addEventListener("click", function () { setMacroView(btn.getAttribute("data-macroview")); });
    });
    els.modalOverlay.addEventListener("click", function (e) {
      if (e.target === els.modalOverlay) closeModal();
    });
    document.getElementById("clearFiltersBtn").addEventListener("click", clearFilters);
    document.getElementById("surpriseBtn").addEventListener("click", surprise);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
    window.addEventListener("scroll", function () {
      els.backToTop.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
    els.backToTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });
  }

  function setMacroView(view) {
    state.macroView = view;
    els.macroViewBtns.forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-macroview") === view); });
    render();
    if (currentOpenId) rerenderModal();
  }

  function setTheme(mode) {
    if (mode === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", mode);
    try { localStorage.setItem("recipeSiteTheme", mode); } catch (e) {}
  }

  function applyStoredTheme() {
    var stored = "system";
    try { stored = localStorage.getItem("recipeSiteTheme") || "system"; } catch (e) {}
    setTheme(stored);
    els.themeToggleBtns.forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-theme") === stored);
    });
  }

  function matchesFilters(r) {
    if (state.category !== "all" && r.category !== state.category) return false;
    if (state.tags.size > 0) {
      var rTags = new Set(r.tags || []);
      for (var t of state.tags) { if (!rTags.has(t)) return false; }
    }
    if (state.search) {
      var haystack = r.title.toLowerCase() + " " + (r.tags || []).join(" ").toLowerCase() +
        " " + r.ingredients.map(function (i) { return i.name + " " + (i.label || ""); }).join(" ").toLowerCase();
      if (haystack.indexOf(state.search) === -1) return false;
    }
    return true;
  }

  // Spin through a few cards, then open one at random from the current results.
  function surprise() {
    var list = RECIPES.filter(matchesFilters);
    if (!list.length) list = RECIPES;
    var pick = list[Math.floor(Math.random() * list.length)];
    var cards = Array.from(els.grid.querySelectorAll(".recipe-card"));
    if (reduceMotion || cards.length < 2) { openRecipe(pick.id); return; }
    var hops = 9, n = 0;
    (function hop() {
      cards.forEach(function (c) { c.style.outline = ""; });
      if (n >= hops) {
        var target = els.grid.querySelector('[data-id="' + pick.id + '"]');
        if (target) target.scrollIntoView({ block: "center", behavior: "smooth" });
        setTimeout(function () { openRecipe(pick.id); }, 250);
        return;
      }
      var c = cards[Math.floor(Math.random() * cards.length)];
      c.style.outline = "3px solid var(--c)";
      n++;
      setTimeout(hop, 60 + n * 12);
    })();
  }

  // ---------- nutrition math ----------

  function computeMacros(recipe, servings, itemWeight) {
    var multiplier = getMultiplier(recipe, servings, itemWeight);
    var totals = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    recipe.ingredients.forEach(function (ing) {
      var info = NUTRITION[ing.name];
      if (!info) return;
      var grams = (ing.grams || 0) * multiplier;
      totals.kcal += info.kcal * grams / 100;
      totals.protein += info.protein * grams / 100;
      totals.carbs += info.carbs * grams / 100;
      totals.fat += info.fat * grams / 100;
    });
    return totals;
  }

  function computeTotalWeightG(recipe, servings, itemWeight) {
    var multiplier = getMultiplier(recipe, servings, itemWeight);
    var total = 0;
    recipe.ingredients.forEach(function (ing) { total += (ing.grams || 0) * multiplier; });
    return total;
  }

  function scaleMacros(m, f) {
    return { kcal: m.kcal * f, protein: m.protein * f, carbs: m.carbs * f, fat: m.fat * f };
  }

  // The macros for the chosen basis ("Per serving", "Per 100g", "Total").
  function getDisplayMacros(recipe, servings, itemWeight, view) {
    var totals = computeMacros(recipe, servings, itemWeight);
    view = view || state.macroView;
    if (view === "total") return { values: totals, heading: "Total" };
    if (view === "100g") {
      var w = computeTotalWeightG(recipe, servings, itemWeight);
      return { values: w > 0 ? scaleMacros(totals, 100 / w) : scaleMacros(totals, 0), heading: "Per 100g" };
    }
    return { values: scaleMacros(totals, 1 / servings), heading: "Per serving" };
  }

  // Share of calories from protein / carbs / fat (4 / 4 / 9 kcal per gram).
  function energySplit(v) {
    var p = v.protein * 4, c = v.carbs * 4, f = v.fat * 9, t = p + c + f;
    if (t <= 0) return { p: 0, c: 0, f: 0 };
    return { p: p / t, c: c / t, f: f / t };
  }

  function round1(n) { return Math.round(n * 10) / 10; }
  function roundInt(n) { return Math.round(n); }

  // ---------- unit conversion ----------

  function formatQty(n) {
    if (n === 0) return "0";
    var rounded = Math.round(n * 100) / 100;
    if (Math.abs(rounded - Math.round(rounded)) < 0.01) return String(Math.round(rounded));
    return rounded.toFixed(rounded < 10 ? 2 : 1).replace(/0+$/, "").replace(/\.$/, "");
  }

  function convertForDisplay(ing, multiplier, unitMode) {
    var qty = ing.qty * multiplier;
    var unit = ing.unit;
    if (unitMode === "metric") {
      if (unit === "tbsp") { qty = qty * 15; unit = "ml"; }
      else if (unit === "tsp") { qty = qty * 5; unit = "ml"; }
      else if (unit === "cup") { qty = qty * 240; unit = "ml"; }
    } else {
      if (unit === "g" && qty >= 10) { qty = qty / 28.35; unit = "oz"; }
      else if (unit === "ml") {
        if (qty >= 240) { qty = qty / 240; unit = "cup"; }
        else if (qty >= 15) { qty = qty / 15; unit = "tbsp"; }
        else { qty = qty / 5; unit = "tsp"; }
      }
    }
    return { qty: qty, unit: unit };
  }

  function ingredientLine(ing, multiplier, unitMode) {
    if (ing.unit === "to taste") return ing.displayText || "to taste";
    if (ing.unit === "pinch") {
      var pn = Math.round(ing.qty * multiplier * 10) / 10;
      return (pn === 1 ? "1 pinch" : formatQty(pn) + " pinches") + noteSuffix(ing, multiplier);
    }
    if (ing.unit === "count" || ing.unit === "clove") {
      var cn = ing.qty * multiplier;
      var label = ing.unit === "clove" ? (cn === 1 ? "clove" : "cloves") : "";
      return formatQty(cn) + (label ? " " + label : "") + noteSuffix(ing, multiplier);
    }
    var conv = convertForDisplay(ing, multiplier, unitMode);
    return formatQty(conv.qty) + " " + conv.unit;
  }

  // displayText describes the unscaled recipe, so say so once quantities change.
  function noteSuffix(ing, multiplier) {
    if (!ing.displayText) return "";
    var scaled = Math.abs(multiplier - 1) > 0.001;
    return " (" + (scaled ? "base recipe: " : "") + ing.displayText + ")";
  }

  function shortName(ing) {
    if (ing.label) return ing.label;
    // Capitalise after spaces and "(" only, so "purée" doesn't become "PuréE".
    return ing.name.replace(/(^|[\s(])(\S)/g, function (m, a, c) { return a + c.toUpperCase(); });
  }

  // "patty" -> "patties"; other units just take an "s".
  function pluralUnit(unit) {
    return unit.replace(/([^aeiou])y$/, "$1ie") + "s";
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---------- grid ----------

  function render() {
    var list = RECIPES.filter(matchesFilters);
    els.grid.innerHTML = "";
    els.resultsCount.textContent = list.length + (list.length === 1 ? " recipe" : " recipes");
    els.emptyState.classList.toggle("hidden", list.length !== 0);

    list.forEach(function (r, idx) {
      var servings = state.servingOverrides[r.id] || r.servings;
      var itemWeight = state.sizeOverrides[r.id] || r.itemWeightG;
      var display = getDisplayMacros(r, servings, itemWeight);
      var split = energySplit(display.values);
      var meta = metaFor(r);
      var progress = cookProgress(r);

      var card = document.createElement("article");
      card.className = "recipe-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Open " + r.title);
      card.setAttribute("data-id", r.id);
      card.style.setProperty("--c", meta.color);
      card.style.setProperty("--i", idx);

      card.innerHTML =
        '<div class="card-banner">' +
          '<span class="card-cat">' + escapeHtml(meta.label) + '</span>' +
          '<span class="big-emoji" aria-hidden="true">' + meta.icon + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<p class="card-title">' + escapeHtml(r.title) + '</p>' +
          '<div class="card-meta">' +
            '<span>⏱ ' + escapeHtml(r.prepTime || "") + '</span>' +
            '<span>🔥 ' + escapeHtml(r.cookTime || "") + '</span>' +
            '<span>🍽 ' + servings + " " + (r.itemUnit ? (servings === 1 ? r.itemUnit : pluralUnit(r.itemUnit)) : (servings === 1 ? "serving" : "servings")) + '</span>' +
            (r.itemUnit ? '<span>⚖ ' + (state.unit === "imperial" ? round1(itemWeight / 28.35) + "oz" : round1(itemWeight) + "g") + ' / ' + r.itemUnit + '</span>' : '') +
            (progress.done > 0 ? '<span>👩‍🍳 ' + Math.round(progress.pct * 100) + '% cooked</span>' : '') +
          '</div>' +
          '<p class="card-macros-label">' + escapeHtml(display.heading) + '</p>' +
          '<div class="card-macros">' +
            macroBox(roundInt(display.values.kcal), "kcal", "kcal") +
            macroBox(round1(display.values.protein) + "g", "protein") +
            macroBox(round1(display.values.carbs) + "g", "carbs") +
            macroBox(round1(display.values.fat) + "g", "fat") +
          '</div>' +
          '<div class="macro-bar" title="Calories from protein / carbs / fat">' +
            '<i class="p" style="width:' + (split.p * 100) + '%"></i>' +
            '<i class="c" style="width:' + (split.c * 100) + '%"></i>' +
            '<i class="f" style="width:' + (split.f * 100) + '%"></i>' +
          '</div>' +
          '<div class="card-tags">' + (r.tags || []).map(function (t) { return '<span class="tag-pill">#' + escapeHtml(t) + '</span>'; }).join("") + '</div>' +
        '</div>';

      card.addEventListener("click", function () { openRecipe(r.id); });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openRecipe(r.id); }
      });
      if (finePointer && !reduceMotion) addTilt(card);

      els.grid.appendChild(card);
    });
  }

  // 3D tilt + spotlight that follows the cursor.
  function addTilt(card) {
    card.addEventListener("animationend", function () { card.style.animation = "none"; }, { once: true });
    card.addEventListener("pointermove", function (e) {
      var b = card.getBoundingClientRect();
      var x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
      card.style.setProperty("--ry", ((x - 0.5) * 10) + "deg");
      card.style.setProperty("--rx", ((0.5 - y) * 8) + "deg");
      card.style.setProperty("--mx", (x * 100) + "%");
      card.style.setProperty("--my", (y * 100) + "%");
    });
    card.addEventListener("pointerleave", function () {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  }

  function macroBox(value, label, cls) {
    return '<div class="macro-box' + (cls ? " " + cls : "") + '"><span class="v">' + value + '</span><span class="l">' + label + '</span></div>';
  }

  // ---------- cook-mode progress (saved in this browser) ----------

  function loadCook() {
    try { return JSON.parse(localStorage.getItem("recipeSiteCook") || "{}") || {}; } catch (e) { return {}; }
  }
  function saveCook() {
    try { localStorage.setItem("recipeSiteCook", JSON.stringify(state.cook)); } catch (e) {}
  }
  function cookFor(id) {
    if (!state.cook[id]) state.cook[id] = { i: [], s: [] };
    return state.cook[id];
  }
  function cookProgress(r) {
    var c = state.cook[r.id] || { i: [], s: [] };
    var total = r.ingredients.length + r.instructions.reduce(function (n, b) { return n + b.steps.length; }, 0);
    var done = c.i.length + c.s.length;
    return { done: done, total: total, pct: total ? done / total : 0 };
  }
  function toggleIn(arr, v) {
    var k = arr.indexOf(v);
    if (k === -1) arr.push(v); else arr.splice(k, 1);
    return k === -1;
  }

  // ---------- modal ----------

  var currentOpenId = null;
  var lastFocus = null;

  function openRecipe(id) {
    var r = RECIPES.find(function (x) { return x.id === id; });
    if (!r) return;
    if (!currentOpenId) lastFocus = document.activeElement;
    currentOpenId = id;
    els.modal.classList.remove("rerender");
    // restart entrance animation
    els.modal.style.animation = "none";
    void els.modal.offsetWidth;
    els.modal.style.animation = "";
    renderModal(r);
    els.modalOverlay.classList.remove("hidden");
    els.modalOverlay.scrollTop = 0;
    document.body.classList.add("modal-open");
    var close = els.modal.querySelector(".modal-close");
    if (close) close.focus({ preventScroll: true });
    countUp(els.modal.querySelector(".donut .center b"));
  }

  function rerenderModal() {
    var r = RECIPES.find(function (x) { return x.id === currentOpenId; });
    if (!r) return;
    var scroll = els.modalOverlay.scrollTop;
    var focusedId = document.activeElement && document.activeElement.id;
    els.modal.classList.add("rerender");
    renderModal(r);
    els.modalOverlay.scrollTop = scroll;
    if (focusedId) { var f = document.getElementById(focusedId); if (f) f.focus({ preventScroll: true }); }
  }

  function closeModal() {
    if (!currentOpenId) return;
    els.modalOverlay.classList.add("hidden");
    document.body.classList.remove("modal-open");
    currentOpenId = null;
    render();
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function countUp(el) {
    if (!el || reduceMotion) return;
    var target = parseFloat(el.textContent) || 0, start = performance.now(), dur = 900;
    (function tick(now) {
      var t = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * e);
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  function renderIngredientGroups(r, multiplier, cook) {
    var groups = [], byName = {};
    r.ingredients.forEach(function (ing, idx) {
      var g = ing.group || "";
      if (!byName[g]) { byName[g] = { name: g, items: [] }; groups.push(byName[g]); }
      byName[g].items.push({ ing: ing, idx: idx });
    });
    return groups.map(function (g) {
      return '<div class="ingredient-group">' + (g.name ? '<h4>' + escapeHtml(g.name) + '</h4>' : '') +
        '<ul class="ingredient-list">' + g.items.map(function (it) {
          var done = cook.i.indexOf(it.idx) !== -1;
          return '<li data-ing="' + it.idx + '" class="' + (done ? "done" : "") + '" role="checkbox" tabindex="0" aria-checked="' + done + '">' +
            '<span class="check" aria-hidden="true"></span>' +
            '<span class="ing-name">' + escapeHtml(shortName(it.ing)) + '</span>' +
            '<span class="ing-qty">' + escapeHtml(ingredientLine(it.ing, multiplier, state.unit)) + '</span></li>';
        }).join("") + '</ul></div>';
    }).join("");
  }

  function renderInstructions(r, cook) {
    var counter = 0, currentKey = null;
    r.instructions.forEach(function (b, bi) {
      b.steps.forEach(function (s, si) {
        var key = bi + "-" + si;
        if (currentKey === null && cook.s.indexOf(key) === -1) currentKey = key;
      });
    });
    return r.instructions.map(function (block, bi) {
      var start = counter;
      counter += block.steps.length;
      return '<div class="instructions-block">' +
        (block.section ? '<h4>' + escapeHtml(block.section) + '</h4>' : '') +
        '<ol style="counter-reset: step ' + start + '" start="' + (start + 1) + '">' + block.steps.map(function (s, si) {
          var key = bi + "-" + si;
          var done = cook.s.indexOf(key) !== -1;
          var cls = done ? "done" : (key === currentKey ? "current" : "");
          return '<li data-step="' + key + '" class="' + cls + '" role="checkbox" tabindex="0" aria-checked="' + done + '"><span>' + escapeHtml(s) + '</span></li>';
        }).join("") + '</ol></div>';
    }).join("");
  }

  function renderModal(r) {
    var servings = state.servingOverrides[r.id] || r.servings;
    var itemWeight = state.sizeOverrides[r.id] || r.itemWeightG;
    var meta = metaFor(r);
    var multiplier = getMultiplier(r, servings, itemWeight);
    var display = getDisplayMacros(r, servings, itemWeight);
    var v = display.values;
    var split = energySplit(v);
    var cook = cookFor(r.id);
    var progress = cookProgress(r);
    var isImperial = state.unit === "imperial";

    els.modal.style.setProperty("--c", meta.color);
    els.modal.setAttribute("aria-label", r.title);

    var notesHtml = (r.notes && r.notes.length)
      ? '<div class="modal-notes"><strong>Notes</strong><ul>' +
          r.notes.map(function (n) { return "<li>" + escapeHtml(n) + "</li>"; }).join("") + '</ul></div>'
      : "";

    var yieldHtml = "";
    if (r.yieldPerServingMl) {
      var totalMl = r.yieldPerServingMl * servings;
      var ytext = isImperial ? round1(totalMl / 29.57) + " fl oz" : (totalMl >= 1000 ? round1(totalMl / 1000) + "L" : roundInt(totalMl) + "ml");
      yieldHtml = '<p class="yield-line">Approx. total yield: <strong>' + ytext + '</strong></p>';
    }

    var sizeHtml = "";
    if (r.itemUnit) {
      var unitLbl = isImperial ? "oz" : "g";
      var dispVal = isImperial ? round1(itemWeight / 28.35) : round1(itemWeight);
      var defVal = isImperial ? round1(r.itemWeightG / 28.35) : r.itemWeightG;
      sizeHtml =
        '<div class="serving-control">' +
          '<label for="sizeInput">' + escapeHtml(r.itemUnit.charAt(0).toUpperCase() + r.itemUnit.slice(1)) + ' size (' + unitLbl + ')</label>' +
          '<div class="stepper">' +
            '<button id="sizeDown" type="button" aria-label="Smaller">−</button>' +
            '<input id="sizeInput" type="number" min="0.1" step="' + (isImperial ? 0.5 : 5) + '" value="' + dispVal + '">' +
            '<button id="sizeUp" type="button" aria-label="Bigger">+</button>' +
          '</div>' +
          '<span class="hint">default ' + defVal + unitLbl + '</span>' +
        '</div>';
    }

    // donut segments (r = 60, circumference ≈ 376.99)
    var C = 2 * Math.PI * 60, off = 0;
    var segs = [["p", split.p, "var(--protein-c)"], ["c", split.c, "var(--carbs-c)"], ["f", split.f, "var(--fat-c)"]].map(function (s) {
      var len = s[1] * C;
      var html = '<circle class="seg" cx="75" cy="75" r="60" stroke="' + s[2] + '" stroke-dasharray="' + len + ' ' + (C - len) + '" stroke-dashoffset="' + (-off) + '"></circle>';
      off += len;
      return html;
    }).join("");
    var maxG = Math.max(v.protein, v.carbs, v.fat, 0.001);
    function row(label, val, color) {
      return '<div class="nutri-row"><span><i class="dot" style="background:' + color + '"></i>' + label + '</span>' +
        '<span class="track"><span class="fill" style="width:' + (val / maxG * 100) + '%;background:' + color + '"></span></span>' +
        '<span class="num">' + round1(val) + 'g</span></div>';
    }

    els.modal.innerHTML =
      '<div class="modal-hero">' +
        '<button class="modal-close" type="button" aria-label="Close">✕</button>' +
        '<span class="card-cat">' + escapeHtml(meta.label) + '</span>' +
        '<h2>' + escapeHtml(r.title) + '</h2>' +
        '<div class="hero-meta"><span>⏱ ' + escapeHtml(r.prepTime || "") + ' prep</span><span>🔥 ' + escapeHtml(r.cookTime || "") + ' cook</span></div>' +
        '<span class="big-emoji" aria-hidden="true">' + meta.icon + '</span>' +
      '</div>' +
      '<div class="modal-body">' +
        notesHtml +
        '<div class="controls-panel">' +
          '<div class="serving-control">' +
            '<label for="servingInput">' + (r.itemUnit ? ("Number of " + pluralUnit(r.itemUnit)) : "Servings") + '</label>' +
            '<div class="stepper">' +
              '<button id="servDown" type="button" aria-label="Fewer">−</button>' +
              '<input id="servingInput" type="number" min="1" step="1" value="' + servings + '">' +
              '<button id="servUp" type="button" aria-label="More">+</button>' +
            '</div>' +
            '<span class="hint">default ' + r.servings + '</span>' +
          '</div>' +
          sizeHtml +
        '</div>' +
        yieldHtml +
        '<div class="nutri">' +
          '<div class="donut"><svg viewBox="0 0 150 150" aria-hidden="true"><circle class="track" cx="75" cy="75" r="60"></circle>' + segs + '</svg>' +
            '<div class="center"><b>' + roundInt(v.kcal) + '</b><small>kcal</small></div></div>' +
          '<div>' +
            '<div class="nutri-tabs" role="group" aria-label="Nutrition basis">' +
              [["serving", "Per serving"], ["100g", "Per 100g"], ["total", "Total"]].map(function (t) {
                return '<button type="button" data-view="' + t[0] + '" class="' + (state.macroView === t[0] ? "active" : "") + '">' + t[1] + '</button>';
              }).join("") +
            '</div>' +
            '<div class="nutri-rows">' +
              row("Protein", v.protein, "var(--protein-c)") +
              row("Carbs", v.carbs, "var(--carbs-c)") +
              row("Fat", v.fat, "var(--fat-c)") +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="progress-wrap"><span>👩‍🍳 Cook mode</span><span class="track"><span class="fill" style="width:' + (progress.pct * 100) + '%"></span></span>' +
          '<span>' + progress.done + '/' + progress.total + '</span>' +
          (progress.done ? '<button type="button" class="reset-btn" id="resetCook">Reset</button>' : '') + '</div>' +
        '<h3 class="section-title">Ingredients <small>tap to tick off</small></h3>' +
        renderIngredientGroups(r, multiplier, cook) +
        '<h3 class="section-title">Method <small>tap each step when done</small></h3>' +
        renderInstructions(r, cook) +
      '</div>';

    bindModal(r, servings);
  }

  function bindModal(r, servings) {
    var m = els.modal;
    m.querySelector(".modal-close").addEventListener("click", closeModal);

    var input = m.querySelector("#servingInput");
    function setServ(v) { v = Math.max(1, v); input.value = v; state.servingOverrides[r.id] = v; rerenderModal(); }
    m.querySelector("#servDown").addEventListener("click", function () { setServ((parseFloat(input.value) || r.servings) - 1); });
    m.querySelector("#servUp").addEventListener("click", function () { setServ((parseFloat(input.value) || r.servings) + 1); });
    input.addEventListener("change", function () { setServ(parseFloat(input.value) || r.servings); });

    if (r.itemUnit) {
      var isImperial = state.unit === "imperial";
      var step = isImperial ? 0.5 : 5;
      var toGrams = function (v) { return isImperial ? v * 28.35 : v; };
      var def = isImperial ? round1(r.itemWeightG / 28.35) : r.itemWeightG;
      var size = m.querySelector("#sizeInput");
      function setSize(v) { v = Math.max(0.1, v); size.value = v; state.sizeOverrides[r.id] = toGrams(v); rerenderModal(); }
      m.querySelector("#sizeDown").addEventListener("click", function () { setSize((parseFloat(size.value) || def) - step); });
      m.querySelector("#sizeUp").addEventListener("click", function () { setSize((parseFloat(size.value) || def) + step); });
      size.addEventListener("change", function () { setSize(parseFloat(size.value) || def); });
    }

    m.querySelectorAll(".nutri-tabs button").forEach(function (b) {
      b.addEventListener("click", function () { setMacroView(b.getAttribute("data-view")); });
    });

    var reset = m.querySelector("#resetCook");
    if (reset) reset.addEventListener("click", function () {
      state.cook[r.id] = { i: [], s: [] };
      saveCook();
      rerenderModal();
    });

    var cook = cookFor(r.id);
    function activate(el, fn) {
      el.addEventListener("click", fn);
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(e); }
      });
    }
    m.querySelectorAll("[data-ing]").forEach(function (li) {
      activate(li, function (e) {
        var on = toggleIn(cook.i, parseInt(li.getAttribute("data-ing"), 10));
        afterTick(r, on, e);
      });
    });
    m.querySelectorAll("[data-step]").forEach(function (li) {
      activate(li, function (e) {
        var on = toggleIn(cook.s, li.getAttribute("data-step"));
        afterTick(r, on, e);
      });
    });
  }

  function afterTick(r, on, e) {
    saveCook();
    var focusedKey = document.activeElement && (document.activeElement.getAttribute("data-ing") || document.activeElement.getAttribute("data-step"));
    rerenderModal();
    if (focusedKey !== null && focusedKey !== undefined) {
      var el = els.modal.querySelector('[data-ing="' + focusedKey + '"], [data-step="' + focusedKey + '"]');
      if (el) el.focus({ preventScroll: true });
    }
    if (!on) return;
    var p = cookProgress(r);
    if (p.done === p.total) {
      confetti(window.innerWidth / 2, window.innerHeight / 2, 120);
      toast("🎉 " + r.title + " — done! Enjoy!");
    } else if (e && e.clientX) {
      confetti(e.clientX, e.clientY, 14);
    }
  }

  // ---------- celebration ----------

  var CONFETTI_COLORS = ["#ff4f7b", "#ffb703", "#2ec4b6", "#8e5cff", "#ff9f1c", "#13b38b"];
  function confetti(x, y, n) {
    if (reduceMotion) return;
    for (var k = 0; k < n; k++) {
      var p = document.createElement("i");
      p.className = "confetti";
      var ang = Math.random() * Math.PI * 2, dist = 60 + Math.random() * (n > 50 ? 420 : 120);
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.background = CONFETTI_COLORS[k % CONFETTI_COLORS.length];
      p.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      p.style.setProperty("--dy", (Math.sin(ang) * dist + 200 + Math.random() * 200) + "px");
      p.style.setProperty("--rot", (Math.random() * 1080 - 540) + "deg");
      p.style.animationDuration = (1 + Math.random() * 0.9) + "s";
      if (Math.random() > 0.5) p.style.borderRadius = "50%";
      document.body.appendChild(p);
      p.addEventListener("animationend", function () { this.remove(); });
    }
  }

  function toast(text) {
    var t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2700);
  }

})();
