import {Injectable} from '@angular/core';

import {getBaseLocation} from "../_helpers/helper-functions";

@Injectable()
export class LocationService {

  public baseHref:string;

  constructor() {
  }

  loadBaseHref():Promise<string> {
    let promise = getBaseLocation();
    promise.then(href => {
      console.log('resolv func');
      this.baseHref = href;
    }).catch(err => {
      console.error(err)
    });
    return promise
  }
}
