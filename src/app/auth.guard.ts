import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _route: Router,private _authService:AuthService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //this._route.navigate(['login'])
    //return this._authService.authenticated();
       if (this._authService.authenticated()) {
      //this._route.navigate(['']);
     // this._route.navigate(['home']);
      return true;
    }
   
    
    this._route.navigate(['login']);
    
  }
  
}
