import { Component, OnInit,Inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payments-dialog',
  templateUrl: './payments-dialog.component.html',
  styleUrls: ['./payments-dialog.component.css']
})
export class PaymentsDialogComponent implements OnInit {

  accountType:string;
  receiverAccountNo = '';
  amount = '';
  description = '';
  convertAccountNo(number){
    this.receiverAccountNo = number.slice(0, 8) + "-" + number.slice(8,12) + "-" + number.slice(12,16) + "-" + number.slice(16,20) + "-" + number.slice(20,32);
    console.log(this.receiverAccountNo);
  }

  proceedTransaction(){
    if(this.data.type=='external'){

    }
    if(this.data.type=='domestic'){

    }
  }

  constructor(private userService:UserService,
    public dialogRef: MatDialogRef<PaymentsDialogComponent>,
    public dialog: MatDialog,private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

}
