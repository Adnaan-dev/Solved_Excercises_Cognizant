# ⚛️ Week 5 · Hands-on Lab 2 — React Components (`StudentApp`)

> **Goal of the lab:** build a **Student Management Portal** React app named
> **`StudentApp`** with three components — **Home**, **About**, and **Contact** — each
> rendering its own welcome message, and call all three from `App.js`.

---

## 🎯 Objectives Covered

### 1. What are React components?

A **component** is a **reusable, independent piece of UI**. It takes optional inputs
(**props**) and returns **JSX** describing what should appear on screen. An app is built by
**composing** components together (here, `App` composes `Home`, `About`, and `Contact`).

### 2. Components vs plain JavaScript functions

| Component | Plain JS function |
|-----------|-------------------|
| Returns **JSX / UI** to render | Returns any value (number, string, object…) |
| Named in **PascalCase** (`Home`) so JSX treats it as a component | Usually camelCase |
| Invoked via **JSX tags**: `<Home />` | Invoked with call syntax: `home()` |
| Managed by React's lifecycle & re-rendering | Runs once when called |
| Receives **props** (and can hold state) | Receives ordinary arguments |

So every React function component *is* a JS function, but it follows React's rules
(PascalCase name, returns JSX, called as a JSX element).

### 3. Types of components

1. **Class components** — ES6 classes that `extend React.Component` and implement
   `render()`. Can have a constructor, state, and lifecycle methods.
2. **Function components** — plain functions returning JSX; use **Hooks**
   (`useState`, `useEffect`) for state and lifecycle. This is the modern default.

### 4. Class component

A class component:

- `extends React.Component` (imported from `react`),
- may define a **constructor** to initialise state / receive props,
- **must** implement a **`render()`** method that returns JSX,
- is exported for use elsewhere.

In this lab **Home**, **About**, and **Contact** are all class components. `Home` also
demonstrates a constructor with state:

```jsx
import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Welcome to the Home page of Student Management Portal',
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default Home;
```

### 5. Function component

A **function component** is a JavaScript function that returns JSX. It is shorter than a
class component and uses Hooks for state. In this app, `App.js` itself is a function
component that renders the three class components:

```jsx
function App() {
  return (
    <div className="App">
      <Home />
      <About />
      <Contact />
    </div>
  );
}
```

### 6. Component constructor

The **constructor** is the first method that runs when a class component is created. It:

- receives **`props`** and must call **`super(props)`** first (so `React.Component` is
  initialised and `this.props` works),
- is where **state is initialised** (`this.state = { ... }`),
- is where event handlers are typically bound.

If a constructor does nothing but call `super(props)`, it is redundant (ESLint's
`no-useless-constructor` rule) — that is why `Home`'s constructor initialises `state`.

### 7. `render()` function

`render()` is the **only required method** in a class component. It:

- returns the **JSX** (the virtual DOM description) React should display,
- must be **pure** — it should not modify state or cause side effects,
- **re-runs** automatically whenever state or props change, letting React diff the virtual
  DOM and update only what changed in the real DOM.

---

## 🧰 Prerequisites

- **Node.js** + **NPM** — <https://nodejs.org/en/download/>
- **Visual Studio Code**

---

## 🚀 Lab Steps (as performed)

> **Note on `create-react-app`:** the `create-react-app` package is now **deprecated** and
> no longer scaffolds a project (it only prints a notice). This lab therefore ships the
> same classic CRA layout (`react-scripts`, `public/`, `src/`) so the result matches the
> exercise. The original command would have been `npx create-react-app studentapp`.

1. **Create the project** `StudentApp` (classic: `npx create-react-app studentapp`).
2. **Create `src/Components/`** and add **`Home.js`** (class component with the Home
   message).
3. **Add `About.js`** and **`Contact.js`** in the same folder, each a class component with
   its respective message.
4. **Edit `App.js`** to import and render `<Home />`, `<About />`, `<Contact />`.
5. **Install dependencies** (because `node_modules` is not committed):
   ```bash
   cd StudentApp
   npm install
   ```
6. **Run the app:**
   ```bash
   npm start
   ```
7. **Open** <http://localhost:3000> — all three messages appear stacked on the page.

---

## 🗂️ Project Structure

```
StudentApp/
├── public/
│   ├── index.html          # single SPA page (<div id="root">)
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── Components/
│   │   ├── Home.js         # class component (constructor + state + render)
│   │   ├── About.js        # class component (render)
│   │   └── Contact.js      # class component (render)
│   ├── App.js              # function component that calls all three
│   ├── index.js            # entry point (createRoot + render)
│   └── index.css
├── .gitignore
└── package.json
```

---

## 🖥️ Expected Output

```
Welcome to the Home page of Student Management Portal
Welcome to the About page of the Student Management Portal
Welcome to the Contact page of the Student Management Portal
```

---

## ✅ Verification

- `npm install` → dependencies installed (Node v20, npm v11).
- `npm run build` (with `CI=true`, warnings-as-errors) → **“Compiled successfully.”**
- All three messages were confirmed present in the compiled bundle
  (`Home` / `About` / `Contact` → all `True`).
- Run `npm start` and browse to `http://localhost:3000` to see it live.
