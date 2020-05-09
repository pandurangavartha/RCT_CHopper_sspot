import { combineReducers } from 'redux';
import list from './listreducer';
import gallery from './galleryReducer';
import product from './productreducer';
import token from './tokenReducer';
import login from './loginReduce';
import toasts from "./toasts";
import logout from "./logout";
import loader from "./loaderReducer";

console.log('-------------5----------index.js-------')

const rootReducer = combineReducers({
    list,
    gallery,
    product,
    token,
    login,
    toasts,
    logout,
    loader
})

export default rootReducer;


