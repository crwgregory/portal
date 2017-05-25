import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BaseRequestOptions, HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {APP_BASE_HREF, Location, LocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';
import {LoginComponent, LoginEntitiesComponent, ForgotPasswordComponent, ActivateAccountComponent} from './login/index';
import {RoutesModule} from './routes/routes.module';
import {RouterModule} from '@angular/router';
import {EntityComponent} from './entity/entity.component';

import {AuthenticationService} from './_services/index';
import {GlobalHelper, HttpHelper} from './_helpers/index';
import {Error404Component} from './error-404';
import {getBaseLocation} from './_helpers/helper-functions';
import {ErrorOnPageComponent, PageLoaderComponent} from './_common/index';
import {CustomTemplateDirective} from './_directives/custom-template.directive';

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
        {
            provide: HttpHelper,
            useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
                return new HttpHelper(backend, defaultOptions, false);
            },
            deps: [XHRBackend, RequestOptions]
        },
        // [{provide: APP_BASE_HREF, useValue: window.location.pathname}, {provide: LocationStrategy, useClass: CustomLocationStrategy}]
        {provide: APP_BASE_HREF, useFactory: function () {
            return getBaseLocation();
        }}
        // useValue: getBaseLocation(),

    ],

    // fakeBackendProvider,
    // MockBackend,
    // BaseRequestOptions
    bootstrap: [AppComponent]
})
export class AppModule {
}
