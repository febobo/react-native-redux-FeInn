import * as requestService from './requestService';
import config from '../config'
const urlPrefix = config.ghDomain;
export function getPhoto({page,limit}){

  console.log(page,limit)
  let url = `${urlPrefix}/%E7%A6%8F%E5%88%A9/10/1`;
  // let url = `${urlPrefix}`;
  return requestService.get(url,true).then( data =>{
    if(!data.error){
      return data.results
      // return data.showapi_res_body.newslist
    }else{
      throw 'do getPhoto failed'
    }
  })
}
