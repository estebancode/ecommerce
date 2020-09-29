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
    const user = window.localStorage.getItem('user');
    if (user === '' ||
    user === null ||
    user === undefined) {
      this.router.navigate(['/authentication']);
    }
    return true;
  }

}
