import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userType;

  constructor(private utils: UtilService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getLoggedInUserType().subscribe(
      res => {
        this.userType = res[0];
      }
    )
  }

  logout() {
    this.utils.confirmDialog('Are you sure?', 'You will be logged out').subscribe(
      res => {
        this.authService.logout();
      }
    )
  }

}
