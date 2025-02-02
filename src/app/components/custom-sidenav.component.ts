import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SideNavService } from '../services/side-nav.service';
import { MatTooltipModule } from '@angular/material/tooltip' 

@Component({
  selector: 'app-custom-sidenav',
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule, MatTooltipModule],
  template: `
    <div class="sidenav-header">
      <img 
        [width]="profilePicSize()"
        [height]="profilePicSize()" 
        src="/images/profile_pic.jpeg" 
        alt="profile">
      <div class="header-text" [class.hide-header-text]="sidenavService.collapsed()">
        <h2>Umang Goel</h2>
        <p>Fullstack Developer</p>
      </div>
    </div>

    <mat-nav-list>
      @for (item of sidenavService.menuItems(); track item?.label){
        <a 
        mat-list-item 
        class="menu-item"
        [routerLink]="item.route" 
        routerLinkActive="selected-menu-item"
        #rla="routerLinkActive" 
        [activated]="rla.isActive"
        >

          <mat-icon 
            [ngStyle]="{'color': rla.isActive ? 'var(--mat-sys-error)' : 'inherit'}"
            [fontSet]="rla.isActive ?
            'material-icons': 'material-icons-outlined'"
            matListItemIcon
            [matTooltip]="sidenavService.collapsed() ? item.label : null"
            matTooltipPosition="right"
            >
            {{item.icon}}
          </mat-icon>
          <span matListItemTitle *ngIf="!sidenavService.collapsed()">{{item.label}}</span>
        </a>
      }
      
    </mat-nav-list>
  `,
  styles: [
    `
      :host * {
        transition: all 500ms ease-in-out;
      }
      .sidenav-header{
        padding-top: 24px;
        text-align: center;

        >img{
          border-radius: 50%;
          margin-bottom: 10px;
          object-fit: cover;
        }
      }
      .header-text{
        > h2{
          margin: 0;
          font-size: var(--mat-sys-headline-large);
          line-height: 1.5rem;
        }
        > p{
          margin: 0;
          font-size: 0.8rem;
        }
      }
      .hide-header-text{
        opacity: 0;
        height: 0 !important;
      }

      .menu-item{
        border-left: 5px solid;
        border-left-color: transparent;
        border-radius: 0 !important;
      }
      .selected-menu-item {
        border-left-color: var(--mat-sys-error);
        background-color: rgba(0, 0, 0, 0.05);
      }
    `
  ]
})
export class CustomSidenavComponent {
 
  sidenavService = inject(SideNavService);
  profilePicSize = computed(() =>  this.sidenavService.collapsed() ? '32' : '100');
  
}
