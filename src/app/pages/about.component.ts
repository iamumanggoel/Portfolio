import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="about-container">
      <div class="profile">
        <img [src]="authService.user()?.profilePicture" alt="Umang Goel"> 
        <div class="info">
          <h1>{{ authService.user()?.name }}</h1>
          <h2> {{ authService.user()?.jobTitle }}</h2>
          <p>
            Passionate about building modern web applications using 
            <strong>Angular, ASP.NET Core</strong>, and cloud technologies.
            I love solving complex problems and continuously improving my skills.
          </p>
          <div class="social-links">
            <a href="https://linkedin.com/in/yourprofile" target="_blank">
              <mat-icon>linkedin</mat-icon>
            </a>
            <a href="https://github.com/yourprofile" target="_blank">
              <mat-icon>code</mat-icon>
            </a>
            <a href="mailto:your@email.com">
              <mat-icon>email</mat-icon>
            </a>
          </div>
        </div>
      </div>

      <div class="details">
        <h2>Education 🎓</h2>
        <p>Bachelor of Technology in Computer Science</p>
        <p>Chandigarh Group Of Colleges, Jhanjeri, India</p>

        <h2>Skills 🛠️</h2>
        <ul>
          <li>Angular, RxJS, TypeScript</li>
          <li>ASP.NET Core, C#</li>
          <li>Cloud: Azure & AWS</li>
          <li>SQL & NoSQL Databases</li>
          <li>Docker & CI/CD Pipelines</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 70rem;
      width: 100%;
      padding: 2.5rem;
      background-color: var(--mat-sys-surface-container);
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 1rem;
      box-shadow: var(--mat-sys-level5);
      margin: auto;

      .profile {
        display: flex;
        align-items: center;
        gap: 20px;

        img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid var(--mat-sys-primary);
        }

        .info {
          h1 {
            margin: 0;
            font-size: 24px;
            color: var(--mat-sys-primary);
          }

          h2 {
            margin: 4px 0;
            font-size: 18px;
            color: var(--mat-sys-on-surface-variant);
          }

          .social-links {
            margin-top: 8px;

            a {
              margin-right: 10px;
              color: var(--mat-sys-primary);
              font-size: 24px;
              transition: 0.3s;

              &:hover {
                color: var(--mat-sys-primary-fixed-variant);
              }
            }
          }
        }
      }

      .details {
        margin-top: 20px;

        h2 {
          color: var(--mat-sys-on-surface);
          margin-top: 20px;
          font-size: 20px;
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 5px;
          }
        }
      }
    }
  `]
})
export default class AboutComponent {
  authService = inject(AuthService);
}
