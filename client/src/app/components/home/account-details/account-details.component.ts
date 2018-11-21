import { Component, Inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatTableDataSource, MatPaginator, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { TransactionsService } from '../../../services/transactions.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  displayedColumns = ['date', 'type', 'amount']
  dataSource = new MatTableDataSource();
  constructor(private transactionsService: TransactionsService,
    private bottomSheetRef: MatBottomSheetRef<AccountDetailsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data) { }

  loginRespond = JSON.parse(localStorage.getItem('currentUser'));
  user = {
    id: this.loginRespond.userData.userId,
    firstname: this.loginRespond.userData.firstname,
    lastname: this.loginRespond.userData.lastname
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data.transactions);
    this.dataSource.paginator = this.paginator;
  }

  closeBottomSheet() {
    this.bottomSheetRef.dismiss();
  }

}

