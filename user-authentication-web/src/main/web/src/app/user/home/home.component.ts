import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/models/user';
import { Token } from 'src/app/models/token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [AppService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _service: AppService) { }

  private homeUrl = 'http://localhost:8080/users';

  user = {} as User;
  token = {} as Token;

  ngOnInit(): void {
    this.refreshToken()
  }

  getUserInfo() {
    this._service.getUser(this.homeUrl).subscribe((user: User) => {
      this.user = user;
    });
  }

  logout(){
    this._service.logout(this.homeUrl + '/logout');
  }
  
  refreshToken(){
    this._service.refreshToken().subscribe((token: Token) => {
      this.token = token;
    });
    this._service.saveToken(this.token);
  }

}
