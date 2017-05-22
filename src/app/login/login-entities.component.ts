/**
 * Created by s.naik on 5/17/17.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalHelper} from '../_helpers/global.helper';

import * as configGlobals from '../_config/globals';
import * as configMessages from '../_config/global-messages';

@Component({
    selector: 'select-entity',
    template: `
        <div align="center">
            <div *ngFor="let entity of entities;" [hidden]="!getAppProperty(entity)">
                <input type="button" [attr.value]="getAppProperty(entity, 'name')"
                       [disabled]="loading" (click)="redirect(entity, $event)"/>

            </div>
            <div *ngIf="!entities.length" class="alert alert-danger">{{messages.userNoAccessRights}}
            </div>
        </div>`,

})
export class LoginEntitiesComponent {
    loading = false;
    selectedEntity: string;
    entities: any;
    configApps: {};
    messages: {};

    constructor(private route: Router,
                private globalHelper: GlobalHelper) {
        const jwtData = this.globalHelper.parseJwt(sessionStorage.getItem('jwt'));
        this.entities = jwtData.entity_ids;
        this.configApps = configGlobals.entityData;
        this.messages = configMessages;

    }

    redirect(entity, event) {

        this.loading = true;
        this.selectedEntity = entity;
        event.target.value = event.target.value + '...';
        event.target.classList.add('btn-active');
        switch (entity) {
            case 'portal':
                this.route.navigate(['home']);
                break;
            case 'passport':
                location.replace(configGlobals.entityData[configGlobals.entities[entity].url]);
                break;
            default:
                location.replace(this.getAppProperty(entity, 'url'));

        }
    }

    getAppProperty(entityID, propertyName) {
        if (propertyName) {
            let name = '';
            if (!configGlobals.entityData[entityID]) {
                this.entities.splice(this.entities.indexOf(entityID), 1);
                console.log(JSON.stringify(this.entities));
            } else {
                name = configGlobals.entityData[entityID][propertyName];
            }
            return name;

        }
        return configGlobals.entityData[entityID] ? '1' : null;
    }
}
