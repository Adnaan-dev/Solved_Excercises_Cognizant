import { Routes } from '@angular/router';
import { EnrollmentFormComponent } from '../../pages/enrollment-form/enrollment-form.component';
import { ReactiveEnrollmentFormComponent } from '../../pages/reactive-enrollment-form/reactive-enrollment-form.component';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';

/*
 * Hands-On 7, Task 2, step 73: the enrollment feature's routes. These are
 * LAZY-LOADED from app.routes.ts via loadChildren, so this code ships in a
 * separate chunk downloaded only when the user first visits /enroll.
 */
export const ENROLLMENT_ROUTES: Routes = [
  { path: '', component: EnrollmentFormComponent },
  {
    path: 'reactive',
    component: ReactiveEnrollmentFormComponent,
    // Hands-On 7, Task 2, step 77: warn on leaving with unsaved changes
    canDeactivate: [unsavedChangesGuard],
  },
];
