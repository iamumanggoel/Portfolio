import { Component, ElementRef, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { LeetcodeService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  template: `
    <div class="chart-container">
      <canvas #chart></canvas>
    </div>
  `,
  styles: `
    .chart-container {
      height: calc(100% - 10px);
      width: 100%;
    }
  `,
})
export class PieChartComponent implements OnInit, OnDestroy {
  chart = viewChild.required<ElementRef>('chart');

  private leetcodeService = inject(LeetcodeService);

  private chartInstance: Chart | null = null;

  ngOnInit(): void {
    this.initializeChart([0, 0, 0]); 
    this.fetchStats();
  }

  private initializeChart(data: number[]): void {
    // const colors = [
    //   this.themeService.getCssVariable('--mat-sys-primary'),
    //   this.themeService.getCssVariable('--mat-sys-secondary'),
    //   this.themeService.getCssVariable('--mat-sys-tertiary'),
    // ];
    const colors = ['#1976d2', '#42a5f5', '#90caf9'];

    this.chartInstance = new Chart(this.chart().nativeElement, {
      type: 'pie',
      data: {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [
          {
            data,
            backgroundColor: colors,
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

  fetchStats(): void {
    this.leetcodeService
      .getStats()
      .then((response) => {
        if (response) {
          const easySolved = response?.easySolved ?? 0;
          const mediumSolved = response?.mediumSolved ?? 0;
          const hardSolved = response?.hardSolved ?? 0;

          const data = [easySolved, mediumSolved, hardSolved];

          if (this.chartInstance) {
            this.chartInstance.data.datasets[0].data = data;
            this.chartInstance.update();
          }
        }
      })
      .catch((error) => {
        console.error('Failed to fetch stats:', error);
      });
  }

  
  ngOnDestroy(): void {
    this.chart()?.nativeElement?.remove();
  }
}
