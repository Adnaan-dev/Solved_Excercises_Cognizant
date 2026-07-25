import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*
 * Hands-On 8, Task 3, step 91: tracks in-flight HTTP requests. The loading
 * interceptor increments/decrements the counter; the app shell subscribes to
 * isLoading$ (via the async pipe) to show/hide a global spinner.
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private activeRequests = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  show(): void {
    this.activeRequests++;
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    if (this.activeRequests === 0) {
      this.loadingSubject.next(false);
    }
  }
}
