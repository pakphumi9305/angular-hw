import { Component, Injectable } from '@angular/core';
import { StorageServiceService } from '../../services/storage-service/storage-service.service';
import { Router } from '@angular/router';
import { LayoutQuestionComponent } from '../../shared/layouts/layout-question/layout-question.component';
import { routes } from '../../app.routes';
import { QuestionService } from '../../services/question-service/question.service';
import { LoginResponseModel } from '../../models/login/login-response-model';
import { QuestionModel } from '../../models/question/question';
import { CommonModule } from '@angular/common';
import { LayoutQuestionBodyComponent } from '../../shared/layouts/layout-question-body/layout-question-body.component';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [LayoutQuestionComponent,CommonModule,LayoutQuestionBodyComponent],
  //templateUrl:'../shared/layouts/layout-question.html'
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css',
})
@Injectable()
export class QuestionListComponent {
  private USER_KEY: string = 'USER-AUTH';
  public userData: LoginResponseModel;
  public questionListData: QuestionModel[] = [];
  public index : number = 0;
  constructor(
    private _storageService: StorageServiceService,
    private _router: Router,
    private _questionService: QuestionService
  ) 
  {
    this.userData = this._storageService.getUser(this.USER_KEY) != null ? this._storageService.getUser(this.USER_KEY)['data'] as LoginResponseModel : {} as LoginResponseModel;
  }

  ngOnInit(): void {
    if (this._storageService.isLoggedIn(this.USER_KEY)) {
      console.log('user is authen');
      this.getQuestionList();
    } else {
      console.log('user is null');
      this._router.navigateByUrl('../login');
    }
  }
  getQuestionList(): void {
    console.log('accessToken', this.userData.accessToken);
    console.log(
      this._questionService.getQuestion().subscribe({
        next: (data) => {
          let questionList: QuestionModel[] = data.data as QuestionModel[];
          this.questionListData = questionList;
          console.log('question array', this.questionListData);
          console.log('data', data);
          console.log('question list');
        },
        error: (err) => {
          console.error(err);
        },
      })
    );
  }

  getQuestionById(questionId:string):void{
    console.log('id',questionId);
    console.log(this._router.navigateByUrl('question-id?id='+questionId));
  }
}
