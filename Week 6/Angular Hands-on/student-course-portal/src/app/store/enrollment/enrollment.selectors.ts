import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';

// Hands-On 9, Task 2, step 99: enrollment selectors, including a cross-slice one.
export const selectEnrollmentState =
  createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state) => state.enrolledCourseIds,
);

/*
 * Cross-slice selector: combines the course slice and the enrollment slice to
 * derive the full enrolled Course objects — no duplicated state, fully memoised.
 */
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses, enrolledIds) => courses.filter((c) => enrolledIds.includes(c.id)),
);
