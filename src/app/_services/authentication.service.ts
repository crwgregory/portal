import {Injectable} from '@angular/core';

import {CanActivate, Router} from '@angular/router';
import * as configGlobals from '../_config/globals';
import {HttpHelper} from '../_helpers/http.helper';

@Injectable()
export class AuthenticationService implements CanActivate {

    constructor(private router: Router,
                public http: HttpHelper) {
    }

    canActivate() {
        return this.checkSession();
    }

    checkSession() {
        if (!sessionStorage.getItem('username')) {
            console.log('not logged in');
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    authLogin(username: string, password: string) {
        const body = {'username': username, 'password': password};
        const url = configGlobals.apiMarrick + configGlobals.apiMarrickRoutes.authenticate;

        return this.http.post(url, body, {});

    }

}
