import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakeComponent {
  formSubmitted = signal(false);

  // FIX: Replaced FormBuilder with direct instantiation of FormGroup and FormControl
  // to resolve a TypeScript error where `this.fb.group` was causing a type error.
  // This approach is functionally equivalent and avoids the injection-related type issue.
  intakeForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    repoLink: new FormControl(''),
    projectGoal: new FormControl('', [Validators.required, Validators.minLength(20)]),
    budget: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.intakeForm.valid) {
      console.log('Form Submitted', this.intakeForm.value);
      this.formSubmitted.set(true);
      // Here you would typically send the data to a server
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      this.intakeForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.intakeForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
