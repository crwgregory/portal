import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [AuthenticationService],
    encapsulation: ViewEncapsulation.None


})
export class LoginComponent implements OnInit {
    user: any;
    error = false;
    loading = false;
    loggedIn = false;
    toApp: string;
    appLinks: {};

    constructor(
                private authenticationService: AuthenticationService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private location: Location) {

    }

    ngOnInit() {
        this.user = {username: '', password: ''};
        this.appLinks = {
            'portal': 'home',
            'passport': 'http://localhost:4202/'
        };

        if (this.activatedRoute.snapshot.queryParams['logout']) {
            this.logout();
            console.log('logged out');
        }

        if (sessionStorage.getItem('username') && sessionStorage.getItem('jwt')) {
            this.loggedIn = true;
            this.user.username = sessionStorage.getItem('username');
        }

    }

    login(isValid: boolean) {
            if (isValid) {
                this.loading = true;
                this.authenticationService.authLogin(this.user.username, this.user.password).subscribe(
                        data => {
                            console.log(JSON.stringify(data));

                            this.loggedIn = true;
                            this.loading = false;
                            sessionStorage.setItem('username', this.user.username);
                            sessionStorage.setItem('jwt', data.jwt);

                        },
                        error => {
                            this.loading = false;
                            this.error = true;
                        }
                    );
            }

    }


    sendToApp(toApp: string) {
        this.loading = true;
        this.toApp = toApp;
        console.log(toApp);
        switch (toApp) {
            case 'portal':
                this.router.navigate(['home']);
                break;
            case 'passport':
                this.logout();
                this.location.go(this.appLinks['passport']);
                break;
        }
    }

    logout() {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('jwt');
    }
}
