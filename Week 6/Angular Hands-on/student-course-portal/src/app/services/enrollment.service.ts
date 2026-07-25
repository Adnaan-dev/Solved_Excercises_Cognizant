import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { Student } from '../models/student.model';
import { CourseService } from './course.service';
import { API_BASE } from '../core/api.config';

/*
 * Hands-On 8: enrollment tracking. Enrolled IDs are kept client-side; resolving
 * them to full Course objects and loading a course's students both go through
 * HTTP. Demonstrates service-to-service injection (CourseService) plus RxJS.
 */
@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private http = inject(HttpClient);
  private courseService = inject(CourseService);
  private enrolledCourseIds: number[] = [];

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledIds(): number[] {
    return this.enrolledCourseIds;
  }

  // Resolve enrolled IDs to full Course objects via the HTTP course list.
  getEnrolledCourses(): Observable<Course[]> {
    return this.courseService
      .getCourses()
      .pipe(map((courses) => courses.filter((c) => this.enrolledCourseIds.includes(c.id))));
  }

  // Hands-On 8, Task 2, step 87: used with switchMap to load a course's students.
  getStudentsByCourse(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${API_BASE}/students?courseId=${courseId}`);
  }
}
