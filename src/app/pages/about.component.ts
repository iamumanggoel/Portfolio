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
        <!-- <img [src]="authService.user()?.profilePicture" alt="Umang Goel"> -->
        <div class="info">
          <h1>{{ authService.user()?.name }}</h1>
          <h2>{{ authService.user()?.jobTitle }}</h2>
          <p>
            Full-Stack Developer experienced in designing and deploying scalable web applications using
            <strong>ASP.NET Core</strong>, <strong>Angular</strong>, and modern cloud services.
            Skilled in API development, DevOps automation, and secure integrations.
            Proven ability to deliver high-quality solutions in Agile environments.
          </p>
          <div class="social-links">
            <a href="https://linkedin.com/in/umang-goel-3b8447236" target="_blank">
              <mat-icon>linkedin</mat-icon>
            </a>
            <a href="https://github.com/iamumanggoel" target="_blank">
              <mat-icon>code</mat-icon>
            </a>
            <a href="mailto:umg2508@gmail.com">
              <mat-icon>email</mat-icon>
            </a>
          </div>
        </div>
      </div>

      <div class="details">
        <h2>Education 🎓</h2>
        <p>Bachelor of Technology in Computer Science (2019 – 2023)</p>
        <p>Chandigarh Group Of Colleges, Punjab, India — GPA: 8.85 / 10</p>

        <h2>Skills 🛠️</h2>
        <ul>
          <li>Angular (18+), RxJS, TypeScript, Angular Material, Tailwind CSS</li>
          <li>ASP.NET Core, C#</li>
          <li>Cloud: Azure DevOps, Azure App Services</li>
          <li>SQL Server, PostgreSQL</li>
          <li>CI/CD Pipelines, Git, Swagger, Postman</li>
        </ul>

        <h2>Certifications 📜</h2>
        <ul>
          <li>
            <a href="https://learn.microsoft.com/api/credentials/share/en-us/UmangGoel-0500/CFF2E11833709607?sharingId=670FC89B9325ADE2" target="_blank">
              Microsoft Certified: Azure Administrator Associate (AZ-104)
            </a>
          </li>
          <li>
            <a href="https://learn.microsoft.com/api/credentials/share/en-us/UmangGoel-0500/91C63EFEC45E55CD?sharingId=670FC89B9325ADE2" target="_blank">
              Microsoft Certified: DevOps Engineer Expert (AZ-400)
            </a>
          </li>
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
