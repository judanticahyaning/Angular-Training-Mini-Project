import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, take, map } from "rxjs";
import { AuthService } from "../service/auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.authService.userSubject.pipe(
        take(1),
        map( user => {
          const isAuth = !!user;
          if(isAuth)
            return true;

            console.log("masuk auth guard")
          return this.router.createUrlTree(['/auth']);
        })
      )
  }
}