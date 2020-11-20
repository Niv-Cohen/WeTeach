import createDataContext from './createDataContext';
import UserApi from '../api/Users'
import {navigate} from '../NavigationRef'


const userReducer = (state,action) =>{
    switch(action.type){
        case 'edit_User':
            return{...state,user:action.payload}
        case 'set_user':
            return{...state,user:action.payload}
        case 'save_instData':
            return{...state,instituteData:action.payload}
        case 'add_err':
            return { ...state ,errMessage: action.payload}
        case 'clear_err':
            return {...state , errMessage:action.payload}
        default:
            return state;
    }
};

    const convertToArr=(map)=>{
        var mapToSend = {}
    for (var key of map.keys()) {
        mapToSend[key] = map.get(key);
    }
    return mapToSend;
    }



const saveInstitutesData = dispatch => ({institutes})=>{
    try{
    dispatch({type:'set_data',payload:institutes})
    }
    catch(err){
        dispatch({type:'add_err', payload:'Unable to fetch data'})
    }
}

    const setUser = dispatch => async(user)=>{
        dispatch({type:'set_user',payload:user})
        const response =await UserApi.post('/ActionCenter/create',userId);
        dispatch({type:'update_action_center',payload:response.data.ac});
    }

    const editUser = dispatch => async (_id,params) => {
        try{
            console.log('Im in edituser func')
            const {subjectsIHelp}=params;
            // console.log(params)
            // console.log(_id)
            if(subjectsIHelp){
              params.subjectsIHelp= convertToArr(subjectsIHelp);
                console.log(params);
            }
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

export const {Provider, Context} = createDataContext(userReducer,{setUser,editUser,saveInstitutesData},{instituteData:null,user:null,errMessage:''})