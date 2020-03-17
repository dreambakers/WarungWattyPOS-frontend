import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user;

  constructor(private auth: AuthenticationService, private userService: UserService, private utils: UtilService) { }

  ngOnInit() {
    this.user = this.userService.getLoggedInUser();
  }

  logout() {
    this.utils.confirmDialog('Are you sure?', 'You will be logged out').subscribe(
      res => {
        if (res) {
          this.auth.logout();
        }
      }
    );
  }

}
