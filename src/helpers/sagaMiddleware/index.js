import { put, takeEvery, all } from 'redux-saga/effects';
import {SOCKET_CONSTANTS} from '../constants';


function * socketStatus(data){
    try{

    }catch(e){
        console.log(e);
    }
}


















export default function* rootSaga() {
    yield all([
      takeEvery( SOCKET_CONSTANTS.SOCKET_CONN_REQ,socketStatus)
    ])
  };