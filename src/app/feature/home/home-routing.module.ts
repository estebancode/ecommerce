import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent ,
    children: [
      {
        path: '',
        loadChildren: '../dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'orders',
        loadChildren: '../orders/orders.module#OrdersModule'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
