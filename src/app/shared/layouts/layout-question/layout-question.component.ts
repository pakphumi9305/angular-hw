import { Component } from '@angular/core';
import { StorageServiceService } from '../../../services/storage-service/storage-service.service';
import { Router } from '@angular/router';
import { LoginResponseModel } from '../../../models/login/login-response-model';
import { JsonPipe } from '@angular/common';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-layout-question',
  standalone: true,
  imports: [PopupComponent],
  templateUrl: './layout-question.component.html',
  styleUrl: './layout-question.component.css',
})
export class LayoutQuestionComponent {
  public name : string;
  public userModel :LoginResponseModel;
  private USER_KEY:string = 'USER-AUTH';
  constructor(
    private _storage: StorageServiceService,
    private _router: Router
  ) 
  {
    this.userModel =  _storage.getUser(this.USER_KEY) != null ? _storage.getUser(this.USER_KEY)['data'] as LoginResponseModel : {} as LoginResponseModel;
    this.name = this.userModel.fullName;
  }

  ngOnInit(): void {
    if (this._storage.isLoggedIn(this.USER_KEY)) {
      //console.log('user not authen');
    } else {
      //console.log('user is null');
      this._router.navigateByUrl('login');
    }
  }

  Logout(): void {
    this._storage.clean();
    this._router.navigateByUrl('login');
  }

  MainQuestion():void {
    console.log('main q');
    this._router.navigateByUrl('question-list');
    //console.log(this._router.navigateByUrl('../pages/question-list'));
    }
}
