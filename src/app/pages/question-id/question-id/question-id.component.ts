import { Component } from '@angular/core';
import { LayoutQuestionComponent } from '../../../shared/layouts/layout-question/layout-question.component';
import { StorageServiceService } from '../../../services/storage-service/storage-service.service';
import { QuestionService } from '../../../services/question-service/question.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionAnswerInfo, QuestionByCatId ,QuestionInfo} from '../../../models/question-by-cat-id/question-by-cat-id';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-id',
  standalone: true,
  imports: [LayoutQuestionComponent, CommonModule],
  templateUrl: './question-id.component.html',
  styleUrl: './question-id.component.css',
})
export class QuestionIdComponent {
  private questionCatId: string;
  public title: string = '';
  public totalPages: number = 0;
  public questInfo: QuestionInfo[] = [];
  private index: number = 0;
  // public choices:number = 0;
  public questionAnswerInfo: QuestionAnswerInfo[] = [];
  public questionTitle: string = '';
  public no: number = 0;
  public btnBackIsVisible: boolean;
  public btnNextIsVisible: boolean;
  constructor(
    private _questionService: QuestionService,
    private _activateRoute: ActivatedRoute
  ) {
    let catId: string = '';
    _activateRoute.queryParams.subscribe((param) => {
      catId = param['id'];
    });
    this.questionCatId = catId;
    this.btnBackIsVisible = false;
    this.btnNextIsVisible = true;
  }

  ngOnInit(): void {
    console.log('ok');
    console.log(
      this._questionService.getQuestionById(this.questionCatId).subscribe({
        next: (data) => {
          let questionData = data.data as QuestionByCatId;
          this.title = questionData.title;
          this.totalPages = questionData.totalQuestion;
          this.questInfo = questionData.questionInfo;
          this.questionAnswerInfo = this.questInfo[0].questionAnswerInfo;
          this.no = this.questInfo[0].sequence;
          this.questionTitle = this.questInfo[0].title;
          console.log('title', this.title);
          console.log('q info', this.questInfo);
          console.log('data', data);
          console.log('question list');
        },
        error: (err) => {
          console.error(err);
        },
      })
    );
  }

  getQuestionNo(questionNo: number): void {
    console.log('quest no :', questionNo);
    this.index = questionNo;
    this.questionAnswerInfo = this.questInfo[this.index].questionAnswerInfo;
    this.questionTitle = this.questInfo[this.index].title;
    this.no = this.questInfo[this.index].sequence;
    this.controlButton();
  }

  controlButton(): void {
    if (this.index == 0) {
      this.btnBackIsVisible = false;
      this.btnNextIsVisible = true;
    } else if (this.index == this.questInfo.length -1) {
      this.btnBackIsVisible = true;
      this.btnNextIsVisible = false;
    } else {
      this.btnBackIsVisible = true;
      this.btnNextIsVisible = true;
    }
  }

  btnBackClick():void{
    this.controlButton();
    if(this.index >= 0) this.getQuestionNo(this.index - 1);
  }
  btnNextClick():void{
    this.controlButton();
    if (this.index < this.questInfo.length) this.getQuestionNo(this.index + 1);
  }
}
