import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { UploadPaymentComponent } from './components/upload-payment/upload-payment.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [UploadPaymentComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaymentsRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentsModule { }
