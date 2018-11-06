import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient) { }

    getAllUsers() {
        return this.httpClient.get(`/api/User/GetAll`).map(response => response);
    }

    createUser(user) {
        return this.httpClient.post('/api/Account/Register', user);
    }
}
