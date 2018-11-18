import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
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
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.css']
})
export class PaymentsHistoryComponent implements OnInit {

  @Input() displayOnlyTable = false;

  displayedColumns: string[];
  dataSource = new MatTableDataSource();

  loginRespond = JSON.parse(localStorage.getItem('currentUser'));
  user = {
    id: this.loginRespond.userData.userId,
    firstname: this.loginRespond.userData.firstname,
    lastname: this.loginRespond.userData.lastname
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public filterType = 'all';

  getIncoming(){
    this.transactionsService.getIncoming().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.rows);
      console.log(res);
    })
  }

  getOutgoing(){
    this.transactionsService.getOutgoing().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.rows);
      console.log(res);
    })
  }

  public selection = new SelectionModel(true, []);

  public selectedRow: any;
  public selectedRowIndex: any;

  constructor(private transactionsService: TransactionsService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    public canDeactivateGuard: CanDeactivateGuard) {

  }

  ngOnInit() {
    this.refresh();
    if (this.displayOnlyTable == false) {
      this.displayedColumns = ['select', 'date', 'amount', 'type', 'receiver_name', 'title'];
    } else {
      this.displayedColumns = ['date', 'amount', 'type', 'receiver_name', 'title'];
    }
  }
  refresh() {
    this.transactionsService.getAll().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.rows);
      console.log(res);
    })
  }

  getRowData(row) {
    this.selectedRow = row;
    this.selectedRowIndex = row.id;
    console.log(this.selection);
  }


  addDialog(): void {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const dialogRef = this.dialog.open(ImportedDataComponent, {
          width: '500px',
          data: { receipt: result }
        });
      }

    });
  }

  detailsDialog(row) {
    const dialogRef = this.dialog.open(ExpenseDetailsDialogComponent, {
      width: '500px',
      data: { rowData: row }
    });
  }

  deleteDialog(waterMeterId) {
    const dialogRef = this.dialog.open(ManageItemDialogComponent, {
      data: { title: 'Are you sure you want to delete this item ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {

      }
    });
  }
}