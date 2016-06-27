import * as types from '../actions/actionTypes';

const initialState = {

}
export default function User (state=initialState , action={}){
  const {payload, error, meta = {}, type} = action;
  switch (action.type) {
    case types.CHECK_TOKEN:
      return Object.assign(
        {} , state , {
          ...payload
        }
      )
      break;
    case types.LOGOUT:
      return initialState
      break;
    default:
      return state;
  }
}
