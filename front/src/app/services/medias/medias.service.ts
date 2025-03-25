import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediasService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findMediaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medias/${id}`);
  }

  findMediaByIdJoin(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medias/getDetailedMediaId/${id}`);
  }
}