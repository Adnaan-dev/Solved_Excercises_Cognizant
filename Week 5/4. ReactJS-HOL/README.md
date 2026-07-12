# ⚛️ Week 5 · Hands-on Lab 4 — Component Life Cycle (`blogapp`)

> **Goal:** build **`blogapp`** with a class-based `Posts` component that fetches blog
> posts from the JSONPlaceholder API using the **`componentDidMount()`** life cycle hook,
> renders their title/body, and handles errors with **`componentDidCatch()`**.

---

## 🎯 Objectives Covered

### Need & benefits of the component life cycle
React components go through phases — **Mounting → Updating → Unmounting**. Life cycle hooks
let you run code at the right moment: set up state, fetch data, react to changes, and clean
up. This keeps side effects (like network calls) out of `render()` and makes behaviour
predictable.

### Life cycle hook methods used
- **`constructor()`** — Mounting phase; initialises state (`posts: []`).
- **`componentDidMount()`** — runs once, right after the first render; the recommended
  place to start data fetching. Here it calls `loadPosts()`.
- **`componentDidCatch(error, info)`** — an **error boundary** hook; catches errors thrown
  while rendering child components and reports them (here, as an `alert`).
- **`render()`** — produces the UI; runs on mount and after every state/prop change.

### Sequence of steps in rendering a component (mounting)
1. `constructor()` — initial state.
2. `render()` — first paint (empty list).
3. `componentDidMount()` — `loadPosts()` fetches data → `setState`.
4. `render()` runs again — now displays the fetched posts.

---

## 🧩 Key files

**`Post.js`** — a plain JavaScript **model class** (not a component):

```js
class Post {
  constructor(userId, id, title, body) {
    this.userId = userId; this.id = id; this.title = title; this.body = body;
  }
}
export default Post;
```

**`Posts.js`** — the class component:

```jsx
constructor(props) { super(props); this.state = { posts: [], hasError: false }; }

loadPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(r => r.json())
    .then(data => this.setState({
      posts: data.map(p => new Post(p.userId, p.id, p.title, p.body))
    }))
    .catch(err => alert('Error while loading posts: ' + err.message));
}

componentDidMount() { this.loadPosts(); }

componentDidCatch(error, info) { this.setState({ hasError: true }); alert(...); }

render() { /* h1 + each post's title (h3) and body (p) */ }
```

> **Note:** `componentDidCatch()` only catches errors thrown during **rendering of child
> components**, not asynchronous errors. Network/fetch failures are therefore also handled
> in the fetch `.catch()` with an alert, as the lab requests.

---

## 🗂️ Structure

```
blogapp/
├── public/ (index.html, manifest.json, robots.txt)
├── src/
│   ├── Post.js       # model class
│   ├── Posts.js      # class component with life cycle hooks
│   ├── App.js        # renders <Posts />
│   ├── index.js
│   └── index.css
├── .gitignore
└── package.json
```

---

## 🚀 Run

> `create-react-app` is deprecated; this ships the classic CRA layout.
> Original command: `npx create-react-app blogapp`.

```bash
cd blogapp
npm install
npm start        # http://localhost:3000  (needs internet for the API)
```

## ✅ Verification

- `npm install` + `npm run build` (CI=true) → **Compiled successfully**.
- Confirmed in the bundle: the `jsonplaceholder.typicode.com/posts` URL and `Blog Posts`
  heading are present.
