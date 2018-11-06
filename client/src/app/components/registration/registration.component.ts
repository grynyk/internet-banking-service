import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material';
import * as model  from '../../shared/exportModels'

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: model.User;
  selectedValue: string;


  constructor(private router: Router,
    private authenticationService: AuthenticationService, private userService: UserService, public dialog: MatDialog) {
  }
  error: boolean = false;
  errorMessage: String;
  loading = false;
  Submit() {
    this.loading = true;
    this.userService.createUser(this.user)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = true;
          if(error.status==409){
            this.errorMessage = error.error;
          }else{
            this.errorMessage = error.status + ' ' + 'Server is not responding';
          }
          this.loading = false;
        });
  }
  ngOnInit() {
    this.user = new model.User();
    this.authenticationService.logout();
    document.querySelector('body').style.backgroundColor = '#4390bc';
  }
}
