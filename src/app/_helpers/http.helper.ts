/**
 * Created by s.naik on 5/15/17.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response, ConnectionBackend, RequestOptions, RequestOptionsArgs} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpHelper extends Http {
    private http: any;
    private headers: any;

    constructor(backend: ConnectionBackend,
                defaultOptions: RequestOptions,
                private debugMode: boolean) {
        super(backend, defaultOptions);
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        JSON.stringify(this.customiseOptions(options));
        return super.post(url, JSON.stringify(body), this.customiseOptions(options))
            .map(this.extractData)
            .catch(this.handleError);
    }

    private customiseOptions(options: any) {
        if (options.headers) {
            Object.keys(this.headers).map((key) => {
                options.headers.append(key, this.headers[key]);
            });
        }
        return options;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        if (this.debugMode) {
            console.log(error);
        }

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
