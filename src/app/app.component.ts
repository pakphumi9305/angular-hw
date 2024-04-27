
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthServiceService } from './services/auth-service.service';
import { QuestionService } from './services/question-service/question.service';
import { ValidationErrorComponent } from './pages/validation-error/validation-error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule],
  providers:[HttpClient,LoginComponent,AuthServiceService,QuestionService,ValidationErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-hw';
}
