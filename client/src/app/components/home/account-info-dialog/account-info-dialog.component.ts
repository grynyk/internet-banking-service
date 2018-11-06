import { Component, Inject, ViewChild, ElementRef} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-account-info-dialog',
  templateUrl: './account-info-dialog.component.html',
  styleUrls: ['./account-info-dialog.component.css']
})
export class AccountInfoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AccountInfoDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) { }


}
