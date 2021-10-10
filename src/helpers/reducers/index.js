import { combineReducers } from 'redux';

import {socketConnection} from './socketConnection';
import {userType, avatar, superUserNudge} from './user';


export default combineReducers({
    socketConnection,
    userType,
    avatar,
    superUserNudge,
 })