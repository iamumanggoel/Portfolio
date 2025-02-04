import { Component, effect, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { LeetcodeService } from '../../../../services/leetcode.service';

@Component({
  selector: 'app-subscribers',
  imports: [MatIcon],
  template: `
    <div class="subscriber-container">
      <h1> {{ leetcodeService.leetcodeStats()?.totalSolved ?? 0 }} </h1>  
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
  leetcodeService = inject(LeetcodeService);  
}

