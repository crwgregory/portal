/**
 * Created by s.naik on 5/5/2017.
 */

import {NgModule} from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {LogoDirective} from '../_directives/logo.directive';
import {FormsModule} from '@angular/forms';
@NgModule({
    declarations: [
        LoginComponent,
        LogoDirective
    ],
    imports: [FormsModule],
    exports: [
        LoginComponent,
        LogoDirective
    ]
})
export class SharedModule {
}

