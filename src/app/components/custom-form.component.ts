import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import { FieldErrorDirective } from '../directives/field-error.directive';


@Component({
  selector: 'app-custom-form',
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatIconModule,
    FieldErrorDirective,
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  template: `


    <ng-content select="[form-header]"></ng-content>

    <form [formGroup]="form()" class="form-container">
      @for (control of controls(); track control.formControlName) {
        @switch (control.type) {
  
          @case ('input') {
            <mat-form-field>
              <mat-label>{{ control.label }}</mat-label>
              <input matInput [formControlName]="control.formControlName">
              <mat-error appFieldError />
            </mat-form-field>
          }
          
          @case ('select') {
            <mat-form-field>
              <mat-label>{{ control.label }}</mat-label>
              <mat-select [formControlName]="control.formControlName">
                @for (opt of getControlOptions(control); track opt?.key) {
                  <mat-option [value]="opt.key">{{ opt.value }}</mat-option>
                }
              </mat-select>
              <mat-error appFieldError />
            </mat-form-field>
          }
  
          @case ('radio') {
            <mat-radio-group [formControlName]="control.formControlName">
              @for (opt of getControlOptions(control); track opt?.key) {
                <mat-radio-button [value]="opt.key">{{ opt.value }}</mat-radio-button>
              }
            </mat-radio-group>
          }
          
          @case ('checkbox') {
            <mat-checkbox [formControlName]="control.formControlName">
              {{ control.label }}
            </mat-checkbox>
          }
  
          @case ('date') {
            <mat-form-field>
              <mat-label>{{ control.label }}</mat-label>
              <input matInput [matDatepicker]="picker" [formControlName]="control.formControlName">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
              <mat-error appFieldError />
            </mat-form-field>
          }
  
          @case ('toggle') {
            <mat-slide-toggle [formControlName]="control.formControlName">
              {{ control.label }}
            </mat-slide-toggle>
          }
  
          @case ('textarea') {
            <mat-form-field>
              <mat-label>{{ control.label }}</mat-label>
              <textarea matInput [formControlName]="control.formControlName" 
                [cols]="getTextAreaDimension(control, 'cols')" 
                [rows]="getTextAreaDimension(control, 'rows')">
              </textarea>
              <mat-error appFieldError />
            </mat-form-field>
          }
  
          @case ('chips') {
            <mat-form-field>
              <mat-label>{{ control.label }}</mat-label>
              <mat-chip-grid #chipGrid [ariaLabel]="'Enter' + control.label" [formControlName]="control.formControlName">
                @for (chip of getChipList(control); track chip) {
                  <mat-chip-row
                    (removed)="remove(control, chip)"
                  >
                    {{ chip }}
                    <button matChipRemove [attr.aria-label]="'remove ' + chip">
                      <mat-icon>cancel</mat-icon>
                    </button>
                  </mat-chip-row>
                }
              </mat-chip-grid>
              <input placeholder="Add More..." 
              [matChipInputFor]="chipGrid"
              [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
              [matChipInputAddOnBlur]="addOnBlur"
              (matChipInputTokenEnd)="add(control, $event)"
              >
              <mat-error appFieldError />
            </mat-form-field>
          }
        }
      }
    </form>

    <ng-content select="[form-actions]"></ng-content>

  `,
  styles: `
    
    :host{
      display: block;
      width: inherit;
      height: inherit;
    }
    .form-container {
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

      mat-form-field, 
      mat-radio-group, 
      mat-checkbox, 
      mat-slide-toggle {
          width: 100%;
        }
      textarea{
        resize: none;
      }
    }



  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFormComponent implements OnInit {
  
  controls = input<BaseControl<any>[]>([]);
  form = input.required<FormGroup>();
  

  ngOnInit(): void {
    this.createFormControls(this.controls(), this.form());
  }

  private createFormControls(controls: BaseControl<any>[], form: FormGroup): void {
    controls.forEach(control => {
      form.addControl(control.formControlName, new FormControl(control.value, control.validators));
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////
  // Helper Methods
  ////////////////////////////////////////////////////////////////////////////////////



  /* 
    Helper method for a select or radio control
  */
  getControlOptions(control: BaseControl<any>): { key: any; value: any; }[] {
    if(control instanceof SelectControl || control instanceof RadioControl) {
      return control?.options ? control.options : [];
    }
    return [];
  }


  /* 
    Helper method for textarea
  */
  getTextAreaDimension(control: BaseControl<any>, type: 'rows' | 'cols'): number {
    if(control instanceof TextareaControl) {
      return control?.[type] ? control[type] : 1;  
    }
    return 1; 
  }

  /* 
    Helper method for chips
  */

    readonly announcer = inject(LiveAnnouncer);
    readonly addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    getChipList(control: BaseControl<any>): string[] {
      return control?.value ?? [];
    }

    add(control: BaseControl<any>, event: MatChipInputEvent): void {
        const valToAdd = (event.value || '').trim();
        if (valToAdd) {
          control.value.push(valToAdd);
          this.announcer.announce(`Added ${valToAdd}`);
        }
        event.chipInput!.clear();
    }
    
  
    remove(control: BaseControl<any>, optionToRemove: string): void {
        const index = control.value?.findIndex((f: string) => f === optionToRemove) ?? -1; 
        if (index >= 0) {
          control.value = [...control?.value?.slice(0, index) ?? [], ...control?.value?.slice(index + 1) ?? []];
          this.announcer.announce(`Removed ${optionToRemove}`);
        }
    }
    
}


// --------------------------------------------------------------------------------
// 
//                      Abstract Form Controls for Angular 
//                     
// --------------------------------------------------------------------------------

export type ControlType = 'input' | 'select' | 'radio' | 'checkbox' | 'date' | 'toggle' | 'textarea' | 'chips';

export abstract class BaseControl<T> {
  abstract type: ControlType;
  label: string;
  formControlName: string;
  value: T | undefined;
  validators: ValidatorFn[];
  order: number;

  constructor(
    formControlName: string,
    value: T | undefined,
    label: string,
    validators: ValidatorFn[],
    order: number
  ) {
    this.formControlName = formControlName;
    this.label = label;
    this.value = value;
    this.validators = validators;
    this.order = order;
  }
}

export class InputControl<T> extends BaseControl<T> {
  override type: ControlType = 'input';

  constructor(
    formControlName: string,
    value: T | undefined,
    label: string,
    validators: ValidatorFn[],
    order: number
  ) {
    super(formControlName, value, label, validators, order);
  }
}

export class SelectControl<T> extends BaseControl<T> {
  override type: ControlType = 'select';
  options: { key: any; value: any }[];

  constructor(
    formControlName: string,
    value: T | undefined,
    label: string,
    validators: ValidatorFn[],
    order: number,
    options: { key: any; value: any }[] = [] // Default empty array
  ) {
    super(formControlName, value, label, validators, order);
    this.options = options;
  }
}

export class RadioControl<T> extends BaseControl<T> {
  override type: ControlType = 'radio';
  options: { key: any; value: any }[];

  constructor(
    formControlName: string,
    value: T | undefined,
    label: string,
    validators: ValidatorFn[],
    order: number,
    options: { key: any; value: any }[] = []
  ) {
    super(formControlName, value, label, validators, order);
    this.options = options;
  }
}

export class CheckboxControl<T> extends BaseControl<T> {
  override type: ControlType = 'checkbox';

  constructor(
    formControlName: string,
    value: T | undefined,
    label: string,
    validators: ValidatorFn[],
    order: number
  ) {
    super(formControlName, value, label, validators, order);
  }
}

export class DateControl<T> extends BaseControl<T> {
  override type: ControlType = 'date';

  constructor(
    formControlName: string,
    value: T | undefined,
    label: string,
    validators: ValidatorFn[],
    order: number
  ) {
    super(formControlName, value, label, validators, order);
  }
}

export class ToggleControl<T> extends BaseControl<T> {
  override type: ControlType = 'toggle';

  constructor(
    formControlName: string,
    value: T | undefined,
    label: string,
    validators: ValidatorFn[],
    order: number
  ) {
    super(formControlName, value, label, validators, order);
  }
}

export class TextareaControl<T> extends BaseControl<T> {
  override type: ControlType = 'textarea';
  cols: number;
  rows: number;

  constructor(
    formControlName: string,
    value: T | undefined,
    label: string,
    validators: ValidatorFn[],
    order: number,
    rows: number = 1,
    cols: number = 1
  ) {
    super(formControlName, value, label, validators, order);
    this.rows = rows;
    this.cols = cols;
  }
}

export class ChipsControl<T> extends BaseControl<T[]> {
  override type: ControlType = 'chips';
  override value: T[];

  constructor(
    formControlName: string,
    value: T[] = [],
    label: string,
    validators: ValidatorFn[],
    order: number
  ) {
    super(formControlName, value, label, validators, order);
    this.value = value;
  }
}
