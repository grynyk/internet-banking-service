import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatSnackBar } from '@angular/material';

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
  error: boolean = false;
  email: string;
  password: string;
  matcher = new MyErrorStateMatcher();
  hide = true;
  loading = false;
  errorMessage: string;
  returnUrl: string;
  passowrdFormControl = new FormControl('', [
    Validators.required,
  ]);
  constructor(private route: ActivatedRoute,
    private router: Router, private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {
  }

  Login() {
    this.loading = true;
    this.authenticationService.login(this.email,this.password)
        .subscribe(
            data => {
              this.loading = false;
                if (JSON.parse(localStorage.getItem('currentUser')).userData.admin === true) {
                  this.router.navigate(['/admin-panel']);
                } else {
                  this.openSnackBar('Welcome! Successfully loginned', 'CLOSE')
                  this.router.navigate([this.returnUrl]);
                }
            },
            error => {
              this.openSnackBar(`${error.status} Login failure`, 'CLOSE');
              this.loading = false;
            });
  }
  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams[this.returnUrl] || '/';
    document.querySelector('body').style.backgroundColor = '#4390bc';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
