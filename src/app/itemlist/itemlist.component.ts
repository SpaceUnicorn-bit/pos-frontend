import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation, ViewChild  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemslistService } from '../service/itemslist.service';
import { EmployeesService } from '../service/employees.service';
import { BillingserviceService } from '../service/billingservice.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { dataItem } from '../models/dataItem';
import { Billing } from '../models/billing';

@Component({
  selector: 'app-itemlist',
  providers: [ItemslistService, EmployeesService, BillingserviceService],
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})

export class ItemlistComponent implements OnInit  {
  @ViewChild(ToastContainerDirective, { static: true }) toastContainer: ToastContainerDirective;
  public employee;
  public token;
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
    private toastr: ToastrService,
    private billingService: BillingserviceService,
    private employeeService: EmployeesService,
    private modalService: NgbModal
  ) {
    this.ItemSizePrice = new dataItem('', 0);
    this.billing = new Billing('', 0, '', false, '', null, null);
    this.employee = this.employeeService.getIdentity();
    this.token = this.employeeService.getToken();
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
    this.incrementBillingValue();
  }

  incrementBillingValue() {
    let saveItem;
    this.arrayDataItems.map((currentItem) =>{
      if(currentItem.size === this.model){
        saveItem = currentItem;
        this.billing.purchaseValue += currentItem.prices;
        this.arrayitemsBilling.push(saveItem);
        //this.billing.recipes_sizes = saveItem;
        this.billing.recipes_sizes.push(saveItem);
      }
    });
    console.log(this.billing)
  }

  createNewbilling(dataBilling) {
    dataBilling.office = this.employee.office.id;
    dataBilling.numTable = dataBilling.numTable.toString();
    dataBilling.recipes = this.viewItem;
    this.viewItem = [];
    this.billing = new Billing('', 0, '', false, '', null, null);
    this.billingService.createNewbilling(dataBilling, this.token).subscribe(
      res => {
        this.showSuccess();
        localStorage.removeItem('lastOrderId');
        localStorage.setItem('lastOrderId', res.id);
      }, error => {
        console.log(<any> error);
      }
    );
  }

  addItemLastBilling() {
    const lastOrderId = localStorage.getItem('lastOrderId');
    this.billingService.getBilling(this.token, lastOrderId).subscribe(
      res => {
        this.billing = res;
        this.billing.recipes.push(this.viewItem);
        this.incrementBillingValue();
        this.updateBilling();
      }, error => {
        console.log(<any> error);
      }
    );
  }

  updateBilling(){
    const lastOrderId = localStorage.getItem('lastOrderId');
    this.billingService.updateNewbilling(this.billing, this.token, lastOrderId).subscribe(
      res => {
        this.modalService.dismissAll();
        this.showSuccess();
      }, error => {
        console.log(<any> error);
      }
    );
  }

  endBilling() {
    this.createNewbilling(this.billing);
    this.modalService.dismissAll();
  }

  assignValue(e){
    this.billing.paid = e.target.checked;
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  showSuccess() {
    this.toastr.overlayContainer = this.toastContainer;
    this.toastr.success('Se ha añadido correctamente', 'Éxito', {
      timeOut: 3000,
      progressBar: true
    });
  }

  ngOnInit(): void {
    this.getItemList();
    this.radioGroupForm = this.formBuilder.group({
      'model': undefined
    });
  }

}
