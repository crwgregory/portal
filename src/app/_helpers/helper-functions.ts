/**
 * Created by s.naik on 5/23/17.
 */
import * as configGlobals from '../_config/globals';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
export function getBaseLocation() {
    const paths = window.location.pathname.split('/');
    let basePath = '';
    if (paths[1] === '') {
        localStorage.clear();
        return '/';
    }
    if (paths.length < 3 || paths[2] === '') {
        if (paths[1] === '404') {
            localStorage.clear();
        } else if (configGlobals.entities[paths[1]]) {
            localStorage.clear();
            localStorage.setItem('entityID', configGlobals.entities[paths[1]]);
            basePath = paths[1];
        }
    }
    if (basePath === '') {

        basePath = paths[1];
        basePath += (paths[2]) ? '/' + paths[2] : '';
        localStorage.setItem('locationID', '0');
    }

    basePath = '/' + basePath;
    localStorage.setItem('baseUrl', basePath);
    console.log('base : '+ basePath);
    return basePath;
}
//
// function getLocationsData(url) {
//     console.log('in here' + url);
//     return new Observable<any>(function () {
//         let req = new XMLHttpRequest();
//
//         req.onreadystatechange = function () {
//             console.log('loop');
//             //
//             if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
//                 console.log('IN HELPER ' + JSON.stringify(req.response));
//                 //
//                 let response = JSON.parse(req.response);
//
//                 let data = response.data;
//
//                 if (data.pathname) {
//                     localStorage.removeItem('entityID');
//                     localStorage.setItem('locationID', data.id);
//                     // resolve(JSON.parse(req.response))
//                 } else {
//                     // reject(req.response)
//                     console.log('ERROR: Invalid location');
//                     window.location.replace('404');
//
//                 }
//             } else {
//                 console.log('loop');
//             }
//
//         };
//
//         req.open('GET', url);
//         req.send();
//     })
//         ;
//
// }
