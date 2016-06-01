import * as types from '../actions/ActionTypes';

export default function Essence (state={} , action={}){
  switch (action.type) {
    case types.INDEX_LIST:
      return Object.assign(
        {} , state , {
          data : action.data,
          downLoadStatus : false
        }
      )
      break;
    case types.DOWN_LOAD:
    console.log(action , 11)
      return Object.assign(
        {} , state , {
          downLoadStatus : action.isLoad
        }
      )
      break;
    default:
      return state;
  }
}
