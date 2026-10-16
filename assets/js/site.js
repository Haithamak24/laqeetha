/* Shared language switch for the inner pages. Each page defines window.T = {ar:{...}, en:{...}}. */
(function () {
  const NAV = {
    ar: { home: "الرئيسية", tech: "كيف بنيناه", inst: "للمؤسسات", faq: "أسئلة شائعة", lang: "English", tagline: "Campus Lost & Found" },
    en: { home: "Home", tech: "How we built it", inst: "For institutions", faq: "FAQ", lang: "عربي", tagline: "Campus Lost & Found" }
  };
  let lang = new URLSearchParams(location.search).get("lang");
  if (!lang) { try { lang = localStorage.getItem("site_lang"); } catch (e) {} }
  if (lang !== "en") lang = "ar";

  function apply() {
    const d = Object.assign({}, NAV[lang], (window.T || {})[lang]);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-t]").forEach(e => { const v = d[e.dataset.t]; if (v != null) e.innerHTML = v; });
    document.querySelectorAll("[data-ta]").forEach(e => { const v = d[e.dataset.ta]; if (v != null) e.setAttribute("aria-label", v); });
    const b = document.getElementById("langBtn"); if (b) b.textContent = d.lang;
    if (d.title) document.title = d.title;
  }
  document.addEventListener("DOMContentLoaded", () => {
    apply();
    const b = document.getElementById("langBtn");
    if (b) b.onclick = () => { lang = lang === "ar" ? "en" : "ar"; try { localStorage.setItem("site_lang", lang); } catch (e) {} apply(); };
  });
})();
