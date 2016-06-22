import * as types from '../actions/actionTypes';


export default function Acticle (state={page:1,limit:10,photos:[]} , action={}){
  const { payload } = action;
  console.log(action,'action')
  switch (action.type) {
    case types.GET_PHOTO:
      return Object.assign(
        {} , state , {
          photos : state.photos.concat(payload.list),
          page : payload.params.page,
          limit : payload.params.limit
        }
      )
      break;
    default:
      return state;
  }
}
