import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakeComponent {
  private fb = inject(FormBuilder);
  formSubmitted = signal(false);

  intakeForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    repoLink: [''],
    projectGoal: ['', [Validators.required, Validators.minLength(20)]],
    budget: ['', Validators.required],
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