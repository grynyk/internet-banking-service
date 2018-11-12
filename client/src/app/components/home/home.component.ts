import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  // primaryAccountBalance: any;
  savingsAccount = new Array();
  // savingsAccountBalance: any;

  // isPrimary: boolean = true;
  // isSavings: boolean = true;

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.accountsService.getAll().subscribe((result: any) => {
      if(result.rowCount!==0){
        this.primaryAccount = result.rows.filter(res => res.type=='primary');
        this.savingsAccount = result.rows.filter(res => res.type=='savings');
      }
    });
  }


  openPrimary() {
    if (this.primaryAccount.length!==0) {

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
      this.refresh();
    }
  }

  openSavings() {
    if (this.savingsAccount.length!==0) {

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
      this.refresh();
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
