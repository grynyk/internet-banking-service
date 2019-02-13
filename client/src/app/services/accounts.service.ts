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

  primaryDeposit(id:any, amount:number) {
    return this.httpClient.put(`${this.primary_url}/deposit/${id}`, { amount: amount }).map(response => response);
  }

  primaryWithdraw(id:any, amount:number) {
    return this.httpClient.put(`${this.primary_url}/withdraw/${id}`, { amount: amount }).map(response => response);
  }

  savingsCreate() {
    return this.httpClient.post(`${this.savings_url}/create`, {}).map(response => response);
  }

  savingsGet() {
    return this.httpClient.get(`${this.savings_url}/getAll`).map(response => response);
  }

  savingsDeposit(id:any, amount:number) {
    return this.httpClient.put(`${this.savings_url}/deposit/${id}`, { amount: amount }).map(response => response);
  }

  savingsWithdraw(id:any, amount:number) {
    return this.httpClient.put(`${this.savings_url}/withdraw/${id}`, { amount: amount }).map(response => response);
  }


}
