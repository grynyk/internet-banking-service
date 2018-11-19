import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { ErrorHandlerDialogComponent } from '../components/dialogs/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(public authService: AuthenticationService, private router: Router,public dialog: MatDialog,
    private injector: Injector) { }

  errorAppeared = false;
  private handleError(err: HttpErrorResponse): Observable<any> {

    if (err.error instanceof Error) {
    } else {
      if(err.status!==201){
        if(this.errorAppeared==false){
          this.errorAppeared = true;
          const dialogRef = this.dialog.open(ErrorHandlerDialogComponent, {
            width: '500px',
            data: { title: err.error.name || err.error.message , message: 'Unexpected problem with sending request, try again please !', button:'OK' }
          });
        }
      }
      // else if(err.error.message=='password is incorrect'){
      //   const dialogRef = this.dialog.open(ErrorHandlerDialogComponent, {
      //     width: '400px',
      //     data: { title: err.error.name || err.error, message: 'Unexpected problem with sending request', button:'OK' }
      //   });
      // }
    }
    if (err.status === 404 || err.status === 403) {
    }
    return Observable.throw(err.error);
}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.errorAppeared = false;
    const loginData = JSON.parse(localStorage.getItem('currentUser'));
    if (loginData) {
      const clonedRequest = request.clone({
        setHeaders: {
          'x-access-token': JSON.parse(localStorage.getItem('currentUser')).token
        }
      })
      return next.handle(clonedRequest).catch(err => this.handleError(err));
    } else {
      return next.handle(request);
    }
  }
}
