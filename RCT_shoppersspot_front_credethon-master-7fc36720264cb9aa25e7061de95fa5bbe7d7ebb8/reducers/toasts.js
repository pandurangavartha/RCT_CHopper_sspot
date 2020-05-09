import * as types from '../actions/actiontype';

console.log('--------reducer--of--toast-----------')
export default function toasts(state = [], action) {
    console.log('--------reducer--of--toast------action-----',action)
  const { payload, type } = action;
  console.log('--------reducer--of--toast-----------',payload, type )
  switch (type) {
    case types.ADD_TOAST:
      return [payload, ...state];

    case types.REMOVE_TOAST:
      return state.filter(toast => toast.id !== payload);

    default:
      return state;
  }
}