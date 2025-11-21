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
  intakeForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    vibeApp: new FormControl('', Validators.required),
    whatsBroken: new FormControl('', Validators.required),
    projectLink: new FormControl('', Validators.required),
    deadline: new FormControl(''),
  });

  submissionStatus = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // !! IMPORTANT !! Replace with your actual Google Apps Script Web App URL from deployment
  private readonly googleAppsScriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL_HERE';

  isInvalid(controlName: string): boolean {
    const control = this.intakeForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  async onSubmit(): Promise<void> {
    if (this.intakeForm.invalid) {
      this.intakeForm.markAllAsTouched();
      return;
    }

    this.submissionStatus.set('submitting');

    try {
      // We must use 'no-cors' mode for a simple client-side POST to a Google Apps Script.
      // This means we cannot read the response body to confirm success from the script,
      // but we can catch network errors. We optimistically assume success if no error is thrown.
      await fetch(this.googleAppsScriptUrl, {
        method: 'POST',
        body: JSON.stringify(this.intakeForm.value),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', 
      });
      
      this.submissionStatus.set('success');
      this.intakeForm.reset();

    } catch (error) {
      console.error('Form submission failed:', error);
      this.submissionStatus.set('error');
    }
  }
}
