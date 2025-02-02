import { Injectable, signal, computed } from '@angular/core';
import { MenuItem } from '../models/sidenav.model';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  menuItems = signal<MenuItem[]>([
      { icon: 'home', label: 'Home', route: '/home'},
      { icon: 'person', label: 'About', route: '/about' },
      { icon: 'business_center', label: 'Projects', route: '/projects' },
      { icon: 'code', label: 'Skills', route: '/skills' },
      { icon: 'contacts_product', label: 'Contact', route: '/contact' },
    ]);
    
  collapsed = signal<boolean>(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
  constructor() { }

  toggleSidenav(){
    this.collapsed.set(!this.collapsed());
  }
}
