import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { authRequestData, authResponseData } from 'src/app/model/auth.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  success: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    // private navCtrl: NavController
    private activatedRoute: ActivatedRoute
    // private route: ActivatedRoute
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

    authObservable.subscribe({
      next: resData => {
        console.log(resData);
        this.success = true;
        this.router.navigate(['../../admin/dashboard']);
      },
      error: (error) => {
        this.success = false;
        console.log(error);
      }
    })
    

    // if(this.success)
      // this.router.navigate(['/admin/dashboard']);

    // authObservable.subscribe(
    //   resdata => {
    //     console.log(resdata);
    //     debugger
    //     this.router.navigate(['/admin/dashboard']);
    //     console.log("terlempar ke routing lain")
    //   },
    //   errorMsg => {
    //     console.log(errorMsg);
    //   }
    // );

    loginForm.reset();
  }
}
