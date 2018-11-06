import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MoneyBoxesDialogComponent } from './money-boxes-dialog/money-boxes-dialog.component';
import { AccountInfoDialogComponent } from './account-info-dialog/account-info-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private matIconRegistry: MatIconRegistry,
    private router: Router,
    public dialog: MatDialog,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "account",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/account.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "money",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/money.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "moneybox",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/moneybox.svg")
    );

  }
  ngOnInit() {
  }


  openAccountInfo() {
    const dialogRef = this.dialog.open(AccountInfoDialogComponent, {
      width: '500px'
    });
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
