import {take} from 'redux-saga/effects'
import {SOCKET_CONSTANTS} from '../constants';

export function* send(socket) {

  while (true) {
    const res = yield take(SOCKET_CONSTANTS.SEND_MSG)
    socket.emit(res.data.type, res.data.query)
  }
}