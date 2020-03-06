import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
import { Token } from '../models/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AppService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _service: AppService, private _router: Router) { }

  token = {} as Token;

  ngOnInit(): void {
  }

  login(form) {
    this._service.getAccessToken(form.value).subscribe((token: Token) => {
      this.token = token;
    });
    this._service.saveToken(this.token);
    this._router.navigate['/user/home']
  }
}
