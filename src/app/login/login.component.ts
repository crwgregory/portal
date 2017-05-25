import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {GlobalHelper} from '../_helpers/global.helper';
import * as configGlobals from '../_config/globals';
import * as configMessages from '../_config/global-messages';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [AuthenticationService, GlobalHelper],
    encapsulation: ViewEncapsulation.None


})
export class LoginComponent implements OnInit {
    user: any;
    error = false;
    loading = false;
    page: string | boolean;
    errorText: string;
    messages: any;
    apps: any;
    username: string;
    // @Input() goToEntity: string;

    constructor(private authenticationService: AuthenticationService,
                private activatedRoute: ActivatedRoute,
                private route: Router,
                private globalHelper: GlobalHelper) {
        this.messages = configMessages;
        this.username = sessionStorage.getItem('username');

    }

    ngOnInit() {
        this.page = false;
        this.user = {username: '', password: ''};


            this.activatedRoute.params
                .subscribe((urlParams: Params) => {
                    if (urlParams['logout'] === 'logout') {
                        if (sessionStorage.getItem('username')) {

                            this.logout();
                            this.error = true;
                            this.errorText = this.messages.loggedOut;
                        } else {
                            this.route.navigate(['']);
                        }
                    }

                });
        if (sessionStorage.getItem('username') && sessionStorage.getItem('jwt')) {
            this.page = 'select-entity';
            this.user.username = sessionStorage.getItem('username');
        }

    }

    openLogin() {
        this.page = false;
    }

    openPage(page: string | boolean) {
        this.page = page;
    }

    login(isValid: boolean) {
        this.error = false;
        this.errorText = null;

        if (isValid) {
            this.loading = true;
            this.authenticationService.authLogin(this.user.username, this.user.password)
                .subscribe(
                    res => {
                        const data = res.json().data;
                        console.log('API Data: ' + JSON.stringify(this.globalHelper.parseJwt(data.jwt)));


                        this.loading = false;
                        const jwtData = this.globalHelper.parseJwt(data.jwt);
                        if (jwtData.entity_ids === null || jwtData.entity_ids.length < 1) {
                            this.error = true;
                            this.errorText = configMessages.userNoAccessRights;
                            this.user.password = '';

                        } else {
                            sessionStorage.setItem('username', this.user.username);
                            sessionStorage.setItem('jwt', data.jwt);
                            if (jwtData.entity_ids.length === 1 && configGlobals.entityData[jwtData.entity_ids[0]]) {
                                window.location.replace(configGlobals.entityData[jwtData.entity_ids[0]].url);
                            } else {
                                this.page = 'select-entity';
                                this.username = this.user.username;
                            }
                        }

                    },
                    error => {
                        console.log('ERROR: ' + JSON.stringify(error));
                        const body = error.json();
                        this.user.password = '';
                        this.loading = false;
                        this.error = true;
                        if (error.status === 403) {
                            this.errorText = this.messages.loginErrorPrefix + configMessages.userEntityNoAccessRights;
                        } else if (error.status === 403) {
                            this.errorText = this.messages.loginErrorPrefix + configMessages.userInvalid;
                        }
                    }
                );
        }

    }


    logout() {
        this.page = false;
        this.username = null;
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('jwt');
    }
}
