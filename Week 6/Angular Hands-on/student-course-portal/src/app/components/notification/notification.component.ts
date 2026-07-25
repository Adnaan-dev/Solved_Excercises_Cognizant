import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

/*
 * Hands-On 6, Task 2, step 67: providing NotificationService HERE (component-level)
 * creates a NEW instance scoped to this component and its children — separate
 * from any other injector. This is useful for isolated, per-component state (e.g.
 * a wizard step), unlike a providedIn:'root' singleton shared app-wide.
 */
@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  providers: [NotificationService],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);

  get messages(): string[] {
    return this.notificationService.getMessages();
  }

  notify(): void {
    this.notificationService.add('Notification #' + (this.messages.length + 1));
  }

  clear(): void {
    this.notificationService.clear();
  }
}
