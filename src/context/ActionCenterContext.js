import createDataContext from './createDataContext';
import UserApi from '../api/Users'

const actionCenterReducer = (state,action) =>{
    switch(action.type){
        case 'update_action_center':
            return{...state,actionCenter:action.payload}
        case 'add_err':
            return { ...state ,errMessage: action.payload}
        case 'clear_err':
            return {...state , errMessage:action.payload}
        default:
            return state;
    }
};

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

const addReq = dispatch=> async ({userId,courseName,subjects,additionalInfo,timeSlots})=>{
    try{
        const params = {courseName,subjects,additionalInfo,timeSlots}
        const response = await UserApi.put(`/ActionCenter/addReq`,{userId,courseName,subjects,additionalInfo,timeSlots});
        dispatch({type:'update_action_center',payload:response.data.ac});
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

export const {Provider, Context} = createDataContext(actionCenterReducer,{setLesson,addReq,addOffer},{actionCenter:null,errMessage:''})