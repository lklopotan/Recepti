import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recept } from '../models/recept';

@Injectable({
  providedIn: 'root'
})
export class ReceptiService {

  private baseUrl: string = "http://localhost:3000/recepti";

  constructor(private _httpClient: HttpClient) { }

  getRecepti() {
    return this._httpClient.get(this.baseUrl);
  }

  saveRecept(recept: Recept) {
    return this._httpClient.post(this.baseUrl, recept);
  }
}
