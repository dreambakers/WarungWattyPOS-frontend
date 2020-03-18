import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  addOrder(order) {
    return this.http.post(`${constants.apiUrl}/order/`, { order });
  }

  getAllOrders() {
    return this.http.get(`${constants.apiUrl}/order/all`);
  }

  // getItem(ItemId) {
  //   return this.http.get(`${constants.apiUrl}/Item/getItem/${ItemId}`);
  // }

  // getAllItems() {
  //   return this.http.get(`${constants.apiUrl}/item/all`);
  // }

  // updateItem(item) {
  //   return this.http.post(`${constants.apiUrl}/item/update`, { item });
  // }

  // deleteItem(itemId) {
  //   return this.http.post(`${constants.apiUrl}/item/delete/${itemId}`, {});
  // }

}
