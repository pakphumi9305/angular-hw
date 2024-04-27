import { Component, Injectable, NgModule, ValueEqualityFn } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Login } from '../models/login';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, NgModel } from '@angular/forms';
import { LoginResponseModel } from '../models/login/login-response-model';
import { Router } from '@angular/router';
import { StorageServiceService } from '../services/storage-service/storage-service.service';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from '../pages/validation-error/validation-error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoginComponent,
    HttpClientModule,
    CommonModule,
    ValidationErrorComponent,
  ],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  authService: AuthServiceService;
  public isInValidUsername: boolean = false;
  public isInValidPassword: boolean = false;
  public username = new FormControl();
  public password = new FormControl();
  //public validateComponent = new ValidationErrorComponent();
  constructor(
    authService: AuthServiceService,
    private _router: Router,
    private _storage: StorageServiceService,
    public _validation: ValidationErrorComponent
  ) {
    this.authService = authService;
  }
  ngOnInit(): void {
    this._storage.clean();
    //this._validation.control = this.loginForm.controls['username'];
    // console.log('validat component', this._validation);
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
    //console.log('valid', this.loginForm.controls['username'].invalid);
  }
  onSubmit() {
    console.log('on submit');
    this.isInValidUsername = this.loginForm.controls['username'].invalid;
    this.isInValidPassword = this.loginForm.controls['password'].invalid;
    // console.log('user err', this.loginForm.controls['username'].errors);
    // console.log('valid', this.loginForm.controls['username'].invalid);
    // console.log('Username:', this.loginForm.controls['username'].value);
    //this._validation.control = this.loginForm.controls['password'];
    //this._validation.messages = this.errMessage();
    console.log('validat component', this._validation);
    //console.log('f sub',sub)
    //console.log('Password:', password);
    if(!this.isInValidUsername && !this.isInValidPassword)
    {
          this.authService
            .login(this.username.value, this.password.value)
            .subscribe({
              next: (data) => {
                let loginResponse: LoginResponseModel = data.data;
                window.location.href = '../question-list';
              },
              error: (err) => {
                console.error(err);
              },
            });
    }
  }

  Click_Login() {
    // this.authService.login(this.username.value, this.password.value).subscribe({
    //   next: (data) => {
    //     let loginResponse: LoginResponseModel = data.data;
    //     window.location.href = '../question-list';
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   },
    // });
  }

  errMessage(): {[key: string]: string } {

    let errMsg: { [key: string]: string } = {
      required: 'Username is required',
      minlength: 'Username must be at least 3 characters',
      maxlength: 'Username must be at most 20 characters',
    };
    return errMsg;
  }
}

