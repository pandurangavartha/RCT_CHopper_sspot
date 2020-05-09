import * as types from './actiontype';
import listApi from '../api/listapi';

console.log('-------------7---------------galleryActions--')

export function gettheproducts(cat) {
    return function (dispatch) {
        return listApi.getproducts().then(cats => {
           dispatch({type: types.gall_SUCCESS, cats});

            return cats;
        }).catch(error => {
            throw(error);
        });
    };
}
export function addtocart(cat) {
    return function (dispatch) {
        return listApi.addproductstocart(cat).then(cats => {
            return cats;
            // dispatch({type: types.Upload_Product_SUCCESS, cats});
        }).catch(error => {
            throw(error);
        });
    };
}
export function viewtheimage(cat) {
    return function (dispatch) {
        return listApi.viewtheselectedImage(cat).then(cats => {
            console.log('cats',cats);
            dispatch({type: types.product_data_SUCCESS, cats});
            return cats;
        }).catch(error => {
            throw(error);
        });
    };
}
export function deletetheimage(cat) {
    return function (dispatch) {
        return listApi.deleteimageapi(cat).then(cats => {
             dispatch({type: types.imageDEl_success, cat});
             return cats;
        }).catch(error => {
            throw(error);
        });
    };
}
export function getthatpics(cat) {
    return function (dispatch) {
        return listApi.getselectedproducts(cat).then(cats => {
            dispatch({type: types.gall_SUCCESS, cats});
        }).catch(error => {
            throw(error);
        });
    };
}