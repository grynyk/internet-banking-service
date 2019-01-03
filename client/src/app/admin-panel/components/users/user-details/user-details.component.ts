import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminPanelService } from '../../../admin-panel.service';
import * as model from '../../../../shared/models/User';
import { ManageItemDialogComponent } from '../../../../components/dialogs/manage-item-dialog/manage-item.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public currentDate = new Date();
  public minBirthdate = this.currentDate.setFullYear(this.currentDate.getFullYear()-18);
  userId:number;
  userData:model.User = {
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
    address:'',
    birthdate:''
  };
  editUserProfile = false;
  constructor(private router:Router,public dialog: MatDialog,
    private route:ActivatedRoute, private service:AdminPanelService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.route.params.forEach(params => {
      console.log(params);
      this.userId = params['id'];
      this.service.getUserById(params.id).subscribe((res:any) => {
        console.log(res);
        this.userData = res.rows[0];
      });
    });
  }

  getBirthdate(event){
    this.userData.birthdate = event.value;
  }

  editUser(){
    this.service.editUser(this.userId,this.userData).subscribe(res => {
      this.refresh();
      this.editUserProfile = false;
    });
  }

  blockUser(){
    const dialogRef = this.dialog.open(ManageItemDialogComponent, {
      width: '500px',
      data: { title: `Do you really want to block ${this.userData.firstname} ${this.userData.lastname} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.service.blockUser(this.userId).subscribe((res:any) => {
          this.refresh();
        })
      }
    });
  }

  unblockUser(){
    const dialogRef = this.dialog.open(ManageItemDialogComponent, {
      width: '500px',
      data: { title: `Do you really want to unblock ${this.userData.firstname} ${this.userData.lastname} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.service.unblockUser(this.userId).subscribe((res:any) => {
          this.refresh();
        })
      }
    });
  }
  
  activateUser(){
    const dialogRef = this.dialog.open(ManageItemDialogComponent, {
      width: '500px',
      data: { title: `Do you really want to activate ${this.userData.firstname} ${this.userData.lastname} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.service.activateUser(this.userId).subscribe((res:any) => {
          this.refresh();
        })
      }
    });
  }

  goBack(){
    window.history.back()
  }

}
