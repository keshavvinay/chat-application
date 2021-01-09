import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ChatRouteGuardService implements CanActivate{

  constructor(public cookie : CookieService, private router : Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.cookie.get('authtoken') === null || this.cookie.get('authtoken') === undefined || this.cookie.get('authtoken') === ''){
      this.router.navigate(['/'])
      return false;
    }
    else {
      return true;
    }
  }
}
