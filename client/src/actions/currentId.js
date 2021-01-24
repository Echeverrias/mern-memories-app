import { actionTypes } from '../constants/actionTypes';

export const setCurrentId = (id) => {
        return {type: actionTypes.SET, payload: id}
};
   