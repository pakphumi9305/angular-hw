import { Component, Injectable } from '@angular/core';
import { StorageServiceService } from '../../services/storage-service/storage-service.service';
import { Router } from '@angular/router';
import { LayoutQuestionComponent } from '../../shared/layouts/layout-question/layout-question.component';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [LayoutQuestionComponent],
  //templateUrl:'../shared/layouts/layout-question.html'
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css',
})
@Injectable()
export class QuestionListComponent {
  private USER_KEY: string = 'USER-AUTH';
  constructor(private _storageService: StorageServiceService,private _router:Router) {}

  ngOnInit(): void {
    if (this._storageService.getUser(this.USER_KEY) != null) {
      console.log('user not null');
      console.log(this._storageService.getUser(this.USER_KEY));
    } else {
      console.log('user is null');
      console.log(this._storageService.getUser(this.USER_KEY));
      this._router.navigateByUrl('../login');
    }
  }
}
