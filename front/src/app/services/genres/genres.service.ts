import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

    getPagination(page: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/genres/page/${page}`);
    }
  
    update(id: number, realisateur: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/genres/${id}`, realisateur);
    }
  
    add(realisateur: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/genres`, realisateur);
    }
  
    delete(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/genres/${id}`);
    }
  
    search(search:string, page = 1, sample = 10): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/genres/search?page=${page}&sample=${sample}&search=${search}`);
    }
}
