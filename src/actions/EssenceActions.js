import * as types from './ActionTypes';

export function essenceList(data){
  return {
    type : types.INDEX_LIST,
    data
  }
}

export function getList(){
  return (dispatch) => {
    fetch('https://cnodejs.org/api/v1/topics')
    .then(res => res.json())
    .then(json =>{
      console.log(json)
      dispatch(essenceList(json.data))
    })
    .catch( msg =>{
      console.log(msg)
    })
  }
}
