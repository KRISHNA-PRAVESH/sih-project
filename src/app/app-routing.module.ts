import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { GraphComponent } from './graph/graph.component';
import { DashTestComponent } from './dash-test/dash-test.component';
import { SmsComponent } from './sms/sms.component';
import { PiechartComponent } from './piechart/piechart.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'location',
    component:LocationComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
