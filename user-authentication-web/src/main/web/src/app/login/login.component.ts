import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
import { Token } from '../models/token';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AppService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _service: AppService, private _router: Router, private _cookies: CookieService, private _notifier: NotifierService) {
    if (this._cookies.get('access_token')) {
      this._router.navigate(['/user/home']);
    }
  }

  errorMessage: string;
  token = {} as Token;

  ngOnInit(): void {
  }

  login(form) {
    this._service.getAccessToken(form.value).subscribe((token: Token) => {
      this.token = token;
      this._service.saveToken(token);
      this._router.navigate(['/user/home']);
      this._notifier.notify('success', 'User logged in successfully.');
    }, (error) => {
      this.errorMessage = error;
      this._notifier.notify('error', this.errorMessage);
    });
  }
}
