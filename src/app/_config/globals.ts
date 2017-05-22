/**
 * Created by s.naik on 5/12/17.
 */
'use strict';

export const entities = {
    "intranet": 1,
    "portal": 2
};

export const entityData = {
    "1": {
        "url": "http://intranet.marrickmedical.com/",
        "name": "Marrick Medical Intranet"
    },
    "23": {
        "url": "http://localhost:4202/",
        "name": "My Injury Passport"
    },
    "3": {
        "url": "http://localhost:4201/",
        "name": "Portal"
    }

};
export const apiMarrick = 'http://localhost:8080';
export const apiMarrickRoutes = {
    "authenticateUser": "/authenticate/user",
    "authenticateEntityUser": "/authenticate/entity/[id]",
    "authenticateLocationUser": "/authenticate/location/[id]",
    "authenticateLocation": "/locations"
};


export const defaultTitle = "Marrick Medical Portal";
