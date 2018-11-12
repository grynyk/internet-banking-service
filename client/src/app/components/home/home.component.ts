import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MoneyBoxesDialogComponent } from './money-boxes-dialog/money-boxes-dialog.component';
import { AccountInfoDialogComponent } from './account-info-dialog/account-info-dialog.component';
import { CreateAccountDialogComponent } from './create-account-dialog/create-account-dialog.component';
import { AccountsService } from '../../services/accounts.service';
import { ErrorHandlerDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private accountsService: AccountsService,
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
        this.primaryAccount = result.rows.filter(res => res.type == 'primary');
        this.savingsAccount = result.rows.filter(res => res.type == 'savings');
      }
    });
  }


  openPrimary() {
    if (this.primaryAccount.length !== 0) {

    } else {
      const dialogRef = this.dialog.open(CreateAccountDialogComponent, {
        width: '600px',
        data: { primary: true, savings: false }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result == 'primary') {
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
        data: { primary: false, savings: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result == 'savings') {
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
    if (type == 'primary') {
      countedAmountToDeposit = +this.primaryAccount[0].balance + +amount;
      accountIdToDeposit = this.primaryAccount[0].id;
      this.accountsService.primaryUpdate(accountIdToDeposit, countedAmountToDeposit).subscribe((result: any) => {
        console.log(result);
        this.refresh();
      });
    } else if (type == 'savings') {
      countedAmountToDeposit = +this.savingsAccount[0].balance + +amount;
      accountIdToDeposit = this.savingsAccount[0].id;
      this.accountsService.savingsUpdate(accountIdToDeposit, countedAmountToDeposit).subscribe((result: any) => {
        console.log(result);
        this.refresh();
      });
    }
  }

  accountTypeToWithdraw: String;
  amountToWithdraw: number;
  withdrawMoney(type, amount) {
    let countedAmountToWithdraw: number;
    let accountIdToWithdraw: any;
    if (type == 'primary') {
      countedAmountToWithdraw = +this.primaryAccount[0].balance - +amount;
      accountIdToWithdraw = this.primaryAccount[0].id;
      if (countedAmountToWithdraw >= 0) {
        this.accountsService.primaryUpdate(accountIdToWithdraw, countedAmountToWithdraw.toFixed(2)).subscribe((result: any) => {
          console.log(result);
          this.refresh();
        });
      } else {
        const dialogRef = this.dialog.open(ErrorHandlerDialogComponent, {
          disableClose: true,
          data: { title: "You don't have enough funds", message: "Choose another amount please", button: "OK" },
        });
      }
    } else if (type == 'savings') {
      countedAmountToWithdraw = +this.savingsAccount[0].balance - +amount;
      accountIdToWithdraw = this.savingsAccount[0].id;
      if (countedAmountToWithdraw > -1) {
        
        this.accountsService.savingsUpdate(accountIdToWithdraw, countedAmountToWithdraw.toFixed(2)).subscribe((result: any) => {
          console.log(result);
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

  openMoneyBoxes() {
    const dialogRef = this.dialog.open(MoneyBoxesDialogComponent, {
      width: '70%'
    });
  }

}
