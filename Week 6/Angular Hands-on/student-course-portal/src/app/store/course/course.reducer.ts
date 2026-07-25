import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { loadCourses, loadCoursesSuccess, loadCoursesFailure } from './course.actions';

// Hands-On 9, Task 1, step 94: course feature state + reducer.
export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

export const courseReducer = createReducer(
  initialCourseState,
  // reducers are PURE functions returning a NEW state object (immutable update)
  on(loadCourses, (state) => ({ ...state, loading: true, error: null })),
  on(loadCoursesSuccess, (state, { courses }) => ({ ...state, loading: false, courses })),
  on(loadCoursesFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
