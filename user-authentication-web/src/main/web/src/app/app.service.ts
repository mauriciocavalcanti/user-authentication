import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Token } from './models/token';

@Injectable()
export class AppService {
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
        console.log('oi')
        return this._http.post<Token>('http://localhost:8080/oauth/token', params.toString(), this.httpOptions).pipe(
            retry(2),
            catchError(this.handleError)
          )

    }

    postResource(resourceUrl, data) {

    }

    getResource(resourceUrl) {

    }

    logout() {
        this._cookies.delete('access_token')
        this._cookies.delete('refresh_token')
    }

    refreshToken() {
        let params = new URLSearchParams();
        params.append('refresh_token', this._cookies.get('refresh_token'));
        params.append('grant_type', 'refresh_token');
        params.append('scope', 'any');
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      };

}