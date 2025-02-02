import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-views',
  imports: [MatIcon],
  template: `
      <mat-icon>engineering</mat-icon>
      <div>Under Construction</div>
  
  `,
  styles: `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1vh;
      color: var(--mat-sys-error);
    }
    
  `
})
export class ViewsComponent {

}
