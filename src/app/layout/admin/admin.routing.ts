import { Routes } from "@angular/router";
import { BooksCategoryComponent } from "src/app/admin/books-category/books-category.component";
import { BooksIssueComponent } from "src/app/admin/books-issue/books-issue.component";
import { BooksManagementComponent } from "src/app/admin/books-management/books-management.component";
import { DashboardComponent } from "src/app/admin/dashboard/dashboard.component";
import { UserManagementComponent } from "src/app/admin/user-management/user-management.component";
import { AuthComponent } from "src/app/auth/auth.component";
import { AuthGuard } from "src/app/auth/auth.guard";
import { LoginComponent } from "src/app/auth/login/login.component";

export const AdminRoutes: Routes = [
  // {
  //   path: 'dashboard',
  //   redirectTo: '/admin/dashboard',
  //   canActivate: [AuthGuard],
  //   pathMatch: "full"
  // },
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
  },
  // {
  //   path: 'auth',
  //   component: AuthComponent
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // }
]