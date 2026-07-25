import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

/*
 * Hands-On 8, Task 3, step 91: shows the global spinner while a request is in
 * flight. finalize() runs on both success and error, so the spinner is always
 * hidden afterwards.
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  loading.show();
  return next(req).pipe(finalize(() => loading.hide()));
};
