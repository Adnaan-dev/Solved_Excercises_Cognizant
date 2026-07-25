import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

// Hands-On 7: full routing — nested routes, lazy loading, guards and a wildcard.
export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Hands-On 7, Task 1, step 72: nested routes under /courses
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: ':id', component: CourseDetailComponent },
    ],
  },

  // Hands-On 7, Task 2, step 73: lazy-loaded enrollment feature (guarded)
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/enrollment/enrollment.routes').then((m) => m.ENROLLMENT_ROUTES),
  },

  // Hands-On 7, Task 2, step 76: protected route
  { path: 'profile', canActivate: [authGuard], component: StudentProfileComponent },

  // Hands-On 7, Task 1, step 68: wildcard 404 — must be LAST
  { path: '**', component: NotFoundComponent },
];
