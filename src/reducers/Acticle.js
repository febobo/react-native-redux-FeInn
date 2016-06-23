import * as types from '../actions/actionTypes';


export default function Acticle (state={page:1,limit:10,photos:[]} , action={}){
  const { payload ,error } = action;
  switch (action.type) {
    case types.GET_PHOTO:
      return Object.assign(
        {} , state , {
          photos : error ? state.photos : state.photos.concat(payload.list),
          page : error ? state.page : payload.params.page,
          limit : error ? state.limit : payload.params.limit
        }
      )
      break;
    default:
      return state;
  }
}
