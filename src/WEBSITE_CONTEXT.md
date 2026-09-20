# WellPredict Website — Context for AI Editing

Use this document when modifying sections, navbar, layout, copy, or styles. It reflects the **current codebase** under `src/` as of the last update.

---

## 1. Product summary

| Field | Value |
|-------|--------|
| **Product** | WellPredict (governance evidence platform) |
| **Positioning** | Privacy-gated governance evidence for regulated UK organisations |
| **Audience** | NHS, food manufacturing, financial services, legal (sector-specific language in copy) |
| **Site type** | Single-page marketing site (no route-based inner pages in `App.tsx`) |
| **Live brand reference** | [wellpredict.co.uk](https://www.wellpredict.co.uk/) |

---

## 2. Tech stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Routing | `react-router-dom` (`BrowserRouter` in `main.tsx`) — router present but **not used** for multiple pages |
| Styling | Tailwind CSS 3 + global CSS in `index.css` |
| UI primitives | Radix/shadcn-style components in `src/components/ui/` (mostly unused on homepage) |
| Animation | CSS `.reveal` + IntersectionObserver in most sections; GSAP in unused template sections (`Curriculum`, `CinematicVision`, `AlumniArchives`) |

**Entry points**

- `src/main.tsx` — mounts `App` inside `BrowserRouter`
- `src/App.tsx` — composes all homepage sections in order
- `src/index.css` — design tokens, utilities, section padding
- `src/config.ts` — typed config shells (mostly **empty**; sections use inline constants today)

---

## 3. Homepage section order (`App.tsx`)

Sections render top to bottom inside `<main>`:

| # | Component | File | Section `id` | In nav? |
|---|-----------|------|----------------|---------|
| — | `Navigation` | `sections/Navigation.tsx` | — (fixed header) | — |
| 1 | `Hero` | `sections/Hero.tsx` | `hero` | logo → `#hero` |
| 2 | `ProofBar` | `sections/ProofBar.tsx` | `proof-bar` | no |
| 3 | `Problem` | `sections/Problem.tsx` | `problem` | no |
| 4 | `StatCounterRow` | `sections/StatCounterRow.tsx` | *(none)* | no |
| 5 | `HowItWorks` | `sections/HowItWorks.tsx` | `how-it-works` | nav + footer |
| 6 | `EvidencePack` | `sections/EvidencePack.tsx` | `evidence-pack` | footer |
| 7 | `Sectors` | `sections/Sectors.tsx` | `sectors` | nav + footer |
| 8 | `PrivacyArchitecture` | `sections/PrivacyArchitecture.tsx` | `privacy` | nav + footer |
| 9 | `PlatformDashboard` | `sections/PlatformDashboard.tsx` | `dashboard` | nav + footer |
| 10 | `CTAContact` | `sections/CTAContact.tsx` | `cta-contact` | nav CTA |
| 11 | `Footer` | `sections/Footer.tsx` | `footer` | — |

- `sections/PlatformModules.tsx`, `HumanHACCP.tsx`, `WhyWellPredict.tsx` — legacy sections, **not mounted** in `App.tsx`

---

## 4. Navigation (`sections/Navigation.tsx`)

### Structure

- Fixed top bar, height `72px`, horizontal padding `80px` (mobile: hamburger overlay)
- Scroll state: after `80px` scroll → frosted background `rgba(246,248,251,0.92)`, blur, bottom border
- Smooth scroll to hash anchors via `document.querySelector(href).scrollIntoView({ behavior: 'smooth' })`

### Logo (left)

- Links to `#hero`
- Mark: dark square `#0B1220` with teal cross SVG (`#14B8A6`)
- **Logo:** `/logo.png` from `public/` with wordmark **WellPredict**

### Desktop links (`NAV_LINKS`)

| Label | `href` |
|-------|--------|
| How it works | `#how-it-works` |
| Who it is for | `#sectors` |
| Privacy | `#privacy` |
| Dashboard | `#dashboard` |

### CTA (desktop + mobile)

- Label: **Start a Pilot**
- `href`: `#cta-contact`
- Class: `btn-primary`

### Gaps (sections with no nav link)

`#hero`, `#proof-bar`, `#problem`, `#how-it-works`, `#evidence-pack`, `#dashboard`, `#why`

To add a nav item: extend `NAV_LINKS` in `Navigation.tsx` and ensure the target section has a matching `id`.

---

## 5. Design system (`index.css`)

### CSS variables (`:root`)

| Token | Value | Usage |
|-------|--------|--------|
| `--page-bg` | `#F6F8FB` | Page background |
| `--card-bg` | `#FFFFFF` | Cards |
| `--primary-text` | `#0B1220` | Headings, dark UI |
| `--secondary-text` | `#475569` | Nav links |
| `--muted-text` | `#94A3B8` | Supporting text |
| `--primary-accent` | `#14B8A6` | Teal accent, eyebrows, links |
| `--secondary-accent` | `#2563EB` | Blue gradient accents |
| `--dark-section-bg` | `#07111F` | Dark sections |
| `--border-color` | `#E2E8F0` | Borders |
| State colors | `#10B981`, `#F59E0B`, `#EF4444`, `#7F1D1D` | Normal / watch / elevated / breach |
| `--gold` | `#C9A84C` | Patent / badge highlights |

### Typography (as used in components)

| Role | Font | Notes |
|------|------|--------|
| Body | Plus Jakarta Sans | Set in `body` and most inline styles |
| Headings (CSS) | Instrument Serif | `h1–h6` in `index.css` — many sections override with Plus Jakarta on `h2` |
| Mono / technical | JetBrains Mono | Stats, terminal, hashes, CAPA codes |
| `index.html` | Loads **Plus Jakarta Sans**, **Instrument Serif**, **JetBrains Mono** |

### Layout utilities

- `.section-padding` — `100px` vertical, `80px` horizontal (mobile: `60px` / `24px`)
- `.eyebrow` — 11px uppercase accent label
- `.card` — white card, hover lift `-2px`
- `.dark-section` — dark background sections (see `index.css` for full rules)
- `.btn-primary` / `.btn-secondary` — primary CTA (dark fill) and outlined secondary
- `.reveal` + `.reveal-d1`…`.reveal-d6` — scroll fade-up; add class `revealed` via IntersectionObserver

### Common layout patterns

- Max content width: `1200px` (`margin: 0 auto`)
- Grids: 3-column cards, 2-column hero/CTA, 5-column how-it-works
- Breakpoint: `@media (max-width: 900px)` collapses most grids to 1–2 columns

---

## 6. Section-by-section reference

### 6.1 Hero — `id="hero"` — `Hero.tsx`

**Layout:** Full viewport (`minHeight: 100vh`), `paddingTop: 120` (clears nav). Background video `/videos/hero-bg.mp4` + dark gradient overlay. **2 columns:** copy left, dashboard mock right (hidden on small screens: `hidden md:block`).

**Copy**

| Element | Text |
|---------|------|
| Eyebrow | `WellPredict` (teal pulse dot) |
| H1 | `Governance evidence.` / `Automatic.` (italic teal) |
| Sub | `Team-level signals compiled into audit-ready evidence packs.` |
| Chips | `30 sec/week`, `Privacy-gated`, `Regulator-ready` |
| CTA primary | `Request Pilot` → `#cta-contact` |
| CTA secondary | `See Evidence Pack` → `#evidence-pack` |

**Right column (inline dashboard mock, not shared component)**

- Card: `Operating Condition Overview`, `Q2 2026`, mini SVG chart
- State tiles: Normal `18`, Watch `3`, Elevated `2`, Packs `7`
- Floating cards: `ELEVATED`, `Privacy Gate ✓ PASS`, `Pack v1 FINALISED`
- Classes: `float-1`, `float-2`, `float-3` (CSS float animation in `index.css`)

---

### 6.2 Proof bar — `id="proof-bar"` — `ProofBar.tsx`

Dark strip `#0A1520`, horizontal trust items:

- `100% Team-level`
- `Zero individual data`
- `UK data residency`
- `SHA-256 verified`

---

### 6.3 Problem — `id="problem"` — `Problem.tsx`

| Eyebrow | The Problem |
| H2 | No chain. No proof. No defence. |

**Cards (3)**

| Title | Stat | Label | Sub |
|-------|------|-------|-----|
| No evidence chain | `0` | Connected proof points | Signal → Action → Outcome → None |
| Records everywhere | `4+` | Disconnected systems | Surveys · CAPA · Risk · HR |
| No proof of response | `?` | When regulator calls | What happened? What was done? |

Uses `.reveal` animation.

---

### 6.4 Stat counter — `StatCounterRow.tsx`

Dark band `#06111E`. Animated count-up on scroll:

| Value | Label |
|-------|--------|
| 3 | Questions per week |
| 10+ | Minimum members |
| 1 | Click to compile |
| 64 | Characters in hash |

---

### 6.5 How it works — `id="how-it-works"` — `HowItWorks.tsx`

| Eyebrow | How It Works |
| H2 | Five steps. One evidence chain. |

**Steps (5 columns)**

| # | Word | Bullets (summary) |
|---|------|-------------------|
| 01 | COLLECT | Anonymous; team-level; 30 sec/week |
| 02 | DETECT | NORMAL → WATCH → ELEVATED; automatic |
| 03 | ACT | Log action 60s; linked; append-only |
| 04 | OBSERVE | Follow-up; before/after; outcome recorded |
| 05 | COMPILE | One click; SHA-256; regulator-ready |

Accent colour on step titles: `#0EA5C4`.

---

### 6.6 Platform modules — `id="platform-modules"` — `PlatformModules.tsx`

| Eyebrow | Platform |
| H2 | Six mechanisms. Zero noise. |

**Modules (3×2 grid)**

| Title | Subtitle |
|-------|----------|
| Privacy-Gated Aggregation | Below threshold = suppressed |
| Deterministic Policy Engine | Same input. Same output. Always. |
| Intervention-to-Outcome Link | Closed evidence chain |
| Evidence Object Compiler | One click. One pack. Done. |
| Immutable Audit Trail | Hashed. Timestamped. Permanent. |
| Sector Policy Configurations | HACCP · CQC · SMCR ready |

---

### 6.7 Evidence pack — `id="evidence-pack"` — `EvidencePack.tsx`

Dark section `#06111E`, background image `/images/4_Data_Center_Server_Racks_with_Blue.png` at 5% opacity.

**Left copy**

| Eyebrow | Evidence Pack |
| H2 | Not a report. / An *evidence artefact.* |
| Caption | One object. Every proof point. Immutable from finalisation. |
| CTA | Request Pilot |

**Chips:** SHA-256 Hashed, 12 Sections, Versioned, Sector-Specific, Audit Trail, JSON Export

**Right:** Mock document “Governance Evidence Pack” with rows (Operating Condition, Privacy Gate, State Classification, Intervention, Follow-up Outcome, Audit Trail, Version, Retention) and tamper-proof seal footer.

---

### 6.8 Sectors — `id="sectors"` — `Sectors.tsx`

| Eyebrow | Sectors |
| H2 | Configured. Not customised. |

**Cards (3)**

| Title | Body | Tags | Image |
|-------|------|------|-------|
| Human HACCP (Primary badge) | Food manufacturing. BRCGS / SALSA. | Human CCP, Pre-NC evidence, Batch-linked | `/images/7_Free_Food_Production_Line_Image_Industry.png` |
| NHS & CQC | Healthcare. Well-Led inspection ready. | CQC evidence, Safer staffing, Well-led | `/images/5_York_Perioperative_Medicine_Service.png` |
| SMCR & Resilience | Financial services. Reasonable steps. | SMCR, Audit trail, Resilience | `/images/8_Confidential_Financial_Services_Firm.png` |

---

### 6.9 Human HACCP — `id="human-haccp"` — `HumanHACCP.tsx`

**Layout:** 2 columns — narrative left, terminal mock right.

| Eyebrow | Human HACCP |
| H2 | The missing control point. |
| Body | Human operating capacity as a formal CCP. Site → Line → Shift → Evidence. |

**Pipeline steps (7):** Site, Line, Shift, Operating Window, HOCS, Corrective Action, Evidence Pack

**Terminal keys (sample):** `site_id`, `line`, `shift`, `threshold_met`, `hocs_state`, `corrective_action`, `evidence_pack` — values include `SITE-DEMO`, `REF-2291`

**Footer terminal block:** Linked Batch `B-4472`, evidence pack finalised

---

### 6.10 Privacy — `id="privacy"` — `PrivacyArchitecture.tsx`

| Eyebrow | Privacy |
| H2 | Surveillance is impossible by design. |

**Diagram (vertical):** Individual signal inputs → Group size check (threshold) → branch SUPPRESSED / READY → Evidence Object compiled

**Stats:** `10` minimum members, `7d` raw data purge, `0` individual scores stored

---

### 6.11 Dashboard — `id="dashboard"` — `PlatformDashboard.tsx`

| Eyebrow | Dashboard |
| H2 | Intelligence. Not analytics. |

**Mock app chrome:** `Demo Organisation · Healthcare`

**Metrics:** Teams `24`, Packs Ready `7`, Elevated `3`, Privacy Gate `✓`

**Teams (wards):**

- Ward 4A · Medical — Normal
- Ward 6B · Surgical — Normal
- ED · Resus — Watch
- ICU · Critical — Elevated

**Interventions:** Staffing rebalance · Ward 6B (Resolved), Shift review · Emergency Dept (Active), Capacity review · ICU (Active)

**Sidebar nav labels:** Condition (active), Packs, Interventions, Audit Trail, Privacy Log, Policy Settings

**Sector tabs:** Healthcare, Food, Financial (static UI)

---

### 6.12 Why WellPredict — `id="why"` — `WhyWellPredict.tsx`

| Eyebrow | Why WellPredict |
| H2 | Not another dashboard. |

**Reasons (6 cards):**

1. Fragments become a chain.
2. Privacy-gated by design.
3. Pre-event, not post-incident.
4. Immutable. Versioned. Proven.
5. Architecture, not a PDF.
6. Built specifically for UK regulated sectors.

---

### 6.13 CTA / contact — `id="cta-contact"` — `CTAContact.tsx`

Dark section, background `/images/3_A_Dark_Teal_blue_Abstract_Network.png`.

**Left**

| Eyebrow | Get Started |
| H2 | One team. Four weeks. / One evidence cycle. |
| Deliverables | Evidence Pack, Privacy Report, Audit Trail, Review Session |
| Left | START YOUR PILOT eyebrow; pilot deliverable result cards; no patent bar |

**Right — form**

- Fields: Full name, Organisation, Sector (select), Email, Message (optional)
- Sector options: Food Manufacturing, Healthcare / NHS, Financial Services, Legal Services
- Submit: `Submit Pilot Request →` / success: `Submitted — we will be in touch`
- Footer note: No commitment. Confidential.

---

### 6.14 Footer — `id="footer"` — `Footer.tsx`

Background `#0D1B2E`. **4 columns:**

1. **Brand** — WellPredict, tagline, medical disclaimer
2. **Platform links** — How It Works, Platform Modules, Evidence Pack, Privacy Architecture, Dashboard
3. **Sectors links** — Human HACCP, NHS & CQC Governance, SMCR & Operational Resilience, Request Pilot
4. **Contact** — `info@wellpredict.co.uk`, United Kingdom

**Bottom bar:** © 2026 WellPredict Ltd; disclaimer about not clinical / not surveillance.

---

## 7. Assets (expected under `public/`)

Referenced in code; folder may be empty in repo — add files for production:

| Path | Used by |
|------|---------|
| `/videos/hero-bg.mp4` | Hero, walkthrough-style refs |
| `/images/3_A_Dark_Teal_blue_Abstract_Network.png` | CTA background |
| `/images/4_Data_Center_Server_Racks_with_Blue.png` | Evidence pack section |
| `/images/5_York_Perioperative_Medicine_Service.png` | Sectors healthcare |
| `/images/7_Free_Food_Production_Line_Image_Industry.png` | Sectors food |
| `/images/8_Confidential_Financial_Services_Firm.png` | Sectors financial |
| `/favicon.png`, `/logo.png` | `index.html` meta |

---

## 8. Animation patterns (current)

Most sections:

```ts
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1–0.15 });
  if (sectionRef.current) observer.observe(sectionRef.current);
  return () => observer.disconnect();
}, []);
```

Mark elements with `className="reveal reveal-d1"` etc. for staggered fade-up.

Hero uses inline SVG animation and `float-1/2/3` classes (not GSAP on current homepage).

---

## 9. How to edit (for ChatGPT / other AI)

### Change navbar labels or links

- File: `src/sections/Navigation.tsx`
- Array: `NAV_LINKS`
- CTA text: hardcoded `Request Pilot` on desktop and mobile

### Change section order

- File: `src/App.tsx` — reorder imports and JSX inside `<main>`

### Change copy only

- Prefer editing the `const` arrays at the top of each section file (`CARDS`, `STEPS`, `MODULES`, `NAV_LINKS`, etc.)
- Keep `id` attributes stable if nav/footer hash links must keep working

### Change colours / spacing globally

- File: `src/index.css` — CSS variables and `.section-padding`, `.btn-primary`

### Split into multi-page site later

- Add `src/pages/*` and `Routes` in `App.tsx` or a router file
- Replace hash links in `Navigation.tsx` / `Footer.tsx` with `react-router-dom` `<Link to="...">`
- `config.ts` is prepared for centralised copy but is **not wired** yet

---

## 10. Content and compliance notes (when rewriting)

If aligning with a **customer-facing / burnout-prevention** positioning (per product direction):

- Use plain language in customer-facing UI; footer shows Built in the United Kingdom · 2026
- Use **fictional** org/team names in dashboard mocks (e.g. “Northbridge Demo Co.”)
- Prefer plain language over regulator jargon on the homepage
- Avoid em dashes / en dashes in user-visible strings; use commas or short sentences
---

## 11. `config.ts` (centralisation stub)

`src/config.ts` exports empty interfaces and objects:

- `siteConfig`, `navigationConfig`, `heroConfig`, `capabilitiesConfig`, `capabilityDetailConfig`, `architectureConfig`, `researchConfig`, `footerConfig`

**None of the live sections read from this file yet.** To centralise copy, migrate section constants into `config.ts` and import in components.

---

## 12. Related repo docs

| File | Purpose |
|------|---------|
| `CONTENT_MAP.md` (project root) | Longer audit of user-facing strings (may be outdated vs `src/`) |
| `vite.config.ts` | Dev server; optional ngrok host for tunneling |

---

## 13. Quick file map

```
src/
├── App.tsx                 # Homepage composition
├── main.tsx                # React root + BrowserRouter
├── index.css               # Global design system
├── config.ts               # Unused content config stubs
├── WEBSITE_CONTEXT.md      # This file
├── sections/
│   ├── Navigation.tsx      # Header / mobile menu
│   ├── Hero.tsx
│   ├── ProofBar.tsx
│   ├── Problem.tsx
│   ├── StatCounterRow.tsx
│   ├── HowItWorks.tsx
│   ├── PlatformModules.tsx
│   ├── EvidencePack.tsx
│   ├── Sectors.tsx
│   ├── HumanHACCP.tsx
│   ├── PrivacyArchitecture.tsx
│   ├── PlatformDashboard.tsx
│   ├── WhyWellPredict.tsx
│   ├── CTAContact.tsx
│   └── Footer.tsx
├── components/ui/          # shadcn primitives (library)
└── lib/utils.ts            # cn() helper
```

---

## 14. Example prompt for ChatGPT

> “Using WEBSITE_CONTEXT.md in this repo: update `Navigation.tsx` to add a link to `#dashboard` labelled ‘Dashboard’, change the CTA to ‘Book a Demo’, and rewrite `Hero.tsx` headline/subcopy for HR leaders focused on burnout prevention while keeping the two-column layout and section `id`s unchanged.”

Always specify **which file** and **which section `id`** to preserve when changing layout or anchors.
