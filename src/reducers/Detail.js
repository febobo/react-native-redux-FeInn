import * as types from '../actions/actionTypes';

export default function Detail (state={} , action={}){

  switch (action.type) {
    case types.ARTICLE_DETAIL:
      return Object.assign(
        {} , state , {
          data : action.data
        }
      )
      break;
    case types.CLEAR_CACHE_DETAIL:
      return Object.assign(
        {} , state , {
          data : []
        }
      )
      break;
    default:
      return state;
  }
}
