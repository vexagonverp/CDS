import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core';
import {CustomErrorStateMatcher} from '../../CustomErrorStateMatcher';
import {MessageService} from 'primeng/api';
import {PrimeNGConfig} from 'primeng/api';
import SignupUser from "./SignUpModel";

@Component({
    selector: 'crm-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [MessageService],
})
export class SignupComponent implements OnInit {

    captcha: boolean = false;
    signupForm: FormGroup;
    matcher: CustomErrorStateMatcher;

    private signUpUser: SignupUser;

    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthService,
                private primengConfig: PrimeNGConfig) {

        this.signUpUser = {};

        this.signupForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required],
        }, {
            validator: this.confirmedPasswordValidator('password', 'confirmPassword')
        });
        this.matcher = new CustomErrorStateMatcher();
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    resolved(captchaResponse: string) {
        this.captcha = true;
        console.log(`Resolved response token: ${captchaResponse}`);
    }

    isCaptcha() {
        return this.captcha;
    }

    get f() {
        return this.signupForm.controls;
    }


    confirmedPasswordValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({confirmedValidator: true});
            } else {
                matchingControl.setErrors(null);
            }
        }
    }


    register() {
        this.signUpUser = this.signupForm.value;
        console.log(JSON.stringify(this.signUpUser, null, 2));
        this.authService.signup(this.signupForm.value)
            .subscribe(
                user => {
                    console.log(user);
                    this.router.navigate(['auth', 'signin']);
                }
            )
    }
}
