import { Component } from '@angular/core';
import { StorageServiceService } from '../../services/storage-service/storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css',
})
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
      //window.location.href = '../login'
    }
  }
}
