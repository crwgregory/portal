import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpHelper} from '../_helpers/http.helper';
import {Title} from '@angular/platform-browser';
import * as configGlobals from '../_config/globals';

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

    `],

})
export class EntityComponent implements OnInit {
    resetLocation: string | null;
    goToEntity: string;
    locationID: string;
    locationName: string;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private http: HttpHelper,
                private titleService: Title) {
    }

    ngOnInit() {
        this.resetLocation = null;
        console.log('on init');
        for (let i = 0; i < localStorage.length; i++) {
            console.log(localStorage.key(i));
        }
        if (sessionStorage.getItem('jwt') === null) {
            // localStorage.setItem('logo', 'background-image: url("/images/logo/panda.jpeg"); width:278px; height:181px;');
            const defaultSlug = localStorage.getItem('defaultUrlSlug');
            if (this.router.url === '/') {
                console.log('slug ' + defaultSlug);
                //
                //     if (localStorage.getItem('defaultUrlSlug')) {
                //         console.log('redirecting....');
                //
                //         this.router.navigate([defaultSlug]);
                //         localStorage.setItem('resetLocation', '1');
                //     }
                //
                this.notEntity();
            } else {
                console.log(this.router.url);
                const entity = this.router.url.replace('/', '');
                this.deleteCache();
                localStorage.setItem('defaultUrlSlug', this.router.url);
                if (configGlobals.entities.hasOwnProperty(entity)) {
                    console.log('For entity - ' + entity);
                    localStorage.setItem('entityID', configGlobals.entities[entity]);
                } else {
                    this.validateUrl();
                    // if (defaultSlug === this.router.url && localStorage.getItem('resetLocation')) {
                    //     this.resetLocation = this.locationName;
                    // }
                }
            }
        }
    }

    validateUrl() {
        console.log('In validate ');

        let body = 'styles=1&organization_pathname=';
        body = (this.activatedRoute.snapshot.url.length > 0) ? body + this.activatedRoute.snapshot.url[0].path : body;
        body = (this.activatedRoute.snapshot.url.length > 1) ? body + '&location_pathname=' + this.activatedRoute.snapshot.url[1].path : body;

        const url = configGlobals.apiMarrick + configGlobals.apiMarrickRoutes.authenticateLocation + '?' + body;
        console.log(url);
        return this.http.get(url, {}).subscribe(
            res => {
                const data = res.json().data;
                console.log('data - ' + JSON.stringify(data.name));

                this.locationID = data.id;
                localStorage.setItem('template', data.template);
                localStorage.setItem('locationID', data.id);
                localStorage.setItem('locationName', data.name);
                this.locationName = data.name;
                this.titleService.setTitle(data.name);
            },
            error => {
                console.log('In error ' + JSON.stringify(error));
                this.notEntity();

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
        // localStorage.setItem('defaultUrlSlug', '');

    }


}
