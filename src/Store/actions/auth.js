import axios from 'axios';

import * as actionTypes from './actionTypes';


export const authStart=()=>{
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess=(token, userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    };
};

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    };
};

export const authLogout=()=>{
    return{
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp)=>{
    return dispatch =>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true,
        };
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBy1TO2sjRyTXrQ3kyXcZWJSScWmlmoTU4';
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBy1TO2sjRyTXrQ3kyXcZWJSScWmlmoTU4';
        }
        axios.post(url, authData)
            .then(response=>{
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error=>{
                console.log(error);
                dispatch(authFail(error.response.data.error));
                
            })
    };
};

/* to save data of logged in user like token, localid or user id : in post url 
above do following things: response.data.token, response.data.localId.
we can also save refreshToken if we want to remember user password for more than 1 hour.
we can also display error what we got in form by using .catch as shown above.*/
