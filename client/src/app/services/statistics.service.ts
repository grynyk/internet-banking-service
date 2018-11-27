import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'; 
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpClient: HttpClient) { }

  private url = '/api/statistics';

  getAll() {
    return this.httpClient.get(`${this.url}/getAll`).map(response => response);
  }
}
