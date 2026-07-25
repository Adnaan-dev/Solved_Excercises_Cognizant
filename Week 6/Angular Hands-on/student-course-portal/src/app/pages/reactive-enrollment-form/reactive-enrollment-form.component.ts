import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noCourseCode, simulateEmailCheck } from '../../validators/enrollment.validators';
import { CanComponentDeactivate } from '../../guards/unsaved-changes.guard';

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: './reactive-enrollment-form.component.css',
})
export class ReactiveEnrollmentFormComponent implements OnInit, CanComponentDeactivate {
  private fb = inject(FormBuilder);

  enrollForm!: FormGroup;
  submittedValue: unknown = null;

  // Hands-On 7, Task 2, step 77: the CanDeactivate guard calls this. Safe to
  // leave only when the form is not dirty (or after a successful submit).
  canDeactivate(): boolean {
    return !this.enrollForm?.dirty || this.submittedValue !== null;
  }

  ngOnInit(): void {
    // Hands-On 5, Task 1, step 49: build the reactive form model in TypeScript
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      // async validator passed as the third argument (Hands-On 5, Task 2, step 55)
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      // courseId doubles as a course code here so the noCourseCode rule applies
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
  }

  /*
   * Hands-On 5, Task 2, step 57: typed getter for the FormArray. Better than
   * casting `$any(...)` in the template because the cast lives in one place, is
   * type-checked, and the template stays clean and readable.
   */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    // Hands-On 5, Task 1, step 52:
    //  - enrollForm.value       excludes DISABLED controls
    //  - enrollForm.getRawValue() includes ALL controls (even disabled)
    console.log('value:', this.enrollForm.value);
    console.log('getRawValue:', this.enrollForm.getRawValue());
    this.submittedValue = this.enrollForm.getRawValue();
  }
}
