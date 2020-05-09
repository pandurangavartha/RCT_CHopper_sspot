import * as types from './actiontype';



export function removeLoader(options = {}) {
  console.log('----------actions--------removeLoader----------id-----',types, types.ADD_LOADER)
  return {
    payload: options,
    type: types.REMOVE_LOADER
  }
}
export function addLoader(options = {}) {
  console.log('----------actions--------addLoader---------------',types, types.ADD_LOADER)
  return {
    payload: options,
    type: types.ADD_LOADER
  };
}