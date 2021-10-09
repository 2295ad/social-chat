/* eslint-disable no-lone-blocks */

import {USER_EVENT, USER_TYPE} from '../constants';

export function userType(state="",action){
    switch(action.type){
        case USER_EVENT.SUPER_USER_SET:{
            if(action.data){
                return USER_TYPE.SUPER;
            }else{
                return USER_TYPE.USER;
            }
        };
        case USER_EVENT.USER:return USER_TYPE.USER;
        default:return state;
    }
} 