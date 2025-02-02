import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Widget } from '../models/dashboard.model';
import { ViewsComponent } from '../components/dashboards/widgets/views.component';
import { LocalStorageService, StorageKeys } from './local-storage.service';
import { LineChartComponent } from '../components/dashboards/widgets/analytics/line-chart.component';
import { PieChartComponent } from '../components/dashboards/widgets/analytics/pie-chart.component';
import { DoughnutChartComponent } from '../components/dashboards/widgets/analytics/doughnut-chart.component';
import { TotalLabelComponent } from '../components/dashboards/widgets/labels/total-label.component';

@Injectable()
export class DashboardService {
  
  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Total Solved',
      content: TotalLabelComponent,
      rows: 1,
      columns: 2,
      backgroundColor: 'var(--mat-sys-surface)',
      color: 'var(--mat-sys-on-surface)'
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
      rows: 1,
      columns: 1,
      backgroundColor: 'var(--mat-sys-surface)',
      color: 'var(--mat-sys-on-surface)'
    },
    {
      id: 3,
      label: 'Questions Solved',
      content: PieChartComponent,
      rows: 2,
      columns: 3,
      backgroundColor: 'var(--mat-sys-surface)',
      color: 'var(--mat-sys-on-surface)'
    },
    {
      id: 4,
      label: 'Acceptance Ratio',
      content: DoughnutChartComponent,
      rows: 2,
      columns: 2,
      backgroundColor: 'var(--mat-sys-surface)',
      color: 'var(--mat-sys-on-surface)'
    },
    {
      id: 5,
      label: 'Submissions',
      content: LineChartComponent,
      rows: 3,
      columns: 3,
      backgroundColor: 'var(--mat-sys-surface)',
      color: 'var(--mat-sys-on-surface)'
    },
  ]);

  addedWidgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Total Solved',
      content: TotalLabelComponent,
      rows: 1,
      columns: 2,
      backgroundColor: 'var(--mat-sys-surface)',
      color: 'var(--mat-sys-on-surface)'
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
      rows: 1,
      columns: 1,
      backgroundColor: 'var(--mat-sys-surface)',
      color: 'var(--mat-sys-on-surface)'
    },
    {
      id: 3,
      label: 'Questions Solved',
      content: PieChartComponent,
      rows: 2,
      columns: 3,
      backgroundColor: 'var(--mat-sys-surface)',
      color: 'var(--mat-sys-on-surface)'
    },
    {
      id: 4,
      label: 'Acceptance Ratio',
      content: DoughnutChartComponent,
      rows: 2,
      columns: 2,
      backgroundColor: 'var(--mat-sys-surface)',
      color: 'var(--mat-sys-on-surface)'
    },
    {
      id: 5,
      label: 'Submissions',
      content: LineChartComponent,
      rows: 3,
      columns: 4,
      backgroundColor: 'var(--mat-sys-surface)',
      color: 'var(--mat-sys-on-surface)'
    },
  ]);


  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map(w => w.id);
    return this.widgets().filter(w => !addedIds.includes(w.id));
  });

  storage = inject(LocalStorageService);
  
  constructor() {
    this.fetchWidgets();
   }

  fetchWidgets(){
    const widgets = this.storage.get<Partial<Widget>[]>(StorageKeys.DASHBOARD_WIDGETS);
    if(widgets){
      widgets.forEach(w => {
        const content = this.widgets().find(c => c.id === w.id)?.content;
        if(content){
          w.content = content;
        }
      });

      this.addedWidgets.set(widgets as Widget[]);
    }
  }

  addWidget(widget: Widget){
    this.addedWidgets.set([...this.addedWidgets(), { ...widget }])
  }

  moveWidgetToRight(id: number){
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index === this.addedWidgets().length - 1){
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index + 1]] = [{ ...newWidgets[index + 1]}, { ...newWidgets[index] }];

    this.addedWidgets.set(newWidgets);
  }

  moveWidgteToLeft(id: number){
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index === 0){
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index - 1]] = [{ ...newWidgets[index - 1]}, { ...newWidgets[index] }];

    this.addedWidgets.set(newWidgets);
  }

  removeWidget(id: number){
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if(index !== -1){
      const newWidgets = [...this.addedWidgets()];
      newWidgets.splice(index, 1);
      this.addedWidgets.set(newWidgets);
    }
  }


  updateWidget(id: number, widget: Partial<Widget>){
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if(index !== -1){
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = { ...newWidgets[index], ...widget };
      this.addedWidgets.set(newWidgets);
    }
  }


  updateWidgetPosition(sourceWidgetId: number, targetWidgetId: number) {
    const sourceIndex = this.addedWidgets().findIndex(w => w.id === sourceWidgetId);

    if (sourceIndex === -1) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    const sourceWidget = newWidgets.splice(sourceIndex, 1)[0];

    const targetIndex = newWidgets.findIndex(w => w.id === targetWidgetId);
    
    if (targetIndex === -1) {
      return;
    }

    const insertAt = targetIndex === sourceIndex ? targetIndex + 1 : targetIndex;
    newWidgets.splice(insertAt, 0, sourceWidget);
    this.addedWidgets.set(newWidgets);
  }

  insertWidgetAtPosition(sourceWidgetId: number, destWidgetId: number) {
    const widgetToAdd = this.widgetsToAdd().find(w => w.id === sourceWidgetId);
    if(!widgetToAdd){
      return;
    }

    const destWidgetIndex = this.addedWidgets().findIndex(w => w.id === destWidgetId);
    const positionToAdd = destWidgetIndex === -1 ? this.addedWidgets().length : destWidgetIndex;

    const newWidgets = [...this.addedWidgets()];
    newWidgets.splice(positionToAdd, 0, widgetToAdd);
    this.addedWidgets.set(newWidgets);
  }

  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(w => ({ ...w  }));
    widgetsWithoutContent.forEach(w => {
      delete w.content;
    });
    this.storage.set<Partial<Widget>[]>(StorageKeys.DASHBOARD_WIDGETS, widgetsWithoutContent);
  });
}


type Cache = { data: any; timestamp: number };


@Injectable({
  providedIn: 'root'
})
export class LeetcodeService {

  private leetcodeStatsbaseUrl = 'https://leetcode-stats-api.herokuapp.com/';
  private userName = 'Umang_Goel';

  private cacheValidity = 5 * 60 * 1000; // 5mins local variable validity time

  storage = inject(LocalStorageService); 

  constructor() {}

  async getStats(username: string = this.userName): Promise<any> {
    const url = `${this.leetcodeStatsbaseUrl}${username}`;

    const localValue = this.storage.get<Cache>(username);
    if (localValue && (Date.now() - localValue.timestamp < this.cacheValidity)) {
      return localValue.data;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch LeetCode stats: ${response.statusText}`);
      }
      const data = await response.json();
      this.storage.set<Cache>(username, {data, timestamp: Date.now()});

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  goToProfile(user_name: string = this.userName): void {
    window.open(`https://leetcode.com/u/${user_name}/`, '_blank'); 
  }
}
