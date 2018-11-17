import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MoneyBoxesDialogComponent } from './money-boxes-dialog/money-boxes-dialog.component';
import { CreateAccountDialogComponent } from './create-account-dialog/create-account-dialog.component';
import { AccountsService } from '../../services/accounts.service';
import { ErrorHandlerDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { PaymentsDialogComponent } from './payments-dialog/payments-dialog.component';
import { TransactionsService } from '../../services/transactions.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private transactionsService:TransactionsService,
    private accountsService: AccountsService,
    private matIconRegistry: MatIconRegistry,
    private router: Router,
    public dialog: MatDialog,
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
      "moneybox",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/moneybox.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "addacc",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/addacc.svg")
    );
  }

  primaryAccount = new Array();
  savingsAccount = new Array();

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.accountsService.getAll().subscribe((result: any) => {
      if (result.rowCount !== 0) {
        this.primaryAccount = result.rows.filter(res => res.type == 'primary_account');
        this.savingsAccount = result.rows.filter(res => res.type == 'savings_account');
      }
    });
  }


  openPrimary() {
    if (this.primaryAccount.length !== 0) {

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
              console.log(result);
            });
          }
        }
      });
    }
  }

  openSavings() {
    if (this.savingsAccount.length !== 0) {

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
              console.log(result);
            });
          }
        }
      });
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
        this.refresh();
      });
    } else if (type == 'savings_account') {
      countedAmountToDeposit = +this.savingsAccount[0].balance + +amount;
      accountIdToDeposit = this.savingsAccount[0].id;
      this.accountsService.savingsUpdate(accountIdToDeposit, countedAmountToDeposit).subscribe((result: any) => {
        this.accountTypeToDeposit = '';
        this.amountToDeposit = null;
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
          this.refresh();
        });
      } else {
        const dialogRef = this.dialog.open(ErrorHandlerDialogComponent, {
          disableClose: true,
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
          this.refresh();
        });
      } else {
        const dialogRef = this.dialog.open(ErrorHandlerDialogComponent, {
          disableClose: true,
          data: { title: "You don't have enough funds", message: "Choose another amount please", button: "OK" },
        });
      }
    }
  }


  openExpensesHistory() {
    this.router.navigate(['/manage-expenses-history']);
  }

  paymentType: string;
  openTransactions(type) {
    const dialogRef = this.dialog.open(PaymentsDialogComponent, {
      width: '850px',
      disableClose: true,
      data: { type: type }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let accountNo = result[2].slice(0, 8) + "-" + result[2].slice(8,12) + "-" + result[2].slice(12,16) + "-" + result[2].slice(16,20) + "-" + result[2].slice(20,32);
        
        let data = {
          amount: result[0],
          description:result[1],
          receiverAccountNo:accountNo,
          senderAccountType:result[3]
        }
      
      if(type=='external'){
        this.transactionsService.external(data).subscribe((result: any) => {
          this.refresh();
        });
      }

      if(type=='domestic'){
        this.transactionsService.domestic(data).subscribe((result: any) => {
          this.refresh();
        });
      }
      }
    });
  }

}
