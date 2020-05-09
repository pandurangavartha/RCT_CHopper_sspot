import * as types from './actiontype';
import listApi from '../api/listapi';
import history from '../history';

export function loginuser(cat) {
    return function (dispatch) {
        return listApi.redirectToLogin(cat).then(cats => {
            console.log('----------login action-----------',cats)
            if (cats.success) {
                dispatch(success(cats.data));
                localStorage.setItem('auth', cats.data._id)
                localStorage.setItem('islogin', true);
                localStorage.setItem('user_id', cats.data._id);
                localStorage.setItem('email', cats.data.email);
                window.location.href = "#/dashboard";
                return cats;
            }
        }).catch(error => {
            dispatch(fail(error));
            throw (error);
        });
    };
}

function success(user) {
    return {
        type: 'USERS_LOGIN_SUCCESS',
        payload: user
    }
}

function fail(error){
    return {
        type : 'USERS_LOGIN_FAIL',
        payload: error
    }
}

export function loginOutUser(cat) {
    return function (dispatch) {
        dispatch(logOutSuccess({}));
    }
}
function logOutSuccess(user) {
    return {
        type: 'USERS_LOGOUT_SUCCESS',
        payload: user
    }
}

export function socialLoginuser(cat) {
    return function (dispatch) {
        return listApi.redirectToLogin(cat).then(cats => {
            console.log('----------Social Login action-----------',cats)
            if (cats.success) {
                dispatch(success(response.data));
                localStorage.setItem('auth', cats.data._id)
                localStorage.setItem('islogin', true);
                localStorage.setItem('user_id', cats.data._id);
                localStorage.setItem('email', cats.data.email);
                window.location.href = "#/dashboard";
                return cats;
            }
        }).catch(error => {
            dispatch(fail(error));
            throw (error);
        });
    };
}


function socialSuccess(user) {
    return {type: 'USERS_SOCIAL_LOGIN_SUCCESS', user}
}
function socialFailure(error) {
    return {type: 'USERS_SOCIAL_LOGIN_ERROR', error}
}

