import { actionTypes } from '../constants/actionTypes';
import * as api from '../api';

export const auth = (data) => {
    return {
        type: actionTypes.AUTH,
        payload: data,
    }
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    }
}    


export const signIn = (formData, history) => async (dispatch) => {
    try{
        const { data } = await api.signIn(formData);
        dispatch({type: actionTypes.SIGNIN, payload: data});
        history.push('/');
    }
    catch (error) {
        alert(error.response?.data.message || error);
    }
};

export const signUp = (formData, history) => (dispatch) => {
        api.signUp(formData)
            .then((data) => {
                dispatch({type: actionTypes.SIGNUP, payload: data.data});
                history.push('/');
            })
            .catch((error) => {
                alert(error.response?.data.message || error);
            })
    
    
};