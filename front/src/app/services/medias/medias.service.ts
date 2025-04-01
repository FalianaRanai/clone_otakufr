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

  getPagination(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medias/page/${page}`);
  }

  update(id: number, realisateur: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/medias/${id}`, realisateur);
  }

  add(realisateur: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/medias`, realisateur);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/medias/${id}`);
  }

  search(search:string | null, page = 1, sample = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medias/search?page=${page}&sample=${sample}&search=${search}`);
  }
}