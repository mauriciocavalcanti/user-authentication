import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AppService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _service:AppService) {}

  ngOnInit(): void {
  }

  login(form) {
    this._service.obtainAccessToken(form.value);
}
}
