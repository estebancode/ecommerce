import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './feature/authentication/authentication.module';
import { HomeModule } from './feature/home/home.module';
import { DashboardModule } from './feature/dashboard/dashboard.module';
import { OrdersModule } from './feature/orders/orders.module';
import { StockModule } from './feature/stock/stock.module';
import { PaymentsModule } from './feature/payments/payments.module';
import { ReportsModule } from './feature/reports/reports.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthenticationModule,
    HomeModule,
    BrowserAnimationsModule,
    DashboardModule,
    OrdersModule,
    StockModule,
    PaymentsModule,
    ReportsModule
  ],
  providers: [CookieService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
