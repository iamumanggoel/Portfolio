import { Component, ElementRef, viewChild, inject, effect, PLATFORM_ID } from '@angular/core';
import Chart from 'chart.js/auto';
import { ThemeService } from '../../../../services/theme.service';
import { LeetcodeService } from '../../../../services/leetcode.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-doughnut-chart',
  template: `
    <div class="chart-container">
      <canvas #chart></canvas>
    </div>
  `,
  styles: [
    `
      .chart-container {
      height: calc(100% - 10px);
      width: 100%;
    }
    `,
  ],
})
export class DoughnutChartComponent {
  private platformId = inject(PLATFORM_ID);
  chart = viewChild.required<ElementRef>('chart');

  leetcodeService = inject(LeetcodeService);
  themeService = inject(ThemeService);

  effect = effect(() => {
    const response = this.leetcodeService.leetcodeStats();
    if (response && isPlatformBrowser(this.platformId)) {
      const { acceptanceRate } = response;
        const acceptedPercentage = acceptanceRate ?? 90;
        const rejectedPercentage = 100 - acceptanceRate;

        new Chart(this.chart().nativeElement, {
          type: 'doughnut',
          data: {
            labels: ['Accepted', 'Rejected'],
            datasets: [
              {
                data: [acceptedPercentage, rejectedPercentage],
                backgroundColor: ['#ffc107', '#ff9800'], 
                borderWidth: 0,
                hoverOffset: 4,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
          },
        });

    }
  });

}
