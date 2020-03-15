import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverUrl = 'http://localhost:3000';
  
  private shipmentsSource = new BehaviorSubject<[]>([]);
  currentShipments = this.shipmentsSource.asObservable();

  private workersSource = new BehaviorSubject<[]>([]);
  currentWorkers = this.workersSource.asObservable();

  constructor(private http: HttpClient) { }

  updateWorkers(newWorkers) {
    this.workersSource.next(newWorkers);
  }

  updateShipments(newShipments) {
    this.shipmentsSource.next(newShipments);
  }

  getWorkers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('authToken')
      })
    };

    return this.http.get(`${this.serverUrl}/users/admins/getWorkers`, httpOptions);
  }

  getShipments() {

    let requestUrl = `${this.serverUrl}/users/`;
    const userType = localStorage.getItem('userType');

    if (userType === 'admin') {
      requestUrl += '/admins/getShipments';
    }

    else if (userType === 'worker') {
      requestUrl += '/workers/getShipments';
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('authToken')
      })
    };

    return this.http.get(requestUrl, httpOptions);

  }

  removeWorker(workerId) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('authToken')
      }),
      body: {
        workerId
      }
    };

    return this.http.delete(`${this.serverUrl}/users/admins/removeWorker`, httpOptions);

  }

  addWorker(email, password) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('authToken')
      })
    };

    return this.http.post(`${this.serverUrl}/users/admins/addWorker`, { email, password }, httpOptions);
  }

  removeShipment(shipmentId) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('authToken')
      }),
      body: {
        shipmentId
      }
    };

    return this.http.delete(`${this.serverUrl}/users/admins/removeShipment`, httpOptions);

  }

  addShipment(status) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('authToken')
      })
    };

    return this.http.post(`${this.serverUrl}/users/admins/addShipment`, { status }, httpOptions);

  }


  updateShipmentStatus(shipmentId, status) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('authToken')
      })
    };

    return this.http.patch(`${this.serverUrl}/users/workers/updateShipment`, { shipmentId, status }, httpOptions);

  }

  assignTo(shipmentId, workerId) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('authToken')
      })
    };

    return this.http.post(`${this.serverUrl}/users/admins/assignShipment`, { shipmentId, workerId }, httpOptions);
  }

}
