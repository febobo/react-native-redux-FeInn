import * as requestService from './requestService';
import {getToken, setToken} from './tokenService';

export function reply({topicId , content , replyId}){
  let body = {
    accesstoken : getToken() || '89f37401-8659-4535-9f16-b31068495928',
    content
  }

  if(replyId){
    body.reply_id = replyId
  }

  let url = `/topic/${topicId}/replies`;

  return requestService.post(url,body).then( data =>{
    if(data.success){
      return data.reply_id
    }else{
      throw 'do reply failed'
    }
  })
}

export function getReply(id){
  let url = `/topic/${id}`;
  return requestService.get(url).then( data =>{
    if(data.success){
      return data
    }else{
      throw 'do get topic failed'
    }
  })
}
