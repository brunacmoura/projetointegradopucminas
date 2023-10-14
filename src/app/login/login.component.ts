import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppApi } from '../app.api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private appApi: AppApi) {}
  errorMessage: string = '';

  login(username: string, password: string): void {
    this.authService.login(username, password).subscribe(
      (response: any) => {
        this.appApi.setUser(response.user)
        this.router.navigate(['/projects']);
      },
      (error: any) => {
        console.log('Login failed', error);
        this.errorMessage = 'Invalid credentials. Please, try again later.'; 
      }
    );
  }
  
}
