import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/models/user';
import { Token } from 'src/app/models/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [AppService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _service: AppService, private _router: Router) { }

  user = {} as User;
  token = {} as Token;

  ngOnInit(): void {
    this.refreshToken()
  }

  getUserInfo() {
    this._service.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  logout(){
    this._service.logout().subscribe;
    this._router.navigate['/'];
  }
  
  refreshToken(){
    this._service.refreshToken().subscribe((token: Token) => {
      this.token = token;
    });
    this._service.saveToken(this.token);
  }

}
