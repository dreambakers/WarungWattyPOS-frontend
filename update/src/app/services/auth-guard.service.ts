import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(protected router: Router) { }

  canActivate() {
    if (!this.isAuthenticated()) {
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }

  isAuthenticated() {
    return localStorage.getItem('authToken') ? true : false;
  }

}
