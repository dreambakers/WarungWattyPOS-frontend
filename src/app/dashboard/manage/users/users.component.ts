import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { AddUserComponent } from 'src/app/dialogs/add-user/add-user.component';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  users = [];

  displayedColumns: string[] = ['index', 'email', 'type', 'id'];
  dataSource = new MatTableDataSource(this.users);
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog, private utils: UtilService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe(
      (res: any) => {
        if (res.success) {
          this.users = res.users;
          this.dataSource.data = this.users;
          this.dataSource.sort = this.sort;
        } else {
          this.utils.openSnackBar('An error occurred while getting the users');
        }
      },
      err => {
        this.utils.openSnackBar('An error occurred while getting the users');
      }
    );
  }

  addNewUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      minWidth: "400px",
    }).afterClosed().subscribe(
      res => {
        if (res) {
          this.users.push(res);
          this.dataSource.data = this.users;
          this.utils.openSnackBar('User added successfully');
        }
      }
    )
  }

  deleteUser(user) {
    this.utils.confirmDialog('Are you sure?', 'The selected user will be deleted').subscribe(
      res => {
        if (res) {
          this.authService.deleteUser(user.email).subscribe(
            (res: any) => {
              if (res.success) {
                this.users = this.users.filter(_user => user._id !== _user._id);
                this.dataSource.data = this.users;
                this.dataSource.sort = this.sort;
                this.utils.openSnackBar('User deleted successfully');
              }
              else{
                this.utils.openSnackBar('An error occurred while deleting the user');
              }
            }
          );
        }
      }
    );
  }

}
