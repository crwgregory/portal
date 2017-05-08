import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';
@Injectable()
export class AuthenticationService {

    private api: string;
    private header: any;

    constructor(private http: Http,
                private router: Router,
                private app: AppComponent
    ) {
        const headers = new Headers();
        headers.append('Dev-Token', '7d95a43106acfd356448481e3bacb09a1af2e09256533d4d74719398e5b97d1e');
        headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token , Authorization');
        this.api = 'http://10.1.10.167:32769/employees/login';
        this.header = headers;
    }
    checkUserAuthentication() {
        if (!localStorage.getItem('currentUser')) {
            this.app.isLogin = false;
            this.router.navigate(['login']);
            return false;
        }
        this.app.isLogin = true;
        return true;
    }
    login(username: string, password: string) {
        return this.http.post(this.api, JSON.stringify({ username: username, password: password }), {headers: this.header})
            .map((response: Response) => {
                const result = response.json();
                // login successful
                if (result && result.data) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(result.data.username));
                }
            });
    }
}
