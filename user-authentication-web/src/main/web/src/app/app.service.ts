import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

export class User {
    constructor(
        public id: number,
        public idCode: string,
        public birthDate: string,
        public email: string,
        public password: string,
        public firstName: string,
        public lastName: string,
    ) { }
}

@Injectable()
export class AppService {
    constructor(
        private _router: Router, private _http: HttpClient, private _cookies: CookieService) { }

    obtainAccessToken(loginData) {
        let params = new URLSearchParams();
        params.append('username', loginData.username);
        params.append('password', loginData.password);
        params.append('grant_type', 'password');
        params.append('scope', 'any');

    }

    postResource(resourceUrl, data) {

    }

    getResource(resourceUrl) {

    }

    logout() {

    }

    refreshToken() {
        let params = new URLSearchParams();
        params.append('refresh_token', this._cookies.get('refresh_token'));
        params.append('grant_type', 'refresh_token');
        params.append('scope', 'any');
    }

}