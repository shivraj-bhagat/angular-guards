import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalVariblesService } from 'src/app/services/global-varibles.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  constructor(private authService: AuthService, private globalService: GlobalVariblesService) {
    this.globalService.isLoggedIn.subscribe( value => {
      this.isLoggedIn = value;
      console.log(value)
    })
  }

  ngOnInit(): void {
  }

  onclickLogout() {
    this.globalService.setLoggedIn(false);
    this.authService.logout();
  }

}
