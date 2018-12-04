import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminPanelService } from '../../admin-panel.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import jsPDF from 'jspdf';
import * as moment from 'moment';

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
  getRowData(row) {
    this.selectedRow = row;
  }

  downloadPdf(row){
    var doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`PAYMENT DETAILS`, 70, 15);
    doc.setFontSize(12);
    doc.text(`${('' + row.id).toUpperCase()}`, 63, 20);
    doc.setFontSize(14);
    doc.text(`date:`, 10, 30);
    doc.text(`${moment(row.created_date).format('DD-MM-YYYY HH:mm')}`, 50, 30);
    doc.text(`status:`, 10, 40);
    doc.text(`${('' + row.status).toUpperCase()}`, 50, 40);
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

}

