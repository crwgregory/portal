import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthenticationService],

})
export class LoginComponent implements OnInit {
    user: any;
    error= false;
    loading = false;
    button = 'SIGN IN';

    constructor(private authenticationService: AuthenticationService,
                private router: Router
    ) {
        localStorage.removeItem('color');

    }

    ngOnInit() {
        this.user = {username: '', password: ''};

    }

    logForm(isValid: boolean) {
        if (isValid) {
            this.loading = true;
            this.button = 'Signing in...';

            localStorage.setItem('color', '#BCBCBC');
            this.authenticationService.login(this.user.username, this.user.password)
                .subscribe(
                    data => {

                        console.log('Auth success' + localStorage.getItem('currentUser'));
                        this.router.navigate(['home']);
                    },
                    error => {

                        this.loading = false;
                        this.button = 'SIGN IN';
                        this.error = true;
                    }
                );
        }
    }
}
