import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { constants } from '../app.constants';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  authenticateUser(email: string, password: string, signUp = false, userType = 'user') {
    let requestUrl = `${constants.apiUrl}/user`;

    if (signUp) {
      requestUrl += '/'
    }
    else {
      requestUrl += '/login'
    }

    return this.http.post(requestUrl, { email, password, userType }, { observe: 'response' });
  }

  getAllUsers() {
    return this.http.get(`${constants.apiUrl}/user/getAllUsers`);
  }

  logout() {
    this.http.post(`${constants.apiUrl}/user/logout`, {}).subscribe();
    this.userService.unsetLoggedInUser();
    this.router.navigateByUrl('');
  }

  isAuthenticated() {
    return this.userService.getLoggedInUser() ? true : false;
  }

}
