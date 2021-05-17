import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalVariblesService } from 'src/app/services/global-varibles.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error: any;
  constructor(private authService: AuthService, private router: Router, private globalService: GlobalVariblesService) { }

  public signupForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  })

  ngOnInit(): void {
  }

  onSignUpFormSubmit() {
    this.authService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password)
    .subscribe(
      (res: HttpResponse<any>) => {
        if(res.status === 200) {
          localStorage.setItem('logout', "true");
          this.globalService.setLoggedIn(true);
          this.router.navigate(["/dashboard"]);
        }
      },
      (error: HttpResponse<any>) => {
        this.error = error;
      }
    );
  }

}
