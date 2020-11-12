import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProcessedOrder } from '../../shared/models/processed.order';
import { OrderServiceHttp } from '../../shared/services/order.service.http';
import { FilterOrder } from '../../shared/models/filter.order';
import * as moment from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderModify } from '../../shared/models/modifyorder';
import * as lodash from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isSelection: boolean;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select', 'ponumber', 'shippingdate', 'shippingmethodcode', 'shipto',
  'shiptoaddress', 'shiptocity', 'shiptostate', 'shiptozipcode', 'item', 'units', 'sku', 'productname', 'facilitycode', 'giftmessage'];
  dataSource = new MatTableDataSource<ProcessedOrder>();
  modifyOrdersForm: FormGroup;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('modifyOrders') modifyOrders: TemplateRef<any>;
  public searchData: FilterOrder = new FilterOrder();

  findAudit: ProcessedOrder[] = new Array<ProcessedOrder>();

  constructor(private service: OrderServiceHttp,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isSelection = true;
    this.modifyOrdersForm = this.formBuilder.group({
      facilityCode: [''],
      shipTo: [''],
      shippingDate: [''],
      shippingMethod: [''],
      giftMessage: [''],
      shipToAddress: [''],
      shipToCity: [''],
      shipToState: [''],
      units: ['']
    });
  }

  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  select(row: any) {
    this.selection.toggle(row);
  }

  searchOrders() {
    this.searchData.dateFrom = moment(this.searchData.StartDate).format('YYYY-MM-DD').toString();
    this.searchData.dateTo = moment(this.searchData.EndDate).format('YYYY-MM-DD').toString();
    this.service.get(this.searchData).subscribe((response: Array<ProcessedOrder>) => {
      this.findAudit = response;
      this.dataSource = new MatTableDataSource<ProcessedOrder>(this.findAudit);
      this.dataSource.paginator = this.paginator;
    });
  }

  modifyItems() {
    if (this.selection.selected.length > 0) {
      this.dialog.open(this.modifyOrders, { width: '50%', disableClose: true });
    }
  }

  onSubmit() {
    const ordersToModify = new Array<OrderModify>();
    lodash.forEach(this.selection.selected, ((value: ProcessedOrder) => {

      let units = Number(this.formControls.units.value);

      units = units > 0 ? units : null;

      ordersToModify.push(
        new OrderModify(value.poNumber, this.formControls.shippingDate.value, this.formControls.shippingMethod.value,
           this.formControls.shipTo.value, this.formControls.facilityCode.value, this.formControls.giftMessage.value,
           this.formControls.shipToAddress.value, this.formControls.shipToCity.value, this.formControls.shipToState.value,
           units));
    }));
    this.service.modify(ordersToModify).subscribe(() => {
      this.searchOrders();
      this.clearModifyForm();
      this.dialog.closeAll();
    }, () => {
      alert('An error has occurred');
    });
  }

  clearModifyForm() {
    this.modifyOrdersForm.clearValidators();
    this.modifyOrdersForm.reset();
    this.selection.clear();
  }

  get formControls() { return this.modifyOrdersForm.controls; }

}
