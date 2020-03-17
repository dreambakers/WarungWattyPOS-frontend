import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { UtilService } from '../services/util.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.scss']
})
export class PastOrdersComponent implements OnInit {

  orders = [
  ];

  itemsCopy;

  currentOrder = {
    items: []
  }
  constructor(private itemService: ItemService, private utils: UtilService, private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(
      (res: any) => {
        if (res.success) {
          this.orders = res.orders;
        } else {
          this.utils.openSnackBar('An error occurred while getting the orders');
        }
      },
      err => {
        this.utils.openSnackBar('An error occurred while getting the orders');
      }
    );
  }

  // addToOrder(item) {
  //   this.items = this.items.filter(_item => _item.name !== item.name);
  //   this.currentOrder.items.push({...item, quantity: 1});
  // }

  // removeFromOrder(item) {
  //   this.items.push(item);
  //   this.currentOrder.items = this.currentOrder.items.filter(_item => _item.name !== item.name);
  // }

  viewOrder(order) {
    this.currentOrder = order;
  }

  getOrderTotal() {
    let total = 0;

    for (const item of this.currentOrder.items) {
      total += item.item.price * item.quantity;
    }

    return total.toFixed(2);
  }

}
