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
import { ManageItemDialogComponent } from '../dialogs/manage-item-dialog/manage-item.component';
import { User } from '../../shared/models/User';
import { Account, Transaction } from '../../shared/exportModels';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginRespond = JSON.parse(localStorage.getItem('currentUser'));

  user:User = {
    id: this.loginRespond.userData.userId,
    firstname: this.loginRespond.userData.firstname,
    lastname: this.loginRespond.userData.lastname
  }

  @ViewChild('transactionsHistory') transactionsHistory:any;

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

  showNotification(type:string ,title:string, content:string ,timeOut:number){
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
        this.primaryAccount = result.rows.filter((account:Account) => account.type == 'primary_account');
        this.savingsAccount = result.rows.filter((account:Account) => account.type == 'savings_account');
        this.transactionsHistory.refresh();
      }
      setTimeout(() => {
        this.loading = false;
       }, 800);
    });
  }


  openPrimary() {
    if (this.primaryAccount.length !== 0) {
      this.transactionsService.getAll().subscribe((res: any) => {
        let primaryTransactions = res.rows.filter((transaction:Transaction) => (transaction.sender_account_type == 'primary_account' || transaction.receiver_account_type == 'primary_account')&&(transaction.sender_uuid == this.user.id || transaction.receiver_uuid == this.user.id));
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
        let savingsTransactions = res.rows.filter((transaction:Transaction) => (transaction.sender_account_type == 'savings_account' || transaction.receiver_account_type == 'savings_account')&&(transaction.sender_uuid == this.user.id || transaction.receiver_uuid == this.user.id));

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
  depositMoney(type:string , amount:number) {
    if (type == 'primary_account') {
      this.accountsService.primaryDeposit(this.primaryAccount[0].id, amount).subscribe((result: any) => {
        this.accountTypeToDeposit = '';
        this.amountToDeposit = null;
        this.showNotification('success','Deposit',`was just successfully processed`,3000);
        this.refresh();
      });
    }
    
    if (type == 'savings_account') {
      this.accountsService.savingsDeposit(this.savingsAccount[0].id, amount).subscribe((result: any) => {
        this.accountTypeToDeposit = '';
        this.amountToDeposit = null;
        this.showNotification('success','Deposit',`was just successfully processed`,3000);
        this.refresh();
      });
    }
  }

  accountTypeToWithdraw: String;
  amountToWithdraw: number;
  withdrawMoney(type:string, amount:number) {
    if (type == 'primary_account') {
        this.accountsService.primaryWithdraw(this.primaryAccount[0].id, amount).subscribe((result: any) => {
          this.accountTypeToWithdraw = '';
          this.amountToWithdraw = null;
          this.showNotification('success','Withdrawal',`was just successfully processed`,3000);
          this.refresh();
        });
      }

      if (type == 'savings_account') {
        const dialogRef = this.dialog.open(ManageItemDialogComponent, {
          width: '500px',
          data: { title: `We will take 0.15% (${(amount*0.0015).toFixed(2)}) as commission , Do you Agree ? ` }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result == true) {
            this.accountsService.savingsWithdraw(this.savingsAccount[0].id, amount).subscribe((result: any) => {
              this.accountTypeToWithdraw = '';
              this.amountToWithdraw = null;
              this.showNotification('success','Withdrawal',`was just successfully processed`,3000);
              this.refresh();
            });
          }
        });
    }
  }

  paymentType: string;
  processTransactions(type:string) {
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
            this.showNotification('success','Transaction',`was just successfully processed`,3000);
            this.refresh();
          });
        }

        if (type == 'domestic') {
          let domesticData = {
            amount: result[0],
            description: result[1],
            receiverAccountNo: accountNo,
            senderAccountType: result[3]
          };
            if(result[3]=='savings_account'){
              const dialogRef = this.dialog.open(ManageItemDialogComponent, {
                width: '500px',
                data: { title: `We will take 0.15% (${(domesticData.amount*0.0015).toFixed(2)}) as commission , Do you Agree ? ` }
              });
          
              dialogRef.afterClosed().subscribe(result => {
                if (result == true) {
                  this.transactionsService.domestic(domesticData).subscribe((result: any) => {
                    this.paymentType = undefined;
                    this.showNotification('success','Transaction',`was just successfully processed`,3000);
                    this.refresh();
                  });
                }else{
                  const dialogRef = this.dialog.open(PaymentsDialogComponent, {
                    width: '650px',
                    disableClose: true,
                    data: { type: type, primary: this.primaryAccount.length == 0, savings: this.savingsAccount.length == 0 }
                  });
                }
              });
            }else{
              this.transactionsService.domestic(domesticData).subscribe((result: any) => {
                this.paymentType = undefined;
                this.showNotification('success','Transaction',`was just successfully processed`,3000);
                this.refresh();
              });
            }
        }

        if (type == 'transfer') {
          const transferData = {
            fromAccount:result[1],
            toAccount:result[2],
            amount:result[0],
            description:result[3]
          }
            this.transactionsService.transfer(transferData).subscribe(res =>{
                this.showNotification('success','Transfer',`was just successfully processed`,3000);
               this.refresh();
              })
        }
      }
    });
  }

}
