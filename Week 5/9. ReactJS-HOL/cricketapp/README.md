# 🏏 Cricket App — ES6 Features Hands-on (React)

A small React application (`cricketapp`) built to practise the modern **ES6**
features that make everyday React code concise: `map()`, **arrow functions**,
**array destructuring**, and the **spread/merge** operator. A single `flag`
variable switches the home page between two screens using a plain `if / else`.

> Estimated time: 60 minutes · Prerequisites: **Node.js**, **npm**, **VS Code**

---

## 🎯 Objectives (concept notes)

### ES6 feature list
ES6 (ECMAScript 2015) introduced: `let` / `const`, arrow functions, template
literals, default / rest / spread parameters, destructuring, classes,
modules (`import` / `export`), promises, iterators & generators, and the new
built-in collections `Map` and `Set`.

### JavaScript `let`
`let` declares a **block-scoped** variable — it only exists inside the `{ }`
block where it was declared. It can be reassigned but not re-declared in the
same scope, and it is **not hoisted** for use before its declaration
(temporal dead zone).

### Difference between `var` and `let`
| | `var` | `let` |
|---|-------|-------|
| Scope | Function-scoped | Block-scoped |
| Hoisting | Hoisted & initialised as `undefined` | Hoisted but in the temporal dead zone |
| Re-declaration | Allowed in same scope | Not allowed in same scope |
| Global object | Adds a property to `window` | Does **not** |

### JavaScript `const`
`const` is also **block-scoped** but must be initialised at declaration and
**cannot be reassigned**. For objects/arrays the *binding* is constant, yet
the contents can still be mutated (`const a = []; a.push(1)` is valid).

### ES6 class fundamentals
`class` is syntactic sugar over prototype-based inheritance. A class has a
`constructor`, instance methods, `static` methods, and getters/setters:
```js
class Player {
  constructor(name, score) { this.name = name; this.score = score; }
  describe() { return `${this.name}: ${this.score}`; }
}
```

### ES6 class inheritance
`extends` creates a subclass; `super(...)` calls the parent constructor and
`super.method()` calls a parent method:
```js
class Batsman extends Player {
  constructor(name, score, strikeRate) {
    super(name, score);
    this.strikeRate = strikeRate;
  }
}
```

### ES6 arrow functions
A shorter function syntax that does **not** bind its own `this` (it captures
`this` from the enclosing scope). Great for callbacks:
```js
const below70 = players.filter((p) => p.score <= 70);
```

### `Set()` and `Map()`
- **`Set`** — a collection of **unique** values: `new Set([1, 1, 2]) // {1, 2}`.
- **`Map`** — key/value pairs where **keys can be any type** and insertion
  order is preserved: `new Map([['a', 1]])`.

---

## 🧩 Components & the ES6 feature each demonstrates

| Component | File | ES6 feature |
|-----------|------|-------------|
| **ListofPlayers** | `src/Components/ListofPlayers.js` | `map()` over an array of `{name, score}` objects |
| **Scorebelow70** | `src/Components/Scorebelow70.js` | **arrow function** predicate in `filter()` (score ≤ 70) |
| **IndianPlayers** (`OddPlayers`, `EvenPlayers`) | `src/Components/IndianPlayers.js` | **array destructuring** with holes — `[first, , third, , fifth]` |
| **ListofIndianPlayers** | `src/Components/ListofIndianPlayers.js` | **spread / merge** — `[...T20Players, ...RanjiTrophyPlayers]` |
| **App** | `src/App.js` | `flag` variable driving a simple `if / else` render |

### How the `flag` decides the screen
```js
const flag = true;
if (flag === true) {
  // Screen 1: List of Players + players scoring 70 or below
} else {
  // Screen 2: Odd/Even Indian players + merged Indian players list
}
```
- `flag = true` → **List of Players** and **List of Players having Scores Less than 70**.
- `flag = false` → **Odd Players**, **Even Players** (destructured from the
  Indian team) and the **merged Indian Players** list.

Change the single `flag` value in `src/App.js` to switch views.

---

## 🚀 How to run

```bash
cd "Week 5/9. ReactJS-HOL/cricketapp"
npm install      # first time only — installs React + react-scripts
npm start        # dev server at http://localhost:3000
npm run build    # optimised production build in /build
```
Requires **Node.js** and **npm** (developed on Node v20).

---

## ✅ Verification status

- `npm install` → **added 1300 packages**, exit code 0.
- `npm run build` → **Compiled successfully** (no errors, no warnings);
  `main.js` ≈ 45.6 kB gzipped.

Run `npm start` and toggle `flag` in `src/App.js` to see both screens shown in
the exercise output.
