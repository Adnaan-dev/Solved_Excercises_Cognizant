import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { NotificationComponent } from '../../components/notification/notification.component';
import { loadCourses } from '../../store/course/course.actions';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule, NotificationComponent],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css',
})
export class StudentProfileComponent implements OnInit {
  private store = inject(Store);

  // Hands-On 9, Task 2: enrolled courses via the cross-slice selector
  enrolledCourses$: Observable<Course[]> = this.store.select(selectEnrolledCourses);

  ngOnInit(): void {
    // make sure the course slice is populated so the cross-slice selector works
    this.store.dispatch(loadCourses());
  }
}
