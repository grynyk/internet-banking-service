import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private httpClient: HttpClient) { }

  private primary_url = '/api/accounts/primary';
  private savings_url = '/api/accounts/savings';

  getAll() {
    return this.httpClient.get('/api/accounts/getAll').map(response => response);
  }

  primaryCreate() {
    return this.httpClient.post(`${this.primary_url}/create`, {}).map(response => response);
  }

  primaryGet() {
    return this.httpClient.get(`${this.primary_url}/getAll`).map(response => response);
  }

  primaryUpdate(id,balance) {
    return this.httpClient.put(`${this.primary_url}/update/${id}`,balance).map(response => response);
  }

  savingsCreate() {
    return this.httpClient.post(`${this.savings_url}/create`, {}).map(response => response);
  }

  savingsGet() {
    return this.httpClient.get(`${this.savings_url}/getAll`).map(response => response);
  }

  savingsUpdate(id,balance) {
    return this.httpClient.put(`${this.savings_url}/update/${id}`,balance).map(response => response);
  }

}
