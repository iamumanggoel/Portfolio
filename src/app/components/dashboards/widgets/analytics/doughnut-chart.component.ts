import { Component, ElementRef, OnInit, viewChild, inject, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { ThemeService } from '../../../../services/theme.service';
import { LeetcodeService } from '../../../../services/leetcode.service';

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
export class DoughnutChartComponent implements OnInit, OnDestroy {
  chart = viewChild.required<ElementRef>('chart');

  leetcodeService = inject(LeetcodeService);
  themeService = inject(ThemeService);

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart() {

    this.leetcodeService.getStats().subscribe({
      next: (response) => {
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
      },
      error: (error) => {
        console.error('Error fetching stats:', error);
      },
    });
      
  }

  ngOnDestroy(): void {
    this.chart()?.nativeElement?.remove();
  }
}
