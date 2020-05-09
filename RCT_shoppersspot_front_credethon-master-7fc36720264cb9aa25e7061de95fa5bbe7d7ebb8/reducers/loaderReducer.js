import * as types from '../actions/actiontype';

console.log('--------reducer--of--LOADER-----------')
export default function toasts(state = [], action) {
    console.log('--------reducer--of--LOADER------action-----',action)
  let add = {loading:true}, remove = {loading:false};
  const { payload, type } = action;
  switch (type) {
    case types.ADD_LOADER:
      console.log('--------Add--of--LOADER-----------',payload, type )
      return [add, ...state];

    case types.REMOVE_LOADER:
      console.log('--------Remove--of--LOADER-----------',payload, type )
      return [remove, ...state];

    default:
      return state;
  }
}