import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error:boolean = false;
  login: string;
  password: string;
  matcher = new MyErrorStateMatcher();
  hide = true;
  loading = false;
  errorMessage:string;
  returnUrl: string;
  passowrdFormControl = new FormControl('', [
    Validators.required,
  ]);
  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,public dialog: MatDialog) {
  }

  Login() {
    this.loading = true;
    if (this.authenticationService.login(this.login, this.password)){
      if(this.login=='admin'&&this.password=='admin'){
        this.loading = false;
        this.router.navigate([this.returnUrl]);
      }
    } else{
    alert('Wrong credentials!');
    this.loading = false;
  }

    // this.authenticationService.login(this.login,this.password)
    //     .subscribe(
    //         data => {
    //             this.router.navigate([this.returnUrl]);
    //         },
    //         error => {
    //           this.error = true;
    //           if(error.status==409){
    //             this.errorMessage = error.error;
    //           }else{
    //             this.errorMessage = error.status + ' ' + 'Serwer nie odpowiada';
    //           }
    //           this.loading = false;
    //         });
  }
  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    document.querySelector('body').style.backgroundColor = '#4390bc';
  }

}
