import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from '../shared/models/User';
@Injectable()
export class AdminPanelService {
    constructor(private httpClient: HttpClient) { }

    getAllUsers() {
        return this.httpClient.get('/api/user/getAll').map(response => response);
    }

    getAllTransactions() {
        return this.httpClient.get('/api/transaction/getAll').map(response => response);
    }

    getTransactionsByUserId(id:any) {
        return this.httpClient.get(`/api/transaction/${id}`).map(response => response);
    }

    getUserById(id:any) {
        return this.httpClient.get(`/api/user/${id}`).map(response => response);
    }

    createUser(user:User) {
        return this.httpClient.post('/api/user/create', user);
    }

    editUser(id:any,user:User) {
        return this.httpClient.put(`/api/user/edit/${id}`,user);
    }

    activateUser(id:any) {
        return this.httpClient.put(`/api/user/activate/${id}`,{});
    }

    blockUser(id:any) {
        return this.httpClient.put(`/api/user/block/${id}`,{});
    }

    unblockUser(id:any) {
        return this.httpClient.put(`/api/user/unblock/${id}`,{});
    }

    deleteUser(user:any) {
        return this.httpClient.delete('/api/user/delete', user);
    }
}

