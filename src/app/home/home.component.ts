import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [AuthenticationService],

})

export class HomeComponent implements OnInit {
    name: string;

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
            this.name = sessionStorage.getItem('username');
            console.log(sessionStorage.getItem('username'));

    }

}
