import { inject, Injectable, signal } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "../environments/environment";
import { HttpService } from "./http.service";
import { Signal } from '@angular/core';
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

type Cache = { data: any; timestamp: number };

@Injectable({
  providedIn: 'root'
})
export class LeetcodeService extends HttpService {

  private userName = 'Umang_Goel';

  private cacheValidity = 5 * 60 * 1000; // 5 mins cache validity time

  private leetcodeStats = signal<any>(null);

  storage = inject(LocalStorageService); 

  protected override get baseUrl() {
    return environment.leetCodeBaseUrl;
  }

  constructor() { super(); }

  getStats(username: string = this.userName): Observable<any> {
    const localValue = this.storage.get<Cache>(username);

    if (localValue && (Date.now() - localValue.timestamp < this.cacheValidity)) {
      this.leetcodeStats.set(localValue.data); 
      return of(localValue.data); 
    }


    if (this.leetcodeStats() === null) {
      return this.get<any>(username).pipe(
        tap(data => {
          this.storage.set<Cache>(username, { data, timestamp: Date.now() });
          this.leetcodeStats.set(data); 
        }),
        catchError(error => {
          console.error('Error fetching LeetCode stats', error);
          this.leetcodeStats.set({});
          return of({}); 
        })
      );
    }

    return of(this.leetcodeStats());
  }

  goToProfile(user_name: string = this.userName): void {
    window.open(`https://leetcode.com/u/${user_name}/`, '_blank');
  }
}
