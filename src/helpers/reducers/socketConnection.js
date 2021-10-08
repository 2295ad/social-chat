
import {SOCKET_CONSTANTS} from '../constants';

export function socketConnection(state=SOCKET_CONSTANTS.DISCONNECTED,action){
    switch(action.type){
        case SOCKET_CONSTANTS.CONNECTED:return action.data;
        case SOCKET_CONSTANTS.DISCONNECTED:return action.data;
        default:return state;
    }
} 