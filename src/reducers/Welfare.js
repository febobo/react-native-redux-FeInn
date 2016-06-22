import * as types from '../actions/actionTypes';

export default function Welfare (state={page:1,limit:10,videos:[]} , action={}){
  const { payload } = action;
  console.log(state,9999)
  switch (action.type) {
    case types.GET_VIDEO:
      return Object.assign(
        {} , state , {
          videos : state.videos.concat(payload.list),
          page : payload.params.page,
          limit : payload.params.limit
        }
      )
      break;
    default:
      return state;
  }
}
