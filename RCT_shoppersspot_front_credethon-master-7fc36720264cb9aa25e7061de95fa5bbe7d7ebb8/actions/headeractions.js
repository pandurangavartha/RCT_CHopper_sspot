import * as types from './actiontype';
import listApi from '../api/listapi';

export function cartproducts(cat) {
    return function (dispatch) {
        return listApi.getlistofcart(cat).then(cats => {
            return cats;
        }).catch(error => {
            throw(error);
        });
    };
}
export function ordertheproduct(cat) {
    return function (dispatch) {
        return listApi.productorder(cat).then(cats => {
            return cats;
        }).catch(error => {
            throw(error);
        });
    };
}
export function gettheproducts(cat) {
    return function (dispatch) {
        return listApi.getproducts().then(cats => {
           dispatch({type: types.gall_SUCCESS, cats});

            //return cats;
        }).catch(error => {
            throw(error);
        });
    };
    }
    export function cancelorder(cat,cancelid) {
    return function (dispatch) {
        return listApi.cancelorderapi(cat,cancelid).then(cats => {
            return cat;
        }).catch(error => {
            throw(error);
        });
    };
}
