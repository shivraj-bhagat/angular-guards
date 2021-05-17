import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Angular Guard';

  constructor(private authService: AuthService) {
    if(!this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }
}
