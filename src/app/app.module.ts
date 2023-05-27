import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './layout/admin/admin.component';
import { ComponentsModule } from './components/components.module';
import { BooksManagementComponent } from './books-management/books-management.component';
import { BooksCategoryComponent } from './books-category/books-category.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BooksIssueComponent } from './books-issue/books-issue.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent,
    // SidebarComponent,
    // FooterComponent,
    AdminComponent,
    // BooksIssueComponent,
    // UserManagementComponent,
    // BooksCategoryComponent,
    // BooksManagementComponent,
    // DashboardComponent
  ],
  imports: [
    // AppComponent,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule
    // NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
