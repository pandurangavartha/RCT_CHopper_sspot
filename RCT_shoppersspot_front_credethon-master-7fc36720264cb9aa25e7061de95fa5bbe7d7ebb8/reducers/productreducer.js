import * as types from '../actions/actiontype';
import {browserHistory} from 'react-router';
import initialstate from './initialstate';
export default function product(state = initialstate, action) {
    switch (action.type) {
        case types.product_data_SUCCESS:
            console.log(action.cats)
            return {prouductinfo: action.cats}
        default:
            return state;
}
}