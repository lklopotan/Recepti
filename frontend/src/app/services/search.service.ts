import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchBody } from '../models/search';
import { SERVFAIL } from 'dns';

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

  receptPrijedlog(){
      return this._httpClient.get(`${this.baseUrl}/recepti/pretraga/predlozi`);
  }

  naprednaPretraga(requestBody: SearchBody) {
    return this._httpClient.post(`${this.baseUrl}/recepti/pretraga/napredna`, requestBody);
  }
}
