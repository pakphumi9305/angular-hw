import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StorageServiceService } from '../storage-service/storage-service.service';
import { Response } from '../../models/response';
import { LoginResponseModel } from '../../models/login/login-response-model';
import { SubmitAnswer, SubmitAnswerResponseModel } from '../../models/answer/answer';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private QUESTION_API_URL: string = environment.question_api.url;
  public USER_KEY:string = 'USER-AUTH';
  private accessToken:string;
  constructor(private _httpClient:HttpClient,private _storageService : StorageServiceService) 
  { 
 
    this.accessToken =  this._storageService.getUser(this.USER_KEY) == null ? '' : this._storageService.getUser(this.USER_KEY)['data'] != null ? (this._storageService.getUser(this.USER_KEY)['data'] as LoginResponseModel).accessToken : '';
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
      .get<any>( this.QUESTION_API_URL+ '/v1/questions/categories', options);
  }

  getQuestionById(id:string):Observable<any>
  {
    let subUrl : string = '/v1/questions/categories/'+id;
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

  submitAnswer():Observable<Response<SubmitAnswerResponseModel>> 
  {
    let data = this._storageService.getSaveListAnswer('ANS_KEY') as SubmitAnswer;
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
    .post<SubmitAnswer>(this.QUESTION_API_URL + '/v1/questions/submit-assignment', data, options)
    .pipe(
      map((response:any) => {
        return response;
      })
    );
  }
}
