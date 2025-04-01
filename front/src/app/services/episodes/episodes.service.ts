import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getHomePagination(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/episodes/page/${page}`);
  }

  getPagination(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/episodes/page2/${page}`);
  }

  update(id: number, realisateur: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/episodes/${id}`, realisateur);
  }

  add(realisateur: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/episodes`, realisateur);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/episodes/${id}`);
  }

  search(search:string, page = 1, sample = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/episodes/search?page=${page}&sample=${sample}&search=${search}`);
  }

  
}
