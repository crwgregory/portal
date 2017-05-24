/**
 * Created by s.naik on 5/24/17.
 */
import {Injectable} from '@angular/core';
import {HashLocationStrategy} from '@angular/common';
import * as configGlobals from '../_config/globals';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class CustomLocationStrategy extends HashLocationStrategy {
    prepareExternalUrl(internal: string): string {

        if (sessionStorage.getItem('baseUrl')) {
            alert('here ' + this.getBaseHref());
            return this.getBaseHref() + '/#' + internal;
        }

        const url = this.getBaseLocation() ;
        localStorage.setItem('baseUrl', '1');
        return url;
    }
    getBaseLocation() {
        const paths = window.location.pathname.split('/');
        let basePath = '';
alert(paths.length);
        switch (paths.length) {
            case 1:
                break;
            case 2:
                if (paths[1] === '404' || paths[1] === '') {
                    localStorage.clear();
                    break;
                }
                if (configGlobals.entities[paths[1]]) {
                    alert(2);

                    localStorage.removeItem('locationID');
                    localStorage.setItem('entityID', configGlobals.entities[paths[1]]);
                    basePath = paths[1];
                    break;
                }
            default:
                basePath = paths[1];
                basePath += (paths[2]) ? '/' + paths[2] : '';

                // let body = '?organization_pathname=';
                // body = (paths[1]) ? body + paths[1] : body;
                // body = (paths[2]) ? body + '&location_pathname=' + paths[2] : body;
                // const url = configGlobals.apiMarrick + configGlobals.apiMarrickRoutes.authenticateLocation + body;
                //
                // // const res = getLocationsData(url);
                // let res = this.validateLocation(url).map(data => {
                //     console.log('hi haha ');
                // });
                // console.log('respo: ' + JSON.stringify(res));

        }

        return '/' + basePath;
    }
    validateLocation(url){
        console.log('URL ' + url);

        return Observable.fromPromise(new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();

            req.onreadystatechange = function () {

                if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                    console.log('req ' + JSON.stringify(req.response));

                    let response = JSON.parse(req.response);

                    let data = response.data;

                    if (data.pathname) {
                        localStorage.removeItem('entityID');
                        localStorage.setItem('locationID', data.id);

                        resolve(data);
                    } else {
                        console.log('ERROR: Invalid location');
                        window.location.replace('404');
                        // reject({});
                    }
                } else {

                }
                //     if (req.response) {
                //     return req.response;
                // }
            };
            req.open('GET', url);
            req.send();

        }));
    }
}