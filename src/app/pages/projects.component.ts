import { SlicePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { GithubService } from '../services/github.service';
import { Project } from '../models/github.model';


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
  
  projects: Project[] | undefined;
  githubService = inject(GithubService);

  ngOnInit(): void {
    this.fetchGitHubRepos();
  }

  private fetchGitHubRepos() {
    this.githubService.fetchGitHubRepos().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.projects.forEach(project => {
          this.githubService.fetchProjectLanguages(project.name).subscribe({
            next: (response) => {
              project.languages = Object.keys(response);
            },
            error: (error) => console.error("Error fetching languages", error)
          });
        });
        console.log(projects);
      },
      error: (error) => {
        console.error('Error fetching GitHub repos:', error);
      }
    });
    
  }

  openRepo(url: string) {
    window.open(url, '_blank');
  }
}
