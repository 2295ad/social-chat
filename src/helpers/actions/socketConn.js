import {SOCKET_CONSTANTS, USER_EVENT} from '../constants';

export const joinChat = ()=>{
    return {type: SOCKET_CONSTANTS.SOCKET_CONN_REQ}
}

export const sendMsg = (data)=>{
    return {type:SOCKET_CONSTANTS.SEND_MSG,data}
}

export const availableUser = (data)=>{
    return {type:USER_EVENT.AVAILABLE_USER,data}
}

export const superUserSet = (data)=>{
    return {type:USER_EVENT.SUPER_USER_SET,data}
}

export const superUserAvailability = (data)=>{
    return {type:USER_EVENT.SUPER_USER_IS_AVAILABLE,data}
}

