import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private utils: UtilService) { }

  ngOnInit() {
  }

  logout() {
    this.utils.confirmDialog('Are you sure?', 'You will be logged out').subscribe(
      res => {

      }
    )
  }

}
