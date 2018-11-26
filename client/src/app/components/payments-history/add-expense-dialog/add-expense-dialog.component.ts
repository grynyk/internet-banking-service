import { Component, Inject, ViewChild, ElementRef} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import * as Tesseract from '../../../../assets/Tesseract';

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.css']
})
export class AddExpenseDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<AddExpenseDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) { }

    

    customPayment = { amount:0,description:''};


}
