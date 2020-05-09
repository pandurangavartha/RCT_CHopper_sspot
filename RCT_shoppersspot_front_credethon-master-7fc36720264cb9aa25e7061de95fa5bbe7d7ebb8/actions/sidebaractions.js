import * as types from './actiontype';
import listApi from '../api/listapi';


export function getthatpics(cat) {
    return function (dispatch) {
        return listApi.getselectedproducts(cat).then(cats => {
            dispatch({type: types.gall_SUCCESS, cats});
        }).catch(error => {
            throw(error);
        });
    };
}