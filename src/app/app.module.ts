import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RoutesModule} from './routes/routes.module';
import {RouterModule} from '@angular/router';
import {AlertModule} from 'ngx-bootstrap';
import {AuthenticationService} from './_services/index';
import {CustomDirective} from './_directives/custom.directive';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CustomDirective
    ],
    imports: [
        AlertModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpModule,
        RoutesModule,
        RouterModule
    ],
    providers: [AuthenticationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
