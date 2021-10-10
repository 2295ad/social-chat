/* eslint-disable no-lone-blocks */

import {USER_EVENT, USER_TYPE, AVATAR} from '../constants';

export function userType(state="",action){
    switch(action.type){
        case USER_EVENT.SUPER_USER_SET:{
            if(action.data){
                return USER_TYPE.SUPER;
            }else{
                return USER_TYPE.USER;
            }
        };
        case USER_EVENT.AVAILABLE_USER:return USER_TYPE.USER;
        default:return state;
    }
} 

export function avatar(state="",action){
    switch(action.type){
        case AVATAR:return action.data;
        default:return state;
    }
}

export function superUserNudge(state="",action){
    switch(action.type){
        case USER_EVENT.SUPER_USER_IS_AVAILABLE: return action.data;
        default:return state;
    }
}