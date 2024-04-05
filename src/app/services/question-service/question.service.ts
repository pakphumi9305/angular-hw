import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageServiceService } from '../storage-service/storage-service.service';
import { LoginResponseModel } from '../../models/login/login-response-model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private QUESTION_API_URL: string = 'https://training-homework.calllab.net';
  public USER_KEY:string = 'USER-AUTH';
  private accessToken:string;
  constructor(private _httpClient:HttpClient,private _storageService : StorageServiceService) 
  { 
    this.accessToken = this._storageService.getUser(this.USER_KEY)['data'] != null ? (this._storageService.getUser(this.USER_KEY)['data'] as LoginResponseModel).accessToken : '';
  }

  getQuestion(): Observable<any> {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': '*',
      'Authorization':'Bearer '+this.accessToken
    });
    let options = {
      headers: httpHeaders,
    };
    return this._httpClient
      .get<any>(this.QUESTION_API_URL + '/v1/questions/categories', options);
  }

  getQuestionById(id:string):Observable<any>
  {
    console.log('id ja',id);
    let subUrl : string = '/v1/questions/categories/'+id;
    //let accessToken : string = this._storageService.getUser('')['data'] != null ? (this._storageService.getUser('')['data'] as LoginResponseModel).accessToken : '';
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': '*',
      'Authorization':'Bearer '+this.accessToken
    });
    let options = {
      headers: httpHeaders,
    };
    return this._httpClient
    .get<any>(this.QUESTION_API_URL + '/v1/questions/categories/'+id, options);
  }
}
