import { HttpInterceptorFn } from '@angular/common/http';

/*
 * Hands-On 8, Task 3, step 88: clones each outgoing request and attaches an
 * Authorization header. Check any API call's request headers in DevTools.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: { Authorization: 'Bearer mock-token-12345' },
  });
  return next(authReq);
};
