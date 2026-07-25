import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Course } from '../../models/course.model';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

// Backwards-compatible alias — earlier hands-on referred to CourseInput.
export type CourseInput = Course;

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent implements OnChanges, OnInit {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  // Hands-On 9, Task 2, step 100: enrollment state now lives in the NgRx store
  private store = inject(Store);
  enrolledIds$: Observable<number[]> = this.store.select(selectEnrolledIds);
  private enrolledIds: number[] = [];

  isExpanded = false;

  ngOnInit(): void {
    this.enrolledIds$.subscribe((ids) => (this.enrolledIds = ids));
  }

  get enrolled(): boolean {
    return this.course ? this.enrolledIds.includes(this.course.id) : false;
  }

  get cardClasses(): Record<string, boolean> {
    return {
      'card--enrolled': this.enrolled,
      'card--full': this.course?.credits >= 4,
      expanded: this.isExpanded,
    };
  }

  get borderColor(): string {
    switch (this.course?.gradeStatus) {
      case 'passed':
        return 'green';
      case 'failed':
        return 'red';
      default:
        return 'grey';
    }
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  // Hands-On 9, Task 2, step 100: dispatch enroll/unenroll actions
  onEnrollClick(): void {
    if (this.enrolled) {
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
    }
    this.enrollRequested.emit(this.course.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      const { previousValue, currentValue } = changes['course'];
      console.log('CourseCard ngOnChanges — previous:', previousValue, 'current:', currentValue);
    }
  }
}
