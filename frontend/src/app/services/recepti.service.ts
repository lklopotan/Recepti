import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recept } from '../models/recept';
import { Observable } from 'rxjs';
import { ImageUploadResponse } from '../models/responseModels';

@Injectable({
  providedIn: 'root'
})
export class ReceptiService {

  private baseUrl: string = "http://localhost:3000";

  constructor(private _httpClient: HttpClient) { }

  getRecepti() {
    return this._httpClient.get(`${this.baseUrl}/recepti`);
  }

  getKategorije(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this.baseUrl}/kategorije`);
  }

  saveRecept(recept: Recept) {
    return this._httpClient.post(`${this.baseUrl}/recepti`, recept);
  }

  saveReceptImage(image: File): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('slika', image, image.name);
    return this._httpClient.post<ImageUploadResponse>(`${this.baseUrl}/images/upload`, formData);
  }

  deleteRecept(receptId: string) {
    return this._httpClient.delete(`${this.baseUrl}/recepti/${receptId}`, { responseType: 'text' });
  }
}
