import { Component, Input, OnInit, SimpleChanges  } from '@angular/core';
import { ItemslistService } from '../service/itemslist.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-itemlist',
  providers: [ItemslistService],
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent implements OnInit  {
  public itemList = [];
  @Input() categorySend;

  constructor(private itemService: ItemslistService) {

  }

  getItemList() {
    this.itemService.getItemList().subscribe(
      res => {
        console.log(this.categorySend);
        this.itemList = res;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
  }

  ngOnInit(): void {
    this.getItemList();
  }

}
