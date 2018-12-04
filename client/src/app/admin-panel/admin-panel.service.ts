import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AdminPanelService {
    constructor(private httpClient: HttpClient) { }

    getAllUsers() {
        return this.httpClient.get('/api/user/getAll').map(response => response);
    }

    getAllTransactions() {
        return this.httpClient.get('/api/transaction/getAll').map(response => response);
    }

    getTransactionsByUserId(id) {
        return this.httpClient.get(`/api/transaction/${id}`).map(response => response);
    }

    getUserById(id) {
        return this.httpClient.get(`/api/user/${id}`).map(response => response);
    }

    createUser(user) {
        return this.httpClient.post('/api/user/create', user);
    }

    editUser(id,user) {
        return this.httpClient.put(`/api/user/edit/${id}`,user);
    }

    blockUser(id) {
        return this.httpClient.put(`/api/user/block/${id}`,{});
    }

    unblockUser(id) {
        return this.httpClient.put(`/api/user/unblock/${id}`,{});
    }

    deleteUser(user) {
        return this.httpClient.delete('/api/user/delete', user);
    }
}

