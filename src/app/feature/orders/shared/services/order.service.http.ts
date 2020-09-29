import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FilterOrder } from '../models/filter.order';
import { OrderModify } from '../models/modifyorder';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceHttp {

    private header = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    public readonly URL_ORDER = `${environment.endpoint}`;

    constructor(private http: HttpClient) { }


  get(orderFiltered: FilterOrder) {
    const URL = this.buildURL(orderFiltered);
    return this.http.get(URL, { headers: this.header });
  }

  modify(orders: Array<OrderModify>) {
    return this.http.put(`${this.URL_ORDER}/UpdateOrders`,
    orders,
                { headers: this.header });
  }

  private buildURL(orderFiltered: FilterOrder): string {
    let urlFilter = `${this.URL_ORDER}/GetOrders?dateFrom=${orderFiltered.dateFrom}&dateTo=${orderFiltered.dateTo}`;

    if (orderFiltered.PoNumber) {
      urlFilter = `${urlFilter}&poNumber=${orderFiltered.PoNumber}`;
    }

    if (orderFiltered.FacilityCode) {
      urlFilter = `${urlFilter}&facilityCode=${orderFiltered.FacilityCode}`;
    }

    if (orderFiltered.SKU) {
      urlFilter = `${urlFilter}&SKU=${orderFiltered.SKU}`;
    }

    if (orderFiltered.ShippingMethod) {
      urlFilter = `${urlFilter}&shippingMethod=${orderFiltered.ShippingMethod}`;
    }
    return urlFilter;
  }


}
