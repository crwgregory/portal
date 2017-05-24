/**
 * Created by s.naik on 5/23/17.
 */
import * as configGlobals from '../_config/globals';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import {HttpHelper} from "./http.helper";

export function getBaseLocation() {
    const paths = window.location.pathname.split('/');
    let basePath = '';
    // if (localStorage.getItem('baseUrl')) {
    //     return localStorage.getItem('baseUrl');
    // }
    switch (paths.length) {
        case 1:
            break;
        case 2:
            if (paths[1] === '404' || paths[1] === '') {
                localStorage.clear();
                break;
            }
            if (configGlobals.entities[paths[1]]) {
                localStorage.removeItem('locationID');
                localStorage.setItem('entityID', configGlobals.entities[paths[1]]);
                basePath = paths[1];
                break;
            }
        default:
            basePath = paths[1];
            basePath += (paths[2]) ? '/' + paths[2] : '';
            localStorage.setItem('locationID', '0');

        //
        // let body = '?organization_pathname=';
        // body = (paths[1]) ? body + paths[1] : body;
        // body = (paths[2]) ? body + '&location_pathname=' + paths[2] : body;
        // const url = configGlobals.apiMarrick + configGlobals.apiMarrickRoutes.authenticateLocation + body;
        // const res = getLocationsData(url);
        // let res = getLocationsData(url).map(data => {
        //     console.log('hi haha ');
        // });
        // console.log('respo: ' + JSON.stringify(res));

    }
    basePath = '/' + basePath;
    localStorage.setItem('baseUrl', basePath);
    console.log(basePath);
    return basePath;
}
export function getLocationsData(url) {

    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {
    //
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            console.log('req ' + JSON.stringify(req.response));
    //
    //         let response = JSON.parse(req.response);
    //
    //         let data = response.data;
    //
    //         if (data.pathname) {
    //             localStorage.removeItem('entityID');
    //             localStorage.setItem('locationID', data.id);
    //
    //         } else {
    //             console.log('ERROR: Invalid location');
    //             window.location.replace('404');
    //         }
    //     } else {
    //
        }
    };
    req.open('GET', url);
    req.send();


}
