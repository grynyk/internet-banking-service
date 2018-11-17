import { Component, Inject, ViewChild, ElementRef} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


@Component({
  selector: 'app-imported-data',
  templateUrl: './imported-data.component.html',
  styleUrls: ['./imported-data.component.css']
})
export class ImportedDataComponent {

  editable = false;
  constructor(
    public dialogRef: MatDialogRef<ImportedDataComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) { }


}
