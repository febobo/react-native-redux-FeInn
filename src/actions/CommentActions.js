import * as types from './actionTypes';

export function tabChange(selectedTab){
  return {
    type : types.TAB_CHANGE,
    selectedTab
  }
}
