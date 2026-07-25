import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { API_BASE } from '../core/api.config';

/*
 * Hands-On 8: CourseService now talks to the JSON Server REST API instead of an
 * in-memory array. All reads return cold Observables (nothing runs until you
 * subscribe or use the async pipe).
 */
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  private readonly url = `${API_BASE}/courses`;

  // Task 1 + Task 2: GET with map (drop zero-credit rows), tap (log),
  // retry (2 attempts) and catchError (friendly message).
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url).pipe(
      map((courses) => courses.filter((c) => c.credits > 0)),
      tap((courses) => console.log('Courses loaded:', courses.length)),
      retry(2),
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      }),
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.url}/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Failed to load the requested course.'));
      }),
    );
  }

  // Task 1, step 81: POST
  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.url, course);
  }

  // Task 1, step 82: PUT
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.url}/${course.id}`, course);
  }

  // Task 1, step 82: DELETE
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
