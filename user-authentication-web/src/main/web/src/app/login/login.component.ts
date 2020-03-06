import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
import { Token } from '../models/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AppService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _service: AppService) { }

  token = {} as Token;

  ngOnInit(): void {
  }

  login(form) {
    this._service.getAccessToken(form.value).subscribe((token: Token) => {
      this.token = token;
    });
    console.log(this.token)
  }
}
