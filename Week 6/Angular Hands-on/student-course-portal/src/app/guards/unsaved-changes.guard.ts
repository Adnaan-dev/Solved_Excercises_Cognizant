import { CanDeactivateFn } from '@angular/router';

/**
 * Components guarded by unsavedChangesGuard implement this so the guard can ask
 * them whether it is safe to leave.
 */
export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

/*
 * Hands-On 7, Task 2, step 77: CanDeactivate guard. If the component reports it
 * is not safe to leave (e.g. a dirty form), ask the user to confirm.
 */
export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (component.canDeactivate && !component.canDeactivate()) {
    return window.confirm('You have unsaved changes. Leave anyway?');
  }
  return true;
};
