import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BaseRequestOptions, HttpModule, RequestOptions, XHRBackend} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent, LoginEntitiesComponent, ForgotPasswordComponent, ActivateAccountComponent} from './login/index';
import {RoutesModule} from './routes/routes.module';
import {RouterModule} from '@angular/router';
import {AlertModule} from 'ngx-bootstrap';

import {AuthenticationService} from './_services/index';
import {LogoDirective} from './_directives/logo.directive';
import {HttpHelper} from './_helpers/http.helper';
import {EntityComponent} from './entity/entity.component';
import {GlobalHelper} from './_helpers/global.helper';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LoginEntitiesComponent,
        ForgotPasswordComponent,
        ActivateAccountComponent,
        LogoDirective,
        EntityComponent,


    ],
    imports: [
        AlertModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpModule,
        RoutesModule,
        RouterModule,
    ],
    providers: [
        AuthenticationService,
        GlobalHelper,
        {
            provide: HttpHelper,
            useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
                return new HttpHelper(backend, defaultOptions, false);
            },
            deps: [XHRBackend, RequestOptions]
        }],
    // fakeBackendProvider,
    // MockBackend,
    // BaseRequestOptions
    bootstrap: [AppComponent]
})
export class AppModule {
}
