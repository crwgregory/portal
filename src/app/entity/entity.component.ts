import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpHelper} from '../_helpers/http.helper';
import {Title} from '@angular/platform-browser';
import * as configGlobals from '../_config/globals';
import * as configMessages from '../_config/global-messages';

import {APP_BASE_HREF} from '@angular/common';

@Component({
    selector: 'app-entity',
    templateUrl: './entity.component.html',

})
export class EntityComponent implements OnInit {
    locationID: string;
    locationName: string;
    error: string
    pageLoader = true;

    constructor(private router: Router,
                private http: HttpHelper,
                private titleService: Title,
                @Inject(APP_BASE_HREF) private baseHref: string) {
        console.log('My base href' + this.baseHref);
        this.error = null;
    }

    ngOnInit() {
        if (localStorage.getItem('locationID') === '0') {
            this.validateUrl();
        } else{
            this.pageLoader = false;
        }


    }

    validateUrl() {
        const paths = this.baseHref.split('/');

        let body = 'styles=1&organization_pathname=';
        body = (paths.length > 0) ? body + paths[1] : body;
        body = (paths.length > 2) ? body + '&location_pathname=' + paths[2] : body;

        const url = configGlobals.apiMarrick + configGlobals.apiMarrickRoutes.authenticateLocation + '?' + body;
        console.log(url);
        return this.http.get(url, {}).subscribe(
            res => {
                const data = res.json().data;
                console.log('data - ' + JSON.stringify(data));

                this.locationID = data.id;
                localStorage.setItem('template', JSON.stringify(data.template));
                localStorage.setItem('locationID', data.id);
                this.locationName = data.name;
                this.titleService.setTitle(data.name);
                this.pageLoader = false;

            },
            error => {
                console.log('In error: LOCATION NOT FOUND ');
                this.clearEntityData();
                this.pageLoader = false;

            },
        );
    }

    clearEntityData() {
        this.error = configMessages.incorrectLocation;
        this.deleteCache();
        this.titleService.setTitle(configGlobals.defaultTitle);
    }

    deleteCache() {
        localStorage.clear();
    }


}
