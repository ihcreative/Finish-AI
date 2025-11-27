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
    // Contact Info
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    
    // Diagnostic Questions
    appPurpose: new FormControl('', Validators.required),
    targetAudience: new FormControl('', Validators.required),
    techStack: new FormControl('', Validators.required),
    problemDescription: new FormControl('', Validators.required),
    solutionsTried: new FormControl('', Validators.required),
    repoLink: new FormControl('', Validators.required),
    loomLink: new FormControl(''), // Optional
    timeline: new FormControl(''), // Optional
    successDefinition: new FormControl('', Validators.required),
  });

  submissionStatus = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  private readonly formEndpointUrl = 'https://formspree.io/f/mldzvqyz';

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
      const response = await fetch(this.formEndpointUrl, {
        method: 'POST',
        body: JSON.stringify(this.intakeForm.value),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        this.submissionStatus.set('success');
        this.intakeForm.reset();
      } else {
        throw new Error('Form submission failed');
      }

    } catch (error) {
      console.error('An error occurred during form submission:', error);
      this.submissionStatus.set('error');
    }
  }
}
