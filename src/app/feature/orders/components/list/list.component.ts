import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProcessedOrder } from '../../shared/models/processed.order';
import { OrderServiceHttp } from '../../shared/services/order.service.http';
import { FilterOrder } from '../../shared/models/filter.order';
import * as moment from 'moment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  displayedColumns: string[] = ['ponumber', 'shippingdate', 'shippingmethodcode', 'shipto',
  'shiptoaddress','shiptocity','shiptostate','shiptozipcode','item','units','sku','productname','facilitycode'];
  dataSource = new MatTableDataSource<ProcessedOrder>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public searchData: FilterOrder = new FilterOrder();

  findAudit: ProcessedOrder[] = new Array<ProcessedOrder>();

  constructor(private service: OrderServiceHttp) { }

  ngOnInit(): void {
  }

  searchOrders() {
    const startDate = moment(this.searchData.StartDate).format('YYYY-MM-DD').toString();
    const endDate = moment(this.searchData.EndDate).format('YYYY-MM-DD').toString();
    this.service.get(startDate,
    endDate).subscribe((response: any) => {
      console.log(response.result[0]);
      this.findAudit = response.result[0];
      this.dataSource = new MatTableDataSource<ProcessedOrder>(this.findAudit);
      this.dataSource.paginator = this.paginator;
    });
  }

}
