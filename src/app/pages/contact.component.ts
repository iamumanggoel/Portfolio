import { Component, inject } from '@angular/core';
import { BaseControl, InputControl, TextareaControl, CustomFormComponent } from "../components/custom-form.component";
import { FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section class="contact-wrapper">
      <div class="info-card">
        <h1>Let's Get In Touch</h1>
        <p>Feel free to reach out for collaborations or just a friendly chat.</p>

        <nav class="social-links" aria-label="Contact social links">
          <a href="mailto:umg2508@gmail.com" target="_blank" aria-label="Email" class="icon email">
            <img src="https://img.icons8.com/fluency/48/microsoft-outlook-2019.png" alt="Email icon"/>
          </a>
          <a href="https://wa.me/919599675431?text=Hi%20Umang%2C%20I%20came%20across%20your%20portfolio!" target="_blank" aria-label="WhatsApp" class="icon whatsapp">
            <img src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="WhatsApp icon"/>
          </a>
          <a href="https://linkedin.com/in/umang-goel-3b8447236" target="_blank" aria-label="LinkedIn" class="icon linkedin">
            <img src="https://img.icons8.com/fluency/48/linkedin.png" alt="LinkedIn icon"/>
          </a>
        </nav>
      </div>

      <app-custom-form [controls]="formControls" [form]="form" class="form-card">
        <div form-header>
          <h2>Contact Me</h2>
        </div>

        <div form-actions>
          <button mat-raised-button color="primary" (click)="submitForm()">Submit</button>
        </div>
      </app-custom-form>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: var(--mat-sys-background);
      color: var(--mat-sys-on-background);
      min-height: 80vh;
      padding: 3rem 1rem;
      --mdc-protected-button-container-color: var(--mat-sys-primary);
      --mdc-protected-button-label-text-color: var(--mat-sys-on-primary);
    }

    .contact-wrapper {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      gap: 3rem;
      align-items: flex-start;
      justify-content: center;
      flex-wrap: wrap;
    }

    .info-card {
      flex: 1 1 320px;
      background-color: var(--mat-sys-surface-container-high);
      border-radius: 12px;
      padding: 2.5rem 2rem;
      box-shadow: var(--mat-sys-level3);
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      color: var(--mat-sys-on-surface-variant);
    }

    .info-card h1 {
      margin: 0;
      font-size: 2.75rem;
      font-weight: 700;
      color: var(--mat-sys-primary);
      line-height: 1.1;
    }

    .info-card p {
      font-size: 1.125rem;
      line-height: 1.5;
      color: var(--mat-sys-on-surface-variant);
    }

    .social-links {
      margin-top: 1.5rem;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      justify-content: center;
    }

    .icon {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      //box-shadow: var(--mat-sys-level1);
      // background-color: var(--mat-sys-surface-container);
      cursor: pointer;
      transition: background-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
      text-decoration: none;
      overflow: hidden;
    }

    .icon img {
      width: 28px;
      height: 28px;
      object-fit: contain;
      transition: filter 0.25s ease;
    }

    .icon.email {
      // background-color: #FFF0F0;
    }
    .icon.email:hover {
      background-color: #0077B5;
      box-shadow: 0 6px 14px rgba(212, 70, 56, 0.4);
      transform: translateY(-3px);
    }
   
    .icon.whatsapp {
      // background-color: #E6F4EA;
    }
    .icon.whatsapp:hover {
      background-color: #25D366;
      box-shadow: 0 6px 14px rgba(37, 211, 102, 0.4);
      transform: translateY(-3px);
    }
    
    .icon.linkedin {
      // background-color: #D0E6F9;
    }
    .icon.linkedin:hover {
      background-color: #0077B5;
      box-shadow: 0 6px 14px rgba(0, 119, 181, 0.4);
      transform: translateY(-3px);
    }
    
    /* Form card styling */
    .form-card {
      flex: 1 1 360px;
      max-width: 400px;
      background-color: var(--mat-sys-surface-container);
      border-radius: 12px;
      padding: 2.5rem 2rem;
      box-shadow: var(--mat-sys-level4);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      color: var(--mat-sys-on-surface);
    }

    .form-card h2 {
      margin: 0 0 1rem 0;
      font-weight: 700;
      color: var(--mat-sys-primary);
      font-size: 1.75rem;
    }

    button {
      width: 100%;
      font-weight: 600;
      font-size: 1.1rem;
      padding: 0.85rem 0;
      box-shadow: var(--mat-sys-level2);
      transition: box-shadow 0.3s ease, transform 0.15s ease;
      border-radius: 6px;
    }
    button:hover {
      box-shadow: var(--mat-sys-level5);
      transform: translateY(-2px);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .contact-wrapper {
        flex-direction: column;
        align-items: center;
        gap: 2rem;
      }
      .info-card, .form-card {
        flex: none;
        width: 100%;
        max-width: 450px;
      }
      .info-card h1 {
        font-size: 2rem;
      }
      .form-card h2 {
        font-size: 1.5rem;
      }
      .social-links {
        justify-content: center;
      }
    }
  `],
  imports: [
    CustomFormComponent,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export default class ContactComponent {
  form = new FormGroup({});
  snackBar = inject(MatSnackBar);

  formControls: BaseControl<any>[] = [
    new InputControl('name', '', 'Full Name', [Validators.required], 1),
    new InputControl('email', '', 'Email Address', [Validators.required, Validators.email], 2),
    new TextareaControl('message', '', 'Your Message', [Validators.required, Validators.minLength(10)], 4, 4, 1),
  ];

  submitForm() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);

      const snackBarRef = this.snackBar.open('Message sent successfully!', 'Cancel', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });

      snackBarRef.onAction().subscribe(() => {
        console.log('Send canceled by user.');
      });

-      this.form.reset();
    } else {
      this.snackBar.open('Please fill in the form correctly.', 'Close', {
        duration: 4000
      });
    }
  }
}
