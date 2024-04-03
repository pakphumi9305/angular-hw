import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private QUESTION_API_URL: string = 'https://training-homework.calllab.net';

  constructor(private _httpClient:HttpClient) { }

  getQuestion(accessToken: string): Observable<any> {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': '*',
      'Authorization':'Bearer '+accessToken
    });
    let options = {
      headers: httpHeaders,
    };
    return this._httpClient
      .get<any>(this.QUESTION_API_URL + '/v1/questions/categories', options);
  }
}
