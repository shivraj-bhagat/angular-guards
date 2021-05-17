import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate } from '@angular/router';
import { ForgotPasswordChangeComponent } from './pages/forgot-password-change/forgot-password-change.component';
import { ForgotPasswordRequestComponent } from './pages/forgot-password-request/forgot-password-request.component';
import { DashboadComponent } from './pages/dashboad/dashboad.component';
import { LoginComponent } from './pages/login/login.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { LoggedInAuthGuardService } from './services/logged-in-auth-guard.service'

const routes: Routes = [
  {
    path: "",
    component: MainViewComponent,
    canActivate: [LoggedInAuthGuardService]
  }, {
    path: "login",
    component: LoginComponent,
    canActivate: [LoggedInAuthGuardService]
  }, {
    path: "signup",
    component: SignupComponent,
    canActivate: [LoggedInAuthGuardService]
  }, {
    path: "dashboard",
    component: DashboadComponent,
    canActivate: [AuthGuard]
  }, {
    path: "forgot-password",
    canActivateChild: [LoggedInAuthGuardService],
    children: [
      {
        path: "",
        component: ForgotPasswordRequestComponent
      }, {
        path: ":resettoken",
        component: ForgotPasswordChangeComponent
      }
    ]
  },{
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
