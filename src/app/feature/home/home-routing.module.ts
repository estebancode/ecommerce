import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SecurityGuard } from '../../core/guard/security.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent ,
    children: [
      {
        path: '',
        loadChildren: '../dashboard/dashboard.module#DashboardModule',
        canActivate: [SecurityGuard]
      },
      {
        path: 'orders',
        loadChildren: '../orders/orders.module#OrdersModule',
        canActivate: [SecurityGuard]
      },
      {
        path: 'stock',
        loadChildren: '../stock/stock.module#StockModule',
        canActivate: [SecurityGuard]
      },
      {
        path: 'payments',
        loadChildren: '../payments/payments.module#PaymentsModule',
        canActivate: [SecurityGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
