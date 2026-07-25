import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EnrollmentService } from './enrollment.service';

describe('EnrollmentService', () => {
  let service: EnrollmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnrollmentService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EnrollmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('enroll() then isEnrolled() reflects membership', () => {
    service.enroll(1);
    expect(service.isEnrolled(1)).toBeTrue();
    service.unenroll(1);
    expect(service.isEnrolled(1)).toBeFalse();
  });
});
