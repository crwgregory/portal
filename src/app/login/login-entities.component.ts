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
            <div *ngFor="let entity of entities;" [hidden]="!getAppProperty(entity, null)">
                <input type="button" [attr.value]="getAppProperty(entity, 'name')"
                       [disabled]="loading" (click)="redirect(entity, $event)"/>

            </div>
            <div *ngIf="entityCount === 0" class="alert alert-danger">{{messages.userNoAccessRights}}
            </div>
        </div>`,

})
export class LoginEntitiesComponent {
    loading = false;
    selectedEntity: string;
    entities: any;
    configApps: {};
    messages: {};
    entityCount: number;

    constructor(private route: Router,
                private globalHelper: GlobalHelper) {
        const jwtData = this.globalHelper.parseJwt(sessionStorage.getItem('jwt'));
        console.log(JSON.stringify(jwtData.entity_ids));
        this.entities = jwtData.entity_ids;
        this.configApps = configGlobals.entityData;
        this.messages = configMessages;
        this.entityCount = 0;

    }

    redirect(entity, event) {
        this.loading = true;
        this.selectedEntity = entity;
        event.target.value = event.target.value + '...';
        event.target.classList.add('btn-active');
        location.replace(this.getAppProperty(entity, 'url'));

    }

    getAppProperty(entityID, propertyName) {
        if (!configGlobals.entityData[entityID]) {
            console.log('N O EN TI YT FOND');
            return null;
        }

        this.entityCount++;
        return configGlobals.entityData[entityID][propertyName] || entityID;
    }
}
