import {USER_EVENT} from '../constants';

export const pushPost = (info)=>{
    return {type: USER_EVENT.PUSH_POST,data:info}
}

export const pushPostApi = (info)=>{
    return {type: USER_EVENT.PUSH_POST_API,data:info}
}