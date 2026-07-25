import { createReducer, on } from '@ngrx/store';
import { enrollInCourse, unenrollFromCourse, setEnrolledCourses } from './enrollment.actions';

// Hands-On 9, Task 2, step 99: enrollment feature state + reducer.
export interface EnrollmentState {
  enrolledCourseIds: number[];
}

export const initialEnrollmentState: EnrollmentState = {
  enrolledCourseIds: [],
};

export const enrollmentReducer = createReducer(
  initialEnrollmentState,
  on(enrollInCourse, (state, { courseId }) =>
    state.enrolledCourseIds.includes(courseId)
      ? state
      : { ...state, enrolledCourseIds: [...state.enrolledCourseIds, courseId] },
  ),
  on(unenrollFromCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter((id) => id !== courseId),
  })),
  on(setEnrolledCourses, (state, { courseIds }) => ({ ...state, enrolledCourseIds: courseIds })),
);
