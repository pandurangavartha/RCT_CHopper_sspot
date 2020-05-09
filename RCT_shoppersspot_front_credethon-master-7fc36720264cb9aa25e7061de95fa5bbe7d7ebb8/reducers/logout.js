import * as types from '../actions/actiontype';
import initialState from './initialstate';

console.log('--------reducer--of--logout-----------')
export default function toasts(state = initialState.login, action) {
    console.log('--------reducer--of--logout------logout-----',action)
  const { payload, type } = action;
  console.log('--------reducer--of--logout-----------',payload, type,state )
  switch (type) {
    case types.USERS_LOGOUT_SUCCESS:
      return [payload, ...state];

    case types.USERS_LOGOUT_FAIL:
      return [payload, ...state];

    default:
      return state;
  }
}