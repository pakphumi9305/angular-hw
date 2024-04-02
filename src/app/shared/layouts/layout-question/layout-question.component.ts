import { Component } from '@angular/core';
import { StorageServiceService } from '../../../services/storage-service/storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-question',
  standalone: true,
  imports: [],
  templateUrl: './layout-question.component.html',
  styleUrl: './layout-question.component.css'
})
export class LayoutQuestionComponent {
constructor(private _storage:StorageServiceService,private _router:Router){}

Logout() : void 
{
  console.log('logout');
this._storage.clean();
this._router.navigateByUrl('../../login');
}
}
