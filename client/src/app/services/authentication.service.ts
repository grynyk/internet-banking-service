import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import * as model  from '../shared/exportModels'

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, public router: Router) { }

  login(login, password) {
    if (login == "admin" && password == "admin"){
      let user = new model.User();
      user.login = 'admin';
      user.password = 'admin';
      localStorage.setItem('currentUser', JSON.stringify(user))
      return true;
    }
    else
      return false;

    // const loginData = { login: login, password: password };

    // return this.http.post<any>('/api/Account/Login', loginData)
    // .pipe(map(loginRespond => {
    //   loginRespond['login'] = login;
    //     if (loginRespond && loginRespond.jsonWebToken) {
    //         console.log('login respond + local pushed login', loginRespond);
    //         localStorage.setItem('currentUser', JSON.stringify(loginRespond));
    //     }
    //     return loginRespond;
    // }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
