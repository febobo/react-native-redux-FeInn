import * as types from './ActionTypes';

export function getAward(data){
  return {
    type : types.AWARD_LIST,
    data : data
  }
}
