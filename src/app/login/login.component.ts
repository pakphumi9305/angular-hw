import { Component, Injectable, NgModule } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Login } from '../models/login';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginResponseModel } from '../models/login/login-response-model';
import { Router } from '@angular/router';
import { StorageServiceService } from '../services/storage-service/storage-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,LoginComponent,HttpClientModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  username = new FormControl();
  password = new FormControl();
  authService: AuthServiceService;
  //private loginData: Login ;

  //let loginData = new LoginComponent()
  //private Login login = new Login ();
  //constructor(){this.loginData = {Username = this.username,Password = this.password} as Login}
  //  constructor(loginData : Login) {
  //   this.loginData = loginData;
  // }
  constructor(authService : AuthServiceService,private _router : Router,private _storage:StorageServiceService)
  {
    this.authService = authService;
  }
  ngOnInit(): void 
  {
    this._storage.clean()
  }

  Click_Login() {
    console.log('click');
    console.log(this.username.value, this.password.value);
    // this.loginData.Username = this.username.value;
    // this.loginData.Password = this.password.value as string;
    // console.log(this.loginData.Username)
// console.log(this.loginData.values)
   // console.log(this.loginData.values);
    //this.authService.login(this.loginData);
    console.log(
      this.authService
        .login(this.username.value, this.password.value)
        .subscribe({
          next: (data) => {
            let loginResponse: LoginResponseModel = data.data;
            console.log(data);
            console.log('before navigate');
            window.location.href = '../question-list';
           //console.log(this._router.navigateByUrl('../question-list'));
            
          },
          error: (err) => {
            console.error(err);
          },
        })
    );
    //console.log(this.authService);
    // this.authService.login(this.loginData).subscribe({
    //   next: data => {
    //     console.log(data);
    //   },
    //   error: err => {
    //     console.error(err);
    //   }
    // });
    // throw new Error('Method not implemented.');
  }
}

