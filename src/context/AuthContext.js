import createDataContext from './createDataContext';
import UserApi from '../api/Users'
import {AsyncStorage} from 'react-native'
import {navigate} from '../NavigationRef'

const authReducer = (state,action) =>{
    switch(action.type){
        case 'add_err':
            return { ...state ,errMessage: action.payload}
        case 'sign_in':
            return {...state,token:action.payload}
        case 'clear_err':
            return {...state , errMessage:action.payload}
        case 'signout':
            return { token: null, errorMessage: '' };
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      dispatch({ type: 'signin', payload: token });
      navigate('mainFlow');
    } else {
        console.log('to Signin')
      navigate('Signin');
    }
  }; 

const signup = (dispatch) =>{
    return async ({email, password})=>{
        try{
            const response = await UserApi.post('/signup',{email,password});
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({type:'sign_in', payload:  response.data.token})
            console.log('navigate to mainFlow')
            navigate('mainFlow');
        }catch(err){
            dispatch({type:'add_err', payload:'Something went wrong'})
        }
    }
}

const signin = (dispatch)=>{
    return async ({email,password})=>{
        try{
            const response = await UserApi.get('/signin',{email,password});
            await AsyncStorage.setItem('token',response.data.token)
            dispatch({type:'sign_in', payload:response.data.token})
            navigate('mainFlow');
        }catch(err){
            dispatch({type:'add_err', payload:'התרחשה שגיאה בעת התחברות'})
        }
    }
}

const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('loginFlow');
  };

const clearErrMsg = (dispatch)=>{
    return () =>{
        dispatch({type:'clear_err', payload:''})
    }
}

export const {Provider, Context} = createDataContext(authReducer,{signin,signout,signup,clearErrMsg,tryLocalSignin},{token:null,errMessage:''})