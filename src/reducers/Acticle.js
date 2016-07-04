import * as types from '../actions/actionTypes';


export default function Acticle (state={page:1,limit:10,photos:[],getPhotosIsPending:true} , action={}){
  const { payload ,error , meta={}} = action;
  const { sequence ={} } = meta;
  switch (action.type) {
    case types.GET_PHOTO:

      return Object.assign(
        {} , state , {
          photos : sequence.type == 'start' ? state.photos : state.photos.concat(payload.list),
          page : sequence.type == 'start' ? state.page : payload.params.page,
          limit : sequence.type == 'start' ? state.limit : payload.params.limit,
          getPhotosIsPending : sequence.type == 'start' ? true : false
        }
      )
      break;
    default:
      return state;
  }
}
