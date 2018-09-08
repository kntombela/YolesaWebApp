import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this.auth.login();
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
