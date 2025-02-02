import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DashboardService } from '../../services/dashboard.service';
import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-widgets-panel',
  imports: [MatIcon, CdkDrag, CdkDragPlaceholder],
  template: `
    <div class="widgets-list">
      <div class="widgets-panel-header">
        <mat-icon>drag_indicator</mat-icon>
        Widgets
      </div>
      @for(widget of store.widgetsToAdd(); track widget.id){
        <div class="widget-box" cdkDrag [cdkDragData]="widget.id">
          {{ widget.label }}
           <div *cdkDragPlaceholder></div>
        </div>

      }
    </div>
  `,
  styles: `
    :host{
      background-color: var(--mat-sys-primary-container); 
      color: var(--mat-sys-on-primary-container);
      position: absolute;
      right: 0;
      top: 100px;
      width: 200px; //todo: make this a variable
      z-index: 2;
      border-radius: 16px;
    }

    .widgets-list{
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      border-radius: 8px;

      .widgets-panel-header{
        display: flex;
        gap: 8px;
        align-items: center;
        cursor: move;
      }
    }

    .widget-box {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: var(--mat-sys-surface-container);
      color: var(--mat-sys-inverse-surface);
      cursor: pointer;
      padding: 8px 16px 8px 16px;
      font-size: var(--mat-sys-body-small-size);
      transition: background 0.3s ease;

      &:hover {
        background: var(--mat-sys-surface-container-high);
      }
    }
    
    
  
  `
})
export class WidgetsPanelComponent {
  store = inject(DashboardService);
}
