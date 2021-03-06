import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatIconRegistry } from '@angular/material';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as model from '../../shared/exportModels';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  constructor(
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public dialog: MatDialog, private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data:any, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "profile-icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/profile-icon.svg")
    );

  }

}
