import { combineReducers } from 'redux';
import posts from './posts';
import currentId from './currentId';

const reducers = combineReducers({
    posts,
    currentId
})

export default reducers;