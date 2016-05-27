import * as types from './ActionTypes';

export function tabChange(selectedTab){
  return {
    type : types.TAB_CHANGE,
    selectedTab
  }
}
