import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private webService: WebRequestService,
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService) { }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setToken(res.body.token);
        console.log("LOGGED IN!");
      })
    )
  }

  signup(name: string, email: string, password: string) {
    return this.webService.signup(name, email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setToken(res.body.token);
        console.log("Successfully signed up and now logged in!");
      })
    )
  }

  logout() {
    localStorage.removeItem('logout');
    this.removeToken();
    this.router.navigate(["/"]);
  }

  checkAuthentication() {
    let token = this.getToken();
    return this.webService.getUser(token).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        console.log("Authenticated");
      })
    )
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log("yes", this.jwtHelper.isTokenExpired(token))
    return !this.jwtHelper.isTokenExpired(token);
  }

  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  removeToken() {
    localStorage.removeItem('token');
  }
  
}
