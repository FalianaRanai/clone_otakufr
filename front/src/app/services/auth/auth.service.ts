import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private userSubject = new ReplaySubject<any>(1);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiUrl}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          this.userSubject.next(response.data);
          localStorage.setItem(
            'user',
            JSON.stringify({
              email: response.data.email,
              username: response.data.username,
            })
          );
        })
      );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.userSubject.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/admin/login'], {
          queryParams: { success: 'logout' },
        });
      },
      error: () => {
        // Même en cas d'erreur, on force le logout client
        this.userSubject.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/admin/login'], {
          queryParams: { success: 'logout' },
        });
      },
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.http
      .get<{ authenticated: boolean, data?: any }>(`${this.apiUrl}/isAuthenticated`, {
        withCredentials: true
      })
      .pipe(
        tap((response) => {
          if (response.authenticated && response.data) {
            this.userSubject.next(response.data);
            console.log('User data:', response.data);
          }
        }),
        map(response => response.data ? true : false),
        catchError(() => of(false)) // Si erreur (ex: 401), on retourne false
      );
  }
}
