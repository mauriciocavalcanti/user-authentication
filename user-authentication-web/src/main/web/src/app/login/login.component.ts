import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
import { Token } from '../models/token';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AppService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _service: AppService, private _router: Router, private _cookies: CookieService) {
    if (this._cookies.get('refresh_token')) {
      this._router.navigate(['/user/home']);
    }
  }

  token = {} as Token;

  ngOnInit(): void {
  }

  login(form) {
    this._service.getAccessToken(form.value).subscribe((token: Token) => {
      this.token = token;
      this._service.saveToken(token);
      this._router.navigate(['/user/home']);
    });
  }
}
