import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.css',
})
export class EnrollmentFormComponent {
  // Hands-On 4: template-driven form model (bound via ngModel in the template)
  model = {
    studentName: '',
    studentEmail: '',
    courseId: null as number | null,
    preferredSemester: 'Odd',
    agreeToTerms: false,
  };

  submitted = false;

  // Hands-On 4, Task 1, step 40: log the form value + validity on submit
  onSubmit(form: NgForm): void {
    console.log('Form value:', form.value);
    console.log('Form valid:', form.valid);
    if (form.valid) {
      this.submitted = true;
    }
  }

  onReset(form: NgForm): void {
    this.submitted = false;
    // Hands-On 4, Task 2, step 47: clear values AND validation states
    form.resetForm({ preferredSemester: 'Odd', agreeToTerms: false });
  }
}
