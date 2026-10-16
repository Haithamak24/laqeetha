# لقيتها · Laqeetha

**Campus Lost & Found, with AI that keeps ID cards private.**
Graduation project, Computer Science, Palestine Polytechnic University. Exhibited at Palestine XI, 19–20 October 2026.

🌐 **Live site:** https://haithamak24.github.io/laqeetha/

---

## The problem

At PPU, found items are posted in WhatsApp groups. In a sample of 16 posts (16 Aug – 8 Oct 2026), **11 were ID documents, and all 11 showed the owner's name**. Some also showed the birth date, the face photo, or the full ID number.

## What Laqeetha does

1. **Security photographs a found item.** The AI names it, picks its colour, and checks whether it is an ID document.
2. **The owner describes what they lost in their own words**, in Palestinian Arabic or English, and the right item comes up.
3. **ID cards are never shown to anyone.** They are matched by the owner's name, and claimed with the last 4 digits of the number.
4. **Every claim needs a detail only the owner knows.** Three wrong answers lock the item.

## Measured results

Real model, on a laptop CPU, offline. Small test: 6 real items plus 10 ID cards as distractors.

| Test | Result |
|---|---|
| ID cards detected automatically | **10 / 10**, 0 false alarms on 6 normal items |
| Palestinian-Arabic description, right item ranked first | **12 / 12** (3 / 12 without our dialect glossary) |
| English description, right item ranked first | **6 / 6** |
| Time to analyse one photo | 76–226 ms (three runs) |

The glossary was finalised after seeing these same 12 descriptions, so 12/12 is optimistic. A pilot with campus security will give a fresh, larger test set.

## Pages

| Page | What's on it |
|---|---|
| [`index.html`](index.html) | The story: problem, how it works, privacy rules, results, the explainer film, team |
| [`tech.html`](tech.html) | How the AI works, full results table, known limitations |
| [`institutions.html`](institutions.html) | For institutions: who it's for, and how a pilot works |
| [`faq.html`](faq.html) | Common questions |

Every page is bilingual (Arabic, right-to-left, by default; English via the language button or `?lang=en`).

## Repository layout

```
.
├── index.html, tech.html, institutions.html, faq.html   ← pages (served from the root)
├── assets/
│   ├── css/      site.css (shared styles), motion.css (animations)
│   ├── js/       site.js (shared text + language switch), motion.js (scroll reveal, film autoplay)
│   ├── fonts/    IBM Plex Sans Arabic + Latin (self-hosted, no Google Fonts call)
│   ├── img/      logo, evidence collage (blurred), film poster, share image
│   │   └── screens/   app screenshots, ar-*.webp and en-*.webp
│   ├── icons/    favicon, Apple touch icon, 192 px app icon
│   └── video/    the explainer film (.mp4, with .webm fallback)
├── print/        qr-laqeetha.png, the QR code for the booth card (not used by the pages)
└── .nojekyll     tells GitHub Pages to serve the files as they are
```

No build step and no dependencies: plain HTML, CSS and JavaScript.

## Run it locally

```cmd
cd laqeetha
python -m http.server 8000
```

Then open http://localhost:8000.

## Publish a change

GitHub Pages deploys `main` automatically, usually within a minute.

```cmd
git add -A
git commit -m "Describe the change"
git push
```

## Privacy

- **No readable ID card appears anywhere in this repository.** In the evidence collage every ID document is blurred. The ID shown in the app screenshots and the film is a drawn placeholder.
- The test photos of real ID cards stay on the team's laptop only and are never committed.

## Related

- **The app itself** (FastAPI + CLIP, runs offline on the booth laptop): [Haithamak24/laqeetha-app](https://github.com/Haithamak24/laqeetha-app)
- **https://haithamak24.github.io/lostfound/** redirects here. Earlier printed QR codes point to that address, so the `lostfound` repository must stay.

## Team

- **Haitham Abu Khaled**: [LinkedIn](https://linkedin.com/in/haitham-abu-khaled)
- **Mostafa Natsheh**: [LinkedIn](https://www.linkedin.com/in/mostafa-natsheh/), animated the explainer film
- **Osama Abu Al-Halaweh**: [LinkedIn](https://www.linkedin.com/in/osama-abu-al-halaweh-30670b30a/)

Supervised by **Dr. Ezdehar Jawabreh**, Palestine Polytechnic University.
