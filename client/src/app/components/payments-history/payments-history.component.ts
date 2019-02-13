import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, HostListener } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { ManageItemDialogComponent } from '../../components/dialogs/manage-item-dialog/manage-item.component';
import * as moment from 'moment';
import { AddExpenseDialogComponent } from './add-expense-dialog/add-expense-dialog.component';
import { ImportedDataComponent } from './imported-data/imported-data.component';
import { TransactionsService } from '../../services/transactions.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as jsPDF from 'jspdf';
import { FormBuilder } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Transaction } from '../../shared/exportModels';

@Component({
  selector: 'app-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.css'],
  animations: [trigger('detailExpand', [
    state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
    state('expanded', style({ height: '*' })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ])]
})
export class PaymentsHistoryComponent implements OnInit {

  @Input() displayOnlyTable = false;
  displayColumn = true;
  displayedColumns: string[];
  dataSource = new MatTableDataSource();

  loginRespond = JSON.parse(localStorage.getItem('currentUser'));
  user = {
    id: this.loginRespond.userData.userId,
    firstname: this.loginRespond.userData.firstname,
    lastname: this.loginRespond.userData.lastname
  }

  public selection = new SelectionModel(true, []);

  public selectedRow: any;
  public selectedRowIndex: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() pageSizeOptions = [10, 25, 50];
  @Input() showFirstLastButtons = true;
  constructor(private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private transactionsService: TransactionsService,
    public dialog: MatDialog) {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if (event.target.innerWidth < 600) {
      if (this.displayOnlyTable == false) {
        this.displayedColumns = ['select', 'date', 'amount', 'type'];
        this.displayColumn = false;
      } else {
        this.displayedColumns = ['date', 'amount', 'type'];
        this.displayColumn = false;
      }
    }
    if (event.target.innerWidth > 600) {
      if (this.displayOnlyTable == false) {
        this.displayedColumns = ['select', 'date', 'amount', 'type', 'receiver_name'];
        this.displayColumn = true;
      } else {
        this.displayedColumns = ['date', 'amount', 'type', 'receiver_name'];
        this.displayColumn = true;
      }
    }
  }
  ngOnInit() {
    this.refresh();
    if (window.innerWidth < 600) {
      if (this.displayOnlyTable == false) {
        this.displayedColumns = ['select', 'date', 'amount', 'type'];
        this.displayColumn = false;
      } else {
        this.displayedColumns = ['date', 'amount', 'type'];
        this.displayColumn = false;
      }
    }
    if (window.innerWidth > 600) {
      if (this.displayOnlyTable == false) {
        this.displayedColumns = ['select', 'date', 'amount', 'type', 'receiver_name'];
      } else {
        this.displayedColumns = ['date', 'amount', 'type', 'receiver_name'];
      }
    }
  }

  loading = true;
  refresh() {
    this.transactionsService.getAll().subscribe((res: any) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res.rows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.loading = false;
       }, 800);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public filterType = 'all';

  showNotification(type:string, title:string, content:string, timeOut:number) {
    let options = this.fb.group({
      type: type,
      title: title,
      content: content,
      timeOut: timeOut,
      clickIconToClose: true,
      showProgressBar: false,
      clickToClose: true,
      animate: 'scale'
    }).getRawValue();

    this.notificationsService.create(options.title, options.content, options.type, options);
  }

  generatePdf(transaction: Transaction) {
    var doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`PAYMENT DETAILS`, 70, 15);
    doc.setFontSize(14);
    doc.text(`date:`, 10, 30);
    doc.text(`${moment(transaction.created_date).format('DD-MM-YYYY HH:mm')}`, 50, 30);
    doc.text(`status:`, 10, 40);
    doc.text(`${('' + transaction.status).toUpperCase()}`, 50, 40);
    doc.text(`type:`, 10, 50);
    doc.text(`${transaction.type.toUpperCase()}`, 50, 50);

    doc.text(`sender:`, 10, 65);
    doc.setFontSize(12);
    doc.text(`${transaction.sender_name.toUpperCase()} (${transaction.sender_account_type.toUpperCase()})`, 50, 65);
    doc.setFontSize(14);
    doc.text(`${transaction.sender_account_number.toUpperCase()}`, 50, 73);

    doc.text(`receiver:`, 10, 83);
    doc.setFontSize(12);
    doc.text(`${transaction.receiver_name.toUpperCase()} (${transaction.receiver_account_type.toUpperCase()})`, 50, 83);
    doc.setFontSize(14);
    doc.text(`${transaction.receiver_account_number.toUpperCase()}`, 50, 91);

    doc.text(`description:`, 10, 106);
    doc.text(`${transaction.description.toUpperCase()}`, 50, 106);

    doc.setFontSize(20);
    doc.text(`amount:  ${transaction.amount}`, 140, 125);

    doc.save(`payment_${transaction.created_date}.pdf`);
  }

  getIncoming() {
    this.transactionsService.getIncoming().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.rows);
    })
  }

  getOutgoing() {
    this.transactionsService.getOutgoing().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.rows);
    })
  }

  getRowData(transaction:Transaction) {
    this.selectedRow = transaction;
    this.selectedRowIndex = transaction.id;
  }


  addDialog(): void {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionsService.custom(result).subscribe((result: any) => {
          console.log(result);
          this.showNotification('success', 'Payment', `was just successfully added`, 3000);
          this.refresh();
        });
      }

    });
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(ManageItemDialogComponent, {
      width: '500px',
      data: { title: 'Do you want to hide this payment ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.transactionsService.delete(this.selectedRow.id).subscribe((result: any) => {
          console.log(result);
          this.showNotification('success', 'Payment', `was just successfully hidden`, 3000);
          this.refresh();
        });
      }
    });
  }
}
