import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  template: `
    <div class="skills-container">
      <h1>My Skills</h1>
      <ul>
        <li>Angular</li>
        <li>ASP.NET Core</li>
        <li>JavaScript</li>
        <li>TypeScript</li>
        <li>HTML & CSS</li>
        <li>Azure Cloud</li>
        <li>DevOps</li>
      </ul>
    </div>
  `,
  styles: [`
    .skills-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #333;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      padding: 5px 0;
    }
  `]
})
export default class SkillsComponent {}