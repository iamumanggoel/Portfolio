import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService, StorageKeys } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  storage = inject(LocalStorageService);
  router = inject(Router);
  
  overlayOpen = signal<boolean>(false);
  recentSearches = signal<string[]>(this.storage.get<string[]>(StorageKeys.RECENT_SEARCHES) ?? []);
  searchTerm = signal<string>("");
  private allPaths: string[] | undefined;
  recommendedRoutes = signal<string[]>([]);


  constructor() { 
    this.allPaths = this.extractPaths(this.router.config)
  }

  search(searchTerm: string, type: 'recommended' | 'recent'){
    
    this.searchTerm.set(searchTerm);
    this.overlayOpen.set(false);
    this.addToRecentSearches(searchTerm);

    // if(type === 'recommended'){
    //   this.router.navigate([searchTerm]);
    // }
    if(this.allPaths && this.allPaths?.length > 0 && this.allPaths?.includes(searchTerm)){
      this.router.navigate([searchTerm]);
      return;
    }
  }

  clearSearch(){
    this.searchTerm.set("");
    this.overlayOpen.set(true);
  }
  addToRecentSearches(searchTerm: string){
    const lowerCaseTerm = searchTerm.toLowerCase();
    this.recentSearches.set([
      lowerCaseTerm,
      ...this.recentSearches().filter(term => term !== lowerCaseTerm)
    ]);
  }

  deleteRecentSearch(searchTerm: string){
    this.recentSearches.set(this.recentSearches().filter(term => term !== searchTerm));
  }

  getFilteredRoutes(enteredSearchTerm: string){
    const searchTerm = enteredSearchTerm.trim();
    if(!searchTerm){
      this.recommendedRoutes.set([]);
      return;
    }

    this.allPaths = this.allPaths ?? this.extractPaths(this.router.config);
    
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    console.log(this.allPaths.filter(path => path.toLowerCase().includes(lowerCaseSearchTerm)));
    this.recommendedRoutes.set(this.allPaths.filter(path => path.toLowerCase().includes(lowerCaseSearchTerm)));
  } 

  private extractPaths(routes: any[]): string[] {
    let paths: string[] = [];
    for (const route of routes) {
      if (route.path) {
        paths.push(route.path);
      }
      if (route.children) {
        paths = paths.concat(this.extractPaths(route.children));
      }
    }
    return paths;
  }

  saveLocalStorage = effect(() => {
    this.storage.set<string[]>(StorageKeys.RECENT_SEARCHES, this.recentSearches());
  });
}
