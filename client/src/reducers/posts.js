import { actionTypes } from '../constants/actionTypes';

const posts = (posts=[], action) => {
    switch(action.type){
        case actionTypes.FETCH_ALL:
            return action.payload.reverse();
        case actionTypes.CREATE:
            return [action.payload, ...posts];   
        case actionTypes.DELETE:
            return posts.filter(post => post._id !== action.payload._id);  
        case actionTypes.UPDATE:
        case actionTypes.LIKE:
            return posts.map(post => post._id === action.payload._id? action.payload:post);   
        default: 
            return posts;
    }

};

export default posts;