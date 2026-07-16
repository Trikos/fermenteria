# Fermenteria — CLAUDE.md

## Cos'è questo progetto

Ricostruzione in **React (Vite)** del sito WordPress reale [www.fermenteria.it](https://www.fermenteria.it/) — ristorante inclusivo con birrificio interno a Bassano del Grappa (VI). L'obiettivo non era reinventare il sito, ma ricrearlo **praticamente identico** nei contenuti (testi, foto, struttura, cookie/privacy policy) con un frontend più moderno e mobile-first, sostituendo in particolare l'hamburger menu originale (giudicato scadente dall'utente) e sanando i limiti tipici di un tema WordPress "spigoloso".

**Sito pubblicato:** https://trikos.github.io/fermenteria/
**Repository:** https://github.com/Trikos/fermenteria (pubblica — vedi nota sotto)

## Stack

- **Vite + React 19**, nessun framework CSS (CSS puro, variabili custom in `src/index.css`)
- **react-router-dom** con `HashRouter` (scelta obbligata per GitHub Pages, che non supporta rewrite lato server)
- Nessuna libreria UI esterna: componenti scritti a mano, mobile-first (stili base per mobile, poi `@media (min-width: 860px)` per desktop — breakpoint unico e condiviso in tutti i file)

## Struttura

```
src/
  data/content.js       — TUTTI i testi del sito, copiati verbatim dal sito originale (fonte di verità)
  utils/asset.js         — helper asset() per risolvere i path immagine sotto BASE_URL
  hooks/useSectionNav.js — gestisce i link di navigazione interna (#menu, #birrificio, ...)
  components/            — Header, Hero, AnchorSection, CucinaInclusiva, Gallery, Contatti,
                            DiconoDiNoi, Footer, CookieConsent, LegalPage
  pages/                 — Home, PrivacyPolicy, CookiePolicy
public/images/            — foto e badge scaricati dal sito originale (nomi rinominati per chiarezza)
```

## Decisioni importanti da conoscere (per evitare di rompere cose già risolte)

### 1. HashRouter + ancore interne — NON usare `<a href="#sezione">` puri

`HashRouter` usa l'intero hash dell'URL per il routing. Un semplice `<a href="#menu">` viene interpretato come navigazione verso la route `/menu` (inesistente → pagina vuota). Per questo **ogni link di navigazione interna passa da `useSectionNav()`** (`src/hooks/useSectionNav.js`), che intercetta il click e fa `scrollIntoView` manuale, navigando prima alla home se necessario (via `location.state.scrollTo`, letto in `Home.jsx`). Se aggiungi nuovi link di sezione, usa questo hook — non hard-codare `href="#id"` con comportamento nativo.

### 2. Path immagini — sempre tramite `asset()`, mai stringhe assolute

Il sito è pubblicato sotto `/fermenteria/` (project page di GitHub Pages), configurato in `vite.config.js` con `base: '/fermenteria/'`. Un path scritto a mano come `src="/images/foo.png"` punta al dominio root (sbagliato). Usa sempre `asset('images/foo.png')` da `src/utils/asset.js`, che si appoggia a `import.meta.env.BASE_URL`. Lo stesso vale per `index.html`, dove si usa il placeholder `%BASE_URL%`.

### 3. Mappatura foto — verificata manualmente, non fidarti dei filename

I filename originali di WordPress erano fuorvianti (es. `DSC_3198_28-1.jpg` è la foto della tartare, non del birrificio). La mappatura corretta e verificata visivamente è:

| File locale | Contenuto |
|---|---|
| `photo-hero.jpg` | Chef con piatto + birra (hero) |
| `photo-tartare.jpg` | Tartare con uovo in camicia (sezione Cucina Inclusiva) |
| `photo-brewery.jpg` | Tini in acciaio (sezione Birrificio) |
| `photo-chef-fiori.jpg` | Chef Nicola Scaramuzzi nel prato (sezione Storia/Libro) |
| `photo-interno-sala.jpg` | Interno locale, mensole + tavoli (Gallery) |

Un file scaricato dall'URL "Nuovo-sito-Fermenteria-2023-7.jpg" era in realtà un placeholder giallo a tinta unita (usato dal WP originale come trucco per sfondo colorato) — **non è stato usato**.

### 4. Contenuti — `src/data/content.js` è la fonte di verità

Testi, indirizzo, telefono, email, orari, link social e testo integrale di Privacy Policy / Cookie Policy sono stati raccolti navigando il sito reale (incluse le pagine `/privacy-policy/` e `/cookie-policy-ue/`) e non vanno modificati/parafrasati senza confrontarli col sito originale. La sezione "Dicono di noi" del sito originale è vuota/rotta (probabile bug del tema WP) — qui è stata sostituita con un CTA onesto verso le recensioni Google Maps, senza inventare testimonianze.

### 5. Accessibilità — fix applicati dopo review multi-agente

Una review con 4 agenti paralleli (accessibilità, responsive, qualità React, fedeltà contenuti) + verifica avversariale ha confermato e fatto correggere:
- focus trap + tasto Escape nel drawer mobile (`Header.jsx`, usa `inert` — richiede React 19)
- outline di focus universale (bianco + alone scuro) visibile su sfondi chiari e scuri (`index.css`)
- contrasto titoli scuri (non bianchi) sui pannelli gialli
- link nelle pagine legali con colore scuro + sottolineatura (contrasto WCAG AA)
- `try/catch` su `localStorage.setItem` nel banner cookie
- z-index dell'header portato sopra il banner cookie (altrimenti il banner copriva il drawer mobile)

Prima di modificare `Header.jsx`, `CookieConsent.jsx` o gli stili di focus, tieni presente questi vincoli.

### 6. Badge icone senza sottotitolo — non aggiungere testo HTML visibile

I badge di Contatti (chat/facebook/mail/instagram/dove siamo/orari) e di Cucina Inclusiva (gluten free/veg/bio) sono immagini che contengono già icona + didascalia disegnate al loro interno — sono pensate per essere autosufficienti, come sul sito originale. **Non aggiungere una `<span>` di testo visibile accanto/sotto**: è già stato fatto una volta per accessibilità ed è stato corretto su richiesta esplicita dell'utente. L'alt/nome accessibile va sull'`<img alt="...">` stesso o in un `.visually-hidden`, mai come testo a schermo. Le badge di call-to-action con link esterno (MENU ITALIANO, BREWERY, STAI DOVE FIORISCI in `AnchorSection`/`Hero`) sono diverse: quelle hanno davvero una didascalia separata visibile anche nell'originale, non toccarle.

### 7. SEO/GEO — vincolo strutturale: SPA senza SSR

Il sito è una SPA client-rendered pubblicata su GitHub Pages (hosting statico, nessun server per SSR). Questo significa che crawler che NON eseguono JavaScript (molti bot AI, alcuni motori non-Google) vedono solo lo shell vuoto di `index.html`, non il contenuto renderizzato da React. Mitigazioni già in atto:
- **JSON-LD strutturato (schema.org `Restaurant`)** scritto direttamente e staticamente in `index.html` (non generato da React), cosi' e' visibile anche senza esecuzione JS. Contiene indirizzo, geo, orari, telefono, social — tenerlo sincronizzato manualmente con `src/data/content.js` se questi dati cambiano.
- **Meta tag Open Graph/Twitter/canonical** anch'essi statici in `index.html`.
- **`public/robots.txt`**: allow esplicito ai crawler AI piu' noti (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, ecc.) — molti siti li bloccano per errore/default, danneggiando la visibilita' GEO.
- **`public/sitemap.xml`**: una sola voce "vera" (la home, unica URL fisicamente distinta data la SPA); le due pagine legali sono elencate come URL con `#` a priorita' bassa, utili solo a crawler che li seguono comunque.
- **`public/llms.txt`**: file GEO emergente (standard proposto 2024, adozione crescente 2025-2026) — riassunto in Markdown del sito per assistenti AI, separato da robots.txt.
- **`src/hooks/useDocumentMeta.js`**: aggiorna `document.title` e meta description via JS al cambio pagina (Privacy/Cookie) — aiuta Googlebot (esegue JS) e la tab del browser, non aiuta crawler senza JS per quelle 2 sotto-pagine.

**Limite non risolto**: se in futuro serve indicizzazione reale delle sotto-pagine o dei contenuti dinamici per crawler non-JS, l'unica soluzione robusta e' passare a prerendering statico in build (es. Vite + un pass headless che salva l'HTML gia' renderizzato) oppure abbandonare GitHub Pages per un host con SSR. Non e' stato fatto: fuori scope per un sito di una singola pagina scrollabile + 2 pagine legali.

### 8. Immagini — script di ottimizzazione, non ri-scaricare a piena risoluzione

Le immagini in `public/images/` sono state compresse con `scripts/optimize-images.mjs` (usa `sharp`, devDependency): badge/icone PNG ridimensionate a max 320px con palette ottimizzata, foto JPEG ridimensionate a max 2000px qualita' 78 mozjpeg. Risultato: da 5.39MB a 1.07MB totali (-80%), nessuna perdita di qualita' visibile alle dimensioni di rendering reali (badge mostrati a 64-116px, foto a piena larghezza banner). Se si aggiungono nuove immagini in `public/images/`, rilanciare `node scripts/optimize-images.mjs` prima di committarle — le foto originali scaricate dal sito WordPress arrivano spesso a 1-1.4MB l'una, pessimo per Core Web Vitals (LCP) e per il crawl budget dei bot.

## Deploy

Repo GitHub Pages, branch `gh-pages` (deploy "legacy", non Actions).

```bash
npm run build        # genera dist/
npm run deploy        # gh-pages -d dist — pubblica su gh-pages branch
```

**Nota piano GitHub:** repo privata + GitHub Pages non sono compatibili sul piano Free (l'API rifiuta esplicitamente: *"Your current plan does not support GitHub Pages for this repository"*). Per questo la repo è **pubblica** — scelta esplicita dell'utente dopo essere stato avvisato dell'alternativa (Netlify/Vercel per tenere il sorgente privato).

Dopo `npm run deploy`, GitHub impiega qualche decina di secondi a rigenerare la build di Pages: verifica con `gh api repos/Trikos/fermenteria/pages/builds/latest` prima di controllare il sito live, altrimenti si rischia di vedere ancora la build precedente in cache.

## Cosa NON è stato replicato 1:1

- Il **widget di prenotazione** proprietario del sito originale (form multi-step con selezione ospiti) è stato sostituito da una sezione Contatti con CTA dirette (WhatsApp, email, mappa) — impossibile e non necessario clonare un sistema di terze parti.
- Nessuna **pagina in inglese** (il sito originale ha `/homepage-en-2/`, non richiesta e non implementata).
- I PDF di menù e allergeni restano linkati all'URL originale del sito WordPress (`fermenteria.it/wp-content/uploads/...`), non scaricati/ospitati localmente, perché soggetti ad aggiornamento periodico da parte del gestore.
