import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private httpClient: HttpClient) { }

  private url = '/api/transaction';

  getAll() {
    return this.httpClient.get(`${this.url}/getAll`).map(response => response);
  }

  getIncoming() {
    return this.httpClient.get(`${this.url}/getIncoming`).map(response => response);
  }

  getOutgoing() {
    return this.httpClient.get(`${this.url}/getOutgoing`).map(response => response);
  }

  domestic(data) {
    return this.httpClient.post(`${this.url}/domestic`, data).map(response => response);
  }

  external(data) {
    return this.httpClient.post(`${this.url}/external`, data).map(response => response);
  }

}

