import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ForgetPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-forgot-password-change',
  templateUrl: './forgot-password-change.component.html',
  styleUrls: ['./forgot-password-change.component.scss']
})
export class ForgotPasswordChangeComponent implements OnInit {

  resetToken: string;
  error: any;
  message: any;
  forgotPasswordChangeForm: FormGroup;
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordConfirm = new FormControl('', [Validators.required,Validators.minLength(8)]);

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private forgetPasswordService: ForgetPasswordService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.resetToken = params.resettoken;
      }
    )
    // console.log(this.resetToken);

    this.forgotPasswordChangeForm = this.formBuilder.group({
      password: this.password,
      passwordConfirm: this.passwordConfirm
    },
      {
        validator: this.passwordMatchValidator
      }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
       ? null : { 'mismatch': true };
  }

  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  setClassPasswordConfirm() {
    return { 'has-danger': !this.passwordConfirm.pristine && !this.passwordConfirm.valid ||
    !this.passwordConfirm.pristine && this.forgotPasswordChangeForm.errors && this.forgotPasswordChangeForm.errors.mismatch};
  }

  onSubmit() {
    this.forgetPasswordService.forgotPasswordChange( this.resetToken, this.forgotPasswordChangeForm.value.password)
    .subscribe(
      (res: HttpResponse<any>) => {
        this.error = "";
        if(res.status === 200) {
          console.log(res.body);
          this.message = res.body;
        }
        this.forgotPasswordChangeForm.reset();
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 5000);
      },
      (error: HttpResponse<any>) => {
        this.error = error
      }
    );
  }
}
