import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login(userName, password) {
    return this._http.post<any>(`${this.url}auth/local`, {
      identifier: userName,
      password: password,
    });
  }
  
  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity !== 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  isLogged() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity !== null) {
      return true;
    } else {
      return false;
    }
  }
}
