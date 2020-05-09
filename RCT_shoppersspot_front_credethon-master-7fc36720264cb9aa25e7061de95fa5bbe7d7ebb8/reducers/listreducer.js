import * as types from '../actions/actiontype';
import {browserHistory} from 'react-router';
import initialstate from './initialstate';
export default function list(state = initialstate, action) {
    switch (action.type) {
        case types.ADD_LIST_SUCCESS:
            console.log(action.cats,'fwhi add')
            state.listData.unshift(action.cats.result)
            return {listData: state.listData}
        case types.LOAD_LIST_SUCCESS:
            console.log(action.cats, 'find a solution')
            return Object.assign({}, state, {
                listData: action.cats
            })
        case types.Delete_LIST_SUCCESS:
        {
            var tempdata=[];
            tempdata=state.listData.filter(cat=>{
                return cat.id !=action.cat.id;
            })
            return Object.assign({}, state,{listData: tempdata})
        }
        case types.Update_LIST_SUCCESS:
        {
            const indexOfCatToDelete = state.listData.findIndex(cat => {
                return cat.id == action.cat.id
            })
            if (indexOfCatToDelete != -1) {
                state.listData[indexOfCatToDelete]=action.cat;
                return {listData: state.listData}
            }
        }
        default:
            return state;
}
}