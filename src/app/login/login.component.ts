import { Component, Injectable, NgModule } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Login } from '../models/login';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

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
  constructor(authService : AuthServiceService)
  {
    this.authService = authService;
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
    console.log (this.authService.login(this.username.value,this.password.value).subscribe());
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

