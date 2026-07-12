# ✈️ Ticket Booking App — React Conditional Rendering Hands-on

A React application (`ticketbookingapp`) where a **guest** can browse the
flight details, but only a **logged-in user** can book a ticket. Clicking
**Login** shows the User page ("Welcome back"); clicking **Logout** shows the
Guest page ("Please sign up.").

> Estimated time: 60 minutes · Prerequisites: **Node.js**, **npm**, **VS Code**

---

## 🎯 Objectives (concept notes)

### Conditional rendering in React
React renders different UI depending on state/props, using ordinary JavaScript
(`if`, ternary `? :`, or `&&`). Here the `Greeting` component returns
`<UserGreeting />` or `<GuestGreeting />` based on the `isLoggedIn` prop.

### Element variables
You can store a React element in a variable and render it later with `{ }`.
`LoginControl` uses a `button` element variable:
```jsx
let button;
if (isLoggedIn) {
  button = <LogoutButton onClick={this.handleLogoutClick} />;
} else {
  button = <LoginButton onClick={this.handleLoginClick} />;
}
// ...later in JSX:
{button}
```
This keeps the returned JSX clean while still deciding the element conditionally.

### Preventing a component from rendering
A component can hide itself entirely by returning `null`. `BookTicket` does
exactly this for guests:
```jsx
export function BookTicket(props) {
  if (!props.isLoggedIn) {
    return null; // renders nothing at all
  }
  return ( /* booking UI */ );
}
```
Returning `null` does not affect the component's lifecycle — it simply renders
no output.

---

## 🧩 Components

| Component | File | Role |
|-----------|------|------|
| `Greeting` / `UserGreeting` / `GuestGreeting` | `Greeting.js` | Conditional rendering of the heading ("Welcome back" vs "Please sign up.") |
| `LoginButton` / `LogoutButton` | `Buttons.js` | Stateless buttons that receive `onClick` via props |
| `FlightDetails` | `FlightDetails.js` | Flight table — **browsable by everyone** (guest + user) |
| `BookTicket` | `BookTicket.js` | **Returns `null` for guests**; shows a "Book Ticket" button only when logged in |
| `LoginControl` | `LoginControl.js` | Class component owning `isLoggedIn` state; uses an **element variable** and wires the page together |

### Behaviour
- **Guest (logged out):** heading "Please sign up.", a **Login** button, the
  flight details table. The booking section is not rendered.
- **User (logged in):** heading "Welcome back", a **Logout** button, the flight
  details table, **and** the "Book Ticket" section.

---

## 🚀 How to run

```bash
cd "Week 5/12. ReactJS-HOL/ticketbookingapp"
npm install      # first time only
npm start        # dev server at http://localhost:3000
npm run build    # optimised production build in /build
```
Requires **Node.js** and **npm** (developed on Node v20).

---

## ✅ Verification status

- `npm install` → exit code 0.
- `npm run build` → **Compiled successfully** (no errors, no warnings).

Click **Login** to switch to the "Welcome back" user page (booking enabled) and
**Logout** to return to the "Please sign up." guest page.
