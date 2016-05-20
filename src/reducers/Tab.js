import * as types from '../actions/ActionTypes';

const tabInitState = {
  selectedTab : 'essence'
}
export default function Tab (state=tabInitState , action={}){

  switch (types.type) {
    case types.INDEX_LIST:
      return Object.assign(
        {} , state , action.selectedTab
      )
      break;
    default:
      return state;
  }
}
