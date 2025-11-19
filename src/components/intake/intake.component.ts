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

  intakeForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    whatsBroken: new FormControl('', Validators.required),
    projectLink: new FormControl(''),
    deadline: new FormControl(''),
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
