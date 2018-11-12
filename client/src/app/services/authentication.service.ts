import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import * as model  from '../shared/exportModels'
declare var require: any;

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, public router: Router) { }

  login(email, password) {
    const loginData = { email: email, password: password };
    const jwtDecode = require('jwt-decode');
    return this.http.post<any>('/api/user/login', loginData)
    .pipe(map(loginRespond => {
      loginRespond['email'] = email;
        if (loginRespond && loginRespond.token) {
          console.log('login respond:', loginRespond);
            loginRespond['userData'] = jwtDecode(loginRespond.token);
            localStorage.setItem('currentUser', JSON.stringify(loginRespond));
        }
        return loginRespond;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
