import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RealisateursService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRealisateurs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/realisateurs`);
  }

  getPagination(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/realisateurs/page/${page}`);
  }

  update(id: number, realisateur: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/realisateurs/${id}`, realisateur);
  }

  add(realisateur: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/realisateurs`, realisateur);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/realisateurs/${id}`);
  }

  search(search:string, page = 1, sample = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/realisateurs/search?page=${page}&sample=${sample}&search=${search}`);
  }
}
