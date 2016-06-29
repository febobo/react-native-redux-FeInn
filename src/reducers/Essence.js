import * as types from '../actions/actionTypes';

const initialState = {
  data : [],
  page : 1
}
export default function Essence (state=initialState , action={}){
  const { payload ,error , meta={}} = action;
  const { sequence ={} } = meta;
  switch (action.type) {
    case types.INDEX_LIST:
      return Object.assign(
        {} , state , {
          data : sequence.type == 'start' ? state.data : state.data.concat(payload.data),
          getTopicsIsPending : sequence.type == 'start' ? true : false,
          downLoadStatus : false,
          page : sequence.type == 'start' ? state.page : state.page + 1
        }
      )
      break;
    case types.DOWN_LOAD:
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
