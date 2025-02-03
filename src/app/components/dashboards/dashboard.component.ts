import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { WidgetComponent } from "./widgets/widget.component";
import { DashboardService } from '../../services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { wrapGrid } from 'animate-css-grid';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { WidgetsPanelComponent } from './widgets-panel.component';
import { LeetcodeService } from '../../services/leetcode.service';
@Component({
  selector: 'app-dashboard',
  imports: 
  [
    WidgetComponent, 
    MatButtonModule,
    MatIcon, 
    MatMenuModule, 
    CdkDropList, 
    CdkDropListGroup,
    WidgetsPanelComponent,
    CdkDrag,
  ],
  providers: [DashboardService],
  template: `
    <div cdkDropListGroup>
      <div class="header">
        <h2>Leetcode Dashboard</h2>
        <div>
          <button class="leetcode-button" mat-raised-button (click)="leetcodeService.goToProfile()">
            <mat-icon>account_circle</mat-icon>
            Go to Leetcode
          </button>
          <button mat-raised-button (click)="widgetsOpen.set(!widgetsOpen())">
            @if(widgetsOpen()){
              <mat-icon>close</mat-icon>
            }
            @else{
              <mat-icon>add_circle</mat-icon>
            }
            Widgets
          </button>
          @if(widgetsOpen()){
            <app-widgets-panel 
              cdkDropList 
              (cdkDropListDropped)="widgetPutBack($event)" 
              cdkDrag
            />
          }
        </div>

      </div>
      <div #dashboard class="dashboard-widgets"> 
        @for (widget of store.addedWidgets(); track widget.id){
          <app-widget 
            [data]="widget" 
            cdkDropList 
            (cdkDropListDropped)="drop($event)" 
            [cdkDropListData]="widget.id"  
          />
        }
          <div cdkDropList></div>
      </div>
    </div>
  `,
  styles: `
    .dashboard-widgets{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      grid-auto-rows: 150px;
      gap: 16px;
    }

    .header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      --mdc-protected-button-container-color: var(--mat-sys-primary);
      --mdc-protected-button-label-text-color: var(--mat-sys-on-primary);

      .leetcode-button{
        margin-right: 0.5rem;
        cursor: pointer;
      }
    }
  `
})
export default class DashboardComponent {

  store = inject(DashboardService);
  leetcodeService = inject(LeetcodeService);

  dashboard = viewChild.required<ElementRef>('dashboard');
  widgetsOpen = signal<boolean>(false);

  ngOnInit(): void {
    wrapGrid(this.dashboard().nativeElement, { duration: 500 }); 
    
  }

  drop(event: CdkDragDrop<number, any>){
    const { previousContainer, container, item: { data } } = event;

    if(data){
      this.store.insertWidgetAtPosition(data, container.data);
      return;
    }
    this.store.updateWidgetPosition(previousContainer.data, container.data);

  }

  widgetPutBack(event: CdkDragDrop<number, any>){
    const { previousContainer } = event;
    this.store.removeWidget(previousContainer.data);
    
  }


  
}
