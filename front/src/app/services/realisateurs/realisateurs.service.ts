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

  getHomePagination(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/realisateurs/page/${page}`);
  }

  updateRealisateur(id: number, realisateur: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/realisateurs/${id}`, realisateur);
  }
}
