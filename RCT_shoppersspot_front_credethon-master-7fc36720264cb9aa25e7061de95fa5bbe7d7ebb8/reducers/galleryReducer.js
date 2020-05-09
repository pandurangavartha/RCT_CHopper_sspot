import * as types from '../actions/actiontype';
import {browserHistory} from 'react-router';
import initialstate from './initialstate';
console.log('-------------4-------------galleryReducer.js----')

export default function gallery(state = initialstate, action) {
    switch (action.type) {
        case types.gall_SUCCESS:
            console.log(action.cats.result,'wine')
            return Object.assign({}, state, {
                galleryData: action.cats.result
            })
        case types.imageDEl_success:
            var tempdata=[];
            console.log(action.cat)
            tempdata=state.galleryData.filter(cat=>{
                return cat._id !=action.cat;
            })
            return Object.assign({}, state,{galleryData: tempdata})
        default:
            return state;
}
}