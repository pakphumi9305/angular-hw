import { Injectable } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Login } from '../models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Response } from '../models/response';
import { LoginResponseModel } from '../models/login/login-response-model';
import { StorageServiceService } from '../services/storage-service/storage-service.service'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private AUTH_API_URL: string = environment.login_api.url;
  private USER_KEY:string = 'USER-AUTH';
  constructor(private _client: HttpClient,private _storageService:StorageServiceService) { }

  login(username: string, password: string): Observable<Response<LoginResponseModel>> {

    let loginData: Login = new Object();
    loginData.Username = username;
    loginData.Password = password;
    let data = JSON.stringify(loginData);

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
          this._storageService.saveUser(response,this.USER_KEY);
          return response;
        })
      );
  }
}
