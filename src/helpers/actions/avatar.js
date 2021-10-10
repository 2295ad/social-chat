import {AVATAR} from '../constants';

export const setAvatar = (info)=>{
    return {type: AVATAR,data:info}
}