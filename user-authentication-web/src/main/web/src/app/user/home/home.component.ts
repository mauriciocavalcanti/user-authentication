import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/models/user';
import { Token } from 'src/app/models/token';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [AppService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _service: AppService, private _router: Router, private _notifier: NotifierService, private _cookies: CookieService) {
    this._router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          this.refreshToken();
        }
      })
  }

  user = {} as User;
  token = {} as Token;
  timeout;
  errorMessage: string;

  ngOnInit(): void {
    this.token.access_token = this._cookies.get('access_token');
    this.token.refresh_token = this._cookies.get('refresh_token');
    this.timeout = setTimeout(() => {
      this._router.navigate(['/']);
    }, 1000 * 300);
  }

  getUserInfo() {
    this._service.getUser(this.token).subscribe((user: User) => {
      this.user = user;
      this._notifier.notify('success', 'User information retrieved successfully.');
    }, (error) => {
      this.errorMessage = error;
      this._notifier.notify('error', this.errorMessage);
    });
  }

  logout() {
    if(this._cookies.get('access_token')){
      this._service.logout().subscribe(() => {
        this._notifier.notify('success', 'User logged out successfully.');
      }, (error) => {
        this.errorMessage = error;
        this._notifier.notify('error', this.errorMessage);
      });
    } else {
      this._cookies.delete('refresh_token');
      this._notifier.notify('success', 'User logged out successfully.');
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
      this._notifier.notify('success', 'Token refreshed successfully.');
    }, (error) => {
      this.errorMessage = error;
      this._notifier.notify('error', this.errorMessage);
    });
  }

}
