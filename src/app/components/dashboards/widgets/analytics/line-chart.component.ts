import { Component, ElementRef, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import Chart from 'chart.js/auto'
import { ThemeService } from '../../../../services/theme.service';
import { RouterModule } from '@angular/router';
import { LeetcodeService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-analytics',
  imports: [MatButtonModule, RouterModule],
  template: `
    <div class="chart-container">
      <canvas #chart></canvas>
    </div>

    <!-- <button mat-raised-button (click)="goToProfile()">
        Go to Profile
    </button> -->

  `,
  styles: `


  .chart-container{
    height: calc(100% - 10px);
    width: 100%;
  }
  
  `
})
export class LineChartComponent implements OnInit, OnDestroy {
  
  chart = viewChild.required<ElementRef>('chart');
  private themeService = inject(ThemeService);
  private leetcodeService = inject(LeetcodeService);
  
  private chartInstance: Chart | null = null;
  
  ngOnInit(): void {
    this.initializeChart([], []); 
    this.fetchStats();
  }

  private initializeChart(labels: string[], data: number[]): void {
    // const primaryColor = this.themeService.getCssVariable('--mat-sys-primary-dark');
    const gridColor = this.themeService.getCssVariable('--mat-sys-outline-variant');
    
    this.chartInstance = new Chart(this.chart().nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Submissions',
            backgroundColor: '#ab47bc',
            borderWidth: 0,
            data,
            fill: 'start',
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
        scales: {
          x: {
            grid: { color: gridColor },
          },
          y: {
            grid: { color: gridColor },
          },
        },
        elements: {
          line: { tension: 0.4 },
        }
      },
    });
  }
  
  fetchStats(): void {
    this.leetcodeService
    .getStats()
    .then((response) => {
      if (response?.submissionCalendar) {
        const labels = Object.keys(response.submissionCalendar).map((timestamp) =>
          new Date(parseInt(timestamp) * 1000).toLocaleDateString()
      );
      const data = Object.values(response.submissionCalendar) as number[];
      
      if (this.chartInstance) {
        this.chartInstance.data.labels = labels;
        this.chartInstance.data.datasets[0].data = data;
        this.chartInstance.update();
      }
    }
  })
  .catch((error) => {
    console.error('Failed to fetch stats:', error);
    if (this.chartInstance) {
      this.chartInstance.data.labels = ['Error'];
      this.chartInstance.data.datasets[0].data = [0]; 
      this.chartInstance.update();
    }
  });
}


  
  ngOnDestroy(): void {
    this.chart()?.nativeElement?.remove();
  }
}
