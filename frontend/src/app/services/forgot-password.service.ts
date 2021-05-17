import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private webService: WebRequestService, private http: HttpClient) { }

  forgotPasswordRequest(email: string) {
    return this.webService.forgotPasswordRequest(email).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        console.log("Email has sent");
      })
    )
  }

  forgotPasswordChange(resetToken: string, password: string) {
    return this.webService.forgotPasswordChange(resetToken, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        console.log("Password Changed Successfully");
      })
    )
  }
}
