import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MatDialog,MAT_DIALOG_DATA } from '@angular/material';
import * as model from '../../../../shared/models/User';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
  userData:model.User = {
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
    address:'',
    password:'',
    confirmPassword:''
  };
  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

}
