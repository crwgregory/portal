import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import * as configGlobals from './_config/globals';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,

})
export class AppComponent {
    isLogin = false;

    constructor(private titleService: Title) {
        this.titleService.setTitle(configGlobals.defaultTitle);
    }

}
