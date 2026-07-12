# ⚛️ Week 5 · Hands-on Lab 5 — Styling with CSS Modules (`cohortdetailsapp`)

> **Goal:** style a **Cohorts Details** dashboard using a **CSS Module**
> (`CohortDetails.module.css`) — a `box` card class, a `<dt>` tag style, and an `<h3>`
> whose colour is **green** for *Ongoing* cohorts and **blue** otherwise.

> **Note:** the lab supplies a ready-made app to unzip. That attachment isn't included
> here, so this repo provides an equivalent React app that renders the same dashboard
> (matching the lab's screenshot) and then applies the requested styling.

---

## 🎯 Objectives Covered

- **Why style components** — components need consistent, encapsulated styling that doesn't
  leak into other parts of the app.
- **CSS Modules** — a `*.module.css` file whose class names are **locally scoped** (no
  global collisions). Imported as an object: `import styles from './CohortDetails.module.css'`
  then used as `className={styles.box}`.
- **Inline styles** — the `style` property takes a JS object; used here for the conditional
  `<h3>` colour.
- **`className` vs `style`** — this lab uses both: `className` for the module `box` class,
  and `style` for the dynamic heading colour.

---

## 🎨 `CohortDetails.module.css`

```css
.box {
  width: 300px;
  display: inline-block;
  margin: 10px;               /* overall 10px margin */
  padding: 10px 20px;         /* 10px top/bottom, 20px left/right */
  border: 1px solid black;    /* 1px solid black */
  border-radius: 10px;        /* rounded corners */
  vertical-align: top;
}

.box dt {                     /* <dt> tag selector */
  font-weight: 500;
}
```

> **Why `.box dt` and not bare `dt`?** CRA's CSS Modules require every selector to include a
> local class or id ("pure" selectors). A bare `dt { }` fails the build, so the `<dt>` tag
> selector is scoped under `.box` — it still targets `<dt>` via a tag selector.

## 🧩 `CohortDetails.js`

```jsx
import styles from './CohortDetails.module.css';

function CohortDetails({ cohort }) {
  const isOngoing = cohort.status.toLowerCase() === 'ongoing';
  const headingStyle = { color: isOngoing ? 'green' : 'blue' };
  return (
    <div className={styles.box}>
      <h3 style={headingStyle}>{cohort.name}</h3>
      <dl>
        <dt>Started On</dt>   <dd>{cohort.startedOn}</dd>
        <dt>Current Status</dt><dd>{cohort.status}</dd>
        <dt>Coach</dt>        <dd>{cohort.coach}</dd>
        <dt>Trainer</dt>      <dd>{cohort.trainer}</dd>
      </dl>
    </div>
  );
}
```

The cohort data (`src/cohortData.js`) matches the lab screenshot: `INTADMDF10 -.NET FSD`
(*Scheduled* → blue), `ADM21JF014 -Java FSD` (*Ongoing* → green), `CDBJF21025 -Java FSD`
(*Ongoing* → green).

---

## 🗂️ Structure

```
cohortdetailsapp/
├── public/ (index.html, manifest.json, robots.txt)
├── src/
│   ├── Components/
│   │   ├── CohortDetails.js          # imports the module, applies box + h3 colour
│   │   └── CohortDetails.module.css  # the CSS Module
│   ├── cohortData.js                 # sample cohort data
│   ├── App.js                        # "Cohorts Details" + a card per cohort
│   ├── index.js
│   └── index.css
├── .gitignore
└── package.json
```

---

## 🚀 Run

```bash
cd cohortdetailsapp
npm install
npm start        # http://localhost:3000
```

## ✅ Verification

- `npm install` + `npm run build` (CI=true) → **Compiled successfully**.
- Confirmed in the compiled CSS: `width:300px`, `border-radius:10px`, `font-weight:500`.
- Confirmed in the compiled JS: conditional `green` / `blue` colours and the `Started On`
  labels are present.
