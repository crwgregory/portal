/**
 * Created by s.naik on 5/23/17.
 */
import * as configGlobals from '../_config/globals';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import {HttpHelper} from "./http.helper";

export function getBaseLocation() {

  return new Promise((resolve, reject) => {
    const paths = window.location.pathname.split('/');
    let basePath = '';

    switch (paths.length) {
      case 1:
        resolve(returnBasePath(basePath));
        break;
      case 2:
        if (paths[1] === '404' || paths[1] === '') {
          localStorage.clear();
          resolve(returnBasePath(basePath));
        } else if (configGlobals.entities[paths[1]]) {
          localStorage.removeItem('locationID');
          localStorage.setItem('entityID', configGlobals.entities[paths[1]]);
          basePath = paths[1];
        }
        resolve(returnBasePath(basePath));
        break;
      default:
        let body = '?organization_pathname=';
        body = (paths[1]) ? body + paths[1] : body;
        body = (paths[2]) ? body + '&location_pathname=' + paths[2] : body;
        const url = configGlobals.apiMarrick + configGlobals.apiMarrickRoutes.authenticateLocation + body;
        getLocationsData(url).then(() => {
          console.log('resolving get location data');
          basePath = paths[1];
          basePath += (paths[2]) ? '/' + paths[2] : '';
          resolve(returnBasePath(basePath));
        }).catch((err) => {
          console.error('catch err: ', err);
          console.log('ERROR: Invalid location');
          window.location.replace('404');
          reject(err);
        })
    }
  });
}

function returnBasePath(basePath) {
  basePath = '/' + basePath;
  localStorage.setItem('baseUrl', basePath);
  console.log(basePath);
  return basePath;
}

export function getLocationsData(url) {

    let req = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
          if (req.status >= 300) {
            reject(req)
          } else {
            console.log('req ' + req.response);
            let response = JSON.parse(req.response);

            let data = response.data;

            if (data.pathname) {
              localStorage.removeItem('entityID');
              localStorage.setItem('locationID', data.id);
            } else {
              reject()
            }
            resolve()
          }
        }
      };
      req.open('GET', url);
      req.send();
    });
}
