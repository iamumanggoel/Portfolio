import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { Project } from '../models/github.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService extends HttpService {

  protected override get baseUrl() {
    return environment.githubBaseUrl;
  }

  constructor() { super(); }

  fetchGitHubRepos(user_name: string = 'iamumanggoel'): Observable<Project[]> {

    return this.get<Project[]>(`users/${user_name}/repos`).pipe(
      map(data => {
        return data.map((project) => ({
          name: project?.name,
          description: project?.description ?? 'No description available.',
          html_url: project?.html_url,
          languages_url: project?.languages_url,
          updated_at: project?.updated_at
        }));
      }),
      catchError((error) => {
        console.error('Error fetching GitHub repos:', error);
        return of([]);
      })
    );
  }

  fetchProjectLanguages(repo_name: string, user_name: string = 'iamumanggoel'): Observable<{ [key: string]: number }> { 
    return this.get(`repos/${user_name}/${repo_name}/languages`);
  }
}