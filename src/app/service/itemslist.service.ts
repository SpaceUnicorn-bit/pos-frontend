import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ItemslistService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getItemList() {
    return this._http.get<any>(`${this.url}recipes`);
  }

  getItemData() {
    return this._http.get<any>(`${this.url}recipes-sizes`);
  }

  getItemsById(idRecipe) {
    return this._http.get<any>(`${this.url}recipes-sizes/${idRecipe}`);
  }

  getJoinRecipe(itemId: any) {
    return this._http.get<any>(`${this.url}recipes/getJoinRecipe/ ${itemId}`);
  }

}
