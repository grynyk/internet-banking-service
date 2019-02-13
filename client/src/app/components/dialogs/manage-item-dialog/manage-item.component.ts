import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-manage-track',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.css']
})
export class ManageItemDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<ManageItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }
}
