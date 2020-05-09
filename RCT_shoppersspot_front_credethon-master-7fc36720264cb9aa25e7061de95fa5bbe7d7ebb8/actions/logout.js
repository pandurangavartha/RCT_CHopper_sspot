import * as types from './actiontype';
import listApi from '../api/listapi';
import history from '../history';
export function logoutuser() {
    return function (dispatch) {
        dispatch(success({}));
    };
}

function success(user) {
    return {
        type: 'USERS_LOGOUT_SUCCESS',
        payload: user
    }
}

function fail(error) {
    return {
        type: 'USERS_LOGOUT_FAIL',
        payload: error
    }
}