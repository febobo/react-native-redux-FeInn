import * as types from '../actions/actionTypes';

const tabInitState = {
  count : 1
}
export default function User (state=tabInitState , action={}){
  switch (action.type) {
    case types.CHECK_TOKEN:
      return Object.assign(
        {} , state , {
          user : 1
        }
      )
      break;
    default:
      return state;
  }
}
