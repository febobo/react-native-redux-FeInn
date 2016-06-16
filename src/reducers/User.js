import * as types from '../actions/actionTypes';

export default function User (state={} , action={}){
  const {payload, error, meta = {}, type} = action;
  switch (action.type) {
    case types.CHECK_TOKEN:
      return Object.assign(
        {} , state , {
          ...payload
        }
      )
      break;
    default:
      return state;
  }
}
