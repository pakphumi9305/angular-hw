import { Component, Injectable, NgModule } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Login } from '../models/login';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginResponseModel } from '../models/login/login-response-model';
import { Router } from '@angular/router';
import { StorageServiceService } from '../services/storage-service/storage-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LoginComponent, HttpClientModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = new FormControl();
  password = new FormControl();
  authService: AuthServiceService;

  constructor(
    authService: AuthServiceService,
    private _router: Router,
    private _storage: StorageServiceService
  ) {
    this.authService = authService;
  }
  ngOnInit(): void {
    this._storage.clean();
  }

  Click_Login() {
    this.authService.login(this.username.value, this.password.value).subscribe({
      next: (data) => {
        let loginResponse: LoginResponseModel = data.data;
        window.location.href = '../question-list';
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}

