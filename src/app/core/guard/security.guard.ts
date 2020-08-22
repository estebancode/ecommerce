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
    if (window.sessionStorage.getItem('user') !== '' ||
    window.sessionStorage.getItem('user') === null ||
    window.sessionStorage.getItem('user') === undefined ||
    window.sessionStorage.getItem('user') === 'null') {
      this.router.navigate(['/authentication']);
    }
    return true;
  }

}
