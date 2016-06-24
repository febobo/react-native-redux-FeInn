import * as types from '../actions/actionTypes';

export default function Welfare (state={page:1,limit:10,videos:[]} , action={}){
  const { payload ,error , meta={}} = action;
  const { sequence ={} } = meta;
  switch (action.type) {
    case types.GET_VIDEO:
      return Object.assign(
        {} , state , {
          videos : sequence.type == 'start' ? state.videos : state.videos.concat(payload.list),
          page : sequence.type == 'start' ? state.page : payload.params.page,
          limit : sequence.type == 'start' ? state.limit : payload.params.limit,
          getVideoIsPending : sequence.type == 'start' ? true : false
        }
      )
      break;
    default:
      return state;
  }
}
