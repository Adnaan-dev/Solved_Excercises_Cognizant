import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';
import { API_BASE } from '../core/api.config';

// Hands-On 10, Task 2: service tests with the HTTP testing backend.
describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  const url = `${API_BASE}/courses`;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Web Development', code: 'CS102', credits: 3, gradeStatus: 'pending' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCourses() requests the right URL and returns courses', () => {
    service.getCourses().subscribe((courses) => expect(courses.length).toBe(2));
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('getCourses() surfaces a friendly error (after retries)', () => {
    let capturedError: Error | undefined;
    service.getCourses().subscribe({
      next: () => fail('expected an error'),
      error: (err: Error) => (capturedError = err),
    });
    // retry(2) => 1 initial + 2 retries = 3 requests before catchError fires
    for (let i = 0; i < 3; i++) {
      httpMock.expectOne(url).flush('boom', { status: 500, statusText: 'Server Error' });
    }
    expect(capturedError?.message).toContain('Failed to load courses');
  });
});
