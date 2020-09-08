import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class OrderServiceHttp {

    private header = new HttpHeaders({
      'Content-Type': 'application/json'
    });

      public readonly URL_ORDER = 'https://cognitiveapidev.azurewebsites.net/api/CostcoCom/GetOrders';

    constructor(private http: HttpClient) { }


  get(startDate: string, endDate: string) {
    return this.http.get(`${this.URL_ORDER}?dateFrom=${startDate}&dateTo=${endDate}`,
                { headers: this.header });
  }


}
