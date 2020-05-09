import * as types from './actiontype';
import listApi from '../api/listapi';


export function registerUser(cat) {
    console.log('-----actions ------------------', cat)
    return function (dispatch) {
        console.log('-----actions ----------dispatch--------', dispatch)
        return listApi.registerTheuser(cat).then(cats => {
            return cats;
        }).catch(error => {
            throw (error);
        });
    };
}

export function UpdateProfiles(cat) {
    console.log('-----actions ----------UpdateProfileDetails--------',cat)
    // return function (dispatch) {
        return listApi.updateUserDetails(cat).then(cats => {
            console.log('-----actions ----------UpdateProfileDetails--------', dispatch)
            return cats;
        }).catch(error => {
            throw (error);
        });
    // };
}

export function getProfileDetails() {
    return function (dispatch) {
        console.log('-----actions ----------getProfileDetails--------', dispatch)
        return listApi.getProfileDetails().then(cats => {
            return cats;
        }).catch(error => {
            throw (error);
        });
    };
}