import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-forgot-password-request',
  templateUrl: './forgot-password-request.component.html',
  styleUrls: ['./forgot-password-request.component.scss']
})
export class ForgotPasswordRequestComponent implements OnInit {

  error: any;
  message: any;
  constructor(private forgetPasswordService: ForgetPasswordService) { }

  public forgotPasswordRequestForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  })

  ngOnInit(): void {
  }

  onSubmit() {
    this.forgetPasswordService.forgotPasswordRequest(this.forgotPasswordRequestForm.value.email)
    .subscribe(
      (res: HttpResponse<any>) => {
        this.error = "";
        if(res.status === 200) {
          // console.log(res.body);
          this.message = res.body;
        }
        this.forgotPasswordRequestForm.reset();
      },
      (error: HttpResponse<any>) => {
        this.error = error
      }
    );
  }

}
