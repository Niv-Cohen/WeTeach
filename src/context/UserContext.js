import createDataContext from './createDataContext';
import UserApi from '../api/Users'
import {navigate} from '../NavigationRef'

const userReducer = (state,action) =>{
    switch(action.type){
        case 'add_err':
            return { ...state ,errMessage: action.payload}
        case 'changePhoto':
            return {...state,img:action.payload}
        case 'clear_err':
            return {...state , errMessage:action.payload}
        case 'signout':
            return { token: null, errorMessage: '' };
        default:
            return state;
    }
};

const changePhoto = dispatch => async ({img}) => {
        try{
            const response = await UserApi.put('/update',{img});
            dispatch({type:'changePhoto', payload: img})
            console.log('changed Personal photo')
        }catch(err){
            dispatch({type:'add_err', payload:'Something went wrong'})
        }
    }



export const {Provider, Context} = createDataContext(authReducer,{signin,signout,signup,clearErrMsg,tryLocalSignin},{token:null,errMessage:''})