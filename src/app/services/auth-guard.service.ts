import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { FirebaseAuth } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(protected router: Router, private auth: FirebaseAuth) { }

  canActivate() {
    if (!this.isAuthenticated()) {
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }

  isAuthenticated()  {
    if (this.auth.currentUser) {
      return true;
    } else {
      return false;
    }
  }

}
