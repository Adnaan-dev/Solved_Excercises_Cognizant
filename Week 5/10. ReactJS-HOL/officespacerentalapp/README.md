# 🏢 Office Space Rental App — React JSX Hands-on

A React application (`officespacerentalapp`) that uses **JSX** to create
elements and attributes, embeds **JavaScript expressions** in the markup,
loops through a list of office objects, and applies **conditional inline CSS**:
the **Rent** shows in **red** when it is ≤ 60000 and **green** when above.

> Estimated time: 60 minutes · Prerequisites: **Node.js**, **npm**, **VS Code**

---

## 🎯 Objectives (concept notes)

### Define JSX
**JSX** (JavaScript XML) is a syntax extension for JavaScript that lets you
write HTML-like markup inside JavaScript. Browsers can't read it directly — a
compiler (Babel) transforms it into `React.createElement()` calls.

### ECMAScript
**ECMAScript (ES)** is the standardised specification that JavaScript
implements. **ES6 / ES2015** added `let`/`const`, arrow functions, classes,
modules, destructuring and the spread operator — all widely used in React.

### `React.createElement()`
The function that actually builds a React element (a plain JS object
describing a node):
```js
React.createElement(type, props, ...children)
// e.g.
React.createElement('h1', null, 'Office Space , at Affordable Range');
```

### Creating React nodes with JSX
JSX is sugar over `React.createElement`. These two are identical:
```jsx
const heading = <h1>Office Space , at Affordable Range</h1>;
// compiles to:
const heading = React.createElement('h1', null, 'Office Space , at Affordable Range');
```

### Rendering JSX to the DOM
`react-dom` mounts the element tree into a real DOM node (`index.js`):
```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### JavaScript expressions in JSX
Any JS expression can be embedded inside curly braces `{ }`:
```jsx
<h1>Name: {ItemName.Name}</h1>
<h3>Rent: Rs. {ItemName.Rent}</h3>
```

### Inline CSS in JSX
Two ways are used here:
- **Class-based** (used for the rent colour): `className={rentColorClass(item)}`
  where the class is `textRed` or `textGreen` (defined in `App.css`).
- **Style object** (the general inline form): `style={{ color: 'red' }}` —
  note the double braces and camelCased properties.

---

## 🧩 What the app does

| Requirement | Where |
|-------------|-------|
| Heading element | `<h1>{element} , at Affordable Range</h1>` in `OfficeSpace.js` |
| Image via attribute | `<img src={sr} width="25%" height="25%" alt="Office Space" />` |
| Office object (Name, Rent, Address) | `singleOffice` and the `offices` list |
| List of objects + loop | `offices.map((ItemName) => ...)` |
| Conditional CSS on Rent | `rentColorClass()` → `textRed` (≤ 60000) / `textGreen` (> 60000) |

The rent-colour logic follows the lab hint:
```js
let colors = [];
if (ItemName.Rent <= 60000) {
  colors.push('textRed');
} else {
  colors.push('textGreen');
}
```

The office image is a self-contained SVG in `public/office.svg`, so the app
renders correctly offline.

---

## 🚀 How to run

```bash
cd "Week 5/10. ReactJS-HOL/officespacerentalapp"
npm install      # first time only
npm start        # dev server at http://localhost:3000
npm run build    # optimised production build in /build
```
Requires **Node.js** and **npm** (developed on Node v20).

---

## ✅ Verification status

- `npm install` → exit code 0.
- `npm run build` → **Compiled successfully** (no errors, no warnings).

Run `npm start`: the first office (DBS, Rent 50000) shows the rent in **red**;
offices above 60000 (e.g. WeWork 72000) show it in **green**.
