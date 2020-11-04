import createDataContext from './createDataContext';
import UserApi from '../api/Users'

const userReducer = (state,action) =>{
    switch(action.type){
        case 'get_institutes':
            return{...state,institutes:action.payload}
        case 'add_err':
            return { ...state ,errMessage: action.payload}
        case 'clear_err':
            return {...state , errMessage:action.payload}
        default:
            return state;
    }
};

    const getInstitutes = dispatch => async()=>{
        try{
        const response = await UserApi.get(`/institutens`);
        console.log(response.data);
        dispatch({type:'get_institutes',payload:response.data.Institutes})
        }catch(err){
            dispatch({type:'add_err', payload:'Unable to fetch data'})
        }
    }

export const {Provider, Context} = createDataContext(userReducer,{getInstitutes},{institutes:[],errMessage:''})