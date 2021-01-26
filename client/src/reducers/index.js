import { combineReducers } from 'redux';
import posts from './posts';
import currentId from './currentId';
import auth from './auth';

const reducers = combineReducers({
    posts,
    currentId,
    auth,
})

export default reducers;