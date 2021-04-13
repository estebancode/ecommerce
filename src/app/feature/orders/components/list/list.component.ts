import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProcessedOrder } from '../../shared/models/processed.order';
import { OrderServiceHttp } from '../../shared/services/order.service.http';
import { FilterOrder } from '../../shared/models/filter.order';
import * as moment from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderModify } from '../../shared/models/modifyorder';
import * as lodash from 'lodash';
import { OrderSave } from '../../shared/models/addorder';
import { constantsParameter } from '@shared/constants/globalVariables';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isSelection: boolean;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select', 'ponumber', 'shippingdate', 'shippingmethodcode', 'shipto',
  'shiptoaddress', 'shiptocity', 'shiptostate', 'shiptozipcode', 'item', 'units', 'sku', 'productname',
  'facilitycode', 'isPacked', 'giftmessage'];
  dataSource = new MatTableDataSource<ProcessedOrder>();
  modifyOrdersForm: FormGroup;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('modifyOrders') modifyOrders: TemplateRef<any>;
  public searchData: FilterOrder = new FilterOrder();
  totalUnits: number;

  findAudit: ProcessedOrder[] = new Array<ProcessedOrder>();

  @ViewChild('manualOrders') manualOrders: TemplateRef<any>;
  manualOrdersForm: FormGroup;

  unitPrice: number;

  companyId: number;


  constructor(private service: OrderServiceHttp,
              public dialog: MatDialog,
              private cookieService: CookieService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isSelection = true;
    this.totalUnits = 0;
    this.companyId =  Number(this.cookieService.get('companyId'));
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

    this.manualOrdersForm = this.formBuilder.group({
      facilityCode: [null,Validators.required],
      shipTo: [null,Validators.required],
      shippingDate: [null,Validators.required],
      shippingMethod: [null,Validators.required],
      giftMessage: [null,Validators.required],
      shipToAddress: [null,Validators.required],
      shipToCity: [null,Validators.required],
      shipToState: [null,Validators.required],
      units: [null,Validators.required],
      poNumber: [null,Validators.required],
      productName: [null,Validators.required],
      sku: [null,Validators.required],
      item: [null,Validators.required],
      unitPrice: [null,Validators.required]
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
    this.showSelectedUnits();
  }

  select(row: any) {
    this.selection.toggle(row);
    this.showSelectedUnits();
  }

  showSelectedUnits() {
    const units = lodash.sumBy(this.selection.selected, 'units');
    alert('Selected Units: ' + units);
  }

  searchOrders() {
    this.searchData.dateFrom = moment(this.searchData.StartDate).format('YYYY-MM-DD').toString();
    this.searchData.dateTo = moment(this.searchData.EndDate).format('YYYY-MM-DD').toString();
    this.searchData.companyId = this.companyId;
    this.service.get(this.searchData).subscribe((response: Array<ProcessedOrder>) => {
      this.findAudit = response;
      this.dataSource = new MatTableDataSource<ProcessedOrder>(this.findAudit);
      this.totalUnits = lodash.sumBy(this.findAudit, 'units');
      this.dataSource.paginator = this.paginator;
    });
  }

  modifyItems() {
    if (this.selection.selected.length > 0) {
      this.dialog.open(this.modifyOrders, { width: '50%', disableClose: true });
    }
  }

  onSubmit() {
    const ordersToModify = new Array<any>();
    lodash.forEach(this.selection.selected, ((value: ProcessedOrder) => {

      const order = new OrderModify(value.poNumber, this.formControls.shippingDate.value, this.formControls.shippingMethod.value,
        this.formControls.shipTo.value, this.formControls.facilityCode.value, this.formControls.giftMessage.value,
        this.formControls.shipToAddress.value, this.formControls.shipToCity.value, this.formControls.shipToState.value, value.sku);
        order.units = Number(this.formControls.units.value);
        const orderToModify = this.formControls.units.value === ''  ? order.createWithoutUnits(order) : order;
      ordersToModify.push(orderToModify);
    }));
    this.service.modify(ordersToModify,this.companyId).subscribe(() => {
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

  clearAddForm() {
    this.manualOrdersForm.clearValidators();
    this.manualOrdersForm.reset();
  }

  add() {
    this.clearAddForm();
    this.dialog.open(this.manualOrders, { 
      width: '100%',
      disableClose: true,
      autoFocus: false,
    }); 
  }

  saveOnSubmit() {
    if (this.manualOrdersForm.valid) {
      const ordersToSave = new Array<any>();
  
      const order = new OrderSave(this.formManualControls.poNumber.value,
          this.formManualControls.shippingDate.value, this.formManualControls.shippingMethod.value,
          this.formManualControls.shipTo.value, this.formManualControls.facilityCode.value,
          this.formManualControls.giftMessage.value, this.formManualControls.shipToAddress.value,
          this.formManualControls.shipToCity.value, this.formManualControls.shipToState.value,
          Number(this.formManualControls.units.value), this.formManualControls.sku.value,
          this.formManualControls.item.value, parseFloat(this.unitPrice.toString()),
          this.formManualControls.productName.value);

      ordersToSave.push(order);

      this.service.add(ordersToSave).subscribe(() => {
        this.clearAddForm();
        this.dialog.closeAll();
        alert('Successfully saved');
      }, () => {
        alert('An error has occurred');
      });
    }
  }

  updateTotal(event) {
    this.unitPrice = event.target.value;
  }

  get formControls() { return this.modifyOrdersForm.controls; }
  get formManualControls() { return this.manualOrdersForm.controls; }

}
