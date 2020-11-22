import createDataContext from './createDataContext';
import UserApi from '../api/Users'
import { navigate } from '../NavigationRef';

const actionCenterReducer = (state,action) =>{
    switch(action.type){
        case 'edit_action_aenter':
            return{...state,actionCenter:action.payload}
        case 'edit_req':
            return {...state,requests:action.payload}
        case 'add_err':
            return { ...state ,errMessage: action.payload}
        case 'clear_err':
            return {...state , errMessage:action.payload}
        default:
            return state;
    }
};

const createActionCenter = dispatch =>async (userId)=>{
    try{
        const response =await UserApi.post('/ActionCenter/create',{userId});
        dispatch({type:'edit_Action_Center',payload:response.data.ac})
        navigate('Setup');
    }catch(err){
        dispatch({type:'add_err',payload:err})
    }
}

const setActionCenter = dispatch =>async (userId)=>{
    try{
        console.log('Im in setActionCenter')
        console.log(userId)
        const response = await UserApi.get('/ActionCenter/',{userId})
        console.log(response.data);
        dispatch({type:'edit_Action_Center',payload:response.data.ac})
        navigate('Account')
    }catch(err){
        dispatch({type:'add_err',payload:err})
    }
}

    const getReq = dispatch =>async ({userId})=>{
        try{
            console.log('Fetching Requests');
            console.log(userId)
            const response = await UserApi.post('/ActionCenter/getReq',{userId})
            dispatch({type:'edit_action_aenter',payload:response.data.ac})
        }catch(err){
            dispatch({type:'add_err',payload:err})
        }
    }

const addOffer = dispatch => async({studentId,tutorId,price,Date,reqId})=>{
    try{
          await UserApi.put(`/ActionCenter/addOffer`,{studentId,tutorId,price,Date,reqId});
          const response =await UserApi.put(`ActinonCenter/addToMyOffers`,{studentId,tutorId,price,Date,reqId});
          dispatch({type:'update_action_center',payload:response.data.ac});
    }catch(err){
        dispatch({type:'add_err', payload:'Something went wrong'})
        console.log(err.message)
    }
}

const addReq = dispatch=> async ({userId,course,subjects,additionalInfo,timeSlots,lessonLength})=>{
    try{
        console.log('in Add Req')
        const params = {userId,course,subjects,additionalInfo,timeSlots,lessonLength}
        const response = await UserApi.put(`/ActionCenter/addReq`,{params});
        console.log(response.data.ac)
        console.log('about to navigate')
        dispatch({type:'update_action_center',payload:response.data.ac});
        navigate('Account');
    }catch(err){
    dispatch({type:'add_err', payload:'Something went wrong'})
    console.log(err.message)
    }
}

const setLesson = dispatch => async ({chosenOffer})=>{
    try{
    await UserApi.put(`/ActinoCenter/addLesson`,{chosenOffer})
    const response =UserApi.put(`/ActinoCenter/${chosenOffer.tutorId}/addToMyLessons`)
    dispatch({type:'update_action_center',payload:response.data.ac});
    }catch(err){
        dispatch({type:'add_err', payload:'Something went wrong'})
        console.log(err.message)
    }
}

export const {Provider, Context} = createDataContext(actionCenterReducer,{createActionCenter,setLesson,addReq,addOffer,setActionCenter,getReq},{requests:[],actionCenter:null,errMessage:''})