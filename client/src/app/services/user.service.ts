import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from '../shared/models/User';
@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient) { }

    // getAllUsers() {
    //     return this.httpClient.get(`/api/User/GetAll`).map(response => response);
    // }

    createUser(user:User) {
        return this.httpClient.post('/api/user/create', user);
    }

    verifyPassword(password:string) {
        return this.httpClient.post(`/api/user/verifyPassword`, { password: password });
    }

    deleteUser(user:any) {
        return this.httpClient.delete('/api/user/delete', user);
    }

    getMyData() {
        return this.httpClient.get('/api/user/getMyData').map(response => response);
    }
}
