import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilService } from './util.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router, private utils: UtilService, private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
  }

  signUp(email, password, userType = 'admin') {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.db.database.ref('users/' + result.user.uid).set({
          userType
        });
        localStorage.setItem('user', JSON.stringify(result.user));
        this.router.navigate(['/dashboard']);
      }).catch((error) => {
        this.utils.openSnackBar('An error occurred while signing up');
      });
  }

  // Sign in with email/password
  signIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        this.router.navigate(['/dashboard']);
      }).catch((error) => {
        this.utils.openSnackBar('An error occurred while logging in');
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }

  isAuthenticated() {
    return localStorage.getItem('authToken') ? true : false;
  }

}
