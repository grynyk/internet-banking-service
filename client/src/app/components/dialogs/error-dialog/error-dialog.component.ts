import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorHandlerDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ErrorHandlerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private authenticationService: AuthenticationService) { }
  errorTitle: String = this.data.title;
  errorMessage: String = this.data.message;
  buttonTitle: String = this.data.button;
  ngOnInit() {

  }

  Submit() {

  }
}