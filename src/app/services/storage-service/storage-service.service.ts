import { Injectable } from '@angular/core';
import { LoginResponseModel } from '../../models/login/login-response-model';
import { Answer, Question, SubmitAnswer } from '../../models/answer/answer';
import { Data } from '@angular/router';
import { QuestionByCatId } from '../../models/question-by-cat-id/question-by-cat-id';

@Injectable({
  providedIn: 'root',
})
export class StorageServiceService {
  constructor() {}
  clean(): void {
    sessionStorage.clear();
    localStorage.clear();
  }

  public saveUser(user: any, storageKey: string): void {
    sessionStorage.removeItem(storageKey);
    sessionStorage.setItem(storageKey, JSON.stringify(user));
  }

  public getUser(storageKey: string): any {
    const user = sessionStorage.getItem(storageKey);
    return user ? JSON.parse(user) : null;
  }

  public isLoggedIn(storageKey: string): boolean {
    return sessionStorage.getItem(storageKey) !== null;
  }

  public saveQuestionAndAnswer(storageKey:string,data:QuestionByCatId):void{
    //ให้ key เป็น question category id
    if(data == null)
    {
      localStorage.removeItem(storageKey);
      return;
    }

    const dataStorage = localStorage.getItem(storageKey);
    let _dataStorage:QuestionByCatId = dataStorage ? JSON.parse(dataStorage) : null;
   //initial data
    if(_dataStorage == null)
    {
      localStorage.setItem(storageKey, JSON.stringify(data));
      return;
    }

    //save question with answer checkbox
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  public getQuestionAndAnswer(storageKey:string) : QuestionByCatId
  {
    const dataStorage = localStorage.getItem(storageKey);
    let result: QuestionByCatId = dataStorage ? JSON.parse(dataStorage) : null;
    return result;
  }

public getSaveListAnswer(storageKey:string): SubmitAnswer{
  const dataStorage = localStorage.getItem(storageKey);
  let result: SubmitAnswer = dataStorage ? JSON.parse(dataStorage) : null;
  return result;
}
  public saveListAnswer(storageKey: string, data: SubmitAnswer): void {
    let answerList = localStorage.getItem(storageKey);
    let obj = answerList ? JSON.parse(answerList) : null;

    if(data == null)
    {
     //error
     return;
    }

    if(obj == null)
    {
    //remove old question category
    localStorage.removeItem(storageKey);
    localStorage.setItem(storageKey, JSON.stringify(data));
    return;
    }

      let _answerList = obj as SubmitAnswer;

      if (_answerList.questionCategoryId != data.questionCategoryId)
      {
        // cat not match
        localStorage.removeItem(storageKey);
        localStorage.setItem(storageKey, JSON.stringify(data));
      }
  localStorage.setItem(storageKey, JSON.stringify(data));
}
}
