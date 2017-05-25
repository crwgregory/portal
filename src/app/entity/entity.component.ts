import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpHelper} from '../_helpers/http.helper';
import {Title} from '@angular/platform-browser';
import * as configGlobals from '../_config/globals';
import * as configMessages from '../_config/global-messages';

import {APP_BASE_HREF} from '@angular/common';
import * as webdriver from "selenium-webdriver";
import Thenable = webdriver.promise.Thenable;

@Component({
    selector: 'app-entity',
    templateUrl: './entity.component.html',
    styles: [`
        a {
            font-size: 11px;
            color: #DCDCDC;
        }

        div {
            text-align: right;
        }

        .contents,         
        .contents  div
        {
            width: 100%;
            text-align: center;
        }
    `],

})
export class EntityComponent implements OnInit {
    resetLocation: string | null;
    goToEntity: string;
    locationID: string;
    locationName: string;
    pageLoader: true;
    error: string

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private http: HttpHelper,
                private titleService: Title,
                @Inject(APP_BASE_HREF) private baseHref: string) {
        console.log('My base href ' + this.baseHref);
        this.error = null;
    }

    ngOnInit() {
        this.resetLocation = null;
        // for (let i = 0; i < localStorage.length; i++) {
        //     console.log(localStorage.key(i));
        // }
        // if (sessionStorage.getItem('jwt') === null) {
        console.log(this.router.url);
        // this.router.navigate([getBaseLocation()])
        //     .catch(e => {
        //         console.log('Route not found, redirection stopped with no error raised');
        //     });
        // if (!localStorage.getItem('appBase') || localStorage.getItem('appBase') !== getBaseLocation()) {
        //     localStorage.setItem('appBase', getBaseLocation()) ;
        // // }
        // console.log('BASE : ' + JSON.stringify(window['_app_base']));
        // // localStorage.setItem('logo', 'background-image: url("/images/logo/panda.jpeg"); width:278px; height:181px;');
        // const indexRoute = localStorage.getItem('indexRoute');
        // if (this.router.url === '/') {
        //     console.log('indexRoute: ' + indexRoute);
        //     //
        //     //     if (localStorage.getItem('indexRoute')) {
        //     //         console.log('redirecting....');
        //     //
        //     //         this.router.navigate([indexRoute]);
        //     //         localStorage.setItem('resetLocation', '1');
        //     //     }
        //     //
        //     this.notEntity();
        // } else {
        //     console.log(this.router.url);
        //     const entity = this.router.url.replace('/', '');
        //     this.deleteCache();
        //     localStorage.setItem('defaultUrlSlug', this.router.url);
        //     if (configGlobals.entities.hasOwnProperty(entity)) {
        //         console.log('For entity - ' + entity);
        //         localStorage.setItem('entityID', configGlobals.entities[entity]);
        //     } else {
        //         // this.validateUrl();
        //         // if (defaultSlug === this.router.url && localStorage.getItem('resetLocation')) {
        //         //     this.resetLocation = this.locationName;
        //         // }
        //     }
        // }
        // }

      // (this.baseHref).then(href => {
      //   console.log('href', href)
      // }).catch(err => {
      //   console.error(err)
      // });

        // if (localStorage.getItem('locationID') === '0') {
        //     console.log('IS LOCATIOn');
        //
        //     this.validateUrl();
        // } else {
        //     console.log('NOT LOCATIOn');
        // }
    }

    validateUrl() {
        console.log('In validate ' + this.baseHref);
        // const paths = this.loadBaseHref.split('/');
      let paths = '';

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
                localStorage.setItem('template', data.template);
                localStorage.setItem('locationID', data.id);
                localStorage.setItem('locationName', data.name);
                this.locationName = data.name;
                this.titleService.setTitle(data.name);
            },
            error => {
                this.error = configMessages.incorrectLocation;
                localStorage.removeItem('locationID');
                console.log('In error: LOCATION NOT FOUND ');
                // this.router.navigate(['404']);

            }
        );
    }

    notEntity() {

        this.deleteCache();
        this.titleService.setTitle(configGlobals.defaultTitle);
        this.router.navigate(['']);
    }

    deleteCache() {

        localStorage.clear();
        // localStorage.setItem('indexRoute', '');

    }


}
