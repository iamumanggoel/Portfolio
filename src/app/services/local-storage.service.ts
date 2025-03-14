import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export enum StorageKeys {
  RECENT_SEARCHES = 'recentSearches',
  THEME = 'theme',
  DASHBOARD_WIDGETS = 'dashboardWidgets'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  private platformId = inject(PLATFORM_ID);


  set<T>(key: StorageKeys | string, value: T): void{
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

 get<T>(key: StorageKeys | string): T | null {
  if(isPlatformBrowser(this.platformId)){
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }
  return null;
 }


  clearItem(key: StorageKeys){
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem(key);
    }
  }

  clearAll(){
    if(isPlatformBrowser(this.platformId)){
      localStorage.clear();
    }
  }
}
