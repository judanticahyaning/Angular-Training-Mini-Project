import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AdminRoutes } from "./admin.routing";
import { DashboardComponent } from "src/app/admin/dashboard/dashboard.component";
import { BooksManagementComponent } from "src/app/admin/books-management/books-management.component";
import { BooksCategoryComponent } from "src/app/admin/books-category/books-category.component";
import { UserManagementComponent } from "src/app/admin/user-management/user-management.component";
import { BooksIssueComponent } from "src/app/admin/books-issue/books-issue.component";
import { FormsModule } from "@angular/forms";
import { AuthRoutes } from "src/app/auth/auth.routing";


@NgModule({
    declarations: [
        DashboardComponent,
        BooksManagementComponent,
        BooksCategoryComponent,
        UserManagementComponent,
        BooksIssueComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(AdminRoutes),
        // RouterModule.forChild(AuthRoutes),
        FormsModule,
    ]
})

export class AdminComponentModule {}