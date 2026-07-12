# ⚛️ Week 5 · Hands-on Lab 3 — Function Component & Styling (`scorecalculatorapp`)

> **Goal:** build a **Student Management Portal** app named **`scorecalculatorapp`** with a
> **function component** `CalculateScore` that accepts **Name, School, Total, and goal**,
> calculates the **average score**, and displays it — with styles applied via
> `mystyle.css`.

---

## 🎯 Objectives Covered

- **React components** — reusable, independent pieces of UI that return JSX.
- **Components vs JS functions** — a component is written in PascalCase, returns JSX, is
  called via JSX tags (`<CalculateScore />`), receives **props**, and is managed by
  React's render cycle; a plain function returns any value and is called with `()`.
- **Types of components** — class components and **function components**.
- **Function component** — a JS function that receives `props` and returns JSX (this lab).
- **Applying styles** — import a `.css` file and use the `className` attribute.
- **`render()`** — function components don't have a `render()` method; the function's
  **return value** is the rendered output (equivalent to a class component's `render()`).

---

## 🧮 What it does

`CalculateScore` receives four props and computes **average = Total / goal**:

```jsx
function CalculateScore(props) {
  const { name, school, total, goal } = props;
  const average = goal ? (total / goal).toFixed(2) : 0;
  return (
    <div className="scorecard">
      <h1 className="title">Student Score Card</h1>
      <p className="detail"><span className="label">Name: </span>{name}</p>
      <p className="detail"><span className="label">School: </span>{school}</p>
      <p className="detail"><span className="label">Total: </span>{total}</p>
      <p className="detail"><span className="label">Goal: </span>{goal}</p>
      <div className="average">Average Score: {average}</div>
    </div>
  );
}
```

`App.js` invokes it with props:

```jsx
<CalculateScore name="Adnan" school="Cognizant Academy" total={450} goal={5} />
```

→ average = 450 / 5 = **90.00**.

---

## 🗂️ Structure

```
scorecalculatorapp/
├── public/ (index.html, manifest.json, robots.txt)
├── src/
│   ├── Components/CalculateScore.js   # the function component
│   ├── Stylesheets/mystyle.css        # styles imported by the component
│   ├── App.js                         # invokes CalculateScore with props
│   ├── index.js
│   └── index.css
├── .gitignore
└── package.json
```

---

## 🚀 Run

> `create-react-app` is deprecated and no longer scaffolds a project; this ships the same
> classic CRA layout. Original command: `npx create-react-app scorecalculatorapp`.

```bash
cd scorecalculatorapp
npm install
npm start        # http://localhost:3000
```

## ✅ Verification

- `npm install` + `npm run build` (CI=true) → **Compiled successfully**.
- Confirmed in the bundle: `Student Score Card` and `Average Score` strings present.
