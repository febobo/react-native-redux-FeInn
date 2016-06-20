import * as types from '../actions/actionTypes';

export default function Acticle (state={} , action={}){
  console.log(action ,222)
  const { payload } = action;
  switch (action.type) {
    case types.GET_PHOTO:
      return Object.assign(
        {} , state , {
          photos : payload
        }
      )
      break;
    default:
      return state;
  }
}
