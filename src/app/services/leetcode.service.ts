import { inject, Injectable, signal } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "../environments/environment";
import { HttpService } from "./http.service";

type Cache = { data: any; timestamp: number };

@Injectable({
  providedIn: 'root'
})
export class LeetcodeService extends HttpService {

  private userName = 'Umang_Goel';

  private cacheValidity = 1000 * 60 * 60 * 24 * 7; // 1 week TODO: find another way to fetch leetcode data 

  leetcodeStats = signal<any>(null);

  storage = inject(LocalStorageService); 

  protected override get baseUrl() {
    return environment.leetCodeBaseUrl;
  }

  constructor() { 
    super();
   }

  fetchStats(username: string = this.userName) {
    const localValue = this.storage.get<Cache>(username);

    if (localValue && (Date.now() - localValue.timestamp < this.cacheValidity)) {
      this.leetcodeStats.set(localValue.data); 
    }


    if (this.leetcodeStats() === null) {
      this.get<any>(username).subscribe({
        next: (data) => {
          this.storage.set<Cache>(username, { data, timestamp: Date.now() });
          this.leetcodeStats.set(data); 
        },
        error: (error) => {
          console.error('Error fetching LeetCode stats', error);
          this.leetcodeStats.set({});
        }
      });
    }
    

  }

  goToProfile(user_name: string = this.userName): void {
    window.open(`https://leetcode.com/u/${user_name}/`, '_blank');
  }
}
