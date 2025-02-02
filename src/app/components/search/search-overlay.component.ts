import { Component, computed, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchBarService } from '../../services/search-bar.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-search-overlay',
  imports: [MatDivider, MatListModule, MatIconButton, MatIcon, TitleCasePipe],
  template: `
    <mat-divider />
    <div class="overlay-container">
      <mat-action-list>
      @for (search of searchBarService.recommendedRoutes(); track search){
          <mat-list-item (click)="performSearch(search, 'recommended')">
            <!-- <mat-icon matListItemIcon >history</mat-icon> -->
            <h3 matListItemTitle> {{search | titlecase}} </h3>
            <button matListItemMeta mat-icon-button (click)="deleteRecentSearch(search, $event)">
              <!-- <mat-icon>close</mat-icon> -->
            </button>
          </mat-list-item>
        }
        @if(searchBarService.recommendedRoutes().length === 0){
          @for (search of recentSearches(); track search){
          <mat-list-item (click)="performSearch(search, 'recent')">
            <mat-icon matListItemIcon >history</mat-icon>
            <h3 matListItemTitle> {{search}} </h3>
            <button matListItemMeta mat-icon-button (click)="deleteRecentSearch(search, $event)">
              <mat-icon>close</mat-icon>
            </button>
          </mat-list-item>
          }
        }

        @if(searchBarService.recommendedRoutes().length === 0 && recentSearches().length === 0){
          <div class="no-results-message">
            <h3 matListItemTitle>No search results available.</h3>
        </div>
        }
      </mat-action-list>
    </div>
  `,
  styles: `
    .overlay-container{
      box-shadow: var(--mat-sys-level2); 
      min-width: 377px;
      background: var(--mat-sys-outline-variant);
      color: var(--mat-sys-on-surface);
      padding: 16px;
      border-radius: 0 0 32px 32px;
    }

    @media (max-width: 768px) {
      .overlay-container {
        min-width: 274px; 
      }
    }


    .no-results-message {
      padding: 16px;
      text-align: center; 
      color: var(--mat-sys-on-surface); 
      cursor: default;
    }
  `
})
export class SearchOverlayComponent {
  searchBarService = inject(SearchBarService);

  recentSearches = computed(() => {
    return this.searchBarService.recentSearches().slice(0, 5);
  });

  deleteRecentSearch(searchTerm: string, event: MouseEvent){
    event.stopPropagation();
    this.searchBarService.deleteRecentSearch(searchTerm);
  }

  performSearch(searchTerm: string, type: 'recommended' | 'recent'){
    this.searchBarService.search(searchTerm, type);
  }
}
