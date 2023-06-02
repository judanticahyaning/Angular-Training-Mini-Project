import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { authRequestData, authResponseData } from 'src/app/model/auth.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onSubmit(registerForm: NgForm){
    if (!registerForm.valid)
      return;

    const email = registerForm.value.email;
    const password = registerForm.value.password;
    const authReqData: authRequestData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }

    let authObservable: Observable<authResponseData>;
    authObservable = this.authService.register(authReqData);

    debugger
    authObservable.subscribe(
      resdata => {
        console.log(resdata);
        this.router.navigate(['/login']);
      },
      errorMsg => {
        console.log(errorMsg);
      }
    );

    // authObservable.subscribe({
    //   next: (resData) => {
    //     console.log(resData);
    //     this.router.navigate(['/login']);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // })

    registerForm.reset();
  }

   
}
