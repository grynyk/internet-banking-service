import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipient } from '../shared/exportModels';

@Injectable({
  providedIn: 'root'
})
export class RecipientsService {

  constructor(private httpClient: HttpClient) { }

//   app.post('/api/recipients/create', Auth.verifyToken, Recipients.create);
// app.get('/api/recipients/getAll', Auth.verifyToken, Recipients.getAll);
// app.put('/api/recipients/update/:id', Auth.verifyToken, Recipients.update);
// app.delete('/api/recipients/delete/:id', Auth.verifyToken, Recipients.delete);

  private recipients_url = '/api/recipients';

  getAll() {
    return this.httpClient.get(`${this.recipients_url}/getAll`).map(response => response);
  }

  create(recipient:Recipient) {
    return this.httpClient.post(`${this.recipients_url}/create`, recipient).map(response => response);
  }

  update(id:any, recipient:Recipient) {
    return this.httpClient.put(`${this.recipients_url}/update/${id}`, recipient).map(response => response);
  }

  delete(id:any) {
    return this.httpClient.delete(`${this.recipients_url}/delete/${id}`).map(response => response);
  }

}