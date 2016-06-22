import * as types from './actionTypes';

export function essenceList(data , getState){
  let oldList = (getState().Essence && getState().Essence.data && getState().Essence.data.concat(data))  || data;
  return {
    type : types.INDEX_LIST,
    data : oldList
  }
}

export function isDownLoad(isLoad){
  return {
    type : types.DOWN_LOAD,
    isLoad
  }
}

// 首页列表
export function getList(params , cb){
  return (dispatch , getState) => {
    fetch('https://cnodejs.org/api/v1/topics?' + params)
    .then(res => res.json())
    .then(json =>{
      cb && cb();
      dispatch(essenceList(json.data , getState))
    })
    .catch( msg =>{
      console.log(msg)
    })
  }
}
