import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private userSubject = new ReplaySubject<any>(1);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.http
      .get(`${this.apiUrl}/checkValidationToken`, { withCredentials: true })
      .subscribe(
        (userData: any) => {
          console.log('User data:', userData.data);
          this.userSubject.next(userData);
        },
        () => {
          this.logout();
        }
      );
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiUrl}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          // console.log(response);
          this.userSubject.next(response.data);
        })
      );
  }

  logout(): void {
    document.cookie = 'Authorization=; Path=/; Max-Age=0;';
    this.userSubject.next(null);
    this.router.navigate(['/admin/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }

  getUserSubject() {
    return this.userSubject;
  }
}
