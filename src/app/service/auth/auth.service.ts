import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { authReqDataUser, authRequestData, authResDataUser, authResponseData } from 'src/app/model/auth.model';
import { User, UserData } from 'src/app/model/user.model';
import { catchError, tap, map, reduce } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new BehaviorSubject<User>(null!);
  // endpointUrl: string = 'https://angular-training-a3afa-default-rtdb.asia-southeast1.firebasedatabase.app/';
  endpointUrl: string = 'https://library-miniproject-angular-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postUrl: string = this.endpointUrl + 'post.json';

  private tokenExpirationTimer: any;
  responseDataAuth: authResDataUser | undefined;

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  // SIGN UP REGION
  register(request: authRequestData) {
    console.log(request)
    return this.httpClient.post<authResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB21nik_h07IWd-D1Gwz9LX4nV0OUPyP_E',
        {
          email: request.email,
          password: request.password,
          returnSecureToken: request.returnSecureToken
        }
      ).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expired
          )

        })
      );
  }

  // LOGIN REGION
  autoLogin() {
    const userData: {
      email: string,
      id: string,
      token: any,
      tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.token,
      new Date(userData.tokenExpirationDate
      ));

    if (loadedUser.tokens) {
      this.userSubject.next(loadedUser);

      const experationDuration
        = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(experationDuration);

    }


  }

  login(request: authRequestData) {
    return this.httpClient.post<authResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB21nik_h07IWd-D1Gwz9LX4nV0OUPyP_E',
        {
          email: request.email,
          password: request.password,
          returnSecureToken: request.returnSecureToken
        }
      ).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expired
          )
          this.responseDataAuth = {
            idToken: resData.idToken,
            email: resData.email,
            refreshToken: resData.refreshToken,
            expiresIn: resData.expired,
            localId: resData.localId,
          }
        })
      );
  }

  // LOGOUT REGION
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.userSubject.next(null!);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  // save user data to realtime 
  saveUserData(postUserData: UserData) {
    console.log(postUserData)
    this.httpClient.post<{ name: string }>(this.postUrl, postUserData).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

  fetchDataUser() {
    // return this.httpClient.get<{[key : string]: UserData}>(this.postUrl)
    //   .pipe(
    //     map(responseData => {
    //       const postArray: UserData[] = [];
    //       for(const key in responseData){
    //         if(responseData.hasOwnProperty(key)){
    //           postArray.push({...responseData[key],id:key})
    //         }
    //       }
    //       return postArray;
    //     })
    //   )
    console.log(this.responseDataAuth?.idToken)
    return this.httpClient.post<authResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB21nik_h07IWd-D1Gwz9LX4nV0OUPyP_E',
        {
          idToken: this.responseDataAuth?.idToken
        }
      ).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expired
          )
        })
      );
  }

  // updateDataUser(dataUser: authResDataUser){
  //   const data = {
  //     email: dataUser.email,
  //     password: dataUser.password
  //   }
  //   return this.httpClient.patch(this.postUrl, data);

  //  console.log(data);
  // }

  private handleAuthentication(email: string, localId: string, token: string, expired: number) {
    const expirationDate = new Date(new Date().getTime() + expired * 1000);
    const user = new User(email, localId, token, expirationDate);
    this.userSubject.next(user);
    this.autoLogout(expired * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknow error occured!'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email exists already';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMsg = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMsg = 'We have blocked all requests from this device due to unusual activity. Try again later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'There is no user record corresponding to this identifier. The user may have been deleted';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'The password is invalid or the user does not have a password';
        break;
      case 'USER_DISABLED':
        errorMsg = 'The user account has been disabled by an administrator';
        break;
      default:
        break;
    }
    return throwError(errorMsg);
  }

}
