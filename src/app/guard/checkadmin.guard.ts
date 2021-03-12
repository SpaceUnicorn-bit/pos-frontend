import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeesService } from '../service/employees.service';
@Injectable({
  providedIn: 'root'
})
export class CheckadminGuard implements CanActivate {
  constructor(private authEmployees: EmployeesService, private router: Router) { }
  canActivate() {
    console.log(this.authEmployees.isLogged());
    if (!this.authEmployees.isLogged()) {
      this.router.navigate(['/Login']);
      return false;
    }

    return true;
  }
  
}
