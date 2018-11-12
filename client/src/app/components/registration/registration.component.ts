import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDatepickerInputEvent } from '@angular/material';
import * as model  from '../../shared/exportModels';
import * as moment from 'moment';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: model.User;

  public currentDate = new Date();
  public minBirthdate = this.currentDate.setFullYear(this.currentDate.getFullYear()-18);
  constructor(private router: Router,
    private authenticationService: AuthenticationService, private userService: UserService, public dialog: MatDialog) {
  }

  error: boolean = false;
  errorMessage: String;
  loading = false;
  Submit() {
    console.log(this.user);
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

  // getBirthdate(event: MatDatepickerInputEvent<Date>){
  //     this.user.birthdate = event.value.getFullYear() + '-' + ('0' + (event.value.getMonth() + 1)).slice(-2) + '-'
  //       + ('0' + event.value.getDate()).slice(-2) + 'T'
  //       + ('0' + event.value.getHours()).slice(-2) + '-'
  //       + ('0' + event.value.getMinutes()).slice(-2) + '-'
  //       + ('0' + event.value.getSeconds()).slice(-2) + '.000';
  // }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  ngOnInit() {
    this.user = new model.User();
    this.authenticationService.logout();
    document.querySelector('body').style.backgroundColor = '#4390bc';
  }
}
