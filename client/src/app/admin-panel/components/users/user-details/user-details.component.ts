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
  
  userId:number;
  userData:model.User = {
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
    address:''
  };
  editUserProfile = false;
  constructor(private router:Router,public dialog: MatDialog,
    private route:ActivatedRoute, private service:AdminPanelService) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      console.log(params);
      this.userId = params['id'];
      this.service.getUserById(params.id).subscribe((res:any) => {
        console.log(res);
        this.userData = res.rows[0];
      });
    });
  }

  blockUser(row){
    const dialogRef = this.dialog.open(ManageItemDialogComponent, {
      width: '500px',
      data: { title: `Do you want to block ${row.firstname} ${row.lastname} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {

      }
    });
  }
  
  goBack(){
    window.history.back()
  }

}
