// import { login } from '../../modules/serverCall'

console.log('---------token-----123456--------')
export const insertToken = () => dispatch => {
  let token,authentication={}
  if (localStorage.getItem('auth')) {
    token = localStorage.getItem('auth')
    authentication = { loggedIn:false, pending:false } 
    console.log('---------token-----123456-----345---',token,INSERT_TOKEN_SUCCESS)
    dispatch({
      type: INSERT_TOKEN_SUCCESS,
      payload: token
    })
  } else {
    dispatch({
      type: INSERT_TOKEN_FAIL
    })
  }
}
insertToken();
export const INSERT_TOKEN_SUCCESS = 'INSERT_TOKEN_SUCCESS'
export const INSERT_TOKEN_FAIL = 'INSERT_TOKEN_FAIL'


