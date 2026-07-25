import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/*
 * Hands-On 7, Task 2, steps 75-76: functional CanActivate guard. Allows the
 * route when the user is logged in, otherwise redirects to home and blocks it.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn) {
    return true;
  }
  router.navigate(['/']);
  return false;
};
