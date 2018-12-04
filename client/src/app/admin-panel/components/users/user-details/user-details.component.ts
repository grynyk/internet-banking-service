import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminPanelService } from '../../../admin-panel.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  
  userId:number;
  userData:any;

  constructor(private router:Router, private route:ActivatedRoute, private service:AdminPanelService) { }

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

  goBack(){
    window.history.back()
  }

}
