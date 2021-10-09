import { combineReducers } from 'redux';

import {socketConnection} from './socketConnection';
import {userType} from './user';


export default combineReducers({
    socketConnection,
    userType,
 })