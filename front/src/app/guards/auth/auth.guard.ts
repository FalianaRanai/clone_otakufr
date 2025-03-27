import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/admin/login'], {
            queryParams: { error: 'not-authenticated' },
          });
        }
      })
    );
  }
}
