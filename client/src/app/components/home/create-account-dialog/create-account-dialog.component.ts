import { Component, Inject, ViewChild, ElementRef, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatStepper } from '@angular/material';
@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.css']
})
export class CreateAccountDialogComponent implements OnInit {
  accountType:string;
  agreement:boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private userService:UserService,
    public dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    public dialog: MatDialog,private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) { }

    ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
    }

    passwordToVerify = '';

    verifyPassword(password,stepper: MatStepper){
      const loginRespond = JSON.parse(localStorage.getItem('currentUser'));
      this.userService.verifyPassword(loginRespond.userData.userId,password).subscribe((result: any) => {
        stepper.next();
      });
    }
  

}