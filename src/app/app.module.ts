import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BaseRequestOptions, HttpModule, RequestOptions, XHRBackend} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RoutesModule} from './routes/routes.module';
import {RouterModule} from '@angular/router';
import {AlertModule} from 'ngx-bootstrap';
import {AuthenticationService} from './_services/index';
import {LogoDirective} from './_directives/logo.directive';
import {ApplicationComponent, QuestionsComponent, CategoriesNavComponent} from './application/index';
import { HomeComponent } from './home/home.component';
import {HttpHelper} from './_helpers/http.helper';
import { EntityComponent } from './entity/entity.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LogoDirective,
        ApplicationComponent,
        QuestionsComponent,
        CategoriesNavComponent,
        HomeComponent,
        EntityComponent

    ],
    imports: [
        AlertModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpModule,
        RoutesModule,
        RouterModule,
    ],
    providers: [ AuthenticationService, {
        provide: HttpHelper,
        useFactory:
            (backend: XHRBackend, defaultOptions: RequestOptions) => {
                return new HttpHelper(backend, defaultOptions, false);
            },
        deps: [ XHRBackend, RequestOptions]   } ],
    // fakeBackendProvider,
    // MockBackend,
    // BaseRequestOptions
    bootstrap: [AppComponent]
})
export class AppModule {
}
