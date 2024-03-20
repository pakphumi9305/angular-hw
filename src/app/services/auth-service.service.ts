import { Injectable } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private loginInfo: Login = new Login();
  // private httpClient: HttpClient;
  constructor(_loginInfo: Login, _httpClient: HttpClient) {
    _loginInfo = this.loginInfo;
    // _httpClient = this.httpClient;
  }
}
