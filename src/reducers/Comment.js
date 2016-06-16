import * as types from '../actions/actionTypes';

const initialState = {
	topics: {}
};

function reply(topicId , replyId , content , user , state , payload){

  let topic = state.topics.data;
  
  topic.replies = topic.replies.reverse().concat([{
    topicId,
    replyId,
    content,
    author : user,
    create_at : new Date(),
    ups : []
  }])

  return {
    ...state,
    topics : { data : topic}
  }

}

export default function Comment (state=initialState , action={}){
  console.log(state,action)
  const { payload , meta={} } = action;
  const { topicId, content, replyId , user  } = meta;
  switch (action.type) {
    case types.REPLY_TOPIC:
      return reply(topicId , replyId , content , user , state , payload)
      break;
    case types.GET_TOPIC_DETAIL:
      return Object.assign(
        {} , state , {
          topics : payload
        }
      )
      break;
    default:
      return state;
  }
}
