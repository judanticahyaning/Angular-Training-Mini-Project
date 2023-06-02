import { Routes } from "@angular/router";
import { BooksCategoryComponent } from "src/app/admin/books-category/books-category.component";
import { BooksIssueComponent } from "src/app/admin/books-issue/books-issue.component";
import { BooksManagementComponent } from "src/app/admin/books-management/books-management.component";
import { DashboardComponent } from "src/app/admin/dashboard/dashboard.component";
import { UserManagementComponent } from "src/app/admin/user-management/user-management.component";

export const AdminRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'books-management',
    component: BooksManagementComponent
  },
  {
    path: 'books-category',
    component: BooksCategoryComponent
  },
  {
    path: 'books-issue',
    component: BooksIssueComponent
  },
  {
    path: 'user-management',
    component: UserManagementComponent
  }
]