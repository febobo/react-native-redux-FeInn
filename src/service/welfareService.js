import * as requestService from './requestService';
import config from '../config'
const urlPrefix = config.spDomain;
export function getVideo({page,limit}){
  let url = `${urlPrefix}&type=41&limit=${limit}&page=${page}`;
  // let url = `${urlPrefix}`;
  return requestService.get(url,true).then( data =>{
    if(!data.showapi_res_error){
      return {
        list : data.showapi_res_body.pagebean.contentlist,
        params : {
          page,
          limit
        }
      }
      // return data.showapi_res_body.newslist
    }else{
      throw 'do getPhoto failed'
    }
  })
}
