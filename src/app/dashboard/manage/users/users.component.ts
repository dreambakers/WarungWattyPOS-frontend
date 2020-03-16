import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AddUserComponent } from 'src/app/dialogs/add-user/add-user.component';
import { UtilService } from 'src/app/services/util.service';

export interface User {
  username: string;
  type: string;
}

const ELEMENT_DATA: User[] = [
  {username: 'mhd3v', type: 'admin'},
  {username: 'johndoe', type: 'user'},
];


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['index', 'username', 'type'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog, private utils: UtilService) { }

  ngOnInit() {
  }

  addNewUser(){

    // this.utils.confirmDialog('as', 'asd').subscribe();
    const dialogRef = this.dialog.open(AddUserComponent, {
      minWidth: "400px",
      // maxWidth: "400px",
    })

    // return dialogRef.afterClosed();
  }



}
