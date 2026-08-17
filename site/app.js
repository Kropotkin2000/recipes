(function () {
  "use strict";

  var CATEGORY_META = {
    curry:     { icon: "🍛", label: "Curry",          color: "var(--cat-curry)" },
    bread:     { icon: "🍞", label: "Bread",           color: "var(--cat-bread)" },
    protein:   { icon: "🥩", label: "Protein / Meat-alt", color: "var(--cat-protein)" },
    mains:     { icon: "🍽️", label: "Mains",           color: "var(--cat-mains)" },
    sauce:     { icon: "🥣", label: "Sauce / Base",    color: "var(--cat-sauce)" },
    condiment: { icon: "🧂", label: "Condiment",       color: "var(--cat-condiment)" }
  };

  var state = {
    search: "",
    category: "all",
    tags: new Set(),
    unit: "metric",
    servingOverrides: {} // recipeId -> servings number
  };

  var els = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    els.grid = document.getElementById("recipeGrid");
    els.search = document.getElementById("searchInput");
    els.category = document.getElementById("categorySelect");
    els.tagChips = document.getElementById("tagChips");
    els.resultsCount = document.getElementById("resultsCount");
    els.emptyState = document.getElementById("emptyState");
    els.modalOverlay = document.getElementById("modalOverlay");
    els.modal = document.getElementById("modal");
    els.unitToggleBtns = document.querySelectorAll("#unitToggle button");
    els.themeToggleBtns = document.querySelectorAll("#themeToggle button");

    buildCategoryOptions();
    buildTagChips();
    bindGlobalEvents();

    // Guard against browsers restoring stale form values on reload/bfcache,
    // which would leave the visible controls out of sync with fresh state.
    els.search.value = "";
    els.category.value = "all";
    state.search = "";
    state.category = "all";
    state.tags.clear();
    els.tagChips.querySelectorAll(".chip.active").forEach(function (c) { c.classList.remove("active"); });
    applyStoredTheme();
    render();
  }

  function buildCategoryOptions() {
    var cats = Array.from(new Set(RECIPES.map(function (r) { return r.category; }))).sort();
    var frag = document.createDocumentFragment();
    var optAll = document.createElement("option");
    optAll.value = "all";
    optAll.textContent = "All categories";
    frag.appendChild(optAll);
    cats.forEach(function (c) {
      var opt = document.createElement("option");
      opt.value = c;
      var meta = CATEGORY_META[c];
      opt.textContent = meta ? meta.icon + " " + meta.label : c;
      frag.appendChild(opt);
    });
    els.category.appendChild(frag);
  }

  function buildTagChips() {
    var tagSet = new Set();
    RECIPES.forEach(function (r) { (r.tags || []).forEach(function (t) { tagSet.add(t); }); });
    var tags = Array.from(tagSet).sort();
    tags.forEach(function (tag) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = tag;
      chip.addEventListener("click", function () {
        if (state.tags.has(tag)) { state.tags.delete(tag); chip.classList.remove("active"); }
        else { state.tags.add(tag); chip.classList.add("active"); }
        render();
      });
      els.tagChips.appendChild(chip);
    });
  }

  function bindGlobalEvents() {
    els.search.addEventListener("input", function (e) {
      state.search = e.target.value.trim().toLowerCase();
      render();
    });
    els.category.addEventListener("change", function (e) {
      state.category = e.target.value;
      render();
    });
    els.unitToggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.unit = btn.getAttribute("data-unit");
        els.unitToggleBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        // re-render modal if open
        if (currentOpenId) openRecipe(currentOpenId);
      });
    });
    els.themeToggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var mode = btn.getAttribute("data-theme");
        setTheme(mode);
        els.themeToggleBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
      });
    });
    els.modalOverlay.addEventListener("click", function (e) {
      if (e.target === els.modalOverlay) closeModal();
    });
    var clearBtn = document.getElementById("clearFiltersBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        state.search = "";
        state.category = "all";
        state.tags.clear();
        els.search.value = "";
        els.category.value = "all";
        els.tagChips.querySelectorAll(".chip.active").forEach(function (c) { c.classList.remove("active"); });
        render();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
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

  // ---------- filtering ----------

  function matchesFilters(r) {
    if (state.category !== "all" && r.category !== state.category) return false;
    if (state.tags.size > 0) {
      var rTags = new Set(r.tags || []);
      for (var t of state.tags) { if (!rTags.has(t)) return false; }
    }
    if (state.search) {
      var haystack = r.title.toLowerCase() + " " + (r.tags || []).join(" ").toLowerCase() +
        " " + r.ingredients.map(function (i) { return i.name; }).join(" ").toLowerCase();
      if (haystack.indexOf(state.search) === -1) return false;
    }
    return true;
  }

  // ---------- nutrition math ----------

  function computeMacros(recipe, servings) {
    var multiplier = servings / recipe.servings;
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

    if (unit === "to taste" || unit === "pinch" || unit === "count" || unit === "clove") {
      return { qty: qty, unit: unit, text: null };
    }

    if (unitMode === "metric") {
      if (unit === "tbsp") { qty = qty * 15; unit = "ml"; }
      else if (unit === "tsp") { qty = qty * 5; unit = "ml"; }
      else if (unit === "cup") { qty = qty * 240; unit = "ml"; }
      // g / ml stay as-is
    } else { // imperial
      if (unit === "g") { qty = qty / 28.35; unit = "oz"; }
      else if (unit === "ml") {
        if (qty >= 240) { qty = qty / 240; unit = "cup"; }
        else if (qty >= 15) { qty = qty / 15; unit = "tbsp"; }
        else { qty = qty / 5; unit = "tsp"; }
      }
      // tbsp/tsp/cup already imperial-friendly, leave as-is
    }
    return { qty: qty, unit: unit, text: null };
  }

  function ingredientLine(ing, multiplier, unitMode) {
    if (ing.unit === "to taste") {
      return ing.displayText || "to taste";
    }
    if (ing.unit === "pinch") {
      var pn = Math.round(ing.qty * multiplier * 10) / 10;
      return (pn === 1 ? "1 pinch" : formatQty(pn) + " pinches") +
        (ing.displayText ? " (" + stripLeadingQty(ing.displayText) + ")" : "");
    }
    if (ing.unit === "count" || ing.unit === "clove") {
      var cn = ing.qty * multiplier;
      var label = ing.unit === "clove" ? (cn === 1 ? "clove" : "cloves") : "";
      return formatQty(cn) + (label ? " " + label : "") +
        (ing.displayText ? " (" + stripLeadingQty(ing.displayText) + ")" : "");
    }
    var conv = convertForDisplay(ing, multiplier, unitMode);
    return formatQty(conv.qty) + " " + conv.unit;
  }

  function stripLeadingQty(text) {
    return text;
  }

  // ---------- rendering: grid ----------

  function render() {
    var list = RECIPES.filter(matchesFilters);
    els.grid.innerHTML = "";
    els.resultsCount.textContent = list.length + (list.length === 1 ? " recipe" : " recipes");
    els.emptyState.classList.toggle("hidden", list.length !== 0);

    list.forEach(function (r) {
      var servings = state.servingOverrides[r.id] || r.servings;
      var macros = computeMacros(r, servings);
      var perServing = { kcal: macros.kcal / servings, protein: macros.protein / servings, carbs: macros.carbs / servings, fat: macros.fat / servings };
      var meta = CATEGORY_META[r.category] || { icon: "🍴", label: r.category, color: "var(--accent)" };

      var card = document.createElement("article");
      card.className = "recipe-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Open " + r.title);

      card.innerHTML =
        '<div class="card-top">' +
          '<div class="cat-icon" style="background:' + meta.color + '">' + meta.icon + '</div>' +
          '<div><p class="card-title">' + escapeHtml(r.title) + '</p>' +
          '<span class="card-cat">' + escapeHtml(meta.label) + '</span></div>' +
        '</div>' +
        '<div class="card-meta">' +
          '<span>⏱ ' + escapeHtml(r.prepTime || "") + '</span>' +
          '<span>🔥 ' + escapeHtml(r.cookTime || "") + '</span>' +
          '<span>🍽 ' + servings + ' serving' + (servings === 1 ? "" : "s") + '</span>' +
        '</div>' +
        '<div class="card-macros">' +
          macroBox(roundInt(perServing.kcal), "kcal") +
          macroBox(round1(perServing.protein) + "g", "protein") +
          macroBox(round1(perServing.carbs) + "g", "carbs") +
          macroBox(round1(perServing.fat) + "g", "fat") +
        '</div>' +
        '<div class="card-tags">' + (r.tags || []).map(function (t) { return '<span class="tag-pill">' + escapeHtml(t) + '</span>'; }).join("") + '</div>';

      card.addEventListener("click", function () { openRecipe(r.id); });
      card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openRecipe(r.id); } });

      els.grid.appendChild(card);
    });
  }

  function macroBox(value, label) {
    return '<div class="macro-box"><span class="v">' + value + '</span><span class="l">' + label + '</span></div>';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---------- modal ----------

  var currentOpenId = null;

  function openRecipe(id) {
    var r = RECIPES.find(function (x) { return x.id === id; });
    if (!r) return;
    currentOpenId = id;
    var servings = state.servingOverrides[id] || r.servings;
    renderModal(r, servings);
    els.modalOverlay.classList.remove("hidden");
  }

  function closeModal() {
    els.modalOverlay.classList.add("hidden");
    currentOpenId = null;
  }

  function renderModal(r, servings) {
    var meta = CATEGORY_META[r.category] || { icon: "🍴", label: r.category, color: "var(--accent)" };
    var multiplier = servings / r.servings;
    var macros = computeMacros(r, servings);
    var perServing = { kcal: macros.kcal / servings, protein: macros.protein / servings, carbs: macros.carbs / servings, fat: macros.fat / servings };

    var notesHtml = "";
    if (r.notes && r.notes.length) {
      notesHtml = '<div class="modal-notes"><strong>Notes</strong><ul>' +
        r.notes.map(function (n) { return "<li>" + escapeHtml(n) + "</li>"; }).join("") +
        '</ul></div>';
    }

    var ingredientsHtml = r.ingredients.map(function (ing) {
      var line = ingredientLine(ing, multiplier, state.unit);
      return '<li><span class="ing-name">' + escapeHtml(ing.displayText ? shortName(ing) : ing.name) + '</span>' +
        '<span class="ing-qty">' + escapeHtml(line) + '</span></li>';
    }).join("");

    var instructionsHtml = r.instructions.map(function (block) {
      return '<div class="instructions-block">' +
        (block.section ? '<h4>' + escapeHtml(block.section) + '</h4>' : '') +
        '<ol>' + block.steps.map(function (s) { return '<li>' + escapeHtml(s) + '</li>'; }).join("") + '</ol>' +
        '</div>';
    }).join("");

    els.modal.innerHTML =
      '<div class="modal-header">' +
        '<div class="cat-icon" style="background:' + meta.color + '">' + meta.icon + '</div>' +
        '<div><h2>' + escapeHtml(r.title) + '</h2>' +
          '<span class="card-cat">' + escapeHtml(meta.label) + ' &middot; ' + escapeHtml(r.prepTime || "") + ' prep &middot; ' + escapeHtml(r.cookTime || "") + ' cook</span></div>' +
        '<button class="modal-close" aria-label="Close">✕</button>' +
      '</div>' +
      '<div class="modal-body">' +
        notesHtml +
        '<div class="serving-control">' +
          '<label for="servingInput">Servings</label>' +
          '<div class="stepper">' +
            '<button id="servDown" type="button">−</button>' +
            '<input id="servingInput" type="number" min="1" step="1" value="' + servings + '">' +
            '<button id="servUp" type="button">+</button>' +
          '</div>' +
          '<span style="color:var(--text-muted);font-size:0.8rem;">(recipe default: ' + r.servings + ')</span>' +
        '</div>' +
        '<div class="macro-summary">' +
          macroCard(roundInt(perServing.kcal), "kcal / serving") +
          macroCard(round1(perServing.protein) + "g", "protein / serving") +
          macroCard(round1(perServing.carbs) + "g", "carbs / serving") +
          macroCard(round1(perServing.fat) + "g", "fat / serving") +
        '</div>' +
        '<div class="macro-summary" style="opacity:0.8;">' +
          macroCard(roundInt(macros.kcal), "kcal total") +
          macroCard(round1(macros.protein) + "g", "protein total") +
          macroCard(round1(macros.carbs) + "g", "carbs total") +
          macroCard(round1(macros.fat) + "g", "fat total") +
        '</div>' +
        '<h3 class="section-title">Ingredients</h3>' +
        '<ul class="ingredient-list">' + ingredientsHtml + '</ul>' +
        '<h3 class="section-title">Instructions</h3>' +
        instructionsHtml +
      '</div>';

    els.modal.querySelector(".modal-close").addEventListener("click", closeModal);
    var input = els.modal.querySelector("#servingInput");
    els.modal.querySelector("#servDown").addEventListener("click", function () {
      var v = Math.max(1, (parseFloat(input.value) || r.servings) - 1);
      input.value = v;
      updateServings(r, v);
    });
    els.modal.querySelector("#servUp").addEventListener("click", function () {
      var v = Math.max(1, (parseFloat(input.value) || r.servings) + 1);
      input.value = v;
      updateServings(r, v);
    });
    input.addEventListener("change", function () {
      var v = Math.max(1, parseFloat(input.value) || r.servings);
      updateServings(r, v);
    });
  }

  function shortName(ing) {
    // Show the canonical ingredient name, capitalized nicely
    return ing.name.replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function macroCard(value, label) {
    return '<div class="macro-card"><div class="val">' + value + '</div><div class="lab">' + label + '</div></div>';
  }

  function updateServings(r, v) {
    state.servingOverrides[r.id] = v;
    renderModal(r, v);
    render();
  }

})();
