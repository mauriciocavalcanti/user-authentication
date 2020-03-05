import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [AppService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _service: AppService) { }

  private registerUrl = 'http://localhost:8080/users';

  ngOnInit(): void {
  }

  getUserInfo() {
    this._service.getResource(this.registerUrl);
  }

  logout(){
    this._service.logout();
  }
  
  refreshToken(){
    this._service.refreshToken();
  }

}
