import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { LeetcodeService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-subscribers',
  imports: [MatIcon],
  template: `
    <div class="subscriber-container">
      <h1> {{ totalSolved }} </h1>  
      <mat-icon class="icon">arrow_circle_up</mat-icon>
    </div>

    <div class="stat-subtext">
        <p class="icon">+10%</p> 
        <span> in the last 28 days </span>
    </div>

    
  `,  
  styles: `
    :host {
       h1{
        margin: 0;
      }
      span {
        font-size: var(--mat-sys-body-medium-size);
      }
    }


    .subscriber-container, .stat-subtext {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1vh;
    }

    .stat-subtext{
      color: var(--mat-sys-secondary);
    }
  
    .icon {
      color: #388e3c;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }

  `
})
export class TotalLabelComponent {

  public totalSolved = 0;
  fontSize: string | null = null;
  leetcodeService = inject(LeetcodeService);

    ngOnInit(): void {
      this.loadChart();
    }
  
    async loadChart(): Promise<void> {
      try {
        const response = await this.leetcodeService.getStats('Umang_Goel');
        const { totalSolved } = response;
        this.totalSolved = totalSolved;
  
       
        
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }

}