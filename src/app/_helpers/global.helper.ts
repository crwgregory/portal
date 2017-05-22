/**
 * Created by s.naik on 5/22/17.
 */
import {Injectable} from '@angular/core';
@Injectable()

export class GlobalHelper {
    function

    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };
}