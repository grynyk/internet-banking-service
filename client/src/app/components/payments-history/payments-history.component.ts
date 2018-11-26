import { Component, OnInit, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { ManageItemDialogComponent } from '../../components/dialogs/manage-item-dialog/manage-item.component';
import * as model from '../../shared/exportModels'
import * as moment from 'moment';
import { AddExpenseDialogComponent } from './add-expense-dialog/add-expense-dialog.component';
import { ImportedDataComponent } from './imported-data/imported-data.component';
import { TransactionsService } from '../../services/transactions.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import jsPDF from 'jspdf';
import { FormBuilder } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
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

  public selection = new SelectionModel(true, []);

  public selectedRow: any;
  public selectedRowIndex: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() pageSizeOptions = [10, 25, 50];
  @Input() showFirstLastButtons = true;
  constructor(private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private transactionsService: TransactionsService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    public canDeactivateGuard: CanDeactivateGuard) {

  }

  ngOnInit() {
    this.refresh();
    if (this.displayOnlyTable == false) {
      this.displayedColumns = ['select', 'date', 'amount', 'type', 'receiver_name'];
    } else {
      this.displayedColumns = ['date', 'amount', 'type', 'receiver_name'];
    }
  }
  refresh() {
    this.transactionsService.getAll().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.rows);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public filterType = 'all';

  showNotification(type,title,content,timeOut){
    let options= this.fb.group({
			type: type,
			title: title,
			content: content,
      timeOut: timeOut,
      clickIconToClose:true,
      showProgressBar:false,
			clickToClose: true,
			animate: 'scale'
    }).getRawValue();

    this.notificationsService.create(options.title, options.content,options.type,options);
  }

  generatePdf(row) {
    var doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`PAYMENT DETAILS`, 70, 15);
    doc.setFontSize(14);
    doc.text(`date:`, 10, 30);
    doc.text(`${moment(row.created_date).format('DD-MM-YYYY HH:mm')}`, 50, 30);
    doc.text(`status:`, 10, 40);
    doc.text(`${(''+row.status).toUpperCase()}`, 50, 40);
    doc.text(`type:`, 10, 50);
    doc.text(`${row.type.toUpperCase()}`, 50, 50);

    doc.text(`sender:`, 10, 65);
    doc.setFontSize(12);
    doc.text(`${row.sender_name.toUpperCase()} (${row.sender_account_type.toUpperCase()})`, 50, 65);
    doc.setFontSize(14);
    doc.text(`${row.sender_account_number.toUpperCase()}`, 50, 73);

    doc.text(`receiver:`, 10, 83);
    doc.setFontSize(12);
    doc.text(`${row.receiver_name.toUpperCase()} (${row.receiver_account_type.toUpperCase()})`, 50, 83);
    doc.setFontSize(14);
    doc.text(`${row.receiver_account_number.toUpperCase()}`, 50, 91);

    doc.text(`description:`, 10, 106);
    doc.text(`${row.description.toUpperCase()}`, 50, 106);

    doc.setFontSize(20);
    doc.text(`amount:  ${row.amount}`, 140, 125);

    doc.save(`payment_${row.created_date}.pdf`);
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

  getRowData(row) {
    this.selectedRow = row;
    this.selectedRowIndex = row.id;
  }


  addDialog(): void {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionsService.custom(result).subscribe((result: any) => {
          console.log(result);
          this.showNotification('success','Payment',`was just successfully added`,8000);
          this.refresh();
        });
      }

    });
  }

  deleteDialog(waterMeterId) {
    const dialogRef = this.dialog.open(ManageItemDialogComponent, {
      data: { title: 'Are you sure you want to hide this payment' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.transactionsService.delete(this.selectedRow.id).subscribe((result: any) => {
          console.log(result);
          this.showNotification('success','Payment',`was just successfully hidden`,8000);
          this.refresh();
        });
      }
    });
  }
}
