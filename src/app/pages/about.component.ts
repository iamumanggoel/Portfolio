import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="about-container">
      <h1>About Me</h1>
      <p>
        I am a passionate Full Stack Developer with experience in building web applications using technologies like Angular, ASP.NET Core, and cloud services. I enjoy solving complex problems and continuously learning new skills.
      </p>
      <h2>Education</h2>
      <p>
        Bachelor of Technology in Computer Science from Chandigarh Group Of Colleges, Jhanjeri, India.
      </p>
    </div>
  `,
  styles: [`
    .about-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #333;
    }
    h2 {
      color: #555;
    }
  `]
})
export default class AboutComponent {}