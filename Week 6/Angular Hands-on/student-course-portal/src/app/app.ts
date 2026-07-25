import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'student-course-portal';

  // Hands-On 8, Task 3: global loading state driven by the loading interceptor
  private loadingService = inject(LoadingService);
  isLoading$ = this.loadingService.isLoading$;
}
