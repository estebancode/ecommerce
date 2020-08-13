import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.active();
  }

  active(): boolean | undefined {
    if (window.sessionStorage.getItem('msal.idtoken') !== '' ||
    window.sessionStorage.getItem('msal.idtoken') === null ||
    window.sessionStorage.getItem('msal.idtoken') === undefined ||
    window.sessionStorage.getItem('msal.idtoken') === 'null') {
      this.router.navigate(['/authentication']);
    }
    return true;
  }

}
