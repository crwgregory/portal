import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';

import {AppComponent} from './app.component';
import {LoginComponent, LoginEntitiesComponent, ForgotPasswordComponent, ActivateAccountComponent} from './login/index';
import {RoutesModule} from './routes/routes.module';
import {RouterModule} from '@angular/router';
import {EntityComponent} from './entity/entity.component';

import {AuthenticationService, LocationService} from './_services/index';
import {GlobalHelper, HttpHelper,} from './_helpers/index';
import {Error404Component} from './error-404';
import {ErrorOnPageComponent, PageLoaderComponent} from './_common/index';
import {CustomTemplateDirective} from './_directives/custom-template.directive';

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
    return new HttpHelper(backend, defaultOptions, false);
}

export function loadBaseHref(location: LocationService) {
    return () => location.loadBaseHref();
}

export function getBaseHref(location: LocationService) {
    return location.baseHref;
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LoginEntitiesComponent,
        ForgotPasswordComponent,
        ActivateAccountComponent,
        CustomTemplateDirective,
        EntityComponent,
        Error404Component,
        ErrorOnPageComponent,
        PageLoaderComponent

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RoutesModule,
        RouterModule,
    ],
    providers: [
        AuthenticationService,
        GlobalHelper,
        LocationService,
        {
            provide: APP_INITIALIZER,
            useFactory: loadBaseHref,
            deps: [LocationService],
            multi: true
        },
        {
            provide: HttpHelper,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
        },
        {
            provide: APP_BASE_HREF,
            useFactory: getBaseHref,
            deps: [LocationService]
        }


    ],

// fakeBackendProvider,
// MockBackend,
// BaseRequestOptions
    bootstrap: [AppComponent]
})
export class AppModule {
}
