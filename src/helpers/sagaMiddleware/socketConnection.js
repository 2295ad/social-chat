import {take,put,call,fork} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import io from 'socket.io-client';

import {SOCKET_CONSTANTS, USER_EVENT} from '../constants';
import {send} from './sendMsg';
import {availableUser,superUserSet, sendMsg} from '../actions';


function createSocketChannel(){
    try{
      let socket = io('http://localhost:3001');
      return new Promise(resolve=>{
          socket.on('connect',()=>{
              resolve(socket);
          })
      })
    }catch(e){
        console.log(e);
    }
}

function* read(socket) {
    const channel = yield call(subscribe, socket);
    while (true) {
      let action = yield take(channel);
      yield put(action);
    }
  }

  
function* subscribe(socket) {
    return new eventChannel(emit => {

      const userAvailability = info => emit(availableUser(info));
      const setSuper = info => emit(superUserSet(info));
      // const announceSuperAvailability = info => emit(superUserAvailability(info));

      socket.on(USER_EVENT.AVAILABLE_USER, userAvailability);
      socket.on(USER_EVENT.SUPER_USER_SET, setSuper);
      // socket.on(USER_EVENT.SUPER_USER_IS_AVAILABLE, announceSuperAvailability);
      return () => {}
    })
  }


export function* flow() {
    yield take(SOCKET_CONSTANTS.SOCKET_CONN_REQ)
    const socket = yield call(createSocketChannel)
    yield put({type:SOCKET_CONSTANTS.CONNECTED,data:SOCKET_CONSTANTS.CONNECTED})
    yield fork(read, socket)
    yield fork(send, socket)
    yield put(sendMsg({type:USER_EVENT.IS_SUPER_USER_AVAILABLE,query:""}));
  }