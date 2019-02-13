import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminPanelService } from '../../admin-panel.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import * as jsPDF from 'jspdf';
import * as moment from 'moment';
import { Transaction } from '../../../shared/exportModels';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = ['select','created_date', 'id', 'type', 'amount'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public selection = new SelectionModel(true, []);

  constructor(
    private service: AdminPanelService) {
  }

  ngOnInit() {
    this.service.getAllTransactions().subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res.rows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  selectedRow:any;
  getRowData(transaction:Transaction) {
    this.selectedRow = transaction;
  }

  downloadPdf(transaction:Transaction){
    var doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`PAYMENT DETAILS`, 70, 15);
    doc.setFontSize(12);
    doc.text(`${('' + transaction.id).toUpperCase()}`, 63, 20);
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

}

