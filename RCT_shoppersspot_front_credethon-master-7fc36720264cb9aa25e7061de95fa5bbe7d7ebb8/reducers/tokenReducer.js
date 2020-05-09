import {
  INSERT_TOKEN_SUCCESS,
  INSERT_TOKEN_FAIL,
} from "../actions/tokenAction";
import initialState from './initialstate';


export default (state = initialState, action) => {
  switch (action.type) {
    case INSERT_TOKEN_SUCCESS:
      // console.log('-----------INSERT_TOKEN_SUCCESS---------------',user_token,insert_token_error)
      return {
        user_token: action.payload,
        insert_token_error: false,
        loggedIn:true,
        pending:false
      };
    case INSERT_TOKEN_FAIL:
      // console.log('-----------INSERT_TOKEN_FAIL---------------',user_token,insert_token_error)
      return {
        insert_token_error: true,
        loggedIn:false
      };
    default:
      return state;
  }
};
