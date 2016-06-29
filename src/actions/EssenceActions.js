import * as types from './actionTypes';
import {createAction} from 'redux-actions';
import * as topicService from '../service/topicService';

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

export const getList = createAction(types.INDEX_LIST , topicService.getTopics , ({
  page,
  limit
},resolved ,rejected) => {
})
