import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { UtilService } from 'src/app/services/util.service';
import { AddItemComponent } from 'src/app/dialogs/add-item/add-item.component';
import { EditItemComponent } from 'src/app/dialogs/edit-item/edit-item.component';
import { ItemService } from 'src/app/services/item.service';
import { EmitterService } from 'src/app/services/emitter.service';
import { constants } from 'src/app/app.constants';

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

  displayedColumns: string[] = ['index', 'name', 'type', 'price', 'id'];
  dataSource = new MatTableDataSource(this.items);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog, private utils: UtilService, private itemService: ItemService, private emitterService: EmitterService) { }

  ngOnInit() {
    this.itemService.getAllItems().subscribe(
      (res: any) => {
        if (res.success) {
          this.items = res.items;
          this.dataSource.data = this.items;
          this.dataSource.sort = this.sort;
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
          this.emitterService.emit(constants.emitterKeys.itemAdded);
        }
      }
    );
  }

  editItem(item){
    this.dialog.open(EditItemComponent, {
      minWidth: "400px",
      data: {
       item :  item
      }
    }).afterClosed().subscribe(
      res => {
        if (res) {
          this.items.forEach((item, index) =>{
            if(res._id == item._id){
              item.name = res.name
              item.price = res.price
              item.type = res.type
            }
          });
          this.emitterService.emit(constants.emitterKeys.itemUpdated);
          this.utils.openSnackBar('Item updated successfully');
        }
      }
    );
  }

}
