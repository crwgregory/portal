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
            // const defaultRoute = localStorage.getItem('defaultSlug') ? localStorage.getItem('defaultSlug') : '';
            // this.router.navigate([defaultRoute, {skipLocationChange: true}]);
            return false;
        }
        return true;
    }

    isLoggedIn() {
        if (sessionStorage.getItem('username')) {
            this.router.navigate(['home']);

        }
    }

    authLogin(username: string, password: string) {
        const body = {'username': username, 'password': password};
        let url = configGlobals.apiMarrick;
        let id = null;
        if (localStorage.getItem('entityID')) {
            id = localStorage.getItem('entityID');
            url = url + configGlobals.apiMarrickRoutes.authenticateEntityUser;
        } else if (localStorage.getItem('locationID')) {
            id = localStorage.getItem('locationID')
            url = url + configGlobals.apiMarrickRoutes.authenticateLocationUser;
        } else {
            url = url + configGlobals.apiMarrickRoutes.authenticateUser;
        }
        if (id) {
            url = url.replace('[id]', id);
        }
console.log(url);
        return this.http.post(url, body, {});

    }

}
