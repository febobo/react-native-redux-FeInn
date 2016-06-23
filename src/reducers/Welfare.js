import * as types from '../actions/actionTypes';

export default function Welfare (state={page:1,limit:10,videos:[]} , action={}){
  const { payload ,error } = action;
  console.log(action)
  switch (action.type) {
    case types.GET_VIDEO:
      return Object.assign(
        {} , state , {
          videos : error ? state.videos : state.videos.concat(payload.list),
          page : error ? state.page : payload.params.page,
          limit : error ? state.limit : payload.params.limit
        }
      )
      break;
    default:
      return state;
  }
}
