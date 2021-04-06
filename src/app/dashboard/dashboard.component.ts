import { Component, OnInit } from '@angular/core';
import { CategoryService }  from '../service/category.service';

@Component({
  selector: 'app-dashboard',
  providers: [ CategoryService ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public categoryList;
  public categorySend;


  constructor( private categoryServices: CategoryService) { }

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
