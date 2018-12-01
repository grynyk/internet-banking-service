import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialog, MatBottomSheet } from '@angular/material';
import { Router } from '@angular/router';
import { CreateAccountDialogComponent } from './create-account-dialog/create-account-dialog.component';
import { AccountsService } from '../../services/accounts.service';
import { ErrorHandlerDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { PaymentsDialogComponent } from './payments-dialog/payments-dialog.component';
import { TransactionsService } from '../../services/transactions.service';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { NotificationsService } from 'angular2-notifications';
import { FormBuilder } from '@angular/forms';
import { StatisticsService } from '../../services/statistics.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginRespond = JSON.parse(localStorage.getItem('currentUser'));
  user = {
    id: this.loginRespond.userData.userId,
    firstname: this.loginRespond.userData.firstname,
    lastname: this.loginRespond.userData.lastname
  }
  @ViewChild('transactionsHistory') transactionsHistory;

  constructor(private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private transactionsService: TransactionsService,
    private accountsService: AccountsService,
    private statisticsService:StatisticsService,
    private matIconRegistry: MatIconRegistry,
    private router: Router,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private changeDetectorRef: ChangeDetectorRef,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "primaryacc",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/primaryacc.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "savingsacc",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/savingsacc.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "statistics",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/statistics.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "addacc",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/addacc.svg")
    );
  }

  primaryAccount = new Array();
  savingsAccount = new Array();
  todaySpendings:any;

  loading = true;

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
  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.statisticsService.getToday().subscribe((res: any) => {
      console.log(res);
      this.todaySpendings = res.spendings;

     
    });
    this.accountsService.getAll().subscribe((result: any) => {
      console.log(result);
      if (result.rowCount !== 0) {
        this.primaryAccount = result.rows.filter(res => res.type == 'primary_account');
        this.savingsAccount = result.rows.filter(res => res.type == 'savings_account');
        this.transactionsHistory.refresh();
      }
      setTimeout(res => {
        this.loading = false;
       }, 800);
    });
  }


  openPrimary() {
    if (this.primaryAccount.length !== 0) {
      this.transactionsService.getAll().subscribe((res: any) => {
        let primaryTransactions = res.rows.filter(row => (row.sender_account_type == 'primary_account' || row.receiver_account_type == 'primary_account')&&(row.sender_uuid == this.user.id || row.receiver_uuid == this.user.id));
        this.bottomSheet.open(AccountDetailsComponent,{
          data:{ transactions:primaryTransactions,accountInfo:this.primaryAccount}
        });
      });
    } else {
      const dialogRef = this.dialog.open(CreateAccountDialogComponent, {
        width: '600px',
        data: { primary_account: true, savings_account: false }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result == 'primary_account') {
            this.accountsService.primaryCreate().subscribe((result: any) => {
              this.refresh();
            });
          }
        }
      });
    }
  }

  openSavings() {
    if (this.savingsAccount.length !== 0) {
      this.transactionsService.getAll().subscribe((res: any) => {
        let savingsTransactions = res.rows.filter(row => (row.sender_account_type == 'savings_account' || row.receiver_account_type == 'savings_account')&&(row.sender_uuid == this.user.id || row.receiver_uuid == this.user.id));

        this.bottomSheet.open(AccountDetailsComponent,{
          data:{ transactions:savingsTransactions,accountInfo:this.savingsAccount}
        });
      });

    } else {
      const dialogRef = this.dialog.open(CreateAccountDialogComponent, {
        width: '600px',
        data: { primary_account: false, savings_account: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result == 'savings_account') {
            this.accountsService.savingsCreate().subscribe((result: any) => {
              this.refresh();
            });
          }
        }
      });
    }
  }

  keyPress(event: any) {
    const pattern = /[$\&\+\,\=\?\@\|\<\>\^\%\!\"\_\`\~\-\e\E]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  accountTypeToDeposit: String;
  amountToDeposit: number;
  depositMoney(type, amount) {
    let countedAmountToDeposit: number;
    let accountIdToDeposit: any;
    if (type == 'primary_account') {
      countedAmountToDeposit = +this.primaryAccount[0].balance + +amount;
      accountIdToDeposit = this.primaryAccount[0].id;
      this.accountsService.primaryUpdate(accountIdToDeposit, countedAmountToDeposit).subscribe((result: any) => {
        this.accountTypeToDeposit = '';
        this.amountToDeposit = null;
        this.showNotification('success','Deposit',`was just successfully processed`,8000);
        this.refresh();
      });
    } else if (type == 'savings_account') {
      countedAmountToDeposit = +this.savingsAccount[0].balance + +amount;
      accountIdToDeposit = this.savingsAccount[0].id;
      this.accountsService.savingsUpdate(accountIdToDeposit, countedAmountToDeposit).subscribe((result: any) => {
        this.accountTypeToDeposit = '';
        this.amountToDeposit = null;
        this.showNotification('success','Deposit',`was just successfully processed`,8000);
        this.refresh();
      });
    }
  }

  accountTypeToWithdraw: String;
  amountToWithdraw: number;
  withdrawMoney(type, amount) {
    let countedAmountToWithdraw: number;
    let accountIdToWithdraw: any;
    if (type == 'primary_account') {
      countedAmountToWithdraw = +this.primaryAccount[0].balance - +amount;
      accountIdToWithdraw = this.primaryAccount[0].id;
      if (countedAmountToWithdraw >= 0) {
        this.accountsService.primaryUpdate(accountIdToWithdraw, countedAmountToWithdraw.toFixed(2)).subscribe((result: any) => {
          this.accountTypeToWithdraw = '';
          this.amountToWithdraw = null;
          this.showNotification('success','Withdrawal',`was just successfully processed`,8000);
          this.refresh();
        });
      } else {
        const dialogRef = this.dialog.open(ErrorHandlerDialogComponent, {
          disableClose: true,
          width:'500px',
          data: { title: "You don't have enough funds", message: "Choose another amount please", button: "OK" },
        });
      }
    } else if (type == 'savings_account') {
      countedAmountToWithdraw = +this.savingsAccount[0].balance - +amount;
      accountIdToWithdraw = this.savingsAccount[0].id;
      if (countedAmountToWithdraw > -1) {
        this.accountsService.savingsUpdate(accountIdToWithdraw, countedAmountToWithdraw.toFixed(2)).subscribe((result: any) => {
          this.accountTypeToWithdraw = '';
          this.amountToWithdraw = null;
          this.showNotification('success','Withdrawal',`was just successfully processed`,8000);
          this.refresh();
        });
      } else {
        const dialogRef = this.dialog.open(ErrorHandlerDialogComponent, {
          disableClose: true,
          width:'500px',
          data: { title: "You don't have enough funds", message: "Choose another amount please", button: "OK" },
        });
      }
    }
  }

  paymentType: string;
  openTransactions(type) {
    const dialogRef = this.dialog.open(PaymentsDialogComponent, {
      width: '650px',
      disableClose: true,
      data: { type: type, primary: this.primaryAccount.length == 0, savings: this.savingsAccount.length == 0 }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let accountNo = result[2].slice(0, 8) + "-" + result[2].slice(8, 12) + "-" + result[2].slice(12, 16) + "-" + result[2].slice(16, 20) + "-" + result[2].slice(20, 32);
        if (type == 'external') {
          let externalData = {
            amount: result[0],
            description: result[1],
            receiverAccountNo: accountNo,
            senderAccountType: result[3],
            receiverName: result[4]
          }
          this.transactionsService.external(externalData).subscribe((result: any) => {
            this.paymentType = undefined;
            this.showNotification('success','Transaction',`was just successfully processed`,8000);
            this.refresh();
          });
        }

        if (type == 'domestic') {
          let domesticData = {
            amount: result[0],
            description: result[1],
            receiverAccountNo: accountNo,
            senderAccountType: result[3]
          }
          this.transactionsService.domestic(domesticData).subscribe((result: any) => {
            this.paymentType = undefined;
            this.showNotification('success','Transaction',`was just successfully processed`,8000);
            this.refresh();
          });
        }

        if (type == 'transfer') {
          const transferData = {
            fromAccount:result[1],
            toAccount:result[2],
            amount:result[0],
            description:result[3]
          }
            this.transactionsService.transfer(transferData).subscribe(res =>{
                this.showNotification('success','Transfer',`was just successfully processed`,8000);
               this.refresh();
              })
        }
      }
    });
  }

}
