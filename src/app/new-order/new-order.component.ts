import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../services/item.service';
import { UtilService } from '../services/util.service';
import { OrderService } from '../services/order.service';
import { EmitterService } from '../services/emitter.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { constants } from '../app.constants';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit, OnDestroy {

  items = [
  ];
  itemsCopy;

  currentOrder = {
    items: []
  }
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private itemService: ItemService, private utils: UtilService, private orderService: OrderService,
    private emitterService: EmitterService) { }

  ngOnInit() {
    this.getItems();
    this.emitterService.emittter.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event === constants.emitterKeys.itemAdded) {
        this.getItems();
      }
    });
  }

  getItems() {
    this.itemService.getAllItems().subscribe(
      (res: any) => {
        if (res.success) {
          this.itemsCopy = JSON.stringify(res.items);
          this.items = res.items.reverse();
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
    this.items = this.items.filter(_item => _item._id !== item._id);
    this.currentOrder.items.push({ ...item, quantity: 1 });
  }

  removeFromOrder(item) {
    this.items.push(item);
    this.currentOrder.items = this.currentOrder.items.filter(_item => _item._id !== item._id);
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
      items: this.currentOrder.items.map(item => ({ item: item._id, quantity: item.quantity }))
    };

    this.orderService.addOrder(newOrder).subscribe(
      (res: any) => {
        if (res.success) {
          this.emitterService.emit(constants.emitterKeys.orderCreated);
          this.utils.openSnackBar('Order recorded successfully');
          this.items = JSON.parse(this.itemsCopy);
          this.currentOrder = {
            items: []
          };
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}