import {
    USERS_LOGIN_SUCCESS,
    USERS_LOGIN_FAIL
} from "../actions/loginactions";
import initialState from './initialstate';
import * as types from '../actions/actiontype';


export default (state = initialState.login, action) => {
    console.log('------login intial---action.type-----', state, action.type)
    switch (action.type) {
        case types.USERS_LOGIN_SUCCESS:
            console.log('-----------login Dispacther--------in-------', state)
            return {
                ...state,
                login: action.payload,
                user_token: action.payload,
                insert_token_error: false,
                loggedIn: true,
                pending: false,
                loading:true
            };
        case 'USERS_LOGIN_FAIL':
            console.log('-----------login Dispacther--------out-------', action.payload)
            return {
                ...state,
                insert_token_error: true,
                loggedIn: false
            };
        case types.USERS_LOGOUT_SUCCESS:
            console.log('-----------login Out From---------------', action.payload)
            return {
                ...state,
                login: {},
                user_token: {},
                insert_token_error: true,
                loggedIn: false,
                pending: false
            };
            // return Object.assign({}, state, {
            //     login: {}
            // })
        default:
            console.log('-----------login Dispacther--------default-------',state, action.payload)
            return state;
    }

};
