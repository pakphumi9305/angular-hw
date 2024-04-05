import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { SumPointComponent } from './sum-point/sum-point.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import { LoginComponent } from './login/login.component';
import { QuestionIdComponent } from './pages/question-id/question-id/question-id.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'question-list', component: QuestionListComponent },
  { path: 'question-id', component: QuestionIdComponent },
  { path: 'sum-point', component: SumPointComponent },
  { path: '**', redirectTo: 'login' },
];
