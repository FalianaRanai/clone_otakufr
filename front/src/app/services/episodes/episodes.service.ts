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
}
