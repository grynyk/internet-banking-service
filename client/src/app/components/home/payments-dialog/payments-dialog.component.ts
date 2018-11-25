import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { RecipientsListComponent } from '../../recipients-manager/recipients-list/recipients-list.component';
import { RecipientsService } from '../../../services/recipients.service';

@Component({
  selector: 'app-payments-dialog',
  templateUrl: './payments-dialog.component.html',
  styleUrls: ['./payments-dialog.component.css']
})
export class PaymentsDialogComponent {

  accountType = 'primary_account';
  receiverName = '';
  receiverAccountNo = '';
  amount = '';
  description = '';
  transferSendAccount = '';
  transferReceiveAccount = '';

  convertAccountNo(number) {
    this.receiverAccountNo = number.slice(0, 8) + "-" + number.slice(8, 12) + "-" + number.slice(12, 16) + "-" + number.slice(16, 20) + "-" + number.slice(20, 32);
    console.log(this.receiverAccountNo);
  }


  constructor(private recipientsService: RecipientsService,
    private bottomSheet: MatBottomSheet,
    private userService: UserService,
    public dialogRef: MatDialogRef<PaymentsDialogComponent>,
    public dialog: MatDialog, private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) { }

  openRecipients() {
    this.recipientsService.getAll().subscribe((result: any) => {
      let listData:any;
      if(this.data.type=='external'){
        listData = result.rows.filter(res => res.type=='external_transaction');
      }
      if(this.data.type=='domestic'){
        listData = result.rows.filter(res => res.type=='domestic_transaction');
      }
      const bottomSheetRef = this.bottomSheet.open(RecipientsListComponent, {
        data: { recipients: listData }
      });
      bottomSheetRef.afterDismissed().subscribe(result => {
        if(this.data.type=='external'){
          if (result) {
            this.receiverName = result.title;
            this.receiverAccountNo = result.account_number;
            this.description = result.description;
          }
        }
        if(this.data.type=='domestic'){
          if (result) {
            this.receiverName = result.name;
            this.receiverAccountNo = result.account_number;
            this.description = result.description;
          }
        }
      });
    });
  }

}
