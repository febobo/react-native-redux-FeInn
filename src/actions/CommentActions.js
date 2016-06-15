import * as types from './actionTypes';
import * as topicService from '../service/topicService';
import {createAction} from 'redux-actions';

export const replyTopicById = createAction(types.REPLY_TOPIC , topicService.reply , ({
  topicId,
  content,
  replyId,
  user
} , resolved , rejected) => {
  console.log(resolved)
  return {
  }
})
