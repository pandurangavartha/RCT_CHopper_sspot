import * as types from './actiontype';
import listApi from '../api/listapi';


export function gettheorderedproducts(cat) {
    return function (dispatch) {
        return listApi.getorderedproducts(cat).then(cats => {
            return cats;
        }).catch(error => {
            throw(error);
        });
    };
}

