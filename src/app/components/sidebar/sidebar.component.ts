import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/admin/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
  { path: '/admin/books-management', title: 'Books Management',  icon:'education_atom', class: '' },
  { path: '/admin/books-category', title: 'Books Category',  icon:'location_map-big', class: '' },
  { path: '/admin/books-issue', title: 'Books Issue',  icon:'ui-1_bell-53', class: '' },
  { path: '/admin/user-management', title: 'Member Management',  icon:'users_single-02', class: '' },

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
