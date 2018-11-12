import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MoneyBoxesDialogComponent } from './money-boxes-dialog/money-boxes-dialog.component';
import { AccountInfoDialogComponent } from './account-info-dialog/account-info-dialog.component';
import { CreateAccountDialogComponent } from './create-account-dialog/create-account-dialog.component';
import { AccountsService } from '../../services/accounts.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private accountsService:AccountsService,
    private matIconRegistry: MatIconRegistry,
    private router: Router,
    public dialog: MatDialog,
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

  primaryAccount:any;
  primaryAccountBalance:any;
  savingsAccount:any;
  savingsAccountBalance:any;

  isPrimary:boolean = true;
  isSavings:boolean = true;

  ngOnInit() {
    this.accountsService.primaryGet().subscribe((result: any) => {
      this.primaryAccount = result.rows[0];
      if(result.rows[0]){
        this.primaryAccountBalance = result.rows[0].balance;
      }else{
        this.isPrimary = false;
      }
     
      console.log(result.rows[0]);
    });
    this.accountsService.savingsGet().subscribe((result: any) => {
      this.savingsAccount = result.rows[0];
      if(result.rows[0]){
        this.savingsAccountBalance = result.rows[0].balance;
      }else{
        this.isSavings = false;
      }
      
      console.log(result.rows[0]);
    });
  }


  openPrimary() {
    if(this.primaryAccount){

    }else{
      const dialogRef = this.dialog.open(CreateAccountDialogComponent, {
        width: '600px',
        data:{primary:true,savings:false}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if(result=='primary'){
            this.accountsService.primaryCreate().subscribe((result: any) => {
              console.log('primary');
              console.log(result);
            });
          }
        }
      });
    }
  }

  openSavings() {
    if(this.savingsAccount){

    }else{
      const dialogRef = this.dialog.open(CreateAccountDialogComponent, {
        width: '600px',
        data:{primary:false,savings:true}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if(result=='savings'){
            this.accountsService.savingsCreate().subscribe((result: any) => {
              console.log('savings');
              console.log(result);
            });
            console.log('primary');
          }
        }
      });
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
