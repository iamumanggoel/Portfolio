import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from "./components/custom-sidenav.component";
import { SideNavService } from './services/side-nav.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    CustomSidenavComponent,
    HeaderComponent,
],
  template: `
    <app-header />
    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavService.sidenavWidth()">
        <app-custom-sidenav />
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sidenavService.sidenavWidth()">
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>   
  `,
  styles: [`
    .content{
      padding: 24px;
    }

    mat-sidenav-container{
      height: calc(100% - 64px);
      mat-sidenav,
      mat-sidenav-content{
        transition: all 500ms ease-in-out;
      }
    }
  `],
})
export class AppComponent {
  sidenavService = inject(SideNavService);
}
