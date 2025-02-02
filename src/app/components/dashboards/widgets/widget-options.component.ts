import { Component, inject, input, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Widget } from '../../../models/dashboard.model';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-widget-options',
  imports: [MatButtonModule, MatIcon, MatButtonToggleModule],
  template: `
    <button 
      mat-icon-button
      class="close-button" 
      (click)="showOptions.set(false)"
    >
      <mat-icon>close</mat-icon>
    </button>


    <div>
      Width
      
      <mat-button-toggle-group 
        hideSingleSelectionIndicator="true" 
        [value]="data().columns ?? 1"
        (change)="store.updateWidget(data().id, { columns: +$event.value })"
      >
        <mat-button-toggle [value]="1">1</mat-button-toggle>
        <mat-button-toggle [value]="2">2</mat-button-toggle>
        <mat-button-toggle [value]="3">3</mat-button-toggle>
        <mat-button-toggle [value]="4">4</mat-button-toggle>
      </mat-button-toggle-group>
    </div>

    <div>
      Height
      
      <mat-button-toggle-group 
        hideSingleSelectionIndicator="true"
        [value]="data().rows ?? 1"
        (change)="store.updateWidget(data().id, { rows: +$event.value })"

      >
        <mat-button-toggle [value]="1">1</mat-button-toggle>
        <mat-button-toggle [value]="2">2</mat-button-toggle>
        <mat-button-toggle [value]="3">3</mat-button-toggle>
        <mat-button-toggle [value]="4">4</mat-button-toggle>
      </mat-button-toggle-group>
    </div>

    <button 
      mat-icon-button
      class="move-forward-button" 
      (click)="store.moveWidgetToRight(data().id)"
    >
      <mat-icon>chevron_right</mat-icon>
    </button>

    <button 
      mat-icon-button
      class="move-backward-button" 
      (click)="store.moveWidgteToLeft(data().id)"
    >
      <mat-icon>chevron_left</mat-icon>
    </button>

    <button 
      mat-icon-button
      class="remove-widget-button"  
      (click)="store.removeWidget(data().id)"
    >
      <mat-icon>delete</mat-icon>
    </button>

  `,
  styles: `
    :host{
      position: absolute;
      z-index: 2;
      background: var(--mat-sys-surface-container-low); 
      color: var(--mat-sys-on-surface);
      top: 0;
      left: 0;
      border-radius: inherit;
      width: inherit;
      height: inherit;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: border-box;
      border: 0;
      --mat-standard-button-toggle-height: 16px;

      > div {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 8px;
      }
      
    }

    .close-button{
      position: absolute;
      top: 0;
      right: 0;
    }

    .move-forward-button{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -5px;
    }

    .move-backward-button{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -5px;
    }

    .remove-widget-button{
      position: absolute;
      top: 0;
      left: 0;
      color: var(--mat-sys-error); 
    }
  `
})
export class WidgetOptionsComponent {

  showOptions = model<boolean>(false);
  data = input.required<Widget>();

  store = inject(DashboardService);

}
