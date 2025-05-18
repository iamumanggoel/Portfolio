import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatIconModule, PdfViewerModule],
  template: `
    <div id="outerContainer">
  <div class="pdf-container">
    <pdf-viewer
      [src]="'pdf/Resume2025.pdf'"
      [rotation]="0"
      [original-size]="false"
      [show-all]="true"
      [fit-to-page]="false"
      [zoom]="1"
      [zoom-scale]="'page-width'"
      [stick-to-page]="false"
      [render-text]="true"
      [external-link-target]="'blank'"
      [autoresize]="true"
      [show-borders]="false"
      style="width: 100%; height: 100vh;"
    ></pdf-viewer>
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
