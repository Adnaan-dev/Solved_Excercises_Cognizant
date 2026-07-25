import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/*
 * Hands-On 8, Task 3, step 90: global HTTP error handling. On 401 redirect to
 * home (stand-in for a login page); on 500 log a global error. Re-throws so the
 * calling component can still react.
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('401 Unauthorized — redirecting to home/login');
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('500 Server Error — please try again later');
      }
      return throwError(() => error);
    }),
  );
};
