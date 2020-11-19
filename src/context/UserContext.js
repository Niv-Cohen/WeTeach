import createDataContext from './createDataContext';
import UserApi from '../api/Users'
import {navigate} from '../NavigationRef'


const userReducer = (state,action) =>{
    switch(action.type){
        case 'edit_User':
            return{...state,user:action.payload}
        case 'set_user':
            return{...state,user:action.payload}
        case 'add_err':
            return { ...state ,errMessage: action.payload}
        case 'clear_err':
            return {...state , errMessage:action.payload}
        default:
            return state;
    }
};
    const setUser = dispatch => async(user)=>{
        dispatch({type:'set_user',payload:user})
        const response =await UserApi.post('/ActionCenter/create',userId);
        dispatch({type:'update_action_center',payload:response.data.ac});
    }

    const editUser = dispatch => async (_id,params) => {
        try{
            console.log('Im in edituser func')
            console.log(params)
            console.log(_id)
            const response = await UserApi.put(`/user/`,{_id,params});
            console.log(response.data)
            dispatch({type:'edit_user', payload: response.data.user})
            console.log('now navigating to mainFlow')
            navigate('Account')
        }catch(err){
            dispatch({type:'add_err', payload:'Something went wrong'})
            console.log('something went wrong!')
            console.log(err.message)
        }
    }

export const {Provider, Context} = createDataContext(userReducer,{setUser,editUser},{user:null,errMessage:''})