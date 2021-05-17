import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboadComponent } from './pages/dashboad/dashboad.component';
import { ForgotPasswordRequestComponent } from './pages/forgot-password-request/forgot-password-request.component';
import { ForgotPasswordChangeComponent } from './pages/forgot-password-change/forgot-password-change.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainViewComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    DashboadComponent,
    ForgotPasswordRequestComponent,
    ForgotPasswordChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token");
        },
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
