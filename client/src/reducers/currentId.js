import { actionTypes } from '../constants/actionTypes';

const currentId = (currentId='', action) => {
    switch(action.type){
        case actionTypes.SET:
            return action.payload;
        default: 
            return currentId;
    }

};

export default currentId;