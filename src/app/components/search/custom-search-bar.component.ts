import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import { SearchBarService } from '../../services/search-bar.service';
import { SearchOverlayComponent } from './search-overlay.component';

@Component({
  selector: 'app-custom-search-bar',
  imports: [MatIconButton, MatIcon, OverlayModule, SearchOverlayComponent, NgClass],
  template: `
    <div class="search-bar-container" 
      cdkOverlayOrigin 
      #overlayPosition="cdkOverlayOrigin"
      [ngClass]="{ 'opened': overlayOpen() }">
      <button mat-icon-button>
        <mat-icon (click)="search(searchInput.value)">search</mat-icon>
      </button>
      <input #searchInput placeholder="Search..." 
        [value]="searchBarService.searchTerm()"
        (click)="overlayOpen.set(true)"
        (keydown.ENTER)="search(searchInput.value)"
        [maxLength]="25"
        (input)="searchBarService.getFilteredRoutes(searchInput.value)"
      />

      @if(searchBarService.searchTerm()){
        <button mat-icon-button class="close-btn" (click)="clearSearch()">
          <mat-icon>close</mat-icon>
        </button>
      }
    </div>

    <ng-template 
      cdkConnectedOverlay 
      [cdkConnectedOverlayOrigin]="overlayPosition"
      [cdkConnectedOverlayOpen]="overlayOpen()"
      (overlayOutsideClick)="overlayOpen.set(false)">
      <app-search-overlay />
    </ng-template>
    
  `,
  styles: `

    :host{
      display: block;
    }
    .search-bar-container{
      padding: 0px 56px 0px 8px;
      background: var(--mat-sys-outline-variant);
      color: var(--mat-sys-on-surface);
      border-radius: 32px;
      display: flex;
      align-items: center;
      position: relative;

      > input{
        font-size: 1rem;
        border: none;
        outline: none;
        background: inherit;
        min-width: 300px;
      }
      &.opened{
        box-shadow: var(--mat-sys-level2);
        border-radius: 20px 20px 0 0; 
      }

      .close-btn{
        position: absolute;
        right: 8px;
        top: 0;
      }
    }
    @media (max-width: 768px) {
      .search-bar-container > input {
        min-width: 200px; 
      }
    }
  
  `
})
export class CustomSearchBarComponent {
  
  searchBarService = inject(SearchBarService);
  overlayOpen = this.searchBarService.overlayOpen;

  search(searchTerm: string){
    if(!searchTerm) return;
    this.searchBarService.search(searchTerm, 'recent');
  }

  clearSearch(){
    this.searchBarService.clearSearch();
  }
}
