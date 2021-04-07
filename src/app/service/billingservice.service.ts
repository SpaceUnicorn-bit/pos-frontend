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
    console.log(dataBilling)
    return this._http.post<any>(`${this.url}billings`, {
      numTable: dataBilling.numTable,
      office: dataBilling.office,
      orderId: dataBilling.orderId,
      paid: dataBilling.paid,
      purchaseValue: dataBilling.purchaseValue,
      recipes: null
       
      }
    );
  }
}
