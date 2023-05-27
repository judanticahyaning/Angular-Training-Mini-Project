import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
  { path: '/books-management', title: 'Books Management',  icon:'education_atom', class: '' },
  { path: '/books-category', title: 'Books Category',  icon:'location_map-big', class: '' },
  { path: '/books-issue', title: 'Books Issue',  icon:'ui-1_bell-53', class: '' },

  { path: '/user-management', title: 'User Management',  icon:'users_single-02', class: '' },
  // { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
  // { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  menuItems: any[] | undefined;

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
