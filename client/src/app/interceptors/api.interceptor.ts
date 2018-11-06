import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { ErrorHandlerDialogComponent } from '../components/dialogs/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(public authService: AuthenticationService, private router: Router,public dialog: MatDialog,
    private injector: Injector) { }

  unauthorized = false;
  private handleError(err: HttpErrorResponse): Observable<any> {
    if (err.error instanceof Error) {
    } else {
      if(err.status!==201){
        if(this.unauthorized==false){
          this.unauthorized = true;
          const dialogRef = this.dialog.open(ErrorHandlerDialogComponent, {
            width: '400px',
            data: { code: err.status, message: err.error }
          });

        }

      }
    }
    if (err.status === 404 || err.status === 403) {
    }
    return Observable.throw(err.error);
}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.unauthorized = false;
    const loginData = JSON.parse(localStorage.getItem('currentUser'));
    if (loginData) {
      const clonedRequest = request.clone({
        setHeaders: {
          'sessionId': JSON.parse(localStorage.getItem('currentUser')).sessionId,
          'jsonWebToken': JSON.parse(localStorage.getItem('currentUser')).jsonWebToken
        }
      })
      return next.handle(clonedRequest).catch(err => this.handleError(err));
    } else {
      return next.handle(request);
    }
  }
}