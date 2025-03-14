import { Component } from '@angular/core';
import { BaseControl, InputControl, TextareaControl, CustomFormComponent } from "../components/custom-form.component";
import { FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="contact-container">
      <div class="contact-info">
        <h1>Let's Get In Touch.</h1>
        <p>Feel free to reach out for collaborations or just a friendly chat.</p>
        <div class="email-box">
          <mat-icon>email</mat-icon>
          <a href="mailto:umg2508@gmail.com" class="email-link">umg2508&#64;gmail.com</a>
        </div>
      </div>
      
      <app-custom-form [controls]="formControls" [form]="form">
        <div form-header>
          <h2>Contact Me</h2>
        </div>
  
        <div form-actions>
          <button mat-raised-button color="primary" (click)="submitForm()">Submit</button>
        </div>
      </app-custom-form>
    </div>
  `,
  styles: [`
    :host{
      --mdc-protected-button-container-color: var(--mat-sys-primary);
      --mdc-protected-button-label-text-color: var(--mat-sys-on-primary);
    }
    .contact-container {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      background-color: var(--mat-sys-background);
      .contact-info {
        max-width: 30rem;
        padding: 1rem;
        h1 {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        p {
          font-size: 1rem;
          margin: 0;
        }
        .email-box {
          all: unset;
          padding: 6px;
          background-color: var(--mat-sys-surface-container);
          border: 1px solid var(--mat-sys-outline-variant);
          border-radius: 8px;
          display: flex;
          gap: 1rem;
          align-items: center;
          .email-link {
            text-decoration: none;
          }
        }
      }
    }

    @media (max-width: 768px) { 
      .contact-container {
        flex-direction: column;
        text-align: center; 
      }
    }

    @media (width >= 768px) {
      .contact-info{
        align-self: self-start;
      }
    }

    app-custom-form {
      max-width: 25rem;
      width: 100%;
      padding: 2.5rem;
      background-color: var(--mat-sys-surface-container);
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 1rem;
      box-shadow: var(--mat-sys-level5);
      margin: auto;
    }

    button {
      width: 100%;
    }
  `],
  imports: [
    CustomFormComponent,
    MatButtonModule,
    MatIconModule
  ]
})
export default class ContactComponent {
  form = new FormGroup({});
  
  formControls: BaseControl<any>[] = [
    new InputControl('name', '', 'Full Name', [Validators.required], 1),
    new InputControl('email', '', 'Email Address', [Validators.required, Validators.email], 2),
    new TextareaControl('message', '', 'Your Message', [Validators.required, Validators.minLength(10)], 4, 4, 1),
  ];

  submitForm() {
    console.log('Form Submitted:', this.form.value);
    if (this.form.valid) {
      // Handle form submission (e.g., send email)
    }
  }
}
