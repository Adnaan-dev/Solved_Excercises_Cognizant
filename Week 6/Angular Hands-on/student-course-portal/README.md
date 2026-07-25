# 🎓 Student Course Portal — Angular v20

A single **Angular 20 (standalone)** SPA built incrementally across the **10 hands-on
exercises** in `Angular_HandsOn.pdf` (Digital Nurture 5.0 · .NET Full Stack track). Each
hands-on adds a new capability to the *same* app — from components and bindings through
forms, routing, HTTP, NgRx state management, and unit testing.

Students can browse and enroll in courses, view a profile with enrolled courses, and
receive notifications; the catalog is served by a JSON Server mock API.

---

## ✅ Status

| Check | Result |
|-------|--------|
| `ng build` (production) | ✅ Compiles — initial ~348 kB, lazy `enrollment-routes` chunk emitted |
| `ng test` (Karma + ChromeHeadless) | ✅ **40 specs pass** |
| JSON Server API | ✅ `GET /courses` and `/students?courseId=1` verified (200) |

---

## 🧭 What each hands-on added

| # | Topic | Key artifacts |
|:-:|-------|---------------|
| 1 | Setup, structure & first components | `notes.txt`, `HeaderComponent`, `HomeComponent`, `app.routes.ts`, `<app-header>` + `<router-outlet>` |
| 2 | Data binding, lifecycle, @Input/@Output | Home bindings (interpolation/property/event/two-way), `ngOnInit/OnDestroy/OnChanges`, `CourseCardComponent` |
| 3 | Directives & pipes | `*ngIf/*ngFor(trackBy)/*ngSwitch`, `ngClass`/`ngStyle`, `HighlightDirective`, `CreditLabelPipe` |
| 4 | Template-driven forms | `EnrollmentFormComponent` (`ngForm`/`ngModel`, validators, error messages, reset) — `/enroll` |
| 5 | Reactive forms | `ReactiveEnrollmentFormComponent` (`FormBuilder`, `FormArray`, custom sync + async validators) |
| 6 | Services & DI | `CourseService`, `EnrollmentService` (service-to-service), component-scoped `NotificationService`, `Course` model |
| 7 | Routing — guards & lazy loading | nested `/courses/:id`, `authGuard`, `unsavedChangesGuard`, lazy `features/enrollment`, 404 route |
| 8 | HTTP client & interceptors | `HttpClient` services, RxJS (`map/tap/retry/catchError/switchMap`), auth + error + loading interceptors, global spinner |
| 9 | NgRx state management | `store/course` & `store/enrollment` (actions/reducers/selectors/effects), cross-slice selector, DevTools |
| 10 | Unit testing | Jasmine/Karma/TestBed specs — component (`MockStore`), service (`HttpTestingController`), pipe, directive |

Detailed per-file notes for Hands-On 1 are in [`notes.txt`](./notes.txt); each source file
is commented with the hands-on / step it implements.

---

## 🚀 Running the project

> **Node requirement:** Angular CLI v20 needs **Node ≥ 20.19 (or ≥ 22.12)**. If your
> system Node is older, install a newer one (this project was built/verified with Node
> v22.12.0). Then `npm install`.

```bash
npm install            # install dependencies (node_modules is git-ignored)

# 1) start the mock REST API (JSON Server) on http://localhost:3000
npm run api            #  == json-server --watch db.json --port 3000

# 2) in another terminal, start the Angular dev server
npm start              #  == ng serve  -> http://localhost:4200

# production build
npm run build          #  == ng build  -> dist/student-course-portal

# unit tests (headless)
ng test --watch=false --browsers=ChromeHeadless
```

The mock API data lives in [`db.json`](./db.json) (`courses`, `students`, `enrollments`).

---

## 🗺️ Routes

| Path | Component | Notes |
|------|-----------|-------|
| `/` | Home / dashboard | live course count, binding demos |
| `/courses` | Courses (nested layout) | search (`?search=`), grid of cards |
| `/courses/:id` | Course detail | reads route param |
| `/enroll` | Enrollment form (template-driven) | **lazy-loaded**, `authGuard` |
| `/enroll/reactive` | Enrollment form (reactive) | lazy, `unsavedChangesGuard` |
| `/profile` | Student profile | `authGuard`, enrolled courses via NgRx |
| `**` | 404 Not Found | wildcard |

---

## 🏗️ Tech

Angular 20 (standalone APIs) · TypeScript 5.9 · RxJS 7 · NgRx 20 (store/effects/entity/devtools)
· JSON Server · Jasmine + Karma. Uses the modern `provide*` bootstrap
(`provideRouter`, `provideHttpClient(withInterceptors(...))`, `provideStore`,
`provideState`, `provideEffects`) in [`src/app/app.config.ts`](./src/app/app.config.ts).
