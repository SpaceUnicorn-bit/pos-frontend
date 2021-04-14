import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService }  from '../service/category.service';
import { BillingserviceService } from '../service/billingservice.service';
import { EmployeesService } from '../service/employees.service';
import { Billing } from '../models/billing';
import { ItemslistService } from '../service/itemslist.service';

@Component({
  selector: 'app-dashboard',
  providers: [ CategoryService, BillingserviceService, EmployeesService, ItemslistService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public categoryList;
  public categorySend;
  public billing;
  public employee;
  public token;
  public arrayitemsBilling = [];


  constructor( private categoryServices: CategoryService,
    private billingService: BillingserviceService,
    private employeeService: EmployeesService,
    private itemService: ItemslistService,
    private modalService: NgbModal
  ) {
    this.employee = this.employeeService.getIdentity();
    this.token = this.employeeService.getToken();
  }

  getCategory() {
    this.categoryServices.getCategory().subscribe(
      res => {
        this.categoryList = res;
        console.log(this.categoryList);
      }, error => {
        console.log(<any> error);
      }     
    );
  }

  displayMenu(event) {
    const fabs = document.querySelectorAll('.fab');
    let body = document.body;
    const primeId = document.getElementById('prime');
    const primespan = document.querySelector('.prime');
    primespan.classList.add('is-visible');
    primeId.classList.add('is-float');
    const newSpan = document.createElement("span");
    newSpan.className = "ink";
    newSpan.classList.add('animate');
    primeId.insertBefore(newSpan, primespan);
    //clickBtn.classList.add('is-visible');
    fabs.forEach((btn) => {
      btn.classList.add('is-visible');
    });
  }

  getLastBilling(lastBilling){ 
    const lastOrderId = localStorage.getItem('lastOrderId');
    this.billingService.getBilling(this.token, lastOrderId).subscribe(
      res => {
        this.billing = res;
        this.setRecipeItemsFormat(this.billing.recipes_sizes);
      }, error => {
        console.log(<any> error);
      }
    );
    this.modalService.open(lastBilling, { size: 'lg' });
  }

  setRecipeItemsFormat(arrayRecipeItems) {
    this.arrayitemsBilling = [];
    for (let index = 0; index < arrayRecipeItems.length; index++) {
      this.itemService.getItemsById(arrayRecipeItems[index].id).subscribe(
        res => {
          this.arrayitemsBilling.push(res);
        }, error => {
          console.log(<any> error);
        }
      ); 
    }
  }

  removeItem(itemsBilling){
    /*for (let index = 0; index < this.billing.recipes.length; index++) {
      if (itemsBilling.recipe.id === this.billing.recipes[index].id) {
        this.billing.recipes.splice(index, 1);
      }
    }*/
    for (let index = 0; index <  this.billing.recipes_sizes.length; index++) {
      if (itemsBilling.size.id === this.billing.recipes_sizes[index].size && itemsBilling.recipe.id === this.billing.recipes_sizes[index].recipe) {
        this.billing.recipes_sizes.splice(index, 1);
        this.billing.recipes.splice(index, 1);
        this.arrayitemsBilling.splice(index, 1);
      }
    }
    this.billing.purchaseValue = this.billing.purchaseValue - itemsBilling.prices;
    this.updateBilling();
  }

  updateBilling() {
    this.billingService.updateNewbilling(this.billing, this.token, this.billing.id).subscribe(
      res => {
        this.billing = res;
        this.setRecipeItemsFormat(this.billing.recipes_sizes);
      }, error =>{
        console.log(<any> error)

      }
    );
  }

  paidBilling(){
    this.modalService.dismissAll();
    console.log(this.billing);
  }

  assignValue(e){
    this.billing.paid = e.target.checked;
  }

  onClickCategory(event) {
    this.categorySend = event;
  }

  onStart(event) {
    console.log(event);
  }

  ngOnInit(): void {
    this.getCategory();
  }

}
