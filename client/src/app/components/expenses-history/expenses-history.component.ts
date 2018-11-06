import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { ManageItemDialogComponent } from '../../components/dialogs/manage-item-dialog/manage-item.component';
import * as model from '../../shared/exportModels'
import * as moment from 'moment';
import { AddExpenseDialogComponent } from './add-expense-dialog/add-expense-dialog.component';
import { ExpenseDetailsDialogComponent } from './expense-details-dialog/expense-details-dialog.component';
import { ImportedDataComponent } from './imported-data/imported-data.component';

const ELEMENT_DATA = [
  { position: 1, name: 'Water', type:"grocery store", date: "27.10.2018 15:25", location: 'Krakow' ,price:"12 PLN" },
  { position: 2, name: 'Bread', type:"grocery store", date: "27.10.2018 15:07", location: 'Krakow' ,price:"15 PLN" },
  { position: 3, name: 'Mars', type:"grocery store", date: "27.10.2018 15:08", location: 'Krakow' ,price:"19 PLN" },
  { position: 4, name: 'Chocolate', type:"grocery store", date: "27.10.2018 15:09", location: 'Krakow' ,price:"2 PLN" },
  { position: 5, name: 'Water', type:"grocery store", date: "27.10.2018 15:10", location: 'Krakow' ,price:"23 PLN" },
  { position: 6, name: 'Soda', type:"grocery store", date: "27.10.2018 15:17", location: 'Krakow' ,price:"1 PLN" },
  { position: 7, name: 'Meat', type:"grocery store", date: "27.10.2018 15:50", location: 'Krakow' ,price:"5 PLN" },
  { position: 8, name: 'Chair', type:"ganiture store", date: "27.10.2018 15:13", location: 'Krakow' ,price:"199 PLN" },
  { position: 9, name: 'Ciggaretes', type:"grocery store", date: "27.10.2018 14:40", location: 'Krakow' ,price:"10 PLN" }
];

@Component({
  selector: 'app-expenses-history',
  templateUrl: './expenses-history.component.html',
  styleUrls: ['./expenses-history.component.css']
})
export class ExpensesHistoryComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position', 'date', 'name','type', 'location', 'price'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public selection = new SelectionModel(true, []);

  public selectedRow: any;
  public selectedRowOverlayId: number;
  public selectedRowWaterMeterId: number;
  public selectedRowIndex: number;
  public selectedRowPlace = '';


  constructor(public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    public canDeactivateGuard: CanDeactivateGuard) {

  }

  ngOnInit() {
    this.refresh();
  }
  refresh() {
 

  }

  getRowData(row) {
    this.selectedRow = row;
    this.selectedRowPlace = row.street;
    this.selectedRowOverlayId = row.overlayId;
    this.selectedRowIndex = row.position;
    this.selectedRowWaterMeterId = row.waterMeterId;
    console.log(this.selection);
  }


  addExpense(): void {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const dialogRef = this.dialog.open(ImportedDataComponent, {
          width: '500px',
          data:{receipt:result}
        });
      }

    });
  }

  expenseDetails(row) {
    const dialogRef = this.dialog.open(ExpenseDetailsDialogComponent, {
      width: '500px',
      data: { rowData: row }
    });
  }

  expenseDelete(waterMeterId) {
    const dialogRef = this.dialog.open(ManageItemDialogComponent, {
      data: { title: 'Are you sure you want to delete this item ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {

      }
    });
  }
}
