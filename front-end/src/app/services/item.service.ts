import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from '../app.constants';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient, private userService: UserService) { }

  addItem(item) {
    return this.http.post(`${constants.apiUrl}/item/`, { item });
  }

  getItem(ItemId) {
    return this.http.get(`${constants.apiUrl}/Item/getItem/${ItemId}`);
  }

  getAllItems() {
    return this.http.get(`${constants.apiUrl}/item/all`);
  }

  updateItem(item) {
    return this.http.post(`${constants.apiUrl}/item/update`, { item });
  }

  deleteItem(itemId) {
    return this.http.post(`${constants.apiUrl}/item/delete/${itemId}`, {});
  }

}
