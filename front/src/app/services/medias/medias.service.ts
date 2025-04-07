import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MediasService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findMediaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medias/${id}`);
  }

  findMediaByIdJoin(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medias/getDetailedMediaId/${id}`);
  }

  getPagination(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medias/page/${page}`)
    .pipe(
      map((response: any) => {
        
        response.data = response.data.map((item: any) => {
          if (item.affiche && item.affiche.startsWith('/')) {
            item.affiche = `${this.apiUrl}${item.affiche}`;
            item.crossOrigin = 'anonymous'; 
          }
          return item; 
        });
        return response; 
      })
    );;
  }

  update(id: number, media: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/medias/${id}`, media);
  }

  add(media: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/medias`, media);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/medias/${id}`);
  }

  search(search: string | null, page = 1, sample = 10): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiUrl}/medias/search?page=${page}&sample=${sample}&search=${search}`
      )
      .pipe(
        map((response: any) => {
          
          response.data = response.data.map((item: any) => {
            if (item.affiche && item.affiche.startsWith('/')) {
              item.affiche = `${this.apiUrl}${item.affiche}`;
              item.crossOrigin = 'anonymous'; 
            }
            return item; 
          });
          return response; 
        })
      );
  }
}
