import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class BillingserviceService {
  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }


  createNewbilling(dataBilling, token) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
    return this._http.post<any>(`${this.url}billings`, dataBilling, { headers: headers });
  }

  updateNewbilling(dataBilling, token, billingId) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
    console.log(dataBilling)
    return this._http.put<any>(`${this.url}billings/${billingId}`, dataBilling, { headers: headers });
  }

  getBilling(token,  lastOrderId) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
    return this._http.get<any>(`${this.url}billings/${lastOrderId}`, { headers: headers });
  }
}
