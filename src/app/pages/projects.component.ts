import { CommonModule, SlicePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  languages_url: string;
  updated_at: string;
  languages?: string[];
}


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatButtonModule, MatIcon, SlicePipe, TitleCasePipe],
  template: `
      <h2>GitHub Projects</h2>
    <div class="projects-container">
      @for(project of projects; track project.name){
        <div class="container">
          <h3>{{ project.name | titlecase }}</h3>

          <div class="content">
            <span>
              @if(project.description.length > 50){
                {{ project?.description | slice:0:50 }}...
              }
              @else{
                {{ project?.description }}
              }
            </span>
            <button 
              mat-raised-button 
              (click)="openRepo(project.html_url)">
              <mat-icon>open_in_new</mat-icon>
              View Details
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      // --mdc-protected-button-container-color: var(--mat-sys-primary);
      // --mdc-protected-button-label-text-color: var(--mat-sys-on-primary);
    }
    .projects-container{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      grid-auto-rows: 200px;
      gap: 16px;

      .container{
      position: relative;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      border-radius: 16px;
      overflow: hidden;
      padding: 32px;
      box-shadow: var(--mat-sys-level2);
      background-color: var(--mat-sys-primary);
      color: var(--mat-sys-on-primary);



      > h3 {
        margin: 0 0 16px 0;
      }

      .content{
        height: calc(100% - 100px);
        width: 100%;
        font-size: var(--mat-sys-body-medium-size);
        // color: var(--mat-sys-secondary);
        
        > button {
          position: absolute;
          bottom: 32px;
          left: 32px;
          margin-top: 1rem;
          transition: transform 0.3s ease;
          &:hover {
            transform: scale(1.02);
          }
        }
      }
    }
    }
  `]
})
export default class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  ngOnInit(): void {
    this.fetchGitHubRepos();
  }

  private async fetchGitHubRepos(): Promise<void> {
    try {
      const response = await fetch('https://api.github.com/users/iamumanggoel/repos');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.projects = this.mapProjects(data);
      await this.fetchProjectLanguages();
    } catch (error) {
      console.error('Error fetching GitHub repos', error);
    }
  }

  private mapProjects(data: any[]): Project[] {
    return data.map((project) => ({
      id: project?.id,
      name: project?.name,
      description: project?.description ?? 'No description available.',
      html_url: project?.html_url,
      languages_url: project?.languages_url,
      updated_at: project?.updated_at
    }));
  }

  private async fetchProjectLanguages(): Promise<void> {
    const languageFetchPromises = this.projects.map(async (project) => {
      if (!project.languages_url) return;
      try {
        const res = await fetch(project.languages_url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const languages = await res.json();
        project.languages = Object.keys(languages);
      } catch (error) {
        console.error('Error fetching languages for', project.name, error);
      }
    });

    await Promise.all(languageFetchPromises);
  }

  openRepo(url: string) {
    window.open(url, '_blank');
  }
}
