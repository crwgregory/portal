/**
 * Created by s.naik on 5/23/17.
 */
import {Component} from '@angular/core';
@Component({
    selector:'page-not-found',
    template: `<div align="center"><H1> PAGE NOT FOUND</H1></div>`,
    styles: [`
    div{
        text-align: center;
        padding-top: 30px;
    }
   
    `]
})
export class Error404Component {
}
