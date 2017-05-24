/**
 * Created by s.naik on 4/18/2017.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {AuthenticationService} from '../_services/authentication.service';
import {EntityComponent} from '../entity/entity.component';
import {Error404Component} from '../error-404';

export const routes: Routes = [
    {path: '', component: EntityComponent, pathMatch: 'full'},
    {path: 'login', component: LoginComponent, pathMatch: 'full'},
    {path: 'login/:logout', component: LoginComponent},//, canActivate: [AuthenticationService]
    {path: '404', component: Error404Component},
    // otherwise to entity
    {path: '**', component: EntityComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutesModule {
}
