import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { UtilService } from 'src/app/services/util.service';
import { AddItemComponent } from 'src/app/dialogs/add-item/add-item.component';
import { ItemService } from 'src/app/services/item.service';

export interface Item {
  name: string;
  type: string;
  price: number;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items = [
  ];

  displayedColumns: string[] = ['index', 'name', 'type', 'price'];
  dataSource = new MatTableDataSource(this.items);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog, private utils: UtilService, private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getAllItems().subscribe(
      (res: any) => {
        if (res.success) {
          this.items = res.items;
          this.dataSource.data = this.items;
        } else {
          this.utils.openSnackBar('An error occurred while getting the items');
        }
      },
      err => {
        this.utils.openSnackBar('An error occurred while getting the items');
      }
    );
  }

  addNewItem() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      minWidth: "400px",
    }).afterClosed().subscribe(
      res => {
        if (res._id) {
          this.items.push(res);
          this.dataSource.data = this.items;
          this.utils.openSnackBar('Item added successfully');
        }
      }
    );
  }

}
