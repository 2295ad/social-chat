import { combineReducers } from 'redux';

import {socketConnection} from './socketConnection';
import {userType, avatar, superUserNudge,posts} from './user';


export default combineReducers({
    socketConnection,
    userType,
    avatar,
    superUserNudge,
    posts
 })