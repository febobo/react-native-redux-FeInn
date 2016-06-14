import {createAction} from 'redux-actions';
import * as types from './actionTypes';
import config from '../config'

export const checkToken = createAction(types.CHECK_TOKEN , async(token) =>{
  const params = {
    method : 'POST',
    headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
    body : JSON.stringify({
      accesstoken : token
    })
  }
  const userLoginInfo = await fetch(`${config.domain}/accesstoken`, params);
  const loginUser = await userLoginInfo.json();
  const user = await fetch(`${config.domain}/user/${loginUser.loginname}`);
  return userInfo = await user.json()
  // return userInfo;
}, (token, resolved)=> {
	return {
		resolved: resolved,
		sync: 'user'
	}
})
