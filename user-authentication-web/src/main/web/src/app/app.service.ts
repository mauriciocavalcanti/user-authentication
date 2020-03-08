import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Token } from './models/token';
import { User } from './models/user';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {

    baseUrl = environment.baseUrl;

    constructor(
        private _router: Router, private _http: HttpClient, private _cookies: CookieService) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic ' + btoa("fob-client:fob-secret") })
    }

    getAccessToken(data): Observable<Token> {
        let params = new URLSearchParams();
        params.append('username', data.username);
        params.append('password', data.password);
        params.append('grant_type', 'password');
        params.append('scope', 'any');

        return this._http.post<Token>('http://localhost:8080/oauth/token', params.toString(), this.httpOptions).pipe(
            retry(2),
            catchError(this.handleError)
        )

    }

    saveToken(token: Token) {
        console.log(token)
        this._cookies.set('access_token', token.access_token, new Date().getTime() + (1000 * token.expires_in))
        this._cookies.set('refresh_token', token.refresh_token, new Date().getTime() + (1000 * 300))
        console.log(this._cookies.getAll())
    }

    postUser(user): Observable<User> {
        return this._http.post<User>(this.baseUrl, JSON.stringify(user),
            { headers: new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Basic ' + btoa("fob-client:fob-secret") }) })
            .pipe(
                retry(2),
                catchError(this.handleError)
            )
    }

    getUser(): Observable<User> {
        return this._http.get<User>(this.baseUrl,
            { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this._cookies.get('access_token') }) })
            .pipe(
                retry(2),
                catchError(this.handleError)
            )
    }

    logout() {
        this._cookies.delete('access_token')
        this._cookies.delete('refresh_token')
        return this._http.delete(this.baseUrl + '/logout',
            { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this._cookies.get('access_token') }) })
            .pipe(
                retry(2),
                catchError(this.handleError)
            )
    }

    refreshToken() {
        let params = new URLSearchParams();
        params.append('refresh_token', this._cookies.get('refresh_token'));
        params.append('grant_type', 'refresh_token');
        params.append('scope', 'any');

        return this._http.post<Token>('http://localhost:8080/oauth/token', params.toString(), this.httpOptions).pipe(
            retry(2),
            catchError(this.handleError)
        )
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error code: ${error.status}, ` + `message: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    };

}