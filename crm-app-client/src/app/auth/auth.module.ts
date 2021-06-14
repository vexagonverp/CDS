import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthComponent } from './pages/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPwdComponent } from './pages/forgot-pwd/forgot-pwd.component';
import { ResetPwdComponent } from './pages/reset-pwd/reset-pwd.component';

import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";

@NgModule({
    imports: [
        SharedModule,
        AuthRoutingModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        AutoCompleteModule,
        InputTextModule,
        CardModule
    ],
  declarations: [
    SigninComponent,
    SignupComponent,
    AuthComponent,
    ForgotPwdComponent,
    ResetPwdComponent
  ]
})
export class AuthModule { }
