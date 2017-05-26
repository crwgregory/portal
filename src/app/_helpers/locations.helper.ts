/**
 * Created by s.naik on 5/25/17.
 */
import {Injectable} from '@angular/core';
import {HttpHelper} from './http.helper';
import {Config} from 'protractor';

@Injectable()
export class LocationHelper{
    public current: string;

    constructor(private http: HttpHelper, private config: Config) {
    }


    load(): Promise<string> {
        let url = 'http://localhost:8080/locations?styles=1&organization_pathname=jackie-chiles-law&location_pathname=centennial';
        // let pos = location.hostname.lastIndexOf(this.config.rootDomain);
        // let url = (pos === -1)
        //     ? this.config.apiEndpoint + '/sites?host=' + location.hostname
        //     : this.config.apiEndpoint + '/sites/' + location.hostname.substr(0, pos);
        let promise = this.http.get(url).map(res => res.json()).toPromise();
        promise.then(site => this.current = site);
        return promise;
    }
}

