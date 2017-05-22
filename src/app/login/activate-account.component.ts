/**
 * Created by s.naik on 5/22/17.
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'activate-account',
    templateUrl: 'password-retrieval.html',

})
export class ActivateAccountComponent {
    loading = false;
    username: string;
    error: string;
    @Input() page: string | boolean;
    @Output() pageChange = new EventEmitter<boolean>();

    constructor(private route: Router,
                private location: Location) {
    }

    openLogin() {
        console.log('go back');
        this.pageChange.emit(false);
    }

    sendEmail() {
    }
}
