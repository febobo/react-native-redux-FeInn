import * as types from '../actions/ActionTypes';

export default function Essence (state={} , action={}){
  switch (action.type) {
    case types.INDEX_LIST:
      return Object.assign(
        {} , state , action
      )
      break;
    default:
      return state;
  }
}
