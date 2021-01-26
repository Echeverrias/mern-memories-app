import { actionTypes } from '../constants/actionTypes';
import { LOCALSTORAGE_KEY } from '../constants/keys';

const auth = (auth={user:null, token:''} , action) => {
    switch(action.type){
          
        case actionTypes.SIGNIN:
        case actionTypes.SIGNUP:
        case actionTypes.AUTH:    
            console.log('AUTH');
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({...action?.payload}));
            return { ...auth, ...action?.payload };
        case actionTypes.LOGOUT:
            console.log('LOGOUT');
            localStorage.removeItem(LOCALSTORAGE_KEY);
            return { ...auth, user:null, token:'' };  
        default: 
            return auth;
    }

};

export default auth;