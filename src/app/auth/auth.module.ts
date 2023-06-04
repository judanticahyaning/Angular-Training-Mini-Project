import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthRoutes } from "./auth.routing";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutes } from "../layout/admin/admin.routing";
import { DashboardComponent } from "../admin/dashboard/dashboard.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    RouterModule.forChild(AdminRoutes),
    // RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    // DashboardComponent
  ]
})

export class AuthComponentModule { }