import { Injectable, computed, effect, inject, signal, PLATFORM_ID} from '@angular/core';
import { AppTheme, ThemeType, Theme } from '../models/theme.model';
import { LocalStorageService, StorageKeys } from './local-storage.service';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

    private platformId = inject(PLATFORM_ID);

  themes: AppTheme[] = [
    { name: Theme.Light, icon: 'light_mode' },
    { name: Theme.Dark, icon: 'dark_mode' },
    { name: Theme.System, icon: 'desktop_windows' },
  ];
  
  storage = inject(LocalStorageService);
  appTheme = signal<{ name: ThemeType}>(this.storage.get<{ name: ThemeType}>(StorageKeys.THEME) ?? {name: Theme.System});  

  selectedTheme = computed(() => {
    return this.themes.find(theme => theme.name === this.appTheme()?.name);
  });

  constructor() { }

  getThemes(){
    return this.themes;
  }

  setTheme(theme: ThemeType){
    this.appTheme.set({name: theme});
  }

  applyNextTheme() {
    const currentIndex = this.themes.findIndex(theme => theme.name === this.selectedTheme()?.name);
    const nextIndex = (currentIndex + 1) % this.themes.length; 
    const nextTheme = this.themes[nextIndex];
  
    this.setTheme(nextTheme.name); 
  }

  getCssVariable(variable: string): string {
    if (isPlatformBrowser(this.platformId)) {
      return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    }
    return '';
  }

  saveLocalStorage = effect(() => {
    this.storage.set<{name: ThemeType}>(StorageKeys.THEME, this.appTheme());
  });
  
  addThemeClass = effect(() => {

    if (isPlatformBrowser(this.platformId)) {
      const currentTheme = this.appTheme()?.name;
      
      document.body.classList.remove(Theme.Dark, Theme.Light);
  
      switch (currentTheme) {
        case Theme.System:
          document.body.style.colorScheme = `${Theme.Light} ${Theme.Dark}`; 
          const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
          if (prefersDarkScheme) {
            document.body.classList.add(Theme.Dark);
          } else {
            document.body.classList.add(Theme.Light);
          }
          break;
  
        case Theme.Dark:
          document.body.style.colorScheme = Theme.Dark;  
  
          document.body.classList.add(Theme.Dark);
          break;
  
        case Theme.Light:
          document.body.style.colorScheme = Theme.Light; 
  
          document.body.classList.add(Theme.Light);
          break;
  
        default:
          console.warn('Unexpected theme value:', currentTheme);
          break;
      }
    }
  })
}
