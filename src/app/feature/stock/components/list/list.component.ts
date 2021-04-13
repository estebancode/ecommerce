import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StockServiceHttp } from '../../shared/services/stock.service.http';
import { StockRecord } from '../../shared/models/stock.record';
import { FilterInventory } from '../../shared/models/filter.inventory';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import * as lodash from 'lodash';
import { StockModify } from '../../shared/models/modify.stock';
import { CookieService } from 'ngx-cookie-service';

export enum CustomerType {
  CostcoCom = 1001,
  Amazon = 2002,
  Sams = 3003,
  Walmart = 4004,
  LifeIsGood = 5005
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isSelection: boolean;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select', 'slot', 'productName', 'facility', 'inventory'];
  dataSource = new MatTableDataSource<StockRecord>();
  modifyStockForm: FormGroup;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('modifyStock') modifyStock: TemplateRef<any>;
  public searchData: FilterInventory = new FilterInventory();

  findAudit: StockRecord[] = new Array<StockRecord>();

  companyId: number;

  constructor(private service: StockServiceHttp,
              public dialog: MatDialog,
              private cookieService: CookieService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isSelection = true;
    this.companyId =  Number(this.cookieService.get('companyId'));    
    this.modifyStockForm = this.formBuilder.group({
      slot: [''],
      productName: [''],
      facility: [''],
      inventory: ['', [Validators.required]]
    });
  }

  get typeFilters() {
    return CustomerType;
  }

  onTypeFilterChanged(typeFilter: CustomerType) {
    console.log('', typeFilter);
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

  searchStock() {
    this.searchData.dateFilter = moment(this.searchData.dueDate).format('YYYY-MM-DD').toString();
    this.searchData.customerType = this.companyId;
    this.service.get(this.searchData).subscribe((response: Array<StockRecord>) => {
      this.findAudit = response;
      this.dataSource = new MatTableDataSource<StockRecord>(this.findAudit);
      this.dataSource.paginator = this.paginator;
    });
  }

  modifyItems() {
    if (this.selection.selected.length > 0) {
      this.dialog.open(this.modifyStock, { width: '50%', disableClose: true });
    }
  }

  onSubmit() {
    if (this.modifyStockForm.invalid) {
      return;
    }
    const stockToModify = new Array<StockModify>();
    lodash.forEach(this.selection.selected, ((value: StockRecord) => {

      const units = Number(this.formControls.inventory.value);

      stockToModify.push(new StockModify(value.id, units, value.slot, value.facility, value.productName, value.duedate));
    }));
    this.searchData.customerType = this.companyId;
    this.service.modify(stockToModify, this.searchData.customerType).subscribe(() => {
      this.searchStock();
      this.clearModifyForm();
      this.dialog.closeAll();
    }, () => {
      this.clearModifyForm();
      alert('An error has occurred');
    });
  }

  clearModifyForm() {
    this.modifyStockForm.clearValidators();
    this.modifyStockForm.reset();
    this.selection.clear();
  }

  get formControls() { return this.modifyStockForm.controls; }

}
