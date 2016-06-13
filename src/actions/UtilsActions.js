import {createAction} from 'redux-actions';
import * as types from './actionTypes';

export const toast = createAction(types.TOAST, (text, timeout)=> {
	return {
		text,
		timeout,
		id: new Date().getTime()
	}
});
