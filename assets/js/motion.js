/* Laqeetha site motion: settle-in on scroll, count-ups, language crossfade, and the explainer video
   that plays (muted) when you scroll to it. Pairs with motion.css. */
(function () {
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- the explainer video (home page): plays muted while on screen, sound on tap
  function film() {
    const v = document.getElementById("filmVid"); if (!v) return;
    const btn = document.getElementById("soundBtn");
    let userPaused = false, ours = false;
    v.addEventListener("pause", () => { if (!ours) userPaused = true; ours = false; });
    v.addEventListener("play", () => { userPaused = false; });
    if (!calm && "IntersectionObserver" in window) {
      new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio >= 0.5) { if (!userPaused) v.play().catch(() => {}); }
        else if (!v.paused) { ours = true; v.pause(); }
      }), { threshold: [0, 0.5] }).observe(v);
    }
    if (btn) btn.onclick = () => {
      v.muted = false; if (v.currentTime > 1 && v.currentTime < 3) v.currentTime = 0;
      v.play().catch(() => {}); btn.hidden = true;
    };
    v.addEventListener("volumechange", () => { if (btn && !v.muted) btn.hidden = true; });
  }

  // ---- numbers count up the first time you see them ("10/10", "11/16", "6/6")
  function countUp(el) {
    const node = [...el.childNodes].find(n => n.nodeType === 3 && /^\s*\d+/.test(n.nodeValue));
    if (!node) return;
    const m = node.nodeValue.match(/^(\s*)(\d+)(.*)$/s), to = +m[2];
    if (!to) return;
    const t0 = performance.now(), d = 900;
    const step = now => {
      const p = Math.min(1, (now - t0) / d), e = 1 - Math.pow(1 - p, 3);
      node.nodeValue = m[1] + Math.round(to * e) + m[3];
      if (p < 1) requestAnimationFrame(step);
    };
    node.nodeValue = m[1] + "0" + m[3]; requestAnimationFrame(step);
  }

  const SEL = [
    "section > h2", "section > .lead", ".problem > div", ".step", ".rules li", ".pair figure", ".proof > div",
    ".places span", ".more a", ".team .person", ".ask", ".film .video", ".film figcaption",
    ".grid2 > .card", ".grid3 > .card", ".flow .stepbox", ".road .card", "section > details", ".tablewrap",
    ".band ul.clean li", ".lane", "section > .cta", "section > h3"
  ].join(",");

  function reveal() {
    if (calm || !("IntersectionObserver" in window)) return;
    const fold = innerHeight * 0.92, els = [];
    document.querySelectorAll(SEL).forEach(el => {
      if (el.closest(".hero, section.first")) return;
      if (el.getBoundingClientRect().top < fold) return;   // already on screen at load: leave it alone
      const sibs = [...el.parentElement.children].filter(x => x.matches(SEL));
      el.style.setProperty("--d", Math.min(sibs.indexOf(el), 6));
      el.setAttribute("data-mo", ""); els.push(el);
    });
    document.documentElement.classList.add("mo");
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in"); io.unobserve(e.target);
      e.target.querySelectorAll(".proof b, .count b").forEach(countUp);
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach(el => io.observe(el));
    // numbers that were already on screen at load still count once
    document.querySelectorAll(".count b, .proof b").forEach(b => { if (!b.closest("[data-mo]") && b.getBoundingClientRect().top < fold) countUp(b); });
  }

  function langFade() {
    const b = document.getElementById("langBtn"), w = document.querySelector(".wrap");
    if (!b || !w || calm || !w.animate) return;
    b.addEventListener("click", () => w.animate([{ opacity: .3 }, { opacity: 1 }], { duration: 280, easing: "ease-out" }));
  }

  // Measure only after the page's text is filled in (site.js does that on DOMContentLoaded, which
  // hasn't fired yet when this deferred script runs) and laid out.
  function init() { requestAnimationFrame(() => { reveal(); film(); langFade(); }); }
  if (document.readyState === "complete") init(); else document.addEventListener("DOMContentLoaded", init);
})();
