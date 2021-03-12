import { Component, OnInit } from '@angular/core';
import { ItemslistService } from '../service/itemslist.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-itemlist',
  providers: [ItemslistService],
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent implements OnInit {
  public itemList = [];

  constructor(private itemService: ItemslistService) {}

  getItemList() {
    this.itemService.getItemList().subscribe(
      res => {
        console.log(res);
        this.itemList = res;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  ngOnInit(): void {
    this.getItemList();
  }

}
