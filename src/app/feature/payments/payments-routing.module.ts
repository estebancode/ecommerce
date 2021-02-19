import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadPaymentComponent } from './components/upload-payment/upload-payment.component';


const routes: Routes = [
  {
    path: '',
    component: UploadPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
