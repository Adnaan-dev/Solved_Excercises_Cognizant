import { Injectable } from '@angular/core';

/*
 * Hands-On 7, Task 2, step 75: minimal auth state. isLoggedIn is hardcoded true
 * for now; toggle it (or call logout) to see the AuthGuard redirect in action.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = true;

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
