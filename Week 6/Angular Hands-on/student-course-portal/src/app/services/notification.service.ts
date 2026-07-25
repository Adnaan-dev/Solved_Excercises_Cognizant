import { Injectable } from '@angular/core';

/*
 * Hands-On 6, Task 2, step 67: intentionally NOT providedIn 'root'. It is
 * provided at the component level (see NotificationComponent), which creates a
 * NEW instance scoped to that component and its children — isolated state that
 * is destroyed with the component, rather than an app-wide singleton.
 */
@Injectable()
export class NotificationService {
  private messages: string[] = [];

  add(message: string): void {
    this.messages.push(message);
  }

  getMessages(): string[] {
    return this.messages;
  }

  clear(): void {
    this.messages = [];
  }
}
