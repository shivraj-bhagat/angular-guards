import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(["dashboard"]);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(["dashboard"]);
      return false;
    }
    return true;
  }
}
