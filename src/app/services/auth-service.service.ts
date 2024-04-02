import { Injectable } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Login } from '../models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private AUTH_API_URL: string = 'https://training-homework.calllab.net';
  constructor(private _client: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    let loginData: Login = new Object();
    loginData.Username = username;
    loginData.Password = password;
    console.log('login');
    console.log(loginData);
    let data = JSON.stringify(loginData);
    console.log(data);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': '*'
    });
    let options = {
      headers: httpHeaders,
    };
    return this._client
      .post<Login>(this.AUTH_API_URL + '/v1/login', data, options)
      .pipe(
        map((response: any) => {
          console.log(response.status);
          return response;
        })
      );
  }
}
