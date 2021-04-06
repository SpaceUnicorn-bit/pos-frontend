import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemslistService } from '../service/itemslist.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from '../models/item';
import { dataItem } from '../models/dataItem';
import { Billing } from '../models/billing';

@Component({
  selector: 'app-itemlist',
  providers: [ItemslistService],
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})

export class ItemlistComponent implements OnInit  {
  public itemList = [];
  public radioGroupForm: FormGroup;
  public model;
  public orderId;
  @Input() categorySend;
  public catName: String;
  public viewItem;
  public itemsData;
  public dataItemSelect;
  public imgItem;
  public ItemSizePrice: dataItem;
  public arrayDataItems = [];
  public arrayitemsBilling = [];
  public billing: Billing;

  constructor(private itemService: ItemslistService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.ItemSizePrice = new dataItem('', 0);
    this.billing = new Billing('', 0, 0, '');
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
    if(changes.categorySend.currentValue != undefined) {
      this.catName = changes.categorySend.currentValue.name;
      this.itemList = changes.categorySend.currentValue.recipes;
    }

  }

  getDataItem(content, item) {
    this.viewItem = item;
    this.imgItem = item.img;
    this.itemService.getJoinRecipe(item.id).subscribe(
      res => {
        this.itemsData = res;
        this.openLg(content);
      }, error => {
        console.log(<any> error);
      }
    );
  }

  openLg(content) {
    this.arrayDataItems = [];
    this.dataItemSelect = this.itemsData.map((itemPriceCurrent) => {
      this.ItemSizePrice.size = itemPriceCurrent.size;
      this.ItemSizePrice.price = itemPriceCurrent.prices;
      this.arrayDataItems.push(itemPriceCurrent);
      this.ItemSizePrice = new dataItem('', 0);
    });
    this.modalService.open(content, { size: 'lg' });
  }

  addNewBilling(newBilling) {
    this.modalService.dismissAll();
    this.modalService.open(newBilling, { size: 'lg' });
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const lengthOfCode = 5;
    this.orderId = this.makeRandom(lengthOfCode, possible);
    this.orderId = "#" + this.orderId;
    this.billing.orderId = this.orderId;
    let saveItem;
    this.createNewbilling(this.billing);
    this.arrayDataItems.map((currentItem) =>{
      if(currentItem.size === this.model){
        saveItem = currentItem;
        this.billing.purchaseValue += currentItem.prices;
        this.arrayitemsBilling.push(saveItem);
      }
    });
  }

  createNewbilling(dataBilling) {

  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  ngOnInit(): void {
    this.getItemList();
    this.radioGroupForm = this.formBuilder.group({
      'model': undefined
    });
  }

}
