import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { FormsModule } from '@angular/forms';
import { BooksManagementComponent } from './admin/books-management/books-management.component';
import { BooksCategoryComponent } from './admin/books-category/books-category.component';
import { BooksIssueComponent } from './admin/books-issue/books-issue.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/auth',
      pathMatch: 'full'
    },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
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
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
