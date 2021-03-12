import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { EmployeesService } from '../service/employees.service';

@Component({
  selector: 'app-login',
  providers: [EmployeesService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public token;
  public identity;
  public admin: User;

  constructor(private router: Router, private adminService: EmployeesService) {
    this.token = this.adminService.getToken();
    this.identity = this.adminService.getIdentity();
    this.admin = new User('', '', '');
  }

  login() {
    this.adminService.login(this.admin.user, this.admin.password).subscribe(
      res => {
        this.token = res.jwt;
        this.identity = res.user;
        localStorage.setItem('token', this.token);
        localStorage.setItem('identity', JSON.stringify(this.identity));
        this.router.navigate(['/']);
      }, error => {
        console.log(<any> error);
      }
    );
  }

  ngOnInit(): void {
  }

}
