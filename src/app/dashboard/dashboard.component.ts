import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

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
    console.log(body);
    fabs.forEach((btn) => {
      btn.classList.add('is-visible');
    });
  }

  ngOnInit(): void {
  }

}
