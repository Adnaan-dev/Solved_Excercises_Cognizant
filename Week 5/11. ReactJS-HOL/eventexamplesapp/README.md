# 🖱️ Event Examples App — React Event Handling Hands-on

A React application (`eventexamplesapp`) that handles various events of HTML
form elements. It demonstrates React events, event handlers, the `this`
keyword with constructor binding, synthetic events, and the React event
naming convention — plus a `CurrencyConvertor` that converts Rupees to Euro.

> Estimated time: 90 minutes · Prerequisites: **Node.js**, **npm**, **VS Code**

---

## 🎯 Objectives (concept notes)

### React events
React lets you respond to user interactions (click, change, submit, …) by
attaching handler functions to JSX elements. React events are declared as
attributes on elements: `<button onClick={...}>`.

### Event handlers
An event handler is a function that runs when the event fires. In JSX you pass
a **function reference** (`{this.handleClick}`) — not a call
(`{this.handleClick()}`), which would run immediately during render. To pass an
argument, wrap it in an arrow function: `onClick={() => this.sayWelcome('welcome')}`.

### Synthetic event
React wraps the browser's native event in a **SyntheticEvent** — a
cross-browser wrapper with the same interface (`event.target`,
`event.preventDefault()`, `event.type`, …). Every handler receives it as its
first argument, so your code behaves the same across all browsers.

### React event naming convention
- Event attributes are **camelCase**: `onClick`, `onChange`, `onSubmit`
  (HTML uses lowercase `onclick`).
- The value is a **function reference in curly braces**, e.g. `onClick={handler}`
  (HTML uses a string, e.g. `onclick="handler()"`).

### The `this` keyword
In class components, event-handler methods must be **bound** so `this` points
to the component instance. This app binds every handler in the `constructor`:
```js
this.handleIncrement = this.handleIncrement.bind(this);
```
Without binding, `this` inside the handler would be `undefined`.

---

## 🧩 What the app does

### 1. Counter (`EventExamples.js`)
- **Increment** — a single `onClick` invokes **multiple methods**:
  - `handleIncrement()` → increases the counter, and
  - `sayHello()` → alerts **"Hello! Member!"** (a static message).
- **Decrement** — `handleDecrement()` decreases the counter.

### 2. Say welcome
- Invokes a handler that takes an **argument**:
  `onClick={() => this.sayWelcome('welcome')}` → alerts **"welcome"**.

### 3. Click on me (synthetic event)
- `onClick={this.handleClick}` where `handleClick(e)` receives the
  **synthetic event** and alerts **"I was clicked"** (logs `e.type` to the console).

### 4. CurrencyConvertor (`CurrencyConvertor.js`)
- Controlled **Amount** and **Currency** inputs (their `onChange` handlers read
  `event.target.value`).
- **Submit** invokes `handleSubmit(event)`, which calls `event.preventDefault()`
  and converts Rupees → Euro (`amount * 80`), alerting
  **"Converting to Euro Amount is &lt;value&gt;"**.
  Example: Amount `80` → alert **"Converting to Euro Amount is 6400"**.

---

## 🚀 How to run

```bash
cd "Week 5/11. ReactJS-HOL/eventexamplesapp"
npm install      # first time only
npm start        # dev server at http://localhost:3000
npm run build    # optimised production build in /build
```
Requires **Node.js** and **npm** (developed on Node v20).

---

## ✅ Verification status

- `npm install` → exit code 0.
- `npm run build` → **Compiled successfully** (no errors, no warnings).
