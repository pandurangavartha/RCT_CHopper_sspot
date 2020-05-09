import * as types from './actiontype';
import listApi from '../api/listapi';


export function createItem(cat) {
    return function (dispatch) {
        return listApi.addintoList(cat).then(cats => {
            dispatch({type: types.ADD_LIST_SUCCESS, cats});
        }).catch(error => {
            throw(error);
        });
    };
}
export function deleteItem(cat) {
    return function (dispatch) {
        return listApi.deleteFromList(cat).then(cats => {
            dispatch({type: types.Delete_LIST_SUCCESS, cat});
        }).catch(error => {
            throw(error);
        });
    };
}
export function updateItem(cat) {
    return function (dispatch) {
        return listApi.updateintolist(cat).then(cats => {
            dispatch({type: types.ADD_LIST_SUCCESS, cat});
        }).catch(error => {
            throw(error);
        });
    };
}


export function loadlist() {
    // make async call to api, handle promise, dispatch action when promise is resolved
    return function (dispatch) {
        return listApi.getAllList().then(cats => {
            dispatch({type: types.LOAD_LIST_SUCCESS, cats});
        }).catch(error => {
            throw(error);
        });
    };
}

