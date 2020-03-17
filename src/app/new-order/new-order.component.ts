import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { UtilService } from '../services/util.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  items = [
  ];

  itemsCopy;

  currentOrder = {
    items: []
  }
  constructor(private itemService: ItemService, private utils: UtilService, private orderService: OrderService) { }

  ngOnInit() {
    this.itemService.getAllItems().subscribe(
      (res: any) => {
        if (res.success) {
          this.itemsCopy = JSON.stringify(res.items);
          this.items = res.items;
        } else {
          this.utils.openSnackBar('An error occurred while getting the items');
        }
      },
      err => {
        this.utils.openSnackBar('An error occurred while getting the items');
      }
    );
  }

  addToOrder(item) {
    this.items = this.items.filter(_item => _item.name !== item.name);
    this.currentOrder.items.push({ ...item, quantity: 1 });

  }

  removeFromOrder(item) {
    this.items.push(item);
    this.currentOrder.items = this.currentOrder.items.filter(_item => _item.name !== item.name);
  }

  getOrderTotal() {
    let total = 0;

    for (const item of this.currentOrder.items) {
      total += item.price * item.quantity;
    }

    return total.toFixed(2);
  }

  createOrder() {

    const newOrder = {
      items: this.currentOrder.items.map(item => ({item: item._id, quantity: item.quantity}))
    };

    this.orderService.addOrder(newOrder).subscribe(
      (res:any) => {
        if (res.success) {
          this.utils.openSnackBar('Order recorded successfully');
          this.items = JSON.parse(this.itemsCopy);
          this.currentOrder = {
            items: []
          };
        }
      }
    );
  }

}
orders: [1, 2, 3]