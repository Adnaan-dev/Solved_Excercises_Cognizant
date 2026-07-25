// Hands-On 6, Task 1, step 59: shared Course data model.
export type GradeStatus = 'passed' | 'failed' | 'pending';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: GradeStatus;
}
