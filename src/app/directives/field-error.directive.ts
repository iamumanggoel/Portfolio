import { Directive, ElementRef, inject } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[appFieldError]'
})
export class FieldErrorDirective {
  formField = inject(MatFormField);
  errorElement = inject(ElementRef);
  
  ngAfterViewInit(): void {
    const control = this.formField._formFieldControl.ngControl?.control;

    if(!control) throw new Error('Form field control not found in appFieldError directive');

    control.events.pipe(untilDestroyed(this)).subscribe(() => {
      const showErrors = control.errors && (control.touched || control.dirty);
      if(showErrors) {
        const firstError = Object.entries(control.errors!)[0];
        const errorMessage = this.getErrorMessage(firstError[0], firstError[1]);
        this.errorElement.nativeElement.textContent = errorMessage;
      }
      else {
        this.errorElement.nativeElement.textContent = '';
      }
    });
  }

  private getErrorMessage(errorType: string, errorValue: any): string {
    const errorMessages: { [key: string]: string } = {
      required: 'This field is required',
      pattern: 'This field has an invalid format',
      email: 'This field must be a valid email address',
      min: 'This field must be greater than or equal to {{min}}',
      max: 'This field must be less than or equal to {{max}}',
      minlength: 'This field must be at least {{requiredLength}} characters long',
      maxlength: 'This field must be at most {{requiredLength}} characters long',
      minDate: 'This field must be on or after {{min}}',
      maxDate: 'This field must be on or before {{max}}'
    };

    let errorMessage = errorMessages[errorType] || 'Invalid field';

    for (const key in errorValue) {
      if (errorValue.hasOwnProperty(key)) {
        errorMessage = errorMessage.replace(`{{${key}}}`, errorValue[key]);
      }
    }

    return errorMessage;
  }

}
