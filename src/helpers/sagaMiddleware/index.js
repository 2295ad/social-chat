import { fork, all, takeEvery,put} from 'redux-saga/effects';

import {flow} from './socketConnection';
import {USER_EVENT,SOCKET_CONSTANTS, USER_TYPE} from './../constants';
import { sendMsg} from '../actions';


function * checkUserType(info){
  try{
    debugger;
    if(info.data===USER_TYPE.SUPER){
      yield put(sendMsg({type:USER_EVENT.SET_SUPER_USER,query:""}));
    }else{
      yield put({type:USER_TYPE.USER})
    }

  }catch(e){
    console.log(e);
  }
}


export default function* rootSaga() {
    yield all([
      fork(flow),
      takeEvery(USER_EVENT.AVAILABLE_USER, checkUserType )
    ])
  };