import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutQuestionComponent } from '../../../shared/layouts/layout-question/layout-question.component';
import { StorageServiceService } from '../../../services/storage-service/storage-service.service';
import { QuestionService } from '../../../services/question-service/question.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionAnswerInfo, QuestionByCatId ,QuestionInfo} from '../../../models/question-by-cat-id/question-by-cat-id';
import { CommonModule } from '@angular/common';
import { Answer, Question, SubmitAnswer, SubmitAnswerResponseModel } from '../../../models/answer/answer';
import { Chart , BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LinearScale,DoughnutController, ArcElement, Colors} from 'chart.js';

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
  public questionId: string = '';
  public questionData?: QuestionByCatId;
  public btnSubmitIsVisible: boolean;
  public scoreVisible: boolean = false;
  public fullscore: number = 0;
  public score: number = 0;
  private timeLimitMin: number = 0;
  public intervalId: any;
  public chart: any;

  constructor(
    private _questionService: QuestionService,
    private _activateRoute: ActivatedRoute,
    private _storageService: StorageServiceService
  ) {
    let catId: string = '';
    _activateRoute.queryParams.subscribe((param) => {
      catId = param['id'];
    });
    this.questionCatId = catId;
    this.btnBackIsVisible = false;
    this.btnNextIsVisible = true;
    this.btnSubmitIsVisible = false;
    Chart.register(
      BarElement,
      BarController,
      CategoryScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip,
      LinearScale,
      DoughnutController,
      ArcElement,
      Colors
    );
  }

  ngOnInit(): void {
    this._questionService.getQuestionById(this.questionCatId).subscribe({
      next: (data) => {
        this._storageService.saveQuestionAndAnswer('QA_KEY', data.data);
        //let questionData = data.data as QuestionByCatId;
        this.questionData = this._storageService.getQuestionAndAnswer(
          'QA_KEY'
        ) as QuestionByCatId;
        this.timeLimitMin = this.questionData.timeLimitOfMinuteUnit;
        this.title = this.questionData.title;
        this.totalPages = this.questionData.totalQuestion;
        this.questInfo = this.questionData.questionInfo;
        this.questionAnswerInfo = this.questInfo[0].questionAnswerInfo;
        this.no = this.questInfo[0].sequence;
        this.questionTitle = this.questInfo[0].title;
        this.questionId = this.questInfo[0].questionId;
        this.timeLimitMin = this.questionData.timeLimitOfMinuteUnit;
        this.setTimeout();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnDestroy() {
    // Will clear when component is destroyed e.g. route is navigated away from.
    clearInterval(this.intervalId);
  }
  setTimeout(): void {
    var now: any = new Date();
    // set timeout
    let dateupto: any = new Date(now.getTime() + 1000 * 60 * this.timeLimitMin);
    //calculate time left
    var timeLeft = (dateupto - now) / 1000;
    let _timeLeft: number = timeLeft as number;

    this.updateClock(_timeLeft);
    let _intervalId = setInterval(() => {
      this.intervalId = _intervalId;
      _timeLeft = _timeLeft - 1;
      this.updateClock(_timeLeft);
      if (_timeLeft === 0) {
        clearInterval(_intervalId);
        // this.intervalId = null;
        this.updateAnswerStorage();
        this.updateSubmitAnswer();
        this.scoreVisible = true;
        this.submitAnswer();
      }
    }, 1000);
  }

  getQuestionNo(questionNo: number): void {
    this.questionData = this._storageService.getQuestionAndAnswer(
      'QA_KEY'
    ) as QuestionByCatId;
    this.questInfo = this.questionData.questionInfo;
    this.index = questionNo;
    this.questionAnswerInfo = this.questInfo[this.index].questionAnswerInfo;
    this.questionTitle = this.questInfo[this.index].title;
    this.no = this.questInfo[this.index].sequence;
    this.questionId = this.questInfo[this.index].questionId;
    this.controlButton();
  }

  controlButton(): void {
    if (this.index == 0) {
      this.btnBackIsVisible = false;
      this.btnNextIsVisible = true;
      this.btnSubmitIsVisible = false;
    } else if (this.index == this.questInfo.length - 1) {
      this.btnBackIsVisible = true;
      this.btnNextIsVisible = false;
      this.btnSubmitIsVisible = true;
    } else {
      this.btnBackIsVisible = true;
      this.btnNextIsVisible = true;
      this.btnSubmitIsVisible = false;
    }
  }

  btnBackClick(): void {
    this.controlButton();
    this.updateAnswerStorage();
    this.updateSubmitAnswer();
    if (this.index >= 0) this.getQuestionNo(this.index - 1);
  }
  btnNextClick(): void {
    this.controlButton();
    this.updateAnswerStorage();
    this.updateSubmitAnswer();
    if (this.index < this.questInfo.length) this.getQuestionNo(this.index + 1);
  }

  btnSubmitClick(): void {
    this.updateAnswerStorage();
    this.updateSubmitAnswer();
    this.scoreVisible = true;
    clearInterval(this.intervalId);
    this.submitAnswer();
  }

  submitAnswer(): void {
    this._questionService.submitAnswer().subscribe({
      next: (data) => {
        let response: SubmitAnswerResponseModel = data.data;
        this.fullscore = response.fullScore;
        this.score = response.score;
        this.updateChart();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateChart(): void {
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    let perScore: number = this.score < 0 ? 0 : this.score;
    let perFullScore: number = this.fullscore < 0 ? 0 : this.fullscore;
    perScore = (perScore / perFullScore) * 100;
    let perLostScore: number = 100 - perScore;
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['correct', 'incorrect'],
        datasets: [
          {
            label: '# percentage',
            data: [perScore, perLostScore],
            backgroundColor: ['rgb(87, 153, 66)', '	rgb(168,168,168)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            display : false,
            //beginAtZero: true,
            grid: {
              display: false
            },
            ticks: {
              display: false
          },
          },
          x: {
            display : false,
            grid: {
              display: false
            },
            ticks: {
              display: false
          }
          },
        },
      },
    });
  }

  updateAnswerStorage(): void {
    let idCheck: string = '';
    var inputElements;
    let questionData = this._storageService.getQuestionAndAnswer(
      'QA_KEY'
    ) as QuestionByCatId;
    questionData.questionInfo
      .find((x) => x.questionId == this.questionId)
      ?.questionAnswerInfo.forEach((e) => {
        idCheck = e.questionAnswerId;
        inputElements = <HTMLInputElement>document.getElementById(idCheck);
        e.isChecked = inputElements.checked;
      });
    this._storageService.saveQuestionAndAnswer('QA_KEY', questionData);
  }

  updateSubmitAnswer(): void {
    const submitAns: SubmitAnswer = { questionCategoryId: '', questions: [] };
    let questionData = this._storageService.getQuestionAndAnswer(
      'QA_KEY'
    ) as QuestionByCatId;
    if (questionData == null) return;
    //add cat id

    submitAns.questionCategoryId = questionData.questionCategoryId;
    //sort asc
    questionData.questionInfo
      .sort((a, b) => (a.sequence < b.sequence ? -1 : 1))
      .forEach((q) => {
        let question: Question = { questionId: '', answers: [] };

        //add question id
        question.questionId = q.questionId;
        let check: boolean = true;
        q.questionAnswerInfo.forEach((a) => {
          if (a.isChecked && check) {
            //check = false;
            //add answer array
            let ans: Answer = { questionAnswerId: a.questionAnswerId };
            question.answers.push(ans);
          }
        });
        //add to object answer

        submitAns.questions.push(question);
      });
    this._storageService.saveListAnswer('ANS_KEY', submitAns);
  }

  updateClock(remainingTime: number): void {
    const daysHtml = document.getElementById('days') as HTMLFormElement;
    const hoursHtml = document.getElementById('hours') as HTMLFormElement;
    const minutesHtml = document.getElementById('minutes') as HTMLFormElement;
    const secondsHtml = document.getElementById('seconds') as HTMLFormElement;
    // calculate (and subtract) whole days
    let days = Math.floor(remainingTime / 86400);
    remainingTime -= days * 86400;

    // calculate (and subtract) whole hours
    let hours = Math.floor(remainingTime / 3600) % 24;
    remainingTime -= hours * 3600;

    // calculate (and subtract) whole minutes
    let minutes = Math.floor(remainingTime / 60) % 60;
    remainingTime -= minutes * 60;

    // what's left is seconds
    let seconds = Math.floor(remainingTime % 60);

    // pad numbers if needed
    daysHtml.innerHTML = this.padNumber(days);
    hoursHtml.innerHTML = this.padNumber(hours);
    minutesHtml.innerHTML = this.padNumber(minutes);
    secondsHtml.innerHTML = this.padNumber(seconds);
  }
  padNumber(number: number): string {
    return number < 10 ? '0' + number.toString() : number.toString();
  }
}


