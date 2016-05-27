import * as types from '../actions/ActionTypes';

export default function Essence (state={} , action={}){
  console.log(action,1112)
  switch (action.type) {
    case types.INDEX_LIST:
      console.log(action,111)
      return Object.assign(
        {} , state , {
          data : action.data
        }
      )
      break;
    default:
      return state;
  }
}
