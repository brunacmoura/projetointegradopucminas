import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppApi } from './app.api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  
  constructor(private router: Router, private appApi: AppApi) { }

  login(username: string, password: string) {
    return new Observable<any>((observer) => {
      const loginData = {"name": username, "password": password}
      this.appApi.login(loginData).subscribe(
        next => {
          observer.next(next)
          this.isAuthenticated = true;
        },
        error => {
          console.log('Login error', error);
          this.isAuthenticated = false;
          observer.error(error);
        }
      )
    })
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

}
