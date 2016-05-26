import * as types from './ActionTypes';

export function tabChange(selectedTab){
  console.log(selectedTab)
  return {
    type : types.TAB_CHANGE,
    selectedTab
  }
}
