import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  items = [
    { name: 'Testing item', type: 'item', price: 23.2 },
    { name: 'Testing meal', type: 'meal', price: 23.2 }
  ];

  currentOrder = {
    items: []
  }
  constructor() { }

  ngOnInit() {
  }

  addToOrder(item) {
    this.items = this.items.filter(_item => _item.name !== item.name);
    this.currentOrder.items.push({...item, quantity: 1});
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


}
