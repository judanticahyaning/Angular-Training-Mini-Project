import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { authRequestData, authResponseData } from 'src/app/model/auth.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid)
      return;

    const email = loginForm.value.email;
    const password = loginForm.value.password;
    const authReqData: authRequestData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    console.log(authReqData);

    let authObservable: Observable<authResponseData>;
    authObservable = this.authService.login(authReqData);

    // authObservable.subscribe({
    //   next: resData => {
    //     console.log(resData);
    //     this.router.navigate(['/dashboard']);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // })

    authObservable.subscribe(
      resdata => {
        console.log(resdata);
        this.router.navigate(['auth','dashboard']);
      },
      errorMsg => {
        console.log(errorMsg);
      }
    );

    loginForm.reset();
  }
}
