import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilService } from './util.service';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {



  // serverUrl = 'http://localhost:3000';

  constructor(public afAuth: AngularFireAuth, private http: HttpClient, private router: Router, private utils: UtilService) { }

//   let requestUrl = `${this.serverUrl}/users`;

// if (!signUp) {
//   requestUrl += '/login'
// }
// else {
//   requestUrl += '/admins/'
// }

// Sign up with email/password
SignUp(email, password) {
  return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      window.alert("You have been successfully registered!");
      console.log(result.user)
    }).catch((error) => {
      window.alert(error.message)
    })
}

// Sign in with email/password
SignIn(email, password) {
  return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      window.alert(error.message)
    })
}

authenticateUser(email: string, password: string, signUp = false) {

  let requestUrl = `${this.serverUrl}/users`;

  if (!signUp) {
    requestUrl += '/login'
  }
  else {
    requestUrl += '/admins/'
  }

  this.http.post(requestUrl, { email, password }, { observe: 'response' })
    .subscribe((response) => {

      if (response.headers.get('x-auth')) {
        localStorage.setItem('authToken', response.headers.get('x-auth'));
        localStorage.setItem('email', response.body['email']);
        localStorage.setItem('userType', response.body['userType']);
        this.router.navigateByUrl('/dashboard');
      }

    }, errorResponse => {
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
