import { Component } from '@angular/core';
import { BaseControl, CheckboxControl, ChipsControl, CustomFormComponent, DateControl, InputControl, RadioControl, SelectControl, TextareaControl, ToggleControl } from "../components/custom-form.component";
import { FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <app-custom-form [controls]="formControls" [form]="form">
        <div form-header>
        <h2>Personal Information</h2>
        <p>Please fill out the form below.</p>
      </div>

      <!-- Custom Actions (Buttons) -->
      <div class="actions" form-actions>
        <button mat-button color="warn" (click)="resetForm()">Reset</button>
        <button mat-raised-button color="primary" (click)="submitForm()">Submit</button>
      </div>
    </app-custom-form>
`,
  styles: [`
    app-custom-form{
      max-width: 30rem;
      .actions{
        --mdc-protected-button-container-color: var(--mat-sys-primary);
        --mdc-protected-button-label-text-color: var(--mat-sys-on-primary);
        display: flex;
        justify-content: flex-end;
      }
    }
    `],
  imports: [
    CustomFormComponent,
    MatButtonModule,
  ]
})
export default class ContactComponent {


  form = new FormGroup({});
  formControls: BaseControl<any>[] = [
    new InputControl('name', '', 'Full Name', [Validators.required], 1),
    new InputControl('email', '', 'Email Address', [Validators.required, Validators.email], 2),
    new InputControl('subject', '', 'Subject', [Validators.required], 3),
    new TextareaControl('message', '', 'Your Message', [Validators.required, Validators.minLength(10)], 4, 3, 1),
  ];

  submitForm() {
    console.log('Form Submitted:', this.form.value);
    if (this.form.valid) {
    }
  }

  resetForm() {
    this.form.reset();
  }
  
   
}