/**
 * Created by s.naik on 5/5/2017.
 */

import {NgModule} from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {CustomDirective} from '../_directives/custom.directive';
import {FormsModule} from '@angular/forms';
@NgModule({
    declarations: [
        LoginComponent,
        CustomDirective
    ],
    imports:[FormsModule],
    exports: [
        LoginComponent,
        CustomDirective
    ]
})
export class SharedModule {
}

