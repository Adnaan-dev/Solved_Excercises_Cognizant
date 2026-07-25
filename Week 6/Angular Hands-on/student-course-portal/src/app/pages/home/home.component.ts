import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private courseService = inject(CourseService);

  // Hands-On 2, Task 1 — the four binding types
  portalName = 'Student Course Portal'; // interpolation: {{ portalName }}
  isPortalActive = true; // property binding: [disabled]="!isPortalActive"
  message = ''; // event binding target
  searchTerm = ''; // two-way binding: [(ngModel)]="searchTerm"

  // Hands-On 1 stats
  coursesAvailable = 0;
  enrolled = 3;
  gpa = 3.8;

  // event binding handler
  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  /*
   * Difference between [property] and [(ngModel)]:
   *  - [property]="expr" is ONE-WAY binding: data flows component -> DOM only.
   *    The DOM reflects the component value, but user changes do not flow back.
   *  - [(ngModel)]="prop" is TWO-WAY binding: data flows DOM <-> component.
   *    It is shorthand for [ngModel]="prop" (ngModelChange)="prop = $event",
   *    so typing in the input updates the property and vice-versa.
   */

  // Hands-On 2, Task 2 — lifecycle hooks
  ngOnInit(): void {
    // Hands-On 8: live courses count now comes from the HTTP service
    this.courseService.getCourses().subscribe({
      next: (courses) => (this.coursesAvailable = courses.length),
      error: () => (this.coursesAvailable = 0),
    });
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
}
