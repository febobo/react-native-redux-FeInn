import * as types from '../actions/actionTypes';

export default function Utils (state={} , action={}){
  const {payload, error, meta = {}, type} = action;
  switch (action.type) {
    case types.TOAST:
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
