import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalVariblesService } from 'src/app/services/global-varibles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: any;
  constructor(private authService: AuthService, private router: Router, private globalService: GlobalVariblesService) { }

  public loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  })

  ngOnInit(): void {
  }

  onFormSubmit() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(
      (res: HttpResponse<any>) => {
        this.error = "";
        if(res.status === 200) {
          localStorage.setItem('logout', "true");
          this.globalService.setLoggedIn(true);
          this.router.navigate(['/dashboard']);
        }
      },
      (error: HttpResponse<any>) => {
        this.error = error
      }
    );
  }

}
