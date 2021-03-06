import createDataContext from './createDataContext';
import UserApi from '../api/Users';
import {AsyncStorage} from 'react-native';
import {navigate} from '../NavigationRef';

const authReducer = (state, action) =>{
  switch (action.type) {
    case 'add_err':
      return {...state, errMessage: action.payload};
    case 'sign_in':
      return {...state, token: action.payload};
    case 'set_user':
      return {...state, user: action.payload};
    case 'clear_err':
      return {...state, errMessage: action.payload};
    case 'signout':
      return {token: null, errorMessage: ''};
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  try {
    const savedDataString = await AsyncStorage.getItem('savedData');
    const savedData=JSON.parse(savedDataString);
    const token =savedData.token;
    const id =savedData.id;
    const _id=id;
    const response = await UserApi.post(`/user/${_id}`, {_id});
    const user = response.data.user;
    dispatch({type: 'signin', payload: token});
    dispatch({type: 'set_user', payload: user});
    navigate('SignInMiddleware');
  } catch (err) {
    navigate('Signin');
  }
};

const signup = (dispatch) =>{
  return async ({email, password})=>{
    try {
      const response = await UserApi.post('/signup', {email, password});
      const user =response.data.user;
      const token=response.data.token;
      const id=user._id;
      const savedData={};
      savedData.token=token;
      savedData.id=id;
      await AsyncStorage.setItem('savedData', JSON.stringify(savedData));
      // console.log('Finished storage')
      dispatch({type: 'sign_in', payload: token});
      dispatch({type: 'set_user', payload: user});
      navigate('SignUpMiddleware');
    } catch (err) {
      dispatch({type: 'add_err', payload: 'Something went wrong with sign up'});
      navigator. navigate('mainFlow');
    }
  };
};

const signin = (dispatch)=>{
  return async ({email, password})=>{
    try {
      const response = await UserApi.post('/signin', {email, password});
      const user =response.data.user;
      const token=response.data.token;
      const savedData={};
      savedData.token=token;
      savedData.id=user._id;
      await AsyncStorage.setItem('savedData', JSON.stringify(savedData));
      dispatch({type: 'sign_in', payload: token});
      dispatch({type: 'set_user', payload: user});
      navigate('SignInMiddleware');
    } catch (err) {
      dispatch({type: 'add_err', payload: 'Something went wrong with sign in'});
    }
  };
};

const signout = (dispatch) => async () => {
  console.log('Signing out');
  //await AsyncStorage.removeItem('savedData');
  dispatch({type: 'signout'});
  console.log('navigating to main flow');
  navigate('Signin');
};

const clearErrMsg = (dispatch)=>{
  return () =>{
    dispatch({type: 'clear_err', payload: ''});
  };
};

export const {Provider, Context} = createDataContext(authReducer, 
    {signin, signout, signup, clearErrMsg, tryLocalSignin},
    {token: null, errMessage: '', user: null});
