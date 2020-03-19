import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { UtilService } from '../services/util.service';
import { OrderService } from '../services/order.service';
import { EmitterService } from '../services/emitter.service';
import { takeUntil } from 'rxjs/operators';
import { constants } from '../app.constants';
import { Subject } from 'rxjs';
import * as moment from 'moment';

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
    items: [],
    _id: null
  }
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private utils: UtilService, private orderService: OrderService, private emitterService: EmitterService) { }

  ngOnInit() {
    this.getAllOrders();
    this.emitterService.emittter.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event === constants.emitterKeys.orderCreated) {
        this.getAllOrders();
      }
    });
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe(
      (res: any) => {
        if (res.success) {
          this.orders = res.orders.reverse();
        } else {
          this.utils.openSnackBar('An error occurred while getting the orders');
        }
      },
      err => {
        this.utils.openSnackBar('An error occurred while getting the orders');
      }
    );
  }

  viewOrder(order) {
    if(this.currentOrder._id === order._id) {
      return this.currentOrder = {
        items: [],
        _id: null
      };
    }
    this.currentOrder = order;
  }

  getOrderTotal() {
    let total = 0;

    for (const item of this.currentOrder.items) {
      total += item.item.price * item.quantity;
    }

    return total.toFixed(2);
  }

  getParsedDate(date) {
    if (date) {
      return moment(date).format('MMMM Do YYYY, h:mm a');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
