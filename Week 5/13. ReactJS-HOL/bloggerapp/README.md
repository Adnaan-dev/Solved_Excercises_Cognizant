# 📝 Blogger App — React Conditional Rendering, Lists & Keys Hands-on

A React application (`bloggerapp`) with **three list components** displayed in
three columns separated by green lines:

1. **Course Details**
2. **Book Details**
3. **Blog Details**

It implements **conditional rendering in as many ways as possible** and renders
multiple components from lists using the `map()` function with unique `key`s.

> Estimated time: 60 minutes · Prerequisites: **Node.js**, **npm**, **VS Code**

---

## 🎯 Objectives (concept notes)

### Various ways of conditional rendering
This app deliberately uses several different techniques, one (or more) per
component:

| # | Technique | Where |
|:-:|-----------|-------|
| 1 | **`if / else`** returning a different **element variable** | `BookDetails.js` (`bookdet` variable + empty-list fallback) |
| 2 | **Logical `&&`** (short-circuit) | `BlogDetails.js` — renders the content `<p>` only when `content` exists |
| 3 | **Ternary `? :`** | `BlogDetails.js` — mapped list vs "No blogs to show." fallback |
| 4 | **Preventing rendering with `return null`** | `CourseDetails.js` — returns `null` when `show === false` |
| 5 | **IIFE + `switch`** inside JSX | `CourseDetails.js` — per-course branch |

### Rendering multiple components / list component
Each component is a **list component**: it takes an array via props and renders
multiple child elements from it.

### React `map()` function
Arrays are turned into lists of elements with `array.map(item => <.../>)`:
```jsx
{books.map((book) => (
  <div key={book.id}>
    <h3>{book.bname}</h3>
    <h4>{book.price}</h4>
  </div>
))}
```

### Keys in React
Every element produced by `map()` gets a unique **`key`** (`book.id`,
`blog.id`, `course.id`). Keys help React identify which items changed, were
added, or removed, and must be unique among siblings.

### Extracting components with keys
`BlogDetails` extracts a **`BlogItem`** component. When an extracted component
is rendered inside a `map()`, the **key goes on the component in the parent**
(`<BlogItem key={blog.id} .../>`), not on the root element inside `BlogItem`.

---

## 🧩 Components

| Component | File | Conditional-rendering style |
|-----------|------|-----------------------------|
| `BookDetails` | `Components/BookDetails.js` | Element variable + `if/else` + `map()`/keys |
| `BlogDetails` + `BlogItem` | `Components/BlogDetails.js` | Ternary + logical `&&` + extracted component with key |
| `CourseDetails` | `Components/CourseDetails.js` | `return null` (prevent rendering) + IIFE `switch` |
| `App` | `App.js` | Lays the three out in 3 columns with green separators |
| data | `data.js` | `books`, `blogs`, `courses` arrays |

---

## 🚀 How to run

```bash
cd "Week 5/13. ReactJS-HOL/bloggerapp"
npm install      # first time only
npm start        # dev server at http://localhost:3000
npm run build    # optimised production build in /build
```
Requires **Node.js** and **npm**.

---

## ✅ Verification status

- `npm install` → exit code 0.
- `npm run build` → **Compiled successfully** (no errors, no warnings).

Tip: set `show={false}` on `<CourseDetails />` in `App.js` to see the
"prevent a component from rendering" technique in action — the whole Course
column disappears.
