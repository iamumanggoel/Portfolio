import { Injectable } from '@angular/core';

interface Project {
  name: string;
  description: string;
  html_url: string;
  languages_url?: string;
  updated_at: string;
  languages?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com/';

  constructor() {}

  fetchGitHubRepos(user_name: string = 'iamumanggoel'): Promise<Project[]> {
    return fetch(`${this.apiUrl}users/${user_name}/repos`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => this.mapProjects(data))
      .catch(error => {
        console.error('Error fetching GitHub repos', error);
        return [];
      });
  }

  private mapProjects(data: any[]): Project[] {
    return data.map((project) => ({
      name: project?.name,
      description: project?.description ?? 'No description available.',
      html_url: project?.html_url,
      languages_url: project?.languages_url,
      updated_at: project?.updated_at
    }));
  }

  fetchProjectLanguages(projects: Project[]): Promise<Project[]> {
    const languageFetchPromises = projects.map((project) => {
      if (!project.languages_url) return Promise.resolve(project);
      return fetch(project.languages_url)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(languages => {
          project.languages = Object.keys(languages);
          return project;
        })
        .catch(error => {
          console.error('Error fetching languages for', project.name, error);
          return project; 
        });
    });

    return Promise.all(languageFetchPromises);
  }
}