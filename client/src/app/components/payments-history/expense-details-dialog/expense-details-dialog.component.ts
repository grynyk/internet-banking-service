import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-expense-details-dialog',
  templateUrl: './expense-details-dialog.component.html',
  styleUrls: ['./expense-details-dialog.component.css']
})
export class ExpenseDetailsDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<ExpenseDetailsDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) { }
}
