import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from '@shared/shared.module';
import { MatCurrencyFormatModule } from 'mat-currency-format';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    MatCurrencyFormatModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrdersModule { }
