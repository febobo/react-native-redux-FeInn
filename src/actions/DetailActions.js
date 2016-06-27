import * as types from './actionTypes';

export function articleDetail(data){
  return {
    type : types.ARTICLE_DETAIL,
    data
  }
}
export function getArticleDetail(id){
  if(!id) return;
  return (dispatch) => {
    fetch('https://cnodejs.org/api/v1/topic/' + id)
    .then(res => res.json())
    .then(json =>{
      dispatch(articleDetail(json.data))
    })
    .catch( msg =>{
      console.log(msg)
    })
  }
}

export function clearCacheDetail(){
  return {
    type : types.CLEAR_CACHE_DETAIL
  }
}
