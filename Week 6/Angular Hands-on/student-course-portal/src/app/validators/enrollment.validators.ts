import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Hands-On 5, Task 2, step 53: synchronous custom validator.
 * Rejects a course code that starts with the disallowed 'XX' prefix.
 */
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (typeof value === 'string' && value.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

/**
 * Hands-On 5, Task 2, step 55: asynchronous custom validator.
 * Simulates an API check — after 800ms, an email containing 'test@' is
 * considered already taken.
 */
export function simulateEmailCheck(
  control: AbstractControl,
): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const value = (control.value ?? '') as string;
      resolve(value.includes('test@') ? { emailTaken: true } : null);
    }, 800);
  });
}
