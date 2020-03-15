import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { UtilService } from 'src/app/services/util.service';
import { AddItemComponent } from 'src/app/dialogs/add-item/add-item.component';

export interface Item {
  name: string;
  type: string;
  price: number;
}

const ELEMENT_DATA: Item[] = [
  {name: 'Testing item', type: 'item', price: 23.2},
  {name: 'Testing meal', type: 'meal', price: 23.2},
];

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  displayedColumns: string[] = ['index', 'name', 'type', 'price'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog, private utils: UtilService) { }

  ngOnInit() {
  }

  addNewItem(){

    // this.utils.confirmDialog('as', 'asd').subscribe();
    const dialogRef = this.dialog.open(AddItemComponent, {
      minWidth: "400px",
      // maxWidth: "400px",
    })

    // return dialogRef.afterClosed();
  }

}
