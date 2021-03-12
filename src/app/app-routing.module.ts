import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckadminGuard } from './guard/checkadmin.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [CheckadminGuard]},
  { path: 'billing', component: BillingComponent},
  //{ path: 'dashboard', component: DashboardComponent, canActivate: [CheckadminGuard]},
  { path: 'Login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
