import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  constructor(private http: HttpClient) { }

  login(email,password) {
    return this.http.post(`${environment.ROOT_URL}/api/signin`, {
      email,
      password
    }, { observe: 'response' });
  }

  signup(name, email,password) {
    return this.http.post(`${environment.ROOT_URL}/api/signup`, {
      name,
      email,
      password
    }, { observe: 'response' });
  }

  getUser(token: string) {
    const headers= new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${environment.ROOT_URL}/api/user`, { headers: headers , observe: 'response'});
  }

  forgotPasswordRequest(email: string) {
    return this.http.post(`${environment.ROOT_URL}/api/forgot-password`, {
      email
    }, {observe: 'response'})
  }

  forgotPasswordChange(resetToken:string, password: string) {
    return this.http.post(`${environment.ROOT_URL}/api/forgot-password/${resetToken}`, {
      password
    }, {observe: 'response'})
  }
}
