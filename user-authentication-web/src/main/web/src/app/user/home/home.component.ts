import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/models/user';
import { Token } from 'src/app/models/token';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [AppService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _service: AppService, private _router: Router) {
    this._router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {
        if (
          event.id === 1 &&
          event.url === event.urlAfterRedirects
        ) {
          this.refreshToken();
        }
      })
  }

  user = {} as User;
  token = {} as Token;
  timeout;
  errorMessage: string;

  ngOnInit(): void {
    this.timeout = setTimeout(() => {
      this._router.navigate(['/']);
    }, 1000 * 300);
  }

  getUserInfo() {
    this._service.getUser().subscribe((user: User) => {
      this.user = user;
    }, (error) => {
      this.errorMessage = error;
      alert(this.errorMessage);
    });
  }

  logout() {
    let logout = this._service.logout();
    if (logout !== undefined) {
      logout.subscribe;
    }
    this._router.navigate(['/']);
  }

  refreshToken() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this._router.navigate(['/']);
    }, 1000 * 300);
    this._service.refreshToken().subscribe((token: Token) => {
      this.token = token;
      this._service.saveToken(this.token);
    });
  }

}
