# ⚛️ Week 5 · Hands-on Lab 1 — Getting Started with React (`myfirstreact`)

> **Goal of the lab:** set up a React environment and create a new React application
> named **`myfirstreact`** that renders the heading **“welcome to the first session of
> React”** on the page.

---

## 🎯 Objectives Covered

This README doubles as the theory write-up for the lab objectives.

### 1. What is a Single-Page Application (SPA)?

A **Single-Page Application** loads a **single HTML page** (in this project,
`public/index.html` with its one `<div id="root">`) and then **dynamically rewrites the
content** of that page as the user interacts with it, instead of requesting brand-new
pages from the server. Navigation and updates happen on the client via JavaScript, so the
page never does a full reload.

**Benefits of a SPA**

- **Fast, fluid UX** — only data changes after the first load, not the whole page.
- **Less server load** — the server mostly sends JSON, not full rendered HTML.
- **Clear separation** — front-end (React) and back-end (API) are decoupled.
- **Feels like a desktop/mobile app** — smooth transitions, no white flashes.
- **Caching & offline** — assets load once and can be cached (PWA-friendly).

### 2. What is React and how does it work?

**React** is an open-source **JavaScript library** (by Meta/Facebook) for building **user
interfaces** out of reusable **components**.

How it works:

1. You describe the UI as **components** that return **JSX** (HTML-like markup in JS).
2. React builds an in-memory tree of these elements — the **Virtual DOM**.
3. When state/props change, React creates a new Virtual DOM tree and **diffs** it against
   the previous one (a process called **reconciliation**).
4. React computes the **minimal set of changes** and updates only those nodes in the
   **real DOM**, which is what makes it fast.

In this app the flow is:
`public/index.html` → `src/index.js` (mounts to `#root`) → `src/App.js` (the component
that renders the heading).

### 3. SPA vs MPA (Multi-Page Application)

| Aspect | SPA (Single-Page) | MPA (Multi-Page) |
|--------|-------------------|------------------|
| Page loads | One initial load, then dynamic updates | Full page reload per navigation |
| Speed after load | Very fast (only data moves) | Slower (server renders each page) |
| Server role | Serves JSON/API data | Renders full HTML pages |
| SEO | Harder (needs SSR/pre-render) | Easier out of the box |
| Initial load | Larger JS bundle up front | Smaller per-page payloads |
| Examples | Gmail, Facebook, Trello | Traditional multi-page websites, blogs |
| Best for | Rich, interactive apps | Content/SEO-heavy sites |

### 4. Pros & Cons of a Single-Page Application

**Pros**

- Fast and responsive after the initial load.
- Great, app-like user experience.
- Reduced server-side rendering load.
- Reusable front-end logic; easy to consume the same API from web/mobile.
- Simplified caching of static assets.

**Cons**

- **SEO is harder** — content is JS-rendered (needs SSR / pre-rendering).
- **Slower first load** — the initial JavaScript bundle can be large.
- **Requires JavaScript enabled** in the browser.
- **Client-side security** — more logic on the client to protect.
- **Memory/complexity** — long-running pages can leak memory if not managed.

### 5. Virtual DOM

The **Virtual DOM (VDOM)** is a **lightweight in-memory JavaScript representation** of the
real DOM. Directly manipulating the real DOM is slow. React instead:

1. Keeps a virtual copy of the UI.
2. On a change, builds a **new** virtual tree.
3. **Diffs** new vs old (reconciliation) to find what actually changed.
4. Applies only those **minimal updates** to the real DOM.

This batching + minimal-update strategy is a key reason React is performant.

### 6. Features of React

- **Component-based** — build UIs from small, reusable, composable pieces.
- **JSX** — write HTML-like syntax directly in JavaScript.
- **Virtual DOM** — efficient, minimal real-DOM updates.
- **One-way data binding** — predictable data flow (parent → child via props).
- **Declarative** — you describe *what* the UI should look like; React handles *how*.
- **Hooks** — state and lifecycle in function components (`useState`, `useEffect`, …).
- **Rich ecosystem** — React Router, Redux, huge community and tooling.
- **Learn once, write anywhere** — React (web) and React Native (mobile).

---

## 🧰 Prerequisites

- **Node.js** and **NPM** — <https://nodejs.org/en/download/>
- **Visual Studio Code**

Verify your install:

```bash
node --version
npm --version
```

---

## 🚀 Lab Steps (as performed)

> **Note on `create-react-app`:** the exercise instructs using `create-react-app`. As of
> 2025 the `create-react-app` package is **deprecated** — the CLI now only prints a
> deprecation notice and no longer scaffolds a project. This lab therefore ships the exact
> **same classic CRA project layout** (`react-scripts`, `public/index.html`, `src/App.js`,
> `src/index.js`) so the result is identical to what the exercise expects. The original
> command would have been:
>
> ```bash
> npx create-react-app myfirstreact
> ```
>
> To scaffold an equivalent project today you would instead use Vite:
> `npm create vite@latest myfirstreact -- --template react`.

1. **Install Node.js and NPM** from the link above.
2. **Create the app** — classic command was `npx create-react-app myfirstreact`
   (this repo ships the ready-made project).
3. **Navigate into the app folder:**
   ```bash
   cd myfirstreact
   ```
4. **Open the folder in VS Code.**
5. **Open `src/App.js`.**
6. **Replace its contents** with the component that renders the heading (see below).
7. **Install dependencies** (needed because `node_modules` is not committed):
   ```bash
   npm install
   ```
8. **Run the app:**
   ```bash
   npm start
   ```
9. **Open** <http://localhost:3000> in a browser — you will see the heading
   **“welcome to the first session of React”**.

---

## 📄 `src/App.js`

```jsx
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>welcome to the first session of React</h1>
    </div>
  );
}

export default App;
```

---

## 🗂️ Project Structure

```
myfirstreact/
├── public/
│   ├── index.html        # the single HTML page (SPA mount point: <div id="root">)
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.js            # renders the required heading
│   ├── App.css
│   ├── index.js          # React 18 entry point (createRoot + render)
│   └── index.css
├── .gitignore
└── package.json          # react, react-dom, react-scripts (start/build/test)
```

---

## ✅ Verification

- `npm install` → dependencies installed (Node v20, npm v11).
- `npm run build` → **“Compiled successfully.”**
- The heading string **“welcome to the first session of React”** was confirmed present in
  the compiled bundle and in the generated `index.html`.
- Run `npm start` locally and browse to `http://localhost:3000` to see it live.
