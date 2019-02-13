import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../shared/exportModels';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private httpClient: HttpClient) { }

  private url = '/api/transaction';

  getAll() {
    return this.httpClient.get(`${this.url}/getAllForUser`).map(response => response);
  }

  getIncoming() {
    return this.httpClient.get(`${this.url}/getIncoming`).map(response => response);
  }

  getOutgoing() {
    return this.httpClient.get(`${this.url}/getOutgoing`).map(response => response);
  }

  custom(transaction:Transaction) {
    return this.httpClient.post(`${this.url}/custom`, transaction).map(response => response);
  }

  domestic(transaction:Transaction) {
    return this.httpClient.post(`${this.url}/domestic`, transaction).map(response => response);
  }

  external(transaction:Transaction) {
    return this.httpClient.post(`${this.url}/external`, transaction).map(response => response);
  }

  transfer(transaction:Transaction) {
    return this.httpClient.post(`${this.url}/transfer`, transaction).map(response => response);
  }

  delete(id:any) {
    return this.httpClient.delete(`${this.url}/delete/${id}`).map(response => response);
  }
}

