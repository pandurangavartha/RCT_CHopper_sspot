import createToast from "../factories/createtoast";
import * as types from './actiontype';

export function addToast(options = {}) {
    console.log('----------actions--------toastors---------------',createToast(options),types,types.ADD_TOAST)
  return {
    payload: createToast(options),
    type: types.ADD_TOAST
  };
}

export function removeToast(id) {
    console.log('----------actions--------toastors----------id-----',id)
  return {
    payload: id,
    type: types.REMOVE_TOAST
  };
}