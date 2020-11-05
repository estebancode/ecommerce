import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FilterInventory } from '../models/filter.inventory';

@Injectable({
  providedIn: 'root'
})
export class StockServiceHttp {

  private header = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  public readonly URL_ORDER = `${environment.endpoint}`;

  constructor(private http: HttpClient) { }


get(inventoryFiltered: FilterInventory) {
  const URL = this.buildURL(inventoryFiltered);
  return this.http.get(URL, { headers: this.header });
}

private buildURL(filterInventory: FilterInventory): string {
    return `${this.URL_ORDER}/Shared/GetInventory?dateFilter=${filterInventory.dateFilter}&dateTo=${filterInventory.customerType}`;
}

}
