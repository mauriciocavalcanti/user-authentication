import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { retry, catchError } from 'rxjs/operators';
import { Token } from './models/token';
import { User } from './models/user';
import { environment } from '../environments/environment';
import { WINDOW } from 'src/_helpers/window.provider';

@Injectable()
export class AppService {

    baseUrl = environment.baseUrl;

    constructor(@Inject(WINDOW) private _window: Window, private _http: HttpClient, private _cookies: CookieService) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic ' + btoa("fob-client:fob-secret") })
    }

    getAccessToken(data): Observable<Token> {
        let params = new URLSearchParams();
        params.append('username', data.username);
        params.append('password', data.password);
        params.append('grant_type', 'password');
        params.append('scope', 'any');

        return this._http.post<Token>(this.baseUrl + '/oauth/token', params.toString(), this.httpOptions).pipe(
            retry(2),
            catchError(this.handleError)
        )

    }

    saveToken(token: Token) {
        var expireDate = new Date();
        expireDate.setSeconds(expireDate.getSeconds() + token.expires_in);
        var expireDateRefresh = new Date();
        expireDateRefresh.setSeconds(expireDateRefresh.getSeconds() + 300);
        this._cookies.set('access_token', token.access_token, expireDate, '/', this.getHostName(), false, 'Strict');
        this._cookies.set('refresh_token', token.refresh_token, expireDateRefresh, '/', this.getHostName(), false, 'Strict');
    }

    getHostName(): string {
        return this._window.location.hostname;
    }

    postUser(user): Observable<User> {
        return this._http.post<User>(this.baseUrl + '/users', JSON.stringify(user),
            { headers: new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Basic ' + btoa("fob-client:fob-secret") }) })
            .pipe(
                catchError(this.handleError)
            )
    }

    getUser(currentToken: Token): Observable<User> {
        return this._http.get<User>(this.baseUrl + '/users',
            { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + currentToken.access_token }) })
            .pipe(
                catchError(this.handleError)
            )
    }

    logout() {
        return this._http.delete(this.baseUrl + '/users/logout',
            { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this._cookies.get('access_token') }) })
            .pipe(
                catchError(this.handleError)
            )
    }

    refreshToken() {
        let params = new URLSearchParams();
        params.append('refresh_token', this._cookies.get('refresh_token'));
        params.append('grant_type', 'refresh_token');
        params.append('scope', 'any');

        return this._http.post<Token>(this.baseUrl + '/oauth/token', params.toString(), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error.message) {
            errorMessage = `Error code: ${error.status}, ` + `message: ${error.error.message}`;
        } else {
            errorMessage = `Error code: ${error.status}, ` + `message: ${error.error.error_description}`;
        }
        return throwError(errorMessage);
    };

}