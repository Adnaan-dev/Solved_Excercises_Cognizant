import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { loadCourses } from '../../store/course/course.actions';
import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError,
} from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  imports: [
    CommonModule,
    FormsModule,
    CourseCardComponent,
    HighlightDirective,
    CourseSummaryWidgetComponent,
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit {
  private store = inject(Store);
  private courseService = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Hands-On 9, Task 1, step 96: state comes from the NgRx store
  loading$: Observable<boolean> = this.store.select(selectCoursesLoading);
  error$: Observable<string | null> = this.store.select(selectCoursesError);
  private courses$: Observable<Course[]> = this.store.select(selectAllCourses);

  private searchTerm$ = new BehaviorSubject<string>('');
  searchTerm = '';

  // filtered stream combining the store courses with the search term
  filteredCourses$: Observable<Course[]> = combineLatest([this.courses$, this.searchTerm$]).pipe(
    map(([courses, term]) => {
      const t = term.trim().toLowerCase();
      if (!t) return courses;
      return courses.filter(
        (c) => c.name.toLowerCase().includes(t) || c.code.toLowerCase().includes(t),
      );
    }),
  );

  selectedCourseId: number | null = null;
  students: Student[] = [];

  ngOnInit(): void {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';
    this.searchTerm$.next(this.searchTerm);
    // Hands-On 9, Task 1, step 96: dispatch the load action (Effect does the HTTP)
    this.store.dispatch(loadCourses());
  }

  onSearch(): void {
    this.searchTerm$.next(this.searchTerm);
    this.router.navigate(['/courses'], { queryParams: { search: this.searchTerm || null } });
  }

  goToDetail(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  // Hands-On 8, Task 2, step 87: switchMap chains a dependent HTTP call
  onEnroll(courseId: number): void {
    this.selectedCourseId = courseId;
    this.courseService
      .getCourseById(courseId)
      .pipe(switchMap((course) => this.enrollmentService.getStudentsByCourse(course.id)))
      .subscribe({
        next: (students) => (this.students = students),
        error: (err) => console.error(err),
      });
  }
}
