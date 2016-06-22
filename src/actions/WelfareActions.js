import * as types from './actionTypes';
import * as welfareService from '../service/welfareService';
import {createAction} from 'redux-actions';

export const getVideo = createAction(types.GET_VIDEO , welfareService.getVideo , ({
  page,
  limit
} , resolved , rejected) => {
  resolved && resolved();
})
