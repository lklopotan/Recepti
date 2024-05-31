import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchBody } from '../models/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl: string = "http://localhost:3000";

  constructor(private _httpClient: HttpClient) { }

  textSearch(searchText: string) {
    const body = new SearchBody();
    body.textPretraga = searchText;

    return this._httpClient.post(`${this.baseUrl}/recepti/pretraga`, body);
  }

  naprednaPretraga(requestBody: SearchBody) {
    return this._httpClient.post(`${this.baseUrl}/recepti/pretraga/napredna`, requestBody);
  }
}
